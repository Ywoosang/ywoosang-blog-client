export const createSlug = (title: string) => {
    return title.trim().split(' ').join('-');
};

export const formatDate = (date: string) => {
    const dateObject = new Date(date);
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = dateObject.toLocaleDateString('ko-KR', options)
    return formattedDate;
}