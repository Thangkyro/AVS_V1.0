import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import { Fragment, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Dialog, Transition } from '@headlessui/react';
import { EventClickArg } from '@fullcalendar/core';
import Link from 'next/link';

import { setPageTitle } from '../../store/themeConfigSlice';
import Dropdown from '../../components/Dropdown';
import { schedule } from '@/mock/schedule-data';

const MONTH = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'Novemeber', 'December'];

const Calendar = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Schedule'));
    });

    const [events, setEvents] = useState<any>(schedule);
    const [centers, setCenters] = useState<any>(['A', 'B', 'C', 'D', 'E']);
    const [selectedCenter, setSelectedCenter] = useState<any>('');
    const [isAddEventModal, setIsAddEventModal] = useState(false);

    const defaultParams = {
        id: null,
        title: '',
        dateTime: '',
        description: '',
        class: '',
        teacher: '',
    };
    const [params, setParams] = useState<any>(defaultParams);
    const dateFormat = (start: any, end: any) => {
        const dtStart = new Date(start);
        const dtEnd = new Date(end);
        const month = MONTH[dtStart.getMonth()];
        const date = dtStart.getDate() < 10 ? '0' + dtStart.getDate() : dtStart.getDate();
        const hoursStart = dtStart.getHours() < 10 ? '0' + dtStart.getHours() : dtStart.getHours();
        const hoursEnd = dtEnd.getHours() < 10 ? '0' + dtEnd.getHours() : dtEnd.getHours();
        const minsStart = dtStart.getMinutes() < 10 ? '0' + dtStart.getMinutes() : dtStart.getMinutes();
        const minsEnd = dtEnd.getMinutes() < 10 ? '0' + dtEnd.getMinutes() : dtEnd.getMinutes();
        return `${month} ${date}, ${dtStart.getFullYear()} (${hoursStart}:${minsStart} - ${hoursEnd}:${minsEnd})`;
    };
    const editEvent = (data: EventClickArg) => {
        let params = JSON.parse(JSON.stringify(defaultParams));
        setParams(params);
        if (data) {
            let obj = JSON.parse(JSON.stringify(data.event));
            setParams({
                id: obj.id ? obj.id : null,
                title: obj.title ? obj.title : null,
                dateTime: dateFormat(obj.start, obj.end),
                description: obj.extendedProps ? obj.extendedProps.description : '',
                class: obj.extendedProps ? obj.extendedProps.class : '',
                teacher: obj.extendedProps ? obj.extendedProps.teacher : '',
            });
        }
        setIsAddEventModal(true);
    };
    const setCenter = (center: any) => {
        setSelectedCenter(center);
    };

    return (
        <div>
            <div className="panel mb-5">
                <div className="mb-4 flex flex-col items-center justify-center sm:flex-row sm:justify-between">
                    <div className="mb-4 sm:mb-0">
                        <div className="text-center text-lg font-semibold ltr:sm:text-left rtl:sm:text-right">Schedule</div>
                        <div className="mt-2 flex flex-wrap items-center justify-center sm:justify-start">
                            <div className="flex items-center ltr:mr-4 rtl:ml-4">
                                <div className="h-2.5 w-2.5 rounded-sm bg-primary ltr:mr-2 rtl:ml-2"></div>
                                <div>Work</div>
                            </div>
                            <div className="flex items-center ltr:mr-4 rtl:ml-4">
                                <div className="h-2.5 w-2.5 rounded-sm bg-info ltr:mr-2 rtl:ml-2"></div>
                                <div>Travel</div>
                            </div>
                            <div className="flex items-center ltr:mr-4 rtl:ml-4">
                                <div className="h-2.5 w-2.5 rounded-sm bg-success ltr:mr-2 rtl:ml-2"></div>
                                <div>Personal</div>
                            </div>
                            <div className="flex items-center">
                                <div className="h-2.5 w-2.5 rounded-sm bg-danger ltr:mr-2 rtl:ml-2"></div>
                                <div>Important</div>
                            </div>
                        </div>
                    </div>
                    <div className="dropdown">
                        <Dropdown
                            placement="bottom-start"
                            btnClassName="btn btn-primary dropdown-toggle"
                            button={
                                <>
                                    Filter by Center{selectedCenter && <span className="ml-1 font-semibold">{selectedCenter}</span>}
                                    <span>
                                        <svg className="inline-block h-4 w-4 ltr:ml-1 rtl:mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <use href="/assets/images/icons/icons.svg#lineDuotoneArrowsAltArrowDown" stroke="currentColor" />
                                        </svg>
                                    </span>
                                </>
                            }
                        >
                            <ul className="!min-w-[170px]">
                                {centers.map((center: any) => (
                                    <li key={center} onClick={() => setCenter(center)}>
                                        <button type="button">{center}</button>
                                    </li>
                                ))}
                            </ul>
                        </Dropdown>
                    </div>
                </div>
                <div className="calendar-wrapper">
                    <FullCalendar
                        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                        initialView="dayGridMonth"
                        headerToolbar={{
                            left: 'prev,next today',
                            center: 'title',
                            right: 'dayGridMonth,timeGridWeek,timeGridDay',
                        }}
                        editable={false}
                        dayMaxEvents={true}
                        selectable={false}
                        droppable={false}
                        eventClick={(event: EventClickArg) => editEvent(event)}
                        // select={(event: any) => editDate(event)}
                        events={events}
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
                                            <use href="/assets/images/icons/icons.svg#lineDuotoneEssentionalUIClose" />
                                        </svg>
                                    </button>
                                    <div className="bg-[#fbfbfb] py-3 text-lg font-medium ltr:pl-5 ltr:pr-[50px] rtl:pl-[50px] rtl:pr-5 dark:bg-[#121c2c]">Class {params.class}</div>
                                    <div className="p-5">
                                        <div className="flex">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <use href="/assets/images/icons/icons.svg#boldDuotoneTimeCalendarMark" fill="currentColor" />
                                            </svg>
                                            <span className="pl-2">{params.dateTime}</span>
                                        </div>
                                        <div className="mt-4 flex">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <use href="/assets/images/icons/icons.svg#boldDuotoneUsersUserRounded" fill="currentColor" />
                                            </svg>

                                            <span className="pl-2">{params.teacher}</span>
                                        </div>
                                        <div className="!mt-8 flex items-center justify-end">
                                            <button type="button" className="btn btn-outline-danger" onClick={() => setIsAddEventModal(false)}>
                                                Close
                                            </button>
                                            <Link href={`/class/view/${params.id}`} className="btn btn-primary ltr:ml-4 rtl:mr-4">
                                                View class
                                            </Link>
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

export default Calendar;
