"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Layout from "@/components/Layout";
import { useAdmin } from "@/context/AdminContext";

const GOLD = "#8B6914";
const DARK = "#2C1810";
const MID = "#5C3D2E";
const LIGHT = "#8B6E5A";
const CARD_BG = "rgba(255,255,255,0.88)";
const CARD_BORDER = "rgba(139,105,20,0.2)";

export default function Home() {
  const { products, siteSettings } = useAdmin();
  const [hovered, setHovered] = useState(null);
  const [counter, setCounter] = useState({ clients: 0, items: 0, years: 0, rate: 0 });
  const [hoveredFeature, setHoveredFeature] = useState(null);
  const [hoveredService, setHoveredService] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [hoveredProduct, setHoveredProduct] = useState(null);

  const featuredProducts = products.filter(p => p.featured);
  const displayProducts = featuredProducts.length >= 1
    ? featuredProducts.slice(0, 9)
    : products.slice(0, 9);

  const tagColors = [GOLD, "#C9A84C", "#8B6914", "#A0892A", "#6B4C3B", "#C49A3C", "#8B6914", "#A0892A", "#C9A84C"];

  useEffect(() => {
    const targets = { clients: 500, items: 10000, years: 6, rate: 100 };
    const steps = 60;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      const p = step / steps;
      setCounter({
        clients: Math.round(targets.clients * p),
        items: Math.round(targets.items * p),
        years: Math.round(targets.years * p),
        rate: Math.round(targets.rate * p),
      });
      if (step >= steps) clearInterval(timer);
    }, 35);
    return () => clearInterval(timer);
  }, []);

  const services = [
    { icon: "🖨️", title: "Printing", desc: "High-quality digital and offset printing for flyers, banners, brochures and more.", accent: GOLD },
    { icon: "🎨", title: "Branding", desc: "Complete brand identity solutions — logo design, guidelines and visual systems.", accent: "#A0892A" },
    { icon: "✏️", title: "Graphic Design", desc: "Creative designs for print and digital — marketing materials and social media.", accent: "#C49A3C" },
    { icon: "🏗️", title: "3D Signages", desc: "Eye-catching 3D fabricated signs for shops, offices, malls and events.", accent: "#6B5010" },
    { icon: "⚙️", title: "Fabrication", desc: "Custom metal and acrylic fabrication for signage, displays and installations.", accent: GOLD },
    { icon: "👕", title: "Screen Printing", desc: "Premium printing on t-shirts, hoodies, caps, bags and all types of apparel.", accent: "#C9A84C" },
  ];

  const categories = ["All", "T-Shirts", "Hoodies", "Caps", "3D Signages", "Branding"];
  const filteredProducts = products
    .filter(p => activeCategory === "All" || p.category === activeCategory)
    .slice(0, 8);

  return (
    <Layout>
      <div style={{ minHeight: "100vh", paddingTop: "68px" }}>

        {/* ── HERO ── */}
        <div style={{
          maxWidth: "1380px", margin: "0 auto",
          padding: "16px 20px",
          display: "flex", flexDirection: "column", gap: "14px",
        }}>

          {/* Headline + Stats */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "1.3fr 1fr",
            gap: "20px", alignItems: "center",
          }} className="hero-top-row">

            {/* Headline */}
            <div>
              <div style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                background: "rgba(139,105,20,0.12)",
                border: "1px solid rgba(139,105,20,0.35)",
                borderRadius: "50px", padding: "5px 16px", marginBottom: "12px",
              }}>
                <div style={{
                  width: "7px", height: "7px", borderRadius: "50%",
                  background: GOLD, boxShadow: `0 0 10px ${GOLD}`,
                }} />
                <span style={{
                  color: GOLD, fontSize: "11px", fontWeight: "700",
                  letterSpacing: "2px", textTransform: "uppercase",
                  fontFamily: "'Outfit', sans-serif",
                }}>
                  Nairobi's Premier Print Studio
                </span>
              </div>

              <h1 style={{
                fontFamily: "'Bebas Neue', cursive",
                fontSize: "clamp(36px, 5vw, 64px)",
                lineHeight: "0.95", color: DARK,
                letterSpacing: "2px", marginBottom: "12px",
              }}>
                Premium{" "}
                <span style={{ color: GOLD }}>Printing</span>
                <br />&amp; Branding Solutions
              </h1>

              <p style={{
                color: MID, fontSize: "13px", lineHeight: "1.7",
                fontFamily: "'Outfit', sans-serif",
                maxWidth: "400px", marginBottom: "16px",
              }}>
                {siteSettings?.heroSubtitle ||
                  "Custom printed apparel, 3D signages, corporate branding and more. We bring your brand to life across Kenya."}
              </p>

              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                <Link href="/products" style={{ textDecoration: "none" }}>
                  <button style={{
                    background: `linear-gradient(135deg, ${GOLD}, #6B5010)`,
                    color: "white", border: "none",
                    borderRadius: "50px", padding: "11px 26px",
                    fontFamily: "'Outfit', sans-serif",
                    fontWeight: "700", fontSize: "13px",
                    cursor: "pointer",
                    boxShadow: `0 6px 20px rgba(139,105,20,0.4)`,
                    transition: "all 0.3s",
                  }}>
                    Browse Products
                  </button>
                </Link>
                <Link href="/contact" style={{ textDecoration: "none" }}>
                  <button style={{
                    background: "rgba(44,24,16,0.07)",
                    color: DARK,
                    border: `1px solid rgba(44,24,16,0.2)`,
                    borderRadius: "50px", padding: "11px 26px",
                    fontFamily: "'Outfit', sans-serif",
                    fontWeight: "700", fontSize: "13px",
                    cursor: "pointer", transition: "all 0.3s",
                  }}>
                    Get Free Quote
                  </button>
                </Link>
              </div>
            </div>

            {/* Stats */}
            <div style={{
              display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px",
            }}>
              {[
                { value: `${counter.clients}+`, label: "Happy Clients", color: GOLD },
                { value: `${counter.items.toLocaleString()}+`, label: "Items Printed", color: "#A0892A" },
                { value: `${counter.years}+`, label: "Years Experience", color: "#8B6914" },
                { value: `${counter.rate}%`, label: "Satisfaction Rate", color: "#C49A3C" },
              ].map((stat) => (
                <div key={stat.label} style={{
                  background: CARD_BG,
                  border: `1px solid ${CARD_BORDER}`,
                  borderRadius: "14px", padding: "14px 10px",
                  textAlign: "center",
                  boxShadow: "0 2px 10px rgba(139,105,20,0.08)",
                }}>
                  <div style={{
                    fontFamily: "'Bebas Neue', cursive",
                    fontSize: "28px", color: stat.color,
                    letterSpacing: "2px", lineHeight: "1", marginBottom: "4px",
                  }}>
                    {stat.value}
                  </div>
                  <div style={{
                    color: MID, fontSize: "10px", fontWeight: "700",
                    letterSpacing: "1px", textTransform: "uppercase",
                    fontFamily: "'Outfit', sans-serif",
                  }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section Label */}
          <div style={{
            display: "flex", justifyContent: "space-between", alignItems: "center",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div style={{
                width: "4px", height: "20px", borderRadius: "2px",
                background: `linear-gradient(to bottom, ${GOLD}, #6B5010)`,
              }} />
              <span style={{
                color: DARK, fontSize: "12px", fontWeight: "700",
                letterSpacing: "2px", textTransform: "uppercase",
                fontFamily: "'Outfit', sans-serif",
              }}>
                Featured Products
              </span>
            </div>
            <Link href="/products" style={{ textDecoration: "none" }}>
              <span style={{
                color: GOLD, fontSize: "12px", fontWeight: "700",
                fontFamily: "'Outfit', sans-serif", cursor: "pointer",
              }}>
                View All →
              </span>
            </Link>
          </div>

          {/* ── 9 EQUAL PRODUCT GRIDS ── */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "10px",
          }} className="hero-product-grid">
            {Array.from({ length: 9 }).map((_, idx) => {
              const product = displayProducts[idx];
              const color = tagColors[idx % tagColors.length];

              if (!product) {
                return (
                  <Link
                    key={`empty-${idx}`}
                    href={idx === 0 ? "/contact" : "/products"}
                    style={{ textDecoration: "none" }}
                  >
                    <div style={{
                      height: "155px",
                      borderRadius: "12px",
                      background: idx === 0
                        ? "linear-gradient(135deg, rgba(139,105,20,0.18), rgba(107,80,16,0.18))"
                        : "rgba(139,105,20,0.04)",
                      border: idx === 0
                        ? "1px solid rgba(139,105,20,0.35)"
                        : "1px dashed rgba(139,105,20,0.15)",
                      display: "flex", flexDirection: "column",
                      alignItems: "center", justifyContent: "center",
                      textAlign: "center", padding: "14px",
                      cursor: "pointer", transition: "all 0.3s",
                    }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "translateY(-3px)";
                        e.currentTarget.style.boxShadow = "0 8px 20px rgba(139,105,20,0.12)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.boxShadow = "none";
                      }}
                    >
                      {idx === 0 && (
                        <>
                          <div style={{ fontSize: "22px", marginBottom: "6px" }}>🎨</div>
                          <h4 style={{
                            fontFamily: "'Bebas Neue', cursive",
                            fontSize: "15px", color: DARK,
                            letterSpacing: "2px", marginBottom: "4px",
                          }}>
                            Custom Order
                          </h4>
                          <p style={{
                            color: MID, fontSize: "9px",
                            fontFamily: "'Outfit', sans-serif",
                            marginBottom: "8px", lineHeight: "1.4",
                          }}>
                            Upload your design and we print it
                          </p>
                          <span style={{
                            background: `linear-gradient(135deg, ${GOLD}, #6B5010)`,
                            color: "white", borderRadius: "50px",
                            padding: "4px 12px", fontSize: "9px",
                            fontWeight: "700", fontFamily: "'Outfit', sans-serif",
                          }}>
                            Start Order →
                          </span>
                        </>
                      )}
                      {idx !== 0 && (
                        <p style={{
                          color: LIGHT, fontSize: "10px",
                          fontFamily: "'Outfit', sans-serif",
                        }}>
                          Add more products
                        </p>
                      )}
                    </div>
                  </Link>
                );
              }

              return (
                <Link
                  key={product._id}
                  href={`/products/${product._id}`}
                  style={{ textDecoration: "none" }}
                  onMouseEnter={() => setHovered(idx)}
                  onMouseLeave={() => setHovered(null)}
                >
                  <div style={{
                    height: "155px",
                    borderRadius: "12px",
                    overflow: "hidden",
                    position: "relative",
                    background: "white",
                    border: `2px solid ${hovered === idx ? color : "transparent"}`,
                    transition: "all 0.35s ease",
                    transform: hovered === idx ? "translateY(-4px)" : "translateY(0)",
                    boxShadow: hovered === idx
                      ? `0 14px 35px rgba(0,0,0,0.15), 0 0 0 1px ${color}20`
                      : "0 2px 10px rgba(0,0,0,0.08)",
                    cursor: "pointer",
                  }}>
                    {/* Image */}
                    {product.images?.[0] ? (
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        style={{
                          position: "absolute", inset: 0,
                          width: "100%", height: "100%",
                          objectFit: "contain",
                          padding: "6px",
                          background: "white",
                          transition: "transform 0.5s ease",
                          transform: hovered === idx ? "scale(1.06)" : "scale(1)",
                        }}
                      />
                    ) : (
                      <div style={{
                        width: "100%", height: "100%",
                        display: "flex", flexDirection: "column",
                        alignItems: "center", justifyContent: "center",
                        background: "#FDF8F0",
                      }}>
                        <div style={{ fontSize: "22px", opacity: 0.2, marginBottom: "4px" }}>📷</div>
                        <p style={{
                          fontSize: "9px",
                          fontFamily: "'Outfit', sans-serif",
                          color: LIGHT,
                        }}>
                          No photo yet
                        </p>
                      </div>
                    )}

                    {/* Dark overlay */}
                    <div style={{
                      position: "absolute", inset: 0,
                      background: "linear-gradient(to top, rgba(44,24,16,0.82) 0%, transparent 50%)",
                      pointerEvents: "none",
                    }} />

                    {/* Category tag */}
                    <div style={{
                      position: "absolute", top: "7px", left: "7px",
                      background: color,
                      borderRadius: "50px", padding: "2px 7px",
                      boxShadow: `0 2px 8px ${color}70`,
                      zIndex: 2,
                    }}>
                      <span style={{
                        color: "white", fontSize: "7px", fontWeight: "800",
                        letterSpacing: "0.8px", textTransform: "uppercase",
                        fontFamily: "'Outfit', sans-serif",
                      }}>
                        {product.category}
                      </span>
                    </div>

                    {/* Product info */}
                    <div style={{
                      position: "absolute", bottom: "7px",
                      left: "8px", right: "8px", zIndex: 2,
                    }}>
                      <h3 style={{
                        fontFamily: "'Outfit', sans-serif",
                        fontSize: "11px", fontWeight: "800",
                        color: "white", marginBottom: "2px",
                        whiteSpace: "nowrap", overflow: "hidden",
                        textOverflow: "ellipsis",
                        textShadow: "0 1px 4px rgba(0,0,0,0.9)",
                      }}>
                        {product.name}
                      </h3>
                      <div style={{
                        display: "flex", justifyContent: "space-between",
                        alignItems: "center",
                      }}>
                        <span style={{
                          fontFamily: "'Bebas Neue', cursive",
                          fontSize: "14px", color: "#FFD700",
                          letterSpacing: "0.5px",
                          textShadow: "0 0 8px rgba(255,215,0,0.7)",
                        }}>
                          KSh {product.price?.toLocaleString()}
                        </span>
                        <span style={{
                          background: color, color: "white",
                          borderRadius: "50px", padding: "2px 7px",
                          fontSize: "8px", fontWeight: "700",
                          fontFamily: "'Outfit', sans-serif",
                          opacity: hovered === idx ? 1 : 0,
                          transition: "opacity 0.3s",
                        }}>
                          View →
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* ── 4 FEATURE CARDS ── */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "10px",
          }} className="hero-feature-cards">
            {[
              { icon: "⚡", color: "#8B6914", bg: "rgba(139,105,20,0.1)", title: "Fast Delivery", desc: "Quick turnaround across Kenya" },
              { icon: "🎯", color: "#6B5010", bg: "rgba(107,80,16,0.1)", title: "100% Quality", desc: "Premium materials guaranteed" },
              { icon: "✏️", color: "#A0892A", bg: "rgba(160,137,42,0.1)", title: "Custom Design", desc: "Upload artwork or we design" },
              { icon: "💎", color: "#C49A3C", bg: "rgba(196,154,60,0.1)", title: "Best Prices", desc: "Bulk order discounts available" },
            ].map((f, i) => (
              <div
                key={f.title}
                onMouseEnter={() => setHoveredFeature(i)}
                onMouseLeave={() => setHoveredFeature(null)}
                style={{
                  background: hoveredFeature === i ? f.bg : CARD_BG,
                  backdropFilter: "blur(10px)",
                  borderRadius: "12px", padding: "12px 14px",
                  display: "flex", alignItems: "center", gap: "10px",
                  border: `1px solid ${hoveredFeature === i ? `${f.color}40` : CARD_BORDER}`,
                  transition: "all 0.3s",
                  boxShadow: "0 2px 8px rgba(139,105,20,0.06)",
                  cursor: "default",
                }}
              >
                <div style={{
                  width: "36px", height: "36px", borderRadius: "9px",
                  background: f.bg, border: `1px solid ${f.color}25`,
                  display: "flex", alignItems: "center",
                  justifyContent: "center", fontSize: "16px", flexShrink: 0,
                }}>
                  {f.icon}
                </div>
                <div>
                  <h4 style={{
                    fontFamily: "'Outfit', sans-serif", fontWeight: "700",
                    fontSize: "12px", color: DARK, marginBottom: "1px",
                  }}>
                    {f.title}
                  </h4>
                  <p style={{
                    color: MID, fontSize: "10px",
                    lineHeight: "1.4", fontFamily: "'Outfit', sans-serif",
                  }}>
                    {f.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── SERVICES SECTION ── */}
        <section style={{
          padding: "60px 5%",
          background: "rgba(255,255,255,0.3)",
          borderTop: "1px solid rgba(139,105,20,0.15)",
          borderBottom: "1px solid rgba(139,105,20,0.15)",
          marginTop: "10px",
        }}>
          <div style={{ maxWidth: "1380px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "36px" }}>
              <div style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                background: "rgba(139,105,20,0.1)",
                border: "1px solid rgba(139,105,20,0.3)",
                borderRadius: "50px", padding: "5px 16px", marginBottom: "12px",
              }}>
                <span style={{
                  color: GOLD, fontSize: "11px", fontWeight: "700",
                  letterSpacing: "2px", textTransform: "uppercase",
                  fontFamily: "'Outfit', sans-serif",
                }}>
                  What We Do
                </span>
              </div>
              <h2 style={{
                fontFamily: "'Bebas Neue', cursive",
                fontSize: "clamp(28px, 4vw, 48px)",
                letterSpacing: "3px", color: DARK, lineHeight: "1",
              }}>
                Our <span style={{ color: GOLD }}>Services</span>
              </h2>
            </div>

            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "14px",
            }} className="services-grid">
              {services.map((s, i) => (
                <div
                  key={s.title}
                  onMouseEnter={() => setHoveredService(i)}
                  onMouseLeave={() => setHoveredService(null)}
                  style={{
                    background: hoveredService === i ? "rgba(139,105,20,0.08)" : CARD_BG,
                    border: `1px solid ${hoveredService === i ? `${s.accent}40` : CARD_BORDER}`,
                    borderRadius: "16px", padding: "22px",
                    transition: "all 0.35s ease",
                    transform: hoveredService === i ? "translateY(-5px)" : "translateY(0)",
                    boxShadow: hoveredService === i
                      ? "0 16px 40px rgba(139,105,20,0.15)"
                      : "0 2px 10px rgba(139,105,20,0.06)",
                    cursor: "default",
                  }}
                >
                  <div style={{
                    width: "48px", height: "48px", borderRadius: "12px",
                    background: "rgba(139,105,20,0.08)",
                    display: "flex", alignItems: "center",
                    justifyContent: "center", fontSize: "22px", marginBottom: "14px",
                    transition: "transform 0.3s",
                    transform: hoveredService === i ? "scale(1.1) rotate(-5deg)" : "scale(1)",
                  }}>
                    {s.icon}
                  </div>
                  <h3 style={{
                    fontFamily: "'Bebas Neue', cursive",
                    fontSize: "20px", letterSpacing: "2px",
                    color: hoveredService === i ? s.accent : DARK,
                    marginBottom: "8px", transition: "color 0.3s",
                  }}>
                    {s.title}
                  </h3>
                  <p style={{
                    color: MID, fontSize: "13px",
                    lineHeight: "1.6", fontFamily: "'Outfit', sans-serif",
                    marginBottom: hoveredService === i ? "14px" : "0",
                  }}>
                    {s.desc}
                  </p>
                  {hoveredService === i && (
                    <Link href="/contact" style={{ textDecoration: "none" }}>
                      <button style={{
                        background: `linear-gradient(135deg, ${s.accent}, #6B5010)`,
                        color: "white", border: "none",
                        borderRadius: "50px", padding: "7px 18px",
                        fontFamily: "'Outfit', sans-serif",
                        fontWeight: "700", fontSize: "12px", cursor: "pointer",
                      }}>
                        Get Quote →
                      </button>
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PRODUCTS SECTION ── */}
        <section style={{ padding: "60px 5%" }}>
          <div style={{ maxWidth: "1380px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "28px" }}>
              <h2 style={{
                fontFamily: "'Bebas Neue', cursive",
                fontSize: "clamp(28px, 4vw, 48px)",
                letterSpacing: "3px", color: DARK, lineHeight: "1",
              }}>
                Featured <span style={{ color: GOLD }}>Products</span>
              </h2>
            </div>

            {/* Category Filter */}
            <div style={{
              display: "flex", gap: "8px", flexWrap: "wrap",
              justifyContent: "center", marginBottom: "28px",
            }}>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  style={{
                    background: activeCategory === cat
                      ? `linear-gradient(135deg, ${GOLD}, #6B5010)` : CARD_BG,
                    color: activeCategory === cat ? "white" : DARK,
                    border: `1px solid ${activeCategory === cat ? "transparent" : CARD_BORDER}`,
                    borderRadius: "50px", padding: "7px 16px",
                    fontFamily: "'Outfit', sans-serif", fontWeight: "600",
                    fontSize: "12px", cursor: "pointer", transition: "all 0.25s",
                    boxShadow: activeCategory === cat
                      ? "0 4px 12px rgba(139,105,20,0.35)" : "none",
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Products Grid */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "14px", marginBottom: "28px",
            }} className="products-section-grid">
              {filteredProducts.map((product, i) => {
                const color = tagColors[i % tagColors.length];
                return (
                  <Link
                    key={product._id}
                    href={`/products/${product._id}`}
                    style={{ textDecoration: "none" }}
                    onMouseEnter={() => setHoveredProduct(i)}
                    onMouseLeave={() => setHoveredProduct(null)}
                  >
                    <div style={{
                      background: "white",
                      borderRadius: "14px", overflow: "hidden",
                      border: `2px solid ${hoveredProduct === i ? color : "transparent"}`,
                      transition: "all 0.35s ease",
                      transform: hoveredProduct === i ? "translateY(-5px)" : "translateY(0)",
                      boxShadow: hoveredProduct === i
                        ? "0 16px 40px rgba(0,0,0,0.12)"
                        : "0 3px 12px rgba(0,0,0,0.07)",
                      cursor: "pointer",
                    }}>
                      {/* Image */}
                      <div style={{
                        height: "150px", background: "#FDF8F0",
                        display: "flex", alignItems: "center",
                        justifyContent: "center", padding: "6px",
                        position: "relative", overflow: "hidden",
                      }}>
                        {product.images?.[0] ? (
                          <img
                            src={product.images[0]}
                            alt={product.name}
                            style={{
                              maxWidth: "100%", maxHeight: "100%",
                              objectFit: "contain",
                              transition: "transform 0.5s ease",
                              transform: hoveredProduct === i ? "scale(1.07)" : "scale(1)",
                            }}
                          />
                        ) : (
                          <div style={{
                            display: "flex", flexDirection: "column",
                            alignItems: "center", color: LIGHT,
                          }}>
                            <div style={{ fontSize: "24px", opacity: 0.4 }}>📷</div>
                          </div>
                        )}

                        {/* Category badge */}
                        <div style={{
                          position: "absolute", top: "7px", left: "7px",
                          background: color, borderRadius: "20px", padding: "2px 8px",
                        }}>
                          <span style={{
                            color: "white", fontSize: "8px", fontWeight: "800",
                            letterSpacing: "1px", textTransform: "uppercase",
                            fontFamily: "'Outfit', sans-serif",
                          }}>
                            {product.category}
                          </span>
                        </div>

                        {/* Hover overlay */}
                        {hoveredProduct === i && (
                          <div style={{
                            position: "absolute", inset: 0,
                            background: `${color}12`,
                            display: "flex", alignItems: "center",
                            justifyContent: "center",
                          }}>
                            <span style={{
                              background: color, color: "white",
                              padding: "7px 18px", borderRadius: "50px",
                              fontFamily: "'Outfit', sans-serif",
                              fontWeight: "700", fontSize: "11px",
                            }}>
                              View Product →
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Info */}
                      <div style={{ padding: "11px 13px" }}>
                        <h3 style={{
                          fontFamily: "'Outfit', sans-serif",
                          fontSize: "13px", fontWeight: "700",
                          color: DARK, marginBottom: "5px",
                          whiteSpace: "nowrap", overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}>
                          {product.name}
                        </h3>

                        {product.sizes?.length > 0 && product.sizes[0] !== "Custom" && (
                          <div style={{
                            display: "flex", gap: "3px",
                            flexWrap: "wrap", marginBottom: "7px",
                          }}>
                            {product.sizes.slice(0, 4).map((size) => (
                              <span key={size} style={{
                                background: "rgba(139,105,20,0.07)",
                                border: "1px solid rgba(139,105,20,0.18)",
                                borderRadius: "4px", padding: "1px 5px",
                                fontSize: "8px", fontWeight: "600",
                                color: GOLD, fontFamily: "'Outfit', sans-serif",
                              }}>
                                {size}
                              </span>
                            ))}
                          </div>
                        )}

                        <div style={{
                          display: "flex", justifyContent: "space-between",
                          alignItems: "center",
                        }}>
                          <div>
                            <div style={{
                              fontFamily: "'Bebas Neue', cursive",
                              fontSize: "18px", color: GOLD,
                              letterSpacing: "1px", lineHeight: "1",
                            }}>
                              KSh {product.price?.toLocaleString()}
                            </div>
                            {product.delivery > 0 && (
                              <div style={{
                                color: LIGHT, fontSize: "9px",
                                fontFamily: "'Outfit', sans-serif",
                              }}>
                                + KSh {product.delivery} delivery
                              </div>
                            )}
                          </div>
                          <div style={{
                            width: "28px", height: "28px", borderRadius: "50%",
                            background: hoveredProduct === i ? color : "rgba(139,105,20,0.1)",
                            display: "flex", alignItems: "center",
                            justifyContent: "center", transition: "all 0.3s",
                          }}>
                            <span style={{
                              color: hoveredProduct === i ? "white" : GOLD,
                              fontSize: "12px", fontWeight: "700",
                            }}>
                              →
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>

            <div style={{ textAlign: "center" }}>
              <Link href="/products" style={{ textDecoration: "none" }}>
                <button style={{
                  background: CARD_BG, color: DARK,
                  border: `1px solid ${CARD_BORDER}`,
                  borderRadius: "50px", padding: "11px 32px",
                  fontFamily: "'Outfit', sans-serif",
                  fontWeight: "700", fontSize: "13px",
                  cursor: "pointer", transition: "all 0.3s",
                }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = `linear-gradient(135deg, ${GOLD}, #6B5010)`;
                    e.currentTarget.style.color = "white";
                    e.currentTarget.style.borderColor = "transparent";
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = CARD_BG;
                    e.currentTarget.style.color = DARK;
                    e.currentTarget.style.borderColor = CARD_BORDER;
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  View All Products →
                </button>
              </Link>
            </div>
          </div>
        </section>

        {/* ── HOW IT WORKS ── */}
        <section style={{
          padding: "60px 5%",
          background: "rgba(255,255,255,0.3)",
          borderTop: "1px solid rgba(139,105,20,0.15)",
          borderBottom: "1px solid rgba(139,105,20,0.15)",
        }}>
          <div style={{ maxWidth: "1380px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "36px" }}>
              <h2 style={{
                fontFamily: "'Bebas Neue', cursive",
                fontSize: "clamp(28px, 4vw, 48px)",
                letterSpacing: "3px", color: DARK,
              }}>
                How It <span style={{ color: GOLD }}>Works</span>
              </h2>
            </div>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "14px",
            }} className="how-grid">
              {[
                { num: "01", icon: "📤", title: "Upload Design", desc: "Share your artwork via WhatsApp, email, or our contact form.", color: GOLD },
                { num: "02", icon: "👕", title: "Choose Product", desc: "Pick from our wide range of printable products and apparel.", color: "#A0892A" },
                { num: "03", icon: "🛒", title: "Place Order", desc: "Confirm details, quantity and make payment to get started.", color: "#8B6914" },
                { num: "04", icon: "🚚", title: "Delivery", desc: "We print, package and deliver your order across Kenya.", color: "#C49A3C" },
              ].map((step) => (
                <div key={step.num} style={{
                  background: CARD_BG,
                  border: `1px solid ${CARD_BORDER}`,
                  borderRadius: "16px", padding: "22px",
                  position: "relative", overflow: "hidden",
                  boxShadow: "0 2px 10px rgba(139,105,20,0.06)",
                }}>
                  <div style={{
                    position: "absolute", top: "-10px", right: "10px",
                    fontFamily: "'Bebas Neue', cursive",
                    fontSize: "64px", color: step.color,
                    opacity: 0.07, lineHeight: "1",
                  }}>
                    {step.num}
                  </div>
                  <div style={{
                    width: "46px", height: "46px", borderRadius: "12px",
                    background: `${step.color}15`,
                    display: "flex", alignItems: "center",
                    justifyContent: "center", fontSize: "20px", marginBottom: "14px",
                  }}>
                    {step.icon}
                  </div>
                  <h3 style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: "15px", fontWeight: "700",
                    color: DARK, marginBottom: "6px",
                  }}>
                    {step.title}
                  </h3>
                  <p style={{
                    color: MID, fontSize: "12px",
                    lineHeight: "1.6", fontFamily: "'Outfit', sans-serif",
                  }}>
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── TESTIMONIALS ── */}
        <section style={{ padding: "60px 5%" }}>
          <div style={{ maxWidth: "1380px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "36px" }}>
              <h2 style={{
                fontFamily: "'Bebas Neue', cursive",
                fontSize: "clamp(28px, 4vw, 48px)",
                letterSpacing: "3px", color: DARK,
              }}>
                What Clients <span style={{ color: GOLD }}>Say</span>
              </h2>
            </div>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "16px",
            }} className="testimonials-grid">
              {[
                { name: "James Mwangi", role: " TechStartup Kenya", text: "Manuprints delivered our corporate branded t-shirts in record time. Outstanding quality and a very professional team throughout.", color: GOLD },
                { name: "Amina Hassan", role: "Events Manager", text: "We have used Manuprints for three major events. Their 3D signage work is world-class. Our booth always stands out!", color: "#A0892A" },
                { name: "Kevin Otieno", role: "Small Business Owner", text: "Affordable pricing, top-tier quality, and amazing service. Manuprints is my go-to for all branding and printing needs!", color: "#C49A3C" },
              ].map((t) => (
                <div key={t.name} style={{
                  background: CARD_BG,
                  border: `1px solid ${CARD_BORDER}`,
                  borderRadius: "16px", padding: "24px",
                  boxShadow: "0 2px 10px rgba(139,105,20,0.06)",
                }}>
                  <div style={{ display: "flex", gap: "4px", marginBottom: "14px" }}>
                    {[...Array(5)].map((_, j) => (
                      <span key={j} style={{ color: GOLD, fontSize: "15px" }}>★</span>
                    ))}
                  </div>
                  <p style={{
                    color: MID, fontSize: "13px",
                    lineHeight: "1.7", fontFamily: "'Outfit', sans-serif",
                    marginBottom: "16px",
                  }}>
                    "{t.text}"
                  </p>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <div style={{
                      width: "40px", height: "40px", borderRadius: "50%",
                      background: `linear-gradient(135deg, ${t.color}, #6B5010)`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontFamily: "'Bebas Neue', cursive",
                      fontSize: "18px", color: "white",
                      boxShadow: `0 4px 12px ${t.color}40`,
                    }}>
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <div style={{
                        color: DARK, fontWeight: "700",
                        fontSize: "13px", fontFamily: "'Outfit', sans-serif",
                      }}>
                        {t.name}
                      </div>
                      <div style={{
                        color: t.color, fontSize: "11px",
                        fontFamily: "'Outfit', sans-serif",
                      }}>
                        {t.role}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section style={{ padding: "60px 5%" }}>
          <div style={{
            maxWidth: "1380px", margin: "0 auto",
            background: "linear-gradient(135deg, rgba(139,105,20,0.15), rgba(107,80,16,0.15))",
            border: "1px solid rgba(139,105,20,0.3)",
            borderRadius: "20px", padding: "52px 36px",
            textAlign: "center",
            boxShadow: "0 8px 36px rgba(139,105,20,0.12)",
          }}>
            <h2 style={{
              fontFamily: "'Bebas Neue', cursive",
              fontSize: "clamp(32px, 5vw, 60px)",
              letterSpacing: "3px", color: DARK,
              lineHeight: "1", marginBottom: "14px",
            }}>
              Ready To Build <span style={{ color: GOLD }}>Your Brand?</span>
            </h2>
            <p style={{
              color: MID, fontSize: "14px",
              lineHeight: "1.7", fontFamily: "'Outfit', sans-serif",
              maxWidth: "500px", margin: "0 auto 30px",
            }}>
              Contact us today and lets create something amazing together.
              Fast turnaround, premium quality, unbeatable prices.
            </p>
            <div style={{
              display: "flex", gap: "12px",
              justifyContent: "center", flexWrap: "wrap",
            }}>
              <Link href="/contact" style={{ textDecoration: "none" }}>
                <button style={{
                  background: `linear-gradient(135deg, ${GOLD}, #6B5010)`,
                  color: "white", border: "none",
                  borderRadius: "50px", padding: "13px 36px",
                  fontFamily: "'Outfit', sans-serif",
                  fontWeight: "700", fontSize: "14px",
                  cursor: "pointer",
                  boxShadow: "0 6px 20px rgba(139,105,20,0.4)",
                  transition: "all 0.3s",
                }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow = "0 10px 28px rgba(139,105,20,0.5)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 6px 20px rgba(139,105,20,0.4)";
                  }}
                >
                  Start Your Order
                </button>
              </Link>
              <button
                onClick={() => window.open("https://wa.me/254740643789", "_blank")}
                style={{
                  background: "#25D366", color: "white",
                  border: "none", borderRadius: "50px",
                  padding: "13px 36px",
                  fontFamily: "'Outfit', sans-serif",
                  fontWeight: "700", fontSize: "14px",
                  cursor: "pointer", transition: "all 0.3s",
                  boxShadow: "0 6px 20px rgba(37,211,102,0.35)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "0 10px 28px rgba(37,211,102,0.5)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 6px 20px rgba(37,211,102,0.35)";
                }}
              >
                WhatsApp Us
              </button>
            </div>
          </div>
        </section>
      </div>

      <style>{`
        @media (max-width: 1200px) {
          .hero-product-grid { grid-template-columns: repeat(3, 1fr) !important; }
          .hero-top-row { grid-template-columns: 1fr !important; }
          .hero-feature-cards { grid-template-columns: 1fr 1fr !important; }
          .products-section-grid { grid-template-columns: repeat(3, 1fr) !important; }
        }
        @media (max-width: 900px) {
          .hero-product-grid { grid-template-columns: repeat(3, 1fr) !important; }
          .services-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .products-section-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .how-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .testimonials-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 600px) {
          .hero-product-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .hero-feature-cards { grid-template-columns: 1fr 1fr !important; }
          .services-grid { grid-template-columns: 1fr !important; }
          .how-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </Layout>
  );
}