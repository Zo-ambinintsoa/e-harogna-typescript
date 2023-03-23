import { createConnection, getManager } from "typeorm";
import { Permission } from "../entity/permission.entity";
import { Role } from "../entity/role.entity";
import { User } from "../entity/user.entity";
import bcryptjs from 'bcryptjs';

createConnection().then(async (result) => {
    const permissionRepository = getManager().getRepository(Permission);
    const params = ['viewUser', 'viewRole', 'viewCourse', 'viewJob', 'editUser', 'editRole', 'editCourse', 'editJob'];
    let permissions = [];
    for (let i = 0; i < params.length; i++) {
        permissions.push(await permissionRepository.save({name:params[i]}).catch((err) => {
            console.log(err);  
        }));
    }

    const roleRepository = getManager().getRepository(Role);
    const UserRepository = getManager().getRepository(User);
        try {    
           let admin =  await roleRepository.save({
                name: "Admin",
                permissions
            })
            delete permissions[5];
            await roleRepository.save({
                name: "Editor",
                permissions
            })
            delete permissions[0];
            delete permissions[1];
            delete permissions[4];
            delete permissions[5];
            delete permissions[6];
            await roleRepository.save({
                name: "StudentMonthly",
                permissions
            })
            await roleRepository.save({
                name: "Studentyearly",
                permissions
            })

       await UserRepository.save({
            email: 'nambinintsoa577@gmail.com',
            username: 'nambinintsoa577',
            password: await bcryptjs.hash('ambinintsoa123', 10),
            role: admin
        })
        } catch (error) {
            console.log(error);
        }
    process.exit(0);
}).catch((err) => {
    console.log(err);
    
});