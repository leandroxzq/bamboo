import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';

export const formattedPostUser = (dateString) => {
    const date = dayjs(dateString).locale('pt-br');

    return date.format('D [de] MMMM, YYYY');
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
