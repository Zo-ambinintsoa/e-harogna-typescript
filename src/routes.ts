import express, {Router} from 'express';
import { authenticatedUser, Login, Logout, Register, UpdateInfo, UpdatePassword, updateUserview } from './controller/authController';
import { createCourseCat, createCourseCatView, DeleteCourseCat, fetchAllCourseCat, UpdateCourseCat } from './controller/CourseCat.controller';
import { createCourse, createCourseView, DeleteCourse, fetchAllCourse, fetchAllCoursebyCategoryFront, fetchAllCourseFront, fetchOneCourseFront, getOneCourse, UpdateCourse } from './controller/CourseController';
import { sendmymail, sendmymailSendGrid } from './controller/emailController';
import { fetchAllfile, UploadFile, UploadFileJob, UploadImage } from './controller/imageController';
import { createJob, createJobView, DeleteJob, DeleteMyJob, fetchAllJob, fetchAllJobFront, getOneJob, postuleJobView, savemyJob, UpdateJob } from './controller/jobController';
import { fetchPermission } from './controller/permissionController';
import { createRole, DeleteRole, fetchRole, getOneRole, UpdateRole } from './controller/roleController';
import { createUser, DeleteUser, fetchAllUser, getOneUser, UpdateUser } from './controller/userController';
import { authMiddleware } from './middleware/auth.middleware';
import { permissionMiddleware } from './middleware/permission.middleware';

export const routes = (router: Router )=>{

    router.get('/login', function(req , res) {
        res.render('Auth/login', {
            page_name: "login",
            title: 'S\'authentification'
        });
    });

    router.get('/register', function(req , res) {
        res.render('Auth/register', {
            page_name: "register",
            title: 'S\'inscrire'
        });
    });

    router.get('/pricing', function(req , res) {
        res.render('pages/pricing', {
            page_name: "register",
            title: 'Nos Prix'
        });
    });


    
    
    router.get('/', function(req , res) {
        return res.render('pages/homepage', {
            page_name: "acceuil",
            title: 'acceuille'
        });
    });

    router.get('/welcome', authMiddleware, function(req , res) {
        return res.render('pages/Home', {
            page_name: "acceuil",
            title: 'acceuille'
        });
    });

    router.get('/blog', authMiddleware, fetchAllCourseFront);
    router.get('/blog/:id', authMiddleware, fetchOneCourseFront);
    router.get('/files', authMiddleware, fetchAllfile);
    router.get('/courses/category/:cat', authMiddleware, fetchAllCoursebyCategoryFront);
    router.get('/mails', sendmymailSendGrid);

    router.get('/courses', authMiddleware, fetchAllCourse );
    router.get('/course/create', authMiddleware, createCourseView);
    router.post('/api/course/create', authMiddleware, UploadFile, createCourse);
    router.put('/api/course/:id', authMiddleware , UpdateCourse );
    router.get('/course/view/:id', authMiddleware, getOneCourse );
    router.get('/api/delete/course/:id', authMiddleware, DeleteCourse );


    router.get('/categories', authMiddleware, fetchAllCourseCat );
    
    router.get('/category/create', authMiddleware, createCourseCatView);
    router.post('/api/category/create', authMiddleware, UploadImage, createCourseCat);
    router.put('/api/category/:id', authMiddleware, UpdateJob );
    router.get('/api/delete/category/:id', authMiddleware, DeleteCourseCat );


    router.get('/myjobs', authMiddleware, fetchAllJobFront );
    router.get('/jobs', authMiddleware , fetchAllJob );
    router.get('/job/save/:id', authMiddleware , savemyJob );
    router.get('/job/postuler/:id', authMiddleware , postuleJobView );
    router.get('/job/create', authMiddleware, createJobView);
    router.get('/job/view/:id', authMiddleware, getOneJob );
    router.post('/api/job/create', authMiddleware, UploadFileJob, createJob);
    router.post('/api/job/postuler', authMiddleware, UploadFileJob, createJob);
    router.put('/api/job/:id', authMiddleware, UpdateJob );
    router.get('/api/delete/job/:id', authMiddleware, DeleteJob );
    router.get('/job/del/:id', authMiddleware, DeleteMyJob );




    router.post('/api/register', Register)
    router.post('/api/login', Login)
    router.get('/logout', Logout)
    
    router.post('/api/logout', authMiddleware, Logout)
    router.get('/api/user', authMiddleware, authenticatedUser)
    router.get('/update/user', authMiddleware, updateUserview)
    router.put('/api/user/update', authMiddleware, UpdateInfo)
    router.post('/api/user/update/password', authMiddleware, UpdatePassword)


    router.get('/api/users', authMiddleware, permissionMiddleware('User'), fetchAllUser)
    router.get('/api/users/:id', authMiddleware, permissionMiddleware('User'), getOneUser)
    router.post('/api/users', authMiddleware, permissionMiddleware('User'), createUser)
    router.put('/api/users/:id', authMiddleware, permissionMiddleware('User'),  UpdateUser)
    router.get('/api/delete/users/:id', authMiddleware, permissionMiddleware('User'), DeleteUser)


    router.get('/api/permission', authMiddleware, permissionMiddleware('Role'), fetchPermission)

    router.get('/api/role', authMiddleware, permissionMiddleware('Role'), fetchRole)
    router.get('/api/role/:id', authMiddleware, permissionMiddleware('Role'), getOneRole)
    router.post('/api/role', authMiddleware, permissionMiddleware('Role'), createRole)
    router.put('/api/role/:id', authMiddleware, permissionMiddleware('Role'), UpdateRole)
    router.get('/api/delete/role/:id', authMiddleware, permissionMiddleware('Role'), DeleteRole)

    router.post('/api/upload', UploadImage)
    router.use('/api/uploads', express.static('./upload'))
    router.use('/assets', express.static('./assets'))
}