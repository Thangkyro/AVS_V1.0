import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import sortBy from 'lodash/sortBy';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { setPageTitle } from '../../store/themeConfigSlice';
import Dropdown from '@/components/Dropdown';

const options = [
    { value: 'view', label: 'View-only' },
    { value: 'edit', label: 'Edit' },
    { value: 'admin', label: 'Admin' },
];

const Role = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Class'));
    });

    const rowData = [
        {
            id: 1,
            title: 'Class',
            center: 'view',
            ftdp: 'view',
            admin: 'admin',
        },
        {
            id: 2,
            title: 'Lesson',
            center: 'view',
            ftdp: 'view',
            admin: 'admin',
        },
        {
            id: 3,
            title: 'Student',
            center: 'view',
            ftdp: 'view',
            admin: 'admin',
        },
        {
            id: 4,
            title: 'Role',
            center: 'view',
            ftdp: 'view',
            admin: 'admin',
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
        <div className="panel max-w-5xl">
            <div className="mb-5 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                <h5 className="text-lg font-semibold dark:text-white-light">Role</h5>
            </div>
            <div className="datatables">
                {isMounted && (
                    <DataTable
                        noRecordsText="No results match your search query"
                        highlightOnHover
                        className="table-hover whitespace-nowrap"
                        records={recordsData}
                        columns={[
                            {
                                accessor: 'title',
                                title: 'Actions',
                            },
                            {
                                accessor: 'center',
                                title: 'Center',
                                width: 150,
                                render: ({ center }) => (
                                    <div className="dropdown">
                                        <Dropdown
                                            placement="bottom-end"
                                            btnClassName="dropdown-toggle text-info text-center"
                                            button={
                                                <>
                                                    {options.find((option) => option.value === center)?.label}
                                                    <span>
                                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <use href="/assets/images/icons/icons.svg#lineDuotoneArrowsAltArrowDown" stroke="currentColor" />
                                                        </svg>
                                                    </span>
                                                </>
                                            }
                                        >
                                            <ul className="!min-w-[170px]">
                                                {options.map((option, idx) => (
                                                    <li key={idx}>
                                                        <button type="button">{option.label}</button>
                                                    </li>
                                                ))}
                                            </ul>
                                        </Dropdown>
                                    </div>
                                ),
                            },
                            {
                                accessor: 'ftdp',
                                title: 'DTDP',
                                width: 150,
                                render: ({ ftdp }) => (
                                    <div className="dropdown">
                                        <Dropdown
                                            placement="bottom-end"
                                            btnClassName="dropdown-toggle text-info text-center"
                                            button={
                                                <>
                                                    {options.find((option) => option.value === ftdp)?.label}
                                                    <span>
                                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <use href="/assets/images/icons/icons.svg#lineDuotoneArrowsAltArrowDown" stroke="currentColor" />
                                                        </svg>
                                                    </span>
                                                </>
                                            }
                                        >
                                            <ul className="!min-w-[170px]">
                                                {options.map((option, idx) => (
                                                    <li key={idx}>
                                                        <button type="button">{option.label}</button>
                                                    </li>
                                                ))}
                                            </ul>
                                        </Dropdown>
                                    </div>
                                ),
                            },
                            {
                                accessor: 'admin',
                                title: 'admin',
                                width: 150,
                                render: ({ admin }) => (
                                    <div className="dropdown">
                                        <Dropdown
                                            placement=""
                                            btnClassName="dropdown-toggle text-info text-center"
                                            button={
                                                <>
                                                    {options.find((option) => option.value === admin)?.label}
                                                    <span>
                                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <use href="/assets/images/icons/icons.svg#lineDuotoneArrowsAltArrowDown" stroke="currentColor" />
                                                        </svg>
                                                    </span>
                                                </>
                                            }
                                        >
                                            <ul className="!min-w-[170px]">
                                                {options.map((option, idx) => (
                                                    <li key={idx}>
                                                        <button type="button">{option.label}</button>
                                                    </li>
                                                ))}
                                            </ul>
                                        </Dropdown>
                                    </div>
                                ),
                            },
                        ]}
                        minHeight={200}
                    />
                )}
            </div>
        </div>
    );
};

export default Role;
