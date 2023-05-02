# Grade Distribution App

This is a React app that displays grade distributions. The app includes end-to-end testing with Playwright and component/unit testing with ViTest.

## How do I use this?

### 1. Clone the repository

```bash
git clone
```

### 2. Install dependencies

```bash
yarn install
```

### 3. Start the development server

```bash
yarn dev
```

### 4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

## Running Tests

### End-to-End Testing with Playwright

To run the end-to-end tests with Playwright, use the following command:

```
yarn run test:e2e
```

This will launch the app in a test environment and run the end-to-end tests defined in the `tests/e2e` directory.

### Component/Unit Testing with ViTest

To run the component/unit tests with ViTest, use the following command:

```
yarn run test:ci
```

This will run the component/unit tests defined in the `tests/unit` directory.

## Learn More

To learn more about the technologies used in this app, refer to the respective documentation:

- [React](https://reactjs.org/)
- [Playwright](https://playwright.dev/)
- [ViTest](https://vitest.net/)

## Contributing

Contributions are welcome! Feel free to submit a pull request or open an issue if you find a bug or have a suggestion for improvement.

## Deployment

To deploy the app, you can follow the deployment guides for [Vercel](https://vercel.com/), [Netlify](https://www.netlify.com/), or [Docker](https://www.docker.com/).
