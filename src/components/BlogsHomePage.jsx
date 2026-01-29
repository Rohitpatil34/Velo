import React, { useRef } from "react";
import BlogsCard from "./BlogsCard";

const BlogsHomePage = () => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (!scrollRef.current) return;
    const scrollAmount = 300;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    /* 1️⃣ Top-Level Frame */
    <section className="bg-[#F3F6F4]">
      {/* 2️⃣ White Container */}
      <div className="md:mx-12 mx-4 mt-14 xxl:mx-auto max-w-page bg-white md:py-12 py-6 md:rounded-3xl rounded-2xl">
        {/* 3️⃣ Section Heading */}
        <h3 className="font-bold leading-9 mx-4 md:mx-12 md:text-2xl text-xl mb-6 text-[#3B4540]">
          Blogs to Keep You Fit!
        </h3>

        {/* 4️⃣ Horizontal Carousel */}
        <div className="relative overflow-hidden">
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto no-scrollbar whitespace-nowrap"
          >
            {/* Blog Cards */}
            <BlogsCard />
            <BlogsCard />
            <BlogsCard />
            <BlogsCard />
            <BlogsCard />
            <BlogsCard />
          </div>
        </div>

        {/* 6️⃣ Navigation Arrows */}
        <div className="flex justify-center items-center mt-6 gap-3">
          <button
            type="button"
            onClick={() => scroll("left")}
            className="bg-white w-11 h-11 rounded-full shadow-[0_4px_12px_0_rgba(0,0,0,0.1)]
                       flex justify-center items-center transition-transform active:scale-95"
          >
            <img
              src="https://playo-website.gumlet.io/playo-website-v3/icons/right_arrow.png"
              alt="left"
              width="20"
              height="20"
              className="rotate-180"
            />
          </button>

          <button
            type="button"
            onClick={() => scroll("right")}
            className="bg-white w-11 h-11 rounded-full shadow-[0_4px_12px_0_rgba(0,0,0,0.1)]
                       flex justify-center items-center transition-transform active:scale-95"
          >
            <img
              src="https://playo-website.gumlet.io/playo-website-v3/icons/right_arrow.png"
              alt="right"
              width="20"
              height="20"
            />
          </button>
        </div>
      </div>
    </section>
  );
};

export default BlogsHomePage;
