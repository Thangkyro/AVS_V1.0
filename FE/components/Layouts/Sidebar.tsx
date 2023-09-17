import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { toggleSidebar } from '../../store/themeConfigSlice';
import { IRootState } from '../../store';

const Sidebar = () => {
    const router = useRouter();
    const [currentMenu, setCurrentMenu] = useState<string>('');
    const themeConfig = useSelector((state: IRootState) => state.themeConfig);
    const semidark = useSelector((state: IRootState) => state.themeConfig.semidark);
    const toggleMenu = (value: string) => {
        setCurrentMenu((oldValue) => {
            return oldValue === value ? '' : value;
        });
    };

    useEffect(() => {
        const selector = document.querySelector('.sidebar ul a[href="' + window.location.pathname + '"]');
        if (selector) {
            selector.classList.add('active');
            const ul: any = selector.closest('ul.sub-menu');
            if (ul) {
                let ele: any = ul.closest('li.menu').querySelectorAll('.nav-link') || [];
                if (ele.length) {
                    ele = ele[0];
                    setTimeout(() => {
                        ele.click();
                    });
                }
            }
        }
    }, []);

    useEffect(() => {
        setActiveRoute();
        if (window.innerWidth < 1024 && themeConfig.sidebar) {
            dispatch(toggleSidebar());
        }
    }, [router.pathname]);

    const setActiveRoute = () => {
        let allLinks = document.querySelectorAll('.sidebar ul a.active');
        for (let i = 0; i < allLinks.length; i++) {
            const element = allLinks[i];
            element?.classList.remove('active');
        }
        const selector = document.querySelector('.sidebar ul a[href="' + window.location.pathname + '"]');
        selector?.classList.add('active');
    };

    const dispatch = useDispatch();
    const { t } = useTranslation();

    return (
        <div className={semidark ? 'dark' : ''}>
            <nav
                className={`sidebar fixed bottom-0 top-0 z-50 h-full min-h-screen w-[260px] shadow-[5px_0_25px_0_rgba(94,92,154,0.1)] transition-all duration-300 ${semidark ? 'text-white-dark' : ''}`}
            >
                <div className="h-full bg-white dark:bg-black">
                    <div className="flex items-center justify-between px-4 py-3">
                        <Link href="/" className="main-logo flex shrink-0 items-center">
                            <img className="ml-[5px] w-8 flex-none" src="/assets/images/logo.svg" alt="logo" />
                            <span className="align-middle text-2xl font-semibold ltr:ml-1.5 rtl:mr-1.5 dark:text-white-light lg:inline">{t('VRISTO')}</span>
                        </Link>

                        <button
                            type="button"
                            className="collapse-icon flex h-8 w-8 items-center rounded-full transition duration-300 hover:bg-gray-500/10 rtl:rotate-180 dark:text-white-light dark:hover:bg-dark-light/10"
                            onClick={() => dispatch(toggleSidebar())}
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="m-auto h-5 w-5">
                                <use href="/assets/images/icons/icons.svg#lineDuotoneArrowsDoubleAltArrowLeft" stroke="currentColor" />
                            </svg>
                        </button>
                    </div>
                    <PerfectScrollbar className="relative h-[calc(100vh-80px)]">
                        <ul className="relative space-y-0.5 p-4 py-0 font-semibold">
                            <li className="menu nav-item">
                                <Link href="/" className={`${currentMenu === 'dashboard' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('dashboard')}>
                                    <div className="flex items-center">
                                        <svg className="group-hover:!text-primary" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <use href="/assets/images/icons/icons.svg#boldDuotoneEssentionalUIHome" fill="currentColor" />
                                        </svg>
                                        <span className="text-black ltr:pl-3 rtl:pr-3 dark:text-[#506690] dark:group-hover:text-white-dark">{t('dashboard')}</span>
                                    </div>
                                </Link>

                                <Link href="/schedule" className="group">
                                    <div className="flex items-center">
                                        <svg className="group-hover:!text-primary" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <use href="/assets/images/icons/icons.svg#boldDuotoneTimeCalendarMinimalistic" fill="currentColor" />
                                        </svg>
                                        <span className="text-black ltr:pl-3 rtl:pr-3 dark:text-[#506690] dark:group-hover:text-white-dark">{t('schedule')}</span>
                                    </div>
                                </Link>
                            </li>

                            <h2 className="-mx-4 mb-1 flex items-center bg-white-light/30 px-7 py-3 font-extrabold uppercase dark:bg-dark dark:bg-opacity-[0.08]">
                                <svg className="hidden h-5 w-4 flex-none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="5" y1="12" x2="19" y2="12"></line>
                                </svg>
                                <span>{t('manages')}</span>
                            </h2>

                            <li className="nav-item">
                                <ul>
                                    <li className="nav-item">
                                        <Link href="/class" className={`${router.pathname === '/class/add' ? 'active' : ''} group`}>
                                            <div className="flex items-center">
                                                <svg className="group-hover:!text-primary" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <use href="/assets/images/icons/icons.svg#boldDuotoneSchoolSquareAcademicCap" fill="currentColor" />
                                                </svg>
                                                <span className="text-black ltr:pl-3 rtl:pr-3 dark:text-[#506690] dark:group-hover:text-white-dark">{t('class')}</span>
                                            </div>
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link href="/lessons" className="group">
                                            <div className="flex items-center">
                                                <svg className="group-hover:!text-primary" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <use href="/assets/images/icons/icons.svg#boldDuotoneSchoolBook2" fill="currentColor" />
                                                </svg>
                                                <span className="text-black ltr:pl-3 rtl:pr-3 dark:text-[#506690] dark:group-hover:text-white-dark">{t('file_lesson')}</span>
                                            </div>
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link href="/students" className="group">
                                            <div className="flex items-center">
                                                <svg className="group-hover:!text-primary" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <use href="/assets/images/icons/icons.svg#boldDuotoneUsersUserGroupTwoRounded" fill="currentColor" />
                                                </svg>
                                                <span className="text-black ltr:pl-3 rtl:pr-3 dark:text-[#506690] dark:group-hover:text-white-dark">{t('student')}</span>
                                            </div>
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link href="/roles" className="group">
                                            <div className="flex items-center">
                                                <svg className="group-hover:!text-primary" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <use href="/assets/images/icons/icons.svg#boldDuotoneSettingsFineTuningSettings" fill="currentColor" />
                                                </svg>
                                                <span className="text-black ltr:pl-3 rtl:pr-3 dark:text-[#506690] dark:group-hover:text-white-dark">Role</span>
                                            </div>
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </PerfectScrollbar>
                </div>
            </nav>
        </div>
    );
};

export default Sidebar;
