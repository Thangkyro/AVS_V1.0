import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import AcademicTranscript from '@/components/Class/View/AcademicTransacript';
import StudentAttendance from '@/components/Class/View/StudentAttendence';
import { setPageTitle } from '../../../store/themeConfigSlice';

const ViewClassDetail = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('View Class'));
    });

    return (
        <div>
            <div className="prose flex flex-wrap items-center gap-4">
                <h2 className="mb-0 text-xl">Class 9A8</h2>
                <span>-</span>
                <h2 className="mb-0 text-xl">Teacher: Morse</h2>
                <span>-</span>
                <h2 className="mb-0 text-xl">Total students: 25</h2>
            </div>

            <AcademicTranscript />
            <StudentAttendance />
        </div>
    );
};

export default ViewClassDetail;
