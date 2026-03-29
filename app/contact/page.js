"use client";
import { useState } from "react";
import Layout from "@/components/Layout";
import toast from "react-hot-toast";

const GOLD = "#8B6914";
const DARK = "#2C1810";
const MID = "#5C3D2E";
const LIGHT = "#8B6E5A";
const CARD_BG = "rgba(255,255,255,0.88)";
const CARD_BORDER = "rgba(139,105,20,0.2)";

export default function Contact() {
  const [form, setForm] = useState({
    name: "", email: "", phone: "", service: "", message: "",
  });

  const services = [
    "Printing", "Branding", "Graphic Design",
    "3D Signages", "Fabrication", "Screen Printing", "Other",
  ];

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleWhatsApp = () => {
    if (!form.name || !form.message) {
      toast.error("Please fill in your name and message.");
      return;
    }
    const msg = `Hello Manuprints!%0A%0A*Name:* ${form.name}%0A*Email:* ${form.email}%0A*Phone:* ${form.phone}%0A*Service:* ${form.service}%0A%0A*Message:*%0A${form.message}`;
    window.open(`https://wa.me/254740643789?text=${msg}`, "_blank");
    toast.success("Redirecting to WhatsApp!");
    setForm({ name: "", email: "", phone: "", service: "", message: "" });
  };

  const handleEmail = () => {
    if (!form.name) { toast.error("Please enter your name."); return; }
    window.location.href = `mailto:elphasopiyo17@gmail.com?subject=Enquiry from ${form.name}&body=${form.message}`;
  };

  const inputStyle = {
    width: "100%",
    background: "rgba(255,255,255,0.9)",
    border: `1px solid ${CARD_BORDER}`,
    borderRadius: "10px", padding: "11px 15px",
    color: DARK, fontSize: "13px",
    fontFamily: "'Outfit', sans-serif",
    outline: "none", transition: "all 0.3s",
  };

  const labelStyle = {
    color: MID, fontSize: "11px", fontWeight: "700",
    letterSpacing: "1px", textTransform: "uppercase",
    display: "block", marginBottom: "6px",
    fontFamily: "'Outfit', sans-serif",
  };

  return (
    <Layout>
      <div style={{
        minHeight: "100vh", paddingTop: "68px",
        fontFamily: "'Outfit', sans-serif",
      }}>
        <div style={{
          maxWidth: "1300px", margin: "0 auto",
          padding: "24px 5%",
          display: "flex", flexDirection: "column", gap: "18px",
        }}>

          {/* Title */}
          <div style={{ textAlign: "center", marginBottom: "4px" }}>
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
                Reach Out
              </span>
            </div>
            <h1 style={{
              fontFamily: "'Bebas Neue', cursive",
              fontSize: "clamp(28px, 4vw, 48px)",
              letterSpacing: "2px", color: DARK, lineHeight: "1",
            }}>
              Get In <span style={{ color: GOLD }}>Touch</span>
            </h1>
            <p style={{
              color: MID, fontSize: "14px", marginTop: "8px",
              fontFamily: "'Outfit', sans-serif", lineHeight: "1.6",
            }}>
              Ready to start your project? Reach out and we will get back to you within a few hours.
            </p>
          </div>

          {/* Contact Info Cards */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "12px",
          }} className="contact-info-grid">
            {[
              { icon: "📱", label: "WhatsApp", value: "0740 643 789", link: "https://wa.me/254740643789", color: "#25D366" },
              { icon: "📞", label: "Phone", value: "0711 499 798", link: "tel:0711499798", color: GOLD },
              { icon: "✉️", label: "Email", value: "elphasopiyo17@gmail.com", link: "mailto:elphasopiyo17@gmail.com", color: GOLD },
              { icon: "📍", label: "Location", value: "Nairobi, Kenya", link: null, color: GOLD },
            ].map((item) => (
              <div
                key={item.label}
                style={{
                  background: CARD_BG,
                  border: `1px solid ${CARD_BORDER}`,
                  borderRadius: "14px", padding: "14px",
                  display: "flex", alignItems: "center", gap: "12px",
                  cursor: item.link ? "pointer" : "default",
                  transition: "all 0.3s",
                  boxShadow: "0 2px 8px rgba(139,105,20,0.06)",
                }}
                onClick={() => item.link && window.open(item.link, "_blank")}
                onMouseEnter={(e) => {
                  if (item.link) {
                    e.currentTarget.style.borderColor = GOLD;
                    e.currentTarget.style.transform = "translateY(-3px)";
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = CARD_BORDER;
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <div style={{
                  width: "40px", height: "40px", borderRadius: "10px",
                  background: "rgba(139,105,20,0.08)",
                  display: "flex", alignItems: "center",
                  justifyContent: "center", fontSize: "18px", flexShrink: 0,
                }}>
                  {item.icon}
                </div>
                <div style={{ minWidth: 0 }}>
                  <p style={{
                    color: LIGHT, fontSize: "10px", fontWeight: "700",
                    letterSpacing: "1px", textTransform: "uppercase",
                    marginBottom: "2px", fontFamily: "'Outfit', sans-serif",
                  }}>
                    {item.label}
                  </p>
                  <p style={{
                    color: item.color, fontSize: "12px", fontWeight: "700",
                    fontFamily: "'Outfit', sans-serif",
                    whiteSpace: "nowrap", overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}>
                    {item.value}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Main Content */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 320px",
            gap: "18px",
          }} className="contact-main-grid">

            {/* Form */}
            <div style={{
              background: CARD_BG,
              border: `1px solid ${CARD_BORDER}`,
              borderRadius: "16px", padding: "24px",
              boxShadow: "0 2px 12px rgba(139,105,20,0.06)",
            }}>
              <h2 style={{
                fontFamily: "'Bebas Neue', cursive",
                fontSize: "24px", letterSpacing: "2px",
                color: DARK, marginBottom: "20px",
              }}>
                Send A <span style={{ color: GOLD }}>Message</span>
              </h2>

              <div style={{
                display: "grid", gridTemplateColumns: "1fr 1fr",
                gap: "12px", marginBottom: "12px",
              }} className="form-row">
                <div>
                  <label style={labelStyle}>Full Name *</label>
                  <input
                    type="text" name="name"
                    placeholder="Your full name"
                    value={form.name} onChange={handleChange}
                    style={inputStyle}
                    onFocus={(e) => { e.target.style.borderColor = GOLD; }}
                    onBlur={(e) => { e.target.style.borderColor = CARD_BORDER; }}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Email Address</label>
                  <input
                    type="email" name="email"
                    placeholder="your@email.com"
                    value={form.email} onChange={handleChange}
                    style={inputStyle}
                    onFocus={(e) => { e.target.style.borderColor = GOLD; }}
                    onBlur={(e) => { e.target.style.borderColor = CARD_BORDER; }}
                  />
                </div>
              </div>

              <div style={{
                display: "grid", gridTemplateColumns: "1fr 1fr",
                gap: "12px", marginBottom: "12px",
              }} className="form-row">
                <div>
                  <label style={labelStyle}>Phone Number</label>
                  <input
                    type="tel" name="phone"
                    placeholder="07XX XXX XXX"
                    value={form.phone} onChange={handleChange}
                    style={inputStyle}
                    onFocus={(e) => { e.target.style.borderColor = GOLD; }}
                    onBlur={(e) => { e.target.style.borderColor = CARD_BORDER; }}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Service Needed</label>
                  <select
                    name="service" value={form.service}
                    onChange={handleChange}
                    style={{ ...inputStyle, cursor: "pointer" }}
                    onFocus={(e) => { e.target.style.borderColor = GOLD; }}
                    onBlur={(e) => { e.target.style.borderColor = CARD_BORDER; }}
                  >
                    <option value="">Select a service</option>
                    {services.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div style={{ marginBottom: "16px" }}>
                <label style={labelStyle}>Your Message *</label>
                <textarea
                  name="message"
                  placeholder="Tell us about your project..."
                  rows={4}
                  value={form.message} onChange={handleChange}
                  style={{ ...inputStyle, resize: "vertical", minHeight: "100px" }}
                  onFocus={(e) => { e.target.style.borderColor = GOLD; }}
                  onBlur={(e) => { e.target.style.borderColor = CARD_BORDER; }}
                />
              </div>

              <div style={{ display: "flex", gap: "10px" }}>
                <button
                  onClick={handleWhatsApp}
                  style={{
                    flex: 1, background: "#25D366",
                    color: "white", border: "none",
                    borderRadius: "10px", padding: "13px",
                    fontFamily: "'Outfit', sans-serif",
                    fontWeight: "700", fontSize: "13px",
                    cursor: "pointer", transition: "all 0.3s",
                    boxShadow: "0 4px 14px rgba(37,211,102,0.3)",
                  }}
                >
                  Send via WhatsApp
                </button>
                <button
                  onClick={handleEmail}
                  style={{
                    flex: 1,
                    background: `linear-gradient(135deg, ${GOLD}, #6B5010)`,
                    color: "white", border: "none",
                    borderRadius: "10px", padding: "13px",
                    fontFamily: "'Outfit', sans-serif",
                    fontWeight: "700", fontSize: "13px",
                    cursor: "pointer", transition: "all 0.3s",
                    boxShadow: "0 4px 14px rgba(139,105,20,0.3)",
                  }}
                >
                  Send via Email
                </button>
              </div>
            </div>

            {/* Sidebar */}
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>

              {/* Hours */}
              <div style={{
                background: CARD_BG,
                border: `1px solid ${CARD_BORDER}`,
                borderRadius: "16px", padding: "20px",
                boxShadow: "0 2px 12px rgba(139,105,20,0.06)",
              }}>
                <h3 style={{
                  fontFamily: "'Bebas Neue', cursive",
                  fontSize: "20px", letterSpacing: "2px",
                  color: DARK, marginBottom: "14px",
                }}>
                  Business <span style={{ color: GOLD }}>Hours</span>
                </h3>
                {[
                  { day: "Monday – Friday", hours: "8:00 AM – 6:00 PM", open: true },
                  { day: "Saturday", hours: "9:00 AM – 4:00 PM", open: true },
                  { day: "Sunday", hours: "Closed", open: false },
                ].map((h) => (
                  <div key={h.day} style={{
                    display: "flex", justifyContent: "space-between",
                    alignItems: "center", padding: "10px 0",
                    borderBottom: "1px solid rgba(139,105,20,0.08)",
                  }}>
                    <span style={{
                      color: MID, fontSize: "13px",
                      fontFamily: "'Outfit', sans-serif",
                    }}>
                      {h.day}
                    </span>
                    <span style={{
                      color: h.open ? GOLD : "#EF4444",
                      fontSize: "12px", fontWeight: "700",
                      fontFamily: "'Outfit', sans-serif",
                      background: h.open ? "rgba(139,105,20,0.08)" : "rgba(239,68,68,0.08)",
                      padding: "3px 10px", borderRadius: "20px",
                    }}>
                      {h.hours}
                    </span>
                  </div>
                ))}
              </div>

              {/* Quick Contact */}
              <div style={{
                background: "linear-gradient(135deg, rgba(139,105,20,0.15), rgba(107,80,16,0.15))",
                border: "1px solid rgba(139,105,20,0.25)",
                borderRadius: "16px", padding: "20px",
                textAlign: "center",
              }}>
                <h3 style={{
                  fontFamily: "'Bebas Neue', cursive",
                  fontSize: "20px", letterSpacing: "2px",
                  color: DARK, marginBottom: "6px",
                }}>
                  Need Help <span style={{ color: GOLD }}>Now?</span>
                </h3>
                <p style={{
                  color: MID, fontSize: "12px",
                  lineHeight: "1.5", fontFamily: "'Outfit', sans-serif",
                  marginBottom: "14px",
                }}>
                  Chat with us directly for instant support
                </p>
                <button
                  onClick={() => window.open("https://wa.me/254740643789", "_blank")}
                  style={{
                    background: "#25D366", color: "white",
                    border: "none", borderRadius: "50px",
                    padding: "10px 20px", width: "100%",
                    fontFamily: "'Outfit', sans-serif",
                    fontWeight: "700", fontSize: "13px",
                    cursor: "pointer", marginBottom: "8px",
                    boxShadow: "0 4px 14px rgba(37,211,102,0.3)",
                  }}
                >
                  WhatsApp Now
                </button>
                <button
                  onClick={() => window.location.href = "tel:0711499798"}
                  style={{
                    background: "rgba(139,105,20,0.1)",
                    color: DARK,
                    border: "1px solid rgba(139,105,20,0.2)",
                    borderRadius: "50px", padding: "10px 20px",
                    width: "100%",
                    fontFamily: "'Outfit', sans-serif",
                    fontWeight: "700", fontSize: "13px",
                    cursor: "pointer",
                  }}
                >
                  Call Us Now
                </button>
              </div>
            </div>
          </div>
        </div>

        <style>{`
          @media (max-width: 1024px) {
            .contact-info-grid { grid-template-columns: repeat(2, 1fr) !important; }
            .contact-main-grid { grid-template-columns: 1fr !important; }
          }
          @media (max-width: 600px) {
            .contact-info-grid { grid-template-columns: 1fr 1fr !important; }
            .form-row { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </div>
    </Layout>
  );
}