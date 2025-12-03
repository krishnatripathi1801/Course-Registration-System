import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

interface Registration {
  _id: string;
  class: {
    _id: string;
    section: string;
    schedule: {
      days: string[];
      startTime: string;
      endTime: string;
      room: string;
    };
    course: {
      _id: string;
      courseCode: string;
      courseName: string;
      credits: number;
      department: string;
    };
    professor: {
      _id: string;
      firstName: string;
      lastName: string;
      email: string;
    };
  };
  semester: string;
  year: number;
  registrationDate: string;
  status: string;
  grade?: string;
  creditsEarned: number;
}

const MyRegistrations: React.FC = () => {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  const fetchRegistrations = useCallback(async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (filter !== 'all') {
        params.append('status', filter);
      }

      const response = await axios.get(`/api/registrations?${params.toString()}`);
      setRegistrations(response.data);
    } catch (error) {
      console.error('Error fetching registrations:', error);
    } finally {
      setLoading(false);
    }
  }, [filter]);

  useEffect(() => {
    fetchRegistrations();
  }, [fetchRegistrations]);

  const handleDropClass = async (registrationId: string) => {
    if (!window.confirm('Are you sure you want to drop this class?')) {
      return;
    }

    try {
      await axios.delete(`/api/registrations/${registrationId}`);
      setRegistrations(registrations.filter(reg => reg._id !== registrationId));
    } catch (error) {
      console.error('Error dropping class:', error);
      alert('Failed to drop class. Please try again.');
    }
  };

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  const formatDays = (days: string[]) => {
    return days.map(day => day.substring(0, 3)).join(', ');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'registered':
        return 'status-registered';
      case 'dropped':
        return 'status-dropped';
      case 'waitlisted':
        return 'status-waitlisted';
      default:
        return 'status-registered';
    }
  };

  const getTotalCredits = () => {
    // Sum credits from registered classes; creditsEarned is not populated in seed
    return registrations
      .filter(reg => reg.status === 'registered')
      .reduce((total, reg) => total + (reg.class?.course?.credits || 0), 0);
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: '2rem 1rem' }}>
      <div className="mb-8">
        <h1 className="page-title mb-2">My Registrations</h1>
        <p className="muted">Manage your current semester classes</p>
      </div>

      {/* Top stats */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="card glass p-4 fade-in">
          <div className="course-title-minimal" style={{ fontSize: 24 }}>{registrations.length}</div>
          <div className="muted">Total Registrations</div>
        </div>
        <div className="card glass p-4 fade-in" style={{ animationDelay: '60ms' }}>
          <div className="course-title-minimal" style={{ fontSize: 24 }}>{registrations.filter(r => r.status === 'registered').length}</div>
          <div className="muted">Active</div>
        </div>
        <div className="card glass p-4 fade-in" style={{ animationDelay: '120ms' }}>
          <div className="course-title-minimal" style={{ fontSize: 24 }}>{getTotalCredits()}</div>
          <div className="muted">Total Credits</div>
        </div>
      </div>

      {/* Filter */}
      <div className="search-filters">
        <h3 className="section-title mb-4">Filter Registrations</h3>
        <div className="form-group" style={{ maxWidth: 240 }}>
          <label htmlFor="filter" className="form-label">Status</label>
          <select id="filter" name="filter" value={filter} onChange={(e) => setFilter(e.target.value)} className="form-select">
            <option value="all">All Registrations</option>
            <option value="registered">Registered</option>
            <option value="dropped">Dropped</option>
            <option value="waitlisted">Waitlisted</option>
          </select>
        </div>
      </div>

      {/* List */}
      {registrations.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">📝</div>
          <h3 className="empty-state-title">No registrations found</h3>
          <p className="empty-state-description">Browse courses and register to see them here.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {registrations.map((reg) => (
            <div key={reg._id} className="card glass p-4 fade-in">
              {/* Row 1: Title + status */}
              <div className="flex justify-between items-start mb-2">
                <div>
                  <div className="chips mb-1">
                    <span className="chip info">{reg.class.course.courseCode}</span>
                    <span className="chip success">{reg.class.course.credits} cr</span>
                    <span className="badge">Sec {reg.class.section}</span>
                  </div>
                  <h3 className="course-title-minimal" style={{ fontSize: 18 }}>{reg.class.course.courseName}</h3>
                </div>
                <div className="chips">
                  <span className={`chip ${reg.status === 'registered' ? 'success' : reg.status === 'waitlisted' ? 'warn' : ''}`}>
                    {reg.status.charAt(0).toUpperCase() + reg.status.slice(1)}
                  </span>
                  {reg.grade && <span className="badge">Grade: {reg.grade}</span>}
                </div>
              </div>

              {/* Row 2: Details grid */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="muted">
                  <div className="mini-row"><span className="dot"></span><strong>Professor:</strong>&nbsp;{reg.class.professor.firstName} {reg.class.professor.lastName}</div>
                  <div className="mini-row"><span className="dot"></span><strong>Room:</strong>&nbsp;{reg.class.schedule.room}</div>
                </div>
                <div className="muted">
                  <div className="mini-row"><span className="dot"></span><strong>Schedule:</strong>&nbsp;{formatDays(reg.class.schedule.days)} {formatTime(reg.class.schedule.startTime)}–{formatTime(reg.class.schedule.endTime)}</div>
                  <div className="mini-row"><span className="dot"></span><strong>Registered:</strong>&nbsp;{new Date(reg.registrationDate).toLocaleDateString()}</div>
                </div>
              </div>

              {/* Row 3: Footer */}
              <div className="mt-4 pt-3 border-top">
                <div className="flex justify-between items-center">
                  <div className="muted text-sm chips">
                    <span className="badge">{reg.class.course.department}</span>
                    <span className="badge">{reg.semester} {reg.year}</span>
                  </div>
                  {reg.status === 'registered' && (
                    <button onClick={() => handleDropClass(reg._id)} className="btn btn-danger btn-sm">Drop Class</button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyRegistrations;
