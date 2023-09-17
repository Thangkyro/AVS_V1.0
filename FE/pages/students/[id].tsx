import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import { Fragment, useEffect, useState } from 'react';
import sortBy from 'lodash/sortBy';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { Dialog, Transition } from '@headlessui/react';

import { setPageTitle } from '../../store/themeConfigSlice';

const rowData = [
    {
        id: 1,
        lesson: 1,
        score_1: 8,
        score_2: 5,
        score_3: 6,
        score_4: 8,
    },
    {
        id: 2,
        lesson: 2,
        score_1: 9,
        score_2: 8,
        score_3: 5,
        score_4: 8,
    },
];
const defaultParams = {
    id: null,
    lesson: '',
    scoreName: '',
    score: '',
};
const Custom = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    useEffect(() => {
        dispatch(setPageTitle(`Student #${router.query.id}}`));
    }, [router]);
    const [page, setPage] = useState(1);
    const PAGE_SIZES = [10, 20, 30, 50, 100];
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [initialRecords, setInitialRecords] = useState(sortBy(rowData, 'id'));
    const [recordsData, setRecordsData] = useState(initialRecords);
    const [isAddEventModal, setIsAddEventModal] = useState(false);
    const [params, setParams] = useState<any>(defaultParams);

    const [selectedRecords, setSelectedRecords] = useState<any>([]);

    const [search, setSearch] = useState('');
    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
        columnAccessor: 'student',
        direction: 'asc',
    });

    useEffect(() => {
        setPage(1);
    }, [pageSize]);

    useEffect(() => {
        const from = (page - 1) * pageSize;
        const to = from + pageSize;
        setRecordsData([...initialRecords.slice(from, to)]);
    }, [page, pageSize, initialRecords]);

    useEffect(() => {
        setInitialRecords(() => {
            return rowData.filter((item) => {
                return (
                    item.lesson.toString().includes(search.toLowerCase()) ||
                    item.score_1.toString().toLowerCase().includes(search.toLowerCase()) ||
                    item.score_2.toString().toLowerCase().includes(search.toLowerCase()) ||
                    item.score_3.toString().toLowerCase().includes(search.toLowerCase()) ||
                    item.score_4.toString().toLowerCase().includes(search.toLowerCase())
                );
            });
        });
    }, [search]);

    useEffect(() => {
        const data = sortBy(initialRecords, sortStatus.columnAccessor);
        setInitialRecords(sortStatus.direction === 'desc' ? data.reverse() : data);
    }, [sortStatus]);

    const changeValue = (e: any) => {
        const { value, id } = e.target;
        setParams({ ...params, [id]: value });
    };

    const onCellClick = (record: any) => {
        if (record.columnIndex === 0) return;
        setParams({
            id: record.id,
            lesson: record.record.lesson,
            scoreName: record.column.accessor,
            score: record.record[record.column.accessor],
        });
        setIsAddEventModal(true);
    };

    return (
        <div>
            <div className="mb-5 grid grid-cols-1 gap-5 lg:grid-cols-3 xl:grid-cols-4">
                <div className="panel">
                    <div className="mb-5">
                        <div className="flex flex-col items-center justify-center">
                            <img src="/assets/images/profile-34.jpeg" alt="img" className="mb-5 h-24 w-24 rounded-full  object-cover" />
                            <p className="text-xl font-semibold text-primary">Jimmy Turner</p>
                        </div>
                        <ul className="m-auto mt-5 flex max-w-[160px] flex-col space-y-4 font-semibold text-white-dark">
                            <li className="flex items-center gap-2">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5">
                                    <use href="/assets/images/icons/icons.svg#lineDuotoneTimeCalendarMinimalistic" stroke="currentColor" />
                                </svg>
                                Jan 20, 1989
                            </li>
                            <li className="flex items-center gap-2">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5">
                                    <use href="/assets/images/icons/icons.svg#lineDuotoneMapLocationMapPointWave" stroke="currentColor" />
                                </svg>
                                New York, USA
                            </li>
                            <li>
                                <button className="flex items-center gap-2">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <use href="/assets/images/icons/icons.svg#lineDuotoneMessagesConversationLetter" stroke="currentColor" />
                                    </svg>
                                    <span className="text-primary">Jimmy@gmail.com</span>
                                </button>
                            </li>
                            <li className="flex items-center gap-2">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <use href="/assets/images/icons/icons.svg#lineDuotoneCallPhoneRounded" stroke="currentColor" />
                                </svg>
                                <span className="whitespace-nowrap" dir="ltr">
                                    +1 (530) 555-12121
                                </span>
                            </li>
                        </ul>
                        <ul className="mt-7 flex items-center justify-center gap-2">
                            <li>
                                <button className="btn btn-info flex h-10 w-10 items-center justify-center rounded-full p-0">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24px"
                                        height="24px"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="h-5 w-5"
                                    >
                                        <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                                    </svg>
                                </button>
                            </li>
                            <li>
                                <button className="btn btn-danger flex h-10 w-10 items-center justify-center rounded-full p-0">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5">
                                        <path
                                            d="M3.33946 16.9997C6.10089 21.7826 12.2168 23.4214 16.9997 20.66C18.9493 19.5344 20.3765 17.8514 21.1962 15.9286C22.3875 13.1341 22.2958 9.83304 20.66 6.99972C19.0242 4.1664 16.2112 2.43642 13.1955 2.07088C11.1204 1.81935 8.94932 2.21386 6.99972 3.33946C2.21679 6.10089 0.578039 12.2168 3.33946 16.9997Z"
                                            stroke="currentColor"
                                            strokeWidth="1.5"
                                        />
                                        <path
                                            opacity="0.5"
                                            d="M16.9497 20.5732C16.9497 20.5732 16.0107 13.9821 14.0004 10.5001C11.99 7.01803 7.05018 3.42681 7.05018 3.42681M7.57711 20.8175C9.05874 16.3477 16.4525 11.3931 21.8635 12.5801M16.4139 3.20898C14.926 7.63004 7.67424 12.5123 2.28857 11.4516"
                                            stroke="currentColor"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                        />
                                    </svg>
                                </button>
                            </li>
                            <li>
                                <button className="btn btn-dark flex h-10 w-10 items-center justify-center rounded-full p-0">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24px"
                                        height="24px"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="h-5 w-5"
                                    >
                                        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                                    </svg>
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="panel lg:col-span-2 xl:col-span-3">
                    <div className="mb-5">
                        <h5 className="text-lg font-semibold dark:text-white-light">Task</h5>
                    </div>
                    <div className="mb-5">
                        <div className="table-responsive font-semibold text-[#515365] dark:text-white-light">
                            <table className="whitespace-nowrap">
                                <thead>
                                    <tr>
                                        <th>Projects</th>
                                        <th>Progress</th>
                                        <th>Task Done</th>
                                        <th className="text-center">Time</th>
                                    </tr>
                                </thead>
                                <tbody className="dark:text-white-dark">
                                    <tr>
                                        <td>Figma Design</td>
                                        <td>
                                            <div className="flex h-1.5 w-full rounded-full bg-[#ebedf2] dark:bg-dark/40">
                                                <div className="w-[29.56%] rounded-full bg-danger"></div>
                                            </div>
                                        </td>
                                        <td className="text-danger">29.56%</td>
                                        <td className="text-center">2 mins ago</td>
                                    </tr>
                                    <tr>
                                        <td>Vue Migration</td>
                                        <td>
                                            <div className="flex h-1.5 w-full rounded-full bg-[#ebedf2] dark:bg-dark/40">
                                                <div className="w-1/2 rounded-full bg-info"></div>
                                            </div>
                                        </td>
                                        <td className="text-success">50%</td>
                                        <td className="text-center">4 hrs ago</td>
                                    </tr>
                                    <tr>
                                        <td>Flutter App</td>
                                        <td>
                                            <div className="flex h-1.5 w-full rounded-full bg-[#ebedf2] dark:bg-dark/40">
                                                <div className="w-[39%] rounded-full  bg-warning"></div>
                                            </div>
                                        </td>
                                        <td className="text-danger">39%</td>
                                        <td className="text-center">a min ago</td>
                                    </tr>
                                    <tr>
                                        <td>API Integration</td>
                                        <td>
                                            <div className="flex h-1.5 w-full rounded-full bg-[#ebedf2] dark:bg-dark/40">
                                                <div className="w-[78.03%] rounded-full  bg-success"></div>
                                            </div>
                                        </td>
                                        <td className="text-success">78.03%</td>
                                        <td className="text-center">2 weeks ago</td>
                                    </tr>

                                    <tr>
                                        <td>Blog Update</td>
                                        <td>
                                            <div className="flex h-1.5 w-full rounded-full bg-[#ebedf2] dark:bg-dark/40">
                                                <div className="w-full  rounded-full  bg-secondary"></div>
                                            </div>
                                        </td>
                                        <td className="text-success">100%</td>
                                        <td className="text-center">18 hrs ago</td>
                                    </tr>
                                    <tr>
                                        <td>Landing Page</td>
                                        <td>
                                            <div className="flex h-1.5 w-full rounded-full bg-[#ebedf2] dark:bg-dark/40">
                                                <div className="w-[19.15%] rounded-full  bg-danger"></div>
                                            </div>
                                        </td>
                                        <td className="text-danger">19.15%</td>
                                        <td className="text-center">5 days ago</td>
                                    </tr>
                                    <tr>
                                        <td>Shopify Dev</td>
                                        <td>
                                            <div className="flex h-1.5 w-full rounded-full bg-[#ebedf2] dark:bg-dark/40">
                                                <div className="w-[60.55%] rounded-full bg-primary"></div>
                                            </div>
                                        </td>
                                        <td className="text-success">60.55%</td>
                                        <td className="text-center">8 days ago</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div className="panel">
                <div className="mb-5 flex flex-col gap-5 md:flex-row md:items-center">
                    <h5 className="text-lg font-semibold dark:text-white-light">Score</h5>
                </div>
                <div className="datatables">
                    <DataTable
                        className="table-hover whitespace-nowrap"
                        records={recordsData}
                        columns={[
                            { accessor: 'lesson', sortable: false },
                            { accessor: 'score_1', sortable: false },
                            { accessor: 'score_2', sortable: false },
                            { accessor: 'score_3', sortable: false },
                            { accessor: 'score_4', sortable: false },
                        ]}
                        highlightOnHover
                        totalRecords={initialRecords.length}
                        recordsPerPage={pageSize}
                        page={page}
                        onPageChange={(p) => setPage(p)}
                        recordsPerPageOptions={PAGE_SIZES}
                        onRecordsPerPageChange={setPageSize}
                        minHeight={200}
                        paginationText={({ from, to, totalRecords }) => `Showing  ${from} to ${to} of ${totalRecords} entries`}
                        onCellClick={(record) => onCellClick(record)}
                    />
                </div>
            </div>
            {/* add event modal */}
            <Transition appear show={isAddEventModal} as={Fragment}>
                <Dialog as="div" onClose={() => setIsAddEventModal(false)} open={isAddEventModal} className="relative z-50">
                    <Transition.Child
                        as={Fragment}
                        enter="duration-300 ease-out"
                        enter-from="opacity-0"
                        enter-to="opacity-100"
                        leave="duration-200 ease-in"
                        leave-from="opacity-100"
                        leave-to="opacity-0"
                    >
                        <Dialog.Overlay className="fixed inset-0 bg-[black]/60" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center px-4 py-8">
                            <Transition.Child
                                as={Fragment}
                                enter="duration-300 ease-out"
                                enter-from="opacity-0 scale-95"
                                enter-to="opacity-100 scale-100"
                                leave="duration-200 ease-in"
                                leave-from="opacity-100 scale-100"
                                leave-to="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="panel w-full max-w-lg overflow-hidden rounded-lg border-0 p-0 text-black dark:text-white-dark">
                                    <button
                                        type="button"
                                        className="absolute top-4 text-gray-400 outline-none hover:text-gray-800 ltr:right-4 rtl:left-4 dark:hover:text-gray-600"
                                        onClick={() => setIsAddEventModal(false)}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
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
                                    <div className="bg-[#fbfbfb] py-3 text-lg font-medium ltr:pl-5 ltr:pr-[50px] rtl:pl-[50px] rtl:pr-5 dark:bg-[#121c2c]">
                                        Edit {params.scoreName} - Lesson {params.lesson}
                                    </div>
                                    <div className="p-5">
                                        <form className="space-y-5">
                                            <div>
                                                <label htmlFor="title">Event Title :</label>
                                                <input
                                                    id="title"
                                                    type="text"
                                                    name="title"
                                                    className="form-input"
                                                    placeholder="Enter Score"
                                                    value={params.score || ''}
                                                    onChange={(e) => changeValue(e)}
                                                    required
                                                />
                                                <div className="mt-2 text-danger" id="titleErr"></div>
                                            </div>

                                            <div className="!mt-8 flex items-center justify-end">
                                                <button type="button" className="btn btn-outline-danger" onClick={() => setIsAddEventModal(false)}>
                                                    Cancel
                                                </button>
                                                <button type="button" onClick={() => console.log('nothing')} className="btn btn-primary ltr:ml-4 rtl:mr-4">
                                                    Update Score
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </div>
    );
};

export default Custom;
