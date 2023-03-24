import { Request, Response } from "express";
import { getManager } from "typeorm";
import { User } from "../entity/user.entity";
import { RegisterValidation, updateInfoValidation, updatePasswordValidation } from "../validation/user.validation";
import bcryptjs from 'bcryptjs';
import { sign } from "jsonwebtoken";

export const Register = async (req: Request, res: Response) => {
    const { email, confirmPassword, password } = req.body;

    const { error } = RegisterValidation.validate({
        // username: username,
        email: email,
        password: password,
        passwordConf: confirmPassword
    });

    if (error) {
        return res.status(400).send(error.details)
    }
    let username = email.split('@')[0];
    const repository = getManager().getRepository(User);
    const user = await repository.findOneBy([{ email: email }, { username: username }]);
    if (user) {
        req.flash('danger', 'email deja prise')
        return res.redirect('/register')
    }
    await repository.save({
        email: email,
        username: username,
        password: await bcryptjs.hash(password, 10),
        role: {
            id: 4
        }
    }).then((result) => {
        const { password, ...user } = result;
        req.flash('success', 'Vous pouvez maitenant vous connecter')
        return res.redirect('/login')
    }).catch((err) => {
        return res.status(500).send(err);
    });
};

export const Login = async (req: Request, res: Response) => {
    // const { email, password, rememberMe } = req.body;
    const email: string = req.body.email;
    const password: string = req.body.password;

    // if(req.session['uId'] !== undefined) req.session['uId'].destroy();

    const repository = getManager().getRepository(User);
    await repository.findOneBy([{ email: email }, { username: email }]).then(async (result) => {
        if (!result || !Object.keys(result).length) {
            // throw new Error("userNotFound");
            // console.log("user not found")
            req.flash('danger', 'Les informations que vous avez fournie sont incorrects, s\'il vous plait reessayer')
            return res.redirect('/login')
        }
        if (!await bcryptjs.compare(password, result.password)) {
            // throw new Error("passwordError");
            req.flash('danger', 'Les informations que vous avez fournie sont incorrects, s\'il vous plait reessayer')
            return res.redirect('/login')
        }
        const payload = {
            id: result.id,
            email: result.email
        };
        const token = sign(payload, process.env.SECRETE_TOKEN)

        res.cookie("jwt", token, {
            httpOnly: true,
            maxAge: 24 * 26 * 60 * 1000 // 1 days 
        })

        req.session['uId'] = payload

        req.flash('success', 'bienvenue sur le Platform E-Harogna')
        return res.status(200).redirect('/welcome')

    }).catch((err) => {
        console.log(err)
        return res.status(500).send(err);
    });
};

export const authenticatedUser = async (req: Request, res: Response) => {
    try {
        const repository = getManager().getRepository(User);
        await repository.findOneBy({ id: req.session['uId'].id })
            .then(async (result) => {
                if (!result) {
                    return res.status(401).send({
                        message: "an error occured"
                    })
                }
                const { password, ...user } = result;
                return res.status(200).send({
                    user
                })
            })
            .catch(async (err) => {
                return res.status(500).send(err);
            });
    } catch (error) {
        return res.status(401).send({
            message: "unauthenticated",
            error
        })
    }

};


export const UpdateInfo = async (req: Request, res: Response) => {
    const id = req.session['uId'].id;
    const { email, username } = req.body;

    const { error } = updateInfoValidation.validate({
        username: username,
        email: email
    });

    if (error) {
        return res.status(400).send(error.details)
    }
    const repository = getManager().getRepository(User);
    repository.update({ id: id }, {
        email: email,
        username: username
    }).then((result) => {
        return res.status(200).send({
            message: 'Info updated',
            result
        });
    }).catch((err) => {
        return res.status(500).send(err);
    });
}
export const UpdatePassword = async (req: Request, res: Response) => {
    const id = req.session['uId'].id;
    let user;
    const { oldPass, newpass, passwordConf } = req.body;

    const { error } = updatePasswordValidation.validate({
        newpass: newpass,
        passwordConf: passwordConf
    });

    if (error) {
        return res.status(400).send(error.details)
    }
    const repository = getManager().getRepository(User);
    try {
        user = await repository.findOneBy({ id: id });
    } catch (err) {
        return res.send(err)
    }
    if (!user) {
        return res.status(401).send({
            message: "an error occured"
        })
    }
    if (!await bcryptjs.compare(user.password, oldPass)) {
        // throw new Error("passwordError");
        return res.status(500).send({
            message: "Password incorrect"
        })
    }
    await repository.update({ id: id }, {
        password: await bcryptjs.hash(newpass, 10)
    }).then((result) => {
        return res.status(200).send({
            message: 'Info updated',
            result
        });
    }).catch((err) => {
        return res.status(500).send(err);
    });
}

export const Logout = async (req: Request, res: Response) => {
    // res.clearCookie('jwt');
    req.session.destroy(function () {
        console.log('deconnecter');
    });
    // req.flash('success' , 'Mercie d\'avoir visiter le platform')
    return res.redirect('/login')
}