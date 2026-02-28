import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchVenueById } from "../services/venueApi";

import BookBooking from "../components/BookPage/BookBooking";
import DesktopNavbar from "../components/Navbar/DesktopNavbar";
import MobileBottomNav from "../components/Navbar/MobileBottomNav";
import MobileTopNav from "../components/Navbar/MobileTopNav";

const BookingCheckoutPage = () => {
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

    if (loading)
        return (
            <div className="min-h-screen flex items-center justify-center">
                Loading...
            </div>
        );

    if (!venue)
        return (
            <div className="min-h-screen flex items-center justify-center">
                Venue not found
            </div>
        );

    return (
        <div className="min-h-screen bg-gray-100">
            <DesktopNavbar />
            <MobileTopNav />
            <BookBooking venue={venue} />
            <MobileBottomNav />
        </div>
    );
};

export default BookingCheckoutPage;