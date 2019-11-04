/**
 * AssesmentsController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const passport = require('passport');

module.exports = {
   createAssesment: (req, res) => {
      passport.authenticate('jwt', (err, user, info) => {
         if (err) {
            return res.send(err);
         }
         if (info !== undefined) {
            return res.send({
               message: info.message,
            })
         }

         const data = {
            userId: req.body.userId,
            level: req.body.level,
            reviewers: ["1", "2"]
         }

         Assesments.create({
            userId: req.body.userId,
            level: req.body.level
         }).meta({
            fetch: true
         }).then((assesment) => {
            const arr = data.reviewers.map(reviewer => {
               return {
                  userId: reviewer,
                  assesmentId: assesment.id
               }
            });
            Reviewers.createEach(arr).then(() => {
               res.status(200).send("Assesment created successfully");
            })
         }).catch(err => {
            res.status(400).send(err)
         })
      })(req, res)
   },

   evaluation: (req, res) => {
      passport.authenticate('jwt', (err, user, info) => {
         if (err) {
            return res.send(err);
         }
         if (info !== undefined) {
            return res.send({
               message: info.message,
            })
         }

         if (user.id !== req.params.reviewsId) {
            return res.status(400).send("you don't have access to this");
         }

         const updatedData = {
            "code quality": req.body["code quality"],
            competence: req.body.competence,
            "Interaction with colleagues": req.body["Interaction with colleagues"],
            "Quality of task closure": req.body["Quality of task closure"],
            discipline: req.body.discipline,
            innovation: req.body.innovation,
            proactivity: req.body.proactivity,
            "fuck up": req.body["fuck up"]
         };

         Reviewers.update({
            userId: req.params.reviewsId,
            assesmentId: req.params.assesmentId
         }, updatedData).exec(function (err) {
            if (err) {
               return res.status(400).send(err);
            }
            res.send('Evaluation success');
         });
      })(req, res)
   }
};