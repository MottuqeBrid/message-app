import { useEffect, useState } from "react";
import EditProfileModal from "../../components/Profile/EditProfileModal";
// import useAuth from "../../hook/useAuth";
import useAxiosSecure from "../../hook/useAxiosSecure";

const demoUser = {
  email: "sahoreia.dev@gmail.com",
  name: "Sahoreia Rahman",
  username: "@sahoreia",
  age: 24,
  gender: "female",
  phone: "+880 1712-345678",
  image: {
    profile: "https://i.pravatar.cc/300?img=32",
    cover:
      "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=1400&auto=format&fit=crop",
    others: [
      { url: "https://picsum.photos/seed/p1/300/200", type: "travel" },
      { url: "https://picsum.photos/seed/p2/300/200", type: "work" },
      { url: "https://picsum.photos/seed/p3/300/200", type: "family" },
      { url: "https://picsum.photos/seed/p4/300/200", type: "hobby" },
    ],
  },
  friends: [
    { _id: "u_101", name: "Arif Hasan", username: "@arif" },
    { _id: "u_102", name: "Nadia Karim", username: "@nadia" },
    { _id: "u_103", name: "Mia Rahman", username: "@mia" },
    { _id: "u_104", name: "Rasel Ahmed", username: "@rasel" },
  ],
  requests: [
    { _id: "u_201", name: "David Miller", username: "@david" },
    { _id: "u_202", name: "Priya Das", username: "@priya" },
  ],
  blocked: [{ _id: "u_301", name: "Spam Account", username: "@spam_user" }],
  blockedBy: [
    { _id: "u_401", name: "Private User", username: "@private_user" },
  ],
  followers: [
    { _id: "u_501", name: "Tanvir Ahmed", username: "@tanvir" },
    { _id: "u_502", name: "Sadia Islam", username: "@sadia" },
    { _id: "u_503", name: "John Carter", username: "@johnc" },
    { _id: "u_504", name: "Liza Noor", username: "@liza" },
    { _id: "u_505", name: "Nitu Akter", username: "@nitu" },
  ],
  following: [
    { _id: "u_601", name: "Rafid Islam", username: "@rafid" },
    { _id: "u_602", name: "Rony Das", username: "@rony" },
    { _id: "u_603", name: "Emma Watson", username: "@emma" },
  ],
  posts: ["p_1", "p_2", "p_3", "p_4", "p_5", "p_6"],
  comments: ["c_1", "c_2", "c_3", "c_4"],
  notifications: ["n_1", "n_2", "n_3", "n_4", "n_5"],
};

const StatCard = ({ title, value }) => (
  <div className="rounded-xl border border-base-300 bg-base-100 p-4">
    <p className="text-sm text-base-content/70">{title}</p>
    <p className="text-2xl font-bold text-base-content">{value}</p>
  </div>
);

const UserList = ({ title, users }) => (
  <div className="card bg-base-100 border border-base-300 shadow-sm">
    <div className="card-body p-5">
      <h3 className="text-lg font-semibold text-base-content">{title}</h3>
      <div className="mt-3 space-y-2">
        {users.length === 0 ? (
          <p className="text-sm text-base-content/70">No data</p>
        ) : (
          users.map((user) => (
            <div
              key={user._id}
              className="flex items-center justify-between rounded-lg border border-base-300 bg-base-200/30 px-3 py-2"
            >
              <p className="font-medium text-base-content">{user.name}</p>
              <p className="text-sm text-base-content/70">{user.username}</p>
            </div>
          ))
        )}
      </div>
    </div>
  </div>
);

