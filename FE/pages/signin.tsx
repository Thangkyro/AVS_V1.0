import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import Cookie from 'js-cookie';
import { IRootState } from '../store';
import { GetServerSideProps } from 'next';
import { setPageTitle } from '../store/themeConfigSlice';
import BlankLayout from '@/components/Layouts/BlankLayout';
import { USER_COOKIE_KEY, isAuthenticated } from '@/hooks/useUser';
import { useLoginMutation } from '@/store/auth/authApi';

const validationSchema = Yup.object().shape({
    email: Yup.string().required('Please fill the email').email('Please enter a valid email'),
    password: Yup.string().required('Please fill the password').min(6, 'Password must be at least 6 characters'),
});

const SignIn = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Login'));
    });
    const router = useRouter();
    const isDark = useSelector((state: IRootState) => state.themeConfig.theme) === 'dark' ? true : false;
    const [login, { isLoading }] = useLoginMutation();

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema,
        onSubmit: async (values) => {
            const data = {
                Email: values.email,
                PassWord: values.password,
            };
            await login(data).unwrap().then((res) => {
                const token = JSON.stringify(res);
                Cookie.set(USER_COOKIE_KEY, token);
                router.push('/');
            }, (error) => {
                const {status} = error;
                if (status === 401) {
                    toast.error('Invalid email or password');
                } else {
                    toast.error('Something went wrong, please try again!');
                }
            })
        },
    });

    return (
        <div className="flex min-h-screen items-center justify-center bg-[url('/assets/images/map.svg')] bg-cover bg-center dark:bg-[url('/assets/images/map-dark.svg')]">
            <div className="panel m-6 w-full max-w-lg sm:w-[480px]">
                <h2 className="mb-3 text-2xl font-bold">Sign In</h2>
                <p className="mb-7">Enter your email and password to login</p>
                <form className="space-y-5" onSubmit={formik.handleSubmit} noValidate>
                    <div className={formik.submitCount ? (formik.errors.email ? 'has-error' : '') : ''}>
                        <label htmlFor="email">Email</label>
                        <input id="email" name="email" type="email" className="form-input" value={formik.values.email} onChange={formik.handleChange} placeholder="Enter Email" />
                        {formik.submitCount && formik.errors.email ? <div className="mt-1 text-danger">{formik.errors.email}</div> : ''}
                    </div>
                    <div className={formik.submitCount ? (formik.errors.password ? 'has-error' : '') : ''}>
                        <label htmlFor="password">Password</label>
                        <input id="password" name="password" type="password" className="form-input" value={formik.values.password} onChange={formik.handleChange} placeholder="Enter Password" />
                        {formik.submitCount && formik.errors.password ? <div className="mt-1 text-danger">{formik.errors.password}</div> : ''}
                    </div>
                    <p className="">
                        <Link href="/forgot-password" className="font-bold text-primary hover:underline ltr:ml-1 rtl:mr-1">
                            Forgot password?
                        </Link>
                    </p>
                    <button type="submit" className="btn btn-primary w-full" disabled={isLoading}>
                        {isLoading ? <span className="animate-spin border-[3px] border-white border-l-transparent rounded-full w-5 h-5 inline-block align-middle m-auto"/> : 'SIGN IN'}
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
