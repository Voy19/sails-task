/**
 * Worklog.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    userId: {
      type: 'ref',
      columnType: 'integer',
      autoMigrations: {
        index: true
      },
    },
    type: {
      type: 'string',
      isIn: ['vacation', 'sick-day', 'time-off', 'working-off']
    },
    fromDate: {
      type: 'ref',
      columnType: 'datetime',
    },
    toDate: {
      type: 'ref',
      columnType: "datetime",
      required: true,
      allowNull: false,
    }
  },
  datastore: 'mysql_connection',

};