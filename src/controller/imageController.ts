import { Request, Response } from "express";
import multer from "multer";
import path, { extname } from "path";

export const UploadFile = async (req: Request, res: Response, next: Function) => { 
    const storage = multer.diskStorage({
        destination: "./upload",
        filename( req, file, callback) {
            const randomName = Math.random().toString(20).substr(2, 12);
            return callback(null, `${randomName}-image${extname(file.originalname)}`)
        },
    });
    const upload = multer({storage, 
        fileFilter: function (req, file, callback) {
            let ext = path.extname(file.originalname);
            if(ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
                return callback(new Error('Only images are allowed'))
            }
            callback(null, true);
        }}).single('imagefile');

    upload(req, res, (err)=> {
        if (err) {
            return res.status(400).send(err);
        }
        req.body['imgUrl'] =  `/api/uploads/${req.file.filename}`
        next()
    })
}
export const UploadImage = async (req: Request, res: Response, next: Function) => { 
    const storage = multer.diskStorage({
        destination: "./upload/courses",
        filename( req, file, callback) {
            const randomName = Math.random().toString(20).substr(2, 12);
            return callback(null, `${randomName}-image${extname(file.originalname)}`)
        },
    });
    const upload = multer({storage,     
        fileFilter: function (req, file, callback) {
        var ext = path.extname(file.originalname);
        if(ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
            return callback(new Error('images are allowed'))
        }
        callback(null, true)
    },
    limits:{
        fileSize: 1024 * 1024
    }}).single('upload');

    upload(req, res, (err)=> {
        if (err) {
            return res.status(400).send(err)
        }
        return res.send({
            url : `/api/uploads/courses/${req.file.filename}`,
            fileName: req.file.filename,
            uploaded: 1,
        })
    })
}