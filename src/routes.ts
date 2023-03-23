import express, {Router} from 'express';
import { authenticatedUser, Login, Logout, Register, UpdateInfo, UpdatePassword } from './controller/authController';
import { createCourseCat, createCourseCatView, DeleteCourseCat, fetchAllCourseCat, UpdateCourseCat } from './controller/CourseCat.controller';
import { createCourse, createCourseView, DeleteCourse, fetchAllCourse, getOneCourse, UpdateCourse } from './controller/CourseController';
import { fetchAllfile, UploadFile, UploadImage } from './controller/imageController';
import { fetchPermission } from './controller/permissionController';
import { createRole, DeleteRole, fetchRole, getOneRole, UpdateRole } from './controller/roleController';
import { createUser, DeleteUser, fetchAllUser, getOneUser, UpdateUser } from './controller/userController';
import { authMiddleware } from './middleware/auth.middleware';
import { permissionMiddleware } from './middleware/permission.middleware';

export const routes = (router: Router )=>{

    router.get('/login', function(req , res) {
        res.render('Auth/login', {
            page_name: "login",
            title: 'S\'Authentification'
        });
    });

    router.get('/register', function(req , res) {
        res.render('Auth/register', {
            page_name: "register",
            title: 'S\'inscrire'
        });
    });
    
    
    router.get('/', authMiddleware, function(req , res) {
        res.render('pages/Home', {
            page_name: "acceuil",
            title: 'acceuille'
        });
    });

    router.get('/files', authMiddleware, fetchAllfile);

    router.get('/courses', authMiddleware, fetchAllCourse );
    router.get('/course/create', authMiddleware, createCourseView);
    router.post('/api/course/create', authMiddleware, UploadFile, createCourse);
    router.put('/api/course/:id', authMiddleware , UpdateCourse );
    router.get('/course/view/:id', authMiddleware, getOneCourse );
    router.delete('/api/course/:id', authMiddleware, DeleteCourse );


    router.get('/categories', authMiddleware, fetchAllCourseCat );
    
    router.get('/category/create', authMiddleware, createCourseCatView);
    router.post('api/category/create', authMiddleware, UploadImage, createCourseCat);
    router.put('/api/category/:id', authMiddleware, UpdateCourseCat );
    router.delete('/api/category/:id', authMiddleware, DeleteCourseCat );


    router.get('/jobs', fetchAllCourseCat );
    router.get('/job/create', createCourseCatView);
    router.post('api/job/create', UploadImage, createCourseCat);
    router.put('/api/job/:id', UpdateCourseCat );
    router.delete('/api/job/:id', DeleteCourseCat );




    router.post('/api/register', Register)
    router.post('/api/login', Login)
    router.get('/logout', Logout)
    
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