const express = require("express");
const {
  getAllContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateStatusContact,
} = require("../../controllers/contacts.controller");
const ctrlWrapper = require("../../helpers/ctrlWrapper ")
const router = express.Router();

router.get("/", ctrlWrapper(getAllContacts));

router.get("/:contactId", ctrlWrapper(getContactById));

router.post("/", ctrlWrapper(addContact));

router.delete("/:contactId", ctrlWrapper(removeContact));

router.put("/:contactId", ctrlWrapper(updateContact));

router.patch("/:contactId/favorite", ctrlWrapper(updateStatusContact));

module.exports = router;
