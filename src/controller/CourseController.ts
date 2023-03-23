import { Request, Response } from "express";
import { getManager } from "typeorm";
import { Course } from "../entity/course.entity";
import { CourseCat } from "../entity/courseCat.entity";


export const fetchAllCourse = async (req: Request, res: Response ) => {
    const take = 10;
    const page = (parseInt( req.query.page as string || '1')<0)?1 :parseInt( req.query.page as string || '1');
    const repository = getManager().getRepository(Course);
    await repository.findAndCount({
        
        take,
        skip: (page - 1 ) * take,
        relations: ['courseCat', "courseitem"]
    }).then((result) => {
        const [data, total] = result;
        console.log(data)
        return res.status(200).render('course/index', {
            data,
            page_name: "liste1",
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

export const createCourseView = async (req:Request, res: Response) => {
    const repository = getManager().getRepository(CourseCat);
    try {
        const cat = await repository.find();
        return res.render('Course/create', {
            page_name: "createcourse",
            data: cat
        });
    } catch (error) {
        return res.status(500).send(error);
    }

}

export const createCourse = async (req: Request, res: Response ) => {
    const {title, description, imgUrl, category} = req.body;
        console.log(description);
        const repository = getManager().getRepository(Course);
        await repository.save({
            title: title,
            description: description.toString(),
            image: imgUrl,
            courseCat: {
                id: parseInt(category || "1")
            }
            }).then((result) => {
                return res.redirect('back');
            }).catch((err) => {
                return res.status(500).send(err);
            });
    };


    export const UpdateCourse = async (req: Request, res: Response) => {
        const id = req.params.id;
        const {title, description, image, category} = req.body;

        const repository = getManager().getRepository(Course);
        await repository.update( {id: parseInt(id)}, {
            title: title,
            description: description.toString(),
            image: image,
            courseCat: {
                id: category
            }
            }).then((result) => {
            return res.status(200).send({
                message: 'Info updated',
                result
            });
        }).catch((err) => {
            return res.status(500).send(err);
        });
    };
    
    export const getOneCourse = async (req: Request, res: Response) => {
        const id = req.params.id;
        const repository = getManager().getRepository(Course);
        await repository.findOne({ where :{id : parseInt(id)} }).then((result) => {
            return res.render('Course/Show', {
                page_name: "createcourse",
                data: result
            });
        }).catch((err) => {
            return res.status(500).send(err);
        });
    };

    export const DeleteCourse = async (req: Request, res: Response ) => { 
        const id = req.params.id;
        const repository = getManager().getRepository(Course);
        await repository.delete({id : parseInt(id)}).then((result) => {
            return res.status(200).send(result)
        }).catch((err) => {
            return res.status(500).send(err);
        });
    }

