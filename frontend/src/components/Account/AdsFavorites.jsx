import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import AuthContext from "../../context/AuthContext";
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";
export default function AdsFavorites({ activeTab }) {
  const { user, setUser } = useContext(AuthContext),
    [ads, setAds] = useState([]),
    [loading, setLoading] = useState(true),
    [error, setError] = useState(""),
    [attempt, setAttempt] = useState(0),
    [busy, setBusy] = useState("");
  const owned = activeTab === "myAds";
  useEffect(() => {
    let active = true;
    setLoading(true);
    setError("");
    axios
      .get(`${API_URL}${owned ? "/api/ad/mine" : "/api/account/favorites"}`)
      .then(({ data }) => {
        if (active) setAds(Array.isArray(data) ? data : []);
      })
      .catch(() => {
        if (active)
          setError("We could not load these listings. Please try again.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [owned, attempt, user?._id]);
  const update = async (ad) => {
    setBusy(ad._id);
    setError("");
    try {
      if (owned) {
        const { data } = await axios.patch(
          `${API_URL}/api/ad/${ad._id}/status`,
          { status: ad.status === "sold" ? "active" : "sold" },
        );
        setAds((current) =>
          current.map((item) => (item._id === ad._id ? data : item)),
        );
      } else {
        const { data } = await axios.delete(
          `${API_URL}/api/account/favorites/${ad._id}`,
        );
        const next = { ...user, favorites: data.favorites };
        setUser(next);
        localStorage.setItem("user", JSON.stringify(next));
        setAds((current) => current.filter((item) => item._id !== ad._id));
      }
    } catch {
      setError("Unable to update this listing. Please try again.");
    } finally {
      setBusy("");
    }
  };
  return (
    <section>
      <div className="gg-account-section-top">
        <div>
          <h2>{owned ? "Your listings" : "Saved finds"}</h2>
          <p>
            {owned
              ? "Give good tech its next chapter. Mark a listing as sold when it finds a home."
              : "A little collection of possibilities. Saved listings follow your account."}
          </p>
        </div>
        {owned && <Link to="/postAd">Post a listing ↗</Link>}
      </div>
      {error && (
        <p role="alert" className="gg-account-error">
          {error}
          <button
            className="gg-inline"
            onClick={() => setAttempt((value) => value + 1)}
          >
            Retry
          </button>
        </p>
      )}
      {loading ? (
        <p role="status">Loading your listings…</p>
      ) : ads.length ? (
        <div className="gg-account-cards">
          {ads.map((ad) => (
            <article key={ad._id}>
              <Link to={`/productdetails/${ad._id}`}>
                <img
                  loading="lazy"
                  src={ad.mainImage || ad.images?.[0]}
                  alt={ad.title}
                />
                <div>
                  <small>{ad.status === "sold" ? "SOLD" : ad.category}</small>
                  <h3>{ad.title}</h3>
                  <strong>৳ {Number(ad.price).toLocaleString("en-BD")}</strong>
                  <p>{ad.location}</p>
                </div>
              </Link>
              <button disabled={busy === ad._id} onClick={() => update(ad)}>
                {busy === ad._id
                  ? "Updating…"
                  : owned
                    ? ad.status === "sold"
                      ? "Make available again"
                      : "Mark as sold"
                    : "Remove from saved"}
              </button>
            </article>
          ))}
        </div>
      ) : (
        <div className="gg-account-empty">
          <h3>
            {owned
              ? "Your next listing starts here."
              : "Make space for a good find."}
          </h3>
          <p>
            {owned
              ? "Take a few photos and tell buyers what makes your gadget worth keeping."
              : "Open any listing and choose Save listing to keep it here."}
          </p>
          <Link to={owned ? "/postAd" : "/search"}>
            {owned ? "Post your first listing" : "Explore the marketplace"} ↗
          </Link>
        </div>
      )}
    </section>
  );
}
