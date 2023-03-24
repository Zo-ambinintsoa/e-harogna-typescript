import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import { MyJob } from "./myjob.entity";
import { User } from "./user.entity";

@Entity()
export class Job {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: String;

    @Column()
    companyName: String;

    @Column()
    JobTitle: String;

    @Column()
    JobType: String;

    @Column("longtext")
    description: String;

    @Column()
    image: String;

    @Column()
    MinSalary: Number;

    @Column()
    MaxSalary: Number;
    
    @Column()
    IsOpen: Boolean;

    @ManyToOne(() => User, (user) => user.job)
    user: User;

    @OneToMany(() => MyJob, (job) => job.job)
    myjob: MyJob[]
    
}
