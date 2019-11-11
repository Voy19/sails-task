/**
 * RegistrationController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const bcrypt = require("bcryptjs");

module.exports = {
   registration: (req, res) => {
      if (req.body === null) return res.status(400).send("Data is empty");
      if (req.body.password !== req.body.repeatPassword) {
         res.status(400).send("Passwords don't match");
      }

      const reg = /^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9])(?!\S*?[!@#$^&%*()+=\-\[\]\/\{\}|\:\<\>?,. а-яА-Я]).{6,})\S$/

      if (!req.body.password.match(reg)) {
         res.status(400).send("Password isn't valid")
      }

      const salt = bcrypt.genSaltSync(10);
      const passwordToSave = bcrypt.hashSync(req.body.password, salt);
      const data = {
         name: req.body.name,
         surname: req.body.surname,
         login: req.body.login,
         password: passwordToSave,
         email: req.body.email,
         levelId: 1,
         roleId: 1
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
            res.status(400).send("Login or email is already in use");
         }
         Users.create(data).then(() => {
            res.status(200).send("Registration success");
         }).catch(err => {
            res.status(400).send(err)
         })
      })
   }
}