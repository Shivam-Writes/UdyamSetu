import React, { useMemo, useState } from "react";
import { Link, NavLink, Route, Routes, useNavigate, useParams } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import {
  ArrowRight, Calculator, CheckCircle2, ChevronRight, FileText, Landmark,
  MapPin, Search, ShieldCheck, Sparkles, WalletCards, Users, CircleHelp,
  LogIn, Building2, ClipboardCheck, Clock3, UploadCloud, CircleDot, AlertCircle
} from "lucide-react";

const schemes = [
  {id:"pm-suraj",name:"PM-SURAJ",tag:"SC Entrepreneurs",accent:"violet",icon:Landmark,loan:"Up to ₹25 Lakh",interest:"Concessional",description:"Explore concessional financial support designed for eligible SC beneficiaries and entrepreneurs.",eligibility:"SC beneficiary profile and scheme-specific conditions apply.",benefits:["Concessional financial support","Guidance through the application journey","Partner/channel discovery"]},
  {id:"nsfdc",name:"NSFDC Loan Support",tag:"Financial Support",accent:"blue",icon:WalletCards,loan:"Scheme dependent",interest:"Concessional",description:"Explore finance options associated with NSFDC and understand the relevant eligibility route.",eligibility:"Eligibility and loan limits depend on the applicable NSFDC scheme.",benefits:["Concessional finance options","Multiple support routes","Application guidance"]},
  {id:"stand-up-india",name:"Stand Up India",tag:"Business Loan",accent:"amber",icon:Sparkles,loan:"₹10 Lakh – ₹1 Crore",interest:"Bank based",description:"Explore bank-linked support for eligible SC/ST and women entrepreneurs.",eligibility:"Scheme-specific eligibility and bank appraisal apply.",benefits:["Bank-linked credit","Greenfield enterprise support","Guidance on next steps"]},
  {id:"pmegp",name:"PMEGP",tag:"Micro Enterprise",accent:"violet",icon:Building2,loan:"Up to ₹50 Lakh",interest:"Credit-linked subsidy",description:"Support for setting up new micro-enterprises in the non-farm sector through credit-linked subsidy.",eligibility:"New micro-enterprise applicants meeting PMEGP conditions.",benefits:["Credit-linked subsidy","Support for new enterprises","Urban and rural coverage"]},
  {id:"mudra",name:"Pradhan Mantri MUDRA Yojana",tag:"Micro Business",accent:"blue",icon:WalletCards,loan:"Up to ₹20 Lakh",interest:"Bank based",description:"Credit support for eligible micro enterprises and small business activities through participating lenders.",eligibility:"Eligible micro enterprises and borrowers meeting lender and scheme conditions.",benefits:["Shishu, Kishor, Tarun and Tarun Plus categories","Business credit","Wide lender network"]},
  {id:"pm-vishwakarma",name:"PM Vishwakarma",tag:"Artisans & Craftspeople",accent:"amber",icon:Sparkles,loan:"Up to ₹3 Lakh",interest:"Concessional",description:"Integrated support for eligible traditional artisans and craftspeople, including skill, toolkit and credit support.",eligibility:"Eligible artisans in notified traditional trades, subject to scheme conditions.",benefits:["Skill training","Toolkit support","Concessional credit"]},
  {id:"cgtmse",name:"CGTMSE",tag:"Credit Guarantee",accent:"blue",icon:ShieldCheck,loan:"Credit guarantee support",interest:"Lender based",description:"Credit guarantee support helps eligible micro and small enterprises access loans without collateral or third-party guarantee, subject to scheme rules.",eligibility:"Eligible new or existing micro and small enterprises through member lending institutions.",benefits:["Collateral-free credit support","Guarantee coverage","Working and investment capital access"]},
  {id:"sfurti",name:"SFURTI",tag:"Traditional Industries",accent:"amber",icon:Users,loan:"Project-based support",interest:"Government support",description:"Supports traditional industry clusters with technology, marketing and skill development assistance.",eligibility:"Eligible traditional industry clusters and implementing agencies under scheme guidelines.",benefits:["Cluster development","Technology support","Marketing and skill development"]},
  {id:"nssh",name:"National SC-ST Hub",tag:"SC/ST Entrepreneurs",accent:"violet",icon:Users,loan:"Support based",interest:"Not a standard loan",description:"Support and facilitation for SC/ST entrepreneurs to improve participation in government procurement and enterprise development.",eligibility:"SC/ST entrepreneurs and eligible enterprises under programme guidelines.",benefits:["Procurement support","Capacity building","Market and tender assistance"]}
];

const partners = [
  {name:"State Bank of India",type:"Bank / Channel Partner",location:"Vijay Nagar, Indore",distance:"1.2 km"},
  {name:"District Industries Centre",type:"Government Support Office",location:"Collectorate Area, Indore",distance:"2.4 km"},
  {name:"Common Service Centre",type:"CSC / Assisted Service",location:"Scheme No. 54, Indore",distance:"3.8 km"}
];

