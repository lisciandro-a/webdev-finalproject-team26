
// references https://stackoverflow.com/questions/3177836/how-to-format-time-since-xxx-e-g-4-minutes-ago-similar-to-stack-exchange-site
export function formatTimestamp(timestamp) {
    const timestampSeconds = parseInt(timestamp);
    const currDateSeconds = new Date().getTime();

    // time in seconds
    const minutes = 60;
    const hour = minutes * 60;
    const day = hour * 24;
    const month = day * 30;
    const year = day * 365;

    const secondsDiff = Math.floor((currDateSeconds - timestampSeconds) / 1000);
    let timeDiff = Math.floor(secondsDiff / year);
    if (timeDiff >= 1) {
        const label = timeDiff === 1 ? 'year' : 'years';
        return `${timeDiff} ${label} ago`;
    }
    timeDiff = Math.floor(secondsDiff / month);
    if (timeDiff >= 1) {
        const label = timeDiff === 1 ? 'month' : 'months';
        return `${timeDiff} ${label} ago`;
    }
    timeDiff = Math.floor(secondsDiff / day);
    if (timeDiff >= 1) {
        const label = timeDiff === 1 ? 'day' : 'days';
        return `${timeDiff} ${label} ago`;
    }
    timeDiff = Math.floor(secondsDiff / hour);
    if (timeDiff >= 1) {
        const label = timeDiff === 1 ? 'hour' : 'hours';
        return `${timeDiff} ${label} ago`;
    }
    timeDiff = Math.floor(secondsDiff / minutes);
    if (timeDiff >= 1) {
        const label = timeDiff === 1 ? 'minute' : 'minutes';
        return `${timeDiff} ${label} ago`;
    }
    return 'moments ago';



}

export function formatTimestampToDate(timestampStr) {
    const timestamp = parseInt(timestampStr);
    const date = new Date(timestamp);
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let hours = date.getHours();
    let label = "am";
    if (hours === 0) {
        hours = 12;
    } else if (hours > 12) {
        hours -= 12;
        label = "pm";
    }
    const minutes = date.getMinutes();
    return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()} ${hours}:${(minutes < 10) ? "0" : ""}${minutes}${label}`
}

export function formatTimestampToDateWithoutTime(timestampStr) {
    const timestamp = parseInt(timestampStr);
    const date = new Date(timestamp);
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
}