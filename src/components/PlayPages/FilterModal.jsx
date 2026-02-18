import { useState, useEffect } from "react";


const TABS = [
  { key: "sort", label: "SORT BY" },
  { key: "time", label: "TIME" },
  { key: "skill", label: "SKILL" },
  { key: "others", label: "OTHERS" },
];

const TAB_OPTIONS = {
  sort: [
    { value: "time_date", label: "Time & Date" },
    { value: "distance", label: "Distance" },
  ],
  time: [
    { value: "morning", label: "Morning (12 AM - 9 AM)" },
    { value: "Day", label: "Afternoon (9 AM - 4 PM)" },
    { value: "Evening", label: "Evening (4 PM - 9 PM)" },
    { value: "Night", label: "Night (9 PM - 12 AM)" },
  ],
  skill: [
    { value: "beginner", label: "Beginner" },
    { value: "Amature", label: "Amature" },
    { value: "intermediate", label: "Intermediate" },
    { value: "Advanced", label: "Advanced" },
    { value: "professional", label: "Professional" },
  ],
  others: [
    { value: "Booked On Velo", label: "Booked On Velo" },
    { value: "Pay & Join", label: "Pay & Join" },
    
  ],
};

// Sort is single-select; all others are multi-select
const MULTI_SELECT_TABS = ["time", "skill", "others"];

export default function FilterModal({ onClose, onApply , initialFilters}) {
  const [activeTab, setActiveTab] = useState("sort");
  const [selected, setSelected] = useState(initialFilters ||{
    sort: null,
    time: [],
    skill: [],
    others: [],
  });
  useEffect(() => {
  if (initialFilters) {
    setSelected(initialFilters);
  }
}, [initialFilters]);

  const isMulti = MULTI_SELECT_TABS.includes(activeTab);
  const options = TAB_OPTIONS[activeTab];

  const isSelected = (value) => {
    const cur = selected[activeTab];
    return isMulti ? cur.includes(value) : cur === value;
  };

  const handleSelect = (value) => {
    setSelected((prev) => {
      if (isMulti) {
        const cur = prev[activeTab];
        return {
          ...prev,
          [activeTab]: cur.includes(value)
            ? cur.filter((v) => v !== value)
            : [...cur, value],
        };
      }
      return { ...prev, [activeTab]: value };
    });
  };

  const handleClear = () => {
    setSelected({ sort: null, time: [], skill: [], others: [] });
  };

  const handleApply = () => {
    onApply?.(selected);
    onClose?.();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/10 ">
      <div className="bg-white rounded-2xl w-[660px] max-w-[95vw] shadow-2xl flex flex-col overflow-hidden">

        {/* Header */}
        <div className="flex items-center justify-between px-7 pt-6 pb-5">
          <h2 className="text-xl font-bold text-gray-900 tracking-tight">
            Filter &amp; Sort By
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
            aria-label="Close"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M1 1l12 12M13 1L1 13"
                stroke="#333"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        <div className="h-px bg-gray-100" />

        {/* Body */}
        <div className="flex flex-1 min-h-[300px]">

          {/* Sidebar */}
          <div className="w-40 bg-gray-50 flex flex-col py-3 gap-1 shrink-0">
            {TABS.map((tab) => {
              const active = activeTab === tab.key;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`mx-2 px-4 py-3.5 rounded-lg text-xs font-bold tracking-widest text-left transition-all duration-150
                    ${active
                      ? "bg-green-500 text-white shadow-sm"
                      : "text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                    }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Options */}
          <div className="flex-1 px-7 py-5 flex flex-col">
            {options.map((opt, i) => {
              const checked = isSelected(opt.value);
              return (
                <div
                  key={opt.value}
                  onClick={() => handleSelect(opt.value)}
                  className={`flex items-center justify-between py-4 cursor-pointer group
                    ${i !== options.length - 1 ? "border-b border-gray-100" : ""}`}
                >
                  <span
                    className={`text-sm font-medium transition-colors
                      ${checked ? "text-gray-900" : "text-gray-500 group-hover:text-gray-700"}`}
                  >
                    {opt.label}
                  </span>

                  {isMulti ? (
                    /* Checkbox */
                    <span
                      className={`w-5 h-5 rounded flex items-center justify-center border-2 shrink-0 transition-all duration-150
                        ${checked
                          ? "bg-green-500 border-green-500"
                          : "bg-white border-gray-300 group-hover:border-gray-400"
                        }`}
                    >
                      {checked && (
                        <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                          <path
                            d="M1.5 5.5l3 3 5-5"
                            stroke="#fff"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </span>
                  ) : (
                    /* Radio */
                    <span
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all duration-150
                        ${checked
                          ? "border-green-500"
                          : "border-gray-300 group-hover:border-gray-400"
                        }`}
                    >
                      {checked && (
                        <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
                      )}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="h-px bg-gray-100" />
        <div className="flex items-center justify-between px-7 py-5">
          <button
            onClick={handleClear}
            className="text-xs font-bold tracking-widest text-gray-500 hover:text-gray-800 transition-colors uppercase"
          >
            Clear Filters
          </button>
          <button
            onClick={handleApply}
            className="bg-green-500 hover:bg-green-600 active:bg-green-700 text-white text-xs font-bold tracking-widest uppercase px-8 py-3.5 rounded-xl transition-colors shadow-md shadow-green-200"
          >
            See Results
          </button>
        </div>

      </div>
    </div>
  );
}
