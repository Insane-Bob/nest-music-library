import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column({ default: false })
  isEmailValidated: boolean;

  @Column({ nullable: true })
  validationToken: string;

  @Column({ nullable: true })
  twoFactorCode: string;

  @Column({ nullable: true, type: 'timestamp' })
  twoFactorCodeExpires: Date;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole;
}
