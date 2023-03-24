import { Request, Response } from "express";
import { getManager } from "typeorm";
import { Job } from "../entity/job.entity";
import { MyJob } from "../entity/myjob.entity";


export const fetchAllJob = async (req: Request, res: Response ) => {
    const take = 10;
    const page = (parseInt( req.query.page as string || '1')<0)?1 :parseInt( req.query.page as string || '1');
    const repository = getManager().getRepository(Job);
    await repository.findAndCount({
        
        take,
        skip: (page - 1 ) * take,
    }).then((result) => {
        const [data, total] = result;
        console.log(data)
        return res.render('jobs/index', {
            data,
            page_name: "liste4",
            title: 'Liste des Employs',
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

export const fetchAllJobFront = async (req: Request, res: Response ) => {
    const take = 10;
    const page = (parseInt( req.query.page as string || '1')<0)?1 :parseInt( req.query.page as string || '1');
    const repository = getManager().getRepository(Job);
    await repository.findAndCount({
        
        take,
        skip: (page - 1 ) * take,
    }).then((result) => {
        const [data, total] = result;
        console.log(data)
        return res.render('pages/jobpage', {
            data,
            page_name: "liste4",
            title: 'Liste des Employs',
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
        return res.render('jobs/Create', {
            page_name: "createcourse",
            title: 'Creer un Employ'
        });
    } catch (error) {
        return res.status(500).send(error);
    }

}

export const createJob = async (req: Request, res: Response ) => {
    const job  = parseInt(req.params.id || '1');
        // console.log(description);
        const repository = getManager().getRepository(MyJob);
        await repository.save({
            job: {
                id : job
            },
            user: {
                id : req.session['uId'].id
            },
            }).then((result) => {
                req.flash('success' , 'Employe Enregistrer avec succer')
                return res.redirect('/myjobs')
            }).catch((err) => {
                return res.status(500).send(err);
            });
    };


export const saveJob = async (req: Request, res: Response ) => {
    const {title, description, imgUrl, JobType, JobTitle, MinSalary, MaxSalary,companyName} = req.body;
        // console.log(description);
        const repository = getManager().getRepository(Job);
        await repository.save({
            title,
            description: description.toString(),
            image: imgUrl,
            JobType,
            JobTitle,
            companyName,
            MinSalary: parseInt(MinSalary) || null,
            MaxSalary: parseInt(MaxSalary) || null,
            IsOpen: true
            }).then((result) => {
                req.flash('success' , 'Employe creer avec succer')
                return res.redirect('/jobs')
            }).catch((err) => {
                return res.status(500).send(err);
            });
    };


    export const UpdateJob = async (req: Request, res: Response) => {
        const id = req.params.id;
        const {title, description, imgUrl, JobType, JobTitle, MinSalary, MaxSalary, companyName} = req.body;

        const repository = getManager().getRepository(Job);
        await repository.update( {id: parseInt(id)}, {
            title,
            description: description.toString(),
            image: imgUrl,
            JobType,
            JobTitle,
            companyName,
            MinSalary: parseInt(MinSalary) || null,
            MaxSalary: parseInt(MaxSalary) || null,
            IsOpen: true
            }).then((result) => {
                req.flash('success' , 'Employe mis a jour avec succer')
                return res.redirect('/jobs')
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
                req.flash('success' , 'Employe supprimer avec succer')
                return res.redirect('/jobs')
        }).catch((err) => {
            return res.status(500).send(err);
        });
    }

