import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { FaArrowLeft, FaArrowRight, FaSearch, FaLaptop } from "react-icons/fa";
import axios from "axios";
import "./Product-Search.css";
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";
export default function ProductSearch() {
  const [params, setParams] = useSearchParams(),
    [ads, setAds] = useState([]),
    [state, setState] = useState("loading"),
    [attempt, setAttempt] = useState(0);
  const query = params.get("q") || "",
    category = params.get("category") || "All",
    sub = params.get("sub") || "All",
    location = params.get("location") || "All",
    sort = params.get("sort") || "newest";
  const update = (key, value) => {
    setParams(
      (current) => {
        const next = new URLSearchParams(current);
        next.set(key, value);
        if (key !== "page") next.delete("page");
        if (key === "category") next.delete("sub");
        return next;
      },
      { replace: key === "q" },
    );
  };
  useEffect(() => {
    let active = true;
    setState("loading");
    axios
      .get(`${API_URL}/api/ad`)
      .then(({ data }) => {
        if (active) {
          setAds(Array.isArray(data) ? data : []);
          setState("ready");
        }
      })
      .catch(() => {
        if (active) setState("error");
      });
    return () => {
      active = false;
    };
  }, [attempt]);
  const filtered = useMemo(() => {
    const results = ads.filter(
      (ad) =>
        (category === "All" || ad.category === category) &&
        (sub === "All" || ad.subCategory === sub) &&
        (location === "All" || ad.location === location) &&
        [ad.title, ad.description].some((value) =>
          String(value || "")
            .toLowerCase()
            .includes(query.toLowerCase()),
        ),
    );
    if (sort === "price-low") results.sort((a, b) => a.price - b.price);
    if (sort === "price-high") results.sort((a, b) => b.price - a.price);
    return results;
  }, [ads, query, category, sub, location, sort]);
  const totalPages = Math.max(1, Math.ceil(filtered.length / 9)),
    page = Math.min(
      totalPages,
      Math.max(1, parseInt(params.get("page"), 10) || 1),
    ),
    products = filtered.slice((page - 1) * 9, page * 9);
  const subcategories = [
      ...new Set(
        ads
          .filter((ad) => category === "All" || ad.category === category)
          .map((ad) => ad.subCategory)
          .filter(Boolean),
      ),
    ].sort(),
    locations = [
      ...new Set(ads.map((ad) => ad.location).filter(Boolean)),
    ].sort();
  return (
    <main className="gg-market">
      <div className="gg-market-title">
        <div>
          <p>THE CIRCULAR MARKETPLACE</p>
          <h1>Find your next good thing.</h1>
          <span>Pre-loved, refurbished, and ready for another chapter.</span>
        </div>
        <Link to="/postAd">Give a gadget a new home ↗</Link>
      </div>
      <div className="gg-market-search">
        <FaSearch />
        <label className="gg-search-label" htmlFor="market-query">
          Search listings
        </label>
        <input
          id="market-query"
          value={query}
          onChange={(event) => update("q", event.target.value)}
          placeholder="Search phones, laptops, components…"
        />
        <span>
          {state === "ready"
            ? `${filtered.length} listings`
            : "Finding listings…"}
        </span>
      </div>
      <div className="gg-market-layout">
        <aside aria-label="Listing filters">
          <div className="gg-filter-heading">
            <h2>Make it yours.</h2>
            <button onClick={() => setParams({})}>Reset</button>
          </div>
          <label>
            Listing type
            <select
              value={category}
              onChange={(event) => update("category", event.target.value)}
            >
              {["All", "Reuse", "Refurbished", "Recycle"].map((value) => (
                <option key={value}>{value}</option>
              ))}
            </select>
          </label>
          <label>
            Device category
            <select
              value={sub}
              onChange={(event) => update("sub", event.target.value)}
            >
              <option>All</option>
              {subcategories.map((value) => (
                <option key={value}>{value}</option>
              ))}
            </select>
          </label>
          <label>
            Location
            <select
              value={location}
              onChange={(event) => update("location", event.target.value)}
            >
              <option>All</option>
              {locations.map((value) => (
                <option key={value}>{value}</option>
              ))}
            </select>
          </label>
          <p>
            Ask the seller about condition and availability before making
            arrangements.
          </p>
        </aside>
        <section aria-label="Search results">
          <div className="gg-results-top">
            <p>
              {query
                ? `Results for “${query}”`
                : "Good finds, waiting for you."}
            </p>
            <label>
              Sort by
              <select
                value={sort}
                onChange={(event) => update("sort", event.target.value)}
              >
                <option value="newest">Newest first</option>
                <option value="price-low">Price: low to high</option>
                <option value="price-high">Price: high to low</option>
              </select>
            </label>
          </div>
          {state === "loading" ? (
            <div className="gg-market-empty" role="status">
              Finding your next gadget… The server may take a moment to wake up.
            </div>
          ) : state === "error" ? (
            <div className="gg-market-empty" role="alert">
              <h2>We couldn't load the marketplace.</h2>
              <button onClick={() => setAttempt((value) => value + 1)}>
                Try again
              </button>
            </div>
          ) : products.length ? (
            <>
              <div className="gg-market-cards">
                {products.map((ad) => (
                  <Link key={ad._id} to={`/productdetails/${ad._id}`}>
                    <div className="gg-market-image">
                      {ad.mainImage || ad.images?.[0] ? (
                        <img
                          loading="lazy"
                          src={ad.mainImage || ad.images[0]}
                          alt={ad.title}
                        />
                      ) : (
                        <FaLaptop />
                      )}
                      <span>{ad.category}</span>
                    </div>
                    <div className="gg-market-card-copy">
                      <small>{ad.location}</small>
                      <h2>{ad.title}</h2>
                      <strong>
                        ৳ {Number(ad.price || 0).toLocaleString("en-BD")}
                      </strong>
                      <span>View listing ↗</span>
                    </div>
                  </Link>
                ))}
              </div>
              <nav className="gg-market-pagination" aria-label="Results pages">
                <button
                  disabled={page <= 1}
                  onClick={() => update("page", String(page - 1))}
                >
                  <FaArrowLeft />
                  Previous
                </button>
                <span>
                  Page {page} of {totalPages}
                </span>
                <button
                  disabled={page >= totalPages}
                  onClick={() => update("page", String(page + 1))}
                >
                  Next
                  <FaArrowRight />
                </button>
              </nav>
            </>
          ) : (
            <div className="gg-market-empty">
              <FaSearch size={25} />
              <h2>No matches just yet.</h2>
              <p>Try a different search or broaden your filters.</p>
              <button onClick={() => setParams({})}>
                Explore all listings
              </button>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
