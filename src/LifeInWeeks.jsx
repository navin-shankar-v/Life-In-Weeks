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

  const years = useMemo(() => {
    const y = [];
    for (let i = 0; i < 100; i++) y.push(i);
    return y;
  }, []);

  const [hoveredWeek, setHoveredWeek] = useState(null);

  const getWeekDate = (weekNum) => {
    const d = new Date(birth.getTime() + weekNum * msPerWeek);
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  };

  const getColor = (globalWeek) => {
    if (globalWeek < livedWeeks) return "#3b82f6";
    if (globalWeek === livedWeeks) return "#f59e0b";
    return "#e5e7eb";
  };

  return (
    <div style={{ background: "#111", color: "#fff", minHeight: "100vh", padding: "20px", fontFamily: "system-ui" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 4 }}>Your Life in Weeks</h1>
        <div style={{ marginBottom: 12 }}>
          <label htmlFor="birth-date" style={{ display: "block", fontSize: 14, color: "#9ca3af", marginBottom: 4 }}>
            Birth date
          </label>
          <input
            id="birth-date"
            type="date"
            value={birthInput}
            onChange={(e) => setBirthInput(e.target.value)}
            style={{
              padding: "8px 12px",
              fontSize: 14,
              borderRadius: 6,
              border: "1px solid #374151",
              background: "#1f2937",
              color: "#fff",
              cursor: "pointer"
            }}
          />
        </div>
        <p style={{ color: "#9ca3af", marginBottom: 4, fontSize: 14 }}>
          Born: {birth.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })} → {end.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })} <br /> 100 years from the day you were born.
        </p>
        <div style={{ display: "flex", gap: 16, marginBottom: 16, fontSize: 13 }}>
          <span><span style={{ color: "#3b82f6" }}>■</span> Lived: <strong>{livedWeeks.toLocaleString()}</strong> weeks</span>
          <span><span style={{ color: "#f59e0b" }}>■</span> This week</span>
          <span><span style={{ color: "#e5e7eb" }}>■</span> Remaining: <strong>{(totalWeeks - livedWeeks).toLocaleString()}</strong> weeks</span>
        </div>
        <p style={{ color: "#9ca3af", fontSize: 13, marginBottom: 12 }}>
          Total: <strong style={{ color: "#fff" }}>{totalWeeks.toLocaleString()}</strong> weeks in 100 years
          {hoveredWeek !== null && (
            <span style={{ color: "#f59e0b", marginLeft: 12 }}>
              Week {hoveredWeek + 1} — {getWeekDate(hoveredWeek)}
            </span>
          )}
        </p>
        <div style={{ fontSize: 0 }}>
          {years.map((yr) => {
            const startWeek = yr * 52;
            return (
              <div key={yr} style={{ display: "flex", alignItems: "center", marginBottom: 1 }}>
                <span style={{
                  fontSize: 9, color: "#6b7280", width: 24, textAlign: "right",
                  marginRight: 4, display: "inline-block"
                }}>
                  {yr % 5 === 0 ? yr : ""}
                </span>
                {Array.from({ length: 52 }, (_, w) => {
                  const gw = startWeek + w;
                  return (
                    <span
                      key={w}
                      onMouseEnter={() => setHoveredWeek(gw)}
                      onMouseLeave={() => setHoveredWeek(null)}
                      style={{
                        display: "inline-block",
                        width: 7, height: 7, margin: "0.5px",
                        borderRadius: 1,
                        background: getColor(gw),
                        cursor: "pointer",
                        opacity: hoveredWeek === gw ? 1 : 0.85,
                        transform: hoveredWeek === gw ? "scale(1.5)" : "none",
                        transition: "transform 0.1s"
                      }}
                    />
                  );
                })}
              </div>
            );
          })}
        </div>
        <p style={{ color: "#6b7280", fontSize: 11, marginTop: 12 }}>
          Each row = 1 year (52 weeks). Hover over any dot to see the date.
        </p>
      </div>
    </div>
  );
}
