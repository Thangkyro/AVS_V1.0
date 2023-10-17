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
import { useForgotPasswordMutation } from '@/store/auth/authApi';
import { toast } from 'react-toastify';

const validationSchema = Yup.object().shape({
    email: Yup.string().required('Please fill the email').email('Please enter a valid email'),
});

const ForgotPassword = () => {
    const dispatch = useDispatch();
    const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
    useEffect(() => {
        dispatch(setPageTitle('Recover Id Box'));
    });

    const formik = useFormik({
        initialValues: {
            email: '',
        },
        validationSchema,
        onSubmit: async (values) => {
            const data = {
                email: [values.email],
            };
            await forgotPassword(data).unwrap().then((res) => {
                toast.success("Email sent successfully, please check your email!");
            }, () => {
                toast.error('Something went wrong, please try again!');
            })
        },
    });

    return (
        <div className="flex min-h-screen items-center justify-center bg-[url('/assets/images/map.svg')] bg-cover bg-center dark:bg-[url('/assets/images/map-dark.svg')]">
            <div className="panel m-6 w-full max-w-lg sm:w-[480px]">
                <h2 className="mb-3 text-2xl font-bold">Password Reset</h2>
                <p className="mb-7">Enter your email to recover your ID</p>
                <form className="space-y-5" onSubmit={formik.handleSubmit} noValidate>
                    <div className={formik.submitCount ? (formik.errors.email ? 'has-error' : '') : ''}>
                        <label htmlFor="email">Email</label>
                        <input id="email" name="email" type="email" className="form-input" value={formik.values.email} onChange={formik.handleChange} placeholder="Enter Email" />
                        {formik.submitCount && formik.errors.email ? <div className="mt-1 text-danger">{formik.errors.email}</div> : ''}
                    </div>
                    <button type="submit" className="btn btn-primary w-full" disabled={isLoading}>
                        {isLoading ? <span className="animate-spin border-[3px] border-white border-l-transparent rounded-full w-5 h-5 inline-block align-middle m-auto"/> : 'RECOVER'}
                    </button>
                </form>
            </div>
        </div>
    );
};
ForgotPassword.getLayout = (page: any) => {
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

export default ForgotPassword;
