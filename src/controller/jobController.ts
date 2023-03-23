import { Request, Response } from "express";
import { getManager } from "typeorm";
import { Job } from "../entity/job.entity";


export const fetchAllJob = async (req: Request, res: Response ) => {
    const take = 10;
    const page = (parseInt( req.query.page as string || '1')<0)?1 :parseInt( req.query.page as string || '1');
    const repository = getManager().getRepository(Job);
    await repository.findAndCount({
        
        take,
        skip: (page - 1 ) * take,
        relations: ['courseCat', "courseitem"]
    }).then((result) => {
        const [data, total] = result;
        console.log(data)
        return res.status(200).render('jobs/index', {
            data,
            page_name: "liste4",
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

export const createJobView = async (req:Request, res: Response) => {
    const repository = getManager().getRepository(Job);
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

export const createJob = async (req: Request, res: Response ) => {
    const {title, description, imgUrl, JobType, JobTitle, MinSalary, MaxSalary} = req.body;
        console.log(description);
        const repository = getManager().getRepository(Job);
        await repository.save({
            title,
            description: description.toString(),
            image: imgUrl,
            JobType,
            JobTitle,
            MinSalary: parseInt(MinSalary) || null,
            MaxSalary: parseInt(MaxSalary) || null,
            IsOpen: true
            }).then((result) => {
                return res.redirect('back');
            }).catch((err) => {
                return res.status(500).send(err);
            });
    };


    export const UpdateJob = async (req: Request, res: Response) => {
        const id = req.params.id;
        const {title, description, image} = req.body;

        const repository = getManager().getRepository(Job);
        await repository.update( {id: parseInt(id)}, {
            title: title,
            description: description.toString(),
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
    
    export const getOneJob = async (req: Request, res: Response) => {
        const id = req.params.id;
        const repository = getManager().getRepository(Job);
        await repository.findOne({ where :{id : parseInt(id)} }).then((result) => {
            return res.render('Jobs/Show', {
                page_name: "createJob",
                data: result
            });
        }).catch((err) => {
            return res.status(500).send(err);
        });
    };

    export const DeleteJob = async (req: Request, res: Response ) => { 
        const id = req.params.id;
        const repository = getManager().getRepository(Job);
        await repository.delete({id : parseInt(id)}).then((result) => {
            return res.status(200).send(result)
        }).catch((err) => {
            return res.status(500).send(err);
        });
    }
