/* eslint-disable no-unused-vars */
import { useState } from "react";
import { storageService } from "../../services/storageService";
import { motion } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import ThemeToggle from "../../components/ThemeToggle";
import {
  EyeIcon,
  EyeSlashIcon,
  EnvelopeIcon,
  UserIcon,
} from "@heroicons/react/24/outline";

const Signup = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    // Validation
    if (!form.username.trim()) newErrors.username = "Username is required.";
    else if (form.username.trim().length < 3)
      newErrors.username = "Username must be at least 3 characters.";

    if (!form.email.trim()) newErrors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(form.email))
      newErrors.email = "Invalid email format.";

    if (!form.password.trim()) newErrors.password = "Password is required.";
    else if (form.password.length < 6)
      newErrors.password = "Password must be at least 6 characters.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setTimeout(() => setErrors({}), 3000);
      return;
    }

    try {
      // Check if email already exists using storage service
      const existingUser = await storageService.getUserByEmail(form.email);
      if (existingUser) {
        setErrors({ email: "Email already registered." });
        setTimeout(() => setErrors({}), 3000);
        return;
      }

      // Save new user using storage service
      const newUser = {
        username: form.username,
        email: form.email,
        password: form.password,
      };
      await storageService.createUser(newUser);

      // Save active session
      localStorage.setItem("user", JSON.stringify(newUser));
      localStorage.setItem("loggedInUser", JSON.stringify(newUser));

      // Redirect to board
      navigate("/board");
    } catch (error) {
      console.error("Error creating user:", error);
      setErrors({ general: "An error occurred during registration." });
      setTimeout(() => setErrors({}), 3000);
    }
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

        {/* Signup Card */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="flex items-center justify-center max-sm:mt-10"
        >
          <div className="w-full max-w-lg rounded-2xl shadow-xl p-4 lg:p-8 bg-white dark:bg-DarkCard border border-LightBorder dark:border-DarkBorder">
            <h1 className="text-[26px] sm:text-[32px] font-extrabold leading-tight text-center">
              Create Account
            </h1>

            <form onSubmit={handleSubmit} className="space-y-4 mt-6">
              <div className="relative">
                <label className="block mb-1 max-sm:text-sm font-medium">
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  value={form.username}
                  onChange={handleChange}
                  className={`font-medium w-full p-3 rounded-xl bg-LightBg dark:bg-DarkBg focus:ring-2 focus:ring-Accent outline-none transition ${
                    errors.username
                      ? "border border-red-500"
                      : "border border-LightBorder dark:border-DarkBorder"
                  }`}
                />
                <UserIcon className="w-5 h-5 absolute right-3 top-10" />

                {errors.username && (
                  <p className="text-red-400 text-sm font-medium mt-1">
                    {errors.username}
                  </p>
                )}
              </div>

              <div className="relative">
                <label className="block mb-1 max-sm:text-sm font-medium">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
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
                <label className="block mb-1 max-sm:text-sm font-medium">
                  Password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
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
                className="max-sm:text-sm w-full bg-Primary hover:bg-Accent text-white font-semibold py-3 rounded-xl shadow-md transition-all"
              >
                Sign Up
              </button>
            </form>

            <p className="font-medium text-center text-sm text-DarkMuted dark:text-LightMuted mt-4">
              Already have an account?{" "}
              <span
                onClick={() => navigate("/login")}
                className="text-Primary hover:underline cursor-pointer"
              >
                Log In
              </span>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Signup;
