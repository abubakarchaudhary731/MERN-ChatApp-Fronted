function getTimeDifference(createdAt) {
    const currentTime = new Date();
    const messageTime = new Date(createdAt);
    const differenceInSeconds = Math.floor((currentTime - messageTime) / 1000);

    if (differenceInSeconds < 60) {
        return differenceInSeconds + 'sec ago';
    } else if (differenceInSeconds < 3600) {
        const minutes = Math.floor(differenceInSeconds / 60);
        return minutes + 'min ago';
    } else if (differenceInSeconds < 86400) {
        const hours = Math.floor(differenceInSeconds / 3600);
        return hours + 'h ago';
    } else {
        const days = Math.floor(differenceInSeconds / 86400);
        return days + 'd ago';
    }
}

export { getTimeDifference }