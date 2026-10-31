/**
 * Utility script to migrate all collections and documents from local MongoDB to MongoDB Atlas.
 * Usage:
 *   node server/migrate-local-to-atlas.js <ATLAS_MONGODB_URI>
 * Or set MONGODB_URI in your environment / command line.
 */
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const LOCAL_URI = process.env.LOCAL_MONGODB_URI || 'mongodb://127.0.0.1:27017/mentee_db';
const ATLAS_URI = process.argv[2] || process.env.ATLAS_MONGODB_URI || process.env.MONGODB_URI;

if (!ATLAS_URI || ATLAS_URI.includes('127.0.0.1') || ATLAS_URI.includes('localhost')) {
  console.error('\n❌ Error: Please provide your MongoDB Atlas connection string!');
  console.log('Usage:');
  console.log('  node server/migrate-local-to-atlas.js "mongodb+srv://<user>:<password>@cluster.mongodb.net/mentee_db?retryWrites=true&w=majority"\n');
  process.exit(1);
}

async function migrate() {
  console.log('====================================================');
  console.log('🚀 MEntee Database Migration: Local MongoDB -> Atlas');
  console.log('====================================================');
  console.log(`Source (Local): ${LOCAL_URI}`);
  console.log(`Target (Atlas): ${ATLAS_URI.replace(/:([^:@]+)@/, ':****@')}`);

  let localConn = null;
  let atlasConn = null;

  try {
    console.log('\n1. Connecting to local database...');
    localConn = await mongoose.createConnection(LOCAL_URI).asPromise();
    console.log('✅ Connected to local MongoDB.');

    console.log('\n2. Connecting to MongoDB Atlas...');
    atlasConn = await mongoose.createConnection(ATLAS_URI).asPromise();
    console.log('✅ Connected to MongoDB Atlas.');

    const collections = await localConn.db.listCollections().toArray();
    console.log(`\nFound ${collections.length} collections in local database:`);

    for (const col of collections) {
      const colName = col.name;
      if (colName.startsWith('system.')) continue;

      const localCol = localConn.db.collection(colName);
      const atlasCol = atlasConn.db.collection(colName);

      const docs = await localCol.find({}).toArray();
      console.log(`\n📦 Migrating '${colName}': ${docs.length} documents...`);

      if (docs.length > 0) {
        // Clear target collection first to avoid duplicates
        await atlasCol.deleteMany({});
        await atlasCol.insertMany(docs);
        console.log(`   ✅ Successfully copied ${docs.length} documents to '${colName}' on Atlas.`);
      } else {
        console.log(`   ℹ️ Collection '${colName}' is empty, skipped.`);
      }
    }

    console.log('\n====================================================');
    console.log('🎉 Migration Completed Successfully!');
    console.log('Your MongoDB Atlas cloud database is now fully in sync with your local data.');
    console.log('====================================================\n');
  } catch (error) {
    console.error('\n❌ Migration failed:', error.message);
  } finally {
    if (localConn) await localConn.close();
    if (atlasConn) await atlasConn.close();
    process.exit(0);
  }
}

migrate();
