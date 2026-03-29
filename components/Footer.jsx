"use client";
import Link from "next/link";

const GOLD = "#C9A84C";
const DARK = "#2C1810";

export default function Footer() {
  return (
    <footer style={{
      background: "rgba(44,24,16,0.95)",
      backdropFilter: "blur(10px)",
      borderTop: "1px solid rgba(201,168,76,0.2)",
      padding: "48px 5% 24px",
      marginTop: "40px",
    }}>
      <div style={{
        maxWidth: "1380px", margin: "0 auto",
        display: "grid",
        gridTemplateColumns: "1.5fr 1fr 1fr 1fr",
        gap: "32px", marginBottom: "36px",
      }} className="footer-grid">

        {/* Brand */}
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "14px" }}>
            <div style={{
              width: "38px", height: "38px",
              background: "linear-gradient(135deg, #C9A84C, #8B6914)",
              borderRadius: "10px",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontFamily: "'Bebas Neue', cursive",
              fontSize: "16px", color: "white",
            }}>MP</div>
            <span style={{
              fontFamily: "'Bebas Neue', cursive",
              fontSize: "20px", letterSpacing: "3px", color: "white",
            }}>
              MANU<span style={{ color: GOLD }}>PRINTS</span>
            </span>
          </div>
          <p style={{
            color: "rgba(255,255,255,0.5)", fontSize: "13px",
            lineHeight: "1.7", fontFamily: "'Outfit', sans-serif",
            marginBottom: "16px", maxWidth: "220px",
          }}>
            Nairobi's premier printing and branding studio. We bring your vision to life with precision, creativity, and world-class quality.
          </p>
          {[
            { icon: "📱", text: "0740 643 789 (WhatsApp)", link: "https://wa.me/254740643789" },
            { icon: "📞", text: "0711 499 798", link: "tel:0711499798" },
            { icon: "✉️", text: "elphasopiyo17@gmail.com", link: "mailto:elphasopiyo17@gmail.com" },
          ].map((item) => (
            <a key={item.text} href={item.link}
              target={item.link.startsWith("http") ? "_blank" : "_self"}
              rel="noopener noreferrer"
              style={{
                display: "flex", alignItems: "center", gap: "8px",
                color: "rgba(255,255,255,0.5)", fontSize: "12px",
                fontFamily: "'Outfit', sans-serif",
                textDecoration: "none", marginBottom: "8px",
                transition: "color 0.3s",
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = GOLD}
              onMouseLeave={(e) => e.currentTarget.style.color = "rgba(255,255,255,0.5)"}
            >
              <span>{item.icon}</span> {item.text}
            </a>
          ))}
        </div>

        {/* Services */}
        <div>
          <h4 style={{
            fontFamily: "'Bebas Neue', cursive", fontSize: "16px",
            letterSpacing: "2px", color: GOLD, marginBottom: "16px",
            textTransform: "uppercase",
          }}>Services</h4>
          {["Printing", "Branding", "Graphic Design", "3D Signages", "Fabrication", "Screen Printing"].map((s) => (
            <Link key={s} href="/services" style={{
              display: "flex", alignItems: "center", gap: "8px",
              color: "rgba(255,255,255,0.5)", fontSize: "12px",
              fontFamily: "'Outfit', sans-serif",
              textDecoration: "none", marginBottom: "8px",
              transition: "color 0.3s",
            }}
              onMouseEnter={(e) => e.currentTarget.style.color = "white"}
              onMouseLeave={(e) => e.currentTarget.style.color = "rgba(255,255,255,0.5)"}
            >
              ▶ {s}
            </Link>
          ))}
        </div>

        {/* Quick Links */}
        <div>
          <h4 style={{
            fontFamily: "'Bebas Neue', cursive", fontSize: "16px",
            letterSpacing: "2px", color: GOLD, marginBottom: "16px",
            textTransform: "uppercase",
          }}>Quick Links</h4>
          {[
            { name: "Home", path: "/" },
            { name: "Products", path: "/products" },
            { name: "Contact", path: "/contact" },
            { name: "Admin", path: "/admin" },
          ].map((link) => (
            <Link key={link.name} href={link.path} style={{
              display: "flex", alignItems: "center", gap: "8px",
              color: "rgba(255,255,255,0.5)", fontSize: "12px",
              fontFamily: "'Outfit', sans-serif",
              textDecoration: "none", marginBottom: "8px",
              transition: "color 0.3s",
            }}
              onMouseEnter={(e) => e.currentTarget.style.color = "white"}
              onMouseLeave={(e) => e.currentTarget.style.color = "rgba(255,255,255,0.5)"}
            >
              ▶ {link.name}
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div>
          <h4 style={{
            fontFamily: "'Bebas Neue', cursive", fontSize: "16px",
            letterSpacing: "2px", color: GOLD, marginBottom: "16px",
            textTransform: "uppercase",
          }}>Start A Project</h4>
          <p style={{
            color: "rgba(255,255,255,0.5)", fontSize: "12px",
            lineHeight: "1.6", fontFamily: "'Outfit', sans-serif",
            marginBottom: "16px",
          }}>
            Ready to bring your brand to life? Get in touch with us today.
          </p>
          <Link href="/contact" style={{ textDecoration: "none" }}>
            <button style={{
              background: "linear-gradient(135deg, #C9A84C, #8B6914)",
              color: "white", border: "none",
              borderRadius: "8px", padding: "12px 20px",
              fontFamily: "'Bebas Neue', cursive",
              fontSize: "14px", letterSpacing: "2px",
              cursor: "pointer", width: "100%",
              boxShadow: "0 4px 15px rgba(201,168,76,0.35)",
              transition: "all 0.3s",
            }}>
              GET FREE QUOTE
            </button>
          </Link>
        </div>
      </div>

      {/* Bottom Bar */}
      <div style={{
        borderTop: "1px solid rgba(255,255,255,0.08)",
        paddingTop: "20px",
        display: "flex", justifyContent: "space-between",
        alignItems: "center", flexWrap: "wrap", gap: "10px",
      }}>
        <p style={{
          color: "rgba(255,255,255,0.3)", fontSize: "12px",
          fontFamily: "'Outfit', sans-serif",
        }}>
          © 2026 Manuprints. All rights reserved.
        </p>
        <p style={{
          color: "rgba(255,255,255,0.3)", fontSize: "12px",
          fontFamily: "'Outfit', sans-serif",
        }}>
          Website designed, developed & maintained by{" "}
          <span style={{ color: GOLD, fontWeight: "700" }}>Techari Digital Solutions</span>
        </p>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 500px) {
          .footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  );
}