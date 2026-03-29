"use client";
import { useState } from "react";
import Link from "next/link";
import Layout from "@/components/Layout";

const GOLD = "#8B6914";
const DARK = "#2C1810";
const MID = "#5C3D2E";
const CARD_BG = "rgba(255,255,255,0.88)";
const CARD_BORDER = "rgba(139,105,20,0.2)";

const services = [
  {
    id: 1, icon: "🖨️", title: "Printing",
    tagline: "Print That Speaks Volumes",
    accent: "#8B6914",
    description: "From business cards to large-format banners, we deliver crisp, vibrant, and professional print outputs every time.",
    offerings: ["Business Cards & Letterheads", "Flyers & Brochures", "Posters & Banners", "Pull-up Standees", "Stickers & Labels", "Calendars & Diaries", "Certificates & Awards", "Large Format Printing"],
  },
  {
    id: 2, icon: "🎨", title: "Branding",
    tagline: "Build a Brand That Lasts",
    accent: "#A0892A",
    description: "We craft powerful brand identities that make your business unforgettable — from logo to full brand systems.",
    offerings: ["Logo Design & Identity", "Brand Style Guides", "Corporate Stationery", "Brand Strategy", "Vehicle Branding", "Uniform Branding", "Event Branding", "Social Media Brand Kits"],
  },
  {
    id: 3, icon: "✏️", title: "Graphic Design",
    tagline: "Design That Converts",
    accent: "#C49A3C",
    description: "Our designers turn your ideas into stunning visuals that communicate, engage and inspire action.",
    offerings: ["Marketing Materials", "Social Media Graphics", "Packaging Design", "Menu & Catalogue Design", "Infographic Design", "Photo Editing", "Presentation Design", "Digital Ad Creatives"],
  },
  {
    id: 4, icon: "🏗️", title: "3D Signages",
    tagline: "Signs That Stop People",
    accent: "#6B5010",
    description: "Premium 3D fabricated signs that command attention and elevate your brand presence at any location.",
    offerings: ["3D Acrylic Letter Signs", "Illuminated LED Signs", "Shop Front Signage", "Office Name Boards", "Directional Signage", "Billboard Design", "Window Graphics", "Exhibition Stands"],
  },
  {
    id: 5, icon: "⚙️", title: "Fabrication",
    tagline: "Built Strong. Built to Impress.",
    accent: "#8B6914",
    description: "Custom metalwork, acrylic and aluminium fabrication for signage structures, displays and branded installations.",
    offerings: ["Metal Frame Structures", "Acrylic Display Stands", "Aluminium Composite Panels", "Cut-out Letter Fabrication", "Light Box Fabrication", "Retail Display Units", "Trade Show Booths", "Custom Brand Installations"],
  },
  {
    id: 6, icon: "👕", title: "Screen Printing",
    tagline: "Wear Your Brand With Pride",
    accent: "#C9A84C",
    description: "High-quality screen and heat transfer printing on all types of apparel — perfect for teams, events, and merchandise.",
    offerings: ["T-Shirt Screen Printing", "Hoodie & Jacket Printing", "Cap & Hat Printing", "Polo Shirt Embroidery", "Bulk Corporate Uniforms", "School & Club Jerseys", "Promotional Bags", "Custom Merchandise"],
  },
];

