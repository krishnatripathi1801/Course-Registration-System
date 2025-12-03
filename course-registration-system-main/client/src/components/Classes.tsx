import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

interface Class {
  _id: string;
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
    department: string;
  };
  semester: string;
  year: number;
  section: string;
  schedule: {
    days: string[];
    startTime: string;
    endTime: string;
    room: string;
  };
  maxCapacity: number;
  currentEnrollment: number;
  isFull: boolean;
  availableSpots: number;
}

const Classes: React.FC = () => {
  const [classes, setClasses] = useState<Class[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    semester: 'Fall',
    year: '2024',
    department: '',
    professor: '',
  });

  const fetchClasses = useCallback(async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (filters.semester) params.append('semester', filters.semester);
      if (filters.year) params.append('year', filters.year);
      if (filters.department) params.append('department', filters.department);
      if (filters.professor) params.append('professor', filters.professor);

      const response = await axios.get(`/api/classes?${params.toString()}`);
      setClasses(response.data);
    } catch (error) {
      console.error('Error fetching classes:', error);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchClasses();
  }, [fetchClasses]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const departments = Array.from(new Set(classes.map(cls => cls.course.department)));
  const professors = Array.from(new Set(classes.map(cls => `${cls.professor.firstName} ${cls.professor.lastName}`)));

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
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Classes</h1>
        <p className="text-gray-600">
          View all available classes for the current semester
        </p>
      </div>

      <div className="search-filters">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Filter Classes</h3>
        <div className="filters-grid">
          <div className="form-group">
            <label htmlFor="semester" className="form-label">Semester</label>
            <select
              id="semester"
              name="semester"
              value={filters.semester}
              onChange={handleFilterChange}
              className="form-select"
            >
              <option value="Fall">Fall</option>
              <option value="Spring">Spring</option>
              <option value="Summer">Summer</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="year" className="form-label">Year</label>
            <select
              id="year"
              name="year"
              value={filters.year}
              onChange={handleFilterChange}
              className="form-select"
            >
              <option value="2024">2024</option>
              <option value="2025">2025</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="department" className="form-label">Department</label>
            <select
              id="department"
              name="department"
              value={filters.department}
              onChange={handleFilterChange}
              className="form-select"
            >
              <option value="">All Departments</option>
              {departments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="professor" className="form-label">Professor</label>
            <select
              id="professor"
              name="professor"
              value={filters.professor}
              onChange={handleFilterChange}
              className="form-select"
            >
              <option value="">All Professors</option>
              {professors.map(prof => (
                <option key={prof} value={prof}>{prof}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {classes.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">🎓</div>
          <h3 className="empty-state-title">No classes found</h3>
          <p className="empty-state-description">Try adjusting your search criteria</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {classes.map(cls => (
            <div key={cls._id} className="card glass hover-card fade-in p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="chips">
                  <span className="chip info">{cls.course.courseCode}</span>
                  <span className="chip success">{cls.course.credits} credits</span>
                  <span className="badge">Section {cls.section}</span>
                </div>
                <span className="muted text-sm">{formatDays(cls.schedule.days)} {formatTime(cls.schedule.startTime)}-{formatTime(cls.schedule.endTime)}</span>
              </div>

              <div className="course-title-minimal">{cls.course.courseName}</div>
              <p className="muted">Prof. {cls.professor.firstName} {cls.professor.lastName}</p>

              <div className="mt-3 flex items-center justify-between">
                <span className="muted text-sm">Room: {cls.schedule.room}</span>
                <span className={`chip ${cls.isFull ? 'warn' : 'success'}`}>
                  {cls.availableSpots} spots left
                </span>
              </div>

              <div className="mt-4 pt-3" style={{ borderTop: '1px solid #e5e7eb' }}>
                <div className="flex justify-between items-center text-sm muted">
                  <span>{cls.semester} {cls.year}</span>
                  <span>{cls.course.department}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Classes;
