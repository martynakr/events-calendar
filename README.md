# Events Calendar App

This repository is the frontend for a full stack application that allows users to create events and show countdown until the event starts.

## Running instructions

First, you'll need to go through the [backed running instructions](https://github.com/martynakr/events-creator-backend/blob/main/README.md)

After the backend is set up:

1. Clone the repository:

```bash
git clone git@github.com:martynakr/events-calendar.git
```

2. Install the required dependencies

```bash
cd events-calendar
npm install
```

3. Run the project:

```bash
npm run dev
```

4. Open `localhost:5173` in your browser

5. You should be taken to a login page. If you decided to run the database seeder on the backend, you should be able to log in using the following details:

```
    email: john@email.com
    password: pass
```

### Tests

To run tests

```bash
npm run test
```

The project contains:

-   [Unit tests](./src/utils/date-utils.test.ts) for date-related logic. Test are written with **Vitest**
-   Component tests, for example [Multiselect tests](./src/components/Form/Select/Multiselect.test.tsx)

![Tests](https://github.com/martynakr/events-calendar/actions/workflows/tests.yml/badge.svg)

## Features

-   Multi-select component inspired by the one found in Notion. In this project I am using it for event labels. The user can select a previously created label from a searchable list or add a new label by typing in a new option and clicking 'Add' button, that dynamically appears for non-existing options

-   Showing days from the next and previous months - this was a great opportunity to practice working with the JavaScript Date object
-   Countdown until the event starts

## Change log

-   **10 June 2024** - the initial version of this application used a 'dummy' backend created with [JSON Server](https://www.npmjs.com/package/json-server). I started implementing [custom backed](https://github.com/martynakr/events-creator-backend) with Spring boot a while ago. I am currently working on the backend again and replaced the dummy server in this application with that backend

-   **11 June 2024** - added login and register pages set up with `react-router-dom`. I decided to user the `zod` library for validating for the login and register pages. I found that the custom React Hook Form validation gets a bit hard to read with more complex logic - with zod it's easier to abstract it away to a separate file

-   **16th June 2024** - updated the project to fetch label data from the backend

## Known issues

-   The events fetched from the backed does not get displayed.
-   There is no logout functionality

## Next steps

-   Update the login page, so it contains some info about the app, login form and a link that redirects users without an account to the register page
-   Replacing the form validation for creating an event with zod
-   Reviewing the amount of contexts used in the project
-   Adding e2e Playwright tests
