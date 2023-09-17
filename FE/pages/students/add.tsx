import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { setPageTitle } from '../../store/themeConfigSlice';
import StudentForm from '@/components/Student/Form';

const AddStudent = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setPageTitle('Add more Student'));
    });

    return <StudentForm />;
};

export default AddStudent;
