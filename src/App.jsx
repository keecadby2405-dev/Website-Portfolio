import { useState, useEffect, useRef, useCallback } from "react";

const NAV = [
  { label:"About", id:"about" },
  { label:"Experience", id:"experience" },
  { label:"Journey", id:"timeline" },
  { label:"Skills", id:"skills" },
  { label:"Achievements", id:"achievements" },
  { label:"Purpose", id:"passion" },
  { label:"Contact", id:"contact" },
];

// Add your photo as public/keelie.jpg and your CV as public/Keelie-Cadby-CV.pdf
const PHOTO_SRC = "/keelie.jpg?v=2";
const CV_SRC = "/Keelie-Cadby-CV.pdf";

const EXPERIENCE = [
  { role:"Apprentice Business Administrator", company:"Auxilio Care Ltd", period:"Aug 2025 – Present", type:"Full-time Apprenticeship · 30 hrs/week", bullets:["Day-to-day administrative support across Auxilio Care and Aurum Housing","Maintaining accurate records, filing systems and databases","Managing correspondence — emails, letters and phone calls","Diary and calendar management for managers and teams","HR admin: personnel files, training records and compliance documentation","Supporting compliance audits and regulatory requirements","Preparation and documentation for interviews"] },
  { role:"Assistant Administrator", company:"Auxilio Care Ltd", period:"Jul 2024 – Sep 2024", type:"Work Experience · 2 days/week", bullets:["Managed and updated client files and internal systems","Maintained spreadsheets for staff training records","Checked and monitored PPE stock for care staff","Supported co-workers with outstanding tasks"] },
  { role:"Charity Shop Volunteer", company:"YMCA", period:"May 2023 – Jun 2023", type:"Volunteer", bullets:["Designed attractive window and shop floor displays","Provided advice and guidance to customers","Processed, labelled and displayed donations to maximise sales","Assessed donated goods to ensure quality and presentation"] },
];

const TOP_SKILLS = ["Microsoft 365","Diary Management","HR & Compliance Admin","Confidentiality & GDPR","Attention to Detail","Leadership"];

const SKILL_GROUPS = [
  { title:"Administration", items:["Administration Support","Data Entry","Document Management","Office Administration","Multitasking","Organisation"] },
  { title:"Communication", items:["Written Communication","Verbal Communication","Presentation Skills","Active Listening","Social Media"] },
  { title:"Leadership & Mindset", items:["Team Building","Decision Making","Calm Under Pressure","Willingness to Learn"] },
];

const ACHIEVEMENTS = [
  { icon:"✈️", title:"RAFAC International Exchange 2026", desc:"Competitively selected for, and completed, a prestigious international exchange programme to the USA — gaining aviation exposure and leadership experience alongside allied air cadet organisations." },
  { icon:"🎖️", title:"Flight Sergeant – RAF Air Cadets", desc:"Progressed to Flight Sergeant since joining in 2021. Qualified to teach new cadets in classifications and various areas of learning as part of the training team." },
  { icon:"🛡️", title:"Leadership Courses", desc:"Completed Bronze and Silver Leadership Courses, Method of Instruction, Cadet Drill Course, and Master Air Cadet Classification." },
  { icon:"🔐", title:"Cyber Security", desc:"Introduction to Cyber Security (OpenLearn), Bronze and Silver Cyber Courses. Passionate about pursuing a career in cybersecurity or aviation technology." },
  { icon:"🏥", title:"Care Certificate & VTQs", desc:"Care Certificate (Sep 2025), Customer Service L2, Complaint Handling L1, Presentation Skills L1, GDPR Certified, Equality Act 2010 Certified." },
  { icon:"🚶", title:"Road Marching", desc:"Completed 15km, 20km and 25km road marches, Basic First Aid, and Radio Basic Operator qualification." },
];

const EDUCATION = [
  { year:"2024", qual:"Level 2 Business Support & Level 1 Business Admin", place:"Barnardo's Study Programme, Midlands ETS" },
  { year:"2023", qual:"GCSE English Language (5), GCSE Fine Art (4), ASDAN L1 Award of Personal Effectiveness", place:"The Triple Crown Centre, Solihull" },
];

const TIMELINE = [
  { year:"2017", icon:"🤝", title:"Joined OVOS", desc:"Began volunteering with Our Voice Our Service, supporting care-experienced young people and representing their voices at events." },
  { year:"2021", icon:"✈️", title:"Joined RAF Air Cadets", desc:"Started with the Royal Air Force Air Cadets, beginning a journey of discipline, leadership and personal development." },
  { year:"2023", icon:"📚", title:"GCSEs at Triple Crown Centre", desc:"Achieved GCSE English Language (5), Fine Art (4) and ASDAN Level 1 Award of Personal Effectiveness." },
  { year:"2023", icon:"🛍️", title:"YMCA Volunteer", desc:"Completed work experience at YMCA charity shop — designing displays, advising customers and processing donations." },
  { year:"2024", icon:"🎓", title:"Business Support Qualifications", desc:"Completed Level 2 Business Support and Level 1 Business Admin at Barnardo's Study Programme, Midlands ETS." },
  { year:"2024", icon:"💼", title:"Assistant Admin at Auxilio Care", desc:"Six-week work experience managing client files, maintaining training spreadsheets and supporting the admin team." },
  { year:"2025", icon:"🎖️", title:"Promoted to Flight Sergeant", desc:"Achieved the rank of Flight Sergeant in RAF Air Cadets, qualifying to teach and lead new cadets on the training team." },
  { year:"2025", icon:"📋", title:"Apprentice Business Administrator", desc:"Started full apprenticeship at Auxilio Care Ltd — handling HR admin, compliance, diary management and correspondence." },
  { year:"2025", icon:"🏥", title:"Care Certificate Achieved", desc:"Completed Care Certificate alongside VTQs in Customer Service, Complaint Handling, GDPR and Equality Act 2010." },
  { year:"2026", icon:"🌍", title:"RAFAC International Exchange – USA", desc:"Completed a competitively selected international exchange programme to the United States, focused on aviation and leadership." },
];

const TYPING_PROMPTS = [
  "Please find attached the updated compliance documentation for your review.",
  "I have scheduled the team meeting for Thursday at 10am in the main conference room.",
  "Could you ensure all staff training records are updated before the end of the week.",
  "The client files have been organised and filed in accordance with our data protection policy.",
  "Please action the outstanding correspondence and update the database accordingly.",
  "I am writing to confirm your appointment has been rescheduled to the following date.",
  "All personnel records must be maintained with strict confidentiality at all times.",
  "The quarterly compliance audit is due next Friday and all documentation must be prepared.",
  "Thank you for attending the briefing today. Minutes will be circulated by end of business.",
  "Please ensure diary management is kept up to date for all senior management staff.",
];

const TYPING_WORDS = ["Administrator","Leader","Cadet","Future Tech Professional","RAF Flight Sergeant"];

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

function FadeIn({ children, delay = 0 }) {
  const [ref, inView] = useInView();
  return <div ref={ref} style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(24px)", transition: `opacity .7s ease ${delay}s, transform .7s ease ${delay}s` }}>{children}</div>;
}

function LoadingScreen({ onDone }) {
  const [fade, setFade] = useState(false);
  useEffect(() => { const t1 = setTimeout(() => setFade(true), 500); const t2 = setTimeout(() => onDone(), 800); return () => { clearTimeout(t1); clearTimeout(t2); }; }, []);
  return (
    <div style={{ position:"fixed", inset:0, zIndex:300, background:"#0d1117", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:24, opacity:fade?0:1, transition:"opacity .6s ease", pointerEvents:fade?"none":"all" }}>
      <div style={{ fontSize:64, animation:"spinKey 1.2s linear infinite" }}>🔑</div>
      <p style={{ margin:0, fontSize:13, letterSpacing:"0.4em", textTransform:"uppercase", color:"rgba(251,207,232,0.7)" }}>Loading Portfolio</p>
      <style>{`@keyframes spinKey{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}`}</style>
    </div>
  );
}

