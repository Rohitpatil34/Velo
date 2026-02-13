import React from "react";

const collections = [
  {
    title: "Top Venues Near You",
    subtitle: "400+ venues",
    image:
      "https://playo-website.gumlet.io/playo-website-v3/meet-collection/venues.png",
  },
  {
    title: "Explore Best Coaches",
    subtitle: "400+ venues",
    image:
      "https://playo-website.gumlet.io/playo-website-v3/meet-collection/trainer.png",
  },
  {
    title: "Discover Best Events",
    subtitle: "100+ Events & Deals",
    image:
      "https://playo-website.gumlet.io/playo-website-v3/meet-collection/events.png",
  },
];

const CollectionGames = () => {
  return (
    <section className="md:mx-12 mx-4 xxl:mx-auto max-w-page md:py-12 py-6 bg-white md:rounded-3xl rounded-2xl xxl:w-full mt-[100px]">
      
      {/* Heading */}
      <h3 className="font-bold leading-9 md:mx-12 mx-4 md:text-2xl text-xl mb-6">
        Collections For You
      </h3>

      {/* Cards */}
      <div className="md:mx-12 mx-4 flex gap-6 flex-wrap md:flex-nowrap justify-between">
        {collections.map((item, index) => (
          <div
            key={index}
            className="relative cursor-pointer rounded-2xl overflow-hidden w-full md:w-1/3"
          >
            {/* Image */}
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover rounded-2xl"
            />

            {/* Overlay Card */}
            <div className="absolute bottom-8 left-0 w-full px-6 z-10">
              <div className="bg-white rounded-2xl p-6 max-w-[352px]">
                <div className="font-bold text-xl leading-[30px]">
                  {item.title}
                </div>
                <div className="text-[#758A80] font-medium leading-6">
                  {item.subtitle}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CollectionGames;
