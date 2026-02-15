import React from "react";
import { Link } from "react-router";
import { useForm } from "react-hook-form";

const Login = () => {

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmit = (data) => {
    console.log("Login Data:", data);
    // এখানে Firebase বা API call করবে
  };

  return (
    <div className="flex justify-center items-center w-full">
      <div className="card bg-base-100 w-full max-w-md shadow-2xl">
        <div className="card-body">

          <h2 className="text-2xl font-bold text-center mb-6">
            Login to Your Account
          </h2>

          <form onSubmit={handleSubmit(onSubmit)}>

            {/* Email */}
            <div className="mb-4">
              <label className="label">
                <span className="label-text">Email</span>
              </label>

              <input
                type="email"
                placeholder="Enter your email"
                className="input input-bordered w-full"
                {...register("email", {
                  required: "Email is required"
                })}
              />

              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="mb-2">
              <label className="label">
                <span className="label-text">Password</span>
              </label>

              <input
                type="password"
                placeholder="Enter your password"
                className="input input-bordered w-full"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters"
                  }
                })}
              />

              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Remember + Forgot */}
            <div className="flex justify-between items-center mb-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="checkbox checkbox-sm"
                  {...register("remember")}
                />
                <span className="text-sm">Remember me</span>
              </label>

              <Link to="/forgot-password" className="text-sm link link-hover">
                Forgot password?
              </Link>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="btn btn-primary text-black w-full mt-2"
            >
              Login
            </button>

          </form>

          <p className="text-center mt-6 text-sm">
            Don’t have an account?{" "}
            <Link
              to="/register"
              className="link link-hover font-semibold text-primary"
            >
              Register
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
};

export default Login;
