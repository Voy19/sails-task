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
    reviewers: {
      collection: 'Reviewers',
      via: "assessmentId"
    }

  },
  datastore: 'mysql_connection',
};