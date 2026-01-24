import React from "react";

const AboutTheVeloHome = () => {
  return (
    <section className="p-4 md:p-14 flex flex-col gap-6 items-center justify-between md:flex-row">

      {/* LEFT CONTENT */}
      <section className="flex flex-col gap-6 md:max-w-[526px] w-full">

        {/* Heading + Description */}
        <section className="flex flex-col gap-2">
          <div className="text-left self-stretch font-bold leading-[1.58] text-main text-2xl">
            About the Velo
          </div>

          <div className="text-base leading-[1.5] text-[#758a80] self-stretch">
            Velo is a sports-tech platform that helps players discover venues,
            join games, and connect with like-minded athletes. From booking
            turfs to finding matches nearby, Velo makes playing sports simple,
            social, and seamless.
          </div>
        </section>

        {/* ACTION BUTTONS */}
        <section className="flex flex-col md:flex-row gap-4">

          {/* Mobile Primary */}
          <a
            href="/join"
            className="md:hidden flex justify-center items-center py-3 px-6
                       rounded-2xl bg-[#00b562]
                       shadow-[0_4px_0_0_#00914e]
                       font-bold text-[14px] leading-6
                       text-white tracking-wider
                       hover:bg-green-700"
          >
            JOIN VELO
          </a>

          {/* Desktop Primary */}
          <a
            href="/about"
            className="hidden md:flex justify-center items-center py-3 px-6
                       rounded-2xl bg-[#00b562]
                       shadow-[0_4px_0_0_#00914e]
                       font-bold text-[16px] leading-6
                       text-white tracking-wider
                       hover:bg-green-700"
          >
            READ OUR STORY
          </a>

          {/* Mobile Secondary */}
          <a
            href="/how-it-works"
            className="md:hidden flex justify-center items-center py-3 px-6
                       rounded-2xl bg-background
                       font-bold text-[14px] leading-6
                       text-[#3b4540] tracking-wider
                       border border-main"
          >
            HOW VELO WORKS
          </a>

          {/* Desktop Secondary */}
          <a
            href="/careers"
            className="hidden md:flex justify-center items-center py-3 px-6
                       rounded-2xl bg-background
                       font-bold text-[16px] leading-6
                       text-[#3b4540] tracking-wider
                       border border-main"
          >
            WE ARE BUILDING VELO
          </a>
        </section>
      </section>

      {/* RIGHT IMAGES */}
      <section className="flex flex-col gap-5 md:max-w-[448px] w-full relative">

        {/* Decorative Corner (desktop only) */}
        <section className="hidden absolute md:flex justify-center items-center w-9 h-11 -left-9 -top-5">
          <img
            src="https://playo-website.gumlet.io/playo-website-v3/icons/AboutUs_Image_Corner.png?q=30"
            alt="Corner decoration"
            className="w-[37px] h-auto"
          />
        </section>

        {/* TOP IMAGES */}
        <section className="flex gap-5 w-full">

          {/* Left column images (desktop only) */}
          <section className="hidden md:flex flex-col gap-5">
            <img
              src="https://playo-website.gumlet.io/playo-website-v3/icons/AboutUs_Image_sitting.png?q=30"
              alt="Community"
              className="w-[136px] h-auto"
            />
            <img
              src="https://playo-website.gumlet.io/playo-website-v3/icons/Playo_AboutUs_Horizontal.png?q=30"
              alt="Velo logo"
              className="w-[136px] h-auto"
            />
          </section>

          {/* Main image */}
          <img
            src="https://playo-website.gumlet.io/playo-website-v3/icons/AboutUs_Image.png?q=30"
            alt="Sports"
            className="w-full md:w-[293px] h-auto rounded-lg"
          />
        </section>

        {/* BOTTOM IMAGES (desktop only) */}
        <section className="hidden md:flex gap-5">
          <img
            src="https://playo-website.gumlet.io/playo-website-v3/icons/AboutUs_Image_Jithin.png?q=30"
            alt="Players"
            className="w-[119px] h-auto"
          />
          <img
            src="https://playo-website.gumlet.io/playo-website-v3/icons/AboutUs_Image_Turf.png?q=30"
            alt="Turf"
            className="w-[119px] h-auto"
          />
          <img
            src="https://playo-website.gumlet.io/playo-website-v3/icons/AboutUs_Image_batting.png?q=30"
            alt="Batting"
            className="w-[119px] h-auto"
          />
          <img
            src="https://playo-website.gumlet.io/playo-website-v3/icons/AboutUs_Playo_Vertical.png?q=30"
            alt="Vertical branding"
            className="w-[35px] h-auto"
          />
        </section>
      </section>
    </section>
  );
};

export default AboutTheVeloHome;
