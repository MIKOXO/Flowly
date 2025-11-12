/* eslint-disable no-unused-vars */
import React from "react";
import ThemeToggle from "../components/ThemeToggle";
import { Link } from "react-router-dom";
import { ArrowRightEndOnRectangleIcon } from "@heroicons/react/24/outline";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import heroIllustration from "../assets/hero-illustration.png";
import { motion } from "framer-motion";

const Landing = () => {
  return (
    <section className="min-h-screen bg-LightBg dark:bg-DarkBg text-LightText dark:text-DarkText ease-in-out duration-300">
      <div className="mx-auto container p-6">
        {/* header */}
        <header className="lg:py-4 flex flex-row justify-between items-center">
          {/* Logo */}
          <div>
            <Link to="/">
              <span className="text-[25px] lg:text-[40px] font-extrabold tracking-tight">
                <span className="text-Accent">Flow</span>ly.
              </span>
            </Link>
          </div>

          {/* Navigation & Theme Toggle */}
          <nav className="flex flex-row items-center">
            <ThemeToggle />
            <Link
              to="/login"
              className="ml-5 font-medium flex items-center p-2 lg:p-3 rounded-2xl shadow-lg hover:text-white border border-LightBorder dark:border-DarkBorder bg-LightSecondary dark:bg-DarkSecondary hover:bg-Accent dark:hover:bg-Accent  duration-300"
            >
              <ArrowRightEndOnRectangleIcon className="w-6 h-6" />
            </Link>
          </nav>
        </header>

        {/* Hero Section */}
        <main className="mt-14">
          <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-10 max-lg:text-center">
            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <h1 className="text-[26px] sm:text-[38px] lg:text-[50px] font-extrabold leading-tight lg:max-w-[780px]">
                Organize your workflow effortlessly with{" "}
                <span className="text-Accent">Flowly.</span>
              </h1>
              <p className="py-5 sm:text-[18px] sm:max-w-[500px] max-lg:mx-auto">
                Flowly helps you stay focused and manage your tasks with a
                clean, simple, and efficient interface built for productivity.
              </p>

              {/* CTA */}
              <div className="flex max-lg:justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link
                    className="flex flex-row items-center gap-2 text-white bg-Primary hover:bg-Accent px-8 py-4 rounded-2xl shadow-xl w-max transition-colors duration-300"
                    to="/signup"
                  >
                    <span className="font-medium">Get Started</span>
                    <ArrowRightIcon className="w-6 h-6" />
                  </Link>
                </motion.button>
              </div>
            </motion.div>

            {/* Illustration */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
              className=""
            >
              <motion.img
                src={heroIllustration}
                alt="Hero Illustration"
                animate={{ y: [0, -15, 0] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="w-[300px] md:w-[500px] lg:w-[800px] rounded-2xl shadow-lg"
              />
            </motion.div>
          </div>
        </main>
      </div>
    </section>
  );
};

export default Landing;
