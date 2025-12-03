const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Import models
const User = require('../models/User');
const Course = require('../models/Course');
const Class = require('../models/Class');
const Registration = require('../models/Registration');

// Connect to MongoDB
mongoose.connect('mongodb+srv://courseadmin:admin123@course-registration-clu.6kqlyjn.mongodb.net/course-registration-system', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const seedData = async () => {
  try {
    // Clear existing data
    await User.deleteMany({});
    await Course.deleteMany({});
    await Class.deleteMany({});
    await Registration.deleteMany({});

    console.log('Cleared existing data...');

    // Create admin user
    const admin = new User({
      firstName: 'Admin',
      lastName: 'User',
      email: 'admin@vitbhopal.ac.in',
      password: 'admin123',
      role: 'admin',
      department: 'Administration'
    });
    await admin.save();

    // Create professors
    const professors = [
      {
        firstName: 'Dr. Sarah',
        lastName: 'Johnson',
        email: 'sarah.johnson@vitbhopal.ac.in',
        password: 'prof123',
        role: 'professor',
        department: 'Computer Science',
        phone: '(555) 123-4567',
        address: {
          street: '123 University Ave',
          city: 'Bhopal',
          state: 'MP',
          zipCode: '462001'
        }
      },
      {
        firstName: 'Dr. Michael',
        lastName: 'Chen',
        email: 'michael.chen@vitbhopal.ac.in',
        password: 'prof123',
        role: 'professor',
        department: 'Mathematics',
        phone: '(555) 234-5678',
        address: {
          street: '456 Academic Blvd',
          city: 'Bhopal',
          state: 'MP',
          zipCode: '462001'
        }
      },
      {
        firstName: 'Dr. Emily',
        lastName: 'Rodriguez',
        email: 'emily.rodriguez@vitbhopal.ac.in',
        password: 'prof123',
        role: 'professor',
        department: 'Physics',
        phone: '(555) 345-6789',
        address: {
          street: '789 Science St',
          city: 'Bhopal',
          state: 'MP',
          zipCode: '462001'
        }
      },
      {
        firstName: 'Dr. James',
        lastName: 'Wilson',
        email: 'james.wilson@vitbhopal.ac.in',
        password: 'prof123',
        role: 'professor',
        department: 'English',
        phone: '(555) 456-7890',
        address: {
          street: '321 Literature Ln',
          city: 'Bhopal',
          state: 'MP',
          zipCode: '462001'
        }
      },
      {
        firstName: 'Dr. Lisa',
        lastName: 'Anderson',
        email: 'lisa.anderson@vitbhopal.ac.in',
        password: 'prof123',
        role: 'professor',
        department: 'Business',
        phone: '(555) 567-8901',
        address: {
          street: '654 Business Blvd',
          city: 'Bhopal',
          state: 'MP',
          zipCode: '462001'
        }
      }
    ];

    // Create professors individually to trigger password hashing
    const createdProfessors = [];
    for (const professor of professors) {
      const user = new User(professor);
      await user.save();
      createdProfessors.push(user);
    }
    console.log('Created professors...');

    // Add additional professors for richer catalog
    const extraProfessors = [
      {
        firstName: 'Dr. Priya',
        lastName: 'Natarajan',
        email: 'priya.natarajan@vitbhopal.ac.in',
        password: 'prof123',
        role: 'professor',
        department: 'Statistics'
      },
      {
        firstName: 'Dr. Robert',
        lastName: 'Miller',
        email: 'robert.miller@vitbhopal.ac.in',
        password: 'prof123',
        role: 'professor',
        department: 'Economics'
      },
      {
        firstName: 'Dr. Ananya',
        lastName: 'Sharma',
        email: 'ananya.sharma@vitbhopal.ac.in',
        password: 'prof123',
        role: 'professor',
        department: 'Psychology'
      }
    ];
    for (const professor of extraProfessors) {
      const user = new User(professor);
      await user.save();
      createdProfessors.push(user);
    }
    console.log('Added extra professors...');

    // Create students
    const students = [
      {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@vitbhopal.ac.in',
        password: 'student123',
        role: 'student',
        studentId: '21BCS001',
        department: 'Computer Science',
        year: 'Junior',
        gpa: 3.7,
        phone: '(555) 111-2222',
        address: {
          street: '100 Student St',
          city: 'Bhopal',
          state: 'MP',
          zipCode: '462001'
        }
      },
      {
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane.smith@vitbhopal.ac.in',
        password: 'student123',
        role: 'student',
        studentId: '21BMA002',
        department: 'Mathematics',
        year: 'Senior',
        gpa: 3.9,
        phone: '(555) 222-3333',
        address: {
          street: '200 Campus Ave',
          city: 'Bhopal',
          state: 'MP',
          zipCode: '462001'
        }
      },
      {
        firstName: 'Alex',
        lastName: 'Brown',
        email: 'alex.brown@vitbhopal.ac.in',
        password: 'student123',
        role: 'student',
        studentId: '21BPH003',
        department: 'Physics',
        year: 'Sophomore',
        gpa: 3.5,
        phone: '(555) 333-4444',
        address: {
          street: '300 University Dr',
          city: 'Bhopal',
          state: 'MP',
          zipCode: '462001'
        }
      },
      {
        firstName: 'Maria',
        lastName: 'Garcia',
        email: 'maria.garcia@vitbhopal.ac.in',
        password: 'student123',
        role: 'student',
        studentId: '21BEN004',
        department: 'English',
        year: 'Freshman',
        gpa: 3.8,
        phone: '(555) 444-5555',
        address: {
          street: '400 College St',
          city: 'Bhopal',
          state: 'MP',
          zipCode: '462001'
        }
      },
      {
        firstName: 'David',
        lastName: 'Lee',
        email: 'david.lee@vitbhopal.ac.in',
        password: 'student123',
        role: 'student',
        studentId: '21BBU005',
        department: 'Business',
        year: 'Graduate',
        gpa: 3.6,
        phone: '(555) 555-6666',
        address: {
          street: '500 Graduate Ave',
          city: 'Bhopal',
          state: 'MP',
          zipCode: '462001'
        }
      }
    ];

    // Create students individually to trigger password hashing
    const createdStudents = [];
    for (const student of students) {
      const user = new User(student);
      await user.save();
      createdStudents.push(user);
    }
    console.log('Created students...');

  // Create courses - US college style examples
  const courses = [
      // Program Core Courses
      {
        courseCode: 'CS 225',
        courseName: 'Data Structures',
        description: 'Core data structures and algorithms with programming labs and projects.',
        credits: 4,
        department: 'Computer Science',
        level: 'Undergraduate',
        maxCapacity: 30,
        category: 'program-core'
      },
      {
        courseCode: 'CS 540',
        courseName: 'Introduction to Artificial Intelligence',
        description: 'Introduction to AI concepts including search algorithms, knowledge representation, machine learning, and neural networks. Hands-on projects with Python and TensorFlow.',
        credits: 3,
        department: 'Computer Science',
        level: 'Undergraduate',
        maxCapacity: 25,
        category: 'program-core'
      },
      {
        courseCode: 'CS 374',
        courseName: 'Algorithms & Models of Computation',
        description: 'Design and analysis of algorithms, proofs of correctness, and computational models.',
        credits: 4,
        department: 'Computer Science',
        level: 'Undergraduate',
        maxCapacity: 28,
        category: 'program-core'
      },
      {
        courseCode: 'CS 411',
        courseName: 'Database Systems',
        description: 'Relational databases, SQL, indexing, transactions and modern data systems.',
        credits: 3,
        department: 'Computer Science',
        level: 'Undergraduate',
        maxCapacity: 25,
        category: 'program-core'
      },
      
      // Program Electives
      {
        courseCode: 'CS 506',
        courseName: 'Software Engineering',
        description: 'Software development lifecycle, requirements analysis, design patterns, testing, and project management. Team-based project using agile methodologies.',
        credits: 3,
        department: 'Computer Science',
        level: 'Undergraduate',
        maxCapacity: 20,
        category: 'program-elective'
      },
      {
        courseCode: 'CS 537',
        courseName: 'Introduction to Operating Systems',
        description: 'Operating system concepts including processes, threads, memory management, file systems, and concurrency. Hands-on programming with C and system calls.',
        credits: 3,
        department: 'Computer Science',
        level: 'Undergraduate',
        maxCapacity: 22,
        category: 'program-elective'
      },
      {
        courseCode: 'CS 542',
        courseName: 'Introduction to Machine Learning',
        description: 'Machine learning algorithms and applications. Covers supervised learning, unsupervised learning, neural networks, and deep learning with practical projects.',
        credits: 3,
        department: 'Computer Science',
        level: 'Undergraduate',
        maxCapacity: 24,
        category: 'program-elective'
      },
      {
        courseCode: 'CS 559',
        courseName: 'Computer Graphics',
        description: 'Computer graphics fundamentals including 2D/3D transformations, rendering, shading, and animation. Programming projects using OpenGL and WebGL.',
        credits: 3,
        department: 'Computer Science',
        level: 'Undergraduate',
        maxCapacity: 18,
        category: 'program-elective'
      },
      
  // Open Electives (cross-college)
      {
        courseCode: 'MATH 340',
        courseName: 'Elementary Matrix and Linear Algebra',
        description: 'Linear algebra concepts including vector spaces, linear transformations, eigenvalues, and applications to computer science and engineering.',
        credits: 3,
        department: 'Mathematics',
        level: 'Undergraduate',
        maxCapacity: 35,
        category: 'open-elective'
      },
      {
        courseCode: 'STAT 324',
        courseName: 'Introductory Applied Statistics for Engineers',
        description: 'Statistical methods for engineering applications including probability distributions, hypothesis testing, regression analysis, and experimental design.',
        credits: 3,
        department: 'Statistics',
        level: 'Undergraduate',
        maxCapacity: 30,
        category: 'open-elective'
      },
      {
        courseCode: 'ECON 101',
        courseName: 'Principles of Economics',
        description: 'Introduction to microeconomics and macroeconomics. Covers supply and demand, market structures, fiscal policy, and economic growth.',
        credits: 4,
        department: 'Economics',
        level: 'Undergraduate',
        maxCapacity: 40,
        category: 'open-elective'
      },
      {
        courseCode: 'PSYCH 202',
        courseName: 'Introduction to Psychology',
        description: 'Overview of psychological principles including cognition, perception, learning, memory, and social psychology. Applications to human-computer interaction.',
        credits: 3,
        department: 'Psychology',
        level: 'Undergraduate',
        maxCapacity: 45,
        category: 'open-elective'
      },
      
      // Minor Courses
      {
        courseCode: 'MATH 321',
        courseName: 'Applied Mathematical Analysis',
        description: 'Advanced calculus and analysis topics including multivariable calculus, vector calculus, and differential equations with applications.',
        credits: 3,
        department: 'Mathematics',
        level: 'Undergraduate',
        maxCapacity: 25,
        category: 'minor'
      },
      {
        courseCode: 'PHYSICS 311',
        courseName: 'Mechanics',
        description: 'Classical mechanics including Newton\'s laws, energy, momentum, rotational motion, and oscillations. Mathematical treatment with calculus.',
        credits: 3,
        department: 'Physics',
        level: 'Undergraduate',
        maxCapacity: 30,
        category: 'minor'
      },
      
      // Honors Courses
      {
        courseCode: 'CS 577H',
        courseName: 'Honors Introduction to Algorithms',
        description: 'Advanced algorithm design and analysis with additional theoretical depth. Includes advanced topics in computational complexity and approximation algorithms.',
        credits: 4,
        department: 'Computer Science',
        level: 'Undergraduate',
        maxCapacity: 15,
        category: 'honors'
      },
      {
        courseCode: 'CS 540H',
        courseName: 'Honors Introduction to Artificial Intelligence',
        description: 'Advanced AI course with research component. Includes cutting-edge topics in machine learning, deep learning, and AI ethics.',
        credits: 3,
        department: 'Computer Science',
        level: 'Undergraduate',
        maxCapacity: 12,
        category: 'honors'
      },
      
      // Project/Thesis
      {
        courseCode: 'CS 639',
        courseName: 'Senior Capstone Project',
        description: 'Capstone project course where students work in teams to develop a significant software project. Includes project planning, implementation, and presentation.',
        credits: 3,
        department: 'Computer Science',
        level: 'Undergraduate',
        maxCapacity: 20,
        category: 'project'
      },
      {
        courseCode: 'CS 681',
        courseName: 'Senior Honors Thesis',
        description: 'Independent research project under faculty supervision. Students conduct original research and write a thesis on their findings.',
        credits: 3,
        department: 'Computer Science',
        level: 'Undergraduate',
        maxCapacity: 10,
        category: 'project'
      },

      // Additional CS electives and core
      {
        courseCode: 'CS 433',
        courseName: 'Computer Systems Organization',
        description: 'Computer organization, processors, memory hierarchy, and concurrency. Hands-on systems programming.',
        credits: 4,
        department: 'Computer Science',
        level: 'Undergraduate',
        maxCapacity: 28,
        category: 'program-core'
      },
      {
        courseCode: 'CS 425',
        courseName: 'Computer Architecture',
        description: 'Design of computer architectures, pipelines, caches, and performance evaluation.',
        credits: 3,
        department: 'Computer Science',
        level: 'Undergraduate',
        maxCapacity: 24,
        category: 'program-elective'
      },
      {
        courseCode: 'CS 484',
        courseName: 'Secure Computing',
        description: 'Security principles, threat modeling, cryptography basics, and secure coding practices.',
        credits: 3,
        department: 'Computer Science',
        level: 'Undergraduate',
        maxCapacity: 22,
        category: 'program-elective'
      },

      // Math/Stats/Econ/Psych/English/Business additional
      {
        courseCode: 'MATH 461',
        courseName: 'Probability Theory',
        description: 'Probability spaces, random variables, expectation, limit theorems with applications.',
        credits: 3,
        department: 'Mathematics',
        level: 'Undergraduate',
        maxCapacity: 30,
        category: 'open-elective'
      },
      {
        courseCode: 'STAT 430',
        courseName: 'Introduction to Data Science',
        description: 'Data wrangling, exploratory analysis, and modeling with an emphasis on statistical thinking.',
        credits: 3,
        department: 'Statistics',
        level: 'Undergraduate',
        maxCapacity: 32,
        category: 'open-elective'
      },
      {
        courseCode: 'ECON 302',
        courseName: 'Intermediate Microeconomics',
        description: 'Consumer and producer theory, market equilibrium, welfare analysis, and game theory basics.',
        credits: 3,
        department: 'Economics',
        level: 'Undergraduate',
        maxCapacity: 36,
        category: 'open-elective'
      },
      {
        courseCode: 'PSYCH 350',
        courseName: 'Cognitive Psychology',
        description: 'Human cognition including attention, memory, problem solving, and language processing.',
        credits: 3,
        department: 'Psychology',
        level: 'Undergraduate',
        maxCapacity: 40,
        category: 'open-elective'
      },
      {
        courseCode: 'ENGL 210',
        courseName: 'Technical Writing',
        description: 'Professional and technical communication with a focus on clarity, structure, and audience.',
        credits: 3,
        department: 'English',
        level: 'Undergraduate',
        maxCapacity: 30,
        category: 'open-elective'
      },
      {
        courseCode: 'BUS 220',
        courseName: 'Principles of Marketing',
        description: 'Marketing fundamentals, consumer behavior, segmentation, and strategy.',
        credits: 3,
        department: 'Business',
        level: 'Undergraduate',
        maxCapacity: 35,
        category: 'open-elective'
      }
    ];

    const createdCourses = await Course.insertMany(courses);
    console.log('Created courses...');

    // Set prerequisites for courses (US-style mapping)
  const cs225 = createdCourses.find(c => c.courseCode === 'CS 225'); // Data Structures
    const cs374 = createdCourses.find(c => c.courseCode === 'CS 374'); // Algorithms & MoC
    const cs540 = createdCourses.find(c => c.courseCode === 'CS 540'); // Intro to AI
    const cs540H = createdCourses.find(c => c.courseCode === 'CS 540H'); // Honors AI
    const cs577H = createdCourses.find(c => c.courseCode === 'CS 577H'); // Honors Algorithms
    const cs411 = createdCourses.find(c => c.courseCode === 'CS 411'); // DB Systems
    const cs506 = createdCourses.find(c => c.courseCode === 'CS 506'); // Software Eng
    const cs639 = createdCourses.find(c => c.courseCode === 'CS 639'); // Capstone
  const cs433 = createdCourses.find(c => c.courseCode === 'CS 433');
  const cs425 = createdCourses.find(c => c.courseCode === 'CS 425');
  const cs484 = createdCourses.find(c => c.courseCode === 'CS 484');
  const math461 = createdCourses.find(c => c.courseCode === 'MATH 461');
  const stat430 = createdCourses.find(c => c.courseCode === 'STAT 430');
  const econ302 = createdCourses.find(c => c.courseCode === 'ECON 302');
  const psych350 = createdCourses.find(c => c.courseCode === 'PSYCH 350');
  const engl210 = createdCourses.find(c => c.courseCode === 'ENGL 210');
  const bus220 = createdCourses.find(c => c.courseCode === 'BUS 220');

    if (cs540 && cs225) {
      cs540.prerequisites = [cs225._id];
      await cs540.save();
    }
    if (cs540H && cs540) {
      cs540H.prerequisites = [cs540._id];
      await cs540H.save();
    }
    if (cs577H && cs374) {
      cs577H.prerequisites = [cs374._id];
      await cs577H.save();
    }
    if (cs639 && cs506) {
      cs639.prerequisites = [cs506._id];
      await cs639.save();
    }

    if (cs433 && cs225) { cs433.prerequisites = [cs225._id]; await cs433.save(); }
    if (cs425 && cs433) { cs425.prerequisites = [cs433._id]; await cs425.save(); }
    if (cs484 && cs433) { cs484.prerequisites = [cs433._id]; await cs484.save(); }
    if (stat430 && math461) { stat430.prerequisites = [math461._id]; await stat430.save(); }


    // Create classes
    const classes = [
      {
        course: createdCourses.find(c => c.courseCode === 'CS 225')._id,
        professor: createdProfessors[0]._id,
        semester: 'Fall',
        year: 2024,
        section: 'A',
        schedule: {
          days: ['Monday', 'Wednesday', 'Friday'],
          startTime: '09:00',
          endTime: '10:00',
          room: 'CS-101'
        },
        maxCapacity: 30,
        startDate: new Date('2024-08-26'),
        endDate: new Date('2024-12-13')
      },
      {
        course: createdCourses.find(c => c.courseCode === 'CS 540')._id,
        professor: createdProfessors[0]._id,
        semester: 'Fall',
        year: 2024,
        section: 'A',
        schedule: {
          days: ['Tuesday', 'Thursday'],
          startTime: '10:30',
          endTime: '12:00',
          room: 'CS-201'
        },
        maxCapacity: 25,
        startDate: new Date('2024-08-26'),
        endDate: new Date('2024-12-13')
      },
      {
        course: createdCourses.find(c => c.courseCode === 'MATH 340')._id,
        professor: createdProfessors[1]._id,
        semester: 'Fall',
        year: 2024,
        section: 'A',
        schedule: {
          days: ['Monday', 'Wednesday', 'Friday'],
          startTime: '11:00',
          endTime: '12:00',
          room: 'MATH-101'
        },
        maxCapacity: 35,
        startDate: new Date('2024-08-26'),
        endDate: new Date('2024-12-13')
      },
      {
        course: createdCourses.find(c => c.courseCode === 'PHYSICS 311')._id,
        professor: createdProfessors[2]._id,
        semester: 'Fall',
        year: 2024,
        section: 'A',
        schedule: {
          days: ['Tuesday', 'Thursday'],
          startTime: '14:00',
          endTime: '15:30',
          room: 'PHYS-101'
        },
        maxCapacity: 40,
        startDate: new Date('2024-08-26'),
        endDate: new Date('2024-12-13')
      },
      {
        course: createdCourses.find(c => c.courseCode === 'PSYCH 202')._id,
        professor: createdProfessors[3]._id,
        semester: 'Fall',
        year: 2024,
        section: 'A',
        schedule: {
          days: ['Monday', 'Wednesday'],
          startTime: '13:00',
          endTime: '14:30',
          room: 'ENGL-101'
        },
        maxCapacity: 25,
        startDate: new Date('2024-08-26'),
        endDate: new Date('2024-12-13')
      },
      {
        course: createdCourses.find(c => c.courseCode === 'ECON 101')._id,
        professor: createdProfessors[4]._id,
        semester: 'Fall',
        year: 2024,
        section: 'A',
        schedule: {
          days: ['Tuesday', 'Thursday'],
          startTime: '16:00',
          endTime: '17:30',
          room: 'BUS-101'
        },
        maxCapacity: 30,
        startDate: new Date('2024-08-26'),
        endDate: new Date('2024-12-13')
      },

      // New classes for the added courses
      {
        course: cs433?._id,
        professor: createdProfessors.find(p => p.department === 'Computer Science')._id,
        semester: 'Fall',
        year: 2024,
        section: 'A',
        schedule: { days: ['Monday', 'Wednesday'], startTime: '15:00', endTime: '16:30', room: 'CS-303' },
        maxCapacity: 28,
        startDate: new Date('2024-08-26'), endDate: new Date('2024-12-13')
      },
      {
        course: cs433?._id,
        professor: createdProfessors.find(p => p.department === 'Computer Science')._id,
        semester: 'Fall',
        year: 2024,
        section: 'B',
        schedule: { days: ['Tuesday', 'Thursday'], startTime: '09:00', endTime: '10:30', room: 'CS-304' },
        maxCapacity: 24,
        startDate: new Date('2024-08-26'), endDate: new Date('2024-12-13')
      },
      {
        course: cs425?._id,
        professor: createdProfessors.find(p => p.department === 'Computer Science')._id,
        semester: 'Fall', year: 2024, section: 'A',
        schedule: { days: ['Monday', 'Wednesday'], startTime: '10:30', endTime: '12:00', room: 'CS-305' },
        maxCapacity: 24, startDate: new Date('2024-08-26'), endDate: new Date('2024-12-13')
      },
      {
        course: cs484?._id,
        professor: createdProfessors.find(p => p.department === 'Computer Science')._id,
        semester: 'Fall', year: 2024, section: 'A',
        schedule: { days: ['Friday'], startTime: '13:00', endTime: '16:00', room: 'CS-401' },
        maxCapacity: 22, startDate: new Date('2024-08-26'), endDate: new Date('2024-12-13')
      },
      {
        course: math461?._id,
        professor: createdProfessors.find(p => p.department === 'Mathematics')._id,
        semester: 'Fall', year: 2024, section: 'A',
        schedule: { days: ['Monday', 'Wednesday', 'Friday'], startTime: '08:00', endTime: '09:00', room: 'MATH-202' },
        maxCapacity: 30, startDate: new Date('2024-08-26'), endDate: new Date('2024-12-13')
      },
      {
        course: stat430?._id,
        professor: createdProfessors.find(p => p.department === 'Statistics')._id,
        semester: 'Fall', year: 2024, section: 'A',
        schedule: { days: ['Tuesday', 'Thursday'], startTime: '12:30', endTime: '14:00', room: 'STAT-110' },
        maxCapacity: 32, startDate: new Date('2024-08-26'), endDate: new Date('2024-12-13')
      },
      {
        course: econ302?._id,
        professor: createdProfessors.find(p => p.department === 'Economics')._id,
        semester: 'Fall', year: 2024, section: 'A',
        schedule: { days: ['Monday', 'Wednesday'], startTime: '16:00', endTime: '17:30', room: 'ECON-201' },
        maxCapacity: 36, startDate: new Date('2024-08-26'), endDate: new Date('2024-12-13')
      },
      {
        course: psych350?._id,
        professor: createdProfessors.find(p => p.department === 'Psychology')._id,
        semester: 'Fall', year: 2024, section: 'A',
        schedule: { days: ['Tuesday', 'Thursday'], startTime: '15:00', endTime: '16:30', room: 'PSY-210' },
        maxCapacity: 40, startDate: new Date('2024-08-26'), endDate: new Date('2024-12-13')
      },
      {
        course: engl210?._id,
        professor: createdProfessors.find(p => p.department === 'English')._id,
        semester: 'Fall', year: 2024, section: 'A',
        schedule: { days: ['Monday', 'Wednesday'], startTime: '12:30', endTime: '14:00', room: 'ENGL-210' },
        maxCapacity: 30, startDate: new Date('2024-08-26'), endDate: new Date('2024-12-13')
      },
      {
        course: bus220?._id,
        professor: createdProfessors.find(p => p.department === 'Business')._id,
        semester: 'Fall', year: 2024, section: 'A',
        schedule: { days: ['Friday'], startTime: '09:00', endTime: '12:00', room: 'BUS-210' },
        maxCapacity: 35, startDate: new Date('2024-08-26'), endDate: new Date('2024-12-13')
      }
    ];

    const createdClasses = await Class.insertMany(classes);
    console.log('Created classes...');

    // Create some sample registrations
    const registrations = [
      {
        student: createdStudents[0]._id,
        class: createdClasses[0]._id,
        semester: 'Fall',
        year: 2024,
        status: 'registered',
        creditsEarned: 0
      },
      {
        student: createdStudents[0]._id,
        class: createdClasses[2]._id,
        semester: 'Fall',
        year: 2024,
        status: 'registered',
        creditsEarned: 0
      },
      {
        student: createdStudents[1]._id,
        class: createdClasses[1]._id,
        semester: 'Fall',
        year: 2024,
        status: 'registered',
        creditsEarned: 0
      },
      {
        student: createdStudents[1]._id,
        class: createdClasses[2]._id,
        semester: 'Fall',
        year: 2024,
        status: 'registered',
        creditsEarned: 0
      },
      {
        student: createdStudents[2]._id,
        class: createdClasses[3]._id,
        semester: 'Fall',
        year: 2024,
        status: 'registered',
        creditsEarned: 0
      },
      // Extra sample registrations
      {
        student: createdStudents[3]._id,
        class: createdClasses[6]._id, // CS 433 A
        semester: 'Fall', year: 2024, status: 'registered', creditsEarned: 0
      },
      {
        student: createdStudents[4]._id,
        class: createdClasses[7]._id, // CS 433 B
        semester: 'Fall', year: 2024, status: 'registered', creditsEarned: 0
      },
      {
        student: createdStudents[0]._id,
        class: createdClasses[8]._id, // CS 425 A
        semester: 'Fall', year: 2024, status: 'registered', creditsEarned: 0
      },
      {
        student: createdStudents[1]._id,
        class: createdClasses[10]._id, // STAT 430 A
        semester: 'Fall', year: 2024, status: 'registered', creditsEarned: 0
      }
    ];

    await Registration.insertMany(registrations);
    console.log('Created registrations...');

    // Update class enrollment counts
    for (const registration of registrations) {
      const classData = await Class.findById(registration.class);
      classData.currentEnrollment += 1;
      await classData.save();
    }

    console.log('Database seeded successfully!');
    console.log('\nSample login credentials:');
    console.log('Admin: admin@vitbhopal.ac.in / admin123');
    console.log('Student: john.doe@vitbhopal.ac.in / student123');
    console.log('Professor: sarah.johnson@vitbhopal.ac.in / prof123');

  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    mongoose.connection.close();
  }
};

seedData();
