"use client";

export default function WhatsAppButton() {
  return (
    <button
      onClick={() => window.open("https://wa.me/254740643789", "_blank")}
      style={{
        position: "fixed", bottom: "24px", right: "24px",
        width: "54px", height: "54px",
        background: "#25D366",
        borderRadius: "50%", border: "none",
        cursor: "pointer", zIndex: 999,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: "24px",
        boxShadow: "0 4px 20px rgba(37,211,102,0.5)",
        transition: "all 0.3s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.1)";
        e.currentTarget.style.boxShadow = "0 8px 30px rgba(37,211,102,0.6)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
        e.currentTarget.style.boxShadow = "0 4px 20px rgba(37,211,102,0.5)";
      }}
      title="Chat on WhatsApp"
    >
      💬
    </button>
  );
}