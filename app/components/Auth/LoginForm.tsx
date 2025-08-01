"use client";

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

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
    <form onSubmit={handleLogin} className="space-y-4">
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="input bg-white border border-gray-300 rounded p-2 w-full"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="input  bg-white border border-gray-300 rounded p-2 w-full"
      />
      {error && <p className="text-red-500">{error}</p>}
      <button
        type="submit"
        className="btn bg-emerald-700 text-white p-2 rounded w-full"
      >
        Log In
      </button>
    </form>
  );
}
