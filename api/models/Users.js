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
      allowNull: false,
      regex: /^([a-zA-z])(?!\S*?[\(\)\{\}\/\\\[\],. а-яА-Я]).{2,}$/
    },
    surname: {
      type: 'string',
      required: true,
      allowNull: false,
      regex: /^([a-zA-z])(?!\S*?[\(\)\{\}\/\\\[\],. а-яА-Я]).{3,}$/
    },
    login: {
      type: 'string',
      required: true,
      allowNull: false,
      unique: true,
      regex: /^([a-zA-z])(?!\S*?[\(\)\{\}\/\\\[\],. а-яА-Я]).{5,}$/
    },
    email: {
      type: 'string',
      required: true,
      allowNull: false,
      unique: true,
      isEmail: true
    },
    password: {
      type: 'string',
      required: true,
      allowNull: false,
      minLength: 8
    },
    joinedAt: {
      type: 'ref',
      columnType: 'datetime',
      defaultsTo: new Date()
    },
    levelId: {
      model: 'Levels',
    },
    vacation: {
      collection: 'Vacation',
      via: 'userId'
    },
    roleId: {
      model: 'Roles',
    }
  },
  datastore: 'mysql_connection',

};