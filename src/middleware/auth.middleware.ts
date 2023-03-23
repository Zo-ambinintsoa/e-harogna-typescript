import { Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { type } from "os";
interface Payload {
    id: string,
    email: string
}
export const authMiddleware = async (req: Request, res: Response, next : Function) => {
    try {
        const jwt = req.session['uId'];
        // const payload: any = verify(jwt, process.env.SECRETE_TOKEN)
        if (!jwt) {
            req.flash('danger' , 'Vous-devez vous connecter avant de pouvoir acceder a cette page!')
            return res.status(401).redirect('/login');
        }
        // req['uId'] = jwt.id;
        next();
    } catch (error) {
        return res.status(401).redirect('/login') 
    }    
}