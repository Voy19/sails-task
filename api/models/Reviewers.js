/**
 * Reviewers.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    userId: {
      type: 'number'
    },
    assesmentId: {
      type: 'number'
    },
    "code quality": {
      type: 'number'
    },
    competence: {
      type: 'number'
    },
    "Interaction with colleagues": {
      type: 'number'
    },
    "Quality of task closure": {
      type: 'number'
    },
    discipline: {
      type: 'number'
    },
    innovation: {
      type: 'number'
    },
    proactivity: {
      type: 'number'
    },
    "fuck up": {
      type: 'number'
    }

  },
  datastore: 'mysql_connection',

};