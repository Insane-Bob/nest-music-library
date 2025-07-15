import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../users/users.entity';

/**
 * Music entity represents a music entry in the user's library
 */
@Entity()
export class Music {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  artist: string;

  @Column({ nullable: true })
  album: string;

  /**
   * Reference to the owner user
   */
  @ManyToOne(() => User, { eager: true })
  user: User;
}
