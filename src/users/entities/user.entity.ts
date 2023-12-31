import { Exclude } from "class-transformer";
import { Experience } from "src/experiences/entities/experience.entity";
import { Picture } from "src/pictures/entities/picture.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  first_name: string;

  @Column({ nullable: false })
  last_name: string;

  @Column({ nullable: false, unique: true })
  pseudo: string;

  @Column({ nullable: true })
  biography: string;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column({ nullable: false })
  @Exclude()
  password: string;

  @Column({ nullable: false })
  admin: boolean;

  @OneToMany(() => Experience, (experience) => experience.user, { eager: true })
  experiences: Experience[];

  @OneToMany(() => Picture, (picture) => picture.user)
  pictures: Experience[];
}
