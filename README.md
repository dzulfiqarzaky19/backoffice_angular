# Employee Management System (Backoffice Angular)

This project is an Angular application for managing employee records, including listing, adding, editing, and deleting employees. It features a modern UI with reusable form components and integration tests.

## Prerequisites

- **Node.js**: v18 or higher (v23.4.0 detected in development)
- **npm**: v9 or higher
- **Google Chrome** or **Chromium**: Required for running tests (Headless mode supported).

## Installation

1.  Clone the repository:

    ```bash
    git clone <repository-url>
    cd backoffice_angular
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

## Development Server

To start the local development server:

```bash
npm start
```

Or directly:

```bash
ng serve
```

Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Running Tests

### Unit & Integration Tests

This project uses [Karma](https://karma-runner.github.io) and [Jasmine](https://jasmine.github.io/) for unit testing.

To run tests (headless mode recommended for CI/CD or headless environments):

```bash
npm run test
```

**Note for Linux/Headless Environments:**
If `google-chrome` is not found, you may need to specify the binary path using the `CHROME_BIN` environment variable. For example, if using Chromium:

```bash
export CHROME_BIN=/usr/bin/chromium-browser && npm run test -- --browsers=ChromeHeadless --watch=false
```

### Test Features

- **Integration Tests**: `EmployeeDetailComponent` and `FormComponent` are tested using `RouterTestingHarness`.
- **Form Components**: Reusable components in `shared/components/forms` have dedicated unit tests verifying `ControlValueAccessor` functionality.

## Building

To build the project for production:

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

## Code Formatting

To ensure consistent code style, run:

```bash
npm run format
```

## Project Structure

- `src/app/core/`: Singleton services (e.g., `EmployeeService`, `AuthService`).
- `src/app/features/`: Feature modules (e.g., `employee`, `auth`).
- `src/app/shared/`: Shared components (e.g., forms, buttons, typography) and models.
