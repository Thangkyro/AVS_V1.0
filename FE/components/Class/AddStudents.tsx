import { useEffect, useState, Fragment } from 'react';
import { sortBy } from 'lodash';
import { DataTable } from 'mantine-datatable';
import { Dialog, Transition } from '@headlessui/react';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { getRandomNumber } from '@/constants/mics';

const rowData = [
    {
        id: 5,
        firstName: 'Melisandra',
        lastName: 'Cotmore',
        parent: 'Melisandra Cotmore',
        email: 'mcotmore4@bbc.co.uk',
        gender: 'Female',
        phone: '260-762-5860',
        dob: '09/05/1999',
        address: '80922 Valley Edge Circle',
        avatar: getRandomNumber(1, 34),
    },
    {
        id: 6,
        firstName: 'Leanor',
        lastName: 'McAlroy',
        parent: 'Leanor McAlroy',
        email: 'lmcalroy5@mapquest.com',
        gender: 'Female',
        phone: '505-196-9566',
        dob: '03/24/2008',
        address: '08094 Columbus Alley',
        avatar: getRandomNumber(1, 34),
    },
];

const AddStudents = (props: { isVisible: boolean; setVisible: React.Dispatch<React.SetStateAction<boolean>>; onAddStudent: (student: any) => void }) => {
    const { isVisible, setVisible, onAddStudent } = props;
    const [isMounted, setIsMounted] = useState(false);
    const [initialRecords, setInitialRecords] = useState(sortBy(rowData, 'id'));
    const [recordsData, setRecordsData] = useState<any>([]);
    const [isFetching, setFetching] = useState<boolean>(false);

    useEffect(() => {
        setIsMounted(true);
    });

    const onSearchStudentChange = (event: React.FormEvent<HTMLInputElement>) => {
        setRecordsData(initialRecords);
    };

    const onAddStudentClick = (student: any) => {
        const filteredData = recordsData.filter((item: any) => student.id !== item.id);
        setRecordsData(filteredData);
        onAddStudent(student);
    };

    return (
        <Transition appear show={isVisible} as={Fragment}>
            <Dialog as="div" open={isVisible} onClose={() => setVisible(false)}>
                <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
                    <div className="fixed inset-0" />
                </Transition.Child>
                <div className="fixed inset-0 z-[999] overflow-y-auto bg-[black]/60">
                    <div className="flex min-h-screen items-center justify-center px-4">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel as="div" className="panel my-8 w-full max-w-7xl overflow-hidden rounded-lg border-0 p-0 text-black dark:text-white-dark">
                                <div className="flex items-center justify-between bg-[#fbfbfb] px-5 py-3 dark:bg-[#121c2c]">
                                    <h5 className="text-lg font-bold">Add Student</h5>
                                    <button type="button" className="text-white-dark hover:text-dark" onClick={() => setVisible(false)}>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="20"
                                            height="20"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <use href="/assets/images/icons/icons.svg#lineDuotoneEssentionalUIClose" stroke="currentColor" />
                                        </svg>
                                    </button>
                                </div>
                                <div className="p-5">
                                    <div className="relative flex w-full  border border-white-dark/20">
                                        <button type="submit" placeholder="Let's find your question in fast way" className="m-auto flex items-center justify-center p-3 text-primary">
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <use href="/assets/images/icons/icons.svg#lineDuotoneSearchMagnifer" stroke="currentColor" />
                                            </svg>
                                        </button>
                                        <input
                                            type="text"
                                            placeholder="Let's find your student in fast way"
                                            className="form-input rounded-none border-0 border-l bg-white  py-3 placeholder:tracking-wider focus:shadow-[0_0_5px_2px_rgb(194_213_255_/_62%)] focus:outline-none dark:shadow-[#1b2e4b]"
                                            onChange={onSearchStudentChange}
                                        />
                                    </div>
                                    <div className="datatables mt-4">
                                        {isMounted && (
                                            <DataTable
                                                noRecordsText="No results match your search query"
                                                highlightOnHover
                                                className="table-hover whitespace-nowrap"
                                                records={recordsData}
                                                columns={[
                                                    {
                                                        accessor: 'id',
                                                        title: 'ID',
                                                        // @ts-ignore
                                                        render: ({ id }) => <strong className="text-info">#{id}</strong>,
                                                    },
                                                    {
                                                        accessor: 'firstName',
                                                        title: 'Student name',
                                                        // @ts-ignore
                                                        render: ({ firstName, lastName, avatar }) => (
                                                            <div className="flex items-center gap-2">
                                                                <img src={`/assets/images/profile-${avatar}.jpeg`} className="h-9 w-9 max-w-none rounded-full" alt="user-profile" />
                                                                <div className="font-semibold">{firstName + ' ' + lastName}</div>
                                                            </div>
                                                        ),
                                                    },
                                                    {
                                                        accessor: 'gender',
                                                        title: 'Gender',
                                                    },
                                                    {
                                                        accessor: 'parent',
                                                        title: 'Parent',
                                                    },
                                                    {
                                                        accessor: 'address',
                                                        title: 'Address',
                                                    },
                                                    {
                                                        accessor: 'dob',
                                                        title: 'Date Of Birth',
                                                    },
                                                    {
                                                        accessor: 'email',
                                                        title: 'Email',
                                                        // @ts-ignore
                                                        render: ({ email }) => (
                                                            <a href={`mailto:${email}`} className="text-primary hover:underline">
                                                                {email}
                                                            </a>
                                                        ),
                                                    },
                                                    { accessor: 'phone', title: 'Phone' },
                                                    {
                                                        accessor: 'action',
                                                        title: '',
                                                        titleClassName: '!text-center',
                                                        render: (record) => (
                                                            <div className="mx-auto flex w-max items-center">
                                                                <Tippy content="Add">
                                                                    <button type="button" className="hover:text-primary" onClick={() => onAddStudentClick(record)}>
                                                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                            <use href="/assets/images/icons/icons.svg#lineDuotoneEssentionalUIAddSquare" stroke="currentColor" />
                                                                        </svg>
                                                                    </button>
                                                                </Tippy>
                                                            </div>
                                                        ),
                                                    },
                                                ]}
                                                minHeight={200}
                                                fetching={isFetching}
                                            />
                                        )}
                                    </div>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};

export default AddStudents;
