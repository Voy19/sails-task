/**
 * Users.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    name: {
      type: 'string',
    },
    surname: {
      type: 'string',
    },
    login: {
      type: 'string',
    },
    email: {
      type: 'string',
    },
    password: {
      type: 'string'
    },
    levelId: {
      type: 'integer'
    }
  },
  datastore: 'mysql_connection',

};
