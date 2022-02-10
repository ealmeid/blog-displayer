## 📖 Overview

This is a simple frontend project built with the following technologies:

- [Next.js](https://nextjs.org/)
- [Typescript](https://www.typescriptlang.org/)
- [Chakra-UI](https://chakra-ui.com/)
- [React-Query](https://react-query.tanstack.com/)
- [Cypress](https://www.cypress.io/)

I'm following the atomic design methodology. More about this can be found here: https://atomicdesign.bradfrost.com/chapter-1/ and https://atomicdesign.bradfrost.com/chapter-2/

In order to run the frontend, execute `npm run dev` in the root directory. The frontend will be accessible at http://localhost:3000

## 🧪 Testing

To run tests, follow the instructions below

```bash
# To Run Component Tests

npx cypress run-ct

# or if you'd like the cypress explorer/runner to open a browser, run:

npx cypress open-ct
```

To run unit tests, execute

```bash
# To run with a browser open

npm run cypress

# or to run unit tests headlessly

npx run cypress
```
