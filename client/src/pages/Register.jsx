import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowRight, GraduationCap, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const { addToast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'MENTEE',
    department: 'CSE',
    designation: '',
    studentId: '',
    batch: '2023-2027',
    semester: 1
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const payload = { ...formData };
    // Clear password immediately from React component state
    setFormData(prev => ({ ...prev, password: '' }));

    try {
      await register(payload);
      addToast(`Account created successfully for ${payload.name}!`);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans antialiased lg:grid lg:grid-cols-[0.85fr_1.15fr]">
      <section className="relative hidden min-h-screen flex-col justify-between overflow-hidden bg-brand-dark p-12 text-white lg:flex xl:p-16">
        <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full border border-white/10" />
        <div className="pointer-events-none absolute -bottom-28 -left-20 h-80 w-80 rounded-full bg-brand-red/20 blur-3xl" />
        <Link to="/login" className="relative z-10 flex w-fit items-center gap-3 text-white no-underline">
          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-brand-peach text-brand-dark">
            <GraduationCap size={23} />
          </span>
          <span className="text-xl font-bold tracking-tight">mentee</span>
        </Link>
        <div className="relative z-10 max-w-lg space-y-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-semibold tracking-wide text-brand-peach">
            <Sparkles size={14} /> Your journey, connected
          </span>
          <h2 className="text-5xl font-semibold leading-[1.08] tracking-tight xl:text-6xl">
            Start with a person. Grow with a <span className="text-brand-peach">plan.</span>
          </h2>
          <p className="max-w-md text-base leading-7 text-white/65">
            Join a community built around clear goals, supportive mentors, and progress you can see.
          </p>
        </div>
        <p className="relative z-10 text-xs text-white/50">A connected campus. A more confident next step.</p>
      </section>

      <section className="flex min-h-screen items-center justify-center px-6 py-10 sm:px-10">
        <div className="w-full max-w-xl space-y-6">
          <Link to="/login" className="flex w-fit items-center gap-2 text-brand-dark no-underline lg:hidden">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand-dark text-brand-peach">
              <GraduationCap size={20} />
            </span>
            <span className="font-bold tracking-tight">mentee</span>
          </Link>

          <div className="space-y-1">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand-red">Join the community</p>
            <h1 className="text-2xl font-semibold tracking-tight text-brand-dark">Create your account</h1>
            <p className="text-sm text-brand-gray">Set up your Mentee workspace in a few steps.</p>
          </div>

        {error && (
          <div className="p-3.5 rounded-2xl bg-brand-red/10 border border-brand-red/20 text-xs font-semibold text-brand-red">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-brand-dark mb-1">Full Name</label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Dr. Alan Turing or Alice Johnson"
              className="w-full p-3 rounded-xl border border-brand-gray-light bg-brand-surface text-xs font-medium outline-none focus:ring-2 focus:ring-brand-dark"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-brand-dark mb-1">Institutional Email</label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="e.g. user@institution.edu"
              className="w-full p-3 rounded-xl border border-brand-gray-light bg-brand-surface text-xs font-medium outline-none focus:ring-2 focus:ring-brand-dark"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-brand-dark mb-1">Password (min 6 characters)</label>
            <input
              type="password"
              name="password"
              required
              minLength={6}
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full p-3 rounded-xl border border-brand-gray-light bg-brand-surface text-xs font-medium outline-none focus:ring-2 focus:ring-brand-dark"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-brand-dark mb-1">Role</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full p-3 rounded-xl border border-brand-gray-light bg-brand-surface text-xs font-bold"
              >
                <option value="MENTEE">Mentee (Student)</option>
                <option value="MENTOR">Mentor (Faculty)</option>
                <option value="HOD">Head of Department (HOD)</option>
                <option value="ADMIN">System Administrator</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-brand-dark mb-1">Department</label>
              <select
                name="department"
                value={formData.department}
                onChange={handleChange}
                className="w-full p-3 rounded-xl border border-brand-gray-light bg-brand-surface text-xs font-medium"
              >
                <option value="CSE">Computer Science (CSE)</option>
                <option value="ECE">Electronics (ECE)</option>
                <option value="MECH">Mechanical (MECH)</option>
              </select>
            </div>
          </div>

          {formData.role === 'MENTEE' && (
            <div className="grid grid-cols-2 gap-3 pt-1">
              <div>
                <label className="block text-xs font-bold text-brand-dark mb-1">Student ID / Roll No</label>
                <input
                  type="text"
                  name="studentId"
                  value={formData.studentId}
                  onChange={handleChange}
                  placeholder="e.g. CS2024-001"
                  className="w-full p-3 rounded-xl border border-brand-gray-light bg-brand-surface text-xs font-medium outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-brand-dark mb-1">Current Semester</label>
                <input
                  type="number"
                  min="1"
                  max="8"
                  name="semester"
                  value={formData.semester}
                  onChange={handleChange}
                  className="w-full p-3 rounded-xl border border-brand-gray-light bg-brand-surface text-xs font-medium outline-none"
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-full bg-brand-red hover:bg-brand-red-hover text-white text-xs font-bold shadow-md transition-all flex items-center justify-center gap-2 mt-4"
          >
            {loading ? (
              <span>Creating Account in MongoDB...</span>
            ) : (
              <>
                <span>Complete Registration</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </form>

        <div className="text-center pt-2 border-t border-brand-gray-light/60">
          <p className="text-xs text-brand-gray">
            Already have an account?{' '}
            <Link to="/login" className="font-bold text-brand-dark hover:text-brand-red underline">
              Sign In here
            </Link>
          </p>
        </div>
        </div>
      </section>
    </div>
  );
};
