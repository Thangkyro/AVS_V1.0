import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { GetServerSideProps } from 'next';
import { IRootState } from '../store';
import { setPageTitle } from '../store/themeConfigSlice';
import { isAuthenticated } from '@/hooks/useUser';
import BlankLayout from '@/components/Layouts/BlankLayout';
import { toast } from 'react-toastify';
import { useResetPasswordMutation } from '@/store/auth/authApi';

const validationSchema = Yup.object().shape({
    password: Yup.string().required('Please fill the password').min(6, 'Password must be at least 6 characters'),
    repeatPassword: Yup.string().required('Please fill the password').min(6, 'Password must be at least 6 characters').oneOf([Yup.ref('password'), null], 'Passwords must match'),
});

const PasswordReset = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Recover Id Box'));
    });
    const router = useRouter();
    const [resetPassword, { isLoading }] = useResetPasswordMutation();
    const isDark = useSelector((state: IRootState) => state.themeConfig.theme) === 'dark' ? true : false;

    const formik = useFormik({
        initialValues: {
            password: '',
            repeatPassword: '',
        },
        validationSchema,
        onSubmit: async (values) => {
            if (!router.query.token) {
                return;
            }
            const data = {
                password: values.password,
                token: router.query.token as string,
            };
            await resetPassword(data).unwrap().then((res) => {
                toast.success("Reset password successfully, please login with your new password!");
                router.push('/signin');
            }, () => {
                toast.error('Something went wrong, please try again!');
            })
        },
    });

    return (
        <div className="flex min-h-screen items-center justify-center bg-[url('/assets/images/map.svg')] bg-cover bg-center dark:bg-[url('/assets/images/map-dark.svg')]">
            <div className="panel m-6 w-full max-w-lg sm:w-[480px]">
                <h2 className="mb-3 text-2xl font-bold">Password Reset</h2>
                <p className="mb-7">Enter your new password to recover your ID</p>
                <form className="space-y-5" onSubmit={formik.handleSubmit} noValidate>
                    <div className={formik.submitCount ? (formik.errors.password ? 'has-error' : '') : ''}>
                        <label htmlFor="password">New password</label>
                        <input id="password" name="password" type="password" className="form-input" value={formik.values.password} onChange={formik.handleChange} placeholder="Enter new password" />
                        {formik.submitCount && formik.errors.password ? <div className="mt-1 text-danger">{formik.errors.password}</div> : ''}
                    </div>
                    <div className={formik.submitCount ? (formik.errors.repeatPassword ? 'has-error' : '') : ''}>
                        <label htmlFor="repeatPassword">New password</label>
                        <input id="repeatPassword" name="repeatPassword" type="password" className="form-input" value={formik.values.repeatPassword} onChange={formik.handleChange} placeholder="Enter new password" />
                        {formik.submitCount && formik.errors.repeatPassword ? <div className="mt-1 text-danger">{formik.errors.repeatPassword}</div> : ''}
                    </div>
                    <button type="submit" className="btn btn-primary w-full">
                        {isLoading ? <span className="animate-spin border-[3px] border-white border-l-transparent rounded-full w-5 h-5 inline-block align-middle m-auto"/> : 'SUBMIT'}
                    </button>
                </form>
            </div>
        </div>
    );
};
PasswordReset.getLayout = (page: any) => {
    return <BlankLayout>{page}</BlankLayout>;
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const token = isAuthenticated(ctx.req);
    const query = ctx.query;

    if (!query.token) {
        return {
            redirect: {
                destination: '/signin',
                permanent: false,
            },
        }
    }

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

export default PasswordReset;
