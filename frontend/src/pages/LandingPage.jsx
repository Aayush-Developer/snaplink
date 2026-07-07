import Navbar from "../components/Navbar.jsx";
import Hero from "../components/Hero.jsx";

import "../styles/home.css";
import "../styles/navbar.css";

function LandingPage() {
  return (
    <div className="home">
      <Navbar />

      <Hero />

     <section className="features">

  <div className="feature-card">
    <div className="feature-icon">⚡</div>

    <h3>Lightning Fast</h3>

    <p>
      Generate short URLs instantly with a single click.
    </p>
  </div>

  <div className="feature-card">
    <div className="feature-icon">🔒</div>

    <h3>Secure</h3>

    <p>
      JWT authentication keeps your links private and secure.
    </p>
  </div>

  <div className="feature-card">
    <div className="feature-icon">📊</div>

    <h3>Manage Links</h3>

    <p>
      Edit, delete and organize all your shortened URLs from one place.
    </p>
  </div>

</section>
    </div>
  );
}

export default LandingPage;