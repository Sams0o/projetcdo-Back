import { Continent } from "src/continents/entities/continent.entity";
import { Experience } from "src/experiences/entities/experience.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable, JoinColumn } from "typeorm";

@Entity()
export class Country {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false, type: 'int' })
  continent_id: number;

  @ManyToOne(() => Continent, (continent) => continent.countries)
  @JoinColumn({ name: 'continent_id'})
  continents: Continent;

  @ManyToMany(() => Experience, (experience) => experience.countries)
  experiences: Experience[];
}
