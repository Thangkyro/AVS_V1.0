import Link from 'next/link';
import { useEffect, useState } from 'react';
import { setPageTitle } from '../store/themeConfigSlice';
import { useDispatch } from 'react-redux';

const AccountSetting = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Account Setting'));
    });
    const [tabs, setTabs] = useState<string>('home');
    const toggleTabs = (name: string) => {
        setTabs(name);
    };

    return (
        <div>
            <ul className="flex space-x-2 rtl:space-x-reverse">
                <li className="">
                    <span>Account Settings</span>
                </li>
            </ul>
            <form className="my-5 rounded-md border border-[#ebedf2] bg-white p-4 dark:border-[#191e3a] dark:bg-black">
                <h6 className="mb-5 text-lg font-bold">General Information</h6>
                <div className="flex flex-col sm:flex-row">
                    <div className="mb-5 w-full sm:w-2/12 ltr:sm:mr-4 rtl:sm:ml-4">
                        <img src="/assets//images/profile-34.jpeg" alt="img" className="mx-auto h-20 w-20 rounded-full object-cover md:h-32 md:w-32" />
                    </div>
                    <div className="grid flex-1 grid-cols-1 gap-5 sm:grid-cols-2">
                        <div>
                            <label htmlFor="name">Full Name</label>
                            <input id="name" type="text" placeholder="Jimmy Turner" className="form-input" />
                        </div>
                        <div>
                            <label htmlFor="profession">Profession</label>
                            <input id="profession" type="text" placeholder="Web Developer" className="form-input" />
                        </div>
                        <div>
                            <label htmlFor="country">Country</label>
                            <select id="country" className="form-select text-white-dark" name="country" defaultValue="United States">
                                <option value="All Countries">All Countries</option>
                                <option value="United States">United States</option>
                                <option value="India">India</option>
                                <option value="Japan">Japan</option>
                                <option value="China">China</option>
                                <option value="Brazil">Brazil</option>
                                <option value="Norway">Norway</option>
                                <option value="Canada">Canada</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="address">Address</label>
                            <input id="address" type="text" placeholder="New York" className="form-input" />
                        </div>
                        <div>
                            <label htmlFor="location">Location</label>
                            <input id="location" type="text" placeholder="Location" className="form-input" />
                        </div>
                        <div>
                            <label htmlFor="phone">Phone</label>
                            <input id="phone" type="text" placeholder="+1 (530) 555-12121" className="form-input" />
                        </div>
                        <div>
                            <label htmlFor="email">Email</label>
                            <input id="email" type="email" placeholder="Jimmy@gmail.com" className="form-input" />
                        </div>
                        <div>
                            <label htmlFor="web">Website</label>
                            <input id="web" type="text" placeholder="Enter URL" className="form-input" />
                        </div>
                        <div>
                            <label className="inline-flex cursor-pointer">
                                <input type="checkbox" className="form-checkbox" />
                                <span className="relative text-white-dark checked:bg-none">Make this my default address</span>
                            </label>
                        </div>
                        <div className="mt-3 sm:col-span-2">
                            <button type="button" className="btn btn-primary">
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default AccountSetting;