function Navbar(){
  return <header className="navbar">
    <Link to="/" className="brand"><div className="brand-mark">U</div><div><div className="brand-name">UdyamSetu</div><div className="brand-subtitle">Sarkari Yojana se Aapke Udyam Tak</div></div></Link>
    <nav className="nav-links">
      <NavLink to="/" end>Home</NavLink><NavLink to="/schemes">Schemes</NavLink><NavLink to="/emi-calculator">EMI Calculator</NavLink><NavLink to="/partners">Partners</NavLink><NavLink to="/compare">Compare</NavLink><NavLink to="/tracker">Tracker</NavLink><NavLink to="/about">About</NavLink>
    </nav>
    <div className="nav-actions"><button className="search-button" aria-label="Search"><Search size={18}/></button><Link className="login-link" to="/login">Login</Link><Link className="button button-primary button-small" to="/schemes">Get Started</Link></div>
  </header>;
}

function Footer(){
  return <footer className="footer"><div><div className="brand footer-brand"><div className="brand-mark">U</div><div><div className="brand-name">UdyamSetu</div><div className="brand-subtitle">Sarkari Yojana se Aapke Udyam Tak</div></div></div><p>Making government scheme discovery simpler, clearer and more accessible.</p></div><div className="footer-note">SIH 2026 • Prototype</div></footer>;
}

function Home(){
  return <>
    <section className="hero">
      <div className="hero-copy"><div className="eyebrow"><Sparkles size={16}/> Built for aspiring entrepreneurs</div>
        <h1>Find the Right <span>Government Scheme</span> for Your Growth.</h1>
        <p>Discover relevant government schemes, understand eligibility, estimate EMI and find the right channel partner — all in one place.</p>
        <div className="hero-actions"><Link to="/schemes" className="button button-primary">Explore Schemes <ArrowRight size={18}/></Link><Link to="/login" className="button button-secondary"><LogIn size={17}/> Login</Link></div>
        <div className="trust-row"><span><ShieldCheck size={17}/> Scheme-focused guidance</span><span><CheckCircle2 size={17}/> Simple application journey</span></div>
      </div>
      <div className="hero-visual"><div className="visual-glow glow-one"/><div className="visual-glow glow-two"/><div className="dashboard-card">
        <div className="dashboard-top"><div><span className="mini-label">SCHEME DISCOVERY</span><h3>Everything in one place</h3></div><span className="match-badge">Simple & Clear</span></div>
        <div className="recommendation-card"><div className="scheme-icon violet"><Landmark size={24}/></div><div className="recommendation-copy"><strong>Explore schemes</strong><span>Compare support, eligibility and next steps</span></div><ArrowRight size={20}/></div>
        <div className="dashboard-grid"><div><span>Calculate</span><strong>EMI instantly</strong></div><div><span>Locate</span><strong>Channel partners</strong></div></div>
        <div className="progress-line"><span/></div><p className="small-note">Choose a scheme first. Create your profile only when you decide to apply.</p>
      </div></div>
    </section>
    <section className="stats-section"><div className="stat"><strong>50+</strong><span>Government Schemes</span></div><div className="stat"><strong>SC Focused</strong><span>Support & Discovery</span></div><div className="stat"><strong>End-to-End</strong><span>Application Guidance</span></div><div className="stat"><strong>100+</strong><span>Channel Partners</span></div></section>
    <section className="section"><div className="section-heading"><div><span className="section-kicker">DISCOVER SUPPORT</span><h2>Popular Schemes</h2><p>Browse schemes and open each one for its complete detail page.</p></div><Link to="/schemes" className="text-link">View all schemes <ArrowRight size={17}/></Link></div><div className="scheme-grid">{schemes.map((s,index)=><SchemeCard key={s.id} scheme={s} index={index}/>)}</div></section>
    <section className="feature-section"><Feature icon={<Sparkles size={24}/>} title="Discover schemes" text="Browse and understand government support before sharing any personal information."/><Feature icon={<Calculator size={24}/>} title="Understand the numbers" text="Estimate monthly EMI and repayment for your planned loan amount."/><Feature icon={<MapPin size={24}/>} title="Find the right partner" text="Locate a relevant channel partner for the next stage of the journey."/></section>
    <Footer/>
  </>;
}

function Feature({icon,title,text}){return <div className="feature-card"><div className="feature-icon">{icon}</div><div><h3>{title}</h3><p>{text}</p></div></div>;}
function SchemeCard({scheme,index}){const Icon=scheme.icon;return <article className="scheme-card" data-scheme-index={index+1}><div className="card-top"><div className={`scheme-icon ${scheme.accent}`}><Icon size={23}/></div><span className="scheme-tag">{scheme.tag}</span></div><h3>{scheme.name}</h3><p>{scheme.description}</p><div className="scheme-card-actions"><Link to={`/schemes/${scheme.id}`} className="card-link">View details <ArrowRight size={16}/></Link><Link to={`/compare?add=${scheme.id}`} className="compare-link">Compare</Link></div></article>;}

