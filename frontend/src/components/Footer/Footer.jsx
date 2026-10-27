import { Link } from "react-router-dom";
import "./Footer.css";
export default function Footer() {
  const sections = [
    [
      "Explore",
      [
        ["All listings", "/search"],
        ["Sell a gadget", "/postAd"],
        ["Journal", "/blog"],
        ["Our story", "/about"],
      ],
    ],
    [
      "Need a hand?",
      [
        ["Help center", "/help-center"],
        ["Questions & answers", "/faq"],
        ["Contact", "/Contact"],
      ],
    ],
    [
      "The details",
      [
        ["Privacy", "/privacy-policy"],
        ["Terms of use", "/terms-and-conditions"],
        ["Your account", "/account"],
      ],
    ],
  ];
  return (
    <footer className="gg-footer">
      <div className="gg-footer-inner">
        <div className="gg-footer-brand">
          <Link to="/">
            Green Gadgets<span>↗</span>
          </Link>
          <p>
            Good technology deserves
            <br />
            another chapter.
          </p>
          <small>Made for a more circular Bangladesh.</small>
        </div>
        {sections.map(([title, links]) => (
          <nav key={title} aria-label={title}>
            <h3>{title}</h3>
            {links.map(([label, to]) => (
              <Link key={to} to={to}>
                {label}
              </Link>
            ))}
          </nav>
        ))}
      </div>
      <div className="gg-footer-bottom">
        <span>© {new Date().getFullYear()} Green Gadgets</span>
        <span>Rethink. Reuse. Repeat.</span>
      </div>
    </footer>
  );
}
