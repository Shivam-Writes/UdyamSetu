import { useMemo, useState } from "react";
import { Link, NavLink, Route, Routes, useNavigate, useParams } from "react-router-dom";
import {
  ArrowRight, Calculator, CheckCircle2, ChevronRight, FileText, Landmark,
  MapPin, Search, ShieldCheck, Sparkles, WalletCards, Users, CircleHelp
} from "lucide-react";

const schemes = [
  {
    id: "pm-suraj", name: "PM-SURAJ", tag: "SC Entrepreneurs", accent: "violet",
    icon: Landmark, loan: "Up to ₹25 Lakh", interest: "Concessional",
    description: "A discovery card for eligible entrepreneurs seeking concessional financial support.",
    eligibility: "SC beneficiary profile and scheme-specific conditions apply.",
    benefits: ["Concessional financial support", "Guidance through the application journey", "Partner/channel discovery"]
  },
  {
    id: "nsfdc", name: "NSFDC Loan Support", tag: "Financial Support", accent: "blue",
    icon: WalletCards, loan: "Scheme dependent", interest: "Concessional",
    description: "Explore finance options associated with NSFDC and understand the relevant eligibility route.",
    eligibility: "Eligibility and loan limits depend on the applicable NSFDC scheme.",
    benefits: ["Concessional finance options", "Multiple support routes", "Application guidance"]
  },
  {
    id: "stand-up-india", name: "Stand Up India", tag: "Business Loan", accent: "amber",
    icon: Sparkles, loan: "₹10 Lakh – ₹1 Crore", interest: "Bank based",
    description: "Explore bank-linked support for eligible SC/ST and women entrepreneurs.",
    eligibility: "Scheme-specific eligibility and bank appraisal apply.",
    benefits: ["Bank-linked credit", "Greenfield enterprise support", "Guidance on next steps"]
  }
];

const partners = [
  { name: "State Bank of India", type: "Bank / Channel Partner", location: "Vijay Nagar, Indore", distance: "1.2 km" },
  { name: "District Industries Centre", type: "Government Support Office", location: "Collectorate Area, Indore", distance: "2.4 km" },
  { name: "Common Service Centre", type: "CSC / Assisted Service", location: "Scheme No. 54, Indore", distance: "3.8 km" }
];

function Navbar() {
  return (
    <header className="navbar">
      <Link to="/" className="brand">
        <div className="brand-mark">U</div>
        <div><div className="brand-name">UdyamSetu</div><div className="brand-subtitle">Sarkari Yojana se Aapke Udyam Tak</div></div>
      </Link>
      <nav className="nav-links">
        <NavLink to="/" end>Home</NavLink><NavLink to="/schemes">Schemes</NavLink><NavLink to="/emi-calculator">EMI Calculator</NavLink>
        <NavLink to="/partners">Partners</NavLink><NavLink to="/about">About</NavLink>
      </nav>
      <div className="nav-actions">
        <button className="search-button" aria-label="Search"><Search size={18}/></button>
        <Link className="login-link" to="/login">Login</Link>
        <Link className="button button-primary button-small" to="/profile">Get Started</Link>
      </div>
    </header>
  );
}

function Footer() {
  return <footer className="footer">
    <div><div className="brand footer-brand"><div className="brand-mark">U</div><div><div className="brand-name">UdyamSetu</div><div className="brand-subtitle">Sarkari Yojana se Aapke Udyam Tak</div></div></div><p>Prototype for simplifying discovery of concessional financial support.</p></div>
    <div className="footer-note">SIH 2026 • Prototype</div>
  </footer>;
}

