import express, {Router} from 'express';
import { authenticatedUser, Login, Logout, Register, UpdateInfo, UpdatePassword } from './controller/authController';
import { createCourseCat, createCourseCatView, DeleteCourseCat, fetchAllCourseCat, UpdateCourseCat } from './controller/CourseCat.controller';
import { createCourse, createCourseView, DeleteCourse, fetchAllCourse, UpdateCourse } from './controller/CourseController';
import { UploadImage } from './controller/imageController';
import { fetchPermission } from './controller/permissionController';
import { createRole, DeleteRole, fetchRole, getOneRole, UpdateRole } from './controller/roleController';
import { createUser, DeleteUser, fetchAllUser, getOneUser, UpdateUser } from './controller/userController';
import { authMiddleware } from './middleware/auth.middleware';
import { permissionMiddleware } from './middleware/permission.middleware';

export const routes = (router: Router )=>{

    router.get('/', function(req , res) {
        res.render('pages/Home', {
            page_name: "acceuil"
        });
    });

    router.get('/courses', fetchAllCourse );
    router.get('/course/create', createCourseView);
    router.post('api/course/create', createCourse);
    router.put('/api/course/:id', UpdateCourse );
    router.delete('/api/course/:id', DeleteCourse );


    router.get('/categories', fetchAllCourseCat );
    router.get('/category/create', createCourseCatView);
    router.post('api/category/create', createCourseCat);
    router.put('/api/category/:id', UpdateCourseCat );
    router.delete('/api/category/:id', DeleteCourseCat );


    router.post('/api/register', Register)
    router.post('/api/login', Login)
    
    router.get('/api/user', authMiddleware, authenticatedUser)
    router.post('/api/logout', authMiddleware, Logout)
    router.put('/api/user/update', authMiddleware, UpdateInfo)
    router.put('/api/user/update/password', authMiddleware, UpdatePassword)


    router.get('/api/users', authMiddleware, permissionMiddleware('User'), fetchAllUser)
    router.get('/api/users/:id', authMiddleware, permissionMiddleware('User'), getOneUser)
    router.post('/api/users', authMiddleware, permissionMiddleware('User'), createUser)
    router.put('/api/users/:id', authMiddleware, permissionMiddleware('User'),  UpdateUser)
    router.delete('/api/users/:id', authMiddleware, permissionMiddleware('User'), DeleteUser)


    router.get('/api/permission', authMiddleware, permissionMiddleware('Role'), fetchPermission)

    router.get('/api/role', authMiddleware, permissionMiddleware('Role'), fetchRole)
    router.get('/api/role/:id', authMiddleware, permissionMiddleware('Role'), getOneRole)
    router.post('/api/role', authMiddleware, permissionMiddleware('Role'), createRole)
    router.put('/api/role/:id', authMiddleware, permissionMiddleware('Role'), UpdateRole)
    router.delete('/api/role/:id', authMiddleware, permissionMiddleware('Role'), DeleteRole)

    router.post('/api/upload', UploadImage)
    router.use('/api/uploads', express.static('./upload'))
    router.use('/assets', express.static('./assets'))
}