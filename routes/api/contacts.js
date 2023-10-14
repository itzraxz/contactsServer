const express = require("express");
const router = express.Router();
const {
  getAllContacts,
  getContact,
  addContact,
  deleteContact,
  updateContact,
} = require("../../controller/contactsController");

router.route("/").get(getAllContacts).post(addContact);

router.route("/:id([0-9]{1,4})").get(getContact).put(updateContact).delete(deleteContact);

router.route("*").all((req, res) => {
  res.status(400);
  res.json({
    message: "invalid URL. Please check your URL",
  });
});

module.exports = router;
