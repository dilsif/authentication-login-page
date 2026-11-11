import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { validateEmail, validatePassword } from "../utils/validation";

function LoginPage() {

  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {

    e.preventDefault();

    const newErrors = {
      email: validateEmail(email),
      password: password ? "" : "Password is required"
    };

    setErrors(newErrors);

    if (newErrors.email || newErrors.password) {
      return;
    }

    setLoading(true);
    setMessage("");

    try {

      await login(
        { email, password },
        rememberMe
      );

      navigate("/dashboard");

    } catch (error) {

      setMessage(
        error.response?.data?.message ||
        error.message ||
        "Login failed"
      );

    } finally {
      setLoading(false);
    }
  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">

      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">

        <h1 className="text-3xl font-bold text-center mb-2">
          Welcome Back
        </h1>

        <p className="text-gray-500 text-center mb-6">
          Login to your account
        </p>

        {message && (
          <p className="bg-red-100 text-red-600 p-3 rounded mb-4">
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setErrors({
                  ...errors,
                  email: validateEmail(e.target.value)
                });
              }}
              className={`w-full border p-3 rounded-lg outline-none
                ${errors.email ? "border-red-500" :
                email ? "border-green-500" : "border-gray-300"}`}
            />

            <p className="text-red-500 text-sm">
              {errors.email}
            </p>
          </div>

          <div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setErrors({
                    ...errors,
                    password: e.target.value ? "" : "Password is required"
                  });
                }}
                className="w-full border border-gray-300 p-3 rounded-lg outline-none"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-blue-600 text-sm"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            <p className="text-red-500 text-sm">
              {errors.password}
            </p>
          </div>

          <div className="flex justify-between items-center text-sm">

            <label className="flex gap-2 items-center">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              Remember me
            </label>

            <button
              type="button"
              onClick={() => setMessage(
                "Password reset is not configured in this demo."
              )}
              className="text-blue-600"
            >
              Forgot password?
            </button>

          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg font-semibold disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

        <p className="text-center mt-6 text-gray-600">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-600 font-semibold">
            Register
          </Link>
        </p>

      </div>

    </div>
  );
}

export default LoginPage;