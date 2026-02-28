import { Link, useNavigate } from "react-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Swal from "sweetalert2";
import axiosInstance from "../../hook/axiosInstance‎";

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
      agreeToTerms: false,
    },
  });

  const onSubmit = async (data) => {
    const payload = {
      firstName: data.firstName,
      lastName: data.lastName,
      name: `${data.firstName} ${data.lastName}`,
      email: data.email,
      username: data.username,
      password: data.password,
    };

    try {
      const response = await axiosInstance.post("/auth/register", payload);
      const resData = response?.data ?? {};
      localStorage.setItem("token", resData.token);
      if (resData.success) {
        await Swal.fire({
          title: "Registration Successful",
          text: `Welcome to MessageApp, ${data.firstName}!`,
          icon: "success",
          confirmButtonText: "Continue",
        });

        navigate("/messages");
        return;
      }

      Swal.fire({
        title: "Registration Failed",
        text:
          resData.message ||
          resData.error ||
          "An error occurred during registration.",
        icon: "error",
        confirmButtonText: "OK",
      });
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.message ||
        "An unexpected error occurred.";

      Swal.fire({
        title: "Registration Error",
        text: message,
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

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

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="mt-2 flex flex-col gap-4"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="form-control w-full">
                  <div className="label">
                    <span className="label-text font-medium">First name</span>
                  </div>
                  <input
                    type="text"
                    placeholder="John"
                    className={`input input-bordered w-full ${errors.firstName ? "input-error" : ""}`}
                    {...register("firstName", {
                      required: "First name is required",
                      minLength: {
                        value: 2,
                        message: "First name must be at least 2 characters",
                      },
                    })}
                  />
                  {errors.firstName && (
                    <span className="label-text-alt text-error mt-1">
                      {errors.firstName.message}
                    </span>
                  )}
                </label>

                <label className="form-control w-full">
                  <div className="label">
                    <span className="label-text font-medium">Last name</span>
                  </div>
                  <input
                    type="text"
                    placeholder="Doe"
                    className={`input input-bordered w-full ${errors.lastName ? "input-error" : ""}`}
                    {...register("lastName", {
                      required: "Last name is required",
                      minLength: {
                        value: 2,
                        message: "Last name must be at least 2 characters",
                      },
                    })}
                  />
                  {errors.lastName && (
                    <span className="label-text-alt text-error mt-1">
                      {errors.lastName.message}
                    </span>
                  )}
                </label>
              </div>

              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text font-medium">Email</span>
                </div>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className={`input input-bordered w-full ${errors.email ? "input-error" : ""}`}
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Enter a valid email address",
                    },
                  })}
                />
                {errors.email && (
                  <span className="label-text-alt text-error mt-1">
                    {errors.email.message}
                  </span>
                )}
              </label>

              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text font-medium">Username</span>
                </div>
                <input
                  type="text"
                  placeholder="your_username"
                  className={`input input-bordered w-full ${errors.username ? "input-error" : ""}`}
                  {...register("username", {
                    required: "Username is required",
                    minLength: {
                      value: 3,
                      message: "Username must be at least 3 characters",
                    },
                  })}
                />
                {errors.username && (
                  <span className="label-text-alt text-error mt-1">
                    {errors.username.message}
                  </span>
                )}
              </label>

              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text font-medium">Password</span>
                </div>
                <div className="join w-full">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a strong password"
                    className={`input input-bordered join-item w-full ${errors.password ? "input-error" : ""}`}
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 8,
                        message: "Password must be at least 8 characters",
                      },
                    })}
                  />
                  <button
                    type="button"
                    className="btn btn-outline join-item"
                    onClick={() => setShowPassword((prev) => !prev)}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                {errors.password && (
                  <span className="label-text-alt text-error mt-1">
                    {errors.password.message}
                  </span>
                )}
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
                    className={`input input-bordered join-item w-full ${errors.confirmPassword ? "input-error" : ""}`}
                    {...register("confirmPassword", {
                      required: "Please confirm your password",
                      validate: (value) =>
                        value === getValues("password") ||
                        "Passwords do not match",
                    })}
                  />
                  <button
                    type="button"
                    className="btn btn-outline join-item"
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                    aria-label={
                      showConfirmPassword
                        ? "Hide confirm password"
                        : "Show confirm password"
                    }
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <span className="label-text-alt text-error mt-1">
                    {errors.confirmPassword.message}
                  </span>
                )}
              </label>

              <label className="label cursor-pointer justify-start gap-3">
                <input
                  type="checkbox"
                  className="checkbox checkbox-primary"
                  {...register("agreeToTerms", {
                    required: "You must accept terms and privacy policy",
                  })}
                />
                <span className="label-text">
                  I agree to the{" "}
                  <span className="link link-primary">Terms</span> and{" "}
                  <span className="link link-primary">Privacy Policy</span>
                </span>
              </label>
              {errors.agreeToTerms && (
                <span className="label-text-alt text-error block -mt-2">
                  {errors.agreeToTerms.message}
                </span>
              )}

              <button
                type="submit"
                className="btn btn-primary w-full mt-2"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Creating Account..." : "Create Account"}
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
