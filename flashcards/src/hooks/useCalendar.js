import { useState } from "react";
import { getDaysInMonth, transformDays } from "../components/shifts-tables/helpers";

const useCalendar = () =>
{
    const [startDate, setStartDate] = useState(pickStartDate(Date.now(), true));
    const daysInMonth = getDaysInMonth(startDate.getMonth() + 1, startDate.getFullYear());
    const dayMap = transformDays(startDate, daysInMonth);

    function pickStartDate(newDateRaw, isInit = false)
    {
        const newDate = new Date(newDateRaw);
        newDate.setDate(1);
        if (!isInit)
        {
            setStartDate(newDate);
        }
        else
        {
            return newDate;
        }

    }

    function handleDateMonthPrevious()
    {
        pickStartDate(new Date(startDate.setMonth(startDate.getMonth() - 1)));
    }
    function handleDateMonthNext()
    {
        pickStartDate(new Date(startDate.setMonth(startDate.getMonth() + 1)));
    }


    return [startDate, daysInMonth, dayMap, pickStartDate, handleDateMonthPrevious, handleDateMonthNext];
}
export default useCalendar;