import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CourseLike } from "./CourseLike.entity";
import { Role } from "./role.entity";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        unique: true
    })
    email: string;

    @Column({
        unique: true
    })
    username: string;

    @Column()
    password: string;

    @OneToMany(() => CourseLike, (courseLike) => courseLike.course)
    likes: CourseLike[]

    @ManyToOne(() => Role)
    @JoinColumn({name: "roleId"})
    role: Role;
}