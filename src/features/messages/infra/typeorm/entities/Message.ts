import { IMessage } from "../../../domain/models/IMessage";
import {
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
  } from "typeorm";
  
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
  
    @CreateDateColumn()
    created_at: Date;
  
    @UpdateDateColumn()
    updated_at: Date;
  }
  
  export default Message;