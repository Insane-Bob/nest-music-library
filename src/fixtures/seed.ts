import { DataSource } from 'typeorm';
import { User, UserRole } from '../users/users.entity';
import { Music } from '../music/music.entity';
import { usersFixture, musicsFixture } from './classic-rock-fixture';

/**
 * Seed script to populate the database with one admin, one user, and 20 classic rock musics for the user.
 * Usage: npx ts-node src/fixtures/seed.ts
 */
const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST || 'localhost',
  port: parseInt(process.env.POSTGRES_PORT || '5432'),
  username: process.env.POSTGRES_USER || 'postgres',
  password: process.env.POSTGRES_PASSWORD || 'postgres',
  database: process.env.POSTGRES_DB || 'postgres',
  entities: [User, Music],
  synchronize: false,
});

async function seed() {
  await AppDataSource.initialize();
  const userRepo = AppDataSource.getRepository(User);
  const musicRepo = AppDataSource.getRepository(Music);

  for (const userData of usersFixture) {
    const exists = await userRepo.findOneBy({ email: userData.email });
    if (!exists) {
      let password = userData.password;
      if (!password.startsWith('$2b$')) {
        const bcrypt = require('bcrypt');
        password = await bcrypt.hash(userData.password, 10);
      }
      await userRepo.save(userRepo.create({ ...userData, password }));
    }
  }

  const user = await userRepo.findOneBy({ email: 'user@classicrock.com' });
  if (!user) throw new Error('User not found for musics fixture');

  for (const musicData of musicsFixture) {
    const exists = await musicRepo.findOneBy({ title: musicData.title, artist: musicData.artist });
    if (!exists) {
      await musicRepo.save(musicRepo.create({ ...musicData, user }));
    }
  }

  console.log('Database seeded: 1 admin, 1 user, 20 classic rock musics');
  await AppDataSource.destroy();
}

seed().catch((err) => {
  console.error('Seeding error:', err);
  process.exit(1);
});