export default function Services() {
  const [hovered, setHovered] = useState(null);

  return (
    <Layout>
      <div style={{
        minHeight: "100vh",
        paddingTop: "68px",
        fontFamily: "'Outfit', sans-serif",
      }}>
        <div style={{ maxWidth: "1300px", margin: "0 auto", padding: "24px 5%" }}>

          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: "28px" }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              background: "rgba(139,105,20,0.1)",
              border: "1px solid rgba(139,105,20,0.3)",
              borderRadius: "50px", padding: "5px 16px", marginBottom: "10px",
            }}>
              <span style={{
                color: GOLD, fontSize: "11px", fontWeight: "700",
                letterSpacing: "2px", textTransform: "uppercase",
                fontFamily: "'Outfit', sans-serif",
              }}>
                What We Offer
              </span>
            </div>
            <h1 style={{
              fontFamily: "'Bebas Neue', cursive",
              fontSize: "clamp(28px, 4vw, 52px)",
              letterSpacing: "3px", color: DARK,
              lineHeight: "1", marginBottom: "10px",
            }}>
              Our <span style={{ color: GOLD }}>Services</span>
            </h1>
            <p style={{
              color: MID, fontSize: "14px",
              maxWidth: "520px", margin: "0 auto",
              lineHeight: "1.7", fontFamily: "'Outfit', sans-serif",
            }}>
              From a single business card to a full corporate rebrand — Manuprints delivers world-class printing and branding solutions for every business in Kenya.
            </p>
          </div>

          {/* Services Grid */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "14px", marginBottom: "28px",
          }} className="services-grid">
            {services.map((service) => (
              <div
                key={service.id}
                onMouseEnter={() => setHovered(service.id)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  background: hovered === service.id
                    ? `rgba(139,105,20,0.08)` : CARD_BG,
                  border: `1px solid ${hovered === service.id ? `${service.accent}40` : CARD_BORDER}`,
                  borderRadius: "16px", padding: "22px",
                  transition: "all 0.3s ease",
                  transform: hovered === service.id ? "translateY(-5px)" : "translateY(0)",
                  boxShadow: hovered === service.id
                    ? "0 16px 40px rgba(139,105,20,0.15)"
                    : "0 2px 10px rgba(139,105,20,0.06)",
                  cursor: "default", position: "relative", overflow: "hidden",
                }}
              >
                <div style={{
                  position: "absolute", top: "-10px", right: "10px",
                  fontFamily: "'Bebas Neue', cursive",
                  fontSize: "80px", color: service.accent,
                  opacity: 0.05, lineHeight: "1", pointerEvents: "none",
                }}>
                  0{service.id}
                </div>

                <div style={{
                  display: "flex", alignItems: "flex-start",
                  gap: "12px", marginBottom: "12px",
                }}>
                  <div style={{
                    width: "46px", height: "46px", borderRadius: "12px",
                    background: "rgba(139,105,20,0.08)",
                    display: "flex", alignItems: "center",
                    justifyContent: "center", fontSize: "20px", flexShrink: 0,
                    transition: "transform 0.3s",
                    transform: hovered === service.id ? "scale(1.1) rotate(-5deg)" : "scale(1)",
                  }}>
                    {service.icon}
                  </div>
                  <div>
                    <h3 style={{
                      fontFamily: "'Bebas Neue', cursive",
                      fontSize: "20px", letterSpacing: "2px",
                      color: DARK, lineHeight: "1", marginBottom: "3px",
                    }}>
                      {service.title}
                    </h3>
                    <p style={{
                      color: service.accent, fontSize: "11px",
                      fontWeight: "700", fontFamily: "'Outfit', sans-serif",
                    }}>
                      {service.tagline}
                    </p>
                  </div>
                </div>

                <p style={{
                  color: MID, fontSize: "12px",
                  lineHeight: "1.6", marginBottom: "12px",
                  fontFamily: "'Outfit', sans-serif",
                }}>
                  {service.description}
                </p>

                <div style={{
                  height: "1px",
                  background: hovered === service.id
                    ? `${service.accent}30` : "rgba(139,105,20,0.1)",
                  marginBottom: "12px",
                }} />

                <div style={{
                  display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4px",
                }}>
                  {service.offerings.map((item) => (
                    <div key={item} style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                      <div style={{
                        width: "4px", height: "4px", borderRadius: "50%",
                        background: service.accent, flexShrink: 0,
                      }} />
                      <span style={{
                        color: MID, fontSize: "11px",
                        fontFamily: "'Outfit', sans-serif", lineHeight: "1.4",
                      }}>
                        {item}
                      </span>
                    </div>
                  ))}
                </div>

                {hovered === service.id && (
                  <div style={{ marginTop: "14px" }}>
                    <Link href="/contact" style={{ textDecoration: "none" }}>
                      <button style={{
                        background: `linear-gradient(135deg, ${service.accent}, #6B5010)`,
                        color: "white", border: "none",
                        borderRadius: "50px", padding: "8px 18px",
                        fontFamily: "'Outfit', sans-serif",
                        fontWeight: "700", fontSize: "12px",
                        cursor: "pointer",
                      }}>
                        Get a Quote →
                      </button>
                    </Link>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div style={{
            background: "linear-gradient(135deg, rgba(139,105,20,0.15), rgba(107,80,16,0.15))",
            border: "1px solid rgba(139,105,20,0.25)",
            borderRadius: "16px", padding: "28px 36px",
            display: "flex", justifyContent: "space-between",
            alignItems: "center", flexWrap: "wrap", gap: "16px",
            boxShadow: "0 4px 20px rgba(139,105,20,0.1)",
          }}>
            <div>
              <h3 style={{
                fontFamily: "'Bebas Neue', cursive",
                fontSize: "28px", letterSpacing: "2px",
                color: DARK, lineHeight: "1", marginBottom: "6px",
              }}>
                Ready To Get <span style={{ color: GOLD }}>Started?</span>
              </h3>
              <p style={{
                color: MID, fontSize: "13px",
                fontFamily: "'Outfit', sans-serif",
              }}>
                Contact us today for a free quote on any of our services.
              </p>
            </div>
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              <button
                onClick={() => window.open("https://wa.me/254740643789", "_blank")}
                style={{
                  background: "#25D366", color: "white",
                  border: "none", borderRadius: "50px", padding: "11px 24px",
                  fontFamily: "'Outfit', sans-serif",
                  fontWeight: "700", fontSize: "13px",
                  cursor: "pointer",
                  boxShadow: "0 4px 14px rgba(37,211,102,0.3)",
                }}>
                WhatsApp Us
              </button>
              <Link href="/contact" style={{ textDecoration: "none" }}>
                <button style={{
                  background: `linear-gradient(135deg, ${GOLD}, #6B5010)`,
                  color: "white", border: "none",
                  borderRadius: "50px", padding: "11px 24px",
                  fontFamily: "'Outfit', sans-serif",
                  fontWeight: "700", fontSize: "13px",
                  cursor: "pointer",
                  boxShadow: "0 4px 14px rgba(139,105,20,0.35)",
                }}>
                  Get Free Quote
                </button>
              </Link>
            </div>
          </div>
        </div>

        <style>{`
          @media (max-width: 1024px) {
            .services-grid { grid-template-columns: repeat(2, 1fr) !important; }
          }
          @media (max-width: 600px) {
            .services-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </div>
    </Layout>
  );
}