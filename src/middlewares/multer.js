const multer = require('multer');
const path = require('path');
const imagesPath = path.resolve(__dirname, '../../public/images');

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
        cb(null, imagesPath);
    },
	filename: (req, file, cb) => {
        let imageName = 'product-' + Date.now() + path.extname(file.originalname);
        cb(null, imageName);
    }
});

let upload = multer({ storage });

module.exports = upload;