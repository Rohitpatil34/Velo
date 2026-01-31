import React from "react";
import VeloLogo from "../assets/Velo.png";

const HomePageFooter = () => {
  return (
    <footer className="w-full text-mute_text pb-0">
      <section className="flex justify-between w-full flex-wrap">
        {/* Left: Logo & Copyright */}
        <div className="mb-14">
          <img
            src={VeloLogo}
            height="100"
            width="100"
            alt="PlayO"
            className="mb-4"
          />

          <div className="py-4 leading-6">
            <p>Created with 💓</p>
            <p>All Rights Reserved.</p>
          </div>
        </div>

        {/* Right: Footer Links */}
        <div className="flex gap-24 flex-wrap">
          {/* Company */}
          <div>
            <h3 className="mb-8 font-medium">Company</h3>
            {[
              "ABOUT US",
              "BLOGS",
              "CONTACT",
              "CAREERS",
              "PARTNER WITH US",
            ].map((item) => (
              <div
                key={item}
                className="my-8 font-bold tracking-[1.4px] cursor-pointer hover:text-black transition"
              >
                {item}
              </div>
            ))}
          </div>

          {/* Social */}
          <div>
            <h3 className="mb-8 font-medium">Social</h3>
            {["INSTAGRAM", "FACEBOOK", "LINKEDIN", "TWITTER"].map((item) => (
              <div
                key={item}
                className="my-8 font-bold tracking-[1.4px] cursor-pointer hover:text-black transition"
              >
                {item}
              </div>
            ))}
          </div>

          {/* Privacy & Terms */}
          <div>
            <h3 className="mb-8 font-medium">Privacy & Terms</h3>
            {[
              "FAQS",
              "PRIVACY POLICY",
              "TERMS OF SERVICE",
              "CANCELLATION POLICY",
            ].map((item) => (
              <div
                key={item}
                className="my-8 font-bold tracking-[1.4px] cursor-pointer hover:text-black transition"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>
    </footer>
  );
};

export default HomePageFooter;