function TurnstileScreen({ onVerified }) {
  useEffect(() => { const t = setTimeout(() => { if (window.turnstile && document.getElementById("ts-container")) { window.turnstile.render("#ts-container", { sitekey:"0x4AAAAAACy9qo372FzJWivY", theme:"dark", callback:() => onVerified() }); } }, 100); return () => clearTimeout(t); }, []);
  return (
    <div style={{ position:"fixed", inset:0, zIndex:250, background:"rgba(9,11,16,0.96)", display:"flex", alignItems:"center", justifyContent:"center", padding:24 }}>
      <div style={{ width:"100%", maxWidth:520, borderRadius:28, border:"1px solid rgba(244,114,182,0.18)", background:"rgba(255,255,255,0.05)", padding:40, backdropFilter:"blur(22px)", textAlign:"center" }}>
        <div style={{ fontSize:40, marginBottom:16 }}>🔑</div>
        <p style={{ margin:0, fontSize:11, textTransform:"uppercase", letterSpacing:"0.38em", color:"rgba(251,207,232,0.7)" }}>Security Check</p>
        <h2 style={{ margin:"14px 0 0", fontSize:"clamp(1.4rem,4vw,2rem)", fontWeight:700, color:"#f8e7f1", letterSpacing:"-0.03em" }}>Please verify to enter</h2>
        <p style={{ marginTop:12, fontSize:15, lineHeight:1.7, color:"rgba(255,255,255,0.6)" }}>Complete the security check to continue to my portfolio.</p>
        <div id="ts-container" style={{ marginTop:24, display:"flex", justifyContent:"center" }} />
      </div>
    </div>
  );
}

function Toast({ onDone }) {
  const [vis, setVis] = useState(true);
  useEffect(() => { const t1 = setTimeout(() => setVis(false), 2600); const t2 = setTimeout(() => onDone(), 3200); return () => { clearTimeout(t1); clearTimeout(t2); }; }, []);
  return <div style={{ position:"fixed", bottom:32, left:"50%", transform:`translateX(-50%) translateY(${vis?0:80}px)`, opacity:vis?1:0, transition:"all .5s cubic-bezier(.22,1,.36,1)", zIndex:500, background:"#f472b6", color:"#0f172a", borderRadius:999, padding:"14px 28px", fontSize:15, fontWeight:700, whiteSpace:"nowrap", boxShadow:"0 8px 32px rgba(244,114,182,0.4)" }}>🔑 Easter egg unlocked — Kee's Space Shooter!</div>;
}

function ParticleCanvas({ dark }) {
  const ref = useRef(null);
  useEffect(() => {
    const c = ref.current; if (!c) return;
    const ctx = c.getContext("2d");
    let W = c.width = window.innerWidth, H = c.height = window.innerHeight;
    let mouse = { x: W/2, y: H/2 };
    const pts = Array.from({ length:80 }, () => ({ x:Math.random()*W, y:Math.random()*H, vx:(Math.random()-.5)*.4, vy:(Math.random()-.5)*.4 }));
    const onMove = e => { mouse.x = e.clientX; mouse.y = e.clientY; };
    const onResize = () => { W = c.width = window.innerWidth; H = c.height = window.innerHeight; };
    window.addEventListener("mousemove", onMove); window.addEventListener("resize", onResize);
    let raf;
    const draw = () => {
      ctx.clearRect(0,0,W,H);
      pts.forEach(p => { p.x+=p.vx; p.y+=p.vy; if(p.x<0||p.x>W)p.vx*=-1; if(p.y<0||p.y>H)p.vy*=-1; const dx=mouse.x-p.x,dy=mouse.y-p.y,d=Math.sqrt(dx*dx+dy*dy); if(d<120){p.x-=dx*.012;p.y-=dy*.012;} });
      for(let i=0;i<80;i++){for(let j=i+1;j<80;j++){const dx=pts[i].x-pts[j].x,dy=pts[i].y-pts[j].y,d=Math.sqrt(dx*dx+dy*dy);if(d<130){ctx.beginPath();ctx.moveTo(pts[i].x,pts[i].y);ctx.lineTo(pts[j].x,pts[j].y);ctx.strokeStyle=`rgba(244,114,182,${(1-d/130)*(dark?.18:.1)})`;ctx.lineWidth=1;ctx.stroke();}}ctx.beginPath();ctx.arc(pts[i].x,pts[i].y,2,0,Math.PI*2);ctx.fillStyle=dark?"rgba(244,114,182,0.5)":"rgba(200,80,150,0.35)";ctx.fill();}
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("mousemove",onMove); window.removeEventListener("resize",onResize); };
  }, [dark]);
  return <canvas ref={ref} style={{ position:"fixed", inset:0, zIndex:0, pointerEvents:"none" }} />;
}

function CustomCursor() {
  const dot = useRef(null); const ring = useRef(null);
  const pos = useRef({x:0,y:0}); const rPos = useRef({x:0,y:0});
  useEffect(() => {
    const move = e => { pos.current = {x:e.clientX,y:e.clientY}; };
    window.addEventListener("mousemove", move);
    let raf;
    const animate = () => { rPos.current.x+=(pos.current.x-rPos.current.x)*.12; rPos.current.y+=(pos.current.y-rPos.current.y)*.12; if(dot.current){dot.current.style.left=pos.current.x+"px";dot.current.style.top=pos.current.y+"px";} if(ring.current){ring.current.style.left=rPos.current.x+"px";ring.current.style.top=rPos.current.y+"px";} raf=requestAnimationFrame(animate); };
    raf = requestAnimationFrame(animate);
    return () => { window.removeEventListener("mousemove",move); cancelAnimationFrame(raf); };
  }, []);
  return (<><div ref={dot} style={{position:"fixed",width:8,height:8,borderRadius:"50%",background:"#f472b6",pointerEvents:"none",zIndex:9999,transform:"translate(-50%,-50%)",mixBlendMode:"difference"}}/><div ref={ring} style={{position:"fixed",width:32,height:32,borderRadius:"50%",border:"1.5px solid rgba(244,114,182,0.55)",pointerEvents:"none",zIndex:9998,transform:"translate(-50%,-50%)"}}/></>);
}

function TypingText() {
  const [wordIdx,setWordIdx]=useState(0); const [displayed,setDisplayed]=useState(""); const [deleting,setDeleting]=useState(false);
  useEffect(()=>{const word=TYPING_WORDS[wordIdx];let t;if(!deleting&&displayed.length<word.length){t=setTimeout(()=>setDisplayed(word.slice(0,displayed.length+1)),80);}else if(!deleting&&displayed.length===word.length){t=setTimeout(()=>setDeleting(true),1400);}else if(deleting&&displayed.length>0){t=setTimeout(()=>setDisplayed(displayed.slice(0,-1)),45);}else if(deleting&&displayed.length===0){setDeleting(false);setWordIdx(i=>(i+1)%TYPING_WORDS.length);}return()=>clearTimeout(t);},[displayed,deleting,wordIdx]);
  return <span style={{color:"#f472b6",borderRight:"2px solid #f472b6",paddingRight:3,animation:"blink .8s step-end infinite"}}>{displayed}<style>{`@keyframes blink{0%,100%{border-color:#f472b6}50%{border-color:transparent}}`}</style></span>;
}

function VisitorCounter() {
  const [count,setCount]=useState(null);
  useEffect(()=>{try{const k="kc_v2";const n=parseInt(localStorage.getItem(k)||"0",10)+1;localStorage.setItem(k,n);setCount(n);}catch{setCount("—");}}, []);
  return count!==null?(<div style={{display:"inline-flex",alignItems:"center",gap:8,borderRadius:999,border:"1px solid rgba(244,114,182,0.18)",background:"rgba(244,114,182,0.08)",padding:"6px 14px",fontSize:12,color:"rgba(251,207,232,0.8)",marginTop:12}}>👁 {count} {count===1?"visit":"visits"} to this portfolio</div>):null;
}

// ── Open to Opportunities Badge ────────────────────────────
function OpportunityBadge() {
  return (
    <div style={{display:"inline-flex",alignItems:"center",gap:8,borderRadius:999,border:"1px solid rgba(34,197,94,0.3)",background:"rgba(34,197,94,0.1)",padding:"8px 16px",fontSize:13,fontWeight:600,color:"#4ade80"}}>
      <span style={{width:8,height:8,borderRadius:"50%",background:"#22c55e",display:"inline-block",animation:"pulse 1.8s ease-in-out infinite"}} />
      Open to Opportunities
      <style>{`@keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.5;transform:scale(1.3)}}`}</style>
    </div>
  );
}

