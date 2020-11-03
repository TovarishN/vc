import 'reflect-metadata';
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: "Users"})
export class Users {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    Username: string;

    @Column()
    FirstName: string;

    @Column()
    LastName: string;

    @Column()
    Email: string;

    @Column()
    PasswordMD5: string;
}