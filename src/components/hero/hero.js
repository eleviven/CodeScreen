import React from "react";

export default function Hero({ title, paragraph }) {
  return (
    <section className="hero">
      <h2 className="hero-title">{title}</h2>
      <p className="hero-paragraph">{paragraph}</p>
    </section>
  );
}
