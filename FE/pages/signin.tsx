import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { IRootState } from '../store';
import { GetServerSideProps } from 'next';
import { setPageTitle } from '../store/themeConfigSlice';
import BlankLayout from '@/components/Layouts/BlankLayout';
import { isAuthenticated, useAuth } from '@/hooks/useUser';

const SignIn = () => {
    const dispatch = useDispatch();
    const { login } = useAuth();
    useEffect(() => {
        dispatch(setPageTitle('Login'));
    });
    const router = useRouter();
    const isDark = useSelector((state: IRootState) => state.themeConfig.theme) === 'dark' ? true : false;

    const submitForm = (e: any) => {
        e.preventDefault();
        router.push('/');
    };

    const onSignIn = () => {
        login('username', 'password');
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-[url('/assets/images/map.svg')] bg-cover bg-center dark:bg-[url('/assets/images/map-dark.svg')]">
            <div className="panel m-6 w-full max-w-lg sm:w-[480px]">
                <h2 className="mb-3 text-2xl font-bold">Sign In</h2>
                <p className="mb-7">Enter your email and password to login</p>
                <form className="space-y-5" onSubmit={submitForm}>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input id="email" type="email" className="form-input" placeholder="Enter Email" />
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input id="password" type="password" className="form-input" placeholder="Enter Password" />
                    </div>
                    <p className="">
                        <Link href="/password-reset" className="font-bold text-primary hover:underline ltr:ml-1 rtl:mr-1">
                            Forgot password?
                        </Link>
                    </p>
                    <button type="button" className="btn btn-primary w-full" onClick={onSignIn}>
                        SIGN IN
                    </button>
                </form>
            </div>
        </div>
    );
};
SignIn.getLayout = (page: any) => {
    return <BlankLayout>{page}</BlankLayout>;
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
    const token = isAuthenticated(req);

    if (token) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        };
    }

    return {
        props: {},
    };
};

export default SignIn;
