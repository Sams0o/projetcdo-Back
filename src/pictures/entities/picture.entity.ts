import { Experience } from "src/experiences/entities/experience.entity";
import { User } from "src/users/entities/user.entity";
import { PrimaryGeneratedColumn, Column, Entity, OneToOne, ManyToOne, JoinColumn, OneToMany } from "typeorm";

@Entity()
export class Picture {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  mimetype: string;

  @Column({ nullable: false })
  size: number;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: false, type: 'int' })
  experience_id: number;

  @Column({ nullable: false, type: 'int' })
  user_id: number;

  @OneToMany(() => Experience, (experience) => experience.pictures)
  @JoinColumn({ name: 'experience_id' })
  experiences: Experience;

  @OneToMany(() => User, (user) => user.pictures)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
