import { v2 as cloudinary } from "cloudinary";

const cloudinaryConfig = () => {
  cloudinary.config({
    cloud_name: "djgxiadrc", //after adding to .env file, process.env.CLOUD_NAME ...
    api_key: "746335493771545",
    api_secret: "xKRxbKYJSoE2hccjOtEY6uytqBE",
  });
};

export default cloudinaryConfig;