// ── Timeline ───────────────────────────────────────────────
function Timeline({ t }) {
  return (
    <div style={{position:"relative",marginTop:48}}>
      <div className="tl-line" style={{position:"absolute",left:"50%",top:0,bottom:0,width:2,background:"linear-gradient(to bottom,transparent,rgba(244,114,182,0.4),transparent)",transform:"translateX(-50%)"}} />
      {TIMELINE.map((item,i)=>(<TimelineItem key={i} item={item} i={i} t={t}/>))}
    </div>
  );
}

function TimelineItem({ item, i, t }) {
        const [ref,inView]=useInView(0.1);
        const left=i%2===0;
        return (
          <div ref={ref} className="tl-row" style={{display:"flex",justifyContent:left?"flex-start":"flex-end",marginBottom:32,opacity:inView?1:0,transform:inView?"translateY(0)":`translateY(20px)`,transition:`opacity .6s ease ${i*.07}s,transform .6s ease ${i*.07}s`}}>
            <div className="tl-item" style={{width:"44%",padding:left?"0 32px 0 0":"0 0 0 32px",textAlign:left?"right":"left",position:"relative"}}>
              <div className="tl-dot" style={{position:"absolute",top:16,[left?"right":"left"]:-9,width:18,height:18,borderRadius:"50%",background:"#f472b6",border:"3px solid #0d1117",zIndex:2,boxShadow:"0 0 12px rgba(244,114,182,0.5)"}} />
              <div style={{borderRadius:20,border:"1px solid",borderColor:t.border,background:t.card,padding:"18px 22px",backdropFilter:"blur(14px)"}}>
                <div style={{fontSize:22,marginBottom:6}}>{item.icon}</div>
                <span style={{fontSize:11,fontWeight:700,color:"#f472b6",letterSpacing:"0.25em"}}>{item.year}</span>
                <h3 style={{margin:"6px 0 8px",fontSize:16,fontWeight:700,color:t.heading,lineHeight:1.3}}>{item.title}</h3>
                <p style={{margin:0,fontSize:13,lineHeight:1.7,color:t.body}}>{item.desc}</p>
              </div>
            </div>
          </div>
        );
}

// ── Typing Challenge & Leaderboard ─────────────────────────
const CHALLENGE_KEY = "kc_typing_lb";

function loadBoard() {
  try { return JSON.parse(localStorage.getItem(CHALLENGE_KEY)||"[]"); } catch { return []; }
}
function saveBoard(entries) {
  try { localStorage.setItem(CHALLENGE_KEY, JSON.stringify(entries)); } catch {}
}

function TypingChallenge({ t }) {
  const [phase,setPhase]=useState("idle"); // idle | countdown | playing | done | name
  const [countdown,setCountdown]=useState(3);
  const [timeLeft,setTimeLeft]=useState(30);
  const [prompt,setPrompt]=useState("");
  const [typed,setTyped]=useState("");
  const [wpm,setWpm]=useState(0);
  const [acc,setAcc]=useState(0);
  const [chars,setChars]=useState(0);
  const [errors,setErrors]=useState(0);
  const [name,setName]=useState("");
  const [board,setBoard]=useState(loadBoard);
  const inputRef=useRef(null);
  const timerRef=useRef(null);
  const startTimeRef=useRef(null);
  const promptRef=useRef("");

  const pickPrompt=()=>{
    const p=TYPING_PROMPTS[Math.floor(Math.random()*TYPING_PROMPTS.length)];
    setPrompt(p); promptRef.current=p;
  };

  const start=()=>{
    pickPrompt(); setTyped(""); setChars(0); setErrors(0); setPhase("countdown"); setCountdown(3);
  };

  useEffect(()=>{
    if(phase!=="countdown")return;
    if(countdown===0){setPhase("playing");setTimeLeft(30);startTimeRef.current=Date.now();setTimeout(()=>inputRef.current?.focus(),50);return;}
    const t=setTimeout(()=>setCountdown(c=>c-1),1000);
    return()=>clearTimeout(t);
  },[phase,countdown]);

  useEffect(()=>{
    if(phase!=="playing")return;
    timerRef.current=setInterval(()=>{
      setTimeLeft(tl=>{
        if(tl<=1){clearInterval(timerRef.current);finishGame();return 0;}
        return tl-1;
      });
    },1000);
    return()=>clearInterval(timerRef.current);
  },[phase]);

  const finishGame=useCallback(()=>{
    setPhase("done");
    const elapsed=(Date.now()-startTimeRef.current)/1000/60;
    const wordsTyped=chars/5;
    const w=Math.round(wordsTyped/elapsed)||0;
    const a=chars>0?Math.round(((chars-errors)/chars)*100):0;
    setWpm(w); setAcc(a);
  },[chars,errors]);

  const onType=e=>{
    if(phase!=="playing")return;
    const val=e.target.value;
    setTyped(val);
    const p=promptRef.current;
    let errs=0;
    for(let i=0;i<val.length;i++){ if(val[i]!==p[i])errs++; }
    setErrors(errs);
    setChars(val.length);
    if(val===p){clearInterval(timerRef.current);finishGame();}
    // auto-next prompt if completed
    if(val.length>=p.length&&val!==p){pickPrompt();setTyped("");}
  };

  const submitScore=()=>{
    if(!name.trim())return;
    const entry={name:name.trim(),wpm,acc,date:new Date().toLocaleDateString("en-GB")};
    const nb=[...board,entry].sort((a,b)=>b.wpm-a.wpm).slice(0,10);
    setBoard(nb); saveBoard(nb); setPhase("idle"); setName("");
  };

  const renderPrompt=()=>{
    return prompt.split("").map((ch,i)=>{
      let col="rgba(255,255,255,0.35)";
      if(i<typed.length) col=typed[i]===ch?"#4ade80":"#f87171";
      return <span key={i} style={{color:col,fontSize:17,lineHeight:2,fontFamily:"monospace"}}>{ch}</span>;
    });
  };

  return (
    <div>
      {phase==="idle"&&(
        <div style={{textAlign:"center",padding:"40px 20px"}}>
          <div style={{fontSize:48,marginBottom:16}}>⌨️</div>
          <p style={{fontSize:16,color:t.body,marginBottom:24,lineHeight:1.7}}>Think you've got what it takes to keep up with a Business Admin Apprentice?<br/>Type as much as you can in <strong style={{color:"#f472b6"}}>30 seconds!</strong></p>
          <button onClick={start} style={{...btnPrimary}}>Start Challenge</button>
        </div>
      )}

      {phase==="countdown"&&(
        <div style={{textAlign:"center",padding:"60px 20px"}}>
          <div style={{fontSize:80,fontWeight:700,color:"#f472b6",animation:"pulse 1s ease-in-out infinite"}}>{countdown}</div>
          <p style={{color:t.muted,marginTop:16}}>Get ready to type!</p>
        </div>
      )}

      {phase==="playing"&&(
        <div>
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:20}}>
            <span style={{fontSize:24,fontWeight:700,color:"#f472b6"}}>{timeLeft}s</span>
            <span style={{fontSize:14,color:t.muted}}>{chars} chars</span>
          </div>
          <div style={{background:"rgba(255,255,255,0.04)",borderRadius:16,border:"1px solid",borderColor:t.border,padding:"20px 24px",marginBottom:16,minHeight:80,lineHeight:2,wordBreak:"break-word"}}>
            {renderPrompt()}
          </div>
          <input
            ref={inputRef}
            value={typed}
            onChange={onType}
            placeholder="Start typing here..."
            style={{width:"100%",background:"rgba(255,255,255,0.06)",border:"1px solid rgba(244,114,182,0.3)",borderRadius:12,padding:"14px 18px",fontSize:16,color:t.text,fontFamily:"monospace",outline:"none",boxSizing:"border-box"}}
            autoComplete="off" autoCorrect="off" autoCapitalize="off" spellCheck="false"
          />
          <div style={{marginTop:12,height:4,borderRadius:999,background:"rgba(255,255,255,0.08)"}}>
            <div style={{height:"100%",borderRadius:999,background:"#f472b6",width:`${(30-timeLeft)/30*100}%`,transition:"width 1s linear"}} />
          </div>
        </div>
      )}

      {phase==="done"&&(
        <div style={{textAlign:"center",padding:"20px 0"}}>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:28}}>
            {[{l:"WPM",v:wpm},{l:"Accuracy",v:`${acc}%`}].map((s,i)=>(
              <div key={i} style={{borderRadius:20,border:"1px solid",borderColor:t.border,background:t.card,padding:"24px 16px"}}>
                <p style={{margin:0,fontSize:12,textTransform:"uppercase",letterSpacing:"0.3em",color:"rgba(251,207,232,0.7)"}}>{s.l}</p>
                <p style={{margin:"8px 0 0",fontSize:36,fontWeight:700,color:"#f472b6"}}>{s.v}</p>
              </div>
            ))}
          </div>
          <p style={{color:t.body,marginBottom:20}}>Enter your name to save your score to the leaderboard!</p>
          <div style={{display:"flex",gap:12,justifyContent:"center",flexWrap:"wrap"}}>
            <input value={name} onChange={e=>setName(e.target.value)} onKeyDown={e=>e.key==="Enter"&&submitScore()} placeholder="Your name..." style={{background:"rgba(255,255,255,0.06)",border:"1px solid rgba(244,114,182,0.3)",borderRadius:12,padding:"12px 18px",fontSize:15,color:t.text,outline:"none",width:200}} />
            <button onClick={submitScore} style={btnPrimary}>Save Score</button>
            <button onClick={start} style={{...btnSecondary,borderColor:t.border,color:t.text}}>Try Again</button>
          </div>
        </div>
      )}

      {/* Leaderboard */}
      <div style={{marginTop:40}}>
        <p style={{margin:"0 0 16px",fontSize:11,textTransform:"uppercase",letterSpacing:"0.35em",color:"rgba(251,207,232,0.7)"}}>🏆 Leaderboard</p>
        {board.length===0?(
          <div style={{textAlign:"center",padding:"32px",borderRadius:16,border:"1px solid",borderColor:t.border,color:t.muted,fontSize:14}}>No scores yet — be the first!</div>
        ):(
          <div style={{display:"flex",flexDirection:"column",gap:10}}>
            {board.map((e,i)=>(
              <div key={i} style={{display:"flex",alignItems:"center",gap:16,borderRadius:14,border:"1px solid",borderColor:i===0?"rgba(244,114,182,0.4)":t.border,background:i===0?"rgba(244,114,182,0.08)":t.card,padding:"14px 20px"}}>
                <span style={{fontSize:18,minWidth:28}}>{["🥇","🥈","🥉"][i]||`#${i+1}`}</span>
                <span style={{flex:1,fontWeight:600,color:t.heading,fontSize:15}}>{e.name}</span>
                <span style={{fontSize:18,fontWeight:700,color:"#f472b6"}}>{e.wpm} <span style={{fontSize:12,color:t.muted}}>WPM</span></span>
                <span style={{fontSize:13,color:"#4ade80"}}>{e.acc}%</span>
                <span style={{fontSize:12,color:t.muted}}>{e.date}</span>
              </div>
            ))}
          </div>
        )}
        {board.length>0&&<button onClick={()=>{saveBoard([]);setBoard([]);}} style={{marginTop:14,fontSize:12,color:t.muted,background:"none",border:"none",cursor:"pointer",textDecoration:"underline"}}>Clear leaderboard</button>}
      </div>
    </div>
  );
}

