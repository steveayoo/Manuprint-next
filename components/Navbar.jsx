"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAdmin } from "@/context/AdminContext";

const GOLD = "#8B6914";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { isAdminLoggedIn } = useAdmin();

  useEffect(() => { setMenuOpen(false); }, [pathname]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "Products", path: "/products" },
    { name: "Contact", path: "/contact" },
  ];

  const isActive = (path) => pathname === path;

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
      background: scrolled ? "rgba(44,24,16,0.97)" : "rgba(44,24,16,0.88)",
      backdropFilter: "blur(16px)",
      WebkitBackdropFilter: "blur(16px)",
      borderBottom: "1px solid rgba(201,168,76,0.35)",
      height: "68px",
      display: "flex", alignItems: "center",
      padding: "0 5%", justifyContent: "space-between",
      transition: "all 0.3s",
      boxShadow: scrolled ? "0 4px 30px rgba(0,0,0,0.3)" : "none",
    }}>

      {/* LOGO */}
      <Link href="/" style={{
        textDecoration: "none",
        display: "flex", alignItems: "center", gap: "10px",
      }}>
        <div style={{
          width: "40px", height: "40px",
          background: "linear-gradient(135deg, #C9A84C, #8B6914)",
          borderRadius: "10px",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontFamily: "'Bebas Neue', cursive",
          fontSize: "17px", color: "white",
          boxShadow: "0 4px 20px rgba(201,168,76,0.5)",
          flexShrink: 0,
        }}>
          MP
        </div>
        <div style={{ display: "flex", flexDirection: "column", lineHeight: 1 }}>
          <span style={{
            fontFamily: "'Bebas Neue', cursive",
            fontSize: "22px", letterSpacing: "3px", color: "white",
          }}>
            MANU<span style={{ color: "#C9A84C" }}>PRINTS</span>
          </span>
          <span style={{
            color: "rgba(255,255,255,0.4)", fontSize: "8px",
            letterSpacing: "2px", textTransform: "uppercase",
            fontFamily: "'Outfit', sans-serif", fontWeight: "600",
          }}>
            Printing and Branding
          </span>
        </div>
      </Link>

      {/* DESKTOP NAV */}
      <ul style={{
        display: "flex", gap: "2px",
        listStyle: "none", margin: 0, padding: 0,
      }} className="desktop-nav">
        {navLinks.map((link) => (
          <li key={link.name}>
            <Link href={link.path} style={{
              color: isActive(link.path) ? "#C9A84C" : "rgba(255,255,255,0.75)",
              fontSize: "12px", fontWeight: "600",
              textDecoration: "none", letterSpacing: "1.5px",
              textTransform: "uppercase",
              fontFamily: "'Outfit', sans-serif",
              padding: "8px 14px", borderRadius: "8px",
              background: isActive(link.path) ? "rgba(201,168,76,0.15)" : "transparent",
              border: isActive(link.path) ? "1px solid rgba(201,168,76,0.3)" : "1px solid transparent",
              transition: "all 0.3s", display: "block",
            }}>
              {link.name}
            </Link>
          </li>
        ))}
      </ul>

      {/* RIGHT ACTIONS */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }} className="desktop-nav">
        {isAdminLoggedIn && (
          <Link href="/admin/dashboard" style={{ textDecoration: "none" }}>
            <button style={{
              background: "rgba(201,168,76,0.15)",
              color: "#C9A84C",
              border: "1px solid rgba(201,168,76,0.35)",
              borderRadius: "8px", padding: "8px 16px",
              fontFamily: "'Outfit', sans-serif",
              fontWeight: "600", fontSize: "12px",
              cursor: "pointer", transition: "all 0.3s",
            }}>
              Dashboard
            </button>
          </Link>
        )}
        <Link href="/contact" style={{ textDecoration: "none" }}>
          <button style={{
            background: "linear-gradient(135deg, #C9A84C, #8B6914)",
            color: "white", border: "none",
            borderRadius: "8px", padding: "10px 22px",
            fontFamily: "'Outfit', sans-serif",
            fontWeight: "700", fontSize: "13px",
            cursor: "pointer",
            boxShadow: "0 4px 20px rgba(201,168,76,0.45)",
            transition: "all 0.3s",
          }}>
            Get Quote
          </button>
        </Link>
      </div>

      {/* HAMBURGER */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="mobile-menu-btn"
        style={{
          background: "rgba(255,255,255,0.08)",
          border: "1px solid rgba(255,255,255,0.15)",
          borderRadius: "8px", padding: "8px 10px",
          cursor: "pointer", display: "none",
          flexDirection: "column", gap: "5px",
        }}
      >
        {[0, 1, 2].map((i) => (
          <span key={i} style={{
            display: "block", width: "22px", height: "2px",
            background: "#C9A84C", borderRadius: "2px",
          }} />
        ))}
      </button>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div style={{
          position: "absolute", top: "68px", left: 0, right: 0,
          background: "rgba(44,24,16,0.98)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(201,168,76,0.25)",
          padding: "16px 5% 20px",
          display: "flex", flexDirection: "column", gap: "4px",
          boxShadow: "0 12px 40px rgba(0,0,0,0.4)",
        }}>
          {navLinks.map((link) => (
            <Link key={link.name} href={link.path} style={{
              color: isActive(link.path) ? "#C9A84C" : "rgba(255,255,255,0.85)",
              fontSize: "15px", fontWeight: "700",
              textDecoration: "none", letterSpacing: "1.5px",
              textTransform: "uppercase",
              fontFamily: "'Outfit', sans-serif",
              padding: "13px 16px", borderRadius: "10px",
              background: isActive(link.path) ? "rgba(201,168,76,0.12)" : "transparent",
            }}>
              {link.name}
            </Link>
          ))}
          <div style={{ height: "1px", background: "rgba(201,168,76,0.15)", margin: "8px 0" }} />
          {isAdminLoggedIn && (
            <Link href="/admin/dashboard" style={{ textDecoration: "none" }}>
              <button style={{
                width: "100%", background: "rgba(201,168,76,0.12)",
                color: "#C9A84C", border: "1px solid rgba(201,168,76,0.25)",
                borderRadius: "10px", padding: "12px",
                fontFamily: "'Outfit', sans-serif",
                fontWeight: "700", fontSize: "13px",
                cursor: "pointer", marginBottom: "8px",
              }}>
                Admin Dashboard
              </button>
            </Link>
          )}
          <Link href="/contact" style={{ textDecoration: "none" }}>
            <button style={{
              width: "100%",
              background: "linear-gradient(135deg, #C9A84C, #8B6914)",
              color: "white", border: "none",
              borderRadius: "10px", padding: "13px",
              fontFamily: "'Outfit', sans-serif",
              fontWeight: "700", fontSize: "13px",
              cursor: "pointer",
            }}>
              Get Free Quote
            </button>
          </Link>
          <div style={{
            marginTop: "10px", padding: "12px 16px",
            background: "rgba(201,168,76,0.08)",
            border: "1px solid rgba(201,168,76,0.15)",
            borderRadius: "10px",
            display: "flex", justifyContent: "space-between",
            flexWrap: "wrap", gap: "8px",
          }}>
            <button onClick={() => window.location.href = "tel:0711499798"} style={{
              background: "none", border: "none", cursor: "pointer",
              color: "rgba(255,255,255,0.6)", fontSize: "12px",
              fontFamily: "'Outfit', sans-serif",
            }}>
              Call: <span style={{ color: "#C9A84C", fontWeight: "700" }}>0711 499 798</span>
            </button>
            <button onClick={() => window.open("https://wa.me/254740643789", "_blank")} style={{
              background: "none", border: "none", cursor: "pointer",
              color: "rgba(255,255,255,0.6)", fontSize: "12px",
              fontFamily: "'Outfit', sans-serif",
            }}>
              Chat: <span style={{ color: "#25D366", fontWeight: "700" }}>WhatsApp Us</span>
            </button>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 900px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </nav>
  );
}