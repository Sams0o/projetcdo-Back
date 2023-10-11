
import { Experience } from "src/experiences/entities/experience.entity";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinTable } from "typeorm";

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  label: string;

  @OneToMany(() => Experience, (experience) => experience.categories)
  experiences: Experience[];
}

