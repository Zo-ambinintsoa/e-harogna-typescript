import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Course {
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
}