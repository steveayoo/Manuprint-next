"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import Layout from "@/components/Layout";

const GOLD = "#8B6914";
const DARK = "#2C1810";
const MID = "#5C3D2E";
const LIGHT = "#8B6E5A";
const CARD_BG = "rgba(255,255,255,0.88)";
const CARD_BORDER = "rgba(139,105,20,0.2)";

export default function ProductDetail() {
  const params = useParams();
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeImg, setActiveImg] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [hovered, setHovered] = useState(null);

  useEffect(() => {
    if (!params?.id) return;

    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(`/api/products/${params.id}`, {
          cache: "no-store",
        });

        if (!res.ok) {
          const errData = await res.json();
          throw new Error(errData.message || "Product not found");
        }

        const data = await res.json();
        setProduct(data);

        // Fetch related products
        try {
          const allRes = await fetch("/api/products", { cache: "no-store" });
          if (allRes.ok) {
            const allData = await allRes.json();
            const rel = allData
              .filter(p => p.category === data.category && p._id !== data._id)
              .slice(0, 3);
            setRelated(rel);
          }
        } catch {
          // Related products are optional
        }
      } catch (err) {
        console.error("Error fetching product:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [params?.id]);

  if (loading) {
    return (
      <Layout>
        <div style={{
          minHeight: "100vh",
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
          paddingTop: "68px",
          fontFamily: "'Outfit', sans-serif",
        }}>
          <div style={{
            width: "50px", height: "50px", borderRadius: "50%",
            border: `3px solid rgba(139,105,20,0.2)`,
            borderTop: `3px solid ${GOLD}`,
            animation: "spin 1s linear infinite",
            marginBottom: "16px",
          }} />
          <p style={{ color: MID, fontSize: "14px" }}>Loading product...</p>
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      </Layout>
    );
  }

  if (error || !product) {
    return (
      <Layout>
        <div style={{
          minHeight: "100vh",
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
          paddingTop: "68px", textAlign: "center",
          padding: "100px 20px 20px",
          fontFamily: "'Outfit', sans-serif",
        }}>
          <div style={{ fontSize: "48px", marginBottom: "16px" }}>😕</div>
          <h2 style={{
            fontFamily: "'Bebas Neue', cursive",
            fontSize: "32px", color: DARK,
            letterSpacing: "2px", marginBottom: "8px",
          }}>
            Product Not Found
          </h2>
          <p style={{
            color: MID, fontSize: "14px",
            marginBottom: "24px", fontFamily: "'Outfit', sans-serif",
          }}>
            {error || "This product may have been removed or does not exist."}
          </p>
          <Link href="/products" style={{ textDecoration: "none" }}>
            <button style={{
              background: `linear-gradient(135deg, ${GOLD}, #6B5010)`,
              color: "white", border: "none",
              borderRadius: "50px", padding: "12px 28px",
              fontFamily: "'Outfit', sans-serif",
              fontWeight: "700", fontSize: "14px",
              cursor: "pointer",
              boxShadow: "0 4px 14px rgba(139,105,20,0.35)",
            }}>
              Back to Products
            </button>
          </Link>
        </div>
      </Layout>
    );
  }

  const total = product.price * quantity + (product.delivery || 0);
  const viewLabels = ["Front View", "Side View", "Back View"];

  const handleWhatsApp = () => {
    const msg = `Hello Manuprints! I would like to enquire about:\n\n*Product:* ${product.name}\n*Size:* ${selectedSize || "Not specified"}\n*Quantity:* ${quantity}\n*Total:* KSh ${total.toLocaleString()}\n\nPlease confirm availability and payment details.`;
    window.open(`https://wa.me/254740643789?text=${encodeURIComponent(msg)}`, "_blank");
  };

  const handleEmail = () => {
    window.location.href = `mailto:elphasopiyo17@gmail.com?subject=Enquiry: ${product.name}&body=Hi Manuprints,%0A%0AProduct: ${product.name}%0ASize: ${selectedSize || "TBD"}%0AQuantity: ${quantity}%0ATotal: KSh ${total.toLocaleString()}%0A%0APlease confirm availability and payment details.`;
  };

  return (
    <Layout>
      <div style={{
        minHeight: "100vh",
        paddingTop: "68px",
        fontFamily: "'Outfit', sans-serif",
      }}>
        <div style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "20px 5%",
        }}>

          {/* Back Button */}
          <button
            onClick={() => router.back()}
            style={{
              background: CARD_BG,
              border: `1px solid ${CARD_BORDER}`,
              borderRadius: "8px", padding: "8px 16px",
              color: MID, fontFamily: "'Outfit', sans-serif",
              fontSize: "12px", fontWeight: "600",
              cursor: "pointer", marginBottom: "20px",
              display: "flex", alignItems: "center", gap: "6px",
              transition: "all 0.3s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = GOLD;
              e.currentTarget.style.color = GOLD;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = CARD_BORDER;
              e.currentTarget.style.color = MID;
            }}
          >
            ← Back
          </button>

          {/* Main Grid */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "24px", alignItems: "start",
          }} className="detail-grid">

            {/* LEFT — Images */}
            <div>
              {/* Main Image */}
              <div style={{
                width: "100%", height: "380px",
                borderRadius: "16px",
                border: `1px solid ${CARD_BORDER}`,
                marginBottom: "12px",
                background: "white",
                display: "flex", alignItems: "center",
                justifyContent: "center", padding: "16px",
                overflow: "hidden", position: "relative",
                boxShadow: "0 4px 20px rgba(139,105,20,0.1)",
              }}>
                {product.images?.length > 0 && product.images[activeImg] ? (
                  <img
                    src={product.images[activeImg]}
                    alt={product.name}
                    style={{
                      maxWidth: "100%", maxHeight: "100%",
                      objectFit: "contain",
                      transition: "all 0.4s ease",
                    }}
                  />
                ) : (
                  <div style={{
                    display: "flex", flexDirection: "column",
                    alignItems: "center", justifyContent: "center",
                    color: LIGHT,
                  }}>
                    <div style={{ fontSize: "48px", marginBottom: "8px", opacity: 0.3 }}>📷</div>
                    <p style={{ fontSize: "13px", fontFamily: "'Outfit', sans-serif" }}>
                      No photo available
                    </p>
                  </div>
                )}

                {/* View label */}
                {product.images?.length > 0 && product.images[activeImg] && (
                  <div style={{
                    position: "absolute", bottom: "14px", left: "14px",
                    background: GOLD, borderRadius: "20px", padding: "4px 14px",
                    boxShadow: "0 3px 10px rgba(139,105,20,0.35)",
                  }}>
                    <span style={{
                      color: "white", fontSize: "10px",
                      fontWeight: "700", fontFamily: "'Outfit', sans-serif",
                    }}>
                      {viewLabels[activeImg] || `View ${activeImg + 1}`}
                    </span>
                  </div>
                )}
              </div>

              {/* Thumbnails */}
              {product.images?.length > 0 && (
                <div>
                  <div style={{ display: "flex", gap: "10px", marginBottom: "6px", flexWrap: "wrap" }}>
                    {product.images.map((img, i) => (
                      <div
                        key={i}
                        onClick={() => setActiveImg(i)}
                        style={{
                          width: "76px", height: "76px",
                          borderRadius: "10px",
                          border: `2px solid ${activeImg === i ? GOLD : CARD_BORDER}`,
                          background: "white",
                          display: "flex", alignItems: "center",
                          justifyContent: "center",
                          padding: "4px", cursor: "pointer",
                          overflow: "hidden",
                          boxShadow: activeImg === i
                            ? "0 0 0 3px rgba(139,105,20,0.15)" : "none",
                          transition: "all 0.2s",
                        }}
                      >
                        <img
                          src={img}
                          alt={`View ${i + 1}`}
                          style={{
                            width: "100%", height: "100%",
                            objectFit: "contain",
                          }}
                        />
                      </div>
                    ))}
                  </div>

                  {product.images.length > 1 && (
                    <div style={{ display: "flex", gap: "10px" }}>
                      {product.images.map((_, i) => (
                        <div key={i} style={{ width: "76px", textAlign: "center" }}>
                          <span style={{
                            color: activeImg === i ? GOLD : LIGHT,
                            fontSize: "9px", fontWeight: "700",
                            fontFamily: "'Outfit', sans-serif",
                            textTransform: "uppercase", letterSpacing: "0.5px",
                          }}>
                            {viewLabels[i] || `View ${i + 1}`}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* RIGHT — Details */}
            <div>
              {/* Category Badge */}
              <div style={{
                display: "inline-block",
                background: "rgba(139,105,20,0.1)",
                border: "1px solid rgba(139,105,20,0.25)",
                borderRadius: "20px", padding: "3px 14px",
                marginBottom: "10px",
              }}>
                <span style={{
                  color: GOLD, fontSize: "11px", fontWeight: "700",
                  letterSpacing: "1px", textTransform: "uppercase",
                  fontFamily: "'Outfit', sans-serif",
                }}>
                  {product.category}
                </span>
              </div>

              {/* Product Name */}
              <h1 style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: "clamp(20px, 3vw, 30px)",
                fontWeight: "800", color: DARK,
                lineHeight: "1.15", marginBottom: "10px",
              }}>
                {product.name}
              </h1>

              {/* Description */}
              {product.description && (
                <p style={{
                  color: MID, fontSize: "13px",
                  lineHeight: "1.7", marginBottom: "16px",
                  fontFamily: "'Outfit', sans-serif",
                }}>
                  {product.description}
                </p>
              )}

              {/* Specs Grid */}
              <div style={{
                background: CARD_BG,
                border: `1px solid ${CARD_BORDER}`,
                borderRadius: "12px", padding: "14px 16px",
                marginBottom: "14px",
                display: "grid", gridTemplateColumns: "1fr 1fr",
                gap: "10px",
                boxShadow: "0 2px 8px rgba(139,105,20,0.06)",
              }}>
                {[
                  { label: "Material", value: product.fabric || "N/A" },
                  { label: "Sizes", value: product.sizes?.join(", ") || "N/A" },
                  { label: "Customization", value: "Full custom print" },
                  { label: "Min. Order", value: "1 unit" },
                ].map((spec) => (
                  <div key={spec.label} style={{
                    padding: "6px 0",
                    borderBottom: "1px solid rgba(139,105,20,0.06)",
                  }}>
                    <p style={{
                      color: LIGHT, fontSize: "10px",
                      fontWeight: "700", textTransform: "uppercase",
                      letterSpacing: "0.5px", marginBottom: "3px",
                      fontFamily: "'Outfit', sans-serif",
                    }}>
                      {spec.label}
                    </p>
                    <p style={{
                      color: DARK, fontSize: "12px",
                      fontWeight: "600", fontFamily: "'Outfit', sans-serif",
                    }}>
                      {spec.value}
                    </p>
                  </div>
                ))}
              </div>

              {/* Size Selector */}
              {product.sizes?.length > 0 && product.sizes[0] !== "Custom" && (
                <div style={{ marginBottom: "14px" }}>
                  <p style={{
                    color: DARK, fontSize: "12px", fontWeight: "700",
                    textTransform: "uppercase", letterSpacing: "1px",
                    marginBottom: "8px", fontFamily: "'Outfit', sans-serif",
                  }}>
                    Select Size
                  </p>
                  <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        style={{
                          background: selectedSize === size
                            ? `linear-gradient(135deg, ${GOLD}, #6B5010)` : CARD_BG,
                          color: selectedSize === size ? "white" : MID,
                          border: `1px solid ${selectedSize === size ? "transparent" : CARD_BORDER}`,
                          borderRadius: "8px", padding: "7px 14px",
                          fontFamily: "'Outfit', sans-serif",
                          fontWeight: "600", fontSize: "12px",
                          cursor: "pointer", transition: "all 0.2s",
                          boxShadow: selectedSize === size
                            ? "0 4px 12px rgba(139,105,20,0.3)" : "none",
                        }}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div style={{ marginBottom: "14px" }}>
                <p style={{
                  color: DARK, fontSize: "12px", fontWeight: "700",
                  textTransform: "uppercase", letterSpacing: "1px",
                  marginBottom: "8px", fontFamily: "'Outfit', sans-serif",
                }}>
                  Quantity
                </p>
                <div style={{ display: "flex", alignItems: "center", width: "fit-content" }}>
                  <button
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    style={{
                      width: "36px", height: "36px",
                      background: CARD_BG,
                      border: `1px solid ${CARD_BORDER}`,
                      borderRadius: "8px 0 0 8px",
                      color: GOLD, fontSize: "18px",
                      cursor: "pointer", fontWeight: "700",
                      display: "flex", alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    −
                  </button>
                  <div style={{
                    width: "52px", height: "36px",
                    background: CARD_BG,
                    border: `1px solid ${CARD_BORDER}`,
                    borderLeft: "none", borderRight: "none",
                    display: "flex", alignItems: "center",
                    justifyContent: "center",
                    color: DARK, fontWeight: "700",
                    fontSize: "14px", fontFamily: "'Outfit', sans-serif",
                  }}>
                    {quantity}
                  </div>
                  <button
                    onClick={() => setQuantity(q => q + 1)}
                    style={{
                      width: "36px", height: "36px",
                      background: CARD_BG,
                      border: `1px solid ${CARD_BORDER}`,
                      borderRadius: "0 8px 8px 0",
                      color: GOLD, fontSize: "18px",
                      cursor: "pointer", fontWeight: "700",
                      display: "flex", alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Price Summary */}
              <div style={{
                background: "rgba(139,105,20,0.06)",
                border: "1px solid rgba(139,105,20,0.15)",
                borderRadius: "12px", padding: "14px 16px",
                marginBottom: "16px",
                display: "flex", justifyContent: "space-between",
                alignItems: "center",
                boxShadow: "0 2px 8px rgba(139,105,20,0.06)",
              }}>
                <div>
                  <p style={{
                    color: LIGHT, fontSize: "11px",
                    fontFamily: "'Outfit', sans-serif", marginBottom: "2px",
                  }}>
                    {quantity} x KSh {product.price?.toLocaleString()}
                    {product.delivery > 0
                      ? ` + KSh ${product.delivery} delivery`
                      : " (Free delivery)"}
                  </p>
                  <p style={{
                    color: MID, fontSize: "11px",
                    fontFamily: "'Outfit', sans-serif", fontWeight: "600",
                  }}>
                    Total Amount
                  </p>
                </div>
                <span style={{
                  fontFamily: "'Bebas Neue', cursive",
                  fontSize: "30px", color: GOLD, letterSpacing: "1px",
                }}>
                  KSh {total.toLocaleString()}
                </span>
              </div>

              {/* Action Buttons */}
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <button
                  onClick={handleWhatsApp}
                  style={{
                    background: "#25D366", color: "white",
                    border: "none", borderRadius: "10px", padding: "14px",
                    fontFamily: "'Outfit', sans-serif",
                    fontWeight: "700", fontSize: "14px",
                    cursor: "pointer", transition: "all 0.3s",
                    boxShadow: "0 4px 16px rgba(37,211,102,0.3)",
                    display: "flex", alignItems: "center",
                    justifyContent: "center", gap: "8px",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow = "0 8px 24px rgba(37,211,102,0.4)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 4px 16px rgba(37,211,102,0.3)";
                  }}
                >
                  💬 Enquire via WhatsApp
                </button>

                <button
                  onClick={handleEmail}
                  style={{
                    background: CARD_BG, color: DARK,
                    border: `2px solid ${CARD_BORDER}`,
                    borderRadius: "10px", padding: "12px",
                    fontFamily: "'Outfit', sans-serif",
                    fontWeight: "700", fontSize: "14px",
                    cursor: "pointer", transition: "all 0.3s",
                    display: "flex", alignItems: "center",
                    justifyContent: "center", gap: "8px",
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
                  ✉️ Enquire via Email
                </button>

                {/* Info Note */}
                <div style={{
                  background: "rgba(139,105,20,0.06)",
                  border: "1px solid rgba(139,105,20,0.15)",
                  borderRadius: "8px", padding: "10px 14px",
                  display: "flex", gap: "8px", alignItems: "flex-start",
                }}>
                  <span style={{ fontSize: "14px", flexShrink: 0 }}>ℹ️</span>
                  <p style={{
                    color: MID, fontSize: "11px",
                    fontFamily: "'Outfit', sans-serif", lineHeight: "1.5",
                  }}>
                    Click enquire to send your order details to Manuprints.
                    Our team will confirm availability and payment within a few hours.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Related Products */}
          {related.length > 0 && (
            <div style={{ marginTop: "48px" }}>
              <h3 style={{
                fontFamily: "'Bebas Neue', cursive",
                fontSize: "26px", letterSpacing: "2px",
                color: DARK, marginBottom: "16px",
              }}>
                Related <span style={{ color: GOLD }}>Products</span>
              </h3>
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "16px",
              }} className="related-grid">
                {related.map((p) => (
                  <Link
                    key={p._id}
                    href={`/products/${p._id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <div style={{
                      background: "white",
                      borderRadius: "12px", overflow: "hidden",
                      border: "1px solid rgba(139,105,20,0.12)",
                      transition: "all 0.3s",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                      cursor: "pointer",
                    }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = GOLD;
                        e.currentTarget.style.transform = "translateY(-3px)";
                        e.currentTarget.style.boxShadow = "0 10px 28px rgba(139,105,20,0.12)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = "rgba(139,105,20,0.12)";
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.06)";
                      }}
                    >
                      <div style={{
                        height: "140px", background: "#FDF8F0",
                        display: "flex", alignItems: "center",
                        justifyContent: "center", padding: "8px",
                        borderBottom: "1px solid rgba(139,105,20,0.08)",
                        overflow: "hidden",
                      }}>
                        {p.images?.[0] ? (
                          <img
                            src={p.images[0]}
                            alt={p.name}
                            style={{
                              maxWidth: "100%", maxHeight: "100%",
                              objectFit: "contain",
                            }}
                          />
                        ) : (
                          <div style={{ fontSize: "28px", opacity: 0.2 }}>📷</div>
                        )}
                      </div>
                      <div style={{ padding: "12px" }}>
                        <p style={{
                          color: DARK, fontWeight: "700",
                          fontSize: "13px", marginBottom: "4px",
                          fontFamily: "'Outfit', sans-serif",
                          whiteSpace: "nowrap", overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}>
                          {p.name}
                        </p>
                        <div style={{
                          display: "flex", justifyContent: "space-between",
                          alignItems: "center",
                        }}>
                          <span style={{
                            fontFamily: "'Bebas Neue', cursive",
                            fontSize: "18px", color: GOLD, letterSpacing: "1px",
                          }}>
                            KSh {p.price?.toLocaleString()}
                          </span>
                          <span style={{
                            color: GOLD, fontSize: "11px",
                            fontFamily: "'Outfit', sans-serif", fontWeight: "700",
                          }}>
                            View →
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        <style>{`
          @media (max-width: 768px) {
            .detail-grid { grid-template-columns: 1fr !important; }
            .related-grid { grid-template-columns: 1fr 1fr !important; }
          }
        `}</style>
      </div>
    </Layout>
  );
}