function Schemes(){
  return <main className="section page-section"><div className="section-heading"><div><span className="section-kicker">SCHEME DISCOVERY</span><h2>Explore Government Schemes <span className="scheme-count">{schemes.length} schemes</span></h2><p>Choose a scheme to open its dedicated information page.</p></div></div><div className="scheme-grid">{schemes.map(s=><SchemeCard key={s.id} scheme={s}/>)}</div><div className="browse-note"><CircleHelp size={17}/><span>Personal details are requested only after you choose a scheme and click Apply.</span></div></main>;
}

function SchemeDetails(){
  const {id}=useParams(); const scheme=schemes.find(s=>s.id===id)||schemes[0]; const Icon=scheme.icon;
  return <main className="detail-page"><Link to="/schemes" className="back-link">← Back to schemes</Link>
    <div className="detail-hero"><div className={`scheme-icon ${scheme.accent} large-icon`}><Icon size={31}/></div><div><span className="section-kicker">{scheme.tag}</span><h1>{scheme.name}</h1><p>{scheme.description}</p></div><div className="detail-actions"><Link to="/emi-calculator" className="button button-secondary"><Calculator size={17}/> Estimate EMI</Link><Link to={`/apply/${scheme.id}`} className="button button-primary">Apply for this scheme <ArrowRight size={17}/></Link></div></div>
    <div className="detail-grid"><section className="detail-content"><h2>About this scheme</h2><p>This prototype presents scheme information in a simple format so applicants can understand the option before moving to the official application channel.</p><h2>Key benefits</h2><div className="benefit-list">{scheme.benefits.map(x=><div key={x}><CheckCircle2 size={18}/>{x}</div>)}</div><h2>Eligibility</h2><p>{scheme.eligibility}</p><h2>What happens when you apply?</h2><p>You will first create your UdyamSetu profile. The prototype then guides you through your support needs, documents and partner connection. UdyamSetu does not submit an official government application.</p></section><aside className="detail-side"><div><span>Loan support</span><strong>{scheme.loan}</strong></div><div><span>Interest</span><strong>{scheme.interest}</strong></div><div><span>Application</span><strong>Partner / official channel</strong></div></aside></div>
  </main>;
}

function StepHeader({step}){return <div className="step-header"><span>STEP {step} OF 4</span><div className="step-track"><i style={{width:`${step*25}%`}}/></div></div>;}

function Apply(){
  const {schemeId}=useParams(); const scheme=schemes.find(s=>s.id===schemeId)||schemes[0];
  return <main className="flow-page"><StepHeader step={1}/><div className="flow-card apply-intro-card"><span className="section-kicker">APPLY FOR {scheme.name}</span><h1>Before you apply</h1><p className="flow-intro">You've selected <b>{scheme.name}</b>. Create your UdyamSetu profile first so the next steps can be tailored to your application.</p><div className="apply-preview"><div className={`scheme-icon ${scheme.accent}`}><scheme.icon size={23}/></div><div><b>{scheme.name}</b><span>{scheme.loan} • {scheme.interest}</span></div></div><div className="apply-checks"><div><CheckCircle2 size={18}/> Keep your identity and income documents ready.</div><div><CheckCircle2 size={18}/> Verify the official scheme requirements before submission.</div><div><CheckCircle2 size={18}/> UdyamSetu only provides guidance; it does not submit the government application.</div></div><Link to={`/profile?scheme=${scheme.id}`} className="button button-primary">Create Profile & Continue <ArrowRight size={17}/></Link></div></main>;
}

function Profile(){
  const navigate=useNavigate();
  const selectedScheme=new URLSearchParams(window.location.hash.split("?")[1]||"").get("scheme")||localStorage.getItem("udyamSelectedScheme")||"";
  const [form,setForm]=useState({name:"",category:"SC",state:"Madhya Pradesh",business:"",income:"",mobile:""});
  const update=e=>setForm({...form,[e.target.name]:e.target.value});
  const submit=e=>{
    e.preventDefault();
    localStorage.setItem("udyamProfile",JSON.stringify(form));
    if(selectedScheme) localStorage.setItem("udyamSelectedScheme",selectedScheme);
    navigate("/eligibility");
  };
  return <main className="flow-page"><StepHeader step={1}/><div className="flow-card"><span className="section-kicker">CREATE YOUR PROFILE</span><h1>Tell us about yourself</h1><p className="flow-intro">We ask for these details only after you choose to apply for a scheme.</p>{selectedScheme&&<div className="selected-scheme-strip"><FileText size={17}/><span>Application journey: <b>{schemes.find(s=>s.id===selectedScheme)?.name||"Selected scheme"}</b></span></div>}<form className="form-grid" onSubmit={submit}>
    <label>Full Name<input name="name" value={form.name} onChange={update} required placeholder="Enter your full name"/></label>
    <label>Category<select name="category" value={form.category} onChange={update}><option>SC</option><option>ST</option><option>Other</option></select></label>
    <label>State<select name="state" value={form.state} onChange={update}><option>Madhya Pradesh</option><option>Rajasthan</option><option>Maharashtra</option><option>Uttar Pradesh</option></select></label>
    <label>Business Type<select name="business" value={form.business} onChange={update} required><option value="">Select business type</option><option>Proprietorship</option><option>Partnership</option><option>Company</option><option>Self-employed</option></select></label>
    <label>Annual Income<select name="income" value={form.income} onChange={update} required><option value="">Select income range</option><option>Below ₹2 Lakh</option><option>₹2–5 Lakh</option><option>Above ₹5 Lakh</option></select></label>
    <label>Mobile Number<input name="mobile" value={form.mobile} onChange={update} required pattern="[0-9]{10}" inputMode="numeric" placeholder="10-digit mobile number"/></label>
    <div className="form-actions"><Link to="/schemes" className="button button-secondary">Back</Link><button className="button button-primary" type="submit">Continue <ArrowRight size={17}/></button></div>
  </form></div></main>;
}

