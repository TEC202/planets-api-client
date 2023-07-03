## How to run the project
This is just a basic React/Typescript application using the following template creation command:
    `npx create-react-app [your-project-name] --template typescript`

This project has already been built to static files, so you should be able to serve the files in the `build` directory  using your tool of choice (e.g. [https://github.com/vercel/serve](https://github.com/vercel/serve))

Example using the above:
- `cd planets-api-client`
- `serve -s build`
NOTE: `-s` flag rewrites all not-found requests to `index.html`


If you'd like to rebuild the projects or run in development mode, you will need to have `npm` installed, but then should be able to run any of the following commands:

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.