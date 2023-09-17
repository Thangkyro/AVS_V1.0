import * as Yup from 'yup';
import { useFormik } from 'formik';
import Swal from 'sweetalert2';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/flatpickr.css';
import Link from 'next/link';

import StudentsClass from '@/components/Class/StudentsTable';
import { useEffect, useMemo } from 'react';
import ReactSelect from '../ReactSelect';
import { getRandomNumber } from '@/constants/mics';

const parseDateTime = (date: string) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = d.getMonth() + 1;
    const day = d.getDate();
    const hour = d.getHours();
    const minute = d.getMinutes();
    return `${year}-${month < 10 ? `0${month}` : month}-${day < 10 ? `0${day}` : day} ${hour < 10 ? `0${hour}` : hour}:${minute < 10 ? `0${minute}` : minute}`;
};

const options = [
    { value: 'morse', label: 'Morse Taylot', img: getRandomNumber(1, 34), email: 'mtaylot0@vinaora.com', phone: '596-989-5621' },
    { value: 'priscella', label: 'Priscella Pedlingham', img: getRandomNumber(1, 34), email: 'ppedlingham1@flickr.com', phone: '876-254-0272' },
    { value: 'dannie', label: 'Dannie Ruddlesden', img: getRandomNumber(1, 34), email: 'druddlesden2@wordpress.com', phone: '716-654-1718' },
];

const submitForm = () => {
    const toast = Swal.mixin({
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 3000,
    });
    toast.fire({
        icon: 'success',
        title: 'Form submitted successfully',
        padding: '10px 20px',
    });
};

const submitForm4 = Yup.object().shape({
    name: Yup.string().required('Please fill the class name'),
    code: Yup.string().required('Please fill the class code'),
    level: Yup.string().required('Please fill the class level'),
    teacher: Yup.string().required('Please select the teacher'),
    startTime: Yup.string().required('Please select the start time'),
    endTime: Yup.string().required('Please select the end time'),
    email: Yup.string().required('Please select the teacher'),
    phone: Yup.string().required('Please select the teacher'),
});

