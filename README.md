# sails task

a [Sails v1](https://sailsjs.com) application

### Links

- [Sails framework documentation](https://sailsjs.com/get-started)
- [Version notes / upgrading](https://sailsjs.com/documentation/upgrading)
- [Deployment tips](https://sailsjs.com/documentation/concepts/deployment)
- [Community support options](https://sailsjs.com/support)
- [Professional / enterprise options](https://sailsjs.com/enterprise)

### Version info

This app was originally generated on Tue Oct 29 2019 20:18:05 using Sails v1.2.3.

### Get started

1. Install sails

```sh
$ npm install sails -g
```

2. Clone this repository

```sh
$ git clone https://github.com/Voy19/sails-task.git
```

3. Install all packages

```sh
$ npm install
```

4. Run application

```sh
$ sails lift
```

### Controllers

| Controller             | Action            | Description                                                                                                |
| ---------------------- | ----------------- | ---------------------------------------------------------------------------------------------------------- |
| AuthController         | `login`           | User login                                                                                                 |
| AuthController         | `logout`          | User logout                                                                                                |
| RegistrationController | `registration`    | Registration new user                                                                                      |
| UsersController        | `user`            | Display information about user                                                                             |
| UsersController        | `allUsers`        | Display information about all users                                                                        |
| VacationController     | `vacationDays`    | Display information about the total number of vacation days                                                |
| VacationController     | `createVacation`  | Creating a user vacation                                                                                   |
| WorklogController      | ``                |
| AssesmentsController   | `allAssesments`   | Display information about all assesments of user                                                           |
| AssesmentsController   | `activeAssesment` | Display information about active assesment of user                                                         |
| AssesmentsController   | `createAssesment` | Creating a new admin assesment for the user and creating all reviewers from this assesment in the database |
| ReviewersController    | `evaluation`      | Reviewer evaluate user from assesment                                                                      |
| CabinetController      | `cabinet`         | User's personal account                                                                                    |

### Models

| Model      | Description                     |
| ---------- | ------------------------------- |
| Assesments | Saves all data about assesments |
| Levels     | Saves all data about levels     |
| Reviewers  | Saves all reviewers rating data |
| Roles      | Saves all data about roles      |
| Users      | Saves all data about users      |
| Vacation   | Saves all data about vacations  |
| Worklog    |                                 |

### Helpers Api

| Helper                | Description                                  |
| --------------------- | -------------------------------------------- |
| `calculateVacation()` | Сalculates the total number of vacation days |

### Policies

| Policy  | Description               |
| ------- | ------------------------- |
| `admin` | Policy for administrators |

### Routes

| Method | Route                                        | Controller             | Action          |
| ------ | -------------------------------------------- | ---------------------- | --------------- |
| POST   | /login                                       | AuthController         | login           |
| POST   | /logout                                      | AuthController         | logout          |
| POST   | /registration                                | RegistrationController | registration    |
| GET    | /users                                       | UsersController        | allUsers        |
| GET    | /users/:id                                   | UsersController        | user            |
| GET    | /vacation/:id                                | VacationController     | vacationDays    |
| POST   | /vacation                                    | VacationController     | createVacation  |
| POST   | /assesments                                  | AssesmentsController   | createAssesment |
| PUT    | /assesments/:assesmentId/reviews/:reviewerId | ReviewersController    | evaluation      |
| GET    | /assesments/:userId                          | AssesmentsController   | allAssesments   |
| GET    | /assesments/:userId/active                   | AssesmentsController   | activeAssesment |
| GET    | /cabinet                                     | CabinetController      | cabinet         |

<!-- Internally, Sails used [`sails-generate@1.16.13`](https://github.com/balderdashy/sails-generate/tree/v1.16.13/lib/core-generators/new). -->

<!--
Note:  Generators are usually run using the globally-installed `sails` CLI (command-line interface).  This CLI version is _environment-specific_ rather than app-specific, thus over time, as a project's dependencies are upgraded or the project is worked on by different developers on different computers using different versions of Node.js, the Sails dependency in its package.json file may differ from the globally-installed Sails CLI release it was originally generated with.  (Be sure to always check out the relevant [upgrading guides](https://sailsjs.com/upgrading) before upgrading the version of Sails used by your app.  If you're stuck, [get help here](https://sailsjs.com/support).)
-->
