"use client";

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/dashboard"); // ✅ Redirect after successful login
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="relative">
      <form onSubmit={handleLogin} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input bg-white border border-gray-300 rounded p-2 w-full"
        />
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input bg-white border border-gray-300 rounded p-2 w-full pr-10"
          aria-label="Password"
        />
        <button
          type="button"
          onClick={() => setShowPassword((s) => !s)}
          aria-label={showPassword ? "Hide password" : "Show password"}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
        >
          {showPassword ? <FaRegEye size={18} /> : <FaRegEyeSlash size={18} />}
        </button>
        {error && <p className="text-red-500">{error}</p>}
        <button
          type="submit"
          className="btn bg-emerald-700 text-white p-2 rounded w-full"
        >
          Log In
        </button>
      </form>
    </div>
  );
}