const Profile = () => {
  const [activeList, setActiveList] = useState("friends");
  const [userData, setUserData] = useState(demoUser);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const axiosInstance = useAxiosSecure();
  // const { user } = useAuth();
  const listMap = {
    friends: userData.friends,
    followers: userData.followers,
    following: userData.following,
  };
  const fetchUserData = async () => {
    try {
      const res = await axiosInstance.get(`/user/profile`);
      console.log(res);
      setUserData(res.data?.data || demoUser);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    return () => fetchUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSaveProfile = (updatedFields) => {
    setUserData((prev) => ({
      ...prev,
      ...updatedFields,
      image: {
        ...prev.image,
        ...(updatedFields.image || {}),
      },
    }));
    setIsEditModalOpen(false);
  };

  return (
    <section className="p-4 md:p-6 lg:p-8 space-y-6">
      <div className="rounded-2xl overflow-hidden border border-base-300 bg-base-100 shadow-sm">
        <div className="h-44 md:h-56 bg-base-300">
          <img
            src={userData.image.cover}
            alt="Cover"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="px-5 pb-5 md:px-6 md:pb-6">
          <div className="-mt-14 md:-mt-16 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div className="flex items-end gap-4">
              <div className="avatar">
                <div className="w-24 md:w-28 rounded-full ring ring-base-100 ring-offset-base-100 ring-offset-2">
                  <img src={userData.image.profile} alt={userData.name} />
                </div>
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold">
                  {userData.name}
                </h1>
                <p className="text-base-content/70">{userData.username}</p>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                className="btn btn-primary btn-sm md:btn-md"
                onClick={() => setIsEditModalOpen(true)}
              >
                Edit Profile
              </button>
              <button className="btn btn-outline btn-sm md:btn-md">
                Share
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
        <StatCard title="Friends" value={userData.friends.length} />
        <StatCard title="Requests" value={userData.requests.length} />
        <StatCard title="Followers" value={userData.followers.length} />
        <StatCard title="Following" value={userData.following.length} />
        <StatCard title="Posts" value={userData.posts.length} />
        <StatCard title="Comments" value={userData.comments.length} />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        <aside className="xl:col-span-4 space-y-6">
          <div className="card bg-base-100 border border-base-300 shadow-sm">
            <div className="card-body p-5">
              <h2 className="text-xl font-semibold text-base-content">About</h2>
              <div className="mt-3 space-y-2 text-sm">
                <p>
                  <span className="font-semibold">Email:</span> {demoUser.email}
                  <span className="font-semibold">Email:</span> {userData.email}
                </p>
                <p>
                  <span className="font-semibold">Phone:</span> {userData.phone}
                </p>
                <p>
                  <span className="font-semibold">Age:</span> {userData.age}
                </p>
                <p>
                  <span className="font-semibold">Gender:</span>{" "}
                  {userData.gender}
                </p>
                <p>
                  <span className="font-semibold">Blocked:</span>{" "}
                  {userData.blocked.length}
                </p>
                <p>
                  <span className="font-semibold">Blocked By:</span>{" "}
                  {userData.blockedBy.length}
                </p>
                <p>
                  <span className="font-semibold">Notifications:</span>{" "}
                  {userData.notifications.length}
                </p>
              </div>
            </div>
          </div>

          <UserList title="Friend Requests" users={userData.requests} />
          <UserList title="Blocked Users" users={userData.blocked} />
        </aside>

        <main className="xl:col-span-8 space-y-6">
          <div className="card bg-base-100 border border-base-300 shadow-sm">
            <div className="card-body p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="text-xl font-semibold text-base-content">
                  Connections
                </h2>
                <div className="join">
                  <button
                    onClick={() => setActiveList("friends")}
                    className={`btn btn-sm join-item ${
                      activeList === "friends" ? "btn-primary" : "btn-outline"
                    }`}
                  >
                    Friends
                  </button>
                  <button
                    onClick={() => setActiveList("followers")}
                    className={`btn btn-sm join-item ${
                      activeList === "followers" ? "btn-primary" : "btn-outline"
                    }`}
                  >
                    Followers
                  </button>
                  <button
                    onClick={() => setActiveList("following")}
                    className={`btn btn-sm join-item ${
                      activeList === "following" ? "btn-primary" : "btn-outline"
                    }`}
                  >
                    Following
                  </button>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
                {listMap[activeList].map((user) => (
                  <div
                    key={user._id}
                    className="rounded-xl border border-base-300 bg-base-200/30 p-3 flex items-center justify-between"
                  >
                    <div>
                      <p className="font-semibold text-base-content">
                        {user.name}
                      </p>
                      <p className="text-sm text-base-content/70">
                        {user.username}
                      </p>
                    </div>
                    <button className="btn btn-ghost btn-sm">View</button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="card bg-base-100 border border-base-300 shadow-sm">
            <div className="card-body p-5">
              <h2 className="text-xl font-semibold text-base-content">
                Photo Gallery
              </h2>
              <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
                {userData.image.others.map((img, index) => (
                  <div
                    key={`${img.url}-${index}`}
                    className="rounded-xl overflow-hidden border border-base-300"
                  >
                    <img
                      src={img.url}
                      alt={img.type}
                      className="w-full h-28 object-cover"
                    />
                    <p className="text-xs capitalize p-2 bg-base-200/50">
                      {img.type}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>

      {isEditModalOpen && (
        <EditProfileModal
          onClose={() => setIsEditModalOpen(false)}
          initialData={userData}
          onSave={handleSaveProfile}
        />
      )}
    </section>
  );
};

export default Profile;
