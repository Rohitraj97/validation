const express = require("express")
const {body,validationResult} =require("express-validator")
const User = require("../models/model.js");
const router = express.Router ()
router.post(
    "/",
    body("firstName")
    .trim()
    .not()
    .isEmpty()
    .bail()
    .withMessage("First Name cannot be empty"),
    // .isLength({ min: 4 })
    // .withMessage("First Name must be at least 4 characters"),
  body("email")
    .isEmail()
    .custom(async (value) => {
      const user = await User.findOne({ email: value });

      if (user) {
        throw new Error("Email is already taken");
      }
      return true;
    }),
 

    body("Pin")
    .not()
    .isEmpty()
    .withMessage("Pin cannot be empty")
    .isNumeric()
    .withMessage("Pin must be of 6 digit")
    .custom((va) => {
      if (va.length != 6) {
        
        throw new Error("Incorrect Pin provided");
        // console.log(va)
      }
     
     return true;
      
      // console.log(va.length)
    }),

    body("age")
    .not()
    .isEmpty()
    .withMessage("Age cannot be empty")
    .isNumeric()
    .withMessage("Age must be a number between 1 and 100")
    .custom((val) => {
      if (val < 1 || val > 100) {
        throw new Error("Incorrect age provided");
      }
      return true;
    }),
  // body("password")
  //   .not()
  //   .isEmpty()
  //   .withMessage("Password is required")
  //   .custom((value) => {
  //     const passw = /^(?=.*\d)(?=.*[a-z])(?=.*[^a-zA-Z0-9])(?!.*\s).{7,15}$/;
  //     if (!value.match(passw)) {
  //       throw new Error("Password must be strong");
  //     }
  //     return true;
  //   })
  //   .custom((value, { req }) => {
  //     if (value !== req.body.confirmPassword) {
  //       throw new Error("Password and confirm password should match");
  //     }
  //     return true;
  //   }),
  body("lastName").custom((value) => {
    if (value && value.length < 4) {
      throw new Error("Last Name if provided must be at least 4 characters");
    }
    return true;
  }),

  // body("Pin").custom((value) => {
  //   if (value.length != 6) {
  //     throw new Error("Pin if provided must be at least 6 characters");
  //   }
  //   return true;
  // }),
  async (req, res) => {
    try {
      console.log(body("firstName"));
      const errors = validationResult(req);
      console.log({ errors });
      if (!errors.isEmpty()) {
        return res.status(400).send({ errors: errors.array() });
      }

      const user = await User.create(req.body);

      return res.status(201).send(user);
    } catch (err) {
      return res.status(500).send({ message: err.message });
    }
  }
);

module.exports = router;