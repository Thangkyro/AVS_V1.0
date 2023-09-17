import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import { useEffect, useState } from 'react';
import sortBy from 'lodash/sortBy';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/flatpickr.css';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { studentAttendance } from '@/mock/student-attendance';
import { formatDate } from '@/constants/mics';
import ReactSelect from '@/components/ReactSelect';

const options = [
    {
        value: 'a',
        label: 'A',
    },
    {
        value: 'b',
        label: 'B',
    },
];

const StudentAttendance = () => {
    const rowData = studentAttendance;

    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [search, setSearch] = useState<boolean>(false);
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

    const onSetAttendance = (id: number, type: 'P' | 'A') => {
        const findStudent = rowData.find((item) => item.id === id);
        if (findStudent) {
            findStudent.attendance = type;
            const newData = rowData.map((item) => {
                if (item.id === id) {
                    return findStudent;
                }
                return item;
            });
            setInitialRecords(sortBy(newData, 'id'));
            setIsEdit(true);
        }
    };

    return (
        <div className="panel mt-7">
            <div className="mb-5 flex min-h-[34px] flex-col gap-5 md:flex-row md:items-center md:justify-between">
                <h5 className="text-lg font-semibold dark:text-white-light">Student Attendance</h5>
                <div className="flex items-center">
                    {isEdit ? (
                        <button type="button" className="btn btn-success btn-sm">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <use href="/assets/images/icons/icons.svg#lineDuotoneElectronicDevicesSDCard" stroke="currentColor" />
                            </svg>

                            <span className="pl-2">Save</span>
                        </button>
                    ) : null}
                </div>
            </div>

            <div className="mb-5 grid grid-cols-1 gap-5 md:grid-cols-3">
                <div>
                    <label htmlFor="date">Select Date </label>
                    <Flatpickr
                        data-enable-time
                        options={{
                            enableTime: false,
                            dateFormat: 'Y-m-d',
                            position: 'auto left',
                            maxDate: formatDate(new Date()),
                        }}
                        placeholder="Select Start time"
                        className="form-input"
                        // onChange={([date]) => formik.setFieldValue('startTime', date.toString())}
                        defaultValue={formatDate(new Date())}
                        id="date"
                    />
                </div>
                <div>
                    <label htmlFor="section"> Select Section </label>
                    <ReactSelect
                        options={options}
                        name="section"
                        // onChange={(option: any) => onTeacherChange(option)}
                        // onBlur={formik.handleBlur('teacher')}
                        id="section"
                        // className={formik.submitCount ? (formik.errors.teacher ? 'has-error' : '') : ''}
                        // value={selectValue}
                    />
                </div>
                <div>
                    <label htmlFor="date">Search </label>
                    <div className="relative">
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
                                sortable: true,
                                render: ({ id }) => <strong className="text-info">#{id}</strong>,
                            },
                            {
                                accessor: 'firstName',
                                title: 'Student',
                                sortable: true,
                                render: ({ firstName, lastName, avatar }) => (
                                    <div className="flex items-center gap-2">
                                        <img src={`/assets/images/profile-${avatar}.jpeg`} className="h-9 w-9 max-w-none rounded-full" alt="user-profile" />
                                        <div className="font-semibold">{firstName + ' ' + lastName}</div>
                                    </div>
                                ),
                            },
                            { accessor: 'dob', title: 'Birthday' },
                            { accessor: 'gender', title: 'Gender' },
                            {
                                accessor: 'attendance',
                                title: 'Attendance',
                                render: ({ id, attendance }) => (
                                    <div className="flex gap-5">
                                        <Tippy content="Present">
                                            <button className="p-1" onClick={() => onSetAttendance(id, 'P')}>
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <use href="/assets/images/icons/icons.svg#boldDuotoneEssentionalUICheckCircle" fill={attendance === 'P' ? '#00ab55' : '#545454'} />
                                                </svg>
                                            </button>
                                        </Tippy>
                                        <Tippy content="Absent">
                                            <button className="p-1" onClick={() => onSetAttendance(id, 'A')}>
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <use href="/assets/images/icons/icons.svg#boldDuotoneEssentionalUICloseCircle" fill={attendance === 'A' ? '#e7515a' : '#545454'} />
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

export default StudentAttendance;
