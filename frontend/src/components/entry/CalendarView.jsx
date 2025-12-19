import { useState } from "react";
import { useGetEntriesQuery } from "../../redux/api/entriesApiSlice";
import { useNavigate } from "react-router-dom";

const CalendarView = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const { data: getEntries } = useGetEntriesQuery();
  const navigate = useNavigate();

  const entries = getEntries?.data || [];

  // Get entries map by date (YYYY-MM-DD)
  const entriesByDate = entries.reduce((acc, entry) => {
    const date = new Date(entry.date).toISOString().split("T")[0];
    if (!acc[date]) acc[date] = [];
    acc[date].push(entry);
    return acc;
  }, {});

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const daysInMonth = lastDayOfMonth.getDate();
  const startingDayOfWeek = firstDayOfMonth.getDay();

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const previousMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const handleDateClick = (day) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    if (entriesByDate[dateStr]) {
      navigate("/entries");
    }
  };

  const renderCalendarDays = () => {
    const days = [];

    // Empty cells for days before month starts
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(<div key={`empty-${i}`} className="p-2"></div>);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
      const hasEntry = entriesByDate[dateStr];
      const entryCount = hasEntry ? entriesByDate[dateStr].length : 0;
      const isToday = new Date().toISOString().split("T")[0] === dateStr;

      days.push(
        <div
          key={day}
          onClick={() => hasEntry && handleDateClick(day)}
          className={`
            relative p-2 h-16 border border-base-300 rounded-lg
            flex flex-col items-center justify-center
            ${hasEntry ? "bg-primary/20 cursor-pointer hover:bg-primary/30" : "bg-base-200"}
            ${isToday ? "ring-2 ring-primary" : ""}
            transition-all
          `}
        >
          <span className={`text-sm ${isToday ? "font-bold" : ""}`}>{day}</span>
          {hasEntry && (
            <div className="absolute bottom-1 flex gap-0.5">
              {entriesByDate[dateStr].slice(0, 3).map((entry, idx) => (
                <span key={idx} className="text-xs">
                  {entry.mood}
                </span>
              ))}
              {entryCount > 3 && (
                <span className="text-xs font-bold">+{entryCount - 3}</span>
              )}
            </div>
          )}
        </div>
      );
    }

    return days;
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="bg-base-200 rounded-3xl shadow-xl p-6">
        {/* Calendar Header */}
        <div className="flex justify-between items-center mb-6">
          <button onClick={previousMonth} className="btn btn-circle btn-sm">
            ❮
          </button>
          <h2 className="text-2xl font-bold">
            {monthNames[month]} {year}
          </h2>
          <button onClick={nextMonth} className="btn btn-circle btn-sm">
            ❯
          </button>
        </div>

        {/* Days of Week */}
        <div className="grid grid-cols-7 gap-2 mb-2">
          {daysOfWeek.map((day) => (
            <div key={day} className="text-center font-semibold text-sm p-2">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-2">
          {renderCalendarDays()}
        </div>

        {/* Legend */}
        <div className="mt-6 flex items-center justify-center gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-primary/20 rounded"></div>
            <span>Has entries</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-primary rounded"></div>
            <span>Today</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarView;
