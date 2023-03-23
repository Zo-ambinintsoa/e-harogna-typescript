import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import { CourseCat } from "./courseCat.entity";
import { CourseItem } from "./courseItem.entity";
import { CourseLike } from "./CourseLike.entity";

@Entity()
export class Course {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: String;

    @Column("longtext")
    description: String;

    @Column()
    image: String;

    @Column()
    IsPublished: Boolean;

    @ManyToOne(() => CourseCat, (courseCat) => courseCat.courses)
    courseCat: CourseCat;

    @OneToMany(() => CourseItem, (courseitem) => courseitem.course)
    courseitem: CourseItem[];

    @OneToMany(() => CourseLike, (courseLike) => courseLike.course)
    courseLike: CourseLike[];
}