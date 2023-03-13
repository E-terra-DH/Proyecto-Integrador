const multer = require('multer');
const path = require('path');
const imagesPath = path.resolve(__dirname, '../../public/Images');

//Configuarion para donde vamos a guardar los archivos y con que nombre
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
        cb(null, imagesPath);
    },
	filename: (req, file, cb) => {
        let imageName = 'product-' + Date.now() + path.extname(file.originalname);//extname extrae el nombre de la extension de un archivo
        cb(null, imageName);
    }
});

// cuando la variable tiene el mismo nombre que el modulo, en vez de poner storage:storage se simplifica en uno
let upload = multer({ storage });

module.exports = upload;
