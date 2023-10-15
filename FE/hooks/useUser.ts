import { IUser } from '@/types/user';
import Cookie from 'js-cookie';

export const USER_COOKIE_KEY = 'user';

export const useAuth = () => {
    const login = (username: string, password: string) => {
        Cookie.set(USER_COOKIE_KEY, '123456');

        // redirect to home page
        window.location.href = '/';
    };

    const logout = () => {
        Cookie.remove(USER_COOKIE_KEY);
        window.location.href = '/singin';
    };

    return { login, logout };
};

export const getCurrentUser = (): IUser | null => {
    const user = Cookie.get(USER_COOKIE_KEY);
    return user ? JSON.parse(user) : null;
};

export const isAuthenticated = (req: any) => {
    const token = req.cookies[USER_COOKIE_KEY];
    return !!token;
};

export const checkExpiry = () => {
    const user = getCurrentUser();
    if (user?.userName && user?.expired) {
        const date = new Date();
        if (user.expired * 1000 < date.getTime()) {
            Cookie.remove(USER_COOKIE_KEY);
            window.location.href = '/singin';
        }
    } else {
        Cookie.remove(USER_COOKIE_KEY);
        window.location.href = '/singin';
    }
};
