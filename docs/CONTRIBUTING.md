# Contributing Guidelines

## Welcome! 👋

We love your input! We want to make contributing to the Election Assistant as easy and transparent as possible.

## Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code.

### Our Pledge
- Be respectful and inclusive
- Welcome people from all backgrounds
- Focus on constructive criticism
- Report harassment immediately

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, check the issue list as you might find out that you don't need to create one. When you are creating a bug report, include as many details as possible:

**Title**: Use a clear and descriptive title
**Description**: Provide a step-by-step description of the exact steps which reproduce the problem
**Expected behavior**: Describe the behavior you observed after following the steps and point out what's wrong
**Actual behavior**: Explain which behavior you expected to see instead and why
**Environment**: Include your OS, browser, and Node version

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, include:

**Clear description**: Provide a step-by-step description of the suggested enhancement
**Current behavior**: Describe the current behavior and explain the expected enhancement
**Why this would be useful**: Explain why this enhancement would be useful

### Pull Requests

- Fill in the required template
- Follow the styleguides
- Include appropriate test cases
- Update documentation as needed
- End all files with a newline

## Styleguides

### Git Commit Messages

- Use the present tense ("Add feature" not "Added feature")
- Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
- Limit the first line to 72 characters or less
- Reference issues and pull requests liberally after the first line
- Consider starting the commit message with an applicable emoji:
  - 🎨 for style changes
  - ⚡ for performance improvements
  - 📝 for documentation
  - 🐛 for bug fixes
  - ✨ for new features

### TypeScript/JavaScript Styleguide

```typescript
// Use semicolons
const declaration: string = 'value';

// Use const/let, never var
const name = 'Election';
let count = 0;

// Use arrow functions
const func = () => {};

// Use type annotations
const greet = (name: string): void => {
  console.log(`Hello, ${name}`);
};

// Use interfaces
interface User {
  id: string;
  name: string;
}

// Use null coalescing
const value = optional ?? defaultValue;
```

### CSS Styleguide

```css
/* Use meaningful class names */
.chatbox-container {
  display: flex;
}

/* Use semantic spacing */
.element {
  margin: 1rem;
  padding: 0.5rem 1rem;
}

/* Use CSS variables for colors */
.primary-btn {
  background-color: var(--primary-color);
}

/* Use mobile-first approach */
@media (min-width: 768px) {
  .container {
    max-width: 1200px;
  }
}
```

### React Component Styleguide

```typescript
import React, { useState, useEffect } from 'react';
import styles from './Component.module.css';

interface ComponentProps {
  title: string;
  onClick?: () => void;
}

/**
 * Clear JSDoc documentation
 */
const Component: React.FC<ComponentProps> = ({ title, onClick }) => {
  const [state, setState] = useState<string>('');

  useEffect(() => {
    // Side effects
  }, []);

  return (
    <div className={styles.container} role="main" aria-label={title}>
      {/* Component JSX */}
    </div>
  );
};

export default Component;
```

## Development Setup

### Prerequisites
- Node.js 16+
- npm 8+
- Git

### Local Development

```bash
# Clone repository
git clone https://github.com/yourusername/election-assistant.git
cd election-assistant

# Setup backend
cd backend
npm install
cp .env.example .env
npm run dev

# In new terminal, setup frontend
cd frontend
npm install
npm start
```

### Running Tests

```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test
```

### Linting

```bash
# Backend
cd backend
npm run lint
npm run lint:fix

# Frontend
cd frontend
npm run lint
npm run lint:fix
```

## Testing Guidelines

### Unit Tests
- Write tests for utility functions
- Aim for > 80% coverage
- Use descriptive test names
- Mock external dependencies

### Integration Tests
- Test API endpoints
- Test component interactions
- Test user flows

### Example Test

```typescript
describe('Component', () => {
  it('should render without crashing', () => {
    render(<Component title="Test" />);
    expect(screen.getByText('Test')).toBeInTheDocument();
  });

  it('should call onClick when button clicked', () => {
    const onClick = jest.fn();
    render(<Component title="Test" onClick={onClick} />);
    fireEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalled();
  });
});
```

## Documentation

- Update README.md with new features
- Document API changes
- Include code examples
- Update CHANGELOG.md
- Add JSDoc comments

## Version Numbering

We use [Semantic Versioning](https://semver.org/):
- MAJOR version for incompatible API changes
- MINOR version for added functionality (backwards compatible)
- PATCH version for bug fixes

## Release Process

1. Update version in package.json
2. Update CHANGELOG.md
3. Create git tag
4. Push to main branch
5. Create GitHub release

## Questions?

- Open an issue with the `question` label
- Email: support@electionassistant.in
- Check existing discussions

## Recognition

Contributors will be:
- Added to the CONTRIBUTORS.md file
- Mentioned in release notes
- Recognized in documentation

---

Thank you for contributing! 🙏
