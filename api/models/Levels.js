/**
 * Levels.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    level: {
      type: 'string'
    },
    users: {
      collection: 'Users',
      via: 'levelId'
    },
    assesments: {
      collection: "Assesments",
      via: 'levelId'
    }
  },
  datastore: 'mysql_connection',
};