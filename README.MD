# @rckeller/simple-robinhood

A robinhood clone based on @maxyuan6717's [simple-robinhood](https://github.com/maxyuan6717/simple-robinhood), modified to be a monorepo w/ styleguide and adherence to atomic design principles.

This project is deployed to the following locations:

- Client - Frontend: https://simple-robinhood-fb5c316b421a.herokuapp.com
- Storybook - Style Guide: https://storybook-ae46c1691b37.herokuapp.com
- SimpleHood API - Backend: https://simplehood-3dbbdc556338.herokuapp.com
- SimDAQ API - Mock 3p Backend: https://simdaq-56b3aed89ab2.herokuapp.com

## Stack

In addition to the base app, we are using:

- [Yarn workspaces](https://classic.yarnpkg.com/lang/en/docs/workspaces/) for dependency management
- [Turborepo](https://turbo.build/repo/docs/handbook/) as a script runner + build tool
- [Storybook](https://storybook.js.org/tutorials/intro-to-storybook/) to implement our style guide

Future Scope, as time allows:

- CI/CD: Github actions or CircleCI
- Unit testing w/ react-testing-library
- UX improvements to the existing frontend
- Bundle optimization, possibly swapping react-bootstrap for reactstrap

## Quick Start

**A MongoDB connection string is required.** Please provide one (or ask Andy for the connection string for a test database!)

```
# Copy .env.example to .env and fill in any missing credentials
yarn install
yarn run dev
```