function Home() {
  return <>
    <section className="hero">
      <div className="hero-copy">
        <div className="eyebrow"><Sparkles size={16}/> Built for aspiring entrepreneurs</div>
        <h1>Find the Right <span>Government Scheme</span> for Your Growth.</h1>
        <p>Get personalized scheme recommendations, understand your eligibility, estimate your EMI, and find the right channel partner — all in one place.</p>
        <div className="hero-actions"><Link to="/profile" className="button button-primary">Get Started <ArrowRight size={18}/></Link><Link to="/schemes" className="button button-secondary">Explore Schemes</Link></div>
        <div className="trust-row"><span><ShieldCheck size={17}/> Scheme-focused guidance</span><span><CheckCircle2 size={17}/> Simple eligibility journey</span></div>
      </div>
      <div className="hero-visual"><div className="visual-glow glow-one"/><div className="visual-glow glow-two"/>
        <div className="dashboard-card">
          <div className="dashboard-top"><div><span className="mini-label">YOUR MATCH</span><h3>Recommended for you</h3></div><span className="match-badge">92% Match</span></div>
          <div className="recommendation-card"><div className="scheme-icon violet"><Landmark size={24}/></div><div className="recommendation-copy"><strong>PM-SURAJ</strong><span>Financial support for eligible SC entrepreneurs</span></div><ArrowRight size={20}/></div>
          <div className="dashboard-grid"><div><span>Loan support</span><strong>Up to ₹25 L</strong></div><div><span>Interest</span><strong>Concessional</strong></div></div>
          <div className="progress-line"><span/></div><p className="small-note">Complete your profile to get a more personalized match.</p>
        </div>
      </div>
    </section>
    <section className="stats-section"><div className="stat"><strong>50+</strong><span>Government Schemes</span></div><div className="stat"><strong>SC Focused</strong><span>Support & Discovery</span></div><div className="stat"><strong>End-to-End</strong><span>Application Guidance</span></div><div className="stat"><strong>100+</strong><span>Channel Partners</span></div></section>
    <section className="section"><div className="section-heading"><div><span className="section-kicker">DISCOVER SUPPORT</span><h2>Popular Schemes</h2><p>Start with schemes commonly relevant to entrepreneurs and compare support available.</p></div><Link to="/schemes" className="text-link">View all schemes <ArrowRight size={17}/></Link></div>
      <div className="scheme-grid">{schemes.map(s => <SchemeCard key={s.id} scheme={s}/>)}</div>
    </section>
    <section className="feature-section"><Feature icon={<Sparkles size={24}/>} title="Personalized scheme discovery" text="Answer a few questions and narrow down schemes based on your profile and business needs."/><Feature icon={<Calculator size={24}/>} title="Understand the numbers" text="Estimate monthly EMI and repayment before you move toward an application."/><Feature icon={<MapPin size={24}/>} title="Find the right partner" text="Locate a relevant channel partner and understand the next step." /></section>
    <Footer/>
  </>;
}

function Feature({icon,title,text}) { return <div className="feature-card"><div className="feature-icon">{icon}</div><div><h3>{title}</h3><p>{text}</p></div></div>; }

function SchemeCard({scheme}) {
  const Icon=scheme.icon;
  return <article className="scheme-card"><div className="card-top"><div className={`scheme-icon ${scheme.accent}`}><Icon size={23}/></div><span className="scheme-tag">{scheme.tag}</span></div><h3>{scheme.name}</h3><p>{scheme.description}</p><Link to={`/schemes/${scheme.id}`} className="card-link">View details <ArrowRight size={16}/></Link></article>;
}

function StepHeader({step}) {
  return <div className="step-header"><span>STEP {step} OF 4</span><div className="step-track"><i style={{width:`${step*25}%`}}/></div></div>;
}

