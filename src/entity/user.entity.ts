import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CourseLike } from "./CourseLike.entity";
import { Job } from "./job.entity";
import { MyJob } from "./myjob.entity";
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

    @Column()
    IsConfirmed: Boolean = false;

    @OneToMany(() => CourseLike, (courseLike) => courseLike.user)
    likes: CourseLike[]

    @OneToMany(() => Job, (job) => job.user)
    job: Job[]

    @OneToMany(() => MyJob, (myjob) => myjob.user)
    myjob: MyJob[]

    @ManyToOne(() => Role)
    @JoinColumn({name: "roleId"})
    role: Role;
}