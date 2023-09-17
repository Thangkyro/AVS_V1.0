import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import { useEffect, useState } from 'react';
import sortBy from 'lodash/sortBy';
import { useDispatch } from 'react-redux';
import Link from 'next/link';
import { setPageTitle } from '../../store/themeConfigSlice';
import { getRandomNumber } from '@/constants/mics';

const Students = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Students'));
    });

    const rowData = [
        {
            id: 1,
            firstName: 'Sydney',
            lastName: 'Currey',
            parent: 'Sydney Currey',
            email: 'scurrey0@usatoday.com',
            gender: 'Female',
            class: 'r',
            section: 86,
            time: '1:03 AM',
            phone: '217-682-3720',
            dob: '08/16/1991',
            address: '27849 Becker Drive',
            avatar: getRandomNumber(1, 34),
        },
        {
            id: 2,
            firstName: 'Nerti',
            lastName: 'Parley',
            parent: 'Nerti Parley',
            email: 'nparley1@pen.io',
            gender: 'Female',
            class: 'b',
            section: 86,
            time: '8:19 AM',
            phone: '266-149-7391',
            dob: '03/17/1996',
            address: '862 Dawn Park',
            avatar: getRandomNumber(1, 34),
        },
        {
            id: 3,
            firstName: 'Gayle',
            lastName: "O' Donohue",
            parent: "Gayle O' Donohue",
            email: 'go2@washington.edu',
            gender: 'Genderfluid',
            class: 'w',
            section: 42,
            time: '5:14 PM',
            phone: '270-263-8900',
            dob: '10/08/1993',
            address: '446 Springs Trail',
            avatar: getRandomNumber(1, 34),
        },
        {
            id: 4,
            firstName: 'Errick',
            lastName: 'Manicom',
            parent: 'Errick Manicom',
            email: 'emanicom3@biglobe.ne.jp',
            gender: 'Male',
            class: 'j',
            section: 4,
            time: '3:17 PM',
            phone: '146-989-0272',
            dob: '03/16/1999',
            address: '80701 Oakridge Trail',
            avatar: getRandomNumber(1, 34),
        },
        {
            id: 5,
            firstName: 'Melisandra',
            lastName: 'Cotmore',
            parent: 'Melisandra Cotmore',
            email: 'mcotmore4@bbc.co.uk',
            gender: 'Female',
            class: 'x',
            section: 19,
            time: '5:30 AM',
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
            class: 'w',
            section: 53,
            time: '10:56 AM',
            phone: '505-196-9566',
            dob: '03/24/2008',
            address: '08094 Columbus Alley',
            avatar: getRandomNumber(1, 34),
        },
        {
            id: 7,
            firstName: 'Brantley',
            lastName: 'Pressnell',
            parent: 'Brantley Pressnell',
            email: 'bpressnell6@de.vu',
            gender: 'Male',
            class: 's',
            section: 10,
            time: '12:31 AM',
            phone: '963-166-9208',
            dob: '09/23/1995',
            address: '806 Loeprich Way',
            avatar: getRandomNumber(1, 34),
        },
        {
            id: 8,
            firstName: 'De',
            lastName: 'Klimschak',
            parent: 'De Klimschak',
            email: 'dklimschak7@so-net.ne.jp',
            gender: 'Female',
            class: 'd',
            section: 29,
            time: '6:15 PM',
            phone: '418-582-5635',
            dob: '07/31/2009',
            address: '89 Schiller Hill',
            avatar: getRandomNumber(1, 34),
        },
        {
            id: 9,
            firstName: 'Therine',
            lastName: 'Chatburn',
            parent: 'Therine Chatburn',
            email: 'tchatburn8@livejournal.com',
            gender: 'Female',
            class: 't',
            section: 74,
            time: '12:12 PM',
            phone: '203-786-7289',
            dob: '01/16/2007',
            address: '50795 Emmet Street',
            avatar: getRandomNumber(1, 34),
        },
        {
            id: 10,
            firstName: 'Dre',
            lastName: 'Long',
            parent: 'Dre Long',
            email: 'dlong9@reverbnation.com',
            gender: 'Female',
            class: 'f',
            section: 95,
            time: '4:40 AM',
            phone: '999-424-4839',
            dob: '05/23/1997',
            address: '81 Dunning Point',
            avatar: getRandomNumber(1, 34),
        },
        {
            id: 11,
            firstName: 'Robin',
            lastName: 'Dewbury',
            parent: 'Robin Dewbury',
            email: 'rdewburya@a8.net',
            gender: 'Male',
            class: 'c',
            section: 6,
            time: '11:25 PM',
            phone: '803-501-9239',
            dob: '11/16/2007',
            address: '3157 Ridge Oak Road',
            avatar: getRandomNumber(1, 34),
        },
        {
            id: 12,
            firstName: 'Hunter',
            lastName: 'Tales',
            parent: 'Hunter Tales',
            email: 'htalesb@wikimedia.org',
            gender: 'Bigender',
            class: 's',
            section: 10,
            time: '6:43 AM',
            phone: '994-224-4066',
            dob: '06/29/2007',
            address: '2 Fallview Trail',
            avatar: getRandomNumber(1, 34),
        },
        {
            id: 13,
            firstName: 'Ignaz',
            lastName: 'Busfield',
            parent: 'Ignaz Busfield',
            email: 'ibusfieldc@nydailynews.com',
            gender: 'Male',
            class: 'n',
            section: 49,
            time: '3:17 AM',
            phone: '786-445-7398',
            dob: '12/07/1990',
            address: '394 Red Cloud Crossing',
            avatar: getRandomNumber(1, 34),
        },
        {
            id: 14,
            firstName: 'Kahlil',
            lastName: 'Somerscales',
            parent: 'Kahlil Somerscales',
            email: 'ksomerscalesd@hao123.com',
            gender: 'Male',
            class: 'q',
            section: 96,
            time: '7:06 AM',
            phone: '789-824-1759',
            dob: '07/19/1998',
            address: '46 Monument Trail',
            avatar: getRandomNumber(1, 34),
        },
        {
            id: 15,
            firstName: 'Eadmund',
            lastName: 'Biernat',
            parent: 'Eadmund Biernat',
            email: 'ebiernate@newsvine.com',
            gender: 'Male',
            class: 'a',
            section: 96,
            time: '6:35 PM',
            phone: '121-481-7389',
            dob: '08/25/1991',
            address: '2569 Myrtle Avenue',
            avatar: getRandomNumber(1, 34),
        },
        {
            id: 16,
            firstName: 'Tova',
            lastName: 'Noto',
            parent: 'Tova Noto',
            email: 'tnotof@cmu.edu',
            gender: 'Female',
            class: 'u',
            section: 35,
            time: '4:48 AM',
            phone: '540-582-2183',
            dob: '07/26/1998',
            address: '2078 Monica Point',
            avatar: getRandomNumber(1, 34),
        },
        {
            id: 17,
            firstName: 'Hardy',
            lastName: 'Beadnall',
            parent: 'Hardy Beadnall',
            email: 'hbeadnallg@gizmodo.com',
            gender: 'Male',
            class: 'u',
            section: 24,
            time: '8:34 AM',
            phone: '987-250-6902',
            dob: '01/28/2005',
            address: '36108 Dennis Center',
            avatar: getRandomNumber(1, 34),
        },
        {
            id: 18,
            firstName: 'Temple',
            lastName: 'Cliffe',
            parent: 'Temple Cliffe',
            email: 'tcliffeh@apache.org',
            gender: 'Male',
            class: 's',
            section: 77,
            time: '8:04 AM',
            phone: '163-486-2878',
            dob: '01/30/2010',
            address: '38853 Annamark Alley',
            avatar: getRandomNumber(1, 34),
        },
        {
            id: 19,
            firstName: 'Joann',
            lastName: 'Wallage',
            parent: 'Joann Wallage',
            email: 'jwallagei@yellowbook.com',
            gender: 'Female',
            class: 'd',
            section: 93,
            time: '7:12 PM',
            phone: '830-957-5150',
            dob: '03/17/1999',
            address: '83 Delladonna Point',
            avatar: getRandomNumber(1, 34),
        },
        {
            id: 20,
            firstName: 'Devin',
            lastName: 'Pikett',
            parent: 'Devin Pikett',
            email: 'dpikettj@mashable.com',
            gender: 'Female',
            class: 'f',
            section: 97,
            time: '11:35 PM',
            phone: '457-222-1493',
            dob: '01/26/2003',
            address: '256 Moulton Street',
            avatar: getRandomNumber(1, 34),
        },
        {
            id: 21,
            firstName: 'Mandy',
            lastName: 'Feirn',
            parent: 'Mandy Feirn',
            email: 'mfeirnk@elpais.com',
            gender: 'Female',
            class: 'd',
            section: 56,
            time: '3:04 AM',
            phone: '487-715-6885',
            dob: '04/05/2008',
            address: '7 Westerfield Terrace',
            avatar: getRandomNumber(1, 34),
        },
        {
            id: 22,
            firstName: 'Fredra',
            lastName: 'Routham',
            parent: 'Fredra Routham',
            email: 'frouthaml@google.ca',
            gender: 'Female',
            class: 'g',
            section: 53,
            time: '7:11 AM',
            phone: '140-909-9741',
            dob: '04/01/2001',
            address: '95054 Waxwing Lane',
            avatar: getRandomNumber(1, 34),
        },
        {
            id: 23,
            firstName: 'Frederique',
            lastName: 'Macauley',
            parent: 'Frederique Macauley',
            email: 'fmacauleym@php.net',
            gender: 'Female',
            class: 'i',
            section: 92,
            time: '9:34 AM',
            phone: '897-337-6723',
            dob: '11/30/1992',
            address: '7304 Raven Junction',
            avatar: getRandomNumber(1, 34),
        },
        {
            id: 24,
            firstName: 'Eveline',
            lastName: 'Traut',
            parent: 'Eveline Traut',
            email: 'etrautn@w3.org',
            gender: 'Female',
            class: 'h',
            section: 84,
            time: '1:57 AM',
            phone: '500-681-3117',
            dob: '07/21/1995',
            address: '133 Valley Edge Road',
            avatar: getRandomNumber(1, 34),
        },
        {
            id: 25,
            firstName: 'Kalila',
            lastName: 'McAvinchey',
            parent: 'Kalila McAvinchey',
            email: 'kmcavincheyo@ameblo.jp',
            gender: 'Female',
            class: 'j',
            section: 26,
            time: '2:48 PM',
            phone: '808-293-8550',
            dob: '11/05/1995',
            address: '313 Arapahoe Point',
            avatar: getRandomNumber(1, 34),
        },
    ];

    const [search, setSearch] = useState(false);
    const [page, setPage] = useState(1);
    const PAGE_SIZES = [10, 20, 30, 50, 100];
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [initialRecords, setInitialRecords] = useState(sortBy(rowData, 'id'));
    const [recordsData, setRecordsData] = useState(initialRecords);

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

    return (
        <div className="panel">
            <div className="mb-5 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                <h5 className="text-lg font-semibold dark:text-white-light">All Students</h5>
                <div className="flex items-center">
                    <Link href="/students/add" className="btn btn-primary btn-sm">
                        <>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <use href="/assets/images/icons/icons.svg#lineDuotoneEssentionalUIAddSquare" stroke="currentColor" />
                            </svg>
                            <span className="pl-2">Add more student</span>
                        </>
                    </Link>
                    <button type="button" className="btn btn-primary btn-sm ml-2">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <use href="/assets/images/icons/icons.svg#lineDuotoneFilesFileDownload" />
                        </svg>
                        <span className="pl-2">Import student</span>
                    </button>
                    <button type="button" className="btn btn-primary btn-sm ml-2">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <use href="/assets/images/icons/icons.svg#lineDuotoneArrowsActionDownloadMinimalistic" stroke="currentColor" />
                        </svg>
                        <span className="pl-2">Download excel template</span>
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
                        placeholder="Search by #Name, #Class, #Email"
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
                        columns={[
                            {
                                accessor: 'id',
                                title: 'ID',
                                sortable: false,
                                render: ({ id }) => <strong className="text-info">#{id}</strong>,
                            },
                            {
                                accessor: 'firstName',
                                title: 'Student name',
                                sortable: true,
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
                                accessor: 'class',
                                title: 'Class',
                                render: ({ class: classroom }) => <span className="uppercase">{classroom}</span>,
                            },
                            {
                                accessor: 'section',
                                title: 'Section',
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
                                sortable: true,
                                render: ({ email }) => (
                                    <a href={`mailto:${email}`} className="text-primary hover:underline">
                                        {email}
                                    </a>
                                ),
                            },
                            { accessor: 'phone', title: 'Phone', sortable: true },
                        ]}
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
                    />
                )}
            </div>
        </div>
    );
};

export default Students;
