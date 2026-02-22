import React from "react";

const TrainerProfileAbout = ({ trainer }) => {
  if (!trainer) return null;

  const {
    availableDays = [],
    pricing = "",
    about = "",
    certifications = [],
    certImages = [],
  } = trainer;

  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return (
    <div className="md:p-6 flex-col bg-white rounded-2xl border flex">

      {/* Available Days */}
      <div className="py-4 md:pt-0 md:pb-6 flex flex-col gap-6 relative w-full">
        <h2 className="block font-bold w-full px-4 md:px-0">Available on</h2>

        <div className="w-full overflow-auto no-scrollbar flex md:grid md:grid-cols-7">
          {days.map((day, index) => {
            const active = availableDays.includes(day);

            return (
              <div
                key={index}
                className="flex justify-center items-center border border-[#e3e8e6] border-r-0 last:border-r w-[100px] md:w-auto first:rounded-tl-lg first:rounded-bl-lg last:rounded-br-lg last:rounded-r-lg"
              >
                <div className="flex items-center gap-2 px-3 py-2">
                  <div
                    className={`w-4 h-4 flex items-center justify-center border-2 rounded-full ${
                      active
                        ? "bg-primary border-primary"
                        : "bg-[#F1F3F2] border-[#F1F3F2]"
                    }`}
                  >
                    {active && (
                      <svg
                        className="w-4 h-4 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    )}
                  </div>
                  <div className="font-medium text-main">{day}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Pricing */}
      <div className="mx-4 md:px-0 md:mx-0 py-4 md:py-6 flex flex-col md:flex-row gap-6 border-b">
        <span className="md:w-[172px] w-full font-bold">Pricing</span>
        <span className="md:w-[708px] break-words">
          {pricing || "Pricing not provided"}
        </span>
      </div>

      {/* About Coach */}
      <div className="mx-4 md:px-0 md:mx-0 py-4 md:py-6 flex flex-col md:flex-row gap-6 border-b">
        <div className="md:w-[172px] font-bold">About Coach</div>
        <div className="md:w-[708px]">
          {about || "No description available"}
        </div>
      </div>

      {/* Certifications */}
      <div className="mx-4 md:px-0 md:mx-0 py-4 md:py-6 flex flex-col md:flex-row gap-6">
        <span className="md:w-[172px] font-bold">
          Certifications & Awards 🎓
        </span>

        <div className="flex flex-col gap-4">

          {/* Images */}
          <div className="flex gap-6">
            {certImages.map((img, i) => (
              <div key={i} className="w-20 h-20 rounded-lg overflow-hidden">
                <img
                  src={img}
                  alt="certificate"
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>

          {/* List */}
          <ul className="text-sm text-main list-disc pl-5">
            {certifications.map((c, i) => (
              <li key={i}>{c}</li>
            ))}
          </ul>

        </div>
      </div>
    </div>
  );
};

export default TrainerProfileAbout;
