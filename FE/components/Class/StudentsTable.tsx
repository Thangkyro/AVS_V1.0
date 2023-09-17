import { useEffect, useState } from 'react';
import { sortBy } from 'lodash';
import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import AddStudents from './AddStudents';
import { getRandomNumber } from '@/constants/mics';

const rowData = [
    {
        id: 1,
        firstName: 'Sydney',
        lastName: 'Currey',
        parent: 'Sydney Currey',
        email: 'scurrey0@usatoday.com',
        gender: 'Female',
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
        phone: '266-149-7391',
        dob: '03/17/1996',
        address: '862 Dawn Park',
        avatar: getRandomNumber(1, 34),
    },
];

const StudentsClass = () => {
    const [isMounted, setIsMounted] = useState(false);

    const [page, setPage] = useState(1);
    const PAGE_SIZES = [10, 20, 30, 50, 100];
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [initialRecords, setInitialRecords] = useState(sortBy(rowData, 'id'));
    const [recordsData, setRecordsData] = useState(initialRecords);
    const [selectedRecords, setSelectedRecords] = useState<any>([]);
    const [isModalVisible, setModalVisible] = useState(false);

    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
        columnAccessor: 'id',
        direction: 'asc',
    });

    useEffect(() => {
        setIsMounted(true);
    });

    const onRemoveStudent = () => {
        const filteredData = recordsData.filter((item: any) => selectedRecords.includes(item.id));
        setRecordsData(filteredData);
        setSelectedRecords([]);
    };

    const onAddStudent = (student: any) => {
        const newStudent = {
            id: getRandomNumber(1, 1000),
            ...student,
        };
        setRecordsData([newStudent, ...recordsData]);
    };

    return (
        <div className="panel mt-5">
            <div className="mb-5 flex items-center justify-between">
                <h5 className="text-lg font-semibold dark:text-white-light">Students</h5>
                <div className="flex items-center">
                    {selectedRecords.length > 0 && (
                        <button type="button" className="btn btn-danger btn-sm mr-2" onClick={onRemoveStudent}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <use href="/assets/images/icons/icons.svg#lineDuotoneEssentionalUITrashBinTrash" stroke="currentColor" />
                            </svg>

                            <span className="pl-2">Remove</span>
                        </button>
                    )}
                    <button type="button" className="btn btn-primary btn-sm" onClick={() => setModalVisible(true)}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <use href="/assets/images/icons/icons.svg#lineDuotoneEssentionalUIAddSquare" stroke="currentColor" />
                        </svg>
                        <span className="pl-2">Add student to class</span>
                    </button>
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
                        selectedRecords={selectedRecords}
                        onSelectedRecordsChange={setSelectedRecords}
                        minHeight={200}
                        paginationText={({ from, to, totalRecords }) => `Showing  ${from} to ${to} of ${totalRecords} entries`}
                    />
                )}
            </div>
            <AddStudents isVisible={isModalVisible} setVisible={setModalVisible} onAddStudent={onAddStudent} />
        </div>
    );
};

export default StudentsClass;
