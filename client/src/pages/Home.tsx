import React, { useState } from "react";
import Logo from "../assets/top.png";
import { Trash2 } from "lucide-react";

function Home() {
    const [notes, setNotes] = useState<string[]>([""]);

    const handleAddNote = () => {
        setNotes([...notes, ""]);
    };

    const handleChangeNote = (index: number, value: string) => {
        const updated = [...notes];
        updated[index] = value;
        setNotes(updated);
    };

    const handleDeleteNote = (index: number) => {
        const updated = [...notes];
        updated.splice(index, 1);
        setNotes(updated);
    };

    return (
        <div className="h-screen overflow-hidden">
            {/* Fixed Top Bar */}
            <div className="fixed top-0 left-0 right-0 bg-white px-8 py-4 z-10 flex items-center justify-between">
                <div className="flex items-center sm:gap-5">
                    <img src={Logo} alt="HD Logo" className="h-10" />
                    <p className="text-2xl font-semibold">Dashboard</p>
                </div>
                <p className="text-blue-500 font-semibold underline cursor-pointer">Sign Out</p>
            </div>

            {/* Scrollable Content */}
            <div className="pt-24 px-8 overflow-y-auto h-full">
                <div className="max-w-md mx-auto space-y-10 pb-10">
                    {/* Welcome Message */}
                    <div className="shadow-xl p-6 rounded-[10px] border-2 border-gray-200">
                        <p className="text-lg sm:text-xl font-semibold">Welcome, Jonas Kahnwalk!</p>
                        <p>Email: xxxxxx@xxxx.com</p>
                    </div>

                    {/* Create Button */}
                    <button
                        onClick={handleAddNote}
                        className="bg-blue-500 rounded text-white w-full py-1 sm:py-2 hover:bg-blue-600 transition"
                    >
                        Create Note
                    </button>

                    {/* Notes */}
                    <div className="space-y-4">
                        <p className="font-semibold text-xl mb-2">Notes</p>
                        {notes.map((note, index) => (
                            <div key={index} className="relative">
                                <input
                                    type="text"
                                    value={note}
                                    onChange={(e) => handleChangeNote(index, e.target.value)}
                                    placeholder={`Note ${index + 1}`}
                                    className="rounded-xl shadow-xl border-2 border-gray-100 w-full p-4 pr-16"
                                />
                                <button
                                    onClick={() => handleDeleteNote(index)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-red-500 font-semibold hover:underline"
                                >
                                    <Trash2 />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
