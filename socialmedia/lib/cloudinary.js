import cloudinary from "cloudinary";

cloudinary.v2.config({
    cloud_name: "dc5d8vg2s",
    api_key: "326671787411844",
    api_secret: "cwHKeh05Yx8bojMaNwNuSzazfe0",
});

export const cld = globalThis.cloudinary || cloudinary;
if(process.env.NODE_ENV !== "production") globalThis.cloudinary = cld;