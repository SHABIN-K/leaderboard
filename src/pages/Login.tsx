import { toast } from "sonner";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";

import { auth } from "../utils";
import { styleForm } from "../styles";
import { FormInput } from "../components/ui";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is already authenticated, redirect to dashboard
        navigate("/dashboard");
      }
    });

    return () => {
      unsubscribe();
    };
  }, [navigate]);

  const handleLogin = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (!email || !password) {
      toast("Email and password are required");
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password).then(() => {
        navigate("/dashboard");
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Login error:", error.message);
        toast(
          "Invalid email or password. Please check your credentials and try again"
        );
      } else {
        toast("Oops! Something went wrong");
      }
    }
  };

  return (
    <div className="relative mx-auto w-full max-w-md bg-white px-6 pt-10 mt-24 pb-3 shadow-xl ring-1 ring-gray-900/5 sm:rounded-xl md:px-10">
      <div className="w-full">
        <div className="text-center">
          <h1 className="text-3xl font-semibold text-gray-900">Sign in</h1>
          <p className="mt-2 text-gray-500">
            Sign in below to access your Dashboard
          </p>
        </div>
        <div className="mt-5">
          <FormInput
            mainClass={styleForm.mainCell}
            label="Email Address"
            type="email"
            name="email"
            value={email}
            placeholder="Email Address"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            classLabel={styleForm.label}
            classInput={styleForm.classInput}
          />
          <FormInput
            mainClass={styleForm.mainCell}
            label="Password"
            type="password"
            name="password"
            value={password}
            placeholder="Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            classLabel={styleForm.label}
            classInput={styleForm.classInput}
          />
          <div className="my-6">
            <button
              type="submit"
              onClick={handleLogin}
              className="w-full rounded-md bg-black px-3 py-4 text-white focus:bg-gray-600 focus:outline-none"
            >
              Sign in
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
