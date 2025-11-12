/* eslint-disable no-unused-vars */
import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import ThemeToggle from "../../components/ThemeToggle";
import {
  EyeIcon,
  EyeSlashIcon,
  EnvelopeIcon,
} from "@heroicons/react/24/outline";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!email.trim()) newErrors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(email))
      newErrors.email = "Invalid email format.";

    if (!password.trim()) newErrors.password = "Password is required.";
    else if (password.length < 6)
      newErrors.password = "Password must be at least 6 characters.";

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      setTimeout(() => setErrors({}), 3000);
      return;
    }

    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];

    const existingUser = storedUsers.find((user) => user.email === email);

    if (!existingUser) {
      setErrors({ email: "User not found. Please sign up first." });
      setTimeout(() => setErrors({}), 3000);
      return;
    }

    if (existingUser.password !== password) {
      setErrors({ password: "Incorrect password." });
      setTimeout(() => setErrors({}), 3000);
      return;
    }

    localStorage.setItem("user", JSON.stringify({ email }));

    navigate("/board");
  };

  return (
    <section className="min-h-screen bg-LightBg dark:bg-DarkBg text-LightText dark:text-DarkText ease-in-out duration-300">
      <div className="mx-auto container p-6">
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
          <nav>
            <ThemeToggle />
          </nav>
        </header>

        {/* Login Card */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="flex items-center justify-center"
        >
          <div className="w-full max-w-lg rounded-2xl shadow-xl p-8 bg-white dark:bg-DarkCard border border-LightBorder dark:border-DarkBorder">
            <h1 className="text-[26px] sm:text-[32px] font-extrabold leading-tight text-center">
              Welcome back
            </h1>

            <form onSubmit={handleSubmit} className="space-y-4 mt-10">
              <div className="relative">
                <label className="block mb-1 font-medium">Email</label>
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`font-medium w-full p-3 rounded-xl bg-LightBg dark:bg-DarkBg focus:ring-2 focus:ring-Accent outline-none transition ${
                    errors.email
                      ? "border border-red-500"
                      : "border border-LightBorder dark:border-DarkBorder"
                  }`}
                />
                <EnvelopeIcon className="w-5 h-5 absolute right-3 top-10" />

                {errors.email && (
                  <p className="text-red-400 text-sm font-medium mt-1">
                    {errors.email}
                  </p>
                )}
              </div>

              <div className="relative">
                <label className="block mb-1 font-medium">Password</label>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`font-medium w-full p-3 rounded-xl bg-LightBg dark:bg-DarkBg focus:ring-2 focus:ring-Accent outline-none transition pr-12 ${
                    errors.password
                      ? "border border-red-500"
                      : "border border-LightBorder dark:border-DarkBorder"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-10"
                >
                  {showPassword ? (
                    <EyeSlashIcon className="w-5 h-5" />
                  ) : (
                    <EyeIcon className="w-5 h-5" />
                  )}
                </button>

                {errors.password && (
                  <p className="text-red-400 text-sm font-medium mt-1">
                    {errors.password}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-Primary hover:bg-Accent text-white font-semibold py-3 rounded-xl shadow-md transition-all"
              >
                Login
              </button>
            </form>
            <p className="font-medium text-center text-sm text-DarkMuted dark:text-LightMuted mt-4">
              Don’t have an account?{" "}
              <span
                onClick={() => navigate("/signup")}
                className="text-Primary hover:underline cursor-pointer"
              >
                Sign up
              </span>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Login;
