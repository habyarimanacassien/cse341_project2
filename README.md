# Caisse d'Entraide API

Node.js, Express, MongoDB, Mongoose and GitHub login (OAuth with Passport). Documentation: `/api-docs`

## Collections (database `project2`)
Every collection has one document per member (loans can have several).

- `profile`: familyName, firstName, email, phoneNumber, nationalID, address, memberSince
- `loans`: memberId, totalLoan, period
- `interest`: memberId, years (for example `{ "2025": 155000, "2026": 192000 }`)
- `savings`: memberId, startUp, months (for example `{ "2025-11": 66000 }`)
- `withdraws`: memberId, months
- `users`: people who signed in with GitHub
- `sessions`: open logins

`memberId` is the `_id` of the member in `profile`.

## Login
Open `/login` in the browser and sign in with GitHub. Every route of profile, loans, interest, savings and withdraws
needs a login and answers `401` without it. `/logout` signs you out. `/api-docs` and `/` are public.

## Run locally
1. `npm install`
2. Copy `.env.example` to `.env` and fill in the values (MongoDB, GitHub OAuth App, session secret)
3. Put the Excel file at `seed/members.xlsx`, then run `node scripts/seed.js seed/members.xlsx` (add `--reset` to start over)
4. `npm start`, then open http://localhost:3000/api-docs
5. After changing routes or swagger comments, run `npm run swagger`

## Deploy on Render
Build command `npm install`, start command `npm start`, and these environment variables:
`MONGODB_URL`, `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET`, `CALLBACK_URL`, `SESSION_SECRET`.
