import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchVenueById } from "../../services/venueApi";

import BookMainContentImage from "./BookMainContentImage";
import BookMainContentHeader from "./BookMainContentHeader";
import BookMainContentSide from "./BookMainContentSide";
import BookMainContentDetails from "./BookMainContentDetails";

const BookMainContentCombined = () => {
  const { venueId } = useParams();
  const [venue, setVenue] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadVenue = async () => {
      try {
        const data = await fetchVenueById(venueId);
        setVenue(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadVenue();
  }, [venueId]);

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (!venue) return <div className="text-center mt-10">Venue not found</div>;

  return (
    <div className="w-full mt-8 px-4 lg:px-20">

      {/* BREADCRUMB */}
      <nav className="flex items-center flex-wrap text-gray-500 text-sm font-medium w-full mb-6">
        <span>Venues</span>
        <span className="mx-2">&gt;</span>
        <span>{venue.city}</span>
        <span className="mx-2">&gt;</span>
        <span>{venue.name}</span>
      </nav>

      <BookMainContentHeader venue={venue} />

      <div className="grid w-full grid-cols-1 gap-4 mt-6 md:grid-cols-3 md:gap-x-5">
        <BookMainContentImage venue={venue} />
        <BookMainContentSide venue={venue} />
      </div>

      <div className="grid w-full grid-cols-1 gap-4 mt-0 md:grid-cols-3 md:gap-x-5">
        <BookMainContentDetails venue={venue} />
        <div className="hidden md:block" />
      </div>

    </div>
  );
};

export default BookMainContentCombined;