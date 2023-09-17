export const getRandomNumber = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const formatDate = (date: Date, format: string = 'yyyy-mm-dd') => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    const formatMonth = month < 10 ? `0${month}` : month;
    const formatDay = day < 10 ? `0${day}` : day;

    return format.replace('yyyy', year.toString()).replace('mm', formatMonth.toString()).replace('dd', formatDay.toString());
};
