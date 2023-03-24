import { Request, Response } from "express";
import { getManager } from "typeorm";
import { User } from "../entity/user.entity";


export const authMiddleware = async (req: Request, res: Response, next : Function) => {
    try {

        const jwt = req.session['uId'];
        // const payload: any = verify(jwt, process.env.SECRETE_TOKEN)
        if (!jwt) {
            req.flash('danger' , 'Vous-devez vous connecter avant de pouvoir acceder a cette page!')
            return res.status(401).redirect('/login');
        }
        const repository = getManager().getRepository(User);
        const user: User = await repository.findOne({ where :{id : jwt.id}, relations: ['role', 'role.permissions'] });
        if (!user.IsConfirmed) {
            req.flash('danger' , 'Vous-devez etre comfirmer avant de pouvoir acceder a cette page!')
            return res.redirect('/pricing');
        }
        next();
    } catch (error) {
        return res.status(401).redirect('/login') 
    }    
}