import React, { useState, useEffect } from "react";
import MyNavbar from "../components/MyNavbar";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import userApi from "../api/userApi";

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [currentUserId, setCurrentUserId] = useState(null);

  const [profile, setProfile] = useState({
    userName: "",
    mobileNo: "",
    email: "",
    address: "",
  });

  const [originalProfile, setOriginalProfile] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");
      let userId = localStorage.getItem("userId");

      // ✅ Extract userId from stored user object if not found directly
      if (!userId) {
        const userString = localStorage.getItem("user");
        if (userString) {
          try {
            const user = JSON.parse(userString);
            userId = user.userId || user.id;
            if (userId) {
              localStorage.setItem("userId", userId.toString());
              setCurrentUserId(userId);
            }
          } catch (parseError) {
            console.error("Failed to parse user ", parseError);
          }
        }
      } else {
        setCurrentUserId(userId);
      }

      console.log("Token exists:", !!token);
      console.log("UserId:", userId);
      console.log("All localStorage keys:", Object.keys(localStorage));

      if (!token) {
        console.log("❌ Missing token - redirecting to login");
        setError("Please login to view your profile");
        navigate("/login");
        return;
      }

      let userData = null;

      // ✅ Method 1: Try individual profile endpoint first
      if (userId) {
        try {
          console.log("🚀 Trying individual profile API...");
          const response = await userApi.getUserProfile(userId, token);
          userData = response.data.data || response.data;
          console.log(
            "✅ Profile data received from individual API:",
            userData
          );
        } catch (profileErr) {
          console.log("Individual profile API failed, trying getAllUsers...");
          userData = null;
        }
      }

      // ✅ Method 2: Fallback to getAllUsers API (integrating existing API)
      if (!userData) {
        try {
          console.log("🚀 Using getAllUsers API as fallback...");
          const allUsersResponse = await userApi.getAllUsers(token);
          const allUsers = allUsersResponse.data.data || allUsersResponse.data;

          if (userId) {
            // Find user by ID
            userData = allUsers.find(
              (user) =>
                user.userId === parseInt(userId) || user.id === parseInt(userId)
            );
          } else {
            // If no userId, try to match by token/email (you might need to decode token)
            const userFromStorage = JSON.parse(
              localStorage.getItem("user") || "{}"
            );
            if (userFromStorage.email) {
              userData = allUsers.find(
                (user) => user.email === userFromStorage.email
              );
            }
          }

          if (userData) {
            // Store the userId for future use
            const foundUserId = userData.userId || userData.id;
            if (foundUserId) {
              localStorage.setItem("userId", foundUserId.toString());
              setCurrentUserId(foundUserId);
            }
            console.log("✅ Profile data found from getAllUsers:", userData);
          }
        } catch (allUsersErr) {
          console.error("getAllUsers API also failed:", allUsersErr);
        }
      }

      if (!userData) {
        throw new Error("Could not fetch user profile from any method");
      }

      const profileData = {
        userName: userData.userName || "",
        mobileNo: userData.mobileNo || "",
        email: userData.email || "",
        address: userData.address || "",
      };

      setProfile(profileData);
      setOriginalProfile(profileData);
    } catch (err) {
      console.error("❌ Profile fetch failed:", err);
      console.error("Error response:", err.response?.data);
      console.error("Error status:", err.response?.status);

      if (err.response?.status === 401) {
        setError("Session expired. Please login again.");
        navigate("/login");
      } else {
        setError("Failed to load profile data. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
    setError("");
  };

  const validateProfile = (profileData) => {
    const errors = {};

    if (!profileData.userName || profileData.userName.trim().length < 2) {
      errors.userName = "Name must be at least 2 characters";
    }

    if (
      !profileData.email ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profileData.email)
    ) {
      errors.email = "Please enter a valid email address";
    }

    if (!profileData.mobileNo || !/^\d{10}$/.test(profileData.mobileNo)) {
      errors.mobileNo = "Please enter a valid 10-digit mobile number";
    }

    if (!profileData.address || profileData.address.trim().length < 5) {
      errors.address = "Address must be at least 5 characters";
    }

    return errors;
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setError("");

      const errors = validateProfile(profile);
      if (Object.keys(errors).length > 0) {
        setError(
          "Please fix the validation errors: " +
            Object.values(errors).join(", ")
        );
        return;
      }

      const token = localStorage.getItem("token");
      // ✅ Use the currentUserId state or try to get it again
      let userId = currentUserId || localStorage.getItem("userId");

      if (!userId) {
        const userString = localStorage.getItem("user");
        if (userString) {
          try {
            const user = JSON.parse(userString);
            userId = user.userId || user.id;
          } catch (parseError) {
            console.error("Failed to parse user data for save:", parseError);
          }
        }
      }

      if (!token || !userId) {
        setError("Session expired. Please login again.");
        navigate("/login");
        return;
      }

      const updateData = {
        userName: profile.userName,
        email: profile.email,
        mobileNo: profile.mobileNo,
        address: profile.address,
      };

      console.log("🚀 Updating profile for userId:", userId);
      await userApi.updateUser(userId, updateData, token);

      // ✅ Update localStorage user object as well
      const userString = localStorage.getItem("user");
      if (userString) {
        try {
          const user = JSON.parse(userString);
          const updatedUser = { ...user, ...updateData };
          localStorage.setItem("user", JSON.stringify(updatedUser));
        } catch (parseError) {
          console.log("Could not update localStorage user object");
        }
      }

      setOriginalProfile(profile);
      setIsEditing(false);
      setError("");
      alert("Profile updated successfully! ✅");
    } catch (err) {
      console.error("Failed to update profile:", err);
      if (err.response?.status === 401) {
        setError("Session expired. Please login again.");
        navigate("/login");
      } else if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Failed to update profile. Please try again.");
      }
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setProfile(originalProfile);
    setIsEditing(false);
    setError("");
  };

  const handleCart = () => {
    navigate("/cart");
  };

  const handleInvoice = () => {
    navigate("/invoicePage");
  };

  const handleOrder = () => {
    navigate("/orderHistory");
  };

  // Loading state
  if (loading) {
    return (
      <div>
        <MyNavbar />
        <div className="container mt-4 d-flex justify-content-center">
          <div className="text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-2">Loading profile...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <MyNavbar />

      <div className="container mt-4 d-flex align-items-center justify-content-center mb-5">
        <div className="row w-50">
          <h3 className="text-center">
            {isEditing ? "Edit Profile" : "My Profile"}
          </h3>

          {/* Error Message */}
          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}

          <div className="card p-3">
            {[
              { field: "userName", label: "Name", type: "text" },
              { field: "mobileNo", label: "Mobile", type: "tel" },
              { field: "email", label: "Email", type: "email" },
              { field: "address", label: "Address", type: "text" },
            ].map(({ field, label, type }) => (
              <div className="mb-3" key={field}>
                <label className="form-label">{label}</label>
                <input
                  type={type}
                  className="form-control"
                  name={field}
                  value={profile[field]}
                  onChange={handleChange}
                  disabled={!isEditing}
                  placeholder={`Enter your ${label.toLowerCase()}`}
                />
              </div>
            ))}

            {!isEditing ? (
              <button
                className="btn btn-primary"
                onClick={() => setIsEditing(true)}
              >
                Edit Profile
              </button>
            ) : (
              <div>
                <button
                  className="btn btn-success me-2"
                  onClick={handleSave}
                  disabled={saving}
                >
                  {saving ? "Saving..." : "Save Changes"}
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={handleCancel}
                  disabled={saving}
                >
                  Cancel
                </button>
              </div>
            )}
          </div>

          {/* Navigation Links */}
          <div className="mt-3">
            <button className="btn btn-info me-2" onClick={handleInvoice}>
              Invoice
            </button>
            <button className="btn btn-dark me-2" onClick={handleCart}>
              Show Cart
            </button>
            <button className="btn btn-warning" onClick={handleOrder}>
              Your Orders
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
