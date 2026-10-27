import { Link } from "react-router-dom";
import "./Contact.css";
export default function Contact() {
  return (
    <main className="contact-container">
      <p>WE'RE HERE TO HELP</p>
      <h1 className="contact-title">Let's keep good tech going.</h1>
      <div className="contact-info">
        <section className="contact-item">
          <h2>Marketplace help</h2>
          <p>
            Need help posting a listing, finding a device, or starting a
            conversation?
          </p>
          <Link to="/help-center">Visit the help center ↗</Link>
        </section>
        <section className="contact-item">
          <h2>Questions for a seller</h2>
          <p>
            Open a listing and choose Chat to ask about condition, collection,
            and availability before making arrangements.
          </p>
          <Link to="/search">Browse listings ↗</Link>
        </section>
        <section className="contact-item">
          <h2>Report a problem</h2>
          <p>
            This project is maintained by Tahmid Khan. Include the page URL and
            what happened; leave passwords and private account details out of
            your report.
          </p>
          <a href="mailto:hi@tahmidkhan.com.bd?subject=Green%20Gadgets%20support">
            Email the maintainer ↗
          </a>
          <br />
          <a
            href="https://github.com/tahmidkhanshuvo/Green-Gadgets/issues"
            target="_blank"
            rel="noreferrer"
          >
            Open a GitHub issue ↗
          </a>
        </section>
      </div>
    </main>
  );
}
