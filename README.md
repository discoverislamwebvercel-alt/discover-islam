# Discover Islam

A modern, responsive web application built with Next.js, TypeScript, and Tailwind CSS to showcase Islamic content and resources.

## 🚀 Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Animation**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Code Quality**: ESLint, Prettier, Husky
- **Package Manager**: npm

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version 18.0 or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [Git](https://git-scm.com/)

## 🛠️ Development Setup

### 1. Clone the repository

```bash
git clone <repository-url>
cd discover-islam
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up git hooks (if not already done)

```bash
npm run prepare
```

### 4. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📝 Available Scripts

| Script                 | Description                  |
| ---------------------- | ---------------------------- |
| `npm run dev`          | Start development server     |
| `npm run build`        | Build for production         |
| `npm run start`        | Start production server      |
| `npm run lint`         | Run ESLint with auto-fix     |
| `npm run lint:check`   | Run ESLint without auto-fix  |
| `npm run format`       | Format code with Prettier    |
| `npm run format:check` | Check code formatting        |
| `npm run type-check`   | Run TypeScript type checking |
| `npm test`             | Run tests (placeholder)      |

## 🔧 Code Quality & Standards

This project follows industry best practices for code quality:

### ESLint Configuration

- **Next.js**: Core web vitals and TypeScript rules
- **TypeScript**: Strict type checking and best practices
- **React**: Modern React patterns (no React imports needed)
- **Import Organization**: Automatic import sorting and grouping
- **Code Quality**: No unused variables, prefer const, no console.log in production

### Prettier Configuration

- **Semi-colons**: Required
- **Quotes**: Single quotes for JS/TS, single quotes for JSX
- **Print Width**: 80 characters
- **Tab Width**: 2 spaces
- **Trailing Commas**: ES5 compatible
- **Arrow Functions**: Avoid parentheses when possible

### Git Hooks (Husky)

- **Pre-commit**: Runs lint-staged to check and fix code before commits
- **Commit-msg**: Enforces conventional commit message format

### Lint-staged

Automatically runs on staged files before commit:

- **JS/TS files**: ESLint fix + Prettier format
- **Other files**: Prettier format only

## 📐 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   ├── page.tsx          # Home page
│   └── exhibition/       # Exhibition pages
└── components/           # Reusable React components
    ├── Hero.tsx
    ├── Navbar.tsx
    ├── Footer.tsx
    └── ...
```

## 🎨 Styling Guidelines

- Use Tailwind CSS utility classes for styling
- Follow mobile-first responsive design
- Use semantic HTML elements
- Maintain consistent spacing using Tailwind's spacing scale
- Use CSS custom properties for theme values when needed

## 📱 Responsive Design

The application is built with mobile-first approach:

- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px+

## 🔄 Git Workflow

### Commit Message Format

This project uses [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>[optional scope]: <description>

Examples:
feat: add user authentication
fix(ui): resolve button alignment issue
docs: update README with setup instructions
```

**Types**: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`, `perf`, `ci`, `build`, `revert`

### Branch Naming

- `feature/feature-name` - New features
- `fix/bug-description` - Bug fixes
- `docs/update-description` - Documentation updates
- `refactor/component-name` - Code refactoring

## 🚀 Deployment

### Vercel (Recommended)

The easiest way to deploy is using [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme):

1. Push your code to GitHub
2. Import your repository in Vercel
3. Deploy with zero configuration

### Manual Deployment

```bash
npm run build
npm run start
```

## 🧪 Testing

Currently, the project has a placeholder test script. To add testing:

1. Install testing framework (Jest, Vitest, etc.)
2. Update the test script in package.json
3. Add test files following the naming convention

## 📚 Learn More

### Next.js Resources

- [Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js features and API
- [Learn Next.js](https://nextjs.org/learn) - Interactive Next.js tutorial
- [Next.js GitHub repository](https://github.com/vercel/next.js)

### Development Resources

- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Framer Motion Documentation](https://www.framer.com/motion/)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes following the code quality standards
4. Commit your changes (`git commit -m 'feat: add amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

## 📄 License

This project is private and proprietary.

---

**Note**: This project is configured with automated code quality checks. All commits must pass ESLint and Prettier checks, and follow conventional commit message format.
