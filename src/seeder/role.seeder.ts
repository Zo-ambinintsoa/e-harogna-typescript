import { createConnection, getManager } from "typeorm";
import { Permission } from "../entity/permission.entity";
import { Role } from "../entity/role.entity";
import { User } from "../entity/user.entity";
import bcryptjs from 'bcryptjs';
import { env } from "../../env";

createConnection().then(async (result) => {
    const permissionRepository = getManager().getRepository(Permission);
    const params = ['viewUser', 'viewRole', 'viewCourse', 'viewJob', 'editUser', 'editRole', 'editCourse', 'editJob'];
    let permissions = [];
    for (let i = 0; i < params.length; i++) {
        const existing = await permissionRepository.find({ where: { name: params[i] } });
        if (existing.length == 0) {
            permissions.push(await permissionRepository.save({ name: params[i] }).catch((err) => {
                console.log(err);
            }));
        } else {
            permissions.push(existing[0])
        }

    }

    const roleRepository = getManager().getRepository(Role);
    const UserRepository = getManager().getRepository(User);
    try {
        let existingRole = await roleRepository.find({ where: { name: "Admin" } })
        let admin = null;
        if (existingRole.length > 0) {
            admin = existingRole[0]
        } else {
            admin = await roleRepository.save({
                name: "Admin",
                permissions
            })
        }
        delete permissions[5];
        existingRole = await roleRepository.find({ where: { name: "Editor" } })
        if (existingRole.length == 0) {
            await roleRepository.save({
                name: "Editor",
                permissions
            })
        }
        delete permissions[0];
        delete permissions[1];
        delete permissions[4];
        delete permissions[5];
        delete permissions[6];
        existingRole = await roleRepository.find({ where: { name: "StudentMonthly" } })
        if (existingRole.length == 0) {
            await roleRepository.save({
                name: "Studentyearly",
                permissions
            })
        }

        existingRole = await roleRepository.find({ where: { name: "Studentyearly" } })
        if (existingRole.length == 0) {
            await roleRepository.save({
                name: "Studentyearly",
                permissions
            })
        }

        const adminUser = await UserRepository.find({ where: { email: env.user.adminEmail } })
        if (adminUser.length == 0) {
            await UserRepository.save({
                email: env.user.adminEmail,
                username: env.user.adminUsername,
                IsConfirmed: true,
                password: await bcryptjs.hash(env.user.adminPassword, 10),
                role: admin
            })
        }
    } catch (error) {
        console.log(error);
    }
    process.exit(0);
}).catch((err) => {
    console.log(err);

});