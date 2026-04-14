import { useState, useMemo } from "react";

export default function LifeInWeeks() {
  const [birthInput, setBirthInput] = useState("2000-02-17");
  const birth = useMemo(() => new Date(birthInput + "T00:00:00"), [birthInput]);
  const end = useMemo(() => {
    const e = new Date(birth);
    e.setFullYear(e.getFullYear() + 100);
    return e;
  }, [birth]);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const msPerWeek = 7 * 24 * 60 * 60 * 1000;
  const totalWeeks = Math.floor((end - birth) / msPerWeek);
  const livedWeeks = Math.floor((today - birth) / msPerWeek);
  const remainingWeeks = totalWeeks - livedWeeks;
  const pctLived = Math.min(100, (livedWeeks / totalWeeks) * 100).toFixed(1);

  const years = useMemo(() => {
    const y = [];
    for (let i = 0; i < 100; i++) y.push(i);
    return y;
  }, []);

  const [hoveredWeek, setHoveredWeek] = useState(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  const getWeekDate = (weekNum) => {
    const d = new Date(birth.getTime() + weekNum * msPerWeek);
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  };

  const getWeekAge = (weekNum) => {
    const yr = Math.floor(weekNum / 52);
    const wk = weekNum % 52;
    return wk === 0 ? `Age ${yr}` : `Age ${yr}, week ${wk}`;
  };

  const getColor = (globalWeek) => {
    if (globalWeek < livedWeeks) return "#3b82f6";
    if (globalWeek === livedWeeks) return "#f59e0b";
    return "#e5e7eb";
  };

  const handleMouseEnter = (gw, e) => {
    setHoveredWeek(gw);
    setTooltipPos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e) => {
    if (hoveredWeek !== null) setTooltipPos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseLeave = () => setHoveredWeek(null);

  return (
    <div
      onMouseMove={handleMouseMove}
      style={{
        background: "linear-gradient(160deg, #0d0d14 0%, #111827 60%, #0d1117 100%)",
        color: "#fff",
        minHeight: "100vh",
        padding: "40px 20px 60px",
        fontFamily: "'Inter', system-ui, sans-serif",
      }}
    >
      <div style={{ maxWidth: 860, margin: "0 auto" }}>

        {/* Header */}
        <div style={{ marginBottom: 32 }}>
          <h1 style={{
            fontSize: 36,
            fontWeight: 800,
            margin: "0 0 6px",
            background: "linear-gradient(90deg, #60a5fa, #a78bfa)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            letterSpacing: "-0.5px",
          }}>
            Your Life in Weeks
          </h1>
          <p style={{ color: "#6b7280", fontSize: 14, margin: 0 }}>
            Every dot is one week. Every row is one year.
          </p>
        </div>

        {/* Birth date input */}
        <div style={{ marginBottom: 28 }}>
          <label htmlFor="birth-date" style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#6b7280", marginBottom: 6, letterSpacing: "0.08em", textTransform: "uppercase" }}>
            Date of birth
          </label>
          <input
            id="birth-date"
            type="date"
            value={birthInput}
            onChange={(e) => setBirthInput(e.target.value)}
            style={{
              padding: "10px 14px",
              fontSize: 15,
              borderRadius: 8,
              border: "1px solid #2d3748",
              background: "#1a2035",
              color: "#e2e8f0",
              cursor: "pointer",
              outline: "none",
              boxShadow: "0 0 0 0px #60a5fa",
              transition: "border-color 0.2s, box-shadow 0.2s",
            }}
            onFocus={(e) => {
              e.target.style.borderColor = "#60a5fa";
              e.target.style.boxShadow = "0 0 0 3px rgba(96,165,250,0.15)";
            }}
            onBlur={(e) => {
              e.target.style.borderColor = "#2d3748";
              e.target.style.boxShadow = "0 0 0 0px #60a5fa";
            }}
          />
          <span style={{ color: "#4b5563", fontSize: 13, marginLeft: 12 }}>
            {birth.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
            {" "}—{" "}
            {end.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
          </span>
        </div>

        {/* Stats cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 20 }}>
          <div style={{ background: "rgba(59,130,246,0.1)", border: "1px solid rgba(59,130,246,0.25)", borderRadius: 10, padding: "14px 16px" }}>
            <div style={{ fontSize: 11, color: "#60a5fa", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 6 }}>Weeks Lived</div>
            <div style={{ fontSize: 28, fontWeight: 700, color: "#93c5fd", lineHeight: 1 }}>{livedWeeks.toLocaleString()}</div>
            <div style={{ fontSize: 12, color: "#4b5563", marginTop: 4 }}>{Math.floor(livedWeeks / 52)} years, {livedWeeks % 52} weeks</div>
          </div>
          <div style={{ background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.3)", borderRadius: 10, padding: "14px 16px" }}>
            <div style={{ fontSize: 11, color: "#fbbf24", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 6 }}>Current Week</div>
            <div style={{ fontSize: 28, fontWeight: 700, color: "#fcd34d", lineHeight: 1 }}>#{(livedWeeks + 1).toLocaleString()}</div>
            <div style={{ fontSize: 12, color: "#4b5563", marginTop: 4 }}>{getWeekDate(livedWeeks)}</div>
          </div>
          <div style={{ background: "rgba(229,231,235,0.05)", border: "1px solid rgba(229,231,235,0.12)", borderRadius: 10, padding: "14px 16px" }}>
            <div style={{ fontSize: 11, color: "#9ca3af", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 6 }}>Weeks Remaining</div>
            <div style={{ fontSize: 28, fontWeight: 700, color: "#d1d5db", lineHeight: 1 }}>{remainingWeeks.toLocaleString()}</div>
            <div style={{ fontSize: 12, color: "#4b5563", marginTop: 4 }}>{Math.floor(remainingWeeks / 52)} years, {remainingWeeks % 52} weeks</div>
          </div>
        </div>

        {/* Progress bar */}
        <div style={{ marginBottom: 28 }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#6b7280", marginBottom: 6 }}>
            <span>Life progress</span>
            <span style={{ color: "#60a5fa", fontWeight: 600 }}>{pctLived}%</span>
          </div>
          <div style={{ height: 6, background: "rgba(255,255,255,0.07)", borderRadius: 99, overflow: "hidden" }}>
            <div style={{
              height: "100%",
              width: `${pctLived}%`,
              background: "linear-gradient(90deg, #3b82f6, #a78bfa)",
              borderRadius: 99,
              transition: "width 0.4s ease",
            }} />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "#374151", marginTop: 4 }}>
            <span>{birth.getFullYear()}</span>
            <span>{end.getFullYear()}</span>
          </div>
        </div>

        {/* Grid */}
        <div style={{ fontSize: 0, lineHeight: 0 }}>
          {years.map((yr) => {
            const startWeek = yr * 52;
            const isDecade = yr % 10 === 0;
            return (
              <div key={yr} style={{ display: "flex", alignItems: "center", marginBottom: isDecade && yr > 0 ? 3 : 1 }}>
                <span style={{
                  fontSize: 9,
                  fontWeight: isDecade ? 700 : 400,
                  color: isDecade ? "#6b7280" : "#374151",
                  width: 24,
                  textAlign: "right",
                  marginRight: 6,
                  display: "inline-block",
                  letterSpacing: 0,
                  lineHeight: 1,
                }}>
                  {yr % 5 === 0 ? yr : ""}
                </span>
                {Array.from({ length: 52 }, (_, w) => {
                  const gw = startWeek + w;
                  const isHovered = hoveredWeek === gw;
                  const color = getColor(gw);
                  return (
                    <span
                      key={w}
                      onMouseEnter={(e) => handleMouseEnter(gw, e)}
                      onMouseLeave={handleMouseLeave}
                      style={{
                        display: "inline-block",
                        width: 8,
                        height: 8,
                        margin: "0.75px",
                        borderRadius: "50%",
                        background: color,
                        cursor: "crosshair",
                        opacity: isHovered ? 1 : gw < livedWeeks ? 0.7 : 0.45,
                        transform: isHovered ? "scale(1.6)" : "scale(1)",
                        boxShadow: isHovered
                          ? gw === livedWeeks
                            ? "0 0 6px 2px rgba(245,158,11,0.7)"
                            : gw < livedWeeks
                            ? "0 0 6px 2px rgba(59,130,246,0.6)"
                            : "0 0 4px 1px rgba(229,231,235,0.3)"
                          : "none",
                        transition: "transform 0.1s ease, opacity 0.1s ease, box-shadow 0.1s ease",
                      }}
                    />
                  );
                })}
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div style={{ display: "flex", gap: 20, marginTop: 18, fontSize: 12, color: "#6b7280", flexWrap: "wrap" }}>
          <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#3b82f6", display: "inline-block", opacity: 0.8 }} />
            Lived
          </span>
          <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#f59e0b", display: "inline-block" }} />
            This week
          </span>
          <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#e5e7eb", display: "inline-block", opacity: 0.4 }} />
            Remaining
          </span>
          <span style={{ color: "#374151", marginLeft: "auto", fontSize: 11 }}>
            {totalWeeks.toLocaleString()} total weeks
          </span>
        </div>
      </div>

      {/* Floating tooltip */}
      {hoveredWeek !== null && (
        <div style={{
          position: "fixed",
          left: tooltipPos.x + 14,
          top: tooltipPos.y - 44,
          background: "#1e293b",
          border: "1px solid #334155",
          borderRadius: 8,
          padding: "7px 12px",
          fontSize: 12,
          color: "#e2e8f0",
          pointerEvents: "none",
          zIndex: 1000,
          boxShadow: "0 4px 20px rgba(0,0,0,0.5)",
          whiteSpace: "nowrap",
        }}>
          <div style={{ fontWeight: 600, color: hoveredWeek === livedWeeks ? "#fbbf24" : hoveredWeek < livedWeeks ? "#60a5fa" : "#9ca3af" }}>
            {getWeekAge(hoveredWeek)}
          </div>
          <div style={{ color: "#64748b", marginTop: 2 }}>{getWeekDate(hoveredWeek)}</div>
        </div>
      )}
    </div>
  );
}