function Eligibility(){
  const navigate=useNavigate(); const [form,setForm]=useState({stage:"Early Stage",sector:"Services",need:"Business Expansion",loan:"₹5–10 Lakh"});
  const update=e=>setForm({...form,[e.target.name]:e.target.value});
  const submit=e=>{e.preventDefault();localStorage.setItem("udyamEligibility",JSON.stringify(form));navigate("/recommendations");};
  return <main className="flow-page"><StepHeader step={2}/><div className="flow-card"><span className="section-kicker">SUPPORT NEEDS</span><h1>Tell us what you need</h1><p className="flow-intro">These answers create a transparent, rule-based shortlist for the prototype.</p><form className="form-grid" onSubmit={submit}>
    <label>Business Stage<select name="stage" value={form.stage} onChange={update}><option>Idea Stage</option><option>Early Stage</option><option>Existing Business</option><option>Expansion</option></select></label>
    <label>Business Sector<select name="sector" value={form.sector} onChange={update}><option>Services</option><option>Manufacturing</option><option>Trading</option><option>Artisan / Craft</option></select></label>
    <label>Purpose<select name="need" value={form.need} onChange={update}><option>Business Expansion</option><option>Starting a Business</option><option>Working Capital</option><option>Equipment Purchase</option></select></label>
    <label>Expected Loan Amount<select name="loan" value={form.loan} onChange={update}><option>Below ₹5 Lakh</option><option>₹5–10 Lakh</option><option>₹10–25 Lakh</option><option>Above ₹25 Lakh</option></select></label>
    <div className="info-strip"><CircleHelp size={19}/><span>Recommendation scores are illustrative prototype matches, not official eligibility decisions.</span></div>
    <div className="form-actions"><button type="button" onClick={()=>navigate("/profile")} className="button button-secondary">Back</button><button className="button button-primary">Check Eligibility <ArrowRight size={17}/></button></div>
  </form></div></main>;
}

function Recommendations(){
  const navigate=useNavigate();
  const profile=JSON.parse(localStorage.getItem("udyamProfile")||"{}");
  const eligible=profile.category==="SC" && profile.income!=="Above ₹5 Lakh";
  const ranked=useMemo(()=>schemes.map((s,i)=>({...s,match:eligible?Math.max(55,94-i*5):Math.max(45,70-i*4)})),[eligible]);

  const startApplication=(scheme)=>{
    const existing=JSON.parse(localStorage.getItem("udyamApplications")||"[]");
    const current=existing.find(a=>a.schemeId===scheme.id);
    if(current){
      localStorage.setItem("udyamActiveApplication",current.id);
      navigate("/tracker");
      return;
    }
    const application={
      id:`US-${new Date().getFullYear()}-${Math.floor(10000+Math.random()*90000)}`,
      schemeId:scheme.id,
      schemeName:scheme.name,
      createdAt:new Date().toLocaleDateString("en-IN",{day:"2-digit",month:"short",year:"numeric"}),
      status:"Documents",
      progress:25
    };
    localStorage.setItem("udyamApplications",JSON.stringify([application,...existing]));
    localStorage.setItem("udyamActiveApplication",application.id);
    navigate("/tracker");
  };

  return <main className="flow-page">
    <StepHeader step={3}/>
    <div className="wide-card">
      <div className="results-heading">
        <div><span className="section-kicker">PERSONALIZED SHORTLIST</span><h1>Recommended schemes</h1><p>Based on the profile and support needs entered in this prototype.</p></div>
        <div className="profile-pill"><CheckCircle2 size={16}/> {eligible?"Profile matches basic prototype rules":"Review eligibility details"}</div>
      </div>
      <div className="recommendation-list">
        {ranked.map(s=>{
          const Icon=s.icon;
          return <article className="result-card" key={s.id}>
            <div className={`scheme-icon ${s.accent}`}><Icon size={23}/></div>
            <div className="result-main">
              <div className="result-title"><h3>{s.name}</h3><span>{s.tag}</span></div>
              <p>{s.description}</p>
              <div className="recommendation-actions">
                <Link to={`/schemes/${s.id}`} className="button button-secondary">View Details</Link>
                <button className="button button-primary" onClick={()=>startApplication(s)}>Start Application <ArrowRight size={16}/></button>
              </div>
            </div>
            <div className="match-score"><strong>{s.match}%</strong><span>prototype match</span><Link to={`/compare?add=${s.id}`} aria-label={`Compare ${s.name}`}><ChevronRight size={18}/></Link></div>
          </article>;
        })}
      </div>
    </div>
  </main>;
}

