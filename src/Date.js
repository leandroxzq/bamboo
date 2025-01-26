export const formattedDateUser = (dateString) => {
    const [date] = dateString.split('T');

    const [year, month, day] = date.split('-');

    return `${day}-${month}-${year}`;
};
