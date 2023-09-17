import { useSelector } from 'react-redux';
import Select, { Props } from 'react-select';
import { IRootState } from '@/store';

interface IOption extends Props {
    size?: 'default' | 'small';
}

const ReactSelect = (props: IOption) => {
    const isDark = useSelector((state: IRootState) => state.themeConfig.theme) === 'dark' ? true : false;

    return (
        <Select
            {...props}
            styles={{
                input: (base) => ({
                    ...base,
                    // '& input': {
                    //     color: 'white',
                    // },
                }),
                container: (base) => ({
                    ...base,
                    '&.has-error > div:has(input)': {
                        borderColor: 'rgb(231 81 90 / 1)',
                        backgroundColor: 'rgb(231 81 90 / 0.08)',
                    },
                }),
                control: (base) => ({
                    ...base,
                    backgroundColor: isDark ? 'rgb(18 30 50 / 1)' : '#ffffff',
                    borderColor: isDark ? 'rgb(23 38 60 / 1)' : 'rgb(224 230 237 / 1)',
                    color: isDark ? 'rgb(136 142 168 / 1)' : 'rgb(14 23 38 / 1)',
                    ':focus': {
                        borderColor: isDark ? 'rgb(67 97 238 / 1)' : 'rgb(67 97 238 / 1)',
                    },
                }),
                singleValue: (base) => ({
                    ...base,
                    color: isDark ? 'rgb(136 142 168 / 1)' : 'rgb(14 23 38 / 1)',
                }),
                menu: (base) => ({
                    ...base,
                    backgroundColor: isDark ? 'rgb(18 30 50 / 1)' : '#fff',
                    borderColor: isDark ? 'rgb(23 38 60 / 1)' : 'rgb(224 230 237 / 1)',
                    color: isDark ? 'rgb(136 142 168 / 1)' : 'rgb(14 23 38 / 1)',
                    zIndex: 3,
                }),
                indicatorSeparator: (base) => ({
                    ...base,
                    display: 'none',
                }),
            }}
        />
    );
};

export default ReactSelect;
