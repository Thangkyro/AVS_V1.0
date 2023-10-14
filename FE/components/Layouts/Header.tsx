import { MouseEvent, MouseEventHandler, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { IRootState } from '../../store';
import { toggleTheme } from '../../store/themeConfigSlice';
import { toggleSidebar } from '../../store/themeConfigSlice';
import Dropdown from '../Dropdown';
import { useAuth, getCurrentUser, checkExpiry } from '@/hooks/useUser';

const Header = () => {
    const router = useRouter();
    const user = getCurrentUser();
    const {logout} = useAuth();

    useEffect(() => {
        const selector = document.querySelector('ul.horizontal-menu a[href="' + window.location.pathname + '"]');
        if (selector) {
            const all: any = document.querySelectorAll('ul.horizontal-menu .nav-link.active');
            for (let i = 0; i < all.length; i++) {
                all[0]?.classList.remove('active');
            }

            let allLinks = document.querySelectorAll('ul.horizontal-menu a.active');
            for (let i = 0; i < allLinks.length; i++) {
                const element = allLinks[i];
                element?.classList.remove('active');
            }
            selector?.classList.add('active');

            const ul: any = selector.closest('ul.sub-menu');
            if (ul) {
                let ele: any = ul.closest('li.menu').querySelectorAll('.nav-link');
                if (ele) {
                    ele = ele[0];
                    setTimeout(() => {
                        ele?.classList.add('active');
                    });
                }
            }
        }
    }, [router.pathname]);
    useEffect(() => {
        checkExpiry();
    }, [])

    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;
    const themeConfig = useSelector((state: IRootState) => state.themeConfig);

    const dispatch = useDispatch();

    const signOut = (e: MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        logout();
    }

    return (
        <header className={themeConfig.semidark && themeConfig.menu === 'horizontal' ? 'dark' : ''}>
            <div className="shadow-sm">
                <div className="relative flex w-full items-center bg-white px-5 py-2.5 dark:bg-black">
                    <div className="horizontal-logo flex items-center justify-between ltr:mr-2 rtl:ml-2 lg:hidden">
                        <Link href="/" className="main-logo flex shrink-0 items-center">
                            <img className="inline w-8 ltr:-ml-1 rtl:-mr-1" src="/assets/images/logo.svg" alt="logo" />
                            <span className="hidden align-middle text-2xl  font-semibold  transition-all duration-300 ltr:ml-1.5 rtl:mr-1.5 dark:text-white-light md:inline">VRISTO</span>
                        </Link>
                        <button
                            type="button"
                            className="collapse-icon flex flex-none rounded-full bg-white-light/40 p-2 hover:bg-white-light/90 hover:text-primary ltr:ml-2 rtl:mr-2 dark:bg-dark/40 dark:text-[#d0d2d6] dark:hover:bg-dark/60 dark:hover:text-primary lg:hidden"
                            onClick={() => dispatch(toggleSidebar())}
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <use href="/assets/images/icons/icons.svg#lineDuotoneEssentionalUIHambergerMenu" stroke="currentColor" />
                            </svg>
                        </button>
                    </div>

                    <div className="flex items-center space-x-1.5 ltr:ml-auto rtl:mr-auto rtl:space-x-reverse dark:text-[#d0d2d6] sm:flex-1 ltr:sm:ml-0 sm:rtl:mr-0 lg:space-x-2">
                        <div className="sm:ltr:mr-auto sm:rtl:ml-auto"></div>
                        <div>
                            {themeConfig.theme === 'light' ? (
                                <button
                                    className={`${
                                        themeConfig.theme === 'light' &&
                                        'flex items-center rounded-full bg-white-light/40 p-2 hover:bg-white-light/90 hover:text-primary dark:bg-dark/40 dark:hover:bg-dark/60'
                                    }`}
                                    onClick={() => dispatch(toggleTheme('dark'))}
                                >
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <use href="/assets/images/icons/icons.svg#lineDuotoneWeatherSun2" stroke="currentColor" />
                                    </svg>
                                </button>
                            ) : (
                                ''
                            )}
                            {themeConfig.theme === 'dark' && (
                                <button
                                    className={`${
                                        themeConfig.theme === 'dark' &&
                                        'flex items-center rounded-full bg-white-light/40 p-2 hover:bg-white-light/90 hover:text-primary dark:bg-dark/40 dark:hover:bg-dark/60'
                                    }`}
                                    onClick={() => dispatch(toggleTheme('light'))}
                                >
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <use href="/assets/images/icons/icons.svg#lineDuotoneWeatherMoon" fill="currentColor" />
                                    </svg>
                                </button>
                            )}
                        </div>
                        <div className="dropdown flex shrink-0">
                            <Dropdown
                                offset={[0, 8]}
                                placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`}
                                btnClassName="relative group block"
                                button={<img className="h-9 w-9 rounded-full object-cover saturate-50 group-hover:saturate-100" src="/assets/images/user-profile.jpeg" alt="userProfile" />}
                            >
                                <ul className="w-[230px] !py-0 font-semibold text-dark dark:text-white-dark dark:text-white-light/90">
                                    <li>
                                        <div className="flex px-4 py-4">
                                            <img className="h-10 w-10 rounded-md object-cover" src="/assets/images/user-profile.jpeg" alt="userProfile" />
                                            <div className="ltr:pl-4 rtl:pr-4">
                                                <h4 className="text-base">
                                                    {user?.fullName}
                                                    <span className="rounded bg-success-light px-1 text-xs text-success ltr:ml-2 rtl:ml-2">Pro</span>
                                                </h4>
                                                {user?.email ? (
                                                    <button type="button" className="text-black/60 hover:text-primary dark:text-dark-light/60 dark:hover:text-white">
                                                        {user?.email}
                                                    </button>
                                                ) : null}
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <Link href="/account-settings" className="dark:hover:text-white">
                                            <svg className="ltr:mr-2 rtl:ml-2" width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <use href="/assets/images/icons/icons.svg#lineDuotoneUsersUserRounded" stroke="currentColor" />
                                            </svg>
                                            Profile
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/auth/boxed-lockscreen" className="dark:hover:text-white">
                                            <svg className="ltr:mr-2 rtl:ml-2" width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <use href="/assets/images/icons/icons.svg#lineDuotoneSecurityLockPassword" />
                                            </svg>
                                            Lock Screen
                                        </Link>
                                    </li>
                                    <li className="border-t border-white-light dark:border-white-light/10">
                                        <Link href="#" onClick={signOut} className="!py-3 text-danger">
                                            <svg className="rotate-90 ltr:mr-2 rtl:ml-2" width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <use href="/assets/images/icons/icons.svg#lineDuotoneArrowsActionUpload" stroke="currentColor" />
                                            </svg>
                                            Sign Out
                                        </Link>
                                    </li>
                                </ul>
                            </Dropdown>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