function Compare(){
  // Compare up to three schemes.
  const navigate=useNavigate();
  const params=new URLSearchParams(window.location.hash.split("?")[1]||"");
  const initial=params.get("add");
  const [selectedIds,setSelectedIds]=useState(()=>{const saved=JSON.parse(localStorage.getItem("udyamCompare")||"[]");return initial&&!saved.includes(initial)?[...saved,initial].slice(-3):saved.filter(id=>schemes.some(s=>s.id===id)).slice(0,3);});
  const selected=selectedIds.map(id=>schemes.find(s=>s.id===id)).filter(Boolean);
  const toggle=id=>{const next=selectedIds.includes(id)?selectedIds.filter(x=>x!==id):selectedIds.length<3?[...selectedIds,id]:selectedIds;setSelectedIds(next);localStorage.setItem("udyamCompare",JSON.stringify(next));};
  const rows=[
    ["Eligibility","eligibility"],["Loan / Support","loan"],["Interest","interest"],
    ["Purpose","description"],["Key Benefits","benefits"],["Application Route","route"],
  ];
  return <main className="compare-page">
    <div className="calculator-heading"><span className="section-kicker">SCHEME COMPARISON</span><h1>Compare government schemes</h1><p>Select up to 3 schemes and compare their key details before choosing your next step.</p></div>
    <div className="compare-selector"><div><b>Select schemes</b><span>{selected.length}/3 selected</span></div><div className="compare-options">{schemes.map(s=><button key={s.id} className={"compare-option "+(selectedIds.includes(s.id)?"selected":"")} onClick={()=>toggle(s.id)}><span className={"scheme-icon "+s.accent}>{React.createElement(s.icon,{size:18})}</span><span>{s.name}</span>{selectedIds.includes(s.id)&&<CheckCircle2 size={16}/>}</button>)}</div></div>
    {selected.length===0?<div className="compare-empty"><div className="tracker-empty-icon"><Landmark size={28}/></div><h2>Choose schemes to compare</h2><p>Select two or three schemes above to see their differences side by side.</p></div>:
    <div className="compare-table-wrap"><div className="compare-table">
      <div className="compare-row compare-header"><div className="compare-label">Compare</div>{selected.map(s=>{const Icon=s.icon;return <div className="compare-scheme" key={s.id}><div className={"scheme-icon "+s.accent}><Icon size={20}/></div><b>{s.name}</b><button onClick={()=>toggle(s.id)} aria-label={"Remove "+s.name}>×</button></div>})}</div>
      {rows.map(([label,key])=><div className="compare-row" key={key}><div className="compare-label">{label}</div>{selected.map(s=><div className="compare-cell" key={s.id}>{key==="benefits"?<ul>{s.benefits.map(b=><li key={b}><CheckCircle2 size={13}/>{b}</li>)}</ul>:key==="route"?<span>Partner / official channel</span>:<span>{s[key]}</span>}</div>)}</div>)}
      <div className="compare-row compare-actions-row"><div className="compare-label">Next step</div>{selected.map(s=><div className="compare-cell" key={s.id}><Link to={"/schemes/"+s.id} className="button button-secondary">View Details</Link><Link to={"/apply/"+s.id} className="button button-primary">Apply <ArrowRight size={15}/></Link></div>)}</div>
    </div></div>}
    <div className="compare-note"><CircleHelp size={16}/><span>Comparison information is for this prototype. Always verify current eligibility, loan limits and requirements with the official scheme source.</span></div>
  </main>;
}
function Tracker(){
  const [applications,setApplications]=useState([]);
  const [selected,setSelected]=useState(null);

  const load=()=>{
    const saved=JSON.parse(localStorage.getItem("udyamApplications")||"[]");
    setApplications(saved);
    setSelected(prev=>prev&&saved.find(a=>a.id===prev.id)||saved[0]||null);
  };

  React.useEffect(()=>{load();},[]);

  const stages=[
    {key:"Profile",label:"Profile Created",icon:Users},
    {key:"Eligibility",label:"Eligibility Checked",icon:CheckCircle2},
    {key:"Documents",label:"Documents Ready",icon:FileText},
    {key:"Submitted",label:"Application Submitted",icon:UploadCloud},
    {key:"Verification",label:"Under Verification",icon:Clock3},
    {key:"Decision",label:"Decision",icon:ClipboardCheck}
  ];

  const stageIndex={Profile:0,Eligibility:1,Documents:2,Submitted:3,Verification:4,Decision:5};
  const currentIndex=selected ? (stageIndex[selected.status] ?? 2) : 0;

  const advanceDemo=()=>{
    if(!selected) return;
    const next=Math.min(currentIndex+1,stages.length-1);
    const updated={...selected,status:stages[next].key,progress:Math.round((next/(stages.length-1))*100)};
    const all=applications.map(a=>a.id===selected.id?updated:a);
    localStorage.setItem("udyamApplications",JSON.stringify(all));
    setApplications(all); setSelected(updated);
  };

  const removeApplication=()=>{
    if(!selected) return;
    const all=applications.filter(a=>a.id!==selected.id);
    localStorage.setItem("udyamApplications",JSON.stringify(all));
    setApplications(all); setSelected(all[0]||null);
  };

  return <main className="tracker-page">
    <div className="calculator-heading"><span className="section-kicker">APPLICATION TRACKER</span><h1>Track your application</h1><p>See where your UdyamSetu journey stands. This prototype stores demo application data only in your browser.</p></div>
    {!applications.length ? <div className="tracker-empty"><div className="tracker-empty-icon"><ClipboardCheck size={30}/></div><h2>No application to track yet</h2><p>Choose a scheme, complete your profile and eligibility steps, then start an application from your recommendations.</p><Link to="/schemes" className="button button-primary">Explore Schemes <ArrowRight size={17}/></Link></div> :
    <div className="tracker-layout">
      <aside className="tracker-list">
        <div className="tracker-list-head"><strong>My applications</strong><span>{applications.length}</span></div>
        {applications.map(a=><button key={a.id} className={`tracker-list-item ${selected?.id===a.id?"active":""}`} onClick={()=>{setSelected(a);localStorage.setItem("udyamActiveApplication",a.id)}}><div className="tracker-list-icon"><FileText size={17}/></div><div><b>{a.schemeName}</b><small>{a.id}</small></div><ChevronRight size={16}/></button>)}
        <Link to="/schemes" className="tracker-add-link">+ Start another application</Link>
      </aside>
      {selected&&<section className="tracker-detail">
        <div className="tracker-detail-top"><div><span className="section-kicker">{selected.status.toUpperCase()}</span><h2>{selected.schemeName}</h2><p>Application ID <b>{selected.id}</b> • Started {selected.createdAt}</p></div><span className="tracker-status-badge"><CircleDot size={14}/>{selected.status}</span></div>
        <div className="tracker-progress"><div className="tracker-progress-head"><span>Application progress</span><b>{selected.progress}%</b></div><div className="tracker-progress-bar"><span style={{width:`${selected.progress}%`}}/></div></div>
        <div className="tracker-timeline">{stages.map((stage,i)=>{const Icon=stage.icon; const done=i<=currentIndex; const current=i===currentIndex; return <div className={`tracker-stage ${done?"done":""} ${current?"current":""}`} key={stage.key}><div className="tracker-stage-icon">{done?<CheckCircle2 size={18}/>:<Icon size={18}/>}</div><div><b>{stage.label}</b><small>{done?(current?"Current stage":"Completed"):"Pending"}</small></div>{i<stages.length-1&&<div className={`tracker-stage-line ${i<currentIndex?"filled":""}`}/>}</div>})}</div>
        <div className="tracker-info-grid"><div><span>Scheme</span><b>{selected.schemeName}</b></div><div><span>Started</span><b>{selected.createdAt}</b></div><div><span>Storage</span><b>Browser demo</b></div></div>
        <div className="tracker-actions"><Link to="/documents" className="button button-primary">{selected.status==="Documents"?"Open Document Checklist":"View Document Checklist"} <ArrowRight size={17}/></Link><button className="button button-secondary" onClick={advanceDemo} disabled={currentIndex>=stages.length-1}>{currentIndex>=stages.length-1?"Journey Complete":"Advance Demo Status"} <ArrowRight size={17}/></button><button className="button button-secondary" onClick={removeApplication}>Remove Demo</button></div>
        <div className="tracker-note"><AlertCircle size={18}/><div><b>Prototype status</b><p>Application status is simulated for demonstration. It is not connected to a government application system and does not represent a real application status.</p></div></div>
      </section>}
    </div>}
  </main>;
}


