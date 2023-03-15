import { Request, Response } from "express";
import { getManager } from "typeorm";
import { CourseCat } from "../entity/courseCat.entity";



export const fetchAllCourseCat = async (req: Request, res: Response ) => {
    const take = 10;
    const page = parseInt( req.query.page as string || '1');
    const repository = getManager().getRepository(CourseCat);
    await repository.findAndCount({
        take,
        skip: (page - 1 ) * take
    }).then((result) => {
        const [data, total] = result;
        return res.status(200).render('course/index', {
            data,
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

export const createCourseCat = async (req: Request, res: Response ) => {
    const {title, description, image} = req.body;

        const repository = getManager().getRepository(CourseCat);
        await repository.save({
            title: title,
            description: description,
            image: image,
            }).then((result) => {
                return res.send(result);
            }).catch((err) => {
                return res.status(500).send(err);
            });
    };


    export const UpdateCourseCat = async (req: Request, res: Response) => {
        const id = req.params.id;
        const {title, description, image, price} = req.body;

        const repository = getManager().getRepository(CourseCat);
        await repository.update( {id: parseInt(id)}, {
            title: title,
            description: description,
            image: image,
            }).then((result) => {
            return res.status(200).send({
                message: 'Info updated',
                result
            });
        }).catch((err) => {
            return res.status(500).send(err);
        });
    };
    
    export const getOneCourseCat = async (req: Request, res: Response) => {
        const id = req.params.id;
        const repository = getManager().getRepository(CourseCat);
        await repository.findOne({ where :{id : parseInt(id)} }).then((result) => {
            return res.status(200).send({            
                result
            });
        }).catch((err) => {
            return res.status(500).send(err);
        });
    };

    export const DeleteCourseCat = async (req: Request, res: Response ) => { 
        const id = req.params.id;
        const repository = getManager().getRepository(CourseCat);
        await repository.delete({id : parseInt(id)}).then((result) => {
            return res.status(200).send(result)
        }).catch((err) => {
            return res.status(500).send(err);
        });
    }

