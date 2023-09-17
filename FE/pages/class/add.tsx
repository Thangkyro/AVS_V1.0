import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { setPageTitle } from '../../store/themeConfigSlice';
import ClassForm from '@/components/Class/Form';

const AddClass = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setPageTitle('Add more Class'));
    });

    return <ClassForm />;
};

export default AddClass;
