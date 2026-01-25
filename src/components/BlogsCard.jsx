import React from "react";

const BlogsCard = ({
 href="https://blog.playo.co/badminton-hand-signals-and-what-they-mean/",
  image="https://d20rwxqzk8p5vr.cloudfront.net/wp-content/uploads/2019/08/Venues-Blog-cover-Image.png",
  title="Easy-to-Learn Badminton Signals",
  description="Get a peek of game-basics that’ll surely come in handy!",
  date="AUGUST 2, 2019",
  author="NIDHI PATEL",
}) => {
  return (
    <div className="first:ml-4 ml-4 last:pr-4 md:first:ml-12 md:ml-6 md:last:pr-12 mb-6">
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="flex cursor-pointer max-w-[250px] min-w-[250px] w-full flex-col space-y-4 rounded-[16px] overflow-hidden bg-white transition-transform duration-150 hover:shadow-[0px_4px_12px_rgba(0,0,0,0.08)] active:scale-[0.98]"
      >
        {/* Cover Image */}
        <div className="relative w-full h-[140px] rounded-[16px] bg-gray-300 overflow-hidden">
          <img
            src={image}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover rounded-[16px]"
            loading="lazy"
          />
        </div>

        {/* Content */}
        <div className="w-full p-1 flex flex-col space-y-3">
          {/* Title */}
          <span className="font-bold text-[20px] leading-8 text-[#3B4540] line-clamp-2">
            {title}
          </span>

          {/* Description */}
          <p className="font-medium text-[14px] leading-5 tracking-wide text-[#3B4540] line-clamp-2">
            {description}
          </p>

          {/* Meta */}
          <div className="flex text-sm font-medium text-[#758A80] mt-1">
            {date} &nbsp;|&nbsp; {author}
          </div>
        </div>
      </a>
    </div>
  );
};

export default BlogsCard;
