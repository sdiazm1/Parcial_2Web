/* eslint-disable prettier/prettier */
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
import { Club } from "src/club/entities/club/club.entity"; 

@Entity()
export class Socio {
  @PrimaryGeneratedColumn()
  id: number; 

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  dateOfBirth: Date;

  @ManyToMany(() => Club, club => club.socios) // Muchos socios pueden estar en muchos clubs
  @JoinTable()
  clubs: Club[];
}
