# Verification Guide

## Local Deployment

Please, use Node.js `10` and Npm `6` as they work good for all the micro-apps.

I've made small changes to the **micro-frontends-frame** and **micro-frontends-navbar-app** provided on the forum. So use updated code from my submission.

Before running the apps, add into your `/etc/hosts` the `line 127.0.0.1 local.topcoder-dev.com` so you could use domain `local.topcoder-dev.com` for the local testing. Alternatively, you may update file `micro-frontends-frame/config/local.json` to use domain `localhost` instead of `local.topcoder-dev.com`. Note, that without using domain `local.topcoder-dev.com` authorization would not work.

Run each of 3 applications and Mock API server in a new terminal window.

1. Run **micro-frontends-frame** app (provided on forum and updated):
   ```bash
   cd micro-frontends-frame

   npm install

   npm run local
   ```

   This would host the **frame** app on http://local.topcoder-dev.com:3000/.

2. Run **micro-frontends-navbar-app** app (provided on forum and updated):
   ```bash
   cd micro-frontends-navbar-app

   npm install

   npm run dev
   ```

   This would host the **navbar** app on http://local.topcoder-dev.com:8080/topcoder-micro-frontends-navbar-app.js (cannot open outside frame).

3. Run **micro-frontends-teams** app (created in this challenge)
   ```bash
   cd micro-frontends-teams

   npm install

   npm run dev
   ```

   This would host the **teams** app on http://local.topcoder-dev.com:8501/topcoder-micro-frontends-teams.js (cannot open outside frame).

4. Run Mock API server:
   ```bash
   cd micro-frontends-teams/local/mock-server

   npm install

   npm run start
   ```

   This would host Mock API on http://local.topcoder-dev.com:8502.

## Verification

For verification, please use **Team Name 001** http://local.topcoder-dev.com:3000/taas/myteams/1 which has good positions demo data.

   ![](verification-guide/data-demo.png)

For example of no candidates use **TEAM_WHICH_WILL_DO_EVERYTHING_TO_BREAK_YOUR_CSS** http://local.topcoder-dev.com:3000/taas/myteams/3/positions/32

   ![](verification-guide/no-candidates.png)

## Notes

1. Rate in positions: `hourly`, `daily`, `weekly` and `monthly`. As UI doesn't mention units, for consistency I convert all the rates to `weekly` rate and show it everywhere for consistency.

   ![](verification-guide/rate-convertion.png)

2. In the Swagger file users have a field `photo_url` with avatar photo. Though previously we implemented a method to get user avatar by `userId`, so I'm keeping using that method of getting avatar by `userId`. As a result:
   - I didn't add `photo_url` to mock API
   - I've added `userId` to mock API so I can use real Topcoder API to get user photo

3. Where is not end date, we have to show `TBD` in the `Start - End Date` field. Additionally, I show `N/A` in the **Time Remaining** if there is no `endDate`:

   ![](verification-guide/no-end-data.png)

4. When all the candidates can be shown on one page I still showing disabled `Show more` and page `1` so when we change filters there is less jumping for UI consistency:

   ![](verification-guide/pagination.png)
