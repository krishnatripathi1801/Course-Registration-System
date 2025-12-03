import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface UserProfile {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  studentId?: string;
  department?: string;
  year?: string;
  gpa?: number;
  phone?: string;
  address?: {
    street?: string;
    city?: string;
    state?: string;
    zipCode?: string;
  };
  createdAt: string;
}

const Profile: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/auth/me');
      setProfile(response.data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="container" style={{ padding: '2rem 1rem' }}>
        <div className="empty-state">
          <div className="empty-state-icon">❌</div>
          <h3 className="empty-state-title">Profile not found</h3>
          <p className="empty-state-description">
            Unable to load your profile information
          </p>
        </div>
      </div>
    );
  }

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="container" style={{ padding: '2rem 1rem' }}>
      <div className="mb-8">
        <h1 className="page-title mb-2">Profile</h1>
        <p className="muted">
          View and manage your account information
        </p>
      </div>

      <div className="card glass fade-in" style={{ overflow: 'hidden' }}>
        <div className="card-body">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="user-avatar" style={{ width: 44, height: 44, fontSize: 16 }}>
                {getInitials(profile.firstName, profile.lastName)}
              </div>
              <div>
                <h2 className="course-title-minimal" style={{ fontSize: 22 }}>
                  {profile.firstName} {profile.lastName}
                </h2>
                <div className="chips mt-1">
                  <span className="badge">{profile.role}</span>
                  {profile.department && <span className="badge">{profile.department}</span>}
                  {profile.year && <span className="badge">{profile.year}</span>}
                </div>
              </div>
            </div>
            <button className="btn btn-outline btn-sm">Edit Profile</button>
          </div>
        </div>

        <div className="card-body">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="section-title mb-3">Contact</h3>
              <div className="space-y-2 muted text-sm">
                <div><strong>Email:</strong> {profile.email}</div>
                {profile.phone && <div><strong>Phone:</strong> {profile.phone}</div>}
                <div><strong>Account Created:</strong> {formatDate(profile.createdAt)}</div>
              </div>
            </div>
            <div>
              <h3 className="section-title mb-3">Student</h3>
              <div className="space-y-2 muted text-sm">
                {profile.studentId && <div><strong>Student ID:</strong> {profile.studentId}</div>}
                {profile.gpa && <div><strong>GPA:</strong> {profile.gpa.toFixed(2)}</div>}
              </div>
            </div>
            {profile.address && (
              <div className="md:col-span-2">
                <h3 className="section-title mb-3">Address</h3>
                <div className="muted text-sm">
                  {profile.address.street && <div>{profile.address.street}</div>}
                  {(profile.address.city || profile.address.state) && (
                    <div>{profile.address.city}{profile.address.city && profile.address.state ? ', ' : ''}{profile.address.state}</div>
                  )}
                  {profile.address.zipCode && <div>{profile.address.zipCode}</div>}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {profile.role === 'student' && (
        <div className="mt-8">
          <div className="card glass fade-in">
            <div className="card-header">
              <h2 className="section-title">Academic Information</h2>
            </div>
            <div className="card-body">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="section-title mb-4">Current Status</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="muted">Academic Level:</span>
                      <span className="font-medium">{profile.year || 'Not specified'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="muted">Department:</span>
                      <span className="font-medium">{profile.department || 'Not specified'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="muted">GPA:</span>
                      <span className="font-medium">{profile.gpa ? profile.gpa.toFixed(2) : 'Not available'}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="section-title mb-4">Quick Actions</h3>
                  <div className="space-y-2">
                    <button className="btn btn-outline w-full">
                      View Transcript
                    </button>
                    <button className="btn btn-outline w-full">
                      Download Schedule
                    </button>
                    <button className="btn btn-outline w-full">
                      Contact Advisor
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