const ClassForm = (props: { id?: string | undefined | any }) => {
    const { id: classId } = props;
    const formik = useFormik({
        initialValues: {
            name: '',
            code: '',
            level: '',
            teacher: '',
            startTime: '',
            endTime: '',
            email: '',
            phone: '',
        },
        validationSchema: submitForm4,
        onSubmit: (values) => {
            console.log('🚀 ~ file: add.tsx:68 ~ AddClass ~ values:', values);
        },
    });

    useEffect(() => {
        if (classId) {
            formik.setFieldValue('name', '9A8');
            formik.setFieldValue('code', '9A8');
            formik.setFieldValue('level', 'A');
            formik.setFieldValue('teacher', 'morse');
            formik.setFieldValue('startTime', parseDateTime('Thu Jun 15 2023 12:00:00 GMT+0700 (Indochina Time)'));
            formik.setFieldValue('endTime', parseDateTime('Thu Jun 08 2023 12:00:00 GMT+0700 (Indochina Time)'));
            formik.setFieldValue('email', 'mtaylot0@vinaora.com');
            formik.setFieldValue('phone', '596-989-5621');
        }
    }, [classId]);

    const selectValue = useMemo(() => {
        return options.find((option) => option.value === formik.values.teacher);
    }, [formik.values.teacher]);

    const formatOptionLabel = ({ value, label, img }: any) => (
        <div className="flex items-center gap-2">
            <img src={`/assets/images/profile-${img}.jpeg`} className="h-7 w-7 max-w-none rounded-full" alt="user-profile" />
            <div className="font-semibold">{label}</div>
        </div>
    );

    const onTeacherChange = (option: any) => {
        formik.setFieldValue('teacher', option.value);
        formik.setFieldValue('email', option.email);
        formik.setFieldValue('phone', option.phone);
    };

    return (
        <div>
            <ul className="flex space-x-2 rtl:space-x-reverse">
                <li>
                    <Link href="/class" className="text-primary hover:underline">
                        Class
                    </Link>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>Add class</span>
                </li>
            </ul>

            <div className="space-y-8 pt-5">
                <div className="panel" id="custom_styles">
                    <div className="mb-5 flex items-center justify-between">
                        <h5 className="text-lg font-semibold dark:text-white-light">Add new class</h5>
                    </div>
                    <div className="mb-5">
                        <form className="space-y-5" onSubmit={formik.handleSubmit}>
                            <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
                                <div className={formik.submitCount ? (formik.errors.name ? 'has-error' : '') : ''}>
                                    <label htmlFor="name">Class Name </label>
                                    <input name="name" type="text" id="name" placeholder="Enter Class Name" className="form-input" value={formik.values.name} onChange={formik.handleChange} />

                                    {formik.submitCount && formik.errors.name ? <div className="mt-1 text-danger">{formik.errors.name}</div> : ''}
                                </div>

                                <div className={formik.submitCount ? (formik.errors.code ? 'has-error' : '') : ''}>
                                    <label htmlFor="code">Class Code </label>
                                    <input name="code" type="text" id="code" placeholder="Enter Class Code" className="form-input" value={formik.values.code} onChange={formik.handleChange} />

                                    {formik.submitCount && formik.errors.code ? <div className="mt-1 text-danger">{formik.errors.code}</div> : ''}
                                </div>

                                <div className={formik.submitCount ? (formik.errors.level ? 'has-error' : '') : ''}>
                                    <label htmlFor="level">Class Level </label>
                                    <input name="level" type="text" id="level" placeholder="Enter Class Level" className="form-input" value={formik.values.level} onChange={formik.handleChange} />

                                    {formik.submitCount && formik.errors.level ? <div className="mt-1 text-danger">{formik.errors.level}</div> : ''}
                                </div>
                            </div>
                            <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
                                <div>
                                    <label htmlFor="teacher">Teacher </label>
                                    <ReactSelect
                                        options={options}
                                        isSearchable
                                        name="teacher"
                                        onChange={(option: any) => onTeacherChange(option)}
                                        onBlur={formik.handleBlur('teacher')}
                                        formatOptionLabel={formatOptionLabel}
                                        id="teacher"
                                        className={formik.submitCount ? (formik.errors.teacher ? 'has-error' : '') : ''}
                                        value={selectValue}
                                    />

                                    {formik.submitCount && formik.errors.teacher ? <div className="mt-1 text-danger">{formik.errors.teacher}</div> : ''}
                                </div>

                                <div className={formik.submitCount ? (formik.errors.email ? 'has-error' : '') : ''}>
                                    <label htmlFor="email">Email</label>
                                    <input
                                        name="email"
                                        type="text"
                                        id="email"
                                        placeholder="Select teacher first"
                                        className="form-input cursor-not-allowed disabled:pointer-events-none disabled:bg-[#eee] dark:disabled:bg-[#1b2e4b]"
                                        disabled
                                        value={formik.values.email}
                                    />
                                    {formik.submitCount && formik.errors.email ? <div className="mt-1 text-danger">{formik.errors.email}</div> : ''}
                                </div>

                                <div className={formik.submitCount ? (formik.errors.phone ? 'has-error' : '') : ''}>
                                    <label htmlFor="phone">Phone</label>
                                    <input
                                        name="phone"
                                        type="text"
                                        id="phone"
                                        placeholder="Select teacher first"
                                        className="form-input cursor-not-allowed disabled:pointer-events-none disabled:bg-[#eee] dark:disabled:bg-[#1b2e4b]"
                                        disabled
                                        value={formik.values.phone}
                                    />
                                    {formik.submitCount && formik.errors.phone ? <div className="mt-1 text-danger">{formik.errors.phone}</div> : ''}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-5 md:grid-cols-6">
                                <div className={formik.submitCount ? (formik.errors.startTime ? 'has-error' : '') : ''}>
                                    <label htmlFor="startTime">Start Time </label>
                                    <Flatpickr
                                        data-enable-time
                                        options={{
                                            enableTime: true,
                                            dateFormat: 'Y-m-d H:i',
                                            position: 'auto left',
                                        }}
                                        placeholder="Select Start time"
                                        className="form-input"
                                        onChange={([date]) => formik.setFieldValue('startTime', date.toString())}
                                        defaultValue={formik.values.startTime}
                                        id="startTime"
                                    />

                                    {formik.submitCount && formik.errors.startTime ? <div className="mt-1 text-danger">{formik.errors.startTime}</div> : ''}
                                </div>

                                <div className={formik.submitCount ? (formik.errors.endTime ? 'has-error' : '') : ''}>
                                    <label htmlFor="endTime">End Time </label>
                                    <Flatpickr
                                        data-enable-time
                                        options={{
                                            enableTime: true,
                                            dateFormat: 'Y-m-d H:i',
                                            position: 'auto left',
                                        }}
                                        placeholder="Select End time"
                                        className="form-input"
                                        onChange={([date]) => formik.setFieldValue('endTime', date.toString())}
                                        defaultValue={formik.values.endTime}
                                        id="endTime"
                                    />

                                    {formik.submitCount && formik.errors.endTime ? <div className="mt-1 text-danger">{formik.errors.endTime}</div> : ''}
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="btn btn-primary !mt-6"
                                onClick={() => {
                                    if (Object.keys(formik.touched).length !== 0 && Object.keys(formik.errors).length === 0) {
                                        submitForm();
                                    }
                                }}
                            >
                                Submit Form
                            </button>
                        </form>
                    </div>
                </div>

                <StudentsClass />
            </div>
        </div>
    );
};

export default ClassForm;
