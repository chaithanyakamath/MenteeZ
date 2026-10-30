import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowRight, UserPlus, GraduationCap, ShieldCheck, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { addToast } = useToast();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const pwdToSubmit = password;
    setPassword('');

    try {
      const user = await login(email, pwdToSubmit);
      addToast(`Welcome back, ${user.name}!`);
      setEmail('');
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans antialiased lg:grid lg:grid-cols-[0.95fr_1.05fr]">
      <section className="relative hidden min-h-screen flex-col justify-between overflow-hidden bg-brand-dark p-12 text-white lg:flex xl:p-16">
        <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full border border-white/10" />
        <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full border border-white/10" />
        <div className="pointer-events-none absolute -bottom-28 -left-20 h-80 w-80 rounded-full bg-brand-red/20 blur-3xl" />

        <Link to="/login" className="relative z-10 flex w-fit items-center gap-3 text-white no-underline">
          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-brand-peach text-brand-dark">
            <GraduationCap size={23} />
          </span>
          <span className="text-xl font-bold tracking-tight">mentee</span>
        </Link>

        <div className="relative z-10 max-w-xl space-y-7">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-semibold tracking-wide text-brand-peach">
            <Sparkles size={14} /> A better kind of guidance
          </span>
          <h2 className="text-5xl font-semibold leading-[1.08] tracking-tight xl:text-6xl">
            Make every next step <span className="text-brand-peach">count.</span>
          </h2>
          <p className="max-w-md text-base leading-7 text-white/65">
            One thoughtful space for student progress, meaningful mentoring, and the milestones that move you forward.
          </p>
        </div>

        <div className="relative z-10 flex items-center gap-3 border-t border-white/10 pt-5 text-xs text-white/60">
          <ShieldCheck size={17} className="text-brand-peach" />
          A secure space for your academic journey
        </div>
      </section>

      <section className="flex min-h-screen items-center justify-center px-6 py-12 sm:px-10">
        <div className="w-full max-w-md space-y-8">
          <Link to="/login" className="flex w-fit items-center gap-2 text-brand-dark no-underline lg:hidden">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand-dark text-brand-peach">
              <GraduationCap size={20} />
            </span>
            <span className="font-bold tracking-tight">mentee</span>
          </Link>

          <div className="space-y-2">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand-red">Your workspace awaits</p>
            <h1 className="text-3xl font-semibold tracking-tight text-brand-dark">Welcome back</h1>
            <p className="text-sm leading-6 text-brand-gray">Sign in to pick up where your progress left off.</p>
          </div>

          {error && (
            <div role="alert" className="rounded-xl border border-brand-red/20 bg-brand-red/10 p-3.5 text-sm font-medium text-brand-red">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="login-email" className="mb-2 block text-sm font-semibold text-brand-dark">Institutional email</label>
              <input
                id="login-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@institution.edu"
                autoComplete="email"
                className="w-full rounded-xl border border-brand-gray-light bg-brand-surface px-4 py-3.5 text-sm outline-none transition focus:border-brand-red focus:ring-4 focus:ring-brand-red/10"
              />
            </div>

            <div>
              <label htmlFor="login-password" className="mb-2 block text-sm font-semibold text-brand-dark">Password</label>
              <input
                id="login-password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                autoComplete="current-password"
                className="w-full rounded-xl border border-brand-gray-light bg-brand-surface px-4 py-3.5 text-sm outline-none transition focus:border-brand-red focus:ring-4 focus:ring-brand-red/10"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-dark py-3.5 text-sm font-bold text-white transition hover:bg-brand-dark-surface disabled:cursor-not-allowed disabled:opacity-60"
            >
              <span>{loading ? 'Verifying your account...' : 'Sign in'}</span>
              {!loading && <ArrowRight size={16} />}
            </button>
          </form>

          <div className="border-t border-brand-gray-light pt-6 text-center">
            <p className="mb-4 text-sm text-brand-gray">New to Mentee?</p>
            <Link
              to="/register"
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-brand-gray-light py-3 text-sm font-semibold text-brand-dark transition hover:border-brand-dark hover:bg-brand-surface"
            >
              <UserPlus size={16} />
              Create an account
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
