/* eslint-disable no-unused-vars */
import React from "react";
import { motion } from "framer-motion";

const ProgressBar = ({ percentage, color }) => {
  return (
    <div className="w-full h-3 bg-LightBorder dark:bg-DarkBorder rounded-full overflow-hidden">
      <motion.div
        className={`h-full ${color} rounded-full`}
        initial={{ width: 0 }}
        animate={{ width: `${percentage}%` }}
        transition={{ duration: 0.8 }}
      />
    </div>
  );
};

export default ProgressBar;
