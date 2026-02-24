import React, { useState } from "react";

const FiltersTrain = ({ filters, setFilters }) => {
  const [open, setOpen] = useState(null);

  /* Toggle multi-select array filters */
  const toggleArrayFilter = (key, value) => {
    setFilters(prev => {
      const exists = prev[key].includes(value);

      return {
        ...prev,
        [key]: exists
          ? prev[key].filter(v => v !== value)
          : [...prev[key], value],
      };
    });
  };

  /* Toggle coach / academy */
  const toggleType = (type) => {
    if (type === "coach") {
      setFilters(prev => ({
        ...prev,
        coachOnly: !prev.coachOnly,
        academyOnly: false,
      }));
    } else {
      setFilters(prev => ({
        ...prev,
        academyOnly: !prev.academyOnly,
        coachOnly: false,
      }));
    }
  };

  const servicesList = [
    "badminton",
    "football",
    "cricket",
    "swimming",
    "tennis",
    "yoga",
    "fitness",
    "nutrition",
    "physio",
    "pickleball",
  ];

  const ageList = ["kids", "adults"];
  const batchList = ["1-on-1", "group", "online"];

  return (
    <div className="w-full flex justify-center mt-6">
      <div className="flex gap-3 flex-wrap relative">

        {/* SERVICES */}
        <div className="relative">
          <button
            onClick={() => setOpen(open === "service" ? null : "service")}
            className={`px-4 py-2 rounded-2xl border font-medium
              ${filters.service.length ? "bg-blue-100 border-blue-500" : "bg-white"}
            `}
          >
            Services {filters.service.length > 0 && `(${filters.service.length})`}
          </button>

          {open === "service" && (
            <div className="absolute z-50 mt-2 w-64 bg-white shadow-xl rounded-2xl border p-4 flex flex-col gap-3">
              {servicesList.map(s => (
                <label key={s} className="flex justify-between cursor-pointer">
                  <span className="capitalize">{s}</span>
                  <input
                    type="checkbox"
                    checked={filters.service.includes(s)}
                    onChange={() => toggleArrayFilter("service", s)}
                  />
                </label>
              ))}
            </div>
          )}
        </div>

        {/* AGE */}
        <div className="relative">
          <button
            onClick={() => setOpen(open === "age" ? null : "age")}
            className={`px-4 py-2 rounded-2xl border font-medium
              ${filters.age.length ? "bg-blue-100 border-blue-500" : "bg-white"}
            `}
          >
            Age {filters.age.length > 0 && `(${filters.age.length})`}
          </button>

          {open === "age" && (
            <div className="absolute z-50 mt-2 w-48 bg-white shadow-xl rounded-2xl border p-4 flex flex-col gap-3">
              {ageList.map(a => (
                <label key={a} className="flex justify-between cursor-pointer">
                  <span className="capitalize">{a}</span>
                  <input
                    type="checkbox"
                    checked={filters.age.includes(a)}
                    onChange={() => toggleArrayFilter("age", a)}
                  />
                </label>
              ))}
            </div>
          )}
        </div>

        {/* BATCH */}
        <div className="relative">
          <button
            onClick={() => setOpen(open === "batch" ? null : "batch")}
            className={`px-4 py-2 rounded-2xl border font-medium
              ${filters.batch.length ? "bg-blue-100 border-blue-500" : "bg-white"}
            `}
          >
            Batch {filters.batch.length > 0 && `(${filters.batch.length})`}
          </button>

          {open === "batch" && (
            <div className="absolute z-50 mt-2 w-48 bg-white shadow-xl rounded-2xl border p-4 flex flex-col gap-3">
              {batchList.map(b => (
                <label key={b} className="flex justify-between cursor-pointer">
                  <span>{b}</span>
                  <input
                    type="checkbox"
                    checked={filters.batch.includes(b)}
                    onChange={() => toggleArrayFilter("batch", b)}
                  />
                </label>
              ))}
            </div>
          )}
        </div>
        {/* DISTANCE */}
        <div className="relative min-w-[120px]">
          <button
            onClick={() => setOpen(open === "distance" ? null : "distance")}
            className="flex items-center gap-2 px-2 md:px-4 py-2 rounded-2xl border bg-white border-gray-200"
          >
            Distance ({filters.distance} km)
          </button>

          {open === "distance" && (
            <div className="absolute top-[48px] left-0 w-[180px] bg-white border rounded-2xl shadow-lg p-3 flex flex-col gap-2 z-50">
              {[5, 10, 25, 50].map(d => (
                <button
                  key={d}
                  onClick={() => {
                    setFilters(prev => ({ ...prev, distance: d }));
                    setOpen(null);
                  }}
                  className={`text-left px-3 py-2 rounded-lg hover:bg-gray-100
            ${filters.distance === d ? "bg-blue-100" : ""}
          `}
                >
                  {d} km
                </button>
              ))}
            </div>
          )}
        </div>


        {/* COACH ONLY */}
        <button
          onClick={() => toggleType("coach")}
          className={`px-4 py-2 rounded-2xl border font-medium
            ${filters.coachOnly ? "bg-blue-100 border-blue-500" : "bg-white"}
          `}
        >
          Coach Only
        </button>

        {/* ACADEMY ONLY */}
        <button
          onClick={() => toggleType("academy")}
          className={`px-4 py-2 rounded-2xl border font-medium
            ${filters.academyOnly ? "bg-blue-100 border-blue-500" : "bg-white"}
          `}
        >
          Academy Only
        </button>

      </div>
    </div>
  );
};

export default FiltersTrain;
