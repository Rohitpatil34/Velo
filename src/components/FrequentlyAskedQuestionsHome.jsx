import React, { useState } from "react";

const FAQS = [
  {
    question:
      "How can I use Velo to book sports venues or join sports activities?",
    answer:
      "You can use Velo to discover nearby sports venues, book slots instantly, or join games hosted by other players based on your interests and skill level.",
  },
  {
    question:
      "What is the Velo Partner App, and how does it help venue owners?",
    answer:
      "The Velo Partner App helps venue owners manage bookings, payments, schedules, and visibility, all from one dashboard.",
  },
  {
    question:
      "Can I reschedule or cancel a booking made on Velo?",
    answer:
      "Yes, bookings can be rescheduled or cancelled based on the venue’s cancellation policy, directly from the app.",
  },
  {
    question: "What is Karma on Velo?",
    answer:
      "Karma is a trust score that reflects your reliability as a player, based on participation, punctuality, and community feedback.",
  },
  {
    question: "How do I host a game on Velo?",
    answer:
      "You can host a game by selecting a sport, venue, time slot, and inviting players. Others can discover and join your game easily.",
  },
  {
    question: "How do I contact Velo support?",
    answer:
      "You can contact Velo support through the Help section in the app or by emailing support@velo.com.",
  },
  {
    question: "What are the benefits of using Velo?",
    answer:
      "Velo makes sports accessible, social, and seamless by combining venue booking, player discovery, and community features.",
  },
];

const FrequentlyAskedQuestionsHome = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="p-6">
      <h3 className="font-bold leading-9 text-xl mb-8">
        Frequently Asked Questions
      </h3>

      <ul className="list-disc pl-4">
        {FAQS.map((faq, index) => (
          <li
            key={index}
            className="border-b py-4 last:border-none first:pt-0 last:pb-0"
          >
            {/* Question */}
            <button
              onClick={() => toggle(index)}
              className="flex w-full items-center gap-x-4 font-medium text-left"
            >
              {faq.question}

              <img
                src="https://playo-website.gumlet.io/playo-website-v3/icons/down_arrow.png"
                alt="toggle"
                className={`ml-auto transition-transform duration-300 ${
                  openIndex === index ? "rotate-180" : ""
                }`}
                width={16}
                height={16}
              />
            </button>

            {/* Answer */}
            {openIndex === index && (
              <p className="mt-3 text-sm leading-6 text-[#758a80]">
                {faq.answer}
              </p>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default FrequentlyAskedQuestionsHome;
