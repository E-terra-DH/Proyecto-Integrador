const { body } = require('express-validator');

const validateRegister = [
    body('email')
        .isEmail().withMessage('Agrega tu correo electrónico').bail(),

    body('nombre')
        .isLength({ min: 3}).withMessage('Por lo menos necesito 3 caracteres').bail()
        .isLength({ max: 35}).withMessage('Máximo puedo tener 20 caracteres').bail(),
    
    
    body('apellido')
        .isLength({ min: 3}).withMessage('Por lo menos necesito 3 caracteres').bail()
        .isLength({ max: 35}).withMessage('Máximo puedo tener 20 caracteres').bail(),



    body('contrasena')
        .isLength({ min: 5}).withMessage('Por lo menos necesito 5 caracteres').bail(),

    body('cel')
        .isInt().withMessage('Tu celular sólo debe contener números').bail()
        .isLength({ min: 10}).withMessage('Tu celular debe contener 10 caracteres').bail(),

    // body('avatar').custom((value, { req }) => {
    //     let file = req.file;
    //     // let acceptedExtensions = ['.jpg', '.png', '.gif'];
    //     if (!file) {
    //         throw new Error ('Sube una imagen para este producto')
    //     }
    //     // } else {
    //     //     let fileExtension = path.extname(file.originalname);
    //     //     if (!acceptedExtensions.includes(fileExtension)){
    //     //         throw new Error ('Las extensiones permitidas son .jpg, .png y .gif')
    //     //     }
    //     // }
    //     return true
    // })
]

module.exports = validateRegister;