function Profile() {
  const navigate=useNavigate();
  const [form,setForm]=useState({name:"",category:"SC",state:"Madhya Pradesh",business:"",income:""});
  const update=e=>setForm({...form,[e.target.name]:e.target.value});
  const submit=e=>{e.preventDefault();localStorage.setItem("udyamProfile",JSON.stringify(form));navigate("/eligibility");};
  return <main className="flow-page"><StepHeader step={1}/><div className="flow-card"><span className="section-kicker">YOUR PROFILE</span><h1>Tell us about yourself</h1><p className="flow-intro">A few details help UdyamSetu understand which support options may fit your profile.</p>
    <form className="form-grid" onSubmit={submit}>
      <label>Full Name<input name="name" value={form.name} onChange={update} required placeholder="Enter your name"/></label>
      <label>Category<select name="category" value={form.category} onChange={update}><option>SC</option><option>ST</option><option>Other</option></select></label>
      <label>State<select name="state" value={form.state} onChange={update}><option>Madhya Pradesh</option><option>Rajasthan</option><option>Maharashtra</option><option>Uttar Pradesh</option></select></label>
      <label>Business Type<select name="business" value={form.business} onChange={update} required><option value="">Select business type</option><option>Proprietorship</option><option>Partnership</option><option>Company</option><option>Self-employed</option></select></label>
      <label>Annual Income<select name="income" value={form.income} onChange={update} required><option value="">Select income range</option><option>Below ₹2 Lakh</option><option>₹2–5 Lakh</option><option>Above ₹5 Lakh</option></select></label>
      <label>Mobile Number<input placeholder="10-digit mobile number" inputMode="numeric"/></label>
      <div className="form-actions"><Link to="/" className="button button-secondary">Back</Link><button className="button button-primary" type="submit">Continue <ArrowRight size={17}/></button></div>
    </form>
  </div></main>;
}

function Eligibility() {
  const navigate=useNavigate();
  const [form,setForm]=useState({stage:"Early Stage",sector:"Services",need:"Business Expansion",loan:"₹5–10 Lakh"});
  const update=e=>setForm({...form,[e.target.name]:e.target.value});
  const submit=e=>{e.preventDefault();localStorage.setItem("udyamEligibility",JSON.stringify(form));navigate("/recommendations");};
  return <main className="flow-page"><StepHeader step={2}/><div className="flow-card"><span className="section-kicker">ELIGIBILITY CHECK</span><h1>Understand your support needs</h1><p className="flow-intro">We'll use these answers to create a transparent, rule-based shortlist for the prototype.</p>
    <form className="form-grid" onSubmit={submit}>
      <label>Business Stage<select name="stage" value={form.stage} onChange={update}><option>Idea Stage</option><option>Early Stage</option><option>Existing Business</option><option>Expansion</option></select></label>
      <label>Business Sector<select name="sector" value={form.sector} onChange={update}><option>Services</option><option>Manufacturing</option><option>Trading</option><option>Artisan / Craft</option></select></label>
      <label>Purpose<select name="need" value={form.need} onChange={update}><option>Business Expansion</option><option>Starting a Business</option><option>Working Capital</option><option>Equipment Purchase</option></select></label>
      <label>Expected Loan Amount<select name="loan" value={form.loan} onChange={update}><option>Below ₹5 Lakh</option><option>₹5–10 Lakh</option><option>₹10–25 Lakh</option><option>Above ₹25 Lakh</option></select></label>
      <div className="info-strip"><CircleHelp size={19}/><span>Recommendation scores in this prototype are illustrative rule-based matches, not official eligibility decisions.</span></div>
      <div className="form-actions"><button type="button" onClick={()=>navigate("/profile")} className="button button-secondary">Back</button><button className="button button-primary">Check Eligibility <ArrowRight size={17}/></button></div>
    </form>
  </div></main>;
}

