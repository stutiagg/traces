import { House, Map, Rss } from "lucide-react";
import { Link } from "react-router-dom";
import "./ComingSoon.css";

const pageIcons = {
  feed: Rss,
  map: Map,
};

function ComingSoon({ icon, title, message, badge }) {
  const Icon = pageIcons[icon];

  return (
    <main className="coming-soon-page">
      <section className="coming-soon-content" aria-labelledby="coming-soon-title">
        <div className="coming-soon-icon" aria-hidden="true">
          <Icon />
        </div>
        <span className="coming-soon-badge">{badge}</span>
        <h1 id="coming-soon-title">{title}</h1>
        <p>{message}</p>
        <Link className="coming-soon-home-link" to="/">
          <House aria-hidden="true" />
          Back to Home
        </Link>
      </section>
    </main>
  );
}

export default ComingSoon;
