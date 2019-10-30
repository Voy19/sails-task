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
      required: true,
      allowNull: false
    },
    surname: {
      type: 'string',
      required: true,
      allowNull: false
    },
    login: {
      type: 'string',
      required: true,
      allowNull: false,
      unique: true
    },
    email: {
      type: 'string',
      required: true,
      allowNull: false,
      unique: true
    },
    password: {
      type: 'string',
      required: true,
      allowNull: false
    },
    levelId: {
      model: 'Levels',
    }
  },
  datastore: 'mysql_connection',

};