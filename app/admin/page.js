"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAdmin } from "@/context/AdminContext";

const GOLD = "#8B6914";
const DARK = "#2C1810";
const MID = "#5C3D2E";
const CARD_BG = "rgba(255,255,255,0.92)";
const CARD_BORDER = "rgba(139,105,20,0.2)";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { login, isAdminLoggedIn } = useAdmin();
  const router = useRouter();

  useEffect(() => {
    if (isAdminLoggedIn) router.push("/admin/dashboard");
  }, [isAdminLoggedIn, router]);

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please enter email and password.");
      return;
    }
    setLoading(true);
    const success = await login(email, password);
    setLoading(false);
    if (success) router.push("/admin/dashboard");
  };

  const inputStyle = {
    width: "100%",
    background: "rgba(255,255,255,0.95)",
    border: `1px solid ${CARD_BORDER}`,
    borderRadius: "10px", padding: "12px 16px",
    color: DARK, fontSize: "14px",
    fontFamily: "'Outfit', sans-serif",
    outline: "none", transition: "all 0.3s",
    marginBottom: "14px",
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex", alignItems: "center",
      justifyContent: "center", padding: "20px",
      fontFamily: "'Outfit', sans-serif",
    }}>
      <div style={{
        background: CARD_BG,
        border: `1px solid ${CARD_BORDER}`,
        borderRadius: "20px", padding: "40px",
        width: "100%", maxWidth: "400px",
        boxShadow: "0 8px 40px rgba(139,105,20,0.15)",
      }}>
        <div style={{ textAlign: "center", marginBottom: "28px" }}>
          <div style={{
            width: "56px", height: "56px",
            background: `linear-gradient(135deg, ${GOLD}, #6B5010)`,
            borderRadius: "14px",
            display: "flex", alignItems: "center",
            justifyContent: "center",
            fontFamily: "'Bebas Neue', cursive",
            fontSize: "22px", color: "white",
            margin: "0 auto 12px",
            boxShadow: "0 4px 20px rgba(139,105,20,0.35)",
          }}>
            MP
          </div>
          <h1 style={{
            fontFamily: "'Bebas Neue', cursive",
            fontSize: "28px", letterSpacing: "3px",
            color: DARK, marginBottom: "4px",
          }}>
            MANU<span style={{ color: GOLD }}>PRINTS</span>
          </h1>
          <p style={{
            color: MID, fontSize: "13px",
            fontFamily: "'Outfit', sans-serif",
          }}>
            Admin Portal
          </p>
        </div>

        <label style={{
          color: MID, fontSize: "11px", fontWeight: "700",
          letterSpacing: "1px", textTransform: "uppercase",
          display: "block", marginBottom: "6px",
          fontFamily: "'Outfit', sans-serif",
        }}>
          Email Address
        </label>
        <input
          type="email"
          placeholder="admin@manuprints.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={inputStyle}
          onFocus={(e) => { e.target.style.borderColor = GOLD; }}
          onBlur={(e) => { e.target.style.borderColor = CARD_BORDER; }}
          onKeyDown={(e) => e.key === "Enter" && handleLogin()}
        />

        <label style={{
          color: MID, fontSize: "11px", fontWeight: "700",
          letterSpacing: "1px", textTransform: "uppercase",
          display: "block", marginBottom: "6px",
          fontFamily: "'Outfit', sans-serif",
        }}>
          Password
        </label>
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={inputStyle}
          onFocus={(e) => { e.target.style.borderColor = GOLD; }}
          onBlur={(e) => { e.target.style.borderColor = CARD_BORDER; }}
          onKeyDown={(e) => e.key === "Enter" && handleLogin()}
        />

        <button
          onClick={handleLogin}
          disabled={loading}
          style={{
            width: "100%",
            background: loading
              ? "rgba(139,105,20,0.5)"
              : `linear-gradient(135deg, ${GOLD}, #6B5010)`,
            color: "white", border: "none",
            borderRadius: "10px", padding: "13px",
            fontFamily: "'Outfit', sans-serif",
            fontWeight: "700", fontSize: "14px",
            cursor: loading ? "not-allowed" : "pointer",
            transition: "all 0.3s",
            boxShadow: "0 4px 16px rgba(139,105,20,0.35)",
            marginTop: "4px",
          }}
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>

        <p style={{
          textAlign: "center", marginTop: "20px",
          color: MID, fontSize: "12px",
          fontFamily: "'Outfit', sans-serif",
        }}>
          Manuprints Admin Portal — Authorized Access Only
        </p>
      </div>
    </div>
  );
}