import React, { useEffect, useState } from "react";
import Logo from "../assets/top.png";
import { Trash2 } from "lucide-react";
import { axiosClient } from "../utils/axiosClient";
import { KEY_ACCESS_TOKEN, removeItem } from "../utils/localStorageManager";
import { useNavigate } from "react-router-dom";

interface User {
  name: string;
  email: string;
}

interface Note {
  _id: string;
  note: string;
}

function Home() {
  const navigate = useNavigate();
  const [notes, setNotes] = useState<Note[]>([]);
  const [user, setUser] = useState<User>({ name: "", email: "" });
  const [newNote, setNewNote] = useState<string>("");

  const getUser = async () => {
    try {
      const response = await axiosClient.get("user/getUser");
      const user = response.data.result;
      setUser({ name: user.name, email: user.email });
    } catch (e) {
      console.log(e);
    }
  };

  const getNotes = async () => {
    try {
      const response = await axiosClient.get("notes/get");
      setNotes(response.data.result || []);
    } catch (e) {
      console.log(e);
    }
  };

  const handleAddNote = async () => {
    if (!newNote.trim()) return;

    try {
      const res = await axiosClient.post("notes/add", {
        note: newNote,
      });

      if (res.data.status === "ok") {
        setNewNote(""); 
        await getNotes();
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleDeleteNote = async (id: string) => {
    try {
      await axiosClient.delete(`notes/delete?id=${id}`);
      setNotes(notes.filter((n) => n._id !== id));
    } catch (e) {
      console.log(e);
    }
  };

  // Sign out
  const handleSignOut = async () => {
    try {
      await axiosClient.get("jwtAuth/logout");
      removeItem(KEY_ACCESS_TOKEN);
      removeItem("refreshToken");
      navigate("/signin");
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getUser();
    getNotes();
  }, []);

  return (
    <div className="h-screen overflow-hidden">
      {/* Top Bar */}
      <div className="fixed top-0 left-0 right-0 bg-white px-8 py-4 z-10 flex items-center justify-between">
        <div className="flex items-center sm:gap-5">
          <img src={Logo} alt="HD Logo" className="h-10" />
          <p className="text-2xl font-semibold">Dashboard</p>
        </div>
        <button
          className="text-blue-500 font-semibold underline cursor-pointer"
          onClick={handleSignOut}
        >
          Sign Out
        </button>
      </div>

      {/* Scrollable Content */}
      <div className="pt-24 px-8 overflow-y-auto h-full">
        <div className="max-w-md mx-auto space-y-10 pb-10">
          {/* Welcome Message */}
          <div className="shadow-xl p-6 rounded-[10px] border-2 border-gray-200">
            <p className="text-lg sm:text-xl font-semibold">Welcome, {user.name}</p>
            <p>Email: {user.email}</p>
          </div>

          {/* Input Field for New Note */}
          <div className="space-y-4">
            <input
              type="text"
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              placeholder="Write a new note"
              className="rounded-xl shadow-xl border-2 border-gray-200 w-full p-4"
            />
            <button
              onClick={handleAddNote}
              className="bg-blue-500 rounded text-white w-full py-2 hover:bg-blue-600 transition"
            >
              Create Note
            </button>
          </div>

          {/* Saved Notes */}
          <div className="space-y-4 mt-6">
            <p className="font-semibold text-xl mb-2">Notes</p>
            {notes.map((noteObj) => (
              <div key={noteObj._id} className="relative">
                <input
                  type="text"
                  value={noteObj.note}
                  disabled
                  className="rounded-xl shadow-xl border-2 border-gray-100 w-full p-4 pr-16 text-gray-800"
                />
                <button
                  onClick={() => handleDeleteNote(noteObj._id)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-red-500 font-semibold"
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
