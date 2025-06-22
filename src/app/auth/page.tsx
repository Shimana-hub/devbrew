"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function AuthPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async () => {
    setError("");
    let result;
    if (mode === "signin") {
      result = await supabase.auth.signInWithPassword({ email, password });
    } else {
      result = await supabase.auth.signUp({ email, password });
    }
    if (result.error) return setError(result.error.message);
    router.push("/");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="max-w-sm w-full space-y-4">
        <h1 className="text-2xl font-bold text-center">
          {mode === "signin" ? "Login" : "Register"}
        </h1>

        <Input
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={handleSubmit}>
          {mode === "signin" ? "Sign In" : "Sign Up"}
        </Button>

        {error && <p className="text-destructive text-sm">{error}</p>}

        <p className="text-sm text-center">
          {mode === "signin"
            ? "Don't have an account?"
            : "Already have an account?"}
          <button
            onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
            className="ml-2 underline text-blue-600"
          >
            {mode === "signin" ? "Sign Up" : "Log In"}
          </button>
        </p>
      </div>
    </div>
  );
}
