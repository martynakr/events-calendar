# Events Calendar App

This repository is the frontend for a full stack application that allows users to create events and show countdown until the event starts.

## Running instructions

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
    // insert a gif here //
-   Showing days from the next and previous months - this was a great opportunity to practice working with the JavaScript Date object
-   Countdown until the event starts

## Change log

-   **10 June 2024** - the initial version of this application used a 'dummy' backend created with [JSON Server](https://www.npmjs.com/package/json-server). I started implementing [custom backed](https://github.com/martynakr/events-creator-backend) with Spring boot a while ago. I am currently working on the backend again and replaced the dummy server in this application with that backend

-   **11 June 2024** - added login and register pages set up with `react-router-dom`. I decided to user the `zod` library for validating for the login and register pages.

## Known issues

-   Currently, the Bearer token is stored in context - it is reset to null once the page is refreshed, which means the user needs to log in again. This will be fixed by sending JWT as an httpOnly cookie.

## Next steps

-   Replacing the form validation for creating an event with zod
-   Reviewing the amount of contexts used in the project
-   Adding e2e Playwright tests
