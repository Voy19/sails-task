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
        index: true
      },
      type: 'ref',
      columnType: 'integer'
    },
    level: {
      type: 'string'
    },
    isFinished: {
      type: 'boolean',
      defaultsTo: false
    }

  },
  datastore: 'mysql_connection',
};