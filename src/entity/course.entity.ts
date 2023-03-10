import {Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import { CourseCat } from "./courseCat.entity";
import { CourseItem } from "./courseItem.entity";

@Entity()
export class Course {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: String;

    @Column()
    description: String;

    @Column()
    image: String;

    @Column()
    price: Number;

    @ManyToOne(() => CourseCat, (courseCat) => courseCat.courses)
    courseCat: CourseCat;

    @OneToMany(() => CourseItem, (courseitem) => courseitem.course)
    courseitem: CourseItem[]
}