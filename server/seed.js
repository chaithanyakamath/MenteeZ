/**
 * MEntee Seed Script
 * Populates realistic accounts (Admin, HOD, Faculty Mentors, Students) and linked records.
 * Can be run locally or directly against MongoDB Atlas:
 *   node server/seed.js
 * Or with custom connection string:
 *   node server/seed.js "mongodb+srv://..."
 */
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

import { User } from './models/User.js';
import { StudentProfile } from './models/StudentProfile.js';
import { AcademicRecord, AttendanceRecord, Project, Certification, MentorNote, MentoringMeeting } from './models/Entities.js';
import { connectDB } from './db.js';

const customUri = process.argv[2];
if (customUri) {
  process.env.MONGODB_URI = customUri;
}

const DEFAULT_PASSWORD = 'Password@123';

async function seed() {
  console.log('🌱 Starting MEntee database seed...');
  await connectDB();

  try {
    // 1. Create or update Admin
    let admin = await User.findOne({ email: 'admin@mentee.edu' });
    if (!admin) {
      admin = await User.create({
        name: 'System Administrator',
        email: 'admin@mentee.edu',
        password: DEFAULT_PASSWORD,
        role: 'ADMIN',
        department: 'Administration',
        designation: 'Institutional Admin',
        avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Admin'
      });
      console.log('✅ Created Admin: admin@mentee.edu');
    }

    // 2. Create or update HOD
    let hod = await User.findOne({ email: 'hod.cse@mentee.edu' });
    if (!hod) {
      hod = await User.create({
        name: 'Dr. Ramesh Kumar',
        email: 'hod.cse@mentee.edu',
        password: DEFAULT_PASSWORD,
        role: 'HOD',
        department: 'CSE',
        designation: 'Head of Department',
        avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=DrRamesh'
      });
      console.log('✅ Created HOD: hod.cse@mentee.edu');
    }

    // 3. Create or update Mentors
    let mentor1 = await User.findOne({ email: 'mentor.sharma@mentee.edu' });
    if (!mentor1) {
      mentor1 = await User.create({
        name: 'Prof. Rajesh Sharma',
        email: 'mentor.sharma@mentee.edu',
        password: DEFAULT_PASSWORD,
        role: 'MENTOR',
        department: 'CSE',
        designation: 'Associate Professor & Mentor',
        avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=ProfSharma'
      });
      console.log('✅ Created Mentor: mentor.sharma@mentee.edu');
    }

    let mentor2 = await User.findOne({ email: 'mentor.patel@mentee.edu' });
    if (!mentor2) {
      mentor2 = await User.create({
        name: 'Dr. Priya Patel',
        email: 'mentor.patel@mentee.edu',
        password: DEFAULT_PASSWORD,
        role: 'MENTOR',
        department: 'CSE',
        designation: 'Assistant Professor & Mentor',
        avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=DrPatel'
      });
      console.log('✅ Created Mentor: mentor.patel@mentee.edu');
    }

    // 4. Create Students
    // Student 1 (Assigned to Mentor 1)
    let studentUser1 = await User.findOne({ email: 'student.aarav@mentee.edu' });
    if (!studentUser1) {
      studentUser1 = await User.create({
        name: 'Aarav Mehta',
        email: 'student.aarav@mentee.edu',
        password: DEFAULT_PASSWORD,
        role: 'MENTEE',
        department: 'CSE',
        designation: 'Student',
        avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=AaravMehta'
      });

      await StudentProfile.create({
        user: studentUser1._id,
        studentId: 'CS-2023-0101',
        registerNo: 'RA2311003010101',
        department: 'Computer Science & Engineering',
        batch: '2023-2027',
        semester: 3,
        section: 'A',
        cgpa: 8.85,
        backlogs: 0,
        mentor: mentor1._id,
        mentorAssignedAt: new Date(),
        mentorAssignedBy: hod._id,
        attendancePercentage: 92,
        status: 'EXCELLENT',
        profileCompletion: 85
      });
      console.log('✅ Created Student (Assigned): student.aarav@mentee.edu');
    }

    // Student 2 (Assigned to Mentor 1)
    let studentUser2 = await User.findOne({ email: 'student.ananya@mentee.edu' });
    if (!studentUser2) {
      studentUser2 = await User.create({
        name: 'Ananya Iyer',
        email: 'student.ananya@mentee.edu',
        password: DEFAULT_PASSWORD,
        role: 'MENTEE',
        department: 'CSE',
        designation: 'Student',
        avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=AnanyaIyer'
      });

      await StudentProfile.create({
        user: studentUser2._id,
        studentId: 'CS-2023-0102',
        registerNo: 'RA2311003010102',
        department: 'Computer Science & Engineering',
        batch: '2023-2027',
        semester: 3,
        section: 'A',
        cgpa: 7.9,
        backlogs: 0,
        mentor: mentor1._id,
        mentorAssignedAt: new Date(),
        mentorAssignedBy: hod._id,
        attendancePercentage: 88,
        status: 'ON_TRACK',
        profileCompletion: 75
      });
      console.log('✅ Created Student (Assigned): student.ananya@mentee.edu');
    }

    // Student 3 (Unassigned - for testing HOD assignment portal)
    let studentUser3 = await User.findOne({ email: 'student.rohit@mentee.edu' });
    if (!studentUser3) {
      studentUser3 = await User.create({
        name: 'Rohit Verma',
        email: 'student.rohit@mentee.edu',
        password: DEFAULT_PASSWORD,
        role: 'MENTEE',
        department: 'CSE',
        designation: 'Student',
        avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=RohitVerma'
      });

      await StudentProfile.create({
        user: studentUser3._id,
        studentId: 'CS-2023-0103',
        registerNo: 'RA2311003010103',
        department: 'Computer Science & Engineering',
        batch: '2023-2027',
        semester: 3,
        section: 'B',
        cgpa: 7.2,
        backlogs: 1,
        mentor: null, // Unassigned
        attendancePercentage: 74,
        status: 'AT_RISK',
        riskReason: 'Low attendance and 1 backlog in Data Structures',
        profileCompletion: 60
      });
      console.log('✅ Created Student (Unassigned): student.rohit@mentee.edu');
    }

    console.log('\n====================================================');
    console.log('🎉 Seed Completed Successfully!');
    console.log('----------------------------------------------------');
    console.log('Default Password for all seeded accounts: Password@123');
    console.log('• Admin:    admin@mentee.edu');
    console.log('• HOD:      hod.cse@mentee.edu');
    console.log('• Mentor:   mentor.sharma@mentee.edu');
    console.log('• Mentor 2: mentor.patel@mentee.edu');
    console.log('• Student:  student.aarav@mentee.edu');
    console.log('• Student:  student.ananya@mentee.edu');
    console.log('• Student:  student.rohit@mentee.edu (Unassigned)');
    console.log('====================================================\n');
  } catch (err) {
    console.error('❌ Seeding failed:', err);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

seed();
