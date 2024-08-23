import type { SignUserDto, VerifyUserDto } from './auth.types';
import { AxiosContracts } from '../../lib/axios';
import { API } from '../index';
import {
    ResponseEmailStatus,
    VerifyUserDtoSchema,
    SignUserDtoSchema,
    UserDtoSchema
} from './auth.contracts';

export class AuthService {
    static currentUserQuery(config: { signal?: AbortSignal }) {
        return API.get('/auth', config).then(
            AxiosContracts.responseContract(UserDtoSchema)
        );
    }

    static signUserMutation(data: { dto: SignUserDto }) {
        const signUserDto = AxiosContracts.requestContract(
            SignUserDtoSchema,
            data.dto
        );
        return API.post('/auth/sign', { ...signUserDto }).then(
            AxiosContracts.responseContract(ResponseEmailStatus)
        );
    }

    static verifyCode(data: { dto: VerifyUserDto }) {
        const verifyUserDto = AxiosContracts.requestContract(
            VerifyUserDtoSchema,
            data.dto
        );

        return API.put('/auth/verify', { ...verifyUserDto }).then(
            AxiosContracts.responseContract(UserDtoSchema)
        );
    }
}
