import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { GetServerSideProps } from 'next';
import { IRootState } from '../store';
import { setPageTitle } from '../store/themeConfigSlice';
import { isAuthenticated } from '@/hooks/useUser';
import BlankLayout from '@/components/Layouts/BlankLayout';

const PasswordReset = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Recover Id Box'));
    });
    const router = useRouter();
    const isDark = useSelector((state: IRootState) => state.themeConfig.theme) === 'dark' ? true : false;

    const submitForm = (e: any) => {
        e.preventDefault();
        router.push('/');
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-[url('/assets/images/map.svg')] bg-cover bg-center dark:bg-[url('/assets/images/map-dark.svg')]">
            <div className="panel m-6 w-full max-w-lg sm:w-[480px]">
                <h2 className="mb-3 text-2xl font-bold">Password Reset</h2>
                <p className="mb-7">Enter your email to recover your ID</p>
                <form className="space-y-5" onSubmit={submitForm}>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input id="email" type="email" className="form-input" placeholder="Enter Email" />
                    </div>
                    <button type="submit" className="btn btn-primary w-full">
                        RECOVER
                    </button>
                </form>
            </div>
        </div>
    );
};
PasswordReset.getLayout = (page: any) => {
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

export default PasswordReset;