// ── Space Game ─────────────────────────────────────────────
function SpaceGame({ onClose }) {
  const canvas=useRef(null); const state=useRef({player:{x:180,y:340},bullets:[],enemies:[],particles:[],score:0,lives:3,frame:0,over:false,keys:{}}); const anim=useRef(null); const scoreDisp=useRef(null); const livesDisp=useRef(null);
  useEffect(()=>{
    const c=canvas.current,ctx=c.getContext("2d"),W=360,H=480,st=state.current;
    const onKey=e=>{st.keys[e.code]=e.type==="keydown";if(e.code==="Space"&&e.type==="keydown")shoot();e.preventDefault();};
    window.addEventListener("keydown",onKey);window.addEventListener("keyup",onKey);
    const shoot=()=>{if(st.over)return;st.bullets.push({x:st.player.x,y:st.player.y-10});};
    const spawnEnemy=()=>{st.enemies.push({x:20+Math.random()*(W-40),y:-20,spd:1.2+Math.random()*1.2});};
    const explode=(x,y)=>{for(let i=0;i<8;i++){const a=(Math.PI*2*i)/8;st.particles.push({x,y,vx:Math.cos(a)*2,vy:Math.sin(a)*2,life:1});}};
    const loop=()=>{
      ctx.clearRect(0,0,W,H);ctx.fillStyle="#0d1117";ctx.fillRect(0,0,W,H);
      if(st.over){ctx.fillStyle="#f472b6";ctx.font="bold 28px Inter,sans-serif";ctx.textAlign="center";ctx.fillText("GAME OVER",W/2,H/2-20);ctx.fillStyle="rgba(255,255,255,0.7)";ctx.font="16px Inter,sans-serif";ctx.fillText(`Score: ${st.score}`,W/2,H/2+14);ctx.fillText("Tap to restart",W/2,H/2+40);anim.current=requestAnimationFrame(loop);return;}
      st.frame++;if(st.frame%60===0)spawnEnemy();
      if(st.keys["ArrowLeft"]||st.keys["KeyA"])st.player.x=Math.max(18,st.player.x-4);
      if(st.keys["ArrowRight"]||st.keys["KeyD"])st.player.x=Math.min(W-18,st.player.x+4);
      if(st.frame%18===0)shoot();
      st.bullets=st.bullets.filter(b=>b.y>-10);st.bullets.forEach(b=>{b.y-=7;});
      st.enemies.forEach(e=>{e.y+=e.spd;});
      st.bullets.forEach((b,bi)=>{st.enemies.forEach((e,ei)=>{if(Math.abs(b.x-e.x)<18&&Math.abs(b.y-e.y)<18){explode(e.x,e.y);st.bullets.splice(bi,1);st.enemies.splice(ei,1);st.score++;if(scoreDisp.current)scoreDisp.current.textContent=st.score;}});});
      st.enemies=st.enemies.filter(e=>{if(e.y>H+10){st.lives--;if(livesDisp.current)livesDisp.current.textContent="❤️".repeat(Math.max(0,st.lives));if(st.lives<=0)st.over=true;return false;}return true;});
      st.particles.forEach(p=>{p.x+=p.vx;p.y+=p.vy;p.life-=0.06;});st.particles=st.particles.filter(p=>p.life>0);
      st.particles.forEach(p=>{ctx.globalAlpha=p.life;ctx.fillStyle="#f472b6";ctx.beginPath();ctx.arc(p.x,p.y,3,0,Math.PI*2);ctx.fill();ctx.globalAlpha=1;});
      ctx.fillStyle="#f9a8d4";st.bullets.forEach(b=>{ctx.fillRect(b.x-2,b.y,4,10);});
      st.enemies.forEach(e=>{ctx.fillStyle="#a78bfa";ctx.beginPath();ctx.ellipse(e.x,e.y,14,7,0,0,Math.PI*2);ctx.fill();ctx.fillStyle="#c4b5fd";ctx.beginPath();ctx.ellipse(e.x,e.y-5,7,5,0,0,Math.PI*2);ctx.fill();});
      ctx.fillStyle="#f472b6";ctx.beginPath();ctx.moveTo(st.player.x,st.player.y-16);ctx.lineTo(st.player.x-12,st.player.y+10);ctx.lineTo(st.player.x,st.player.y+4);ctx.lineTo(st.player.x+12,st.player.y+10);ctx.closePath();ctx.fill();
      anim.current=requestAnimationFrame(loop);
    };
    anim.current=requestAnimationFrame(loop);
    return()=>{cancelAnimationFrame(anim.current);window.removeEventListener("keydown",onKey);window.removeEventListener("keyup",onKey);};
  },[]);
  const restart=()=>{const st=state.current;st.player={x:180,y:340};st.bullets=[];st.enemies=[];st.particles=[];st.score=0;st.lives=3;st.frame=0;st.over=false;if(scoreDisp.current)scoreDisp.current.textContent=0;if(livesDisp.current)livesDisp.current.textContent="❤️❤️❤️";};
  return (
    <div style={{position:"fixed",inset:0,zIndex:200,background:"rgba(9,11,16,0.92)",display:"flex",alignItems:"center",justifyContent:"center"}}>
      <div style={{borderRadius:24,border:"1px solid rgba(244,114,182,0.25)",background:"#0d1117",overflow:"hidden"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"12px 16px",borderBottom:"1px solid rgba(255,255,255,0.07)"}}>
          <span style={{fontSize:13,color:"#f9a8d4",fontWeight:700,letterSpacing:"0.2em"}}>🚀 KEE'S SPACE SHOOTER</span>
          <div style={{display:"flex",gap:16,alignItems:"center"}}>
            <span style={{fontSize:13,color:"#fff"}}>Score: <b ref={scoreDisp}>0</b></span>
            <span ref={livesDisp} style={{fontSize:13}}>❤️❤️❤️</span>
            <button onClick={onClose} style={{background:"none",border:"none",color:"#9ca3af",fontSize:18,cursor:"pointer"}}>✕</button>
          </div>
        </div>
        <canvas ref={canvas} width={360} height={480} onClick={restart} style={{display:"block",touchAction:"none"}}/>
        <div style={{padding:"10px 16px",borderTop:"1px solid rgba(255,255,255,0.07)"}}>
          <span style={{fontSize:11,color:"rgba(255,255,255,0.35)"}}>← → to move · auto-fires · tap canvas to restart</span>
        </div>
      </div>
    </div>
  );
}

