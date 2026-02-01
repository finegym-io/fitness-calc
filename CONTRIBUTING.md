# Contributing to @finegym/fitness-calc

Thank you for your interest in contributing! Here's how you can help.

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/YOUR_USERNAME/fitness-calc.git`
3. Install dependencies: `npm install`
4. Create a branch: `git checkout -b feature/your-feature`

## Development

```bash
npm run build      # Build the project
npm test           # Run tests
npm run test:watch # Run tests in watch mode
npm run lint       # Type check
```

## Adding a New Calculation

1. Create a new file in `src/` (e.g., `src/my-calculation.ts`)
2. Add types to `src/types.ts` if needed
3. Export from `src/index.ts`
4. Add tests in `tests/my-calculation.test.ts`
5. Update README.md with documentation

## Guidelines

- All calculations must include scientific references in code or documentation
- Use TypeScript strict mode
- Validate all inputs with descriptive error messages
- Round outputs to sensible precision
- Write tests for both valid inputs and error cases
- Keep the library zero-dependency

## Submitting a Pull Request

1. Ensure all tests pass: `npm test`
2. Ensure types are correct: `npm run lint`
3. Write a clear PR description explaining the change
4. Reference any scientific papers or formulas used

## Reporting Issues

- Use GitHub Issues for bug reports and feature requests
- Include input values, expected output, and actual output for bugs
- Reference scientific sources when suggesting new formulas

## Code of Conduct

Be respectful and constructive. We're all here to build useful tools for the fitness community.
