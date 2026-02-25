import { useState } from "react";
import { Link } from "react-router";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <section className="min-h-[calc(100dvh-5rem)] flex items-center justify-center px-4 py-10">
      <div className="grid w-full max-w-6xl gap-6 lg:grid-cols-2">
        <div className="hidden lg:flex rounded-2xl bg-linear-to-br from-primary/20 via-secondary/10 to-accent/20 p-10 border border-base-300">
          <div className="my-auto">
            <p className="badge badge-secondary badge-outline mb-4">
              Welcome Back
            </p>
            <h1 className="text-4xl font-bold leading-tight">
              Sign in and continue your conversations
            </h1>
            <p className="mt-4 text-base-content/80 max-w-md">
              Access your messages, stay connected with friends, and pick up
              right where you left off.
            </p>
          </div>
        </div>

        <div className="card bg-base-100 border border-base-300 shadow-xl">
          <div className="card-body">
            <h2 className="card-title text-3xl">Login</h2>
            <p className="text-base-content/70">
              Enter your credentials to access your account.
            </p>

            <form className="mt-2 space-y-4">
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text font-medium">
                    Email or username
                  </span>
                </div>
                <input
                  type="text"
                  placeholder="you@example.com or username"
                  className="input input-bordered w-full"
                  required
                />
              </label>

              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text font-medium">Password</span>
                </div>
                <div className="join w-full">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="input input-bordered join-item w-full"
                    minLength={8}
                    required
                  />
                  <button
                    type="button"
                    className="btn btn-outline join-item"
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </label>

              <div className="flex items-center justify-between gap-3">
                <label className="label cursor-pointer justify-start gap-2 p-0">
                  <input
                    type="checkbox"
                    className="checkbox checkbox-primary checkbox-sm"
                  />
                  <span className="label-text">Remember me</span>
                </label>
                <button type="button" className="link link-primary text-sm">
                  Forgot password?
                </button>
              </div>

              <button type="submit" className="btn btn-primary w-full mt-2">
                Login
              </button>
            </form>

            <p className="text-center text-sm mt-2">
              Don&apos;t have an account?{" "}
              <Link
                to="/auth/register"
                className="link link-primary font-medium"
              >
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
