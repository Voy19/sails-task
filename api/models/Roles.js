/**
 * Roles.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    role: {
      type: 'string'
    },
    users: {
      collection: 'Users',
      via: 'roleId'
    }
  },
  datastore: 'mysql_connection',

};