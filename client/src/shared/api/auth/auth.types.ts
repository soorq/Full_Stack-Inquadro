import { z } from 'zod';
import {
    SignUserDtoSchema,
    UserDtoSchema,
    VerifyUserDtoSchema
} from './auth.contracts';

export type UserDto = z.infer<typeof UserDtoSchema>;
export type SignUserDto = z.infer<typeof SignUserDtoSchema>;
export type VerifyUserDto = z.infer<typeof VerifyUserDtoSchema>;
