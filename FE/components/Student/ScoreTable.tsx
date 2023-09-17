import { Fragment, useEffect, useState } from 'react';
import { sortBy } from 'lodash';
import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import { Dialog, Transition } from '@headlessui/react';

const rowData = [
    {
        id: 1,
        subject: 'English 1',
        s1: 7,
        s2: 8,
        final: 7.5,
    },
    {
        id: 2,
        subject: 'English 2',
        s1: 6,
        s2: 9,
        final: 8,
    },
    {
        id: 3,
        subject: 'English 3',
        s1: 8,
        s2: 4,
        final: 6,
    },
];

const ScoreStudent = () => {
    const [isMounted, setIsMounted] = useState(false);

    const [page, setPage] = useState(1);
    const PAGE_SIZES = [10, 20, 30, 50, 100];
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [initialRecords, setInitialRecords] = useState(sortBy(rowData, 'id'));
    const [recordsData, setRecordsData] = useState(initialRecords);
    const [isEditScoreModal, setIsEditScoreModal] = useState(false);
    const [score, setScore] = useState<string>('');
    const [scoreError, setScoreError] = useState<string>('');
    const [selectedCell, setSelectedCell] = useState<any>({});
    const [isEditScore, setIsEditScore] = useState<boolean>(false);

    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
        columnAccessor: 'id',
        direction: 'asc',
    });

    useEffect(() => {
        setIsMounted(true);
    });

    // Score
    const onCellClick = (record: any) => {
        if (record.columnIndex <= 1 || !record) {
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
        <div className="panel mt-5">
            <div className="mb-5 flex items-center justify-between">
                <h5 className="text-lg font-semibold dark:text-white-light">Scores</h5>
                <div className="flex items-center">
                    {isEditScore ? (
                        <button type="button" className="btn btn-success btn-sm ml-2">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <use href="/assets/images/icons/icons.svg#lineDuotoneElectronicDevicesSDCard" stroke="currentColor" />
                            </svg>

                            <span className="pl-2">Save</span>
                        </button>
                    ) : null}
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
                                accessor: 'subject',
                                title: 'Subject name',
                                sortable: true,
                            },
                            {
                                accessor: 's1',
                                title: 'S1',
                            },
                            {
                                accessor: 's2',
                                title: 'S2',
                            },
                            {
                                accessor: 'final',
                                title: 'Final',
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
                        onCellClick={(record) => onCellClick(record)}
                        paginationText={({ from, to, totalRecords }) => `Showing  ${from} to ${to} of ${totalRecords} entries`}
                    />
                )}
            </div>

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
                                        Edit Score {selectedCell?.columnIndex ? `${selectedCell.column.title} - ${selectedCell.record.subject}` : ''}
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

export default ScoreStudent;
