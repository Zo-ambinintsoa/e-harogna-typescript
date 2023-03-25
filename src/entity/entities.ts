import { Course } from "./course.entity";
import { CourseCat } from "./courseCat.entity";
import { CourseItem } from "./courseItem.entity";
import { CourseLike } from "./CourseLike.entity";
import { Job } from "./job.entity";
import { MyJob } from "./myjob.entity";
import { Permission } from "./permission.entity";
import { Role } from "./role.entity";
import { User } from "./user.entity";
import { harognaFile } from "./file.entity"

export const entities = [
    Course, CourseCat, Job, MyJob, Permission, Role, User, CourseLike, CourseItem, harognaFile
]