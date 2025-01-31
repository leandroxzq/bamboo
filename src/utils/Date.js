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

export const formatDate = (dob) => {
    const date = new Date(dob);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');

    return `${year}-${month}-${day}`;
};
