import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaArrowRight,
  FaLeaf,
  FaRecycle,
  FaLaptop,
  FaShieldAlt,
} from "react-icons/fa";
import axios from "axios";
import { API_URL } from "../../api";
import heroImage from "../../assets/Home/circular-tech.svg";
import "./Home.css";

export default function HomePage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [ads, setAds] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [state, setState] = useState("loading");
  const [attempt, setAttempt] = useState(0);
  useEffect(() => {
    let active = true;
    setState("loading");
    axios
      .get(`${API_URL}/api/ad`)
      .then(({ data }) => {
        if (active) {
          setAds(Array.isArray(data) ? data.slice(0, 4) : []);
          setState("ready");
        }
      })
      .catch(() => {
        if (active) setState("error");
      });
    axios
      .get(`${API_URL}/api/blog`)
      .then(({ data }) => {
        if (active) setBlogs(Array.isArray(data) ? data.slice(0, 3) : []);
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, [attempt]);
  const browse = (category) =>
    navigate(
      `/search?q=${encodeURIComponent(search.trim())}&category=${encodeURIComponent(category)}`,
    );
  return (
    <main className="gg-portal">
      <section className="gg-hero gg-wrap">
        <div className="gg-hero-copy">
          <p className="gg-eyebrow">
            <FaLeaf /> Better tech. Smaller footprint.
          </p>
          <h1>
            Good gadgets.
            <br />
            <em>A second life.</em>
          </h1>
          <p className="gg-intro">
            Discover pre-loved electronics, find value in what you own, and keep
            good technology in circulation.
          </p>
          <form
            className="gg-search"
            onSubmit={(event) => {
              event.preventDefault();
              browse("All");
            }}
          >
            <label className="gg-sr" htmlFor="gg-query">
              Search electronics
            </label>
            <input
              id="gg-query"
              placeholder="What are you looking for?"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
            <button type="submit" aria-label="Search electronics">
              <FaArrowRight />
            </button>
          </form>
          <div className="gg-categories">
            {["Recycle", "Refurbished", "Reuse"].map((category) => (
              <button key={category} onClick={() => browse(category)}>
                {category} ↗
              </button>
            ))}
          </div>
          <p className="gg-note">
            Less waste. More possibility. Made for Bangladesh.
          </p>
        </div>
        <div className="gg-hero-art">
          <img
            src={heroImage}
            alt="Illustration of a laptop, phone and headphones ready for another chapter"
          />
          <div className="gg-art-note">
            <FaRecycle />
            <div>
              <strong>The future is circular.</strong>
              <span>Buy thoughtfully. Use longer.</span>
            </div>
          </div>
          <span className="gg-art-label">RETHINK · REUSE · REPEAT</span>
        </div>
      </section>
      <section className="gg-values">
        <div className="gg-wrap gg-value-grid">
          <div>
            <FaLaptop />
            <strong>Find your next device</strong>
            <span>Browse by category and location</span>
          </div>
          <div>
            <FaRecycle />
            <strong>Give it another chapter</strong>
            <span>List used, refurbished, or recyclable tech</span>
          </div>
          <div>
            <FaShieldAlt />
            <strong>Connect directly</strong>
            <span>Ask the seller before you decide</span>
          </div>
        </div>
      </section>
      <section className="gg-wrap gg-section">
        <div className="gg-section-top">
          <div>
            <p className="gg-eyebrow">The marketplace</p>
            <h2>Fresh finds. Familiar favourites.</h2>
          </div>
          <Link to="/search">
            Browse all listings <FaArrowRight />
          </Link>
        </div>
        {state === "loading" && (
          <p role="status" className="gg-status">
            Finding your next gadget… Our server may take a moment to wake up.
          </p>
        )}
        {state === "error" && (
          <div role="alert" className="gg-status">
            <p>We couldn’t load listings just now.</p>
            <button onClick={() => setAttempt((value) => value + 1)}>
              Try again
            </button>
          </div>
        )}
        {state === "ready" && !ads.length && (
          <div className="gg-status">
            <p>A new marketplace starts with you.</p>
            <Link to="/postAd">Post the first listing ↗</Link>
          </div>
        )}
        <div className="gg-products">
          {ads.map((ad) => (
            <Link
              className="gg-product"
              to={`/productdetails/${ad._id}`}
              key={ad._id}
            >
              <div className="gg-product-image">
                {ad.images?.[0] ? (
                  <img loading="lazy" src={ad.images[0]} alt={ad.title} />
                ) : (
                  <FaLaptop />
                )}
                <span>{ad.category}</span>
              </div>
              <div className="gg-product-info">
                <p>{ad.location || "Bangladesh"}</p>
                <h3>{ad.title}</h3>
                <strong>
                  ৳ {Number(ad.price || 0).toLocaleString("en-BD")}
                </strong>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <section className="gg-wrap gg-sell">
        <div>
          <p className="gg-eyebrow">Make room for what’s next</p>
          <h2>
            Your unused tech
            <br />
            is someone’s next upgrade.
          </h2>
          <p>Take a few photos, tell its story, and find it a new home.</p>
          <Link className="gg-primary" to="/postAd">
            Post a free listing <FaArrowRight />
          </Link>
        </div>
        <span className="gg-loop" aria-hidden="true">
          ↻
        </span>
      </section>
      {blogs.length > 0 && (
        <section className="gg-wrap gg-section">
          <div className="gg-section-top">
            <div>
              <p className="gg-eyebrow">The circular journal</p>
              <h2>A little knowledge goes a long way.</h2>
            </div>
            <Link to="/blog">
              Read the journal <FaArrowRight />
            </Link>
          </div>
          <div className="gg-articles">
            {blogs.map((blog) => (
              <Link
                className="gg-article"
                key={blog._id}
                to={`/blog/${blog._id}`}
              >
                {blog.images?.[0] && (
                  <img loading="lazy" src={blog.images[0]} alt="" />
                )}
                <h3>{blog.title}</h3>
                <span>Read story ↗</span>
              </Link>
            ))}
          </div>
        </section>
      )}
      <section className="gg-wrap gg-about">
        <p className="gg-eyebrow">Built around a simple idea</p>
        <h2>The best gadget is one that keeps going.</h2>
        <p>
          Green Gadgets connects people who want technology to last longer.
          Explore our story, get help with your first listing, or learn more
          about responsible reuse.
        </p>
        <div>
          <Link to="/about">Our story ↗</Link>
          <Link to="/help-center">Visit the help center ↗</Link>
        </div>
      </section>
    </main>
  );
}
