export const formattedDateUser = (dateString) => {
    const [date] = dateString.split('T');

    const [year, month, day] = date.split('-');

    return `${day}/${month}/${year}`;
};

export const formatTime = (time) => {
    return time.split(':').slice(0, 2).join(':');
};

export const calculateAge = (date) => {
    const birthDate = new Date(date);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();

    const hasHadBirthdayThisYear =
        today.getMonth() > birthDate.getMonth() ||
        (today.getMonth() === birthDate.getMonth() &&
            today.getDate() >= birthDate.getDate());

    if (!hasHadBirthdayThisYear) {
        age--;
    }

    return age;
};
