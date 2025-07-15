import { CreateMusicDto } from '../music/dto/music.dto';
import { UserRole } from '../users/users.entity';
import { v4 as uuidv4 } from 'uuid';

export const usersFixture = [
  {
    id: uuidv4(),
    email: 'user@classicrock.com',
    password: 'Password-User-1234&',
    firstname: 'Classic',
    lastname: 'Rocker',
    isEmailValidated: true,
    role: UserRole.USER,
  },
  {
    id: uuidv4(),
    email: 'admin@classicrock.com',
    password: 'Password-Admin-1234&',
    firstname: 'Admin',
    lastname: 'Rock',
    isEmailValidated: true,
    role: UserRole.ADMIN,
  },
];

export const musicsFixture: CreateMusicDto[] = [
  { title: 'L.A. WOMAN', artist: 'The Doors', album: 'L.A. Woman' },
  { title: 'Light My Fire', artist: 'The Doors', album: 'The Doors' },
  { title: 'Riders on the Storm', artist: 'The Doors', album: 'L.A. Woman' },
  { title: 'Break On Through', artist: 'The Doors', album: 'The Doors' },
  { title: 'White Rabbit', artist: 'Jefferson Airplane', album: 'Surrealistic Pillow' },
  { title: 'Somebody to Love', artist: 'Jefferson Airplane', album: 'Surrealistic Pillow' },
  { title: 'Piece of My Heart', artist: 'Big Brother & The Holding Company', album: 'Cheap Thrills' },
  { title: 'Purple Haze', artist: 'Jimi Hendrix', album: 'Are You Experienced' },
  { title: 'All Along the Watchtower', artist: 'Jimi Hendrix', album: 'Electric Ladyland' },
  { title: 'Born to Be Wild', artist: 'Steppenwolf', album: 'Steppenwolf' },
  { title: 'Gimme Shelter', artist: 'The Rolling Stones', album: 'Let It Bleed' },
  { title: 'Paint It Black', artist: 'The Rolling Stones', album: 'Aftermath' },
  { title: 'Fortunate Son', artist: 'Creedence Clearwater Revival', album: 'Willy and the Poor Boys' },
  { title: 'Bad Moon Rising', artist: 'Creedence Clearwater Revival', album: 'Green River' },
  { title: 'Sunshine of Your Love', artist: 'Cream', album: 'Disraeli Gears' },
  { title: 'With a Little Help from My Friends', artist: 'Joe Cocker', album: 'With a Little Help from My Friends' },
  { title: 'Time Has Come Today', artist: 'The Chambers Brothers', album: 'The Time Has Come' },
  { title: 'For What It’s Worth', artist: 'Buffalo Springfield', album: 'Buffalo Springfield' },
  { title: 'You Really Got Me', artist: 'The Kinks', album: 'Kinks' },
  { title: 'House of the Rising Sun', artist: 'The Animals', album: 'The Animals' },
];
