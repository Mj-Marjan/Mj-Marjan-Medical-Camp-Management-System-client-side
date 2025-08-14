import React, { use, useState } from "react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../Contexts/AuthContext";
import axios from "axios";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

const Register = () => {
  const { createUser, signInWithGoogle } = use(AuthContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
  e.preventDefault();
  setLoading(true);

  const name = e.target.name.value;
  const email = e.target.email.value;
  const photoURL = e.target.photoURL.value;
  const password = e.target.password.value;

  // Check password length
  if (password.length < 6) {
    toast.error("Password must be at least 6 characters long!");
    setLoading(false);
    return;
  }

  try {
    const result = await createUser(email, password);
    const user = result.user;

    const saveUser = {
      name,
      email,
      photo: photoURL,
      role: "",
    };

    await axios.post(`https://medical-camp-server-liart.vercel.app/users/`, saveUser);

    toast.success("Registration successful!");
    navigate("/select-role");
  } catch (error) {
    toast.error("Registration failed!");
    console.error("Error registering user:", error.message);
  } finally {
    setLoading(false);
  }
};


  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      const result = await signInWithGoogle();
      const user = result.user;

      const res = await axios.get(`https://medical-camp-server-liart.vercel.app/users/${user.email}`);

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
      console.error("Google login error:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="flex justify-center items-center min-h-screen bg-gradient-to-r from-purple-100 via-indigo-100 to-blue-100 px-4"
      initial={{ opacity: 0, y: -40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        className="card w-full max-w-md backdrop-blur-md bg-white/80 border border-white shadow-2xl rounded-2xl p-8"
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 100 }}
      >
        <h1 className="text-3xl font-bold text-center text-purple-700 mb-6">
          ✨ Create Account
        </h1>

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="label font-semibold">Name</label>
            <input
              type="text"
              name="name"
              className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-purple-400"
              required
            />
          </div>
          <div>
            <label className="label font-semibold">Email</label>
            <input
              type="email"
              name="email"
              className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-purple-400"
              required
            />
          </div>
          <div>
            <label className="label font-semibold">Photo URL</label>
            <input
              type="text"
              name="photoURL"
              className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>
          <div>
            <label className="label font-semibold">Password</label>
            <input
              type="password"
              name="password"
              className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-purple-400"
              required
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={loading}
            className="btn btn-primary w-full mt-2"
          >
            {loading ? "Registering..." : "Register"}
          </motion.button>
        </form>

        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-600 hover:underline">
            Login
          </Link>
        </p>

        <div className="divider my-6">OR</div>

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleGoogleLogin}
          disabled={loading}
          className="btn bg-white w-full border border-gray-300 shadow-sm hover:shadow-md transition-all"
        >
          <img
            src="data:image/png;base64,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"
            alt="Google"
            className="w-5 h-5 mr-2"
          />
          {loading ? "Please wait..." : "Register with Google"}
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default Register;
