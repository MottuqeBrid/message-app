import { Link } from "react-router";
import { useState } from "react";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <section className="min-h-[calc(100dvh-5rem)] flex items-center justify-center px-4 py-10">
      <div className="grid w-full max-w-6xl gap-6 lg:grid-cols-2">
        <div className="hidden lg:flex rounded-2xl bg-linear-to-br from-primary/20 via-secondary/10 to-accent/20 p-10 border border-base-300">
          <div className="my-auto">
            <p className="badge badge-primary badge-outline mb-4">MessageApp</p>
            <h1 className="text-4xl font-bold leading-tight">
              Create your account and start messaging today
            </h1>
            <p className="mt-4 text-base-content/80 max-w-md">
              Join your friends, share updates, and stay connected with a fast
              and modern messaging experience.
            </p>
          </div>
        </div>

        <div className="card bg-base-100 border border-base-300 shadow-xl">
          <div className="card-body">
            <h2 className="card-title text-3xl">Create Account</h2>
            <p className="text-base-content/70">
              Fill in your details to create a new account.
            </p>

            <form className="mt-2 space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="form-control w-full">
                  <div className="label">
                    <span className="label-text font-medium">First name</span>
                  </div>
                  <input
                    type="text"
                    placeholder="John"
                    className="input input-bordered w-full"
                    required
                  />
                </label>

                <label className="form-control w-full">
                  <div className="label">
                    <span className="label-text font-medium">Last name</span>
                  </div>
                  <input
                    type="text"
                    placeholder="Doe"
                    className="input input-bordered w-full"
                    required
                  />
                </label>
              </div>

              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text font-medium">Email</span>
                </div>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="input input-bordered w-full"
                  required
                />
              </label>

              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text font-medium">Username</span>
                </div>
                <input
                  type="text"
                  placeholder="your_username"
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
                    placeholder="Create a strong password"
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

              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text font-medium">
                    Confirm password
                  </span>
                </div>
                <div className="join w-full">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Re-enter your password"
                    className="input input-bordered join-item w-full"
                    minLength={8}
                    required
                  />
                  <button
                    type="button"
                    className="btn btn-outline join-item"
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                  >
                    {showConfirmPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </label>

              <label className="label cursor-pointer justify-start gap-3">
                <input
                  type="checkbox"
                  className="checkbox checkbox-primary"
                  required
                />
                <span className="label-text">
                  I agree to the{" "}
                  <span className="link link-primary">Terms</span> and{" "}
                  <span className="link link-primary">Privacy Policy</span>
                </span>
              </label>

              <button type="submit" className="btn btn-primary w-full mt-2">
                Create Account
              </button>
            </form>

            <p className="text-center text-sm mt-2">
              Already have an account?{" "}
              <Link to="/auth/login" className="link link-primary font-medium">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
