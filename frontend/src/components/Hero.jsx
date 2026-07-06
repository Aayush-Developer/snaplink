import UrlForm from "./UrlForm";

function Hero() {
  return (
    <section className="hero">
      <div className="hero-content">

        <h1>Shorten Your Long URLs</h1>

        <p>
          Create short, memorable links and manage them from one place.
        </p>

        <UrlForm />

      </div>
    </section>
  );
}

export default Hero;