const router = require("express").Router();
const { celebrate, Joi} = require('celebrate');

const { getCurrentUser, updateProfile } = require("../controllers/users");
const { validateUser } = require("../middlewares/validation");

router.get("/me", getCurrentUser);
router.patch(
  "/me",
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().alphanum().min(2).max(30),
      email: Joi.string().pattern(/[a-zA-Z0-9._%+-]+\x40[a-zA-Z0-9.-]+\x2E[a-zA-Z]{2,}/),
    }),
  }),
  updateProfile
);

module.exports = router;
