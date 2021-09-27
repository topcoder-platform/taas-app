# Topcoder Teams Micro-app

This is a [single-spa](https://single-spa.js.org/) example React microapp.

> NOTE. This application have been configured to be run as child app of a single-spa application. So while this app can be deployed and run independently, we would need some frame [single-spa](https://single-spa.js.org/) which would load it. While technically we can achieve running this app as standalone app it's strongly not recommended by the author of the `single-spa` approach, see this [GitHub Issue](https://github.com/single-spa/single-spa/issues/640) for details.

## Requirements

- node - v10.22.1
- npm - v6.14.6
- [Nylas account](https://dashboard.nylas.com/)

## Technology Stack

- React 16.12
- Router via [Reach Router](https://reach.tech/router/)
- CSS Modules with SCSS via [babel-plugin-react-css-modules](https://github.com/gajus/babel-plugin-react-css-modules)
- [React Inline SVG](https://github.com/airbnb/babel-plugin-inline-react-svg)
- We use **Redux Store** for storing page data if we need to edit it. Otherwise we can use local state.
- [react-redux-toastr](https://www.npmjs.com/package/react-redux-toastr) for success/error popups in the bottom left corner.

## Config

For available variables config which depend on the running environment (`APPENV=dev` or `APPENV=prod`), please refer to `config/dev.js` and `config/prod.js`.

For application constants which don't depend on the running environment use `src/constants/index.js`.

## NPM Commands

| Command               | Description                                                       |
| --------------------- | ----------------------------------------------------------------- |
| `npm start`           | Run server which serves production ready build from `dist` folder |
| `npm run dev`         | Run app in the development mode                                   |
| `npm run dev-https`   | Run app in the development mode using HTTPS protocol              |
| `npm run build`       | Build app for production and puts files to the `dist` folder      |
| `npm run analyze`     | Analyze dependencies sizes and opens report in the browser        |
| `npm run lint`        | Check code for lint errors                                        |
| `npm run format`      | Format code using prettier                                        |
| `npm run test`        | Run unit tests                                                    |
| `npm run watch-tests` | Watch for file changes and run unit tests on changes              |
| `npm run coverage`    | Generate test code coverage report                                |

## Deployment to Production

- `npm i` - install dependencies
- `npm build` - build code to `dist/` folder
- Now you can host `dist/` folder using any static server. For example, you may run a simple `Express` server by running `npm start`.

### Deploying to Heroku

Make sure you have [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli) installed and you have a Heroku account. And then inside the project folder run the next commands:

- If there is not Git repository initiated yet, create a repo and commit all the files:
  - `git init`
  - `git add .`
  - `git commit -m 'initial commit'`
- `heroku apps:create` - create Heroku app
- `git push heroku master` - push changes to Heroku and trigger deploying
- Now you have to configure frame app to use the URL provided by Heroku like `https://<APP-NAME>.herokuapp.com/topcoder-micro-frontends-teams.js` to load this micro-app.

## How to run Locally for Development

TaaS App is done using Single SPA micro-frontend architecture https://single-spa.js.org/. So to start it, we would also have to run Frame App and Navbar App. Here I would show the steps to run locally everything we need.

### Local Authentication

First of all, to authenticate locally we have to run a local authentication service.

- Clone this repository into `taas-app`.
- Inside the folder `taas-app/local/login-locally` run `npm run start`.
- You would need npm 5+ for it. This would start a local sever on port 5000 which could be used for local Authentication.

### Local Domain

Some config files are using domain `local.topcoder-dev.com`. You can change it to `localhost` in all the configs of each repo mentioned below. Or on your local machine, update file `/etc/hosts` add the line `127.0.0.1 local.topcoder-dev.com`. This file has another path on Windows.

### Setup Nylas

1. You need to create an account in Nylas. Follow instructions located [here](https://developer.nylas.com/docs/the-basics/create-an-app/#step-1-sign-up-for-nylas). Upto step 1 is enough
2. Setup your Google Account as an authentication provider. Follow instructions located [here](https://developer.nylas.com/docs/the-basics/provider-guides/google/create-google-app/)

### Run Applications

1. Run **Frame** App:

   ```sh
   git clone https://github.com/topcoder-platform/micro-frontends-frame.git
   cd micro-frontends-frame
   # inside folder "micro-frontends-frame" run:

   nvm use # or make sure to use Node 10
   npm i   # to install dependencies

   # set environment variables:

   export APPMODE="development"
   export APPENV="local-multi"

   npm run local-server

   # this would start frame server on http://localhost:3000
   ```

   open one more terminal window in the same folder and run:

   ```sh
   # set environment variables:

   export APPMODE="development"
   export APPENV="local-multi"

   npm run local-client

   # this host frame client code on http://localhost:8080
   ```

2. Run **Navbar** micro-app:

   ```sh
   git clone https://github.com/topcoder-platform/micro-frontends-navbar-app.git
   cd micro-frontends-navbar-app
   ```

   Update in file `micro-frontends-navbar-app/blob/dev/config/dev.js` values for `ACCOUNTS_APP_CONNECTOR` and `AUTH` to `http://localhost:5000` so Navbar app which handles authentication uses our local Authentication service.

   ```sh
   # inside folder "micro-frontends-navbar-app" run:

   nvm use # or make sure to use Node 10
   npm i   # to install dependencies

   npm run dev

   # this host navbar app as http://localhost:3001/navbar/topcoder-micro-frontends-navbar-app.js
   ```

3. Run **TaaS** micro-app:

   ```sh
   # inside folder "taas-app" run:

   nvm use # or make sure to use Node 10
   npm i   # to install dependencies

    # set environment variables:

   export STRIPE_PUBLIC_KEY=""
   export NYLAS_CLIENT_ID="your-nylas-app-client-id"
   export SCHEDULER_SECRET="your-jwt-secret"

   npm run dev

   # this host TaaS App as http://localhost:8501/taas-app/topcoder-micro-frontends-teams.js
   ```

4. Now we have to update the `micro-frontends-frame` app to show our local version of TaaS App, instead of remote one. Update file `micro-frontends-frame/config/micro-frontends-config-local.json`:

   ```js
   // replace line
   "@topcoder/micro-frontends-teams": "https://platform.topcoder-dev.com/taas-app/topcoder-micro-frontends-teams.js",

   // with line:
   "@topcoder/micro-frontends-teams": "http://localhost:8501/taas-app/topcoder-micro-frontends-teams.js",
   ```

5. We also have to inser the Nylas scheduler front end client script. In the `micro-frontends-frame` app, proceed to create the following entry in `src/index.ejs` file, below the existing `<script>` tags under `<head>` tag.

```html
<script src="https://schedule.nylas.com/schedule-editor/v1.0/schedule-editor.js" type="text/javascript"></script>
```

You may have to restart this app (see step 1 above)

- Now open in the browser http://localhost:8080/taas/myteams.
- If you are not logged-in yet, you should be redirected to the login page.
- If you cannot see the application and redirect doesn't happen, make sure that file "http://local.topcoder-dev.com:8501/taas-app/topcoder-micro-frontends-teams.js" is loaded successfully in the Network tab.

Congratulations, you successfully run the project. If you had some issue, please, try to go through README of https://github.com/topcoder-platform/micro-frontends-frame and https://github.com/topcoder-platform/micro-frontends-navbar-app.
