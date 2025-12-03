import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface Course {
  _id: string;
  courseCode: string;
  courseName: string;
  description: string;
  credits: number;
  department: string;
  level: string;
  maxCapacity: number;
  currentEnrollment: number;
  prerequisites: Course[];
}

const Courses: React.FC = () => {
  const navigate = useNavigate();
  const [allCourses, setAllCourses] = useState<Course[]>([]);
  const [allClasses, setAllClasses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState<string>('');
  const [selectedLevel, setSelectedLevel] = useState<string>('');
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        const [coursesRes, classesRes] = await Promise.all([
          axios.get('/api/courses'),
          axios.get('/api/classes')
        ]);
        setAllCourses(coursesRes.data as Course[]);
        setAllClasses(classesRes.data as any[]);
      } catch (error) {
        console.error('Error fetching courses/classes:', error);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  const allDepartments = useMemo<string[]>(
    () => Array.from(new Set<string>(allCourses.map(c => c.department))).sort(),
    [allCourses]
  );
  const allLevels = useMemo<string[]>(
    () => Array.from(new Set<string>(allCourses.map(c => c.level))).sort(),
    [allCourses]
  );

  const departmentsWithCounts = useMemo(
    () => {
      const map: Record<string, number> = {};
      allCourses.forEach(c => { map[c.department] = (map[c.department] || 0) + 1; });
      return Object.entries(map).sort((a,b) => a[0].localeCompare(b[0]));
    },
    [allCourses]
  );

  const filteredCourses = useMemo(() => {
    const s = search.trim().toLowerCase();
    return allCourses.filter(c =>
      (selectedDepartment === '' || c.department === selectedDepartment) &&
      (selectedLevel === '' || c.level === selectedLevel) &&
      (s === '' ||
        c.courseName.toLowerCase().includes(s) ||
        c.courseCode.toLowerCase().includes(s) ||
        c.department.toLowerCase().includes(s))
    );
  }, [allCourses, selectedDepartment, selectedLevel, search]);

  const toggleExpand = (id: string) => {
    setExpanded(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const sectionsForCourse = useCallback((courseId: string) => {
    const list = allClasses.filter(cls => cls.course?._id === courseId);
    const profs = Array.from(new Set(list.map((l:any) => `${l.professor?.firstName} ${l.professor?.lastName}`))).slice(0, 3);
    const times = Array.from(new Set(list.map((l:any) => `${(l.schedule?.days||[]).map((d:string)=>d.substring(0,3)).join('/')}`))).slice(0, 3);
    const totalSeats = list.reduce((acc:number, l:any) => acc + (l.maxCapacity || 0), 0);
    const taken = list.reduce((acc:number, l:any) => acc + (l.currentEnrollment || 0), 0);
    return { count: list.length, profs, times, open: Math.max(totalSeats - taken, 0), totalSeats };
  }, [allClasses]);

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
        <div className="breadcrumbs">Dashboard / <a href="#">Courses</a></div>
        <h1 className="page-title mb-2">Courses</h1>
        <p className="muted">Browse all available courses and their details</p>
      </div>

      {/* Subject tiles for quick filter */}
      {departmentsWithCounts.length > 0 && (
        <div className="mb-6">
          <h3 className="section-title mb-3">Subjects</h3>
          <div className="chips" style={{ flexWrap: 'wrap' }}>
            <button className={`chip ${selectedDepartment === '' ? 'info' : ''}`} onClick={() => setSelectedDepartment('')}>All</button>
            {departmentsWithCounts.map(([dept, count]) => (
              <button key={dept} className={`chip ${selectedDepartment === dept ? 'success' : ''}`} onClick={() => setSelectedDepartment(dept)}>
                {dept} <span className="badge">{count}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="search-filters">
        <div className="filters-actions">
          <h3 className="section-title">Filter Courses</h3>
          <button className="btn btn-outline btn-sm filters-toggle">Filters</button>
        </div>
        <div className="filters-grid">
          <div className="form-group">
            <label htmlFor="search" className="form-label">Search</label>
            <input
              type="text"
              id="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="form-input"
              placeholder="Search by name, code, or department"
            />
          </div>

          <div className="form-group">
            <label htmlFor="department" className="form-label">Department</label>
            <select
              id="department"
              className="form-select"
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
            >
              <option value="">All Departments</option>
              {allDepartments.map((dept) => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="level" className="form-label">Level</label>
            <select
              id="level"
              className="form-select"
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
            >
              <option value="">All Levels</option>
              {allLevels.map((lvl) => (
                <option key={lvl} value={lvl}>{lvl}</option>
              ))}
            </select>
          </div>
        </div>

      </div>

      {filteredCourses.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">📚</div>
          <h3 className="empty-state-title">No courses found</h3>
          <p className="empty-state-description">Try adjusting your search criteria</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map(course => (
            <div
              key={course._id}
              className="card glass hover-card fade-in"
              style={{ display: 'flex', flexDirection: 'column', height: '100%', position: 'relative', padding: '1rem' }}
            >
              {/* Availability corner badge */}
              <div className="corner-badge">
                {course.currentEnrollment >= course.maxCapacity ? 'Full' : 'Open'}
              </div>

              {/* Header: code + title */}
              <div className="mb-2">
                <div className="muted" style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, \"Liberation Mono\", \"Courier New\", monospace', fontSize: 12, letterSpacing: '0.02em' }}>
                  {course.courseCode}
                </div>
                <h3 className="course-title-minimal" style={{ marginTop: 4 }}>{course.courseName}</h3>
              </div>

              {/* Meta */}
              <div className="muted" style={{ fontSize: 13 }}>
                {course.department} • {course.level} • {course.credits} cr
              </div>

              {/* Description */}
              <p className="muted" style={{ marginTop: 8 }}>
                {expanded[course._id]
                  ? course.description
                  : (course.description?.length > 160
                    ? `${course.description.slice(0, 160)}...`
                    : course.description)}
              </p>
              {course.description && course.description.length > 160 && (
                <button
                  style={{
                    marginTop: 6,
                    background: 'transparent',
                    border: 'none',
                    color: 'var(--accent)',
                    fontSize: 12,
                    cursor: 'pointer',
                    padding: 0,
                  }}
                  onClick={() => toggleExpand(course._id)}
                >
                  {expanded[course._id] ? 'Show less' : 'Read more'}
                </button>
              )}

              {/* Optional details when expanded */}
              {expanded[course._id] && course.prerequisites.length > 0 && (
                <div className="muted" style={{ fontSize: 12, marginTop: 8 }}>
                  Prerequisites: {course.prerequisites.map(p => p.courseCode).join(', ')}
                </div>
              )}

              <div style={{ marginTop: 'auto' }} />

              {/* Sections preview */}
              <div className="mt-2">
                {(() => { const s = sectionsForCourse(course._id); return (
                  <div className="muted" style={{ fontSize: 12 }}>
                    {s.count > 0 ? (
                      <>
                        <div className="mini-row"><span className="dot"></span>{s.count} section{ s.count>1 ? 's':'' } • {s.open}/{s.totalSeats} seats open</div>
                        {s.profs.length>0 && <div className="mini-row"><span className="dot"></span>Faculties: {s.profs.join(', ')}{sectionsForCourse(course._id).profs.length>3?'…':''}</div>}
                        {s.times.length>0 && <div className="mini-row"><span className="dot"></span>Days: {s.times.join(', ')}</div>}
                      </>
                    ) : (
                      <div className="mini-row"><span className="dot"></span>No scheduled sections</div>
                    )}
                  </div>
                ); })()}
              </div>

              {/* Footer */}
              <div className="mt-4" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
                {(() => { const s = sectionsForCourse(course._id); const full = s.count>0 && s.open<=0; return (
                  <>
                    <span className="muted" style={{ fontSize: 12 }}>{s.count} section{s.count>1?'s':''} • {s.open}/{s.totalSeats} open</span>
                    <button
                      className={`btn ${full ? 'btn-secondary' : 'btn-primary'} btn-sm`}
                      onClick={() => navigate(`/dashboard?courseId=${course._id}`)}
                      disabled={full || s.count===0}
                    >
                      {s.count===0 ? 'No Sections' : full ? 'Full' : 'Register'}
                    </button>
                  </>
                ); })()}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Courses;
