import { v2 as cloudinary } from "cloudinary";
import config from "../config";
import multer from "multer";

//Configaration
cloudinary.config({
  cloud_name: config.img_cloud_name,
  api_key: config.img_api_key,
  api_secret: config.img_api_secret,
});

export const SendImgToClodinary = (imageName: string, path: string) => {
  return new Promise(async (resolve, reject) => {
    try {
      // Upload an image
      const uploadResult = await cloudinary.uploader.upload(path, {
        public_id: imageName,
      });

      console.log(uploadResult);

      // Ensure secure_url is part of the upload result
      const { secure_url } = uploadResult;

      // Optimize delivery by resizing and applying auto-format and auto-quality
      const optimizeUrl = cloudinary.url(imageName, {
        fetch_format: "auto",
        quality: "auto",
      });
      console.log(optimizeUrl);

      // Transform the image: auto-crop to square aspect_ratio
      const autoCropUrl = cloudinary.url(imageName, {
        crop: "auto",
        gravity: "auto",
        width: 500,
        height: 500,
      });
      console.log(autoCropUrl);

      resolve({ secure_url, optimizeUrl, autoCropUrl });
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.cwd() + "/Uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

export const upload = multer({ storage: storage });
