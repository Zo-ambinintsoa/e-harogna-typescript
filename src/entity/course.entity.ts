import {Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import { CourseCat } from "./courseCat.entity";

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
    courseCat: CourseCat
}