import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import { Fragment, useEffect, useRef, useState } from 'react';
import sortBy from 'lodash/sortBy';
import { Dialog, Transition } from '@headlessui/react';

const getRandomNumber = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

function toCamelCase(inputString: string): string {
    return inputString.replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase());
}

const AcademicTranscript = () => {
    const rowData = [
        {
            id: 1,
            firstName: 'Devlen',
            lastName: 'Garraway',
            gender: 'Male',
            phone: '730-100-1769',
            dob: '8/14/2007',
            score1: 5,
            score2: 2,
            final: null,
            avatar: 1,
        },
        {
            id: 2,
            firstName: 'Westley',
            lastName: 'Vanelli',
            gender: 'Male',
            phone: '874-814-2401',
            dob: '6/1/1993',
            score1: 7,
            score2: 7,
            final: null,
            avatar: 2,
        },
        {
            id: 3,
            firstName: 'Friederike',
            lastName: 'Rushbrook',
            gender: 'Agender',
            phone: '209-369-1848',
            dob: '5/18/2000',
            score1: 2,
            score2: 4,
            final: null,
            avatar: 3,
        },
        {
            id: 4,
            firstName: 'Myca',
            lastName: 'Privett',
            gender: 'Male',
            phone: '195-627-6076',
            dob: '4/6/2007',
            score1: 7,
            score2: 7,
            final: null,
            avatar: 4,
        },
        {
            id: 5,
            firstName: 'Skylar',
            lastName: 'Herrero',
            gender: 'Male',
            phone: '662-968-1334',
            dob: '9/20/1990',
            score1: 5,
            score2: 4,
            final: null,
            avatar: 5,
        },
        {
            id: 6,
            firstName: 'Mallory',
            lastName: 'Schapiro',
            gender: 'Female',
            phone: '230-269-2304',
            dob: '10/24/2003',
            score1: 6,
            score2: 5,
            final: null,
            avatar: 6,
        },
        {
            id: 7,
            firstName: 'Fidel',
            lastName: 'Heddon',
            gender: 'Male',
            phone: '744-896-3839',
            dob: '11/12/2004',
            score1: 9,
            score2: 6,
            final: null,
            avatar: 7,
        },
        {
            id: 8,
            firstName: 'Rosemarie',
            lastName: 'Isakowicz',
            gender: 'Female',
            phone: '996-116-9367',
            dob: '3/7/2004',
            score1: 7,
            score2: 1,
            final: null,
            avatar: 8,
        },
        {
            id: 9,
            firstName: 'Harwell',
            lastName: 'Segges',
            gender: 'Male',
            phone: '851-422-2505',
            dob: '1/15/2009',
            score1: 10,
            score2: 7,
            final: null,
            avatar: 9,
        },
        {
            id: 10,
            firstName: 'Lenee',
            lastName: 'Tythe',
            gender: 'Female',
            phone: '638-585-4538',
            dob: '5/15/1998',
            score1: 8,
            score2: 1,
            final: null,
            avatar: 10,
        },
        {
            id: 11,
            firstName: 'Krispin',
            lastName: 'Tait',
            gender: 'Male',
            phone: '983-191-7100',
            dob: '9/13/2006',
            score1: 1,
            score2: 9,
            final: null,
            avatar: 11,
        },
        {
            id: 12,
            firstName: 'Valeda',
            lastName: 'Aldrich',
            gender: 'Female',
            phone: '260-399-1521',
            dob: '9/29/2009',
            score1: 3,
            score2: 6,
            final: null,
            avatar: 12,
        },
        {
            id: 13,
            firstName: 'Fay',
            lastName: 'Carwithan',
            gender: 'Female',
            phone: '451-641-1246',
            dob: '7/20/2004',
            score1: 6,
            score2: 10,
            final: null,
            avatar: 13,
        },
        {
            id: 14,
            firstName: 'Ellerey',
            lastName: 'Haste',
            gender: 'Non-binary',
            phone: '100-290-8124',
            dob: '6/21/2008',
            score1: 1,
            score2: 10,
            final: null,
            avatar: 14,
        },
        {
            id: 15,
            firstName: 'Louise',
            lastName: 'Lapenna',
            gender: 'Agender',
            phone: '229-677-8046',
            dob: '5/19/2006',
            score1: 5,
            score2: 4,
            final: null,
            avatar: 15,
        },
        {
            id: 16,
            firstName: 'Frankie',
            lastName: 'Lecount',
            gender: 'Female',
            phone: '641-467-5957',
            dob: '9/10/1997',
            score1: 10,
            score2: 1,
            final: null,
            avatar: 16,
        },
        {
            id: 17,
            firstName: 'Innis',
            lastName: 'Dubery',
            gender: 'Male',
            phone: '770-967-1528',
            dob: '8/21/2004',
            score1: 9,
            score2: 2,
            final: null,
            avatar: 17,
        },
        {
            id: 18,
            firstName: 'Ulrica',
            lastName: 'Scouse',
            gender: 'Female',
            phone: '625-649-1826',
            dob: '11/1/2000',
            score1: 7,
            score2: 3,
            final: null,
            avatar: 18,
        },
        {
            id: 19,
            firstName: 'Renault',
            lastName: 'Jesty',
            gender: 'Male',
            phone: '935-394-8198',
            dob: '9/20/2000',
            score1: 6,
            score2: 6,
            final: null,
            avatar: 19,
        },
        {
            id: 20,
            firstName: 'Charity',
            lastName: 'Domb',
            gender: 'Female',
            phone: '158-490-4575',
            dob: '11/26/1996',
            score1: 2,
            score2: 4,
            final: null,
            avatar: 20,
        },
        {
            id: 21,
            firstName: 'Lock',
            lastName: 'Gargett',
            gender: 'Male',
            phone: '105-323-4208',
            dob: '3/11/2004',
            score1: 4,
            score2: 2,
            final: null,
            avatar: 21,
        },
        {
            id: 22,
            firstName: 'Lindsey',
            lastName: 'Rehme',
            gender: 'Male',
            phone: '805-651-0238',
            dob: '11/24/1995',
            score1: 4,
            score2: 7,
            final: null,
            avatar: 22,
        },
        {
            id: 23,
            firstName: 'Ellis',
            lastName: 'Mead',
            gender: 'Male',
            phone: '375-376-6515',
            dob: '3/31/1999',
            score1: 4,
            score2: 10,
            final: null,
            avatar: 23,
        },
        {
            id: 24,
            firstName: 'Isabella',
            lastName: 'Wilkisson',
            gender: 'Female',
            phone: '527-956-0549',
            dob: '10/20/1991',
            score1: 5,
            score2: 1,
            final: null,
            avatar: 24,
        },
        {
            id: 25,
            firstName: 'Kristine',
            lastName: 'Sanchiz',
            gender: 'Female',
            phone: '561-253-8045',
            dob: '9/12/1995',
            score1: 4,
            score2: 5,
            final: null,
            avatar: 25,
        },
    ];

    const [isAddEventModal, setIsAddEventModal] = useState(false);
    const [isEditScoreModal, setIsEditScoreModal] = useState(false);
    const [search, setSearch] = useState(false);
    const [page, setPage] = useState(1);
    const PAGE_SIZES = [10, 20, 30, 50, 100];
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [initialRecords, setInitialRecords] = useState(sortBy(rowData, 'id'));
    const [recordsData, setRecordsData] = useState(initialRecords);
    const [columns, setColumns] = useState<any>([
        {
            accessor: 'id',
            title: 'ID',
            sortable: true,
            // @ts-ignore
            render: ({ id }) => <strong className="text-info">#{id}</strong>,
        },
        {
            accessor: 'firstName',
            title: 'Student',
            sortable: true,
            // @ts-ignore
            render: ({ firstName, lastName, avatar }) => (
                <div className="flex items-center gap-2">
                    <img src={`/assets/images/profile-${avatar}.jpeg`} className="h-9 w-9 max-w-none rounded-full" alt="user-profile" />
                    <div className="font-semibold">{firstName + ' ' + lastName}</div>
                </div>
            ),
        },
        { accessor: 'dob', title: 'Birthday' },
        { accessor: 'gender', title: 'Gender' },
        { accessor: 'score1', title: 'S1' },
        { accessor: 'score2', title: 'S2' },
        { accessor: 'final', title: 'Final' },
    ]);

    const [scoreName, setScoreName] = useState<string>('');
    const [scoreNameError, setScoreNameError] = useState<string>('');
    const [score, setScore] = useState<string>('');
    const [scoreError, setScoreError] = useState<string>('');
    const [selectedCell, setSelectedCell] = useState<any>({});
    const [isEditScore, setIsEditScore] = useState<boolean>(false);

    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
        columnAccessor: 'id',
        direction: 'asc',
    });

    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        setIsMounted(true);
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
        const data = sortBy(initialRecords, sortStatus.columnAccessor);
        setInitialRecords(sortStatus.direction === 'desc' ? data.reverse() : data);
        setPage(1);
    }, [sortStatus]);

    // Score Name
    const changeScoreName = (e: any) => {
        const { value } = e.target;
        setScoreName(value);
        if (value && scoreNameError) {
            setScoreNameError('');
        }
    };

    const saveScoreNameEvent = () => {
        if (!scoreName) {
            setScoreNameError('Please input a score name');
        } else {
            const newColumn = { accessor: toCamelCase(scoreName), title: scoreName };
            const newColumns = [...columns, newColumn];
            setColumns(newColumns);
            setIsAddEventModal(false);
        }
    };

    const handleScoreNameBlur = () => {
        if (scoreName) {
            setScoreNameError('');
        } else {
            setScoreNameError('Please input a score name');
        }
    };

    const onScoreNameClose = () => {
        setIsAddEventModal(false);
        setScoreName('');
        setScoreNameError('');
    };

    // Score
    const onCellClick = (record: any) => {
        if (record.columnIndex <= 3 || !record) {
            return;
        }
        setSelectedCell(record);
        setIsEditScoreModal(true);
        setScore(record.record[record.column.accessor]);
    };

    const changeScore = (e: any) => {
        const { value } = e.target;
        setScore(value);
        if (value && scoreError) {
            setScoreError('');
        }
    };

    const saveScoreEvent = () => {
        if (!score) {
            setScoreError('Please input a score name');
        } else {
            if (Number(score) !== selectedCell.record[selectedCell.column.accessor]) {
                const newRecordsData = [...recordsData];
                // @ts-ignore
                newRecordsData[selectedCell.recordIndex][selectedCell.column.accessor] = score;
                setRecordsData(newRecordsData);
                setIsEditScore(true);
            }
            setIsEditScoreModal(false);
        }
    };

    const handleScoreBlur = () => {
        if (score) {
            setScoreError('');
        } else {
            setScoreError('Please input a score');
        }
    };

    const onScoreClose = () => {
        setIsEditScoreModal(false);
        setScore('');
        setScoreError('');
    };

    const onScoreKeyDown = (e: any) => {
        if (e.key === 'Enter') {
            saveScoreEvent();
        }
    };

    return (
        <div className="panel mt-7">
            <div className="mb-5 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                <h5 className="text-lg font-semibold dark:text-white-light">Academic transcript</h5>
                <div className="flex items-center">
                    {isEditScore ? (
                        <button type="button" className="btn btn-success btn-sm ml-2">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <use href="/assets/images/icons/icons.svg#lineDuotoneElectronicDevicesSDCard" stroke="currentColor" />
                            </svg>

                            <span className="pl-2">Save</span>
                        </button>
                    ) : null}
                    <button
                        type="button"
                        className="btn btn-primary btn-sm ml-2"
                        onClick={() => {
                            setIsAddEventModal(true);
                            setScoreName('');
                        }}
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <use href="/assets/images/icons/icons.svg#lineDuotoneEssentionalUIAddSquare" stroke="currentColor" />
                        </svg>
                        <span className="pl-2">Add more score column</span>
                    </button>
                </div>
            </div>
            <form
                className={`${search && '!block'} absolute inset-x-0 top-1/2 z-10 mx-4 hidden -translate-y-1/2 sm:relative sm:top-0 sm:mx-0 sm:block sm:translate-y-0`}
                onSubmit={() => setSearch(false)}
            >
                <div className="relative mb-5 max-w-lg">
                    <input
                        type="text"
                        className="peer form-input bg-gray-100 placeholder:tracking-widest ltr:pl-9 ltr:pr-9 rtl:pl-9 rtl:pr-9 sm:bg-transparent ltr:sm:pr-4 rtl:sm:pl-4"
                        placeholder="Search by #Student Name, #ID"
                    />
                    <button type="button" className="absolute inset-0 h-9 w-9 appearance-none peer-focus:text-primary ltr:right-auto rtl:left-auto">
                        <svg className="mx-auto" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <use href="/assets/images/icons/icons.svg#lineDuotoneSearchMagnifer" stroke="currentColor" />
                        </svg>
                    </button>
                </div>
            </form>

            <div className="datatables">
                {isMounted && (
                    <DataTable
                        noRecordsText="No results match your search query"
                        highlightOnHover
                        className="table-hover whitespace-nowrap"
                        records={recordsData}
                        columns={columns}
                        totalRecords={initialRecords.length}
                        recordsPerPage={pageSize}
                        page={page}
                        onPageChange={(p) => setPage(p)}
                        recordsPerPageOptions={PAGE_SIZES}
                        onRecordsPerPageChange={setPageSize}
                        sortStatus={sortStatus}
                        onSortStatusChange={setSortStatus}
                        minHeight={200}
                        paginationText={({ from, to, totalRecords }) => `Showing  ${from} to ${to} of ${totalRecords} entries`}
                        onCellClick={(record) => onCellClick(record)}
                    />
                )}
            </div>

            {/* add score column modal */}
            <Transition appear show={isAddEventModal} as={Fragment}>
                <Dialog as="div" onClose={onScoreNameClose} open={isAddEventModal} className="relative z-50">
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
                                        onClick={onScoreNameClose}
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
                                    <div className="bg-[#fbfbfb] py-3 text-lg font-medium ltr:pl-5 ltr:pr-[50px] rtl:pl-[50px] rtl:pr-5 dark:bg-[#121c2c]">Add more score column</div>
                                    <div className="p-5">
                                        <div className="space-y-5">
                                            <div className={scoreNameError ? 'has-error' : ''}>
                                                <label htmlFor="title">Score name</label>
                                                <input
                                                    id="title"
                                                    type="text"
                                                    name="title"
                                                    className="form-input"
                                                    placeholder="Enter Score Name"
                                                    value={scoreName || ''}
                                                    onChange={(e) => changeScoreName(e)}
                                                    required
                                                    onBlur={handleScoreNameBlur}
                                                />
                                                {scoreNameError ? <div className="mt-1 text-danger">{scoreNameError}</div> : ''}
                                            </div>

                                            <div className="!mt-8 flex items-center justify-end">
                                                <button type="button" className="btn btn-outline-danger" onClick={onScoreNameClose}>
                                                    Cancel
                                                </button>
                                                <button type="button" onClick={saveScoreNameEvent} className="btn btn-primary ltr:ml-4 rtl:mr-4">
                                                    Create Score Column
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>

            {/* edit score modal */}
            <Transition appear show={isEditScoreModal} as={Fragment}>
                <Dialog as="div" onClose={onScoreClose} open={isEditScoreModal} className="relative z-50">
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
                                        onClick={onScoreClose}
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
                                        Edit Score {selectedCell?.columnIndex ? `${selectedCell.column.title} - ${selectedCell.record.firstName} ${selectedCell.record.lastName}` : ''}
                                    </div>
                                    <div className="p-5">
                                        <div className="space-y-5">
                                            <div className={scoreError ? 'has-error' : ''}>
                                                <label htmlFor="title">Enter Score</label>
                                                <input
                                                    id="title"
                                                    type="text"
                                                    name="title"
                                                    className="form-input"
                                                    placeholder="Enter Score"
                                                    value={score || ''}
                                                    onChange={(e) => changeScore(e)}
                                                    required
                                                    onBlur={handleScoreBlur}
                                                    onKeyDown={(e) => onScoreKeyDown(e)}
                                                />
                                                {scoreError ? <div className="mt-1 text-danger">{scoreError}</div> : ''}
                                            </div>

                                            <div className="!mt-8 flex items-center justify-end">
                                                <button type="button" className="btn btn-outline-danger" onClick={onScoreClose}>
                                                    Cancel
                                                </button>
                                                <button type="button" onClick={saveScoreEvent} className="btn btn-primary ltr:ml-4 rtl:mr-4">
                                                    Create Score Column
                                                </button>
                                            </div>
                                        </div>
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

export default AcademicTranscript;
