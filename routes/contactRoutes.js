const express = require("express")
const { getContacts, getContact, updateContact, createContact, deleteContact } = require("../controllers/contactController")

const router = express.Router()

router.get("/",getContacts)
router.post("/",createContact)
router.get("/:id",getContact)
router.put("/:id",updateContact)
router.delete("/:id",deleteContact)

module.exports = router;