function Recommendations() {
  const navigate=useNavigate();
  const profile=JSON.parse(localStorage.getItem("udyamProfile")||"{}");
  const eligible=profile.category==="SC" && profile.income!=="Above ₹5 Lakh";
  const ranked=useMemo(()=>schemes.map((s,i)=>({...s,match:eligible?[94-i*7,86-i*4,78][i]:[61,57,52][i]})),[eligible]);
  return <main className="flow-page"><StepHeader step={3}/><div className="wide-card"><div className="results-heading"><div><span className="section-kicker">PERSONALIZED SHORTLIST</span><h1>Recommended schemes</h1><p>Based on the profile and needs entered in this prototype.</p></div><div className="profile-pill"><CheckCircle2 size={16}/> {eligible?"Profile matches basic prototype rules":"Review eligibility details"}</div></div>
    <div className="recommendation-list">{ranked.map(s=>{const Icon=s.icon; return <div className="result-card" key={s.id}><div className={`scheme-icon ${s.accent}`}><Icon size={24}/></div><div className="result-main"><div className="result-title"><h3>{s.name}</h3><span>{s.tag}</span></div><p>{s.description}</p><div className="result-meta"><b>{s.loan}</b><span>{s.interest}</span></div></div><div className="match-score"><strong>{s.match}%</strong><span>Match</span><Link to={`/schemes/${s.id}`}><ArrowRight size={18}/></Link></div></div>)}</div>
    <div className="recommendation-actions"><button onClick={()=>navigate("/emi-calculator")} className="button button-primary">Estimate EMI <Calculator size={17}/></button><button onClick={()=>navigate("/partners")} className="button button-secondary">Find a Partner <MapPin size={17}/></button></div>
  </div></main>;
}

function SchemeDetails() {
  const {id}=useParams(); const scheme=schemes.find(s=>s.id===id)||schemes[0]; const Icon=scheme.icon;
  return <main className="detail-page"><Link to="/recommendations" className="back-link">← Back to recommendations</Link><div className="detail-hero"><div className={`scheme-icon ${scheme.accent} large-icon`}><Icon size={31}/></div><div><span className="section-kicker">{scheme.tag}</span><h1>{scheme.name}</h1><p>{scheme.description}</p></div><div className="detail-actions"><Link to="/emi-calculator" className="button button-primary">Estimate EMI <Calculator size={17}/></Link><Link to="/apply" className="button button-secondary">Connect & Apply</Link></div></div>
    <div className="detail-grid"><section className="detail-content"><h2>Overview</h2><p>This prototype organizes scheme information into a simple journey so an applicant can understand the option before moving to the official application channel.</p><h2>Benefits</h2><div className="benefit-list">{scheme.benefits.map(x=><div key={x}><CheckCircle2 size={18}/>{x}</div>)}</div><h2>Eligibility</h2><p>{scheme.eligibility}</p></section><aside className="detail-side"><div><span>Loan support</span><strong>{scheme.loan}</strong></div><div><span>Interest</span><strong>{scheme.interest}</strong></div><div><span>Next step</span><strong>Verify official requirements</strong></div></aside></div>
  </main>;
}

function EMICalculator() {
  const [amount,setAmount]=useState(1000000),[rate,setRate]=useState(7),[years,setYears]=useState(5);
  const r=rate/12/100,n=years*12;
  const emi=r===0?amount/n:(amount*r*Math.pow(1+r,n))/(Math.pow(1+r,n)-1);
  const total=emi*n,interest=total-amount;
  const money=x=>new Intl.NumberFormat("en-IN",{style:"currency",currency:"INR",maximumFractionDigits:0}).format(Math.round(x));
  return <main className="calculator-page"><div className="calculator-heading"><span className="section-kicker">PLAN YOUR REPAYMENT</span><h1>EMI Calculator</h1><p>Adjust the inputs to estimate monthly repayment. This is an indicative calculation for the prototype.</p></div><div className="calculator-grid"><div className="calculator-card"><label>Loan Amount <strong>{money(amount)}</strong><input type="range" min="100000" max="2500000" step="50000" value={amount} onChange={e=>setAmount(+e.target.value)}/></label><label>Interest Rate <strong>{rate}%</strong><input type="range" min="0" max="15" step=".1" value={rate} onChange={e=>setRate(+e.target.value)}/></label><label>Loan Tenure <strong>{years} years</strong><input type="range" min="1" max="15" step="1" value={years} onChange={e=>setYears(+e.target.value)}/></label></div><div className="emi-result"><span>ESTIMATED MONTHLY EMI</span><strong>{money(emi)}</strong><div className="emi-breakdown"><div><span>Principal</span><b>{money(amount)}</b></div><div><span>Total interest</span><b>{money(interest)}</b></div><div><span>Total repayment</span><b>{money(total)}</b></div></div><Link to="/partners" className="button button-primary">Find a Partner <MapPin size={17}/></Link></div></div></main>;
}

function Partners() {
  const [query,setQuery]=useState("");
  const filtered=partners.filter(p=>(p.name+" "+p.location+" "+p.type).toLowerCase().includes(query.toLowerCase()));
  return <main className="partners-page"><div className="calculator-heading"><span className="section-kicker">CHANNEL PARTNER LOCATOR</span><h1>Find a nearby partner</h1><p>Prototype locator showing how applicants can discover the next assisted channel.</p></div><div className="partner-layout"><div className="partner-map"><div className="map-grid"/><div className="map-pin pin-one"/><div className="map-pin pin-two"/><div className="map-pin pin-three"/><div className="map-label"><MapPin size={16}/> Indore, Madhya Pradesh</div></div><div className="partner-list"><div className="search-field"><Search size={17}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search partner or area"/></div>{filtered.map(p=><article className="partner-card" key={p.name}><div className="partner-icon"><Landmark size={20}/></div><div><h3>{p.name}</h3><p>{p.type}</p><span><MapPin size={13}/> {p.location}</span></div><strong>{p.distance}</strong></article>)}{!filtered.length&&<p className="empty-state">No matching partners in this prototype data.</p>}</div></div></main>;
}

function Apply() {
  const [step,setStep]=useState(1);
  const steps=["Check documents","Understand requirements","Connect to partner","Proceed to official channel"];
  return <main className="flow-page"><div className="flow-card apply-card"><span className="section-kicker">CONNECT & APPLY</span><h1>Application guidance</h1><p className="flow-intro">UdyamSetu guides the applicant to the appropriate channel. The prototype does not submit a government application.</p><div className="apply-steps">{steps.map((s,i)=><button className={step===i+1?"apply-step current":step>i+1?"apply-step done":"apply-step"} onClick={()=>setStep(i+1)} key={s}><span>{step>i+1?<CheckCircle2 size={18}/>:i+1}</span><div><b>{s}</b><small>{step>i+1?"Completed":"View guidance"}</small></div><ChevronRight size={17}/></button>)}</div><div className="apply-panel"><FileText size={22}/><div><h3>{steps[step-1]}</h3><p>{step===1?"Keep identity, category and income-related documents ready.":step===2?"Verify the scheme-specific eligibility and documentation on the official source.":step===3?"Use the partner locator to identify the relevant assisted channel.":"Proceed only through the official scheme/application channel after verification."}</p></div></div><Link to="/partners" className="button button-primary">Open Partner Locator <MapPin size={17}/></Link></div></main>;
}

function Schemes() { return <main className="section page-section"><div className="section-heading"><div><span className="section-kicker">SCHEME DISCOVERY</span><h2>Explore Government Schemes</h2><p>Browse the prototype's scheme catalogue.</p></div><Link to="/profile" className="button button-primary">Get Personalized Matches</Link></div><div className="scheme-grid">{schemes.map(s=><SchemeCard key={s.id} scheme={s}/>)}</div></main>; }

function Login(){ return <main className="auth-page"><div className="auth-card"><div className="brand-mark">U</div><h1>Welcome back</h1><p>Sign in to continue your UdyamSetu journey.</p><input placeholder="Mobile number or email"/><button className="button button-primary">Continue</button><small>Prototype login — no credentials are stored.</small></div></main>; }
function About(){ return <main className="placeholder"><span className="section-kicker">ABOUT UDYAMSETU</span><h1>From scheme discovery to the right channel.</h1><p>UdyamSetu is an SIH 2026 prototype concept focused on simplifying discovery, comparison, repayment estimation and channel-partner navigation for concessional support.</p><Link to="/profile" className="button button-primary">Try the prototype</Link></main>; }

export default function App() {
  return <><Navbar/><Routes>
    <Route path="/" element={<Home/>}/><Route path="/profile" element={<Profile/>}/><Route path="/eligibility" element={<Eligibility/>}/>
    <Route path="/recommendations" element={<Recommendations/>}/><Route path="/schemes" element={<Schemes/>}/><Route path="/schemes/:id" element={<SchemeDetails/>}/>
    <Route path="/emi-calculator" element={<EMICalculator/>}/><Route path="/partners" element={<Partners/>}/><Route path="/apply" element={<Apply/>}/>
    <Route path="/login" element={<Login/>}/><Route path="/about" element={<About/>}/>
  </Routes></>;
}