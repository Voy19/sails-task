/**
 * UsersController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  allUsers: (req, res) => {
    Users.find().exec((err, users) => {
      if (err) {
        res.send(500, {
          err: err
        });
      }
      res.send(users);
    })
  },

  user: (req, res) => {
    Users.findOne({
      id: req.params.id
    }).exec((err, user) => {
      if (err) {
        res.send(500, {
          err: err
        });
      }
      res.send(user);
    })
  }

};
