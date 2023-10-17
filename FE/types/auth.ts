export interface ILogin {
    Email: string;
    PassWord: string;
}

export interface IForgotPassword {
    email: string[];
}

export interface IResetPassword {
    password: string;
    token: string;
}
