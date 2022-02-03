import { IMessage } from "../../../domain/models/IMessage";
import {
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
  } from "typeorm";
import User from "@modules/users/infra/typeorm/entities/User";
import { IUserSession } from "@modules/users/domain/models/IUserSession";
  
  @Entity("messages")
  class Message implements IMessage{
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    user_id: string;
  
    @Column()
    description: string;
  
    @Column()
    details: string;

    @ManyToOne(() => User, user => user.messages)
    @JoinColumn({ name: 'user_id' })
    user: User;
  
    @CreateDateColumn()
    created_at: Date;
  
    @UpdateDateColumn()
    updated_at: Date;
  }
  
  export default Message;