import React, { useState } from "react";

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function DateDropdown({ onSelect }) {
    const today = new Date();
    const [currentMonth, setCurrentMonth] = useState(new Date());

    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();

    const firstDay = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();

    const monthName = currentMonth.toLocaleString("default", { month: "long" });

    const dates = [];

    for (let i = 0; i < firstDay; i++) dates.push(null);
    for (let i = 1; i <= totalDays; i++) dates.push(i);

    const changeMonth = (dir) => {
        setCurrentMonth(new Date(year, month + dir, 1));
    };

    return (
        <div className="w-80 border rounded-2xl shadow-md py-4 bg-white font-medium">

            {/* Header */}
            <div className="flex justify-between items-center mb-4 px-4">
                <button onClick={() => changeMonth(-1)}>◀</button>
                <span>{monthName} {year}</span>
                <button onClick={() => changeMonth(1)}>▶</button>
            </div>

            {/* Week names */}
            <div className="grid grid-cols-7 gap-1 mb-2 px-4">
                {days.map(d => (
                    <div key={d} className="text-center">{d}</div>
                ))}
            </div>

            {/* Dates */}
            <div className="grid grid-cols-7 gap-1 px-4">
                {dates.map((d, i) => (
                    <div
                        key={i}
                        onClick={() => d && onSelect(new Date(year, month, d))}
                        className="w-10 h-10 flex items-center justify-center cursor-pointer rounded-lg hover:border hover:border-green-500"
                    >
                        {d}
                    </div>
                ))}
            </div>

            {/* CLEAR DATE BUTTON */}
            <button
                className="mt-4 text-red-500 pt-4 border-t w-full"
                onClick={() => onSelect(null)}
            >
                Clear Date
            </button>

        </div>
    );
}
