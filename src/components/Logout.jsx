/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import {
  UserIcon,
  ArrowLeftEndOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { motion, AnimatePresence } from "framer-motion";

const Logout = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("loggedInUser");
    window.location.href = "/";
  };

  return (
    <div className="relative">
      <div
        onClick={() => setMenuOpen(!menuOpen)}
        className="p-2 lg:p-3 rounded-2xl shadow-lg hover:text-white border border-LightBorder dark:border-DarkBorder bg-LightSecondary dark:bg-DarkSecondary hover:bg-Accent dark:hover:bg-Accent cursor-pointer duration-300"
      >
        <UserIcon className="w-6 h-6 font-medium" />
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-4 bg-LightSecondary dark:bg-DarkCard border border-LightBorder dark:border-DarkBorder rounded-xl shadow-md w-36"
          >
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2 px-4 py-3 text-left"
            >
              <ArrowLeftEndOnRectangleIcon className="w-5 h-5" />
              Logout
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Logout;