function Documents(){
  const applications=JSON.parse(localStorage.getItem("udyamApplications")||"[]");
  const selectedId=localStorage.getItem("udyamActiveApplication")||applications[0]?.id||"";
  const selected=applications.find(a=>a.id===selectedId)||applications[0];
  const defaultDocs=[
    {id:"aadhaar",name:"Aadhaar Card",type:"Identity Proof",required:true},
    {id:"pan",name:"PAN Card",type:"Identity / Financial",required:true},
    {id:"income",name:"Income Certificate",type:"Income Proof",required:true},
    {id:"bank",name:"Bank Account / Passbook",type:"Banking",required:true},
    {id:"address",name:"Address Proof",type:"Address",required:true},
    {id:"business",name:"Business / Enterprise Proof",type:"Business",required:false}
  ];
  const storageKey=selected?"udyamDocuments_"+selected.id:"udyamDocuments_demo";
  const [docs,setDocs]=useState(()=>JSON.parse(localStorage.getItem(storageKey)||"null")||defaultDocs.map(d=>({...d,done:false})));
  const toggle=id=>{const next=docs.map(d=>d.id===id?{...d,done:!d.done}:d);setDocs(next);localStorage.setItem(storageKey,JSON.stringify(next));};
  const completed=docs.filter(d=>d.done).length;
  const required=docs.filter(d=>d.required).length;
  const requiredDone=docs.filter(d=>d.required&&d.done).length;
  const markAll=()=>{const next=docs.map(d=>({...d,done:true}));setDocs(next);localStorage.setItem(storageKey,JSON.stringify(next));};
  return <main className="documents-page">
    <div className="calculator-heading"><span className="section-kicker">DOCUMENT CHECKLIST</span><h1>Get your documents ready</h1><p>Prepare the documents commonly needed for the selected application. This checklist is a prototype and should be verified against the official scheme requirements.</p></div>
    {!selected?<div className="tracker-empty"><div className="tracker-empty-icon"><FileText size={30}/></div><h2>No application selected</h2><p>Start an application first so UdyamSetu can keep a separate document checklist for it.</p><Link to="/schemes" className="button button-primary">Explore Schemes <ArrowRight size={17}/></Link></div>:
    <div className="documents-card">
      <div className="documents-top"><div><span className="section-kicker">{selected.schemeName}</span><h2>Application {selected.id}</h2></div><Link to="/tracker" className="button button-secondary">Back to Tracker</Link></div>
      <div className="documents-progress"><div><span>Documents ready</span><b>{completed}/{docs.length}</b></div><div className="documents-progress-bar"><span style={{width:(Math.round((completed/docs.length)*100))+"%"}}/></div><small>{requiredDone}/{required} required documents completed</small></div>
      <div className="document-list">{docs.map(doc=><div className={"document-row "+(doc.done?"completed":"")} key={doc.id}><button className="document-check" onClick={()=>toggle(doc.id)} aria-label={doc.done?"Mark "+doc.name+" pending":"Mark "+doc.name+" complete"}>{doc.done?<CheckCircle2 size={20}/>:<CircleDot size={20}/>}</button><div className="document-copy"><b>{doc.name}</b><span>{doc.type}{doc.required?" • Required":" • Recommended"}</span></div><span className={"document-status "+(doc.done?"ready":"")}>{doc.done?"Ready":"Pending"}</span></div>)}</div>
      <div className="documents-actions"><button className="button button-secondary" onClick={markAll}>Mark all ready</button><Link to="/tracker" className={"button button-primary "+(requiredDone<required?"disabled-link":"")}>{requiredDone===required?"Continue to Tracker":"Save & Continue"} <ArrowRight size={17}/></Link></div>
      <div className="tracker-note"><AlertCircle size={18}/><div><b>Prototype reminder</b><p>Do not upload real identity documents to this demo. In a production version, documents should use secure authenticated storage and official verification.</p></div></div>
    </div>}
  </main>;
}
function EMICalculator(){
  const [amount,setAmount]=useState(1000000),[rate,setRate]=useState(7),[years,setYears]=useState(5); const r=rate/12/100,n=years*12;
  const emi=r===0?amount/n:(amount*r*Math.pow(1+r,n))/(Math.pow(1+r,n)-1); const total=emi*n,interest=total-amount;
  const money=x=>new Intl.NumberFormat("en-IN",{style:"currency",currency:"INR",maximumFractionDigits:0}).format(Math.round(x));
  return <main className="calculator-page"><div className="calculator-heading"><span className="section-kicker">PLAN YOUR REPAYMENT</span><h1>EMI Calculator</h1><p>Adjust the inputs to estimate monthly repayment. This is an indicative calculation for the prototype.</p></div><div className="calculator-grid"><div className="calculator-card"><label>Loan Amount <strong>{money(amount)}</strong><input type="range" min="100000" max="2500000" step="50000" value={amount} onChange={e=>setAmount(+e.target.value)}/></label><label>Interest Rate <strong>{rate}%</strong><input type="range" min="0" max="15" step=".1" value={rate} onChange={e=>setRate(+e.target.value)}/></label><label>Loan Tenure <strong>{years} years</strong><input type="range" min="1" max="15" value={years} onChange={e=>setYears(+e.target.value)}/></label></div><div className="emi-result"><span>ESTIMATED MONTHLY EMI</span><strong>{money(emi)}</strong><div className="emi-breakdown"><div><span>Principal</span><b>{money(amount)}</b></div><div><span>Total interest</span><b>{money(interest)}</b></div><div><span>Total repayment</span><b>{money(total)}</b></div></div><Link to="/partners" className="button button-primary">Find a Partner <MapPin size={17}/></Link></div></div></main>;
}

