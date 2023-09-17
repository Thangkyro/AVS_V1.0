import Cookie from 'js-cookie';
import { NextRequest } from 'next/server';

export const USER_COOKIE_KEY = 'user';

export const useAuth = () => {
    const login = (username: string, password: string) => {
        Cookie.set(USER_COOKIE_KEY, '123456');

        // redirect to home page
        window.location.href = '/';
    };

    const logout = () => {
        Cookie.remove(USER_COOKIE_KEY);
    };

    return { login, logout };
};

export const useCurrentUser = () => {
    const token = Cookie.get(USER_COOKIE_KEY);
    return { token };
};

export const isAuthenticated = (req: any) => {
    const token = req.cookies[USER_COOKIE_KEY];
    return !!token;
};
