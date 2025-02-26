import dayjs from 'dayjs';

export const formattedPostUser = (dateString) => {
    const date = dayjs(dateString);

    return date.format('DD/MM/YYYY');
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
