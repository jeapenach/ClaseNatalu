const User = require("../models/auth")
const ErrorHandler = require("../utils/errorHandler")
const catchAsyncErrors = require("../middleware/catchAsyncErrors")

//Registrar un nuevo usuario /api/usuario/registro

exports.registroUsuario = catchAsyncErrors(async(req, res, next) =>{
    const {nombre, email, password} = req.body;

    const user = await User.create({
        nombre,
        email,
        password,
        avatar:{
            public_id: "1",
            url: "https://upload.wikimedia.org/wikipedia/en/8/86/Avatar_Aang.png"
        }
    })

    res.status(201).json({
        success: true,
        user
    })
})