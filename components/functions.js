export const timeStampToDate = (date) => {
    date = new Date(+date)
    const [month, day] = date.toLocaleDateString().split('/')
    const year = date.getFullYear();
    const [hr, mn] = date.toLocaleTimeString().split(':')
    const dateString = `${day}-${month}-${year}`
    let hrs
    hr > 12 ? (hrs = hr - 12) : hrs = hr;
    hrs < 10 ? hrs = `0${hrs}` : null
    const timeString = `${hrs}:${mn} ${hr > 12 ? "pm" : "am"}`
    const fullDate = `${dateString} ${timeString}`
    return fullDate
}