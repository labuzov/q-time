# qTime

[App](https://q-time-app.web.app)

Stack: `React`, `Zustand`, `Firebase`, `i18next`, `framer-motion`

## CI/CD

This project implements Continuous Integration and Continuous Deployment (CI/CD) using GitHub Actions to automate the deployment of an application to Firebase Hosting

#### GitHub Actions Workflow

The workflow is defined in the [firebase.yml](/.github/workflows/firebase.yml) file. It includes the following steps:

1. **Checkout Code**: The workflow checks out the latest code from the repository.
2. **Set Up Node.js**: It sets up the Node.js environment required for building the application.
3. **Install Dependencies**: The necessary dependencies are installed using npm.
4. **Build Application**: The application is built.
5. **Deploy to Firebase Hosting**: The built application is deployed to Firebase Hosting. Only for `master` branch.