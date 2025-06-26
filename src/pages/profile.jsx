import { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { storeContext } from "../context/storeContext";
import Spinner from "../Layout/Spinner";
import { toast } from "react-toastify";

function Profile() {
  const { isLoading, fetchProfile, profile, setProfile, apiUrl } =
    useContext(storeContext);

  const [showForm, setShowForm] = useState(false);
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchProfile();
  }, []);

  useEffect(() => {
    if (profile && showForm) {
      setUsername(profile.userName || "");
      setBio(profile.bio || "");
    }
  }, [profile, showForm]);

  function handleBack() {
    navigate("/dashboard");
  }

  function toggleForm() {
    setShowForm(!showForm);
  }

  async function handleUpdateSubmit(e) {
    e.preventDefault();

    try {
      const response = await fetch(`${apiUrl}/profile/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("bookApp_token")}`,
        },
        body: JSON.stringify({ userName: username, bio }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Profile updated successfully!");
        setShowForm(false);
        fetchProfile();
      } else {
        toast.error(data.message || "Update failed.");
      }
    } catch (error) {
      toast.error("An error occurred while updating profile.");
      console.error(error);
    }
  }

  if (isLoading) return <Spinner />;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Profile</h1>

      {!profile ? (
        <p className="text-red-500">Profile not found</p>
      ) : (
        <div className="bg-white rounded-xl shadow-md p-6 max-w-xl mx-auto mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            Username: {profile.userName}
          </h2>
          <p className="mt-4 text-gray-600">
            Bio: {profile.bio || "No bio yet."}
          </p>
        </div>
      )}

      <button
        onClick={toggleForm}
        className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
      >
        {showForm ? "Cancel" : "Update"}
      </button>

      {showForm && (
        <form
          onSubmit={handleUpdateSubmit}
          className="mt-6 bg-white p-6 rounded shadow-md max-w-xl mx-auto"
        >
          <h3 className="text-xl font-bold mb-4">Update Profile</h3>
          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              className="w-full border text-gray-700 rounded px-3 py-2"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Bio
            </label>
            <textarea
              className="w-full border text-gray-700 rounded px-3 py-2"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Save Changes
          </button>
        </form>
      )}

      <button
        onClick={handleBack}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-6"
      >
        Back to Dashboard
      </button>
    </div>
  );
}

export default Profile;