function Partners(){
  const [query,setQuery]=useState(""); const filtered=partners.filter(p=>(p.name+" "+p.location+" "+p.type).toLowerCase().includes(query.toLowerCase()));
  const partnerLocations=[
    {name:"State Bank of India",position:[22.7533,75.8937],location:"Vijay Nagar, Indore"},
    {name:"District Industries Centre",position:[22.7196,75.8577],location:"Collectorate Area, Indore"},
    {name:"Common Service Centre",position:[22.7350,75.9025],location:"Scheme No. 54, Indore"}
  ];
  const markerIcon=L.divIcon({className:"custom-map-marker",html:'<div class="leaflet-pin">●</div>',iconSize:[28,28],iconAnchor:[14,28],popupAnchor:[0,-28]});
  return <main className="partners-page"><div className="calculator-heading"><span className="section-kicker">CHANNEL PARTNER LOCATOR</span><h1>Find a Partner</h1><p>Discover the next assisted channel for your application journey.</p></div><div className="partner-layout"><div className="partner-map real-map"><MapContainer center={[22.7196,75.8577]} zoom={12} scrollWheelZoom={true} className="leaflet-map"><TileLayer attribution='&copy; OpenStreetMap contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />{partnerLocations.map(p=><Marker key={p.name} position={p.position} icon={markerIcon}><Popup><strong>{p.name}</strong><br/>{p.location}</Popup></Marker>)}</MapContainer><div className="map-label"><MapPin size={16}/> Indore, Madhya Pradesh</div></div><div className="partner-list"><div className="search-field"><Search size={17}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search partner or area"/></div>{filtered.map(p=><article className="partner-card" key={p.name}><div className="partner-icon"><Building2 size={20}/></div><div><h3>{p.name}</h3><p>{p.type}</p><span><MapPin size={13}/> {p.location}</span></div><strong>{p.distance}</strong></article>)}{!filtered.length&&<p className="empty-state">No matching partners in this prototype data.</p>}</div></div></main>;
}

