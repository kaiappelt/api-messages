import { IUser } from "../../../domain/models/IUser";
import {
   Column,
   CreateDateColumn,
   UpdateDateColumn,
   Entity,
   PrimaryGeneratedColumn,
   OneToMany,
} from "typeorm";
import Message from "@modules/messages/infra/typeorm/entities/Message";

@Entity("users")
class User implements IUser{
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @OneToMany(() => Message, messages => messages.user)
    messages: Message[];
  
    @CreateDateColumn()
    created_at: Date;

    
    @UpdateDateColumn()
    updated_at: Date;
}

export default User;