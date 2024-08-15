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
        return API.get('/user', config).then(
            AxiosContracts.responseContract(UserDtoSchema)
        );
    }

    static signUserMutation(data: { dto: SignUserDto }) {
        const signUserDto = AxiosContracts.requestContract(
            SignUserDtoSchema,
            data.dto
        );
        return API.post('/user/sign', { ...signUserDto }).then(
            AxiosContracts.responseContract(ResponseEmailStatus)
        );
    }

    static verifyCode(data: { dto: VerifyUserDto }) {
        const verifyUserDto = AxiosContracts.requestContract(
            VerifyUserDtoSchema,
            data.dto
        );

        return API.put('/user/verify', { ...verifyUserDto }).then(
            AxiosContracts.responseContract(UserDtoSchema)
        );
    }
}
