/**
 * RegistrationController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const bcrypt = require("bcryptjs");

module.exports = {
   registration: (req, res) => {
      if (req.body === null) return res.status(400).end();
      if (req.body.password !== req.body.repeatPassword) {
         res.send("Passwords don't match");
      }

      const salt = bcrypt.genSaltSync(10);
      const passwordToSave = bcrypt.hashSync(req.body.password, salt);
      const data = {
         name: req.body.name,
         surname: req.body.surname,
         login: req.body.login,
         password: passwordToSave,
         email: req.body.email
      }
      Users.find().where({
         or: [{
               login: data.login,
            },
            {
               email: data.email
            }
         ]
      }).then(arr => {
         if (arr.length) {
            res.status(400).send("Dont unique login or email");
         }
         Users.create(data).then(() => {
            res.status(200).send("Registration success");
         }).catch(err => {
            res.status(400).send(err)
         })
      })
   }
}