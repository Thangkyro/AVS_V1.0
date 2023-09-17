import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

import { setPageTitle } from '../../store/themeConfigSlice';
import ClassForm from '@/components/Class/Form';

const AddClass = () => {
    const dispatch = useDispatch();
    const router = useRouter();

    useEffect(() => {
        dispatch(setPageTitle('Add more Class'));
    });

    return <ClassForm id={router.query.id} />;
};

export default AddClass;
