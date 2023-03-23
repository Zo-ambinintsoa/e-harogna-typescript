import { Request, Response } from "express";
import multer from "multer";
import path, { extname } from "path";
import { getManager } from "typeorm";
import { harognaFile } from "../entity/file.entity";
import fs from 'fs';

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

    upload(req, res, async (err)=> {
        if (err) {
            return res.status(400).send(err);
        }

        req.body['imgUrl'] =  `/api/uploads/${req.file.filename}`;

        const fileRepository = getManager().getRepository(harognaFile);
        try {
            await fileRepository.save({
                filename: req.file.filename,
                path: '/api/uploads/',
                ext: path.extname(req.file.filename),
                user: {
                    id: req.session['uId'].id
                }
            });
        } catch (error) {
            console.log(error);
        }
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
        let ext = path.extname(file.originalname);
        if(ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
            return callback(new Error('images are allowed'))
        }
        callback(null, true)
    },
    limits:{
        fileSize: 1024 * 1024
    }}).single('upload');

    upload(req, res, async (err)=> {
        if (err) {
            return res.status(400).send(err)
        }

        const fileRepository = getManager().getRepository(harognaFile);
        try {
            await fileRepository.save({
                filename: req.file.filename,
                path: '/api/uploads/courses/',
                ext: path.extname(req.file.filename),
                user: {
                    id: req.session['uId'].id
                }
            });
        } catch (error) {
            console.log(error);
        }

        return res.send({
            url : `/api/uploads/courses/${req.file.filename}`,
            fileName: req.file.filename,
            uploaded: 1,
        })
    })
};

export const fetchAllfile = async (req: Request, res: Response ) => {
    const take = 10;
    const page = (parseInt( req.query.page as string || '1')<0)?1 :parseInt( req.query.page as string || '1');
    const repository = getManager().getRepository(harognaFile);
    await repository.findAndCount({
        take,
        skip: (page - 1 ) * take,
    }).then((result) => {
        const [data, total] = result;
        // console.log(data)
        return res.status(200).render('CourseItems/index', {
            data,
            page_name: "liste5",
            title: 'Fichier',
            meta: {
                total,
                page,
                last_page: Math.ceil(total / take)
            }
        })
    }).catch((err) => {
        return res.status(500).send(err);
    });
};