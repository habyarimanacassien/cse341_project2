# Caisse d'Entraide API

Node.js, Express, MongoDB and Mongoose. Documentation: `/api-docs`

## Collections (database `project2`)
Every collection has one document per member (loans can have several).

- `profile`: familyName, firstName, email, phoneNumber, nationalID, address, memberSince
- `loans`: memberId, totalLoan, period
- `interest`: memberId, years (for example `{ "2025": 155000, "2026": 192000 }`)
- `savings`: memberId, startUp, months (for example `{ "2025-11": 66000 }`)
- `withdraws`: memberId, months

`memberId` is the `_id` of the member in `profile`.

## Run locally
1. `npm install`
2. Use `.env` and put your MongoDB connection string in it
3. Put the Excel file at `seed/members.xlsx`, then run `node scripts/seed.js seed/members.xlsx` (add `--reset` to start over)
4. `npm start`, then open http://localhost:3000/api-docs
5. After changing routes or swagger comments, run `npm run swagger`

## Deploy on Render
Build command `npm install`, start command `npm start`, and the environment variable `MONGODB_URL`.
