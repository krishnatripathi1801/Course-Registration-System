# 🎓 VIT Bhopal Course Registration System

<div align="center">

![Course Registration System](https://img.shields.io/badge/MERN-Stack-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)

**A stunning, modern course registration system with beautiful animations, glassmorphism effects, and student-focused experience.**
<!-- 
[![Live Demo](https://img.shields.io/badge/Live%20Demo-🚀%20Try%20Now-4CAF50?style=for-the-badge)](https://your-demo-link.com)
[![GitHub Stars](https://img.shields.io/github/stars/yourusername/course-registration-system?style=for-the-badge)](https://github.com/yourusername/course-registration-system)
[![GitHub Forks](https://img.shields.io/github/forks/yourusername/course-registration-system?style=for-the-badge)](https://github.com/yourusername/course-registration-system) -->

</div>

---

## ✨ Features

<div align="center">

| 🎨 **Design** | 🚀 **Performance** | 🔒 **Security** | 📱 **Responsive** |
|:---:|:---:|:---:|:---:|
| Glassmorphism UI | Real-time updates | JWT Authentication | Mobile-first design |
| Animated backgrounds | Smooth transitions | Password encryption | Cross-platform |
| Modern gradients | Fast loading | Role-based access | Touch-friendly |
| Floating particles | Optimized assets | Secure API | Adaptive layout |

</div>

### 🎯 **Core Features**

- **🎨 Stunning Modern UI** - Glassmorphism effects with animated backgrounds
- **🌈 Beautiful Animations** - Floating particles, smooth transitions, and micro-interactions
- **📱 Fully Responsive** - Perfect experience on desktop, tablet, and mobile
- **🎓 Student-Focused** - Intuitive course categories and registration flow
- **🔐 Secure Authentication** - JWT tokens with password encryption
- **📚 Smart Course Management** - Professor selection with time slots
- **⚡ Real-time Updates** - Live seat availability and registration status
- **🎉 Success Feedback** - Confetti animations and smooth notifications

### 🎨 **Visual Highlights**

- **Glassmorphism Design** with backdrop blur effects
- **Animated Backgrounds** with floating particles and blob shapes
- **Smooth Transitions** and hover effects throughout
- **Modern Color Schemes** with purple, pink, and blue gradients
- **Interactive Elements** with scale animations and glow effects
- **Success Animations** with confetti and tick mark celebrations

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v16 or higher)
- **MongoDB** (local or Atlas)
- **npm** or **yarn**

### Installation

<details>
<summary><b>📋 Step-by-Step Installation</b></summary>

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/course-registration-system.git
cd course-registration-system
```

2. **Install dependencies**
```bash
# Install root dependencies
npm install

# Install client dependencies
cd client
npm install
cd ..
```

<!-- 3. **Set up environment variables**
```bash
# Create .env file in root directory
echo MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/course-registration > .env
echo JWT_SECRET=your_super_secret_jwt_key_here >> .env
echo NODE_ENV=development >> .env
``` -->

3. **Seed the database with sample data**
```bash
npm run seed
```

4. **Start the application**
```bash
npm run dev
```

5. **Access the application**
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000

</details>

### 🎯 Demo Credentials

| Role | Email | Password | Quick Access |
|:---:|:---:|:---:|:---:|
| **Student** | john.doe@vitbhopal.ac.in | student123 | 👨‍🎓 Student Demo Button |

---

## 🛠️ Tech Stack

<div align="center">

### **Backend Technologies**
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white)

### **Frontend Technologies**
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)

</div>

### **Backend Architecture**
- **Node.js** - JavaScript runtime environment
- **Express.js** - Fast, unopinionated web framework
- **MongoDB** - NoSQL database for flexible data storage
- **Mongoose** - Elegant MongoDB object modeling
- **JWT** - Secure authentication tokens
- **bcryptjs** - Password hashing and security
- **CORS** - Cross-origin resource sharing

### **Frontend Architecture**
- **React 18** - Modern UI library with hooks
- **TypeScript** - Type-safe JavaScript development
- **React Router** - Declarative routing
- **Axios** - Promise-based HTTP client
- **Context API** - State management
- **Custom Hooks** - Reusable logic

---

## 📁 Project Structure

```
course-registration-system/
├── 📁 client/                    # React frontend application
│   ├── 📁 public/               # Static assets
│   ├── 📁 src/
│   │   ├── 📁 components/       # React components
│   │   │   ├── 🎨 Dashboard.tsx    # Main dashboard with course categories
│   │   │   ├── 🔐 Login.tsx        # Stunning login page
│   │   │   ├── 📝 Register.tsx     # Beautiful registration form
│   │   │   ├── 🧭 Navbar.tsx       # Modern navigation
│   │   │   └── ...               # Other components
│   │   ├── 📁 contexts/         # React contexts
│   │   │   └── 🔑 AuthContext.tsx  # Authentication context
│   │   ├── 🎨 App.css           # Global styles and animations
│   │   └── 📱 index.tsx         # Application entry point
│   └── 📦 package.json          # Frontend dependencies
├── 📁 models/                   # Mongoose data models
│   ├── 👤 User.js              # User schema
│   ├── 📚 Course.js            # Course schema
│   ├── 🏫 Class.js             # Class schema
│   └── 📋 Registration.js      # Registration schema
├── 📁 routes/                   # Express API routes
│   ├── 🔐 auth.js              # Authentication routes
│   ├── 📚 courses.js           # Course management
│   ├── 🏫 classes.js           # Class management
│   └── 📋 registrations.js     # Registration management
├── 📁 middleware/               # Custom middleware
│   └── 🛡️ auth.js              # JWT authentication
├── 📁 scripts/                  # Database utilities
│   └── 🌱 seedData.js          # Database seeding script
├── 🚀 server.js                # Express server entry point
├── 📦 package.json             # Root dependencies
└── 📄 README.md                # Project documentation
```

---

## 🎨 UI/UX Features

<div align="center">

### **Design System**
| Component | Description | Animation |
|:---:|:---:|:---:|
| **Login Page** | Glassmorphism form with floating particles | Fade-in, scale effects |
| **Dashboard** | Course categories with hover animations | Blob backgrounds, transitions |
| **Course Cards** | Gradient badges and modern styling | Hover scale, glow effects |
| **Modals** | Backdrop blur with smooth transitions | Slide-in, fade effects |
| **Success Popup** | Confetti animation with tick mark | Bounce, confetti particles |

</div>

### **Visual Elements**
- **🌈 Gradient Backgrounds** - Dynamic color transitions
- **💎 Glassmorphism Effects** - Backdrop blur with transparency
- **✨ Floating Particles** - Animated background elements
- **🎭 Smooth Transitions** - 60fps animations throughout
- **📱 Responsive Design** - Mobile-first approach
- **🎯 Interactive Feedback** - Hover states and micro-interactions

---

## 🚀 Available Scripts

| Command | Description | Usage |
|:---:|:---:|:---:|
| `npm run dev` | Start both frontend and backend | Development |
| `npm run server` | Start only backend server | API testing |
| `npm run client` | Start only frontend | UI development |
| `npm run seed` | Seed database with sample data | Initial setup |

### **Development Workflow**
```bash
# Start development server
npm run dev

# In separate terminal - seed database
npm run seed

# Access application
# Frontend: http://localhost:3000
# Backend: http://localhost:5000
```
<!-- 
---

## 📸 Screenshots

<div align="center">

### **🎨 Login Page**
![Login Page](https://via.placeholder.com/800x500/4F46E5/FFFFFF?text=Stunning+Login+Page+with+Glassmorphism)

### **📚 Dashboard**
![Dashboard](https://via.placeholder.com/800x500/7C3AED/FFFFFF?text=Modern+Dashboard+with+Course+Categories)

### **🎓 Course Registration**
![Course Registration](https://via.placeholder.com/800x500/EC4899/FFFFFF?text=Course+Registration+with+Professor+Selection)

### **🎉 Success Animation**
![Success Animation](https://via.placeholder.com/800x500/10B981/FFFFFF?text=Success+Popup+with+Confetti+Animation)

</div>

--- -->

## 🔧 API Endpoints

### **Authentication**
```
POST /api/auth/register    # User registration
POST /api/auth/login       # User login
GET  /api/auth/profile     # Get user profile
```

### **Courses**
```
GET  /api/courses          # Get all courses
GET  /api/courses/:id      # Get course by ID
POST /api/courses          # Create course (Admin)
```

### **Classes**
```
GET  /api/classes          # Get all classes
GET  /api/classes/:id      # Get class by ID
POST /api/classes          # Create class (Admin)
```

### **Registrations**
```
GET  /api/registrations    # Get user registrations
POST /api/registrations    # Register for class
PUT  /api/registrations/:id # Update registration
```

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/AmazingFeature`)
3. **Commit your changes** (`git commit -m 'Add some AmazingFeature'`)
4. **Push to the branch** (`git push origin feature/AmazingFeature`)
5. **Open a Pull Request**

### **Development Guidelines**
- Follow TypeScript best practices
- Use meaningful commit messages
- Test your changes thoroughly
- Update documentation as needed

---

## 📝 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

<div align="center">

**Pracheer Srivastava**
- 🌐 **GitHub**: [@krishnatripathi1801](https://github.com/krishnatripathi1801?tab=repositories)
- 📧 **Email**: krishna.23bce100436@vitbhopal.ac.in
- 💼 **LinkedIn**: [Krishna Tripathi](linkedin.com/in/krishna-tripathi-403993272/?skipRedirect=true)

</div>

<div align="center">

---

### **⭐ Star this repository if you found it helpful!**

[![GitHub stars](https://img.shields.io/github/stars/pracheersrivastava/course-registration-system?style=social)](https://github.com/pracheersrivastava/course-registration-system)
[![GitHub forks](https://img.shields.io/github/forks/pracheersrivastava/course-registration-system?style=social)](https://github.com/pracheersrivastava/course-registration-system)

**Made with ❤️ and lots of ☕**

</div>
