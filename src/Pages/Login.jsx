import React, { use, useState } from "react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../Contexts/AuthContext";
import axios from "axios";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

const Login = () => {
  const { signInUser, signInWithGoogle } = use(AuthContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const result = await signInUser(email, password);
      const user = result.user;

      const { data } = await axios.get(
        `https://medical-camp-server-liart.vercel.app/users/${user.email}`
      );

      toast.success("Login successful!");
      if (!data?.role) {
        navigate("/select-role");
      } else {
        navigate("/dashboard");
      }
    } catch (error) {
      toast.error("Login failed!");
      console.error("Login error:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      const result = await signInWithGoogle();
      const user = result.user;

      const res = await axios.get(
        `https://medical-camp-server-liart.vercel.app/users/${user.email}`
      );

      if (!res.data?.email) {
        const saveUser = {
          name: user.displayName,
          email: user.email,
          photo: user.photoURL,
          role: "",
        };
        await axios.post(`https://medical-camp-server-liart.vercel.app/users/`, saveUser);
        toast.success("Google account registered!");
        navigate("/select-role");
      } else {
        if (!res.data.role) {
          navigate("/select-role");
        } else {
          navigate("/dashboard");
        }
      }
    } catch (error) {
      toast.error("Google login failed!");
      console.error("Google Login error:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="flex justify-center items-center min-h-screen bg-gradient-to-r from-purple-100 to-indigo-100 px-4"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        className="card w-full max-w-md bg-white p-8 shadow-2xl rounded-2xl"
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 100 }}
      >
        <h1 className="text-3xl font-bold text-center text-purple-700 mb-6">
          🔐 Login to MCMS
        </h1>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="label font-semibold">Email</label>
            <input
              type="email"
              name="email"
              className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all"
              required
            />
          </div>

          <div>
            <label className="label font-semibold">Password</label>
            <input
              type="password"
              name="password"
              className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all"
              required
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={loading}
            className="btn btn-primary w-full"
          >
            {loading ? "Logging in..." : "Login"}
          </motion.button>
        </form>

        <p className="text-sm mt-4 text-center">
          Don&apos;t have an account?{" "}
          <Link to="/register" className="text-indigo-600 hover:underline">
            Register
          </Link>
        </p>

        <div className="divider my-6">OR</div>

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleGoogleLogin}
          disabled={loading}
          className="btn w-full border border-gray-300 bg-white text-black hover:shadow-md transition-all"
        >
          <img
            src="data:image/png;base64,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"
            alt="Google"
            className="w-5 h-5 mr-2"
          />
          {loading ? "Please wait..." : "Login with Google"}
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default Login;
