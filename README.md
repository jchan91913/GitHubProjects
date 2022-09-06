# GitHub Projects

Let's you look through repositories belonging to a **user** or an **organization** and preview recent commits from a selected repository's **default branch**.

## Features

- Ability to search for both user and organization repositories
- Warning and error messages when API returns no data or fails
- Pagination when repository results exceed the API default **30** count

## Frameworks and Libraries
- [Vue 2](https://v2.vuejs.org/) (Front end framework)
- [Semantic UI](https://semantic-ui.com/) (UI framework)
- [Axios](https://axios-http.com/) (HTTP client)
- [Luxon](https://moment.github.io/luxon/#/) (JS dates and times library)

## To Implement

- Make it easier to use pagination without scrolling past 30 records. Perhaps lower amount of records returned each time
- Add Dark mode and be able to toggle Light and Dark modes
- Find a better way to call child Vue component methods from a parent component without using `this.$refs`
- Be able to choose a branch to fetch recent commits from
- Remove blank area below `Show Commits` button on repository card