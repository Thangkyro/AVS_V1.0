import { IUser } from './../../types/user';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ILogin } from '@/types/auth';

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({ baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/api/Login` }),
    endpoints: (builder) => ({
        login: builder.mutation<IUser, Partial<ILogin>>({
            query: (data) => ({
                url: '',
                method: 'POST',
                body: data,
            }),
        }),
    }),
});

export const { useLoginMutation } = authApi;
