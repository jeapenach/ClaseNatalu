const express = require("express");
const { registroUsuario } = require("../controller/authController");
const router = express.Router();

router.route('/usuario/registro').post(registroUsuario)

module.exports = router