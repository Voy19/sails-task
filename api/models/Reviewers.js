/**
 * Reviewers.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    userId: {
      autoMigrations: {
        index: true,
      },
      model: 'Users',
    },
    assessmentId: {
      autoMigrations: {
        index: true,
      },
      model: 'Assessments',
    },
    "code quality": {
      type: 'number',
      min: 1,
      max: 5
    },
    competence: {
      type: 'number',
      min: 1,
      max: 5
    },
    "Interaction with colleagues": {
      type: 'number',
      min: 1,
      max: 5
    },
    "Quality of task closure": {
      type: 'number',
      min: 1,
      max: 5
    },
    discipline: {
      type: 'number',
      min: 1,
      max: 5
    },
    innovation: {
      type: 'number',
      min: 1,
      max: 5
    },
    proactivity: {
      type: 'number',
      min: 1,
      max: 5
    },
    "fuck up": {
      type: 'number',
      min: 0,
      max: 5
    }
  },
  datastore: 'mysql_connection',

};