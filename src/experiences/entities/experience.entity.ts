import { Category } from "src/categories/entities/category.entity";
import { Country } from "src/countries/entities/country.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Experience {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: false })
  city: string;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    nullable: false,
  })
  publication_date: Date;

  @Column({ 
    nullable: false })
  travel_date: Date;

  @Column({ nullable: false, type: 'int' })
  user_id: number;

  @ManyToOne(() => User, (user) => user.experiences)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToMany(() => Category, (category) => category.experiences, {
    eager: true,
  })
  @JoinTable({
    name: 'classify',
    joinColumn: { name: 'experience_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'category_id', referencedColumnName: 'id' },
  })
  categories: Category[];

  @ManyToMany(() => Country, (country) => country.experiences, {
    eager: true,
  })
  @JoinTable({
    name: 'associate',
    joinColumn: { name: 'experience_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'country_id', referencedColumnName: 'id' },
  })
  countries: Country[];
}
