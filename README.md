# eFootball 25

This is a website for managing an `eFootball` tournament system. It allows users to track tournament goals, stats, matches, and standings.

## Features

- **Tournament Goals and Stats**: Track goals, and other team statistics.
- **Tournament Matches and Standings**: Manage match schedules, results, and league standings.

## Installation

Follow these steps to set up the project locally:

1. **Clone the repository**:
    ```bash
    git clone https://github.com/ourouimed/efootball25.git
    ```

2. **Navigate to the project directory**:
    ```bash
    cd efootball25
    ```

3. **Install dependencies**:
    ```bash
    npm install
    ```

4. **Run the development server**:
    ```bash
    npm run dev
    ```
## Tech Stack
- **ReactJS**: Built with ReactJS for a dynamic and responsive user interface.
- **React Router**: Utilizes React Router for client-side routing and navigation.
- **Tailwind CSS**: Implements Tailwind CSS for efficient and customizable styling.
- **Vite**: Developed using Vite for fast development and efficient builds.


## Editing Participating Teams
To add or modify participating teams, edit the `admin/teams.js` file:

```javascript
const teams = [
    {
        teamName : 'TeamA',
        teamId : 'user1',
        GF : 0 ,
        GA : 0,
        wins : 0,
        draws : 0,
        losses : 0
    },
    {
        teamName : 'TeamB',
        teamId : 'user2',
        GF : 0 ,
        GA : 0,
        wins : 0,
        draws : 0,
        losses : 0
    },....
    // Add more teams as needed
];
```

## Live Demo

For live Preview Visit : [eFootball 25 Live Demo](https://ourouimed.github.io/efootball25/)
