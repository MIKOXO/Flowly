/* eslint-disable no-unused-vars */
import React from "react";
import { motion } from "framer-motion";
import ProgressBar from "./ProgressBar";

const StatCard = ({ title, value, total, color }) => {
  const percentage = Math.round((value / total) * 100);

  return (
    <motion.div className="bg-white dark:bg-DarkCard border border-LightBorder dark:border-DarkBorder rounded-2xl shadow-md p-6 flex flex-col space-y-5 cursor-pointer">
      <h3 className="text-lg font-semibold">{title}</h3>
      <div className="text-4xl font-bold">{value}</div>
      <ProgressBar percentage={percentage} color={color} />
      <p className="mt-3 text-sm font-medium">{percentage}% of total tasks</p>
    </motion.div>
  );
};

export default StatCard;
