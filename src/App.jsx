import { Link, Route, Routes } from "react-router-dom";
import { ArrowRight, Calculator, CheckCircle2, Landmark, MapPin, Search, ShieldCheck, Sparkles } from "lucide-react";

const schemes = [
  {
    name: "PM-SURAJ",
    tag: "SC Entrepreneurs",
    description: "Explore credit support and assistance designed to help eligible entrepreneurs move their business forward.",
    accent: "violet",
    icon: Landmark
  },
  {
    name: "NSFDC Loan Support",
    tag: "Financial Support",
    description: "Discover concessional finance options and understand the basic eligibility requirements.",
    accent: "blue",
    icon: Calculator
  },
  {
    name: "Stand Up India",
    tag: "Business Loan",
    description: "Explore bank-linked support for eligible SC/ST and women entrepreneurs.",
    accent: "amber",
    icon: Sparkles
  }
];

function Navbar() {
  return (
    <header className="navbar">
      <Link to="/" className="brand">
        <div className="brand-mark">U</div>
        <div>
          <div className="brand-name">UdyamSetu</div>
          <div className="brand-subtitle">Sarkari Yojana se Aapke Udyam Tak</div>
        </div>
      </Link>

      <nav className="nav-links">
        <Link className="active" to="/">Home</Link>
        <Link to="/schemes">Schemes</Link>
        <Link to="/emi-calculator">EMI Calculator</Link>
        <Link to="/partners">Partners</Link>
        <Link to="/about">About</Link>
      </nav>

      <div className="nav-actions">
        <button className="search-button" aria-label="Search">
          <Search size={18} />
        </button>
        <Link className="login-link" to="/login">Login</Link>
        <Link className="button button-primary button-small" to="/profile">Get Started</Link>
      </div>
    </header>
  );
}

function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <div className="eyebrow"><Sparkles size={16} /> Built for aspiring entrepreneurs</div>
          <h1>Find the Right <span>Government Scheme</span> for Your Growth.</h1>
          <p>
            Get personalized scheme recommendations, understand your eligibility,
            estimate your EMI, and find the right channel partner — all in one place.
          </p>
          <div className="hero-actions">
            <Link to="/profile" className="button button-primary">
              Get Started <ArrowRight size={18} />
            </Link>
            <Link to="/schemes" className="button button-secondary">Explore Schemes</Link>
          </div>
          <div className="trust-row">
            <span><ShieldCheck size={17} /> Scheme-focused guidance</span>
            <span><CheckCircle2 size={17} /> Simple eligibility journey</span>
          </div>
        </div>

        <div className="hero-visual">
          <div className="visual-glow glow-one" />
          <div className="visual-glow glow-two" />
          <div className="dashboard-card">
            <div className="dashboard-top">
              <div>
                <span className="mini-label">YOUR MATCH</span>
                <h3>Recommended for you</h3>
              </div>
              <span className="match-badge">92% Match</span>
            </div>
            <div className="recommendation-card">
              <div className="scheme-icon violet"><Landmark size={24} /></div>
              <div className="recommendation-copy">
                <strong>PM-SURAJ</strong>
                <span>Financial support for eligible SC entrepreneurs</span>
              </div>
              <ArrowRight size={20} />
            </div>
            <div className="dashboard-grid">
              <div><span>Loan support</span><strong>Up to ₹25 L</strong></div>
              <div><span>Interest</span><strong>Concessional</strong></div>
            </div>
            <div className="progress-line"><span /></div>
            <p className="small-note">Complete your profile to get a more personalized match.</p>
          </div>
        </div>
      </section>

      <section className="stats-section">
        <div className="stat">
          <strong>50+</strong>
          <span>Government Schemes</span>
        </div>
        <div className="stat">
          <strong>SC Focused</strong>
          <span>Support & Discovery</span>
        </div>
        <div className="stat">
          <strong>End-to-End</strong>
          <span>Application Guidance</span>
        </div>
        <div className="stat">
          <strong>100+</strong>
          <span>Channel Partners</span>
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <div>
            <span className="section-kicker">DISCOVER SUPPORT</span>
            <h2>Popular Schemes</h2>
            <p>Start with schemes commonly relevant to entrepreneurs and compare the support available.</p>
          </div>
          <Link to="/schemes" className="text-link">View all schemes <ArrowRight size={17} /></Link>
        </div>

        <div className="scheme-grid">
          {schemes.map((scheme) => {
            const Icon = scheme.icon;
            return (
              <article className="scheme-card" key={scheme.name}>
                <div className="card-top">
                  <div className={`scheme-icon ${scheme.accent}`}><Icon size={23} /></div>
                  <span className="scheme-tag">{scheme.tag}</span>
                </div>
                <h3>{scheme.name}</h3>
                <p>{scheme.description}</p>
                <Link to="/schemes" className="card-link">View details <ArrowRight size={16} /></Link>
              </article>
            );
          })}
        </div>
      </section>

      <section className="feature-section">
        <div className="feature-card">
          <div className="feature-icon"><Sparkles size={24} /></div>
          <div><h3>Personalized scheme discovery</h3><p>Answer a few questions and narrow down schemes based on your profile and business needs.</p></div>
        </div>
        <div className="feature-card">
          <div className="feature-icon"><Calculator size={24} /></div>
          <div><h3>Understand the numbers</h3><p>Estimate monthly EMI and repayment before you move toward an application.</p></div>
        </div>
        <div className="feature-card">
          <div className="feature-icon"><MapPin size={24} /></div>
          <div><h3>Find the right partner</h3><p>Locate a relevant channel partner and understand the next step in the journey.</p></div>
        </div>
      </section>

      <footer className="footer">
        <div>
          <div className="brand footer-brand"><div className="brand-mark">U</div><div><div className="brand-name">UdyamSetu</div><div className="brand-subtitle">Sarkari Yojana se Aapke Udyam Tak</div></div></div>
          <p>A prototype concept for simplifying access to concessional financial support.</p>
        </div>
        <div className="footer-note">SIH 2026 • Prototype</div>
      </footer>
    </>
  );
}

function Placeholder({ title }) {
  return (
    <main className="placeholder">
      <span className="section-kicker">UDYAMSETU</span>
      <h1>{title}</h1>
      <p>This section will be connected to the prototype flow next.</p>
      <Link to="/" className="button button-primary">Back to Home</Link>
    </main>
  );
}

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/schemes" element={<Placeholder title="Government Schemes" />} />
        <Route path="/emi-calculator" element={<Placeholder title="EMI Calculator" />} />
        <Route path="/partners" element={<Placeholder title="Channel Partners" />} />
        <Route path="/about" element={<Placeholder title="About UdyamSetu" />} />
        <Route path="/login" element={<Placeholder title="Login" />} />
        <Route path="/profile" element={<Placeholder title="Create Your Profile" />} />
      </Routes>
    </>
  );
}