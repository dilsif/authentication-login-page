import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

import {
  validateUsername,
  validateEmail,
  validatePassword,
  validateFullName
} from "../utils/validation";

function RegisterPage() {

  const { register, checkUsername } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    username: "",
    email: "",
    password: ""
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {

    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value
    });

    let error = "";

    if (name === "fullName") {
      error = validateFullName(value);
    }

    if (name === "username") {
      error = validateUsername(value);
    }

    if (name === "email") {
      error = validateEmail(value);
    }

    if (name === "password") {
      error = validatePassword(value);
    }

    setErrors({
      ...errors,
      [name]: error
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    const newErrors = {
      fullName: validateFullName(form.fullName),
      username: validateUsername(form.username),
      email: validateEmail(form.email),
      password: validatePassword(form.password)
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some(error => error)) {
      return;
    }

    setLoading(true);
    setMessage("");

    try {

      const exists = await checkUsername(form.username);

      if (exists) {
        setErrors({
          ...newErrors,
          username: "Username already exists"
        });
        return;
      }

      await register(form);

      navigate("/dashboard");

    } catch (error) {
      setMessage(
        error.response?.data?.message ||
        error.message ||
        "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  const inputClass = (name) =>
    `w-full border rounded-lg p-3 outline-none transition
    ${errors[name] ? "border-red-500" :
      form[name] ? "border-green-500" : "border-gray-300"}`;

  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">

      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">

        <h1 className="text-3xl font-bold text-center mb-2">
          Create Account
        </h1>

        <p className="text-gray-500 text-center mb-6">
          Register to get started
        </p>

        {message && (
          <p className="bg-red-100 text-red-600 p-3 rounded mb-4">
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={form.fullName}
              onChange={handleChange}
              className={inputClass("fullName")}
            />
            <p className="text-red-500 text-sm mt-1">
              {errors.fullName}
            </p>
          </div>

          <div>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={form.username}
              onChange={handleChange}
              className={inputClass("username")}
            />
            <p className="text-red-500 text-sm mt-1">
              {errors.username}
            </p>
          </div>

          <div>
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={form.email}
              onChange={handleChange}
              className={inputClass("email")}
            />
            <p className="text-red-500 text-sm mt-1">
              {errors.email}
            </p>
          </div>

          <div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                className={inputClass("password")}
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-sm text-blue-600"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            <p className="text-red-500 text-sm mt-1">
              {errors.password}
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg font-semibold disabled:opacity-50"
          >
            {loading ? "Creating Account..." : "Register"}
          </button>

        </form>

        <p className="text-center mt-6 text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 font-semibold">
            Login
          </Link>
        </p>

      </div>

    </div>
  );
}

export default RegisterPage;