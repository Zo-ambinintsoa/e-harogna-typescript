import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import { Course } from "./course.entity";

@Entity()
export class CourseCat {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: String;

    @Column()
    description: String;

    @Column()
    image: String;
    
    @OneToMany(() => Course, (courses) => courses.courseCat)
    courses: Course[];
}