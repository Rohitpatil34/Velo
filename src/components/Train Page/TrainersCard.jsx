import React from "react";

const TrainersCard = () => {
  return (
    <a
      href="/trainer/details/BACK2BASICS-99953"
      title="BACK2BASICS"
      className="block h-full max-w-sm cursor-pointer overflow-hidden rounded-2xl border border-[#e3e8e6] bg-white shadow-[0_4px_12px_0_rgba(59,69,64,0.1)]"
    >
      {/* TOP BADGES */}
      <div className="flex items-center justify-between p-4 pb-6">
        <div className="relative flex grow items-center">
          <div className="absolute flex items-center gap-1 rounded-full">
            <div className="h-8 w-8 overflow-hidden rounded-full border border-[#e3e8e6] bg-white">
              <img
                src="https://playov2.gumlet.io/trainer_service_icon/TS7FitnessTrainer.png"
                alt="Fitness Trainer"
                className="h-full w-full"
              />
            </div>
            <div className="h-8 w-8 overflow-hidden rounded-full border border-[#e3e8e6] bg-white">
              <img
                src="https://playov2.gumlet.io/trainer_service_icon/TS9Nutrition.png"
                alt="Nutrition"
                className="h-full w-full"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center">
          <div className="rounded-lg bg-main px-2 py-1 text-white">
            <span className="text-sm font-medium">★ New</span>
          </div>
        </div>
      </div>

      {/* IMAGE SCROLLER */}
      <div className="relative pb-6">
        <div className="flex gap-3 overflow-x-auto scrollbar-hide">
          {/* IMAGE 1 */}
          <ImageCard
            src="https://playo-website.gumlet.io/playo-website-v3/icons/trainer/Placeholder_Academy.png?q=20"
            label="Academy"
          />

          {/* IMAGE 2 */}
          <ImageCard src="https://playov2.gumlet.io/profiles/1762532842714-blob?q=20" />

          {/* IMAGE 3 */}
          <ImageCard src="https://playov2.gumlet.io/profiles/1762532842691-blob?q=20" />

          {/* IMAGE 4 */}
          <ImageCard src="https://playov2.gumlet.io/profiles/1762532842809-blob?q=20" />
        </div>
      </div>

      {/* DETAILS */}
      <div className="flex flex-col gap-2 px-4">
        <h2 className="w-[95%] truncate text-left text-xl font-bold text-main">
          BACK2BASICS
        </h2>

        <div className="truncate text-sm font-medium text-main">
          Bengaluru, Bengaluru, Karnataka, India
        </div>

        {/* AGE GROUP */}
        <div className="flex items-center gap-2 text-xs font-medium text-[#758a80] md:text-base">
          <img
            src="https://playo-website.gumlet.io/playo-website-v3/icons/trainer/kidsAdult.png"
            alt="Adults & Kids"
            width={24}
            height={24}
          />
          <span className="rounded-md text-sm font-medium text-main">
            Adults &amp; Kids
          </span>
        </div>

        {/* CTA */}
        <div className="flex flex-col gap-2 pb-4">
          <div className="w-full cursor-pointer rounded-2xl border border-[#e3e8e6] bg-background px-4 py-3 text-center text-xs font-bold uppercase tracking-wider text-main shadow-[0_4px_0_0_#d6dcd9] transition-all md:w-auto md:text-sm">
            Instant Connect 🚀
          </div>
          <div className="pb-2 text-center text-sm text-gray-500">
            6 showed Interest
          </div>
        </div>
      </div>
    </a>
  );
};

/* IMAGE CARD COMPONENT */
const ImageCard = ({ src, label }) => {
  return (
    <div className="relative flex h-[132px] max-h-[132px] flex-shrink-0 gap-3 first:ml-4 last:mr-4">
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
};

export default TrainersCard;
