import { useState, useEffect } from 'react';


export default useDate = () => {
    const [ dateString, setDateString ] = useState(null);

    useEffect(() => {
        const days = [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday' ]
        const months = [
            'January', 
            'February', 
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December'
        ]

        const today = new Date();
        const weekday = days[today.getDay()];
        const dayOfMonth = today.getDate();
        const month = months[today.getMonth()];
        const year = today.getFullYear();

        setDateString(`${weekday}, ${month} ${dayOfMonth}, ${year}.`);
    }, []);


    return [ dateString ];
    
}