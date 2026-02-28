import useAxiosSecure from "../../hook/useAxiosSecure";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";

const EditProfileModal = ({ onClose, initialData, onSave }) => {
  const axiosInstance = useAxiosSecure();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: initialData?.name || "",
      username: initialData?.username || "",
      email: initialData?.email || "",
      phone: initialData?.phone || "",
      age: initialData?.age || "",
      gender: initialData?.gender || "female",
      profileImage: initialData?.image?.profile || "",
      coverImage: initialData?.image?.cover || "",
    },
  });

  const onSubmit = async (data) => {
    if (!data.name?.trim() || !data.username?.trim() || !data.email?.trim()) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please fill in all required fields",
      });
      return;
    }

    const payload = {
      name: data.name.trim(),
      username: data.username.trim(),
      email: data.email.trim(),
      phone: data.phone || "",
      age: Number(data.age) || 0,
      gender: data.gender,
      image: {
        profile: data.profileImage || "",
        cover: data.coverImage || "",
      },
    };

    try {
      await axiosInstance.patch("/user/profile", payload);
      onSave(payload);
      Swal.fire({
        icon: "success",
        title: "Profile updated",
        timer: 1200,
        showConfirmButton: false,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Update failed",
        text: error?.response?.data?.message || "Please try again",
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-2xl rounded-2xl border border-base-300 bg-base-100 shadow-xl">
        <div className="flex items-center justify-between border-b border-base-300 p-4">
          <h3 className="text-lg font-semibold text-base-content">
            Edit Profile
          </h3>
          <button className="btn btn-ghost btn-sm" onClick={onClose}>
            ✕
          </button>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-4 md:p-5 space-y-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <label className="form-control w-full">
              <span className="label-text mb-1">Name</span>
              <input
                className="input input-bordered w-full"
                {...register("name", { required: "Name is required" })}
              />
              {errors.name && (
                <span className="text-xs text-error mt-1">
                  {errors.name.message}
                </span>
              )}
            </label>

            <label className="form-control w-full">
              <span className="label-text mb-1">Username</span>
              <input
                className="input input-bordered w-full"
                {...register("username", { required: "Username is required" })}
              />
              {errors.username && (
                <span className="text-xs text-error mt-1">
                  {errors.username.message}
                </span>
              )}
            </label>

            <label className="form-control w-full">
              <span className="label-text mb-1">Email</span>
              <input
                type="email"
                readOnly
                className="input input-bordered w-full"
                {...register("email", { required: "Email is required" })}
              />
            </label>

            <label className="form-control w-full">
              <span className="label-text mb-1">Phone</span>
              <input
                className="input input-bordered w-full"
                {...register("phone")}
              />
            </label>

            <label className="form-control w-full">
              <span className="label-text mb-1">Age</span>
              <input
                type="number"
                min="0"
                max="100"
                className="input input-bordered w-full"
                {...register("age", {
                  min: { value: 0, message: "Age must be at least 0" },
                  max: { value: 100, message: "Age must be at most 100" },
                })}
              />
              {errors.age && (
                <span className="text-xs text-error mt-1">
                  {errors.age.message}
                </span>
              )}
            </label>

            <label className="form-control w-full">
              <span className="label-text mb-1">Gender</span>
              <select
                className="select select-bordered w-full"
                {...register("gender")}
              >
                <option value="male">male</option>
                <option value="female">female</option>
              </select>
            </label>

            <label className="form-control w-full md:col-span-2">
              <span className="label-text mb-1">Profile Image URL</span>
              <input
                className="input input-bordered w-full"
                {...register("profileImage")}
              />
            </label>

            <label className="form-control w-full md:col-span-2">
              <span className="label-text mb-1">Cover Image URL</span>
              <input
                className="input input-bordered w-full"
                {...register("coverImage")}
              />
            </label>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              className="btn btn-ghost"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfileModal;
