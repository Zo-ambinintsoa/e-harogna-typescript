import {Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import { Job } from "./job.entity";
import { User } from "./user.entity";

@Entity()
export class MyJob {

    @PrimaryGeneratedColumn()
    id: number; 

    @ManyToOne(() => Job, (job) => job.myjob)
    job: Job;

    @ManyToOne(() => User, (user) => user.myjob)
    user: User;

}