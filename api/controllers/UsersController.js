/**
 * UsersController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  allUsers: (req, res) => {
    Users.find().populate('levelId').exec((err, users) => {
      if (err) {
        res.send(500, {
          err: err
        });
      }

      const usersList = users.map(user => {
        return {
          id: user.id,
          name: user.name,
          surname: user.surname,
          email: user.email,
          login: user.login,
          level: user.levelId.level
        }
      })
      res.send(usersList);
    })
  },

  user: (req, res) => {
    Users.findOne({
      id: req.params.id
    }).populate('levelId').exec((err, user) => {
      if (err) {
        res.send(500, {
          err: err
        });
      }

      const data = {
        id: user.id,
        name: user.name,
        surname: user.surname,
        email: user.email,
        login: user.login,
        level: user.levelId.level
      }
      res.send(data);
    })
  }

};