// ── Shared button styles ───────────────────────────────────
const btnPrimary = { display:"inline-flex", alignItems:"center", gap:8, borderRadius:999, background:"#f472b6", color:"#111827", border:"none", padding:"14px 24px", fontSize:14, fontWeight:700, cursor:"pointer" };
const btnSecondary = { display:"inline-flex", alignItems:"center", gap:8, borderRadius:999, border:"1px solid", background:"rgba(255,255,255,0.06)", padding:"14px 22px", fontSize:14, fontWeight:600, cursor:"pointer", backdropFilter:"blur(10px)" };

// ── Main Portfolio ─────────────────────────────────────────
export default function Portfolio() {
  const [loading,setLoading]=useState(true);
  const [verified,setVerified]=useState(false);
  const [dark,setDark]=useState(true);
  const [menuOpen,setMenuOpen]=useState(false);
  const [showGame,setShowGame]=useState(false);
  const [showToast,setShowToast]=useState(false);
  const [scrollY,setScrollY]=useState(0);
  const keySeq=useRef("");

  useEffect(()=>{const onScroll=()=>setScrollY(window.scrollY);window.addEventListener("scroll",onScroll,{passive:true});return()=>window.removeEventListener("scroll",onScroll);},[]);
  useEffect(()=>{const onKey=e=>{keySeq.current=(keySeq.current+e.key.toUpperCase()).slice(-3);if(keySeq.current==="KEE"){setShowGame(true);setShowToast(true);}};window.addEventListener("keydown",onKey);return()=>window.removeEventListener("keydown",onKey);},[]);

  const scrollTo=id=>{document.getElementById(id)?.scrollIntoView({behavior:"smooth"});setMenuOpen(false);};
  const progress=Math.min(scrollY/((typeof document!=="undefined"?document.body?.scrollHeight-window.innerHeight:1)||1),1);
  const t=dark?themes.dark:themes.light;

  if(loading)return <LoadingScreen onDone={()=>setLoading(false)}/>;
  if(!verified)return <TurnstileScreen onVerified={()=>setVerified(true)}/>;

  return (
    <div style={{...s.page,background:t.bg,color:t.text,cursor:"none"}}>
      <CustomCursor/>
      <ParticleCanvas dark={dark}/>
      {showToast&&<Toast onDone={()=>setShowToast(false)}/>}
      {showGame&&<SpaceGame onClose={()=>setShowGame(false)}/>}
      <div style={{...s.progressBar,width:`${progress*100}%`}}/>
      <div style={{...s.bgBase,background:t.bgBase}}/><div style={s.orbL}/><div style={s.orbR}/><div style={s.bgGlow}/><div style={{...s.bgGrid,opacity:dark?1:.4}}/>

      {/* Header */}
      <header style={{...s.header,background:t.headerBg,borderColor:t.border}}>
        <div style={s.headerInner}>
          <div style={s.brand}>
            <div style={s.logoCircle}>KC</div>
            <div>
              <div style={{display:"flex",alignItems:"center",gap:8}}>
                <p style={{...s.brandTop,color:t.text,margin:0}}>Keelie Cadby</p>
                <span style={{width:8,height:8,borderRadius:"50%",background:"#22c55e",display:"inline-block",animation:"pulse 1.8s ease-in-out infinite",flexShrink:0}}/>
              </div>
              <p style={{...s.brandSub,color:t.muted}}>Portfolio</p>
            </div>
          </div>
          <nav data-desktop-nav style={s.desktopNav}>{NAV.map(n=><button key={n.id} onClick={()=>scrollTo(n.id)} style={{...s.navBtn,color:t.navText}}>{n.label}</button>)}</nav>
          <button onClick={()=>setDark(d=>!d)} style={{...s.iconBtn,color:t.navText}} aria-label="Toggle light/dark mode">{dark?"☀️":"🌙"}</button>
          <button data-contact-top onClick={()=>scrollTo("contact")} style={s.contactBtnTop}>Contact Me</button>
          <button data-hamburger onClick={()=>setMenuOpen(o=>!o)} style={{...s.hamburger}} aria-label="Menu">
            <span style={{...s.bar,transform:menuOpen?"rotate(45deg) translateY(7px)":"none"}}/><span style={{...s.bar,opacity:menuOpen?0:1}}/><span style={{...s.bar,transform:menuOpen?"rotate(-45deg) translateY(-7px)":"none"}}/>
          </button>
        </div>
        {menuOpen&&<div style={{...s.mobileMenu,background:t.headerBg,borderColor:t.border}}>{NAV.map(n=><button key={n.id} onClick={()=>scrollTo(n.id)} style={{...s.mobileNavBtn,color:t.navText}}>{n.label}</button>)}</div>}
      </header>

      <main>
        {/* HERO */}
        <section id="home" style={s.hero}>
          <div className="hero-inner" style={s.heroInner}>
            <div style={s.heroLeft}>
              <img src={PHOTO_SRC} alt="Keelie Cadby" style={s.heroPhoto} onError={e=>{e.currentTarget.style.display="none";}}/>
              <OpportunityBadge/>
              <div style={s.heroTag}>Business Admin Apprentice · Birmingham, UK</div>
              <h1 style={{...s.heroTitle,color:t.heading}}>Hi, I'm Keelie — <TypingText/></h1>
              <p style={{...s.heroText,color:t.body}}>From RAF Air Cadets to a Business Admin Apprenticeship — driven, organised and building a professional future every single day.</p>
              <div className="hero-btns" style={s.heroBtns}>
                <a href="mailto:keecadby2405@gmail.com" style={{...btnPrimary,textDecoration:"none"}}>✉ Email Me</a>
                <a href={CV_SRC} download style={{...btnSecondary,borderColor:t.border,color:t.text,textDecoration:"none"}}>⬇ Download CV</a>
                <a href="https://www.linkedin.com/in/keelie-cadby-967321337/" target="_blank" rel="noreferrer" style={{...btnSecondary,borderColor:t.border,color:t.text,textDecoration:"none"}}>in LinkedIn</a>
              </div>
            </div>
            <div className="hero-cards" style={s.heroCards}>
              {[{label:"Current Role",val:"Apprentice Business Admin"},{label:"Organisation",val:"Auxilio Care Ltd"},{label:"RAF Cadets Rank",val:"Flight Sergeant"},{label:"Since",val:"2021"}].map((c,i)=>(
                <div key={i} style={i%2===1?s.statCardPink:{...s.statCard,background:t.card,borderColor:t.border}}>
                  <p style={s.statLabel}>{c.label}</p><p style={{...s.statVal,color:t.heading}}>{c.val}</p>
                </div>
              ))}
            </div>
          </div>
          <a href="#about" onClick={e=>{e.preventDefault();scrollTo("about");}} style={{...s.scrollPill,borderColor:t.border,color:t.muted}}>Scroll ↓</a>
        </section>

        {/* ABOUT */}
        <section id="about" style={{...s.section,borderColor:t.border}}>
          <div style={s.container}>
            <FadeIn><p style={s.eyebrow}>About Me</p><h2 style={{...s.secTitle,color:t.heading}}>My journey has shaped the person I'm becoming.</h2><p style={{...s.secText,color:t.body}}>I'm a highly organised Business Administration Apprentice at Auxilio Care, with hands-on experience in HR admin, compliance and diary management. I've learned to show up with discipline, pride, and ambition every single day — from progressing through the RAF Air Cadets to earning a competitive place on, and completing, an international exchange to the USA.</p></FadeIn>
            <div className="two-col" style={s.twoCol}>
              {[{t:"Where I Come From",p:"My background has built resilience, patience and self-respect. Everything I've faced has made me more determined and more capable. I've learned that growth takes effort — and I put that effort in every day."},{t:"Where I'm Going",p:"I'm passionate about cybersecurity, aviation and technology. I'm building the professional foundation now through my apprenticeship so I can move confidently towards a career I'm truly excited about.",pink:true}].map((c,i)=>(
                <FadeIn key={i} delay={i*.1}><div style={c.pink?s.cardPinkLg:{...s.cardGlassLg,background:t.card,borderColor:t.border}}><p style={{...s.eyebrow,color:c.pink?"rgba(255,232,242,.85)":undefined}}>{c.t}</p><p style={{...s.lgCopy,color:c.pink?"rgba(255,255,255,.92)":t.body}}>{c.p}</p></div></FadeIn>
              ))}
            </div>
            <FadeIn delay={0.1}><p style={{...s.eyebrow,marginTop:56}}>Education</p><div style={s.eduGrid}>{EDUCATION.map((e,i)=><div key={i} style={{...s.eduCard,background:t.card,borderColor:t.border}}><span style={s.eduYear}>{e.year}</span><div><p style={{...s.eduQual,color:t.heading}}>{e.qual}</p><p style={{...s.eduPlace,color:t.muted}}>{e.place}</p></div></div>)}</div></FadeIn>
          </div>
        </section>

        {/* EXPERIENCE */}
        <section id="experience" style={{...s.sectionAlt,borderColor:t.border,background:t.altBg}}>
          <div style={s.container}>
            <FadeIn><p style={s.eyebrow}>Experience</p><h2 style={{...s.secTitle,color:t.heading}}>Real work. Real growth. Real results.</h2><p style={{...s.secText,color:t.body}}>From voluntary work to a full apprenticeship — every role has added to my professional development.</p></FadeIn>
            <div style={s.expList}>{EXPERIENCE.map((ex,i)=>(
              <FadeIn key={i} delay={i*.08}><div style={{...s.expCard,background:t.expCard,borderColor:t.border}}>
                <div style={s.expHeader}><div><h3 style={{...s.expRole,color:t.heading}}>{ex.role}</h3><p style={s.expCompany}>{ex.company}</p></div><div style={s.expMeta}><span style={{...s.expPeriod,color:t.muted}}>{ex.period}</span><span style={s.expType}>{ex.type}</span></div></div>
                <ul style={s.expBullets}>{ex.bullets.map((b,j)=><li key={j} style={{...s.expBullet,color:t.body}}><span style={s.bulletDot}/>{b}</li>)}</ul>
                <div style={s.cardLine}/>
              </div></FadeIn>
            ))}</div>
          </div>
        </section>

        {/* TIMELINE */}
        <section id="timeline" style={{...s.section,borderColor:t.border}}>
          <div style={s.container}>
            <FadeIn><p style={s.eyebrow}>My Journey</p><h2 style={{...s.secTitle,color:t.heading}}>Every step has led me here.</h2><p style={{...s.secText,color:t.body}}>From my first volunteering role to an international exchange programme — here's the journey so far.</p></FadeIn>
            <Timeline t={t}/>
          </div>
        </section>

        {/* SKILLS */}
        <section id="skills" style={{...s.sectionAlt,borderColor:t.border,background:t.altBg}}>
          <div style={s.container}>
            <FadeIn><p style={s.eyebrow}>Skills</p><h2 style={{...s.secTitle,color:t.heading}}>The strengths I bring to every role.</h2><p style={{...s.secText,color:t.body}}>Developed through my apprenticeship, volunteering, RAF Cadets and lived experience.</p></FadeIn>
            <FadeIn delay={0.05}>
              <p style={{...s.eyebrow,marginTop:36}}>Top Skills</p>
              <div style={s.topSkillsGrid}>{TOP_SKILLS.map(sk=><div key={sk} style={s.topSkill}>{sk}</div>)}</div>
            </FadeIn>
            <div style={s.skillGroups}>{SKILL_GROUPS.map((g,i)=>(
              <FadeIn key={g.title} delay={i*.08}><div style={{...s.achCard,background:t.card,borderColor:t.border,height:"100%"}}>
                <h3 style={{...s.achTitle,color:t.heading}}>{g.title}</h3>
                <div style={{display:"flex",flexWrap:"wrap",gap:8,marginTop:14}}>{g.items.map(sk=><span key={sk} style={s.goalTag}>{sk}</span>)}</div>
              </div></FadeIn>
            ))}</div>
          </div>
        </section>

        {/* ACHIEVEMENTS */}
        <section id="achievements" style={{...s.section,borderColor:t.border}}>
          <div style={s.container}>
            <FadeIn><p style={s.eyebrow}>Achievements & Interests</p><h2 style={{...s.secTitle,color:t.heading}}>Beyond the job description.</h2><p style={{...s.secText,color:t.body}}>Military leadership, community volunteering, cybersecurity — each one shaping who I am.</p></FadeIn>
            <div style={s.achGrid}>{ACHIEVEMENTS.map((a,i)=><FadeIn key={i} delay={i*.06}><div style={{...s.achCard,background:t.card,borderColor:t.border}}><div style={s.achIcon}>{a.icon}</div><h3 style={{...s.achTitle,color:t.heading}}>{a.title}</h3><p style={{...s.achDesc,color:t.body}}>{a.desc}</p></div></FadeIn>)}</div>
          </div>
        </section>

        {/* TYPING CHALLENGE */}
        <section id="challenge" style={{...s.sectionAlt,borderColor:t.border,background:t.altBg}}>
          <div style={s.container}>
            <FadeIn><p style={s.eyebrow}>Admin Challenge</p><h2 style={{...s.secTitle,color:t.heading}}>Think you can keep up?</h2><p style={{...s.secText,color:t.body}}>Test your typing speed with real business admin sentences. Compete on the leaderboard!</p></FadeIn>
            <FadeIn delay={0.1}><div style={{...s.goalPanel,background:t.card,borderColor:t.border,marginTop:36}}><TypingChallenge t={t}/></div></FadeIn>
          </div>
        </section>

        {/* PASSION */}
        <section id="passion" style={{...s.section,borderColor:t.border}}>
          <div style={s.container}>
            <FadeIn>
              <p style={s.eyebrow}>My Purpose</p>
              <h2 style={{...s.secTitle,color:t.heading}}>Every young person deserves to feel seen, heard & supported.</h2>
              <p style={{...s.secText,color:t.body}}>This isn't just something I believe in — it's something I've lived.</p>
            </FadeIn>
            <FadeIn delay={0.1}>
              <div style={{...s.goalPanel,background:t.card,borderColor:t.border,marginTop:36}}>
                <div className="two-col" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:40,alignItems:"start"}}>
                  <div>
                    <p style={{margin:"0 0 20px",fontSize:18,lineHeight:2,color:t.body}}>
                      I grew up in care, and I know first-hand what it feels like to wonder if anyone believes in you. That experience didn't hold me back — it became my greatest motivation.
                    </p>
                    <p style={{margin:"0 0 20px",fontSize:18,lineHeight:2,color:t.body}}>
                      I am passionate about making sure every young person — no matter their background, their circumstances, or where they've come from — has someone in their corner pushing them to be the best version of themselves.
                    </p>
                    <p style={{margin:0,fontSize:18,lineHeight:2,color:t.body}}>
                      Every child deserves to feel seen. Every young person deserves to be heard. And every single one of them has the potential to achieve something incredible — they just need the right support to get there.
                    </p>
                  </div>
                  <div style={{display:"flex",flexDirection:"column",gap:16}}>
                    {[
                      { icon:"💜", title:"Our Voice Our Service (OVOS)", desc:"Since ~2017, I've been an active member of OVOS — chairing interview panels for social workers, speaking directly to council members to identify change needs in the community, and helping shape care services so young people feel genuinely seen and heard." },
                      { icon:"🎖️", title:"RAF Cadet Instructor", desc:"As a Flight Sergeant, I teach and mentor young cadets every week — giving them the same belief in themselves that I had to find on my own." },
                      { icon:"🌟", title:"Leading by Example", desc:"I want young people to look at my journey — from care to apprentice, Flight Sergeant, and international exchange — and know that their start does not define their future." },
                    ].map((card,i)=>(
                      <div key={i} style={{borderRadius:20,border:"1px solid",borderColor:"rgba(244,114,182,0.25)",background:"rgba(244,114,182,0.08)",padding:"20px 22px"}}>
                        <div style={{fontSize:22,marginBottom:8}}>{card.icon}</div>
                        <h3 style={{margin:"0 0 8px",fontSize:15,fontWeight:700,color:t.heading}}>{card.title}</h3>
                        <p style={{margin:0,fontSize:14,lineHeight:1.8,color:t.body}}>{card.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div style={{marginTop:36,padding:"24px",borderRadius:18,border:"1px solid rgba(244,114,182,0.3)",background:"rgba(244,114,182,0.06)",textAlign:"center"}}>
                  <p style={{margin:0,fontSize:20,lineHeight:1.8,fontWeight:600,color:"#f472b6",fontStyle:"italic"}}>
                    "Your background is not a barrier — it's your foundation. I'm proof of that, and I want to spend my life making sure others know it too."
                  </p>
                  <p style={{margin:"12px 0 0",fontSize:13,color:t.muted}}>— Keelie Cadby</p>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* GOALS */}
        <section id="goals" style={{...s.sectionGoals,borderColor:t.border}}>
          <div style={s.container}>
            <FadeIn><p style={s.eyebrow}>My Goals</p><h2 style={{...s.secTitle,color:t.heading}}>Focused on creating a future I can be proud of.</h2></FadeIn>
            <FadeIn delay={0.1}><div style={{...s.goalPanel,background:t.card,borderColor:t.border}}><p style={{...s.goalText,color:t.body}}>My goal is to build a successful and stable career — ideally in cybersecurity, aviation or technology. I'm laying the groundwork now through my Business Admin Apprenticeship, developing the professional skills, qualifications and mindset I need to progress. I want to be someone who is confident, capable and respected — and I'm committed to putting in the work every day to get there.</p><div style={s.goalTags}>{["Cybersecurity","Aviation","Technology","Leadership","Professionalism","Continuous Learning"].map(t2=><span key={t2} style={s.goalTag}>{t2}</span>)}</div></div></FadeIn>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" style={{...s.section,borderColor:t.border}}>
          <div style={s.container}>
            <FadeIn><div style={{...s.contactPanel,background:t.card,borderColor:t.border}}>
              <div className="contact-grid" style={s.contactGrid}>
                <div>
                  <p style={s.eyebrow}>Get In Touch</p>
                  <h2 style={{...s.secTitle,color:t.heading}}>Ready for new opportunities & connections.</h2>
                  <p style={{...s.secText,color:t.body}}>Whether it's a new opportunity or just a conversation — I'd love to hear from you.</p>
                  <div style={s.contactInfo}>
                    <p style={{...s.contactLine,color:t.body}}>📍 Birmingham, United Kingdom</p>
                    <p style={{...s.contactLine,color:t.body}}>📞 07391 025873</p>
                    <p style={{...s.contactLine,color:t.body}}>✉ keecadby2405@gmail.com</p>
                  </div>
                </div>
                <div style={s.contactBtns}>
                  <a href="mailto:keecadby2405@gmail.com" style={{...btnPrimary,textDecoration:"none"}}>✉ Email Me</a>
                  <a href="https://www.linkedin.com/in/keelie-cadby-967321337/" target="_blank" rel="noreferrer" style={{...btnSecondary,borderColor:t.border,color:t.text,textDecoration:"none"}}>in LinkedIn</a>
                  <a href={CV_SRC} download style={{...btnSecondary,borderColor:t.border,color:t.text,textDecoration:"none"}}>⬇ Download CV</a>
                  <a href="tel:07391025873" style={{...btnSecondary,borderColor:t.border,color:t.text,textDecoration:"none"}}>📞 Call Me</a>
                </div>
              </div>
            </div></FadeIn>
          </div>
        </section>
      </main>

      <footer style={{...s.footer,borderColor:t.border}}>
        <p style={{...s.footerText,color:t.muted}}>© {new Date().getFullYear()} Keelie Cadby · Built with pride</p>
        <p style={{...s.footerText,color:t.muted,marginTop:6,fontSize:12}}>🔑 There's a hidden easter egg on this page — can you find it?</p>
      </footer>
    </div>
  );
}

const themes = {
  dark:{ bg:"#0d1117",bgBase:"linear-gradient(to bottom,#090b10,#0d1117,#11151d)",text:"#fff",heading:"#f8e7f1",body:"rgba(255,255,255,0.78)",muted:"rgba(255,255,255,0.4)",navText:"#d1d5db",border:"rgba(255,255,255,0.09)",card:"rgba(255,255,255,0.05)",altBg:"rgba(255,255,255,0.025)",expCard:"rgba(19,26,35,0.90)",headerBg:"rgba(13,17,23,0.75)" },
  light:{ bg:"#f8f4f7",bgBase:"linear-gradient(to bottom,#fdf2f8,#f8f4f7,#f3e8f0)",text:"#1a1a2e",heading:"#2d1b3d",body:"rgba(30,20,40,0.78)",muted:"rgba(30,20,40,0.45)",navText:"#4b3060",border:"rgba(200,150,200,0.2)",card:"rgba(255,255,255,0.75)",altBg:"rgba(244,114,182,0.04)",expCard:"rgba(255,255,255,0.85)",headerBg:"rgba(248,244,247,0.85)" },
};

const pink="#f472b6",pd="rgba(244,114,182,";
const s={
  page:{minHeight:"100dvh",fontFamily:"Inter,system-ui,sans-serif",overflowX:"hidden",WebkitFontSmoothing:"antialiased",transition:"background .3s,color .3s"},
  progressBar:{position:"fixed",top:0,left:0,height:3,background:pink,zIndex:100,transition:"width .1s linear"},
  bgBase:{position:"fixed",inset:0,zIndex:-20},
  orbL:{position:"fixed",left:-80,top:0,zIndex:-10,width:400,height:400,borderRadius:"50%",background:pd+"0.12)",filter:"blur(80px)"},
  orbR:{position:"fixed",right:-80,top:320,zIndex:-10,width:440,height:440,borderRadius:"50%",background:"rgba(217,70,239,0.09)",filter:"blur(80px)"},
  bgGlow:{position:"fixed",inset:0,zIndex:-10,background:`radial-gradient(circle at top,${pd}0.10),transparent 28%)`},
  bgGrid:{position:"fixed",inset:0,zIndex:-10,pointerEvents:"none",backgroundImage:"linear-gradient(rgba(244,114,182,0.06) 1px,transparent 1px),linear-gradient(90deg,rgba(244,114,182,0.06) 1px,transparent 1px)",backgroundSize:"60px 60px",maskImage:"radial-gradient(circle at center,black,transparent 88%)"},
  header:{position:"sticky",top:0,zIndex:50,borderBottom:"1px solid",backdropFilter:"blur(20px)",WebkitBackdropFilter:"blur(20px)",transition:"background .3s"},
  headerInner:{maxWidth:1280,margin:"0 auto",padding:"14px 20px",display:"flex",alignItems:"center",justifyContent:"space-between",gap:12},
  brand:{display:"flex",alignItems:"center",gap:10,flexShrink:0},
  logoCircle:{width:40,height:40,borderRadius:"50%",border:`1px solid ${pd}0.35)`,background:pd+"0.12)",color:"#f9a8d4",display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,fontWeight:700},
  brandTop:{margin:0,fontSize:14,fontWeight:600},
  brandSub:{margin:"2px 0 0",fontSize:11,letterSpacing:"0.3em",textTransform:"uppercase"},
  desktopNav:{display:"flex",gap:2,alignItems:"center",flex:1,justifyContent:"center"},
  navBtn:{background:"none",border:"none",fontSize:13,cursor:"pointer",padding:"6px 10px",borderRadius:8,fontFamily:"inherit"},
  iconBtn:{background:"none",border:"none",fontSize:18,cursor:"pointer",padding:"6px 8px",flexShrink:0},
  contactBtnTop:{display:"inline-flex",alignItems:"center",borderRadius:999,background:pink,color:"#0f172a",textDecoration:"none",padding:"10px 18px",fontSize:13,fontWeight:700,flexShrink:0,whiteSpace:"nowrap"},
  hamburger:{display:"none",flexDirection:"column",gap:5,background:"none",border:"none",cursor:"pointer",padding:6},
  bar:{display:"block",width:22,height:2,background:"#fff",borderRadius:2,transition:"all .25s"},
  mobileMenu:{display:"flex",flexDirection:"column",borderTop:"1px solid",padding:"8px 0"},
  mobileNavBtn:{background:"none",border:"none",fontSize:15,cursor:"pointer",padding:"12px 24px",fontFamily:"inherit",textAlign:"left"},
  hero:{position:"relative",minHeight:"100dvh",display:"flex",flexDirection:"column",justifyContent:"center",padding:"80px 20px 60px"},
  heroInner:{maxWidth:1280,margin:"0 auto",width:"100%",display:"grid",gridTemplateColumns:"1fr 1fr",gap:40,alignItems:"center"},
  heroLeft:{display:"flex",flexDirection:"column",gap:16},
  heroTag:{display:"inline-flex",alignSelf:"flex-start",borderRadius:999,border:`1px solid ${pd}0.22)`,background:pd+"0.10)",color:"rgba(251,207,232,0.9)",padding:"8px 16px",fontSize:12,textTransform:"uppercase",letterSpacing:"0.3em"},
  heroTitle:{margin:0,fontSize:"clamp(1.8rem,4vw,3.2rem)",fontWeight:700,lineHeight:1.1,letterSpacing:"-0.03em"},
  heroText:{margin:0,fontSize:16,lineHeight:1.8,maxWidth:560},
  heroBtns:{display:"flex",flexWrap:"wrap",gap:12},
  heroCards:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14},
  statCard:{borderRadius:20,border:"1px solid",padding:20,backdropFilter:"blur(16px)",transition:"background .3s"},
  statCardPink:{borderRadius:20,border:`1px solid ${pd}0.22)`,background:pd+"0.11)",padding:20},
  statLabel:{margin:0,fontSize:11,textTransform:"uppercase",letterSpacing:"0.3em",color:"rgba(251,207,232,0.7)"},
  statVal:{margin:"8px 0 0",fontSize:16,fontWeight:700,lineHeight:1.3},
  scrollPill:{alignSelf:"center",marginTop:48,display:"inline-flex",alignItems:"center",gap:8,borderRadius:999,border:"1px solid",padding:"9px 16px",fontSize:12,textTransform:"uppercase",letterSpacing:"0.25em",textDecoration:"none"},
  section:{padding:"72px 20px",borderTop:"1px solid"},
  sectionAlt:{padding:"72px 20px",borderTop:"1px solid"},
  sectionGoals:{padding:"72px 20px",borderTop:"1px solid",background:`radial-gradient(circle at top right,${pd}0.10),transparent 32%)`},
  container:{maxWidth:1200,margin:"0 auto"},
  eyebrow:{margin:0,fontSize:11,textTransform:"uppercase",letterSpacing:"0.38em",color:"rgba(251,207,232,0.8)"},
  secTitle:{margin:"14px 0 0",fontSize:"clamp(1.8rem,4vw,2.7rem)",fontWeight:700,letterSpacing:"-0.03em",lineHeight:1.1},
  secText:{marginTop:16,fontSize:16,lineHeight:1.8,maxWidth:760},
  lgCopy:{marginTop:16,fontSize:17,lineHeight:1.9},
  twoCol:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:20,marginTop:36},
  cardGlassLg:{borderRadius:24,border:"1px solid",padding:28,backdropFilter:"blur(16px)",height:"100%",transition:"background .3s"},
  cardPinkLg:{borderRadius:24,border:`1px solid ${pd}0.22)`,background:pd+"0.11)",padding:28,backdropFilter:"blur(16px)",height:"100%"},
  eduGrid:{display:"flex",flexDirection:"column",gap:14,marginTop:20},
  eduCard:{display:"flex",gap:20,alignItems:"flex-start",borderRadius:18,border:"1px solid",padding:"18px 22px",transition:"background .3s"},
  eduYear:{fontSize:13,fontWeight:700,color:pink,minWidth:38,paddingTop:2},
  eduQual:{margin:0,fontSize:14,fontWeight:600,lineHeight:1.5},
  eduPlace:{margin:"4px 0 0",fontSize:13},
  expList:{display:"flex",flexDirection:"column",gap:24,marginTop:36},
  expCard:{borderRadius:24,border:"1px solid",padding:"28px 28px 24px",backdropFilter:"blur(16px)",transition:"background .3s"},
  expHeader:{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:16,flexWrap:"wrap"},
  expRole:{margin:0,fontSize:21,fontWeight:700},
  expCompany:{margin:"4px 0 0",fontSize:15,color:pink,fontWeight:600},
  expMeta:{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:6},
  expPeriod:{fontSize:13,whiteSpace:"nowrap"},
  expType:{fontSize:11,textTransform:"uppercase",letterSpacing:"0.25em",color:"rgba(251,207,232,0.6)"},
  expBullets:{margin:"18px 0 0",padding:0,listStyle:"none",display:"flex",flexDirection:"column",gap:10},
  expBullet:{display:"flex",gap:12,alignItems:"flex-start",fontSize:15,lineHeight:1.7},
  bulletDot:{display:"block",width:6,height:6,borderRadius:"50%",background:pink,flexShrink:0,marginTop:8},
  cardLine:{marginTop:24,height:1,background:`linear-gradient(to right,${pd}0.45),${pd}0.12),transparent)`},
  heroPhoto:{width:120,height:120,borderRadius:"50%",objectFit:"cover",border:`3px solid ${pd}0.55)`,boxShadow:`0 0 32px ${pd}0.30)`},
  topSkillsGrid:{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(180px,1fr))",gap:14,marginTop:16},
  topSkill:{borderRadius:16,border:`1px solid ${pd}0.35)`,background:pd+"0.16)",padding:"16px 12px",textAlign:"center",fontSize:15,fontWeight:700,color:"#fce7f3"},
  skillGroups:{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))",gap:20,marginTop:28},
  skillBox:{borderRadius:16,border:`1px solid ${pd}0.16)`,background:pd+"0.09)",padding:"14px 12px",textAlign:"center",fontSize:14,fontWeight:500,color:"#fce7f3",backdropFilter:"blur(12px)"},
  achGrid:{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))",gap:20,marginTop:36},
  achCard:{borderRadius:22,border:"1px solid",padding:24,backdropFilter:"blur(14px)",transition:"background .3s"},
  achIcon:{fontSize:28,marginBottom:12},
  achTitle:{margin:0,fontSize:16,fontWeight:700,lineHeight:1.3},
  achDesc:{margin:"10px 0 0",fontSize:14,lineHeight:1.8},
  goalPanel:{marginTop:36,borderRadius:28,border:"1px solid",padding:40,backdropFilter:"blur(20px)",transition:"background .3s"},
  goalText:{margin:0,fontSize:18,lineHeight:2,maxWidth:900},
  goalTags:{display:"flex",flexWrap:"wrap",gap:10,marginTop:28},
  goalTag:{borderRadius:999,border:`1px solid ${pd}0.24)`,background:pd+"0.12)",color:"#fce7f3",padding:"8px 16px",fontSize:13,fontWeight:500},
  contactPanel:{borderRadius:26,border:"1px solid",padding:40,backdropFilter:"blur(18px)",transition:"background .3s"},
  contactGrid:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:40,alignItems:"start"},
  contactInfo:{marginTop:24,display:"flex",flexDirection:"column",gap:10},
  contactLine:{margin:0,fontSize:15},
  contactBtns:{display:"flex",flexDirection:"column",gap:14,paddingTop:8},
  footer:{borderTop:"1px solid",padding:"24px 20px",textAlign:"center"},
  footerText:{margin:0,fontSize:13},
};

if(typeof document!=="undefined"&&!document.getElementById("kc-styles")){
  const tag=document.createElement("style");tag.id="kc-styles";
  tag.textContent=`*{box-sizing:border-box}body{margin:0;cursor:none}@media(hover:none){body,body *{cursor:auto!important}}@media(max-width:1100px){[data-desktop-nav]{display:none!important}[data-hamburger]{display:flex!important}}@media(max-width:900px){.hero-inner,.two-col,.contact-grid{grid-template-columns:1fr!important}.tl-line{left:8px!important}.tl-row{justify-content:flex-start!important}.tl-item{width:100%!important;padding:0 0 0 32px!important;text-align:left!important}.tl-dot{display:none}}@media(max-width:640px){[data-contact-top]{display:none!important}.hero-btns{flex-direction:column}.hero-btns a{justify-content:center}.hero-cards{grid-template-columns:1fr 1fr!important}}`;
  document.head.appendChild(tag);
}
