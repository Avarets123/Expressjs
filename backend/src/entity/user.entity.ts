import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { hash } from 'bcrypt'

enum Gender {
    Man = 'man',
    Wooman = 'wooman'
}

@Entity({ name: 'users' })
export class UserEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ default: '' })
    surname: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column({ nullable: true })
    gender: Gender;

    @Column({ default: '' })
    photo: string;


    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created: Date;


    @BeforeInsert()
    private async hashPassword(): Promise<void> {

        this.password = await hash(this.password, 9);

    }

}