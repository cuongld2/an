
To create the test project from scratch on your own

Prerequisites:
- Node.js version 18 or above
- Ubuntu version 20.04 or above
- docker and docker compose are ready to use

Step 1: Run the following command to create a new Playwright project with Node.js and Typescript

```bash
npm install
npx playwright install
```

Step 2: Update the test in `tests/example.spec.ts` file


Step 3: Create the S3 bucket with file in it

Step 4: Create the report portal server (Docker service) to store report file

Step 5: Run the test

Step 6: Set the cronjob for Ubuntu

admin account username: superadmin, password: erebus.
user account username: default, password: 1q2w3e
