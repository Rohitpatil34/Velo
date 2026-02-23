import React, { useRef } from "react";
import BlogsCard from "./BlogsCard";

const BLOGS = [
  {
    href: "https://blog.playo.co/here-are-the-dimensions-of-a-volleyball-court/",
    image: "https://d20rwxqzk8p5vr.cloudfront.net/wp-content/uploads/2018/09/83de99b7a72b7e0b9ff755c60efc8623.gif",
    title: "Learn Volleyball in 5!",
    description: "The most simplified Volleyball manual you’ll need",
    date: "SEPTEMBER 26, 2018",
    author: "PLAYO",
  },
  {
    href: "https://blog.playo.co/legends-of-cricket/",
    image: "https://d20rwxqzk8p5vr.cloudfront.net/wp-content/uploads/2016/03/9836_mr.jpg",
    title: "Names Celebrated by Cricket",
    description: "Understand what it takes to become a Cricket icon!",
    date: "MARCH 3, 2016",
    author: "SHERYL THOMAS",
  },
  {
    href: "https://blog.playo.co/badminton-hand-signals-and-what-they-mean/",
    image: "https://d20rwxqzk8p5vr.cloudfront.net/wp-content/uploads/2019/08/Venues-Blog-cover-Image.png",
    title: "Easy-to-Learn Badminton Signals",
    description: "Get a peek of game-basics that’ll surely come in handy!",
    date: "AUGUST 2, 2019",
    author: "NIDHI PATEL",
  },
  {
    href: "https://blog.playo.co/spectators-guide-what-to-wear-and-bring-to-a-golf-tournament/",
    image: "https://d20rwxqzk8p5vr.cloudfront.net/wp-content/uploads/2017/09/featured-image-7.jpg",
    title: "A Spectator’s Tournament Guide",
    description: "This is how you go prepped for a Golf tournament!",
    date: "JANUARY 12, 2022",
    author: "PLAYO",
  },
  {
    href: "https://blog.playo.co/the-5-different-types-of-kicks-in-football/",
    image: "https://d20rwxqzk8p5vr.cloudfront.net/wp-content/uploads/2017/04/4.png",
    title: "Take Football Shots Like a ‘PRO’",
    description: "Learn what it takes to master popular Football shots",
    date: "APRIL 15, 2017",
    author: "ARJUN THOMAS",
  },
  {
    href: "https://blog.playo.co/7-places-in-bangalore-for-fun-sports/",
    image: "https://d20rwxqzk8p5vr.cloudfront.net/wp-content/uploads/2017/04/water-zorbing-in-bangalore.jpg",
    title: "Adventure-ing in Bangalore",
    description: "Understand how & where to look for Adventures in B’lore",
    date: "APRIL 26, 2017",
    author: "PLAYO",
  },
  {
    href: "https://blog.playo.co/10-inspiring-sports-stories-from-being-a-failure-to-success/",
    image: "https://d20rwxqzk8p5vr.cloudfront.net/wp-content/uploads/2017/03/dhoni-blog-coverimage1.jpg",
    title: "The Best Comebacks in Sport",
    description: "10 icons who used failure as stepping stones to success",
    date: "MARCH 13, 2017",
    author: "ANUBHAV RODA",
  },
  {
    href: "https://blog.playo.co/17-cricket-records-that-are-nearly-impossible-to-break/",
    image: "https://d20rwxqzk8p5vr.cloudfront.net/wp-content/uploads/2021/03/10-Cricket-Records-That-are-Nearly-Impossible-to-Break.jpg",
    title: "Untouchable Cricket Records",
    description: "Get a peek into records set after years of perseverance",
    date: "APRIL 13, 2022",
    author: "PLAYO",
  },
  {
    href: "https://blog.playo.co/all-about-badminton/",
    image: "https://d20rwxqzk8p5vr.cloudfront.net/wp-content/uploads/2022/09/Highcompressed_578856886-scaled.jpg",
    title: "Learn Badminton in 5!",
    description: "All the need-to-knows before you start Badminton",
    date: "JULY 7, 2022",
    author: "PRATHEEK SURYADEV",
  },
  {
    href: "https://blog.playo.co/top-10-fat-burning-sports/",
    image: "https://d20rwxqzk8p5vr.cloudfront.net/wp-content/uploads/2017/10/fat-burning-sports.jpg",
    title: "The Best Sports to Burn Calories",
    description: "Understand how to get rid of rigid body fat, the fun way",
    date: "OCTOBER 3, 2017",
    author: "KAMESWARI KOVVALI",
  },

];

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
    <section className="md:mx-12 mx-4 mt-14 xxl:mx-auto max-w-page md:py-12 py-6 bg-white md:rounded-3xl rounded-2xl">

      <h3 className="font-bold leading-9 mx-4 md:mx-12 md:text-2xl text-xl mb-6 text-[#3B4540]">
        Blogs to Keep You Fit!
      </h3>

      <div className="relative overflow-hidden">

        <div
          ref={scrollRef}
          className="flex no-scrollbar"
          style={{ overflowX: "auto", whiteSpace: "nowrap" }}
        >
          {BLOGS.map((blog, index) => (
            <BlogsCard key={index} {...blog} />
          ))}
        </div>

        {/* Arrows */}
        <div className="flex justify-center items-center mb-6 gap-3">
          <button
            onClick={() => scroll("left")}
            className="transform bg-white w-11 h-11 rounded-full shadow-[0_4px_12px_0_rgba(0,0,0,0.1)] flex justify-center items-center"
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
            onClick={() => scroll("right")}
            className="transform bg-white w-11 h-11 rounded-full shadow-[0_4px_12px_0_rgba(0,0,0,0.1)] flex justify-center items-center"
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