import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Register: React.FC = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    studentId: '',
    department: '',
    year: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      setLoading(false);
      return;
    }

    try {
      const { confirmPassword, ...registerData } = { ...formData, role: 'student' };
      await register(registerData);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="card glass hover-card fade-in" style={{ maxWidth: 700, width: '100%' }}>
        <div className="card-body">
          <div className="mb-6 text-center">
            <h1 className="page-title" style={{ fontSize: 28 }}>Create your account</h1>
            <p className="muted" style={{ marginTop: 6 }}>Student registration</p>
          </div>

          {error && (
            <div className="alert alert-error" role="alert" aria-live="assertive">
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-group">
              <label htmlFor="firstName" className="form-label">First name</label>
              <input id="firstName" name="firstName" type="text" required value={formData.firstName} onChange={handleChange} className="form-input" placeholder="John" />
            </div>

            <div className="form-group">
              <label htmlFor="lastName" className="form-label">Last name</label>
              <input id="lastName" name="lastName" type="text" required value={formData.lastName} onChange={handleChange} className="form-input" placeholder="Doe" />
            </div>

            <div className="form-group md:col-span-2">
              <label htmlFor="email" className="form-label">Email</label>
              <input id="email" name="email" type="email" autoComplete="email" required value={formData.email} onChange={handleChange} className="form-input" placeholder="you@university.edu" />
            </div>

            <div className="form-group">
              <label htmlFor="studentId" className="form-label">Student ID</label>
              <input id="studentId" name="studentId" type="text" required value={formData.studentId} onChange={handleChange} className="form-input" placeholder="24CS001" />
            </div>

            <div className="form-group">
              <label htmlFor="year" className="form-label">Academic year</label>
              <select id="year" name="year" required value={formData.year} onChange={handleChange} className="form-select">
                <option value="">Select year</option>
                <option value="Freshman">Freshman</option>
                <option value="Sophomore">Sophomore</option>
                <option value="Junior">Junior</option>
                <option value="Senior">Senior</option>
                <option value="Graduate">Graduate</option>
              </select>
            </div>

            <div className="form-group md:col-span-2">
              <label htmlFor="department" className="form-label">Department</label>
              <select id="department" name="department" required value={formData.department} onChange={handleChange} className="form-select">
                <option value="">Select department</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Mathematics">Mathematics</option>
                <option value="Physics">Physics</option>
                <option value="English">English</option>
                <option value="Business">Business</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">Password</label>
              <input id="password" name="password" type="password" required value={formData.password} onChange={handleChange} className="form-input" placeholder="••••••••" />
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword" className="form-label">Confirm password</label>
              <input id="confirmPassword" name="confirmPassword" type="password" required value={formData.confirmPassword} onChange={handleChange} className="form-input" placeholder="••••••••" />
            </div>

            <div className="md:col-span-2">
              <button type="submit" className="btn btn-primary btn-lg w-full" disabled={loading}>{loading ? 'Creating…' : 'Create account'}</button>
            </div>
          </form>

          <div className="text-center mt-4">
            <span className="muted">Already have an account? </span>
            <Link to="/login" className="btn btn-outline btn-sm">Sign in</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;