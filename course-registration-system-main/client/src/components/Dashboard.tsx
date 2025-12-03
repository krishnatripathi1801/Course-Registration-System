import React, { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';

interface Course {
  _id: string;
  courseCode: string;
  courseName: string;
  description: string;
  credits: number;
  department: string;
  level: string;
  category: string;
  prerequisites: Course[];
}

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

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [courses, setCourses] = useState<Course[]>([]);
  const [classes, setClasses] = useState<Class[]>([]);
  const [, setMyRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);
  const [showProfessorSelection, setShowProfessorSelection] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [selectedClassId, setSelectedClassId] = useState<string | null>(null);
  const [toasts, setToasts] = useState<Array<{ id: number; type: 'success' | 'error'; message: string }>>([]);
  const [totalCredits, setTotalCredits] = useState(0);
  const maxCredits = 27;

  const courseCategories = [
    { id: 'program-core', name: 'Program Core', icon: '📘', subtitle: 'Core requirements' },
    { id: 'program-elective', name: 'Electives', icon: '🎓', subtitle: 'Choose freely' },
    { id: 'open-elective', name: 'Open Electives', icon: '🌍', subtitle: 'Across departments' },
    { id: 'minor', name: 'Minor', icon: '🧑‍🔬', subtitle: 'Specialization set' },
    { id: 'honors', name: 'Honors', icon: '⭐', subtitle: 'Advanced track' },
    { id: 'project', name: 'Thesis/Project', icon: '📑', subtitle: 'Capstone work' }
  ];

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const [coursesRes, classesRes, registrationsRes] = await Promise.all([
        axios.get('/api/courses'),
        axios.get('/api/classes'),
        user?.role === 'student' ? axios.get('/api/registrations') : Promise.resolve({ data: [] }),
      ]);

      setCourses(coursesRes.data);
      setClasses(classesRes.data);
      setMyRegistrations(registrationsRes.data);
      // compute total credits from current registrations
      const regs: Registration[] = registrationsRes.data as Registration[];
      const sum = regs
        .filter(r => r.status === 'registered')
        .reduce((acc, r) => acc + (r.class?.course?.credits || r.creditsEarned || 0), 0);
      setTotalCredits(sum);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  }, [user?.role]);

  const location = useLocation();
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Handle deep links like /dashboard?courseId=...
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const courseId = params.get('courseId');
    if (courseId && courses.length > 0) {
      const course = courses.find(c => c._id === courseId);
      if (course) {
        // Optionally set category if present to provide context
        if ((course as any).category) {
          setSelectedCategory((course as any).category);
        }
        handleCourseSelect(course);
      }
    }
  }, [location.search, courses]);

  const getCoursesByCategory = (category: string) => {
    // Use the category field from the database
    return courses.filter(course => course.category === category);
  };

  const getClassesForCourse = (courseId: string) => {
    return classes.filter(cls => cls.course._id === courseId);
  };

  const handleCourseSelect = (course: Course) => {
    if (totalCredits + course.credits > maxCredits) {
      showToast('error', `Cannot register: exceeds credit limit of ${maxCredits}.`);
      return;
    }
    setSelectedCourse(course);
    setSelectedClassId(null);
    setShowProfessorSelection(true);
  };

  const handleRegister = async (classId: string) => {
    try {
      await axios.post('/api/registrations', {
        classId,
        semester: 'Fall',
        year: 2024
      });
      
      // Update credit count
      if (selectedCourse) {
        setTotalCredits(prev => prev + selectedCourse.credits);
      }
      setShowProfessorSelection(false);
      setSelectedCourse(null);
      setSelectedClassId(null);
      
      // Refresh data
      fetchData();
      showToast('success', 'Course registered successfully');
    } catch (error) {
      console.error('Registration failed:', error);
      showToast('error', 'Registration failed. Please try again.');
    }
  };

  const showToast = (type: 'success' | 'error', message: string) => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, type, message }]);
    window.setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3600);
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

  if (loading) {
    return (
      <div className="flex items-center justify-center" style={{ minHeight: '60vh' }}>
        <div className="text-center">
          <div className="spinner mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold">Loading your courses…</h2>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="container" style={{ paddingTop: 24, paddingBottom: 8 }}>
        <div className="flex justify-between items-center">
          <div>
            <h1 className="page-title">Choose Your Courses</h1>
            <p className="muted">Browse categories and register</p>
          </div>
          <div className="profile-chip">
            <span className="muted">Credits</span>
            <span className="badge">{totalCredits}/{maxCredits}</span>
          </div>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Course Categories */}
        <div className="container" style={{ paddingTop: 8, paddingBottom: 24 }}>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {courseCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`card category-card fade-in ${selectedCategory === cat.id ? 'selected' : ''}`}
              >
                <div className="category-icon" aria-hidden>{cat.icon}</div>
                <div>
                  <div className="category-title">{cat.name}</div>
                  <div className="category-subtitle">{cat.subtitle}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Course List */}
        {selectedCategory && (
          <div className="container" style={{ paddingBottom: 16 }}>
            <div className="card glass" style={{ padding: 16 }}>
              <div className="text-center mb-6">
                <h3 className="section-title">{courseCategories.find(c => c.id === selectedCategory)?.name} Courses</h3>
                <p className="muted">Explore and register</p>
              </div>
              {getCoursesByCategory(selectedCategory).length === 0 ? (
                <div className="empty-state">
                  <div className="empty-state-icon">📚</div>
                  <h3 className="empty-state-title">No courses yet</h3>
                  <p className="empty-state-description">Courses for this category will appear here when available.</p>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 gap-4">
                  {getCoursesByCategory(selectedCategory).map((course) => (
                    <div key={course._id} className="card glass hover-card fade-in" style={{ padding: 16 }}>
                      <div className="flex justify-between items-start mb-2">
                        <div className="chips" style={{ flexWrap: 'wrap' }}>
                          <span className="chip info">{course.courseCode}</span>
                          <span className="chip success">{course.credits} cr</span>
                        </div>
                      </div>
                      <div className="course-title-minimal">{course.courseName}</div>
                      <p className="muted" style={{ marginTop: 6 }}>{course.description}</p>
                      <div className="flex justify-between items-center" style={{ marginTop: 12 }}>
                        <span className="muted">{course.department} • {course.level}</span>
                        <button className="btn btn-primary btn-sm" onClick={() => handleCourseSelect(course)}>Register</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Professor Selection Modal */}
        {showProfessorSelection && selectedCourse && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeInUp">
            <div className="card" style={{ maxWidth: '860px', width: '100%', maxHeight: '90vh', overflowY: 'auto' }}>
              <div className="card-header" style={{ paddingBottom: 12 }}>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="section-title" style={{ marginBottom: 6 }}>
                      Choose a class for {selectedCourse.courseName}
                    </h3>
                    <p className="muted">{selectedCourse.courseCode} • {selectedCourse.credits} Credits</p>
                  </div>
                  <button onClick={() => setShowProfessorSelection(false)} className="btn btn-outline">Close</button>
                </div>
              </div>
              <div className="card-body">
                {getClassesForCourse(selectedCourse._id).length === 0 ? (
                  <div className="text-center py-16">
                    <div style={{ fontSize: 48, marginBottom: 12 }}>👨‍🏫</div>
                    <h3 className="section-title">No classes available</h3>
                    <p className="muted">No classes are currently scheduled for this course.</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {getClassesForCourse(selectedCourse._id).map((cls) => {
                      const full = cls.isFull || cls.availableSpots <= 0;
                      return (
                        <label key={cls._id} className={`card hover-card`} style={{ padding: 14, cursor: full ? 'not-allowed' : 'pointer', opacity: full ? 0.7 : 1 }}>
                          <div className="flex items-center justify-between" style={{ gap: 14 }}>
                            <div className="flex items-center" style={{ gap: 12 }}>
                              <input
                                type="radio"
                                name="classChoice"
                                value={cls._id}
                                checked={selectedClassId === cls._id}
                                onChange={() => !full && setSelectedClassId(cls._id)}
                                disabled={full}
                                className="w-5 h-5"
                              />
                              <div>
                                <div className="course-title-minimal">Prof. {cls.professor.firstName} {cls.professor.lastName}</div>
                                <div className="muted" style={{ fontSize: 12 }}>{cls.professor.department} • Section {cls.section}</div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-gray-700 font-medium">
                                {formatDays(cls.schedule.days)} • {formatTime(cls.schedule.startTime)} - {formatTime(cls.schedule.endTime)}
                              </div>
                              <div className="muted" style={{ fontSize: 12 }}>Room {cls.schedule.room}</div>
                              <div style={{ fontSize: 12, fontWeight: 700, marginTop: 4, color: full ? '#dc2626' : '#059669' }}>
                                {full ? 'Full' : `Available: ${cls.availableSpots}/${cls.maxCapacity}`}
                              </div>
                            </div>
                          </div>
                        </label>
                      );
                    })}
                  </div>
                )}
              </div>
              <div className="card-footer" style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
                <button className="btn btn-outline" onClick={() => setShowProfessorSelection(false)}>Cancel</button>
                <button
                  className="btn btn-primary"
                  disabled={!selectedClassId}
                  onClick={() => selectedClassId && handleRegister(selectedClassId)}
                >
                  Confirm Registration
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Inline Toasts */}
        <div className="toast" aria-live="polite" aria-atomic="true">
          {toasts.map(t => (
            <div key={t.id} className={`toast-item ${t.type === 'success' ? 'toast-success' : 'toast-error'} fade-in`}>
              <div className="toast-icon">{t.type === 'success' ? '✓' : '✕'}</div>
              <div className="toast-message">{t.message}</div>
              <button className="toast-close" onClick={() => setToasts(prev => prev.filter(x => x.id !== t.id))}>✕</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
