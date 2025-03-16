# eFootball 25

This is a website for managing an `eFootball` tournament system. It allows users to track tournament goals, stats, matches, and standings.

## Features

- **Tournament Goals and Stats**: Track goals,assists, and other team statistics.
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


## Editing Participating Teams
To add or modify participating teams, edit the `stats/teams.js` file:

```javascript
const Teams = [
    {
        teamName: 'TeamA',
        teamId: 'TeamId',
        phone: '06********'
    },
    {
        teamName: 'TeamB',
        teamId: 'TeamId',
        phone: '06********'
    },
    // Add more teams as needed
];