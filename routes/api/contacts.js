const express = require("express");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts");
const { newContacts, editContacts } = require("../../validation/validation");
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const result = await listContacts();
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await getContactById(contactId);
    if (!result) {
      res.status(404).json({ message: "Not found" });
    }
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = newContacts.validate(req.body);
    if (error) {
      res.status(400).json({ message: "missing required name field" });
    }
    const result = await addContact(req.body);
    res.status(201).json({ result, message: "template message" });
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await removeContact(contactId);
    if (!result) {
      res.status(404).json({ message: "Not found" });
    }
    res.status(200).json({ result, message: "contact deleted" });
  } catch (error) {
    next(error);
  }
});


router.put('/:contactId', async (req, res, next) => {
  try {
    const { body } = req;
    const { error } = editContacts.validate(body);
    if (error || !Object.keys(body).length) {
      res.status(400).json({ message: "missing fields" });
    }
    const { contactId } = req.params;
    const result = await updateContact(contactId, body)
    if (!result) {
      res.status(404).json({ message: "Not found" });
    }
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
})

module.exports = router;
