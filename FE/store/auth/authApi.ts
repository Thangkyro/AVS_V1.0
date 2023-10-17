import { IUser } from './../../types/user';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IForgotPassword, ILogin, IResetPassword } from '@/types/auth';

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({ baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/api` }),
    endpoints: (builder) => ({
        login: builder.mutation<IUser, Partial<ILogin>>({
            query: (data) => ({
                url: '/Login',
                method: 'POST',
                body: data,
            }),
        }),
        forgotPassword: builder.mutation<null, Partial<IForgotPassword>>({
            query: (data) => ({
                url: '/User/ForgotPassword',
                method: 'POST',
                body: data,
            }),
        }),
        resetPassword: builder.mutation<null, Partial<IResetPassword>>({
            query: (data) => ({
                url: '/User/UpdateNewPassword',
                method: 'POST',
                body: data,
            }),
        })
    }),
});

export const { useLoginMutation, useForgotPasswordMutation, useResetPasswordMutation } = authApi;
