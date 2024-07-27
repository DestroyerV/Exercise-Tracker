# Exercise-Tracker

This is a full stack JavaScript application that allows users to track their exercises. Users can create an account, add exercises, and view their exercise logs. This project is built using Node.js, Express, MongoDB, and a simple frontend with HTML, CSS, and JavaScript.

## Features

- View all users
- Create a new user
- Add exercises for a user
- View exercise logs for a user
- Filter exercise logs by date range and limit the number of results

## Getting Started

### Prerequisites

- Node.js and npm installed
- MongoDB installed and running

### Installation

1. Clone the repository

```bash
git clone https://github.com/DestroyerV/Exercise-Tracker.git
```

2. Navigate to the cloned repository

```bash
cd Exercise-Tracker
```

3. Install dependencies

```bash
npm install
```

4. Start the server

```bash
npm start
```

5. Open <http://localhost:3000> in your browser

## API Endpoints

### Get Users

GET /api/users

```json
[
  {
    "username": "testUser",
    "_id": "5fb5853f734231456ccb3b05"
  },
  {
    "username": "testUser2",
    "_id": "5fb5853f734231456ccb3b06"
  }
]
```

### Create User

POST /api/users

```json
{
  "username": "testUser"
}
```

### Add Exercise

POST /api/users/:\_id/exercises

```json
{
  "description": "Running",
  "duration": 30,
  "date": "2020-01-01"
}
```

### Get Logs

GET /api/users/:\_id/logs?[from][&amp;to][&amp;limit]
[ ] = optional

```json
{
  "username": "testUser",
  "count": 1,
  "_id": "5fb5853f734231456ccb3b05",
  "log": [{ "description": "test", "duration": 60, "date": "Mon Jan 01 1990" }]
}
```

## Contributing

If you want to contribute to this project, please follow the [contributing guidelines](https://github.com/DestroyerV/Exercise-Tracker/blob/master/CONTRIBUTING.md).

## License

This project is licensed under the MIT license.
