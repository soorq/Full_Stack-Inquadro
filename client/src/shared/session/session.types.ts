import { SessionSchema } from './session.contracts';
import { z } from 'zod';

export type Session = z.infer<typeof SessionSchema>;
