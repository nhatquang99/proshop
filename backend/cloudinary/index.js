import cloudinary from 'cloudinary'
import pkg from 'multer-storage-cloudinary'
const {CloudinaryStorage} = pkg;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
});

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'ProShop',
        allowedFormats: ['jpeg', 'png', 'jpg']
    }
});

export {
    storage,
    cloudinary
}