import React, { useState } from "react";
import api from "../../services/api";

const ContactTrainerModal = ({ trainer, onClose, onSuccess }) => {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("Hi, I am interested.");

    if (!trainer) return null;

    const handleSend = async () => {
        try {
            setLoading(true);

            await api.post(`/trainers/${trainer._id}/contact`, {
                message,
            });

            if (onSuccess) onSuccess(message);
            onClose();

        } catch (err) {

            if (err.response?.status === 400) {
                // Already contacted → treat as success
                if (onSuccess) onSuccess(message);
                onClose();
                return;
            }

            console.error("Contact failed:", err);
            alert("Failed to contact trainer");
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

            <div className="bg-white rounded-2xl p-6 w-full max-w-[700px] relative">

                {/* Close */}
                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 text-xl"
                >
                    ✕
                </button>

                <h2 className="text-2xl font-bold mb-4">Get In Touch</h2>

                <div className="flex flex-col gap-4">

                    {/* Trainer name */}
                    <input
                        className="border p-3 rounded-lg bg-gray-100"
                        value={trainer.name}
                        readOnly
                    />

                    {/* Message */}
                    <textarea
                        className="border p-3 rounded-lg"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Write your message"
                    />

                    {/* SEND BUTTON */}
                    <button
                        onClick={handleSend}
                        disabled={loading}
                        className="bg-[#00b562] text-white py-3 rounded-xl font-bold hover:bg-green-600"
                    >
                        {loading ? "Sending..." : "SEND QUERY"}
                    </button>

                </div>
            </div>
        </div>
    );
};

export default ContactTrainerModal;
