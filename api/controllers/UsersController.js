/**
 * UsersController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const passport = require('passport');

module.exports = {
  allUsers: (req, res) => {
    passport.authenticate('jwt', (err, user, info) => {
      if (err) {
        throw new Error(err);
      }
      if (info !== undefined) {
        res.send({
          message: info.message,
        })
      }

      Users.find().populate('levelId').populate('vacation').populate("roleId").exec((err, users) => {
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
            // login: user.login,
            level: user.levelId.level,
            levelId: user.levelId.id,
            // vacation: user.vacation,
            // role: user.roleId.role
          }
        })
        res.send(usersList);
      })
    })(req, res)
  },

  user: (req, res) => {
    Users.findOne({
      id: req.params.id
    }).populate('levelId').populate('vacation').populate('roleId').exec((err, user) => {
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
        level: user.levelId.level,
        vacation: user.vacation,
        role: user.roleId.role
      }

      res.send(data);
    })
  },

  changePersonalInfo: (req, res) => {
    passport.authenticate('jwt', (err, user, info) => {
      if (err) {
        throw new Error(err);
      }
      if (info !== undefined) {
        res.send({
          message: info.message,
        })
      }

      Users.update({
        id: req.params.id
      }, {
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email
      }).exec((err) => {
        if (err) {
           return res.status(400).send(err);
        }
        res.send('Changed');
      })
     
    })(req, res)
  }  

};