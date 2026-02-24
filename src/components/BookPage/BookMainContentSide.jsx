import React from "react";
import { Share2 } from "lucide-react";

const BookMainContentSide = ({venue}) => {
    return (
        <div className="w-full md:col-span-1 md:row-span-2">
            <div className="flex flex-col w-full space-y-3 md:mt-0">

                {/* BOOK NOW */}
                <button className="w-full h-12 px-3 py-2 font-semibold text-white bg-primary rounded-md">
                    Book Now
                </button>

                {/* SHARE + BULK */}
                <div className="flex flex-row items-center space-x-2">
                    <button className="flex items-center justify-center w-full h-12 space-x-2 font-semibold text-black border-2 border-gray-300 rounded-md hover:bg-gray-50">
                        <Share2 className="w-5 h-5" />
                        <span>Share</span>
                    </button>

                    <button className="w-full h-12 px-3 py-2 font-semibold text-sm border border-primary text-primary rounded-md bg-white">
                        Bulk / Corporate
                    </button>
                </div>

                {/* TIMING */}
                <div className="flex flex-col p-4 border rounded-md border-border_color">
                    <h2 className="font-semibold text-md md:text-lg">Timing</h2>
                    <div className="mt-2 text-sm">
                        {venue.operatingHours.open} - {venue.operatingHours.close}
                    </div>
                </div>

                {/* LOCATION */}
                <div className="flex flex-col p-4 border rounded-md border-border_color">
                    <h2 className="font-semibold text-md md:text-lg">Location</h2>
                    <p className="my-2 text-sm">
                        {venue.address}, {venue.city}
                    </p>
                    <div className="w-full">
                        <iframe
                            height="220"
                            title="venue-map"
                            loading="lazy"
                            width="100%"
                            frameBorder="0"
                            src={`https://www.google.com/maps?q=${venue.location.coordinates[1]},${venue.location.coordinates[0]}&z=15&output=embed`}
                            allowFullScreen
                            className="rounded-md"
                        />
                    </div>
                </div>

            </div>
        </div>
    );
};

export default BookMainContentSide;
