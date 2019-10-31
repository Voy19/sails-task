/**
 * Vacation.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    fromDate: {
      type: 'ref',
      columnType: 'datetime',
    },
    toDate: {
      type: 'ref',
      columnType: "datetime"
    }
  },
  datastore: 'mysql_connection',

};