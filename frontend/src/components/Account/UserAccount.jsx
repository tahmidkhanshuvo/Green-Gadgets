import { useContext, useEffect, useState } from "react";
import axios from "axios";
import {
  FaRegUserCircle,
  FaRegHeart,
  FaThLarge,
  FaSlidersH,
} from "react-icons/fa";
import AuthContext from "../../context/AuthContext";
import AdsFavorites from "./AdsFavorites";
import "./UserAccount.css";
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";
export default function UserAccount() {
  const { user, setUser, logout } = useContext(AuthContext),
    [tab, setTab] = useState("myAds"),
    [profile, setProfile] = useState(user || {}),
    [passwords, setPasswords] = useState({
      currentPassword: "",
      newPassword: "",
    }),
    [busy, setBusy] = useState(""),
    [error, setError] = useState(""),
    [notice, setNotice] = useState("");
  useEffect(() => {
    let active = true;
    axios
      .get(`${API_URL}/api/account/profile`)
      .then(({ data }) => {
        if (active) {
          setProfile(data.user);
          setUser(data.user);
        }
      })
      .catch((cause) => {
        if (active) {
          if (cause.response?.status === 401) logout();
          else setError("Unable to refresh your profile. Please try again.");
        }
      });
    return () => {
      active = false;
    };
  }, [user?._id, logout, setUser]);
  const save = async (event, type) => {
    event.preventDefault();
    setBusy(type);
    setError("");
    setNotice("");
    try {
      if (type === "profile") {
        const { data } = await axios.put(`${API_URL}/api/account/update`, {
          name: profile.name.trim(),
          location: profile.location.trim(),
        });
        setProfile(data.user);
        setUser(data.user);
        localStorage.setItem("user", JSON.stringify(data.user));
        setNotice("Your profile has been updated.");
      } else {
        await axios.put(`${API_URL}/api/account/change-password`, passwords);
        setPasswords({ currentPassword: "", newPassword: "" });
        setNotice("Your password has been changed.");
      }
    } catch (cause) {
      setError(
        cause.response?.data?.message ||
          "We could not save your changes. Please try again.",
      );
    } finally {
      setBusy("");
    }
  };
  return (
    <main className="gg-account">
      <div className="gg-account-heading">
        <p>YOUR CIRCULAR CORNER</p>
        <h1>Welcome back, {user?.name?.split(" ")[0] || "there"}.</h1>
        <span>
          Keep track of your listings, save good finds, and make yourself at
          home.
        </span>
      </div>
      <div className="gg-account-layout">
        <nav className="gg-account-tabs" aria-label="Account sections">
          {[
            ["myAds", "Your listings", FaThLarge],
            ["favorites", "Saved finds", FaRegHeart],
            ["settings", "Account settings", FaSlidersH],
          ].map(([key, label, Icon]) => (
            <button
              key={key}
              aria-current={tab === key ? "page" : undefined}
              onClick={() => {
                setTab(key);
                setError("");
                setNotice("");
              }}
            >
              <Icon />
              {label}
            </button>
          ))}
          <button onClick={logout}>
            <FaRegUserCircle />
            Sign out
          </button>
        </nav>
        <div className="gg-account-content">
          {error && (
            <p className="gg-account-error" role="alert">
              {error}
            </p>
          )}
          {notice && (
            <p className="gg-account-notice" role="status">
              {notice}
            </p>
          )}
          {tab === "settings" ? (
            <div className="gg-settings-grid">
              <form onSubmit={(event) => save(event, "profile")}>
                <h2>A little about you</h2>
                <p>Your email identifies your account and listings.</p>
                <label>
                  Email
                  <input value={profile.email || ""} type="email" disabled />
                </label>
                <label>
                  Name
                  <input
                    autoComplete="name"
                    required
                    maxLength={100}
                    value={profile.name || ""}
                    onChange={(event) =>
                      setProfile({ ...profile, name: event.target.value })
                    }
                  />
                </label>
                <label>
                  Location
                  <input
                    required
                    maxLength={150}
                    value={profile.location || ""}
                    onChange={(event) =>
                      setProfile({ ...profile, location: event.target.value })
                    }
                  />
                </label>
                <button disabled={!!busy}>
                  {busy === "profile" ? "Saving…" : "Save details"}
                </button>
              </form>
              <form onSubmit={(event) => save(event, "password")}>
                <h2>Keep your account yours.</h2>
                <p>Confirm your current password before choosing a new one.</p>
                <label>
                  Current password
                  <input
                    type="password"
                    autoComplete="current-password"
                    required
                    value={passwords.currentPassword}
                    onChange={(event) =>
                      setPasswords({
                        ...passwords,
                        currentPassword: event.target.value,
                      })
                    }
                  />
                </label>
                <label>
                  New password
                  <input
                    type="password"
                    autoComplete="new-password"
                    required
                    minLength={6}
                    maxLength={72}
                    value={passwords.newPassword}
                    onChange={(event) =>
                      setPasswords({
                        ...passwords,
                        newPassword: event.target.value,
                      })
                    }
                  />
                </label>
                <small>Use 6–72 characters.</small>
                <button disabled={!!busy}>
                  {busy === "password" ? "Updating…" : "Change password"}
                </button>
              </form>
            </div>
          ) : (
            <AdsFavorites activeTab={tab} />
          )}
        </div>
      </div>
    </main>
  );
}
