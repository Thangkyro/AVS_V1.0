import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import { useEffect, useState } from 'react';
import sortBy from 'lodash/sortBy';
import { useDispatch } from 'react-redux';
import Link from 'next/link';
import Swal from 'sweetalert2';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

import { setPageTitle } from '../../store/themeConfigSlice';
import { getRandomNumber } from '@/constants/mics';

const Class = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Class'));
    });

    const rowData = [
        {
            id: 1,
            firstName: 'Morse',
            lastName: 'Taylot',
            email: 'mtaylot0@vinaora.com',
            studentsCount: getRandomNumber(10, 100),
            class: 'n',
            section: 50,
            date: '09/07/2023',
            time: '11:19 AM',
            phone: '596-989-5621',
            avatar: getRandomNumber(1, 34),
        },
        {
            id: 2,
            firstName: 'Priscella',
            lastName: 'Pedlingham',
            email: 'ppedlingham1@flickr.com',
            studentsCount: getRandomNumber(10, 100),
            class: 'g',
            section: 40,
            date: '12/29/2022',
            time: '6:56 AM',
            phone: '876-254-0272',
            avatar: getRandomNumber(1, 34),
        },
        {
            id: 3,
            firstName: 'Dannie',
            lastName: 'Ruddlesden',
            email: 'druddlesden2@wordpress.com',
            studentsCount: getRandomNumber(10, 100),
            class: 'd',
            section: 98,
            date: '11/22/2023',
            time: '10:30 AM',
            phone: '716-654-1718',
            avatar: getRandomNumber(1, 34),
        },
        {
            id: 4,
            firstName: 'Heida',
            lastName: 'Woodson',
            email: 'hwoodson3@1688.com',
            studentsCount: getRandomNumber(10, 100),
            class: 'l',
            section: 97,
            date: '06/28/2023',
            time: '6:03 PM',
            phone: '324-820-6631',
            avatar: getRandomNumber(1, 34),
        },
        {
            id: 5,
            firstName: 'Claus',
            lastName: 'Vasey',
            email: 'cvasey4@aol.com',
            studentsCount: getRandomNumber(10, 100),
            class: 'a',
            section: 53,
            date: '02/04/2023',
            time: '12:49 AM',
            phone: '187-877-7197',
            avatar: getRandomNumber(1, 34),
        },
        {
            id: 6,
            firstName: 'Shamus',
            lastName: 'Etheridge',
            email: 'setheridge5@ovh.net',
            studentsCount: getRandomNumber(10, 100),
            class: 'l',
            section: 22,
            date: '06/20/2022',
            time: '12:56 AM',
            phone: '548-835-5131',
            avatar: getRandomNumber(1, 34),
        },
        {
            id: 7,
            firstName: 'Humphrey',
            lastName: 'MacArthur',
            email: 'hmacarthur6@netlog.com',
            studentsCount: getRandomNumber(10, 100),
            class: 's',
            section: 10,
            date: '06/28/2022',
            time: '1:24 PM',
            phone: '973-719-1458',
            avatar: getRandomNumber(1, 34),
        },
        {
            id: 8,
            firstName: 'Irving',
            lastName: 'Pippin',
            email: 'ipippin7@tmall.com',
            studentsCount: getRandomNumber(10, 100),
            class: 'g',
            section: 70,
            date: '04/12/2023',
            time: '2:10 AM',
            phone: '524-135-0084',
            avatar: getRandomNumber(1, 34),
        },
        {
            id: 9,
            firstName: 'Tucker',
            lastName: 'Karlik',
            email: 'tkarlik8@dot.gov',
            studentsCount: getRandomNumber(10, 100),
            class: 'n',
            section: 7,
            date: '07/30/2023',
            time: '12:46 AM',
            phone: '392-190-1245',
            avatar: getRandomNumber(1, 34),
        },
        {
            id: 10,
            firstName: 'Nataline',
            lastName: 'Isted',
            email: 'nisted9@ow.ly',
            studentsCount: getRandomNumber(10, 100),
            class: 'g',
            section: 38,
            date: '03/25/2023',
            time: '7:22 PM',
            phone: '835-942-7467',
            avatar: getRandomNumber(1, 34),
        },
        {
            id: 11,
            firstName: 'Lorettalorna',
            lastName: 'Tregidgo',
            email: 'ltregidgoa@upenn.edu',
            studentsCount: getRandomNumber(10, 100),
            class: 'm',
            section: 61,
            date: '12/03/2023',
            time: '3:33 PM',
            phone: '371-482-2536',
            avatar: getRandomNumber(1, 34),
        },
        {
            id: 12,
            firstName: 'Bernarr',
            lastName: 'Blackstone',
            email: 'bblackstoneb@mediafire.com',
            studentsCount: getRandomNumber(10, 100),
            class: 'o',
            section: 73,
            date: '10/22/2022',
            time: '10:01 PM',
            phone: '304-176-4898',
            avatar: getRandomNumber(1, 34),
        },
        {
            id: 13,
            firstName: 'Fancy',
            lastName: 'Assandri',
            email: 'fassandric@shutterfly.com',
            studentsCount: getRandomNumber(10, 100),
            class: 'y',
            section: 9,
            date: '06/07/2023',
            time: '12:26 AM',
            phone: '759-474-7981',
            avatar: getRandomNumber(1, 34),
        },
        {
            id: 14,
            firstName: 'Roi',
            lastName: 'Verdun',
            email: 'rverdund@amazonaws.com',
            studentsCount: getRandomNumber(10, 100),
            class: 'p',
            section: 51,
            date: '11/07/2023',
            time: '12:31 PM',
            phone: '314-693-5104',
            avatar: getRandomNumber(1, 34),
        },
        {
            id: 15,
            firstName: 'Mercie',
            lastName: 'McFie',
            email: 'mmcfiee@theguardian.com',
            studentsCount: getRandomNumber(10, 100),
            class: 'k',
            section: 87,
            date: '06/02/2023',
            time: '10:50 PM',
            phone: '292-454-0823',
            avatar: getRandomNumber(1, 34),
        },
        {
            id: 16,
            firstName: 'Glynda',
            lastName: 'Bickerton',
            email: 'gbickertonf@w3.org',
            studentsCount: getRandomNumber(10, 100),
            class: 'u',
            section: 36,
            date: '12/31/2022',
            time: '1:30 PM',
            phone: '831-382-3086',
            avatar: getRandomNumber(1, 34),
        },
        {
            id: 17,
            firstName: 'Arabel',
            lastName: 'Smidmore',
            email: 'asmidmoreg@163.com',
            studentsCount: getRandomNumber(10, 100),
            class: 'v',
            section: 86,
            date: '04/01/2023',
            time: '1:15 AM',
            phone: '214-420-0147',
            avatar: getRandomNumber(1, 34),
        },
        {
            id: 18,
            firstName: 'Glynnis',
            lastName: 'Dunbobin',
            email: 'gdunbobinh@narod.ru',
            studentsCount: getRandomNumber(10, 100),
            class: 's',
            section: 40,
            date: '11/22/2022',
            time: '9:31 AM',
            phone: '736-807-0858',
            avatar: getRandomNumber(1, 34),
        },
        {
            id: 19,
            firstName: 'Ardella',
            lastName: 'Hewell',
            email: 'ahewelli@harvard.edu',
            studentsCount: getRandomNumber(10, 100),
            class: 'v',
            section: 67,
            date: '12/06/2023',
            time: '7:42 PM',
            phone: '853-993-1142',
            avatar: getRandomNumber(1, 34),
        },
        {
            id: 20,
            firstName: 'Rae',
            lastName: 'Beckson',
            email: 'rbecksonj@people.com.cn',
            studentsCount: getRandomNumber(10, 100),
            class: 'b',
            section: 63,
            date: '11/26/2023',
            time: '6:14 AM',
            phone: '192-619-7841',
            avatar: getRandomNumber(1, 34),
        },
        {
            id: 21,
            firstName: 'Grenville',
            lastName: 'Muddimer',
            email: 'gmuddimerk@1und1.de',
            studentsCount: getRandomNumber(10, 100),
            class: 'z',
            section: 89,
            date: '07/17/2023',
            time: '6:59 PM',
            phone: '256-867-5410',
            avatar: getRandomNumber(1, 34),
        },
        {
            id: 22,
            firstName: 'Leilah',
            lastName: 'Haine',
            email: 'lhainel@elegantthemes.com',
            studentsCount: getRandomNumber(10, 100),
            class: 't',
            section: 13,
            date: '10/14/2022',
            time: '3:01 PM',
            phone: '759-709-3582',
            avatar: getRandomNumber(1, 34),
        },
        {
            id: 23,
            firstName: 'Sheff',
            lastName: 'Lawrie',
            email: 'slawriem@homestead.com',
            studentsCount: getRandomNumber(10, 100),
            class: 'e',
            section: 59,
            date: '07/31/2023',
            time: '2:40 PM',
            phone: '290-956-2117',
            avatar: getRandomNumber(1, 34),
        },
        {
            id: 24,
            firstName: 'Hewie',
            lastName: 'Jensen',
            email: 'hjensenn@virginia.edu',
            studentsCount: getRandomNumber(10, 100),
            class: 'h',
            section: 47,
            date: '07/02/2023',
            time: '2:24 AM',
            phone: '503-648-2539',
            avatar: getRandomNumber(1, 34),
        },
        {
            id: 25,
            firstName: 'Paula',
            lastName: 'Saunder',
            email: 'psaundero@springer.com',
            studentsCount: getRandomNumber(10, 100),
            class: 'd',
            section: 20,
            date: '10/27/2023',
            time: '4:09 AM',
            phone: '563-555-1586',
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

    const onRemoveClass = (data: any) => {
        Swal.fire({
            icon: 'warning',
            title: 'Are you sure about that?',
            padding: '2em',
        }).then((result) => {
            if (result.isConfirmed) {
                const filteredData = recordsData.filter((item) => item.id !== data.id);
                setRecordsData(filteredData);
                const toast: any = Swal.mixin({
                    toast: true,
                    position: 'top-right',
                    showConfirmButton: false,
                    timer: 3000,
                    customClass: { container: 'toast' },
                });
                toast.fire({
                    icon: 'success',
                    title: 'You have successfully removed',
                    padding: '10px 20px',
                });
            }
        });
    };

    return (
        <div className="panel">
            <div className="mb-5 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                <h5 className="text-lg font-semibold dark:text-white-light">All Class</h5>
                <div className="flex items-center">
                    <Link href="/class/add" className="btn btn-primary btn-sm">
                        <>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <use href="/assets/images/icons/icons.svg#lineDuotoneEssentionalUIAddSquare" stroke="currentColor" />
                            </svg>
                            <span className="pl-2">Add more class</span>
                        </>
                    </Link>
                    <button type="button" className="btn btn-primary btn-sm ml-2">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <use href="/assets/images/icons/icons.svg#lineDuotoneFilesFileDownload" />
                        </svg>
                        <span className="pl-2">Import class</span>
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
                        placeholder="Search by #Teacher Name, #Class, #Email"
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
                                title: 'Teacher',
                                sortable: true,
                                render: ({ firstName, lastName, avatar }) => (
                                    <div className="flex items-center gap-2">
                                        <img src={`/assets/images/profile-${avatar}.jpeg`} className="h-9 w-9 max-w-none rounded-full" alt="user-profile" />
                                        <div className="font-semibold">{firstName + ' ' + lastName}</div>
                                    </div>
                                ),
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
                            {
                                accessor: 'studentsCount',
                                title: 'Students',
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
                                accessor: 'date',
                                title: 'Date',
                            },
                            {
                                accessor: 'time',
                                title: 'Time',
                            },
                            {
                                accessor: 'action',
                                title: 'Action',
                                titleClassName: '!text-center',
                                render: (record) => (
                                    <div className="mx-auto flex w-max items-center gap-4">
                                        <Tippy content="Edit">
                                            <Link href={`/class/${record.id}`}>
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5">
                                                    <use href="/assets/images/icons/icons.svg#lineDuotoneMessagesConversationPen" stroke="currentColor" />
                                                </svg>
                                            </Link>
                                        </Tippy>
                                        <Tippy content="Remove">
                                            <button type="button" onClick={() => onRemoveClass(record)}>
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5">
                                                    <use href="/assets/images/icons/icons.svg#lineDuotoneEssentionalUITrashBinTrash" stroke="currentColor" />
                                                </svg>
                                            </button>
                                        </Tippy>
                                    </div>
                                ),
                            },
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

export default Class;
