import React from "react";
import { Link } from "react-router-dom";


const TrainersCard = ({ trainer, onConnect, onViewQuery }) => {
  if (!trainer) return null;

  const {
    _id,
    name,
    type,
    location = {},
    services = [],
    ageGroups = [],
    images = [],
    interestCount = 0,
    userQuery,
  } = trainer;

  const city = location?.city;
  const area = location?.area;


  return (
    <Link
      to={`/trainer/details/${_id}`}
      title={name}
      className="block h-full max-w-sm cursor-pointer overflow-hidden rounded-2xl border border-[#e3e8e6] bg-white shadow-[0_4px_12px_0_rgba(59,69,64,0.1)]"
    >
      {/* TOP BADGES */}
      <div className="flex items-center justify-between p-4 pb-6">
        <div className="relative flex grow items-center">
          <div className="absolute flex items-center gap-1 rounded-full">
            {services.slice(0, 2).map((service, index) => (
              <div
                key={index}
                className="h-8 w-8 overflow-hidden rounded-full border border-[#e3e8e6] bg-white"
              >
                <img
                  src={getServiceIcon(service)}
                  alt={service}
                  className="h-full w-full"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center">
          <div className="rounded-lg bg-main px-2 py-1 text-white">
            <span className="text-sm font-medium">
              {type === "academy" ? "Academy" : "Coach"}
            </span>
          </div>
        </div>
      </div>

      {/* IMAGE SCROLLER */}
      <div className="relative pb-6">
        <div className="flex gap-3 overflow-x-auto scrollbar-hide">
          {images.length > 0 ? (
            images.map((img, index) => (
              <ImageCard
                key={index}
                src={img}
                label={index === 0 && type === "academy" ? "Academy" : null}
              />
            ))
          ) : (
            <ImageCard
              src="https://playo-website.gumlet.io/playo-website-v3/icons/trainer/Placeholder_Academy.png"
              label="No Image"
            />
          )}
        </div>
      </div>

      {/* DETAILS */}
      <div className="flex flex-col gap-2 px-4">

        <h2 className="w-[95%] truncate text-left text-xl font-bold text-main">
          {name}
        </h2>

        <div className="truncate text-sm font-medium text-main">
          {area}, {city}
        </div>


        {/* AGE GROUP */}
        {ageGroups.length > 0 && (
          <div className="flex items-center gap-2 text-xs font-medium text-[#758a80] md:text-base">
            <img
              src="https://playo-website.gumlet.io/playo-website-v3/icons/trainer/kidsAdult.png"
              alt="Age Group"
              width={24}
              height={24}
            />
            <span className="rounded-md text-sm font-medium text-main">
              {ageGroups.join(" & ")}
            </span>
          </div>
        )}

        {/* CTA */}
        <div className="flex flex-col gap-2 pb-4">

          {userQuery ? (
            <div
              onClick={(e) => {
                e.preventDefault();
                onViewQuery(userQuery);
              }}
              className="w-full cursor-pointer rounded-2xl bg-gray-200 px-4 py-3 text-center text-xs font-bold uppercase tracking-wider text-main"
            >
              View Query
            </div>
          ) : (
            <div
              onClick={(e) => {
                e.preventDefault();
                onConnect(trainer);
              }}
              className="w-full cursor-pointer rounded-2xl border border-[#e3e8e6] bg-background px-4 py-3 text-center text-xs font-bold uppercase tracking-wider text-main shadow-[0_4px_0_0_#d6dcd9]"
            >
              Instant Connect 🚀
            </div>
          )}

          <div className="pb-2 text-center text-sm text-gray-500">
            {interestCount} showed Interest
          </div>
        </div>

      </div>
    </Link>
  );
};

/* IMAGE CARD */
const ImageCard = ({ src, label }) => (
  <div className="relative flex h-[132px] flex-shrink-0 gap-3 first:ml-4 last:mr-4">
    <div className="relative overflow-hidden rounded-lg">
      <img
        src={src}
        alt="trainer"
        className="h-[132px] max-w-[235px] object-cover aspect-[16/9]"
      />
      {label && (
        <div className="absolute bottom-1 w-full text-center">
          <span className="rounded-md bg-white px-2 py-1 text-sm font-semibold uppercase text-main shadow-sm">
            {label}
          </span>
        </div>
      )}
    </div>
  </div>
);

/* SERVICE ICON MAPPER */
const getServiceIcon = (service) => {
  const map = {
    Badminton:
      "https://playov2.gumlet.io/trainer_service_icon/TS1BadmintonQueuing1.png",
    Football:
      "https://playov2.gumlet.io/trainer_service_icon/SP2_Football_1_(2).png",
    Cricket:
      "https://playov2.gumlet.io/trainer_service_icon/TS3Cricket.png",
    Swimming:
      "https://playov2.gumlet.io/trainer_service_icon/TS4_Swimming.png",
    Tennis:
      "https://playov2.gumlet.io/trainer_service_icon/TS5Tennis.png",
    Yoga:
      "https://playov2.gumlet.io/trainer_service_icon/SP9_Yoga_1.png",
    "Fitness Trainer":
      "https://playov2.gumlet.io/trainer_service_icon/TS7FitnessTrainer.png",
    Physio:
      "https://playov2.gumlet.io/trainer_service_icon/TS8PhysioTheraphy.png",
    Nutrition:
      "https://playov2.gumlet.io/trainer_service_icon/TS9Nutrition.png",
    Pickleball:
      "https://playov2.gumlet.io/NewTrainerServices/Pickleball29.png",
  };

  return (
    map[service] ||
    "https://playo-website.gumlet.io/playo-website-v3/icons/trainer/Sport Icon.png"
  );
};

export default TrainersCard;
