/**
 * Assesments.js
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
    levelId: {
      autoMigrations: {
        index: true
      },
      model: "Levels"
    },
    isFinished: {
      type: 'boolean',
      defaultsTo: false
    },
    finishedAt: {
      type: 'ref',
      columnType: 'datetime',
      defaultsTo: null
    },
    reviewers: {
      collection: 'Reviewers',
      via: "assessmentId"
    },
    bonuses: {
      type: 'number',
      defaultsTo: 0
    },
    english: {
      type: 'number',
      defaultsTo: 0,
      min: 1,
      max: 5
    }

  },
  datastore: 'mysql_connection',
};