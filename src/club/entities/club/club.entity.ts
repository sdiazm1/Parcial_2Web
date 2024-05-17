/* eslint-disable prettier/prettier */
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { Socio } from 'src/socio2/entities/socio2/socio2.entity'; 


@Entity()
export class Club {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'date' })
  foundationDate: Date;

  @Column()
  image: string;

  @Column({ length: 100 })
  description: string;

  @ManyToMany(() => Socio, socio => socio.clubs) // Muchos clubs pueden tener muchos socios
  socios: Socio[];
}
