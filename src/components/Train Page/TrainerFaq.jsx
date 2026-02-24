import React from "react";

const TrainerFaq = () => {
  return (
    <section className="mx-4 m-6 mt-[52px] flex flex-col items-center justify-between rounded-3xl bg-background p-4 md:mx-[52px] md:mt-[100px] md:flex-row md:p-0 md:px-[52px] xxl:mx-auto max-w-page self-stretch justify-self-stretch">
      
      {/* LEFT CONTENT */}
      <div className="flex flex-col gap-6 text-center md:text-left">
        <h2 className="text-2xl font-bold leading-[1.5] text-main md:text-[32px]">
          Are you a trainer / Academy?
        </h2>

        {/* ACTION BUTTONS */}
        <div className="flex w-full justify-center gap-6 md:justify-start">
          <a
            href="https://train-with-us.playo.co/"
            title="List with us"
            target="_blank"
            rel="noreferrer"
          >
            <div className="inline-block cursor-pointer rounded-2xl bg-[#00b562] px-4 py-3 text-center text-[14px] font-bold leading-6 tracking-wider text-background shadow-[0_4px_0_0_#00914e] transition-all hover:bg-green-700 md:text-[16px]">
              LIST WITH US
            </div>
          </a>

          <a
            href="https://playo.freshdesk.com/support/solutions"
            title="Frequently Asked Questions"
            target="_blank"
            rel="noreferrer"
          >
            <div className="inline-block cursor-pointer rounded-2xl border border-[#e3e8e6] bg-background px-4 py-3 text-center text-[14px] font-bold leading-6 tracking-wider text-main shadow-[0_4px_0_0_#d6dcd9] transition-all md:max-w-[80px] md:w-auto md:grow-0 md:text-[16px]">
              FAQs
            </div>
          </a>
        </div>
      </div>

      {/* RIGHT IMAGE */}
      <div className="mt-4 h-[220px] w-[165px] md:mt-0">
        <img
          src="https://playo-website.gumlet.io/playo-website-v3/icons/trainer/list-with-us.png"
          alt="Are you a trainer/Academy?"
          title="Are you a trainer/Academy?"
          className="h-full w-full object-contain"
        />
      </div>
    </section>
  );
};

export default TrainerFaq;