function About(){
  return <main className="about-page"><div className="about-hero"><span className="section-kicker">ABOUT UDYAMSETU</span><h1>From scheme discovery to the right next step.</h1><p>UdyamSetu is an SIH 2026 prototype designed to simplify how applicants discover concessional financial support, understand their options and reach the appropriate channel partner.</p></div><div className="about-grid"><div className="about-card"><Sparkles size={23}/><h3>Discover</h3><p>Browse schemes before sharing personal information.</p></div><div className="about-card"><Calculator size={23}/><h3>Calculate</h3><p>Use an indicative EMI calculator to understand repayment.</p></div><div className="about-card"><Users size={23}/><h3>Connect</h3><p>Find a channel partner for the next stage.</p></div></div><div className="about-note"><ShieldCheck size={20}/><div><b>Important</b><p>This is a demonstration prototype. Scheme eligibility, interest rates, loan limits and application requirements should always be verified with the official source before applying.</p></div></div></main>;
}

function Login(){
  const navigate=useNavigate(); const [email,setEmail]=useState(""); const [password,setPassword]=useState("");
  const submit=e=>{e.preventDefault();navigate("/schemes");};
  return <main className="auth-page"><div className="auth-card"><div className="brand-mark">U</div><h1>Welcome back</h1><p>Login to continue to UdyamSetu.</p><form onSubmit={submit}><input type="email" value={email} onChange={e=>setEmail(e.target.value)} required placeholder="Email address"/><input type="password" value={password} onChange={e=>setPassword(e.target.value)} required placeholder="Password"/><button className="button button-primary" type="submit">Login <ArrowRight size={17}/></button></form><small>Demo login — no real authentication is connected in this prototype.</small><Link to="/schemes" className="auth-back">Continue without login</Link></div></main>;
}

function App(){
  return <><Navbar/><Routes>
    <Route path="/" element={<Home/>}/><Route path="/schemes" element={<Schemes/>}/><Route path="/schemes/:id" element={<SchemeDetails/>}/>
    <Route path="/apply/:schemeId" element={<Apply schemeId={null}/>}/>
    <Route path="/profile" element={<Profile/>}/><Route path="/eligibility" element={<Eligibility/>}/><Route path="/recommendations" element={<Recommendations/>}/>
    <Route path="/compare" element={<Compare/>}/><Route path="/tracker" element={<Tracker/>}/><Route path="/documents" element={<Documents/>}/><Route path="/emi-calculator" element={<EMICalculator/>}/><Route path="/partners" element={<Partners/>}/><Route path="/about" element={<About/>}/><Route path="/login" element={<Login/>}/>
  </Routes></>;
}
export default App;
