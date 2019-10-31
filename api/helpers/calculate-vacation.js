module.exports = {


  friendlyName: 'Calculate vacation',


  description: '',


  inputs: {
    base: {
      type: "number",
      defaultsTo: 10
    },
    date: {
      type: 'ref',
      columnType: 'datetime'
    },
    fullYears: {
      type: 'number',
    },
    joinedAt: {
      type: 'ref',
      columnType: 'datetime'
    }
  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function (inputs, exits) {
    const diffTime = Math.abs(inputs.joinedAt - inputs.date);
    const diffYears = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) / 365;
    const daysAdded = diffYears - inputs.fullYears > 0 ? Math.ceil(diffYears) - inputs.fullYears : 0;
    const total = inputs.base + daysAdded;
    return exits.success(total);
  }


};