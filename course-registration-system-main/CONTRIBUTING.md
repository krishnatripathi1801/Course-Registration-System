# 🤝 Contributing to VIT Bhopal Course Registration System

Thank you for your interest in contributing to our project! We welcome contributions from the community and appreciate your help in making this project better.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [How to Contribute](#how-to-contribute)
- [Development Setup](#development-setup)
- [Pull Request Process](#pull-request-process)
- [Issue Guidelines](#issue-guidelines)
- [Coding Standards](#coding-standards)

## 📜 Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code.

### Our Pledge

- Be respectful and inclusive
- Welcome newcomers and help them learn
- Focus on what's best for the community
- Show empathy towards other community members

## 🚀 Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally
3. **Create a new branch** for your feature
4. **Make your changes**
5. **Test your changes**
6. **Submit a pull request**

## 🔧 Development Setup

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- Git

### Setup Steps

1. **Clone your fork**
```bash
git clone https://github.com/YOUR_USERNAME/course-registration-system.git
cd course-registration-system
```

2. **Install dependencies**
```bash
npm install
cd client
npm install
cd ..
```

3. **Set up environment variables**
```bash
cp .env.example .env
# Edit .env with your configuration
```

4. **Start development server**
```bash
npm run dev
```

## 🎯 How to Contribute

### Types of Contributions

- 🐛 **Bug fixes**
- ✨ **New features**
- 📚 **Documentation improvements**
- 🎨 **UI/UX enhancements**
- ⚡ **Performance optimizations**
- 🧪 **Test coverage**

### Contribution Process

1. **Check existing issues** - Look for open issues or create a new one
2. **Assign yourself** - Comment on the issue to claim it
3. **Create a branch** - Use descriptive branch names
4. **Make changes** - Follow our coding standards
5. **Test thoroughly** - Ensure your changes work correctly
6. **Submit PR** - Create a pull request with detailed description

## 📝 Pull Request Process

### Before Submitting

- [ ] Code follows the project's coding standards
- [ ] Self-review of your code has been performed
- [ ] Code has been commented, particularly in hard-to-understand areas
- [ ] Corresponding changes to documentation have been made
- [ ] Changes generate no new warnings
- [ ] New and existing unit tests pass locally
- [ ] Any dependent changes have been merged and published

### PR Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Tested locally
- [ ] All tests pass
- [ ] No console errors

## Screenshots (if applicable)
Add screenshots to help explain your changes

## Checklist
- [ ] My code follows the style guidelines
- [ ] I have performed a self-review
- [ ] I have commented my code
- [ ] I have made corresponding changes to documentation
```

## 🐛 Issue Guidelines

### Before Creating an Issue

1. **Search existing issues** - Check if the issue already exists
2. **Check documentation** - Make sure it's not covered in docs
3. **Reproduce the issue** - Ensure it's reproducible

### Issue Template

```markdown
## Bug Description
Clear and concise description of the bug

## Steps to Reproduce
1. Go to '...'
2. Click on '....'
3. Scroll down to '....'
4. See error

## Expected Behavior
What you expected to happen

## Actual Behavior
What actually happened

## Screenshots
If applicable, add screenshots

## Environment
- OS: [e.g. Windows 10]
- Browser: [e.g. Chrome 91]
- Node.js version: [e.g. 16.14.0]

## Additional Context
Any other context about the problem
```

## 📏 Coding Standards

### TypeScript/JavaScript

- Use **TypeScript** for all new code
- Follow **ESLint** configuration
- Use **meaningful variable names**
- Add **JSDoc comments** for functions
- Use **const/let** instead of var

### React Components

- Use **functional components** with hooks
- Follow **PascalCase** for component names
- Use **camelCase** for props and variables
- Add **PropTypes** or TypeScript interfaces
- Keep components **small and focused**

### CSS/Styling

- Use **Tailwind CSS** classes
- Follow **mobile-first** approach
- Use **semantic class names**
- Avoid **inline styles** when possible
- Use **CSS custom properties** for theming

### File Organization

```
src/
├── components/          # Reusable components
│   ├── ui/             # Basic UI components
│   └── features/       # Feature-specific components
├── hooks/              # Custom React hooks
├── utils/              # Utility functions
├── types/              # TypeScript type definitions
└── constants/          # Application constants
```

### Git Commit Messages

Use **conventional commits** format:

```
type(scope): description

feat(auth): add password reset functionality
fix(ui): resolve mobile navigation issue
docs(readme): update installation instructions
style(components): format code with prettier
refactor(api): simplify user registration logic
test(auth): add unit tests for login
```

## 🧪 Testing

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Writing Tests

- Write **unit tests** for utility functions
- Write **integration tests** for API endpoints
- Write **component tests** for React components
- Aim for **80%+ code coverage**

## 📚 Documentation

### Code Documentation

- Add **JSDoc comments** for functions
- Use **TypeScript interfaces** for type definitions
- Include **usage examples** in comments
- Update **README.md** for new features

### API Documentation

- Document **all API endpoints**
- Include **request/response examples**
- Add **error code descriptions**
- Update **API documentation** with changes

## 🎨 UI/UX Guidelines

### Design Principles

- **Mobile-first** responsive design
- **Accessibility** compliance (WCAG 2.1)
- **Consistent** color scheme and typography
- **Smooth** animations and transitions
- **Intuitive** user experience

### Component Guidelines

- Use **consistent spacing** (Tailwind spacing scale)
- Follow **design system** patterns
- Ensure **keyboard navigation** support
- Add **loading states** for async operations
- Include **error boundaries** for error handling

## 🚀 Release Process

### Version Numbering

We use **Semantic Versioning** (SemVer):

- **MAJOR** version for incompatible API changes
- **MINOR** version for backwards-compatible functionality
- **PATCH** version for backwards-compatible bug fixes

### Release Checklist

- [ ] All tests pass
- [ ] Documentation updated
- [ ] Version number updated
- [ ] Changelog updated
- [ ] Release notes prepared

## 💬 Getting Help

- **GitHub Discussions** - For questions and general discussion
- **GitHub Issues** - For bug reports and feature requests
- **Discord** - For real-time chat (if available)
- **Email** - For private matters

## 🙏 Recognition

Contributors will be recognized in:

- **README.md** contributors section
- **Release notes** for significant contributions
- **GitHub contributors** page
- **Project documentation**

---

## 📞 Contact

If you have any questions about contributing, please don't hesitate to reach out:

- **GitHub Issues**: [Create an issue](https://github.com/yourusername/course-registration-system/issues)
- **Email**: your.email@example.com

Thank you for contributing to our project! 🎉
