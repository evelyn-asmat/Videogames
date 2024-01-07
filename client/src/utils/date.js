export default function maxDate() {
    const today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1;
    let dd = today.getDate();

    mm = mm < 10 ? '0' + mm : mm;
    dd = dd < 10 ? '0' + dd : dd;

    const formattedDate = `${yyyy}-${mm}-${dd}`;
    return formattedDate;
}