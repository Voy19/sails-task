/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  /***************************************************************************
   *                                                                          *
   * Make the view located at `views/homepage.ejs` your home page.            *
   *                                                                          *
   * (Alternatively, remove this and add an `index.html` file in your         *
   * `assets` directory)                                                      *
   *                                                                          *
   ***************************************************************************/

  '/': {
    view: 'pages/homepage'
  },
  'POST /login': 'AuthController.login',
  '/logout': 'AuthController.logout',
  'POST /registration': 'RegistrationController.registration',
  'GET /users': 'UsersController.allUsers',
  'GET /users/:id': 'UsersController.user',
  'GET /levels': 'LevelsController.allLevels',
  'GET /vacation/:id': 'VacationController.vacationDays',
  'POST /vacation': 'VacationController.createVacation',
  'POST /assessments': 'AssessmentsController.createAssessment',
  'PUT /assessments/:assessmentId/reviews/:reviewerId': 'ReviewersController.evaluation',
  'GET /assessments/:userId': 'AssessmentsController.allAssessments',
  'GET /assessments/:userId/active': 'AssessmentsController.activeAssessment',
  'GET /cabinet': 'CabinetController.cabinet',
  'GET /users/:userId/reviews': 'ReviewersController.allReviews',
  // 'GET /activeAssessments': 'AssessmentsController.allActiveAssessments',
  // 'GET /assessmentsAdmin': 'AssessmentsController.allAssessmentsForAdmin',
  'GET /allAssessments': 'AssessmentsController.allAssessmentsForAdmin',
  'PUT /assessment/:assessmentId/close': 'AssessmentsController.closeAssessment',
  'GET /user': 'AuthController.user',
  'GET /validityJwt': 'AuthController.validityJwt'


  /***************************************************************************
   *                                                                          *
   * More custom routes here...                                               *
   * (See https://sailsjs.com/config/routes for examples.)                    *
   *                                                                          *
   * If a request to a URL doesn't match any of the routes in this file, it   *
   * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
   * not match any of those, it is matched against static assets.             *
   *                                                                          *
   ***************************************************************************/


};