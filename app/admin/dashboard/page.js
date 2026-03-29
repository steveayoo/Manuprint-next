"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAdmin } from "@/context/AdminContext";

const GOLD = "#8B6914";
const DARK = "#2C1810";
const MID = "#5C3D2E";
const LIGHT = "#8B6E5A";
const CARD_BG = "rgba(255,255,255,0.92)";
const CARD_BORDER = "rgba(139,105,20,0.2)";

const categories = ["T-Shirts", "Hoodies", "Caps", "3D Signages", "Corporate Branding", "Promotional"];
const sizes = ["XS", "S", "M", "L", "XL", "XXL", "One Size", "Custom"];
const emptyForm = { name: "", category: "T-Shirts", price: "", delivery: "", description: "", fabric: "", sizes: [], featured: false };

export default function AdminDashboard() {
  const { products, isAdminLoggedIn, logout, addProduct, updateProduct, deleteProduct, loading } = useAdmin();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("products");
  const [view, setView] = useState("list");
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState(null);
  const [imageFiles, setImageFiles] = useState([null, null, null]);
  const [imagePreviews, setImagePreviews] = useState([null, null, null]);
  const [existingImages, setExistingImages] = useState([]);
  const [deleteModal, setDeleteModal] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!isAdminLoggedIn) router.push("/admin");
  }, [isAdminLoggedIn, router]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSizeToggle = (size) => {
    setForm(prev => ({
      ...prev,
      sizes: prev.sizes.includes(size)
        ? prev.sizes.filter(s => s !== size)
        : [...prev.sizes, size],
    }));
  };

  const handleImageSelect = (index, file) => {
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) { alert("Image must be under 5MB"); return; }
    const reader = new FileReader();
    reader.onload = (e) => {
      const newPreviews = [...imagePreviews];
      newPreviews[index] = e.target.result;
      setImagePreviews(newPreviews);
    };
    reader.readAsDataURL(file);
    const newFiles = [...imageFiles];
    newFiles[index] = file;
    setImageFiles(newFiles);
  };

  const removeImage = (index) => {
    const newFiles = [...imageFiles];
    const newPreviews = [...imagePreviews];
    newFiles[index] = null;
    newPreviews[index] = null;
    setImageFiles(newFiles);
    setImagePreviews(newPreviews);
  };

  const removeExistingImage = (index) => {
    setExistingImages(existingImages.filter((_, i) => i !== index));
  };

  const handleEdit = (product) => {
    setForm({
      name: product.name || "",
      category: product.category || "T-Shirts",
      price: product.price || "",
      delivery: product.delivery || "",
      description: product.description || "",
      fabric: product.fabric || "",
      sizes: product.sizes || [],
      featured: product.featured || false,
    });
    setEditId(product._id);
    setExistingImages(product.images || []);
    setImageFiles([null, null, null]);
    setImagePreviews([null, null, null]);
    setView("form");
  };

  const handleSubmit = async () => {
    if (!form.name || !form.price) {
      alert("Please enter product name and price.");
      return;
    }
    setSaving(true);
    const productData = {
      ...form,
      price: parseFloat(form.price),
      delivery: parseFloat(form.delivery) || 0,
    };
    const newFiles = imageFiles.filter(Boolean);
    let success = false;
    if (editId) {
      success = await updateProduct(editId, productData, newFiles, existingImages);
    } else {
      success = await addProduct(productData, newFiles);
    }
    setSaving(false);
    if (success) {
      setForm(emptyForm);
      setImageFiles([null, null, null]);
      setImagePreviews([null, null, null]);
      setExistingImages([]);
      setEditId(null);
      setView("list");
    }
  };

  const handleDelete = async (id) => {
    await deleteProduct(id);
    setDeleteModal(null);
  };

  const handleLogout = () => {
    logout();
    router.push("/admin");
  };

  const inputStyle = {
    width: "100%",
    background: "rgba(255,255,255,0.95)",
    border: `1px solid ${CARD_BORDER}`,
    borderRadius: "8px", padding: "9px 12px",
    color: DARK, fontSize: "13px",
    fontFamily: "'Outfit', sans-serif",
    outline: "none",
  };

  const labelStyle = {
    color: MID, fontSize: "11px", fontWeight: "700",
    letterSpacing: "1px", textTransform: "uppercase",
    display: "block", marginBottom: "5px",
    fontFamily: "'Outfit', sans-serif",
  };

  if (!isAdminLoggedIn) return null;

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      fontFamily: "'Outfit', sans-serif",
      background: "rgba(255,255,255,0.02)",
    }}>

      {/* SIDEBAR */}
      <div style={{
        width: "220px", flexShrink: 0,
        background: "rgba(44,24,16,0.95)",
        backdropFilter: "blur(10px)",
        borderRight: "1px solid rgba(201,168,76,0.2)",
        display: "flex", flexDirection: "column",
        padding: "0", minHeight: "100vh",
        position: "fixed", left: 0, top: 0, bottom: 0,
        zIndex: 100,
      }}>
        {/* Logo */}
        <div style={{
          padding: "20px 16px",
          borderBottom: "1px solid rgba(201,168,76,0.15)",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{
              width: "36px", height: "36px",
              background: "linear-gradient(135deg, #C9A84C, #8B6914)",
              borderRadius: "8px",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontFamily: "'Bebas Neue', cursive",
              fontSize: "15px", color: "white",
            }}>
              MP
            </div>
            <div>
              <div style={{
                fontFamily: "'Bebas Neue', cursive",
                fontSize: "16px", letterSpacing: "2px", color: "white",
              }}>
                MANU<span style={{ color: "#C9A84C" }}>PRINTS</span>
              </div>
              <div style={{
                color: "rgba(255,255,255,0.4)", fontSize: "9px",
                fontFamily: "'Outfit', sans-serif",
              }}>
                Admin Panel
              </div>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: "16px 10px" }}>
          {[
            { id: "products", icon: "📦", label: "Products" },
            { id: "settings", icon: "⚙️", label: "Site Settings" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              style={{
                width: "100%", display: "flex",
                alignItems: "center", gap: "10px",
                padding: "10px 12px", borderRadius: "8px",
                background: activeTab === item.id ? "rgba(201,168,76,0.15)" : "transparent",
                border: activeTab === item.id ? "1px solid rgba(201,168,76,0.25)" : "1px solid transparent",
                color: activeTab === item.id ? "#C9A84C" : "rgba(255,255,255,0.6)",
                fontFamily: "'Outfit', sans-serif",
                fontWeight: "600", fontSize: "13px",
                cursor: "pointer", marginBottom: "4px",
                transition: "all 0.2s",
                textAlign: "left",
              }}
            >
              <span>{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        {/* Bottom */}
        <div style={{
          padding: "16px 10px",
          borderTop: "1px solid rgba(255,255,255,0.06)",
        }}>
          <button
            onClick={() => router.push("/")}
            style={{
              width: "100%", padding: "9px 12px",
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "8px", color: "rgba(255,255,255,0.6)",
              fontFamily: "'Outfit', sans-serif",
              fontWeight: "600", fontSize: "12px",
              cursor: "pointer", marginBottom: "8px",
              display: "flex", alignItems: "center", gap: "8px",
            }}
          >
            🌐 View Website
          </button>
          <button
            onClick={handleLogout}
            style={{
              width: "100%", padding: "9px 12px",
              background: "rgba(239,68,68,0.1)",
              border: "1px solid rgba(239,68,68,0.2)",
              borderRadius: "8px", color: "#EF4444",
              fontFamily: "'Outfit', sans-serif",
              fontWeight: "600", fontSize: "12px",
              cursor: "pointer",
              display: "flex", alignItems: "center", gap: "8px",
            }}
          >
            🚪 Logout
          </button>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div style={{
        flex: 1, marginLeft: "220px",
        padding: "24px", minHeight: "100vh",
      }}>

        {/* PRODUCTS TAB */}
        {activeTab === "products" && (
          <div>
            {view === "list" ? (
              <>
                <div style={{
                  display: "flex", justifyContent: "space-between",
                  alignItems: "center", marginBottom: "20px",
                }}>
                  <h2 style={{
                    fontFamily: "'Bebas Neue', cursive",
                    fontSize: "28px", letterSpacing: "2px", color: DARK,
                  }}>
                    Products ({products.length})
                  </h2>
                  <button
                    onClick={() => { setForm(emptyForm); setEditId(null); setView("form"); }}
                    style={{
                      background: `linear-gradient(135deg, ${GOLD}, #6B5010)`,
                      color: "white", border: "none",
                      borderRadius: "8px", padding: "10px 20px",
                      fontFamily: "'Outfit', sans-serif",
                      fontWeight: "700", fontSize: "13px",
                      cursor: "pointer",
                      boxShadow: "0 4px 14px rgba(139,105,20,0.35)",
                    }}
                  >
                    + Add Product
                  </button>
                </div>

                {loading ? (
                  <div style={{ textAlign: "center", padding: "60px", color: MID }}>
                    Loading...
                  </div>
                ) : products.length === 0 ? (
                  <div style={{
                    textAlign: "center", padding: "60px 20px",
                    background: CARD_BG, borderRadius: "14px",
                    border: `1px solid ${CARD_BORDER}`,
                  }}>
                    <div style={{ fontSize: "40px", marginBottom: "12px" }}>📦</div>
                    <h3 style={{
                      fontFamily: "'Bebas Neue', cursive", fontSize: "22px",
                      color: DARK, letterSpacing: "2px", marginBottom: "8px",
                    }}>
                      No Products Yet
                    </h3>
                    <p style={{ color: MID, fontFamily: "'Outfit', sans-serif" }}>
                      Click "Add Product" to get started.
                    </p>
                  </div>
                ) : (
                  <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
                    gap: "14px",
                  }}>
                    {products.map((product) => (
                      <div key={product._id} style={{
                        background: CARD_BG,
                        border: `1px solid ${CARD_BORDER}`,
                        borderRadius: "14px", overflow: "hidden",
                        boxShadow: "0 2px 8px rgba(139,105,20,0.06)",
                      }}>
                        <div style={{
                          height: "160px", background: "#FDF8F0",
                          display: "flex", alignItems: "center",
                          justifyContent: "center", padding: "8px",
                          position: "relative",
                        }}>
                          {product.images?.[0] ? (
                            <img src={product.images[0]} alt={product.name}
                              style={{
                                maxWidth: "100%", maxHeight: "100%",
                                objectFit: "contain", borderRadius: "6px",
                              }} />
                          ) : (
                            <div style={{
                              display: "flex", flexDirection: "column",
                              alignItems: "center", color: LIGHT,
                            }}>
                              <span style={{ fontSize: "32px", opacity: 0.3 }}>📷</span>
                              <p style={{ fontSize: "10px", fontFamily: "'Outfit', sans-serif" }}>
                                No photo
                              </p>
                            </div>
                          )}
                          {product.featured && (
                            <div style={{
                              position: "absolute", top: "8px", right: "8px",
                              background: GOLD, borderRadius: "20px",
                              padding: "2px 8px",
                            }}>
                              <span style={{
                                color: "white", fontSize: "9px",
                                fontWeight: "700", fontFamily: "'Outfit', sans-serif",
                              }}>
                                FEATURED
                              </span>
                            </div>
                          )}
                        </div>
                        <div style={{ padding: "12px" }}>
                          <p style={{
                            color: GOLD, fontSize: "10px", fontWeight: "700",
                            textTransform: "uppercase", letterSpacing: "1px",
                            fontFamily: "'Outfit', sans-serif", marginBottom: "2px",
                          }}>
                            {product.category}
                          </p>
                          <h3 style={{
                            color: DARK, fontSize: "14px", fontWeight: "700",
                            fontFamily: "'Outfit', sans-serif", marginBottom: "4px",
                            whiteSpace: "nowrap", overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}>
                            {product.name}
                          </h3>
                          <p style={{
                            fontFamily: "'Bebas Neue', cursive",
                            fontSize: "18px", color: GOLD,
                            letterSpacing: "1px", marginBottom: "4px",
                          }}>
                            KSh {product.price?.toLocaleString()}
                          </p>
                          <p style={{
                            color: LIGHT, fontSize: "10px",
                            fontFamily: "'Outfit', sans-serif", marginBottom: "10px",
                          }}>
                            {product.images?.length || 0} photo(s) uploaded
                          </p>
                          <div style={{ display: "flex", gap: "8px" }}>
                            <button
                              onClick={() => handleEdit(product)}
                              style={{
                                flex: 1, background: "rgba(139,105,20,0.1)",
                                color: DARK, border: `1px solid ${CARD_BORDER}`,
                                borderRadius: "7px", padding: "7px",
                                fontFamily: "'Outfit', sans-serif",
                                fontWeight: "600", fontSize: "12px",
                                cursor: "pointer",
                              }}
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => setDeleteModal(product._id)}
                              style={{
                                flex: 1, background: "rgba(239,68,68,0.1)",
                                color: "#EF4444",
                                border: "1px solid rgba(239,68,68,0.2)",
                                borderRadius: "7px", padding: "7px",
                                fontFamily: "'Outfit', sans-serif",
                                fontWeight: "600", fontSize: "12px",
                                cursor: "pointer",
                              }}
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            ) : (
              /* ADD / EDIT FORM */
              <div>
                <div style={{
                  display: "flex", justifyContent: "space-between",
                  alignItems: "center", marginBottom: "20px",
                }}>
                  <h2 style={{
                    fontFamily: "'Bebas Neue', cursive",
                    fontSize: "24px", letterSpacing: "2px", color: DARK,
                  }}>
                    {editId ? "Edit Product" : "Add New Product"}
                  </h2>
                  <button
                    onClick={() => { setView("list"); setEditId(null); setForm(emptyForm); }}
                    style={{
                      background: "rgba(139,105,20,0.1)",
                      color: DARK, border: `1px solid ${CARD_BORDER}`,
                      borderRadius: "8px", padding: "8px 16px",
                      fontFamily: "'Outfit', sans-serif",
                      fontWeight: "600", fontSize: "12px", cursor: "pointer",
                    }}
                  >
                    Cancel
                  </button>
                </div>

                <div style={{
                  display: "grid", gridTemplateColumns: "1fr 1fr",
                  gap: "20px",
                }} className="form-grid">

                  {/* Product Info */}
                  <div style={{
                    background: CARD_BG, border: `1px solid ${CARD_BORDER}`,
                    borderRadius: "14px", padding: "20px",
                  }}>
                    <h3 style={{
                      fontFamily: "'Outfit', sans-serif", fontSize: "14px",
                      fontWeight: "700", color: DARK, marginBottom: "16px",
                    }}>
                      Product Information
                    </h3>

                    <label style={labelStyle}>Product Name *</label>
                    <input name="name" value={form.name} onChange={handleChange}
                      placeholder="e.g. Custom Printed T-Shirt"
                      style={{ ...inputStyle, marginBottom: "12px" }} />

                    <label style={labelStyle}>Category</label>
                    <select name="category" value={form.category} onChange={handleChange}
                      style={{ ...inputStyle, marginBottom: "12px", cursor: "pointer" }}>
                      {categories.map(c => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>

                    <div style={{
                      display: "grid", gridTemplateColumns: "1fr 1fr",
                      gap: "10px", marginBottom: "12px",
                    }}>
                      <div>
                        <label style={labelStyle}>Price (KSh) *</label>
                        <input name="price" type="number" value={form.price}
                          onChange={handleChange} placeholder="850"
                          style={inputStyle} />
                      </div>
                      <div>
                        <label style={labelStyle}>Delivery (KSh)</label>
                        <input name="delivery" type="number" value={form.delivery}
                          onChange={handleChange} placeholder="200"
                          style={inputStyle} />
                      </div>
                    </div>

                    <label style={labelStyle}>Description</label>
                    <textarea name="description" value={form.description}
                      onChange={handleChange}
                      placeholder="Describe the product..."
                      rows={3}
                      style={{ ...inputStyle, marginBottom: "12px", resize: "vertical" }} />

                    <label style={labelStyle}>Material / Fabric</label>
                    <input name="fabric" value={form.fabric}
                      onChange={handleChange} placeholder="e.g. 100% Cotton"
                      style={{ ...inputStyle, marginBottom: "12px" }} />

                    <label style={labelStyle}>Available Sizes</label>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "12px" }}>
                      {sizes.map((size) => (
                        <button key={size} onClick={() => handleSizeToggle(size)}
                          style={{
                            background: form.sizes.includes(size)
                              ? `linear-gradient(135deg, ${GOLD}, #6B5010)`
                              : "rgba(139,105,20,0.08)",
                            color: form.sizes.includes(size) ? "white" : MID,
                            border: `1px solid ${form.sizes.includes(size) ? "transparent" : CARD_BORDER}`,
                            borderRadius: "6px", padding: "5px 12px",
                            fontFamily: "'Outfit', sans-serif",
                            fontWeight: "600", fontSize: "12px", cursor: "pointer",
                          }}>
                          {size}
                        </button>
                      ))}
                    </div>

                    <label style={{
                      display: "flex", alignItems: "center", gap: "10px", cursor: "pointer",
                    }}>
                      <input type="checkbox" name="featured"
                        checked={form.featured} onChange={handleChange}
                        style={{ width: "16px", height: "16px", accentColor: GOLD }} />
                      <span style={{
                        color: MID, fontSize: "13px",
                        fontFamily: "'Outfit', sans-serif", fontWeight: "600",
                      }}>
                        Feature on Homepage
                      </span>
                    </label>
                  </div>

                  {/* Photo Uploader */}
                  <div style={{
                    background: CARD_BG, border: `1px solid ${CARD_BORDER}`,
                    borderRadius: "14px", padding: "20px",
                  }}>
                    <h3 style={{
                      fontFamily: "'Outfit', sans-serif", fontSize: "14px",
                      fontWeight: "700", color: DARK, marginBottom: "16px",
                    }}>
                      Product Photos
                    </h3>

                    {/* Existing Images */}
                    {existingImages.length > 0 && (
                      <div style={{ marginBottom: "16px" }}>
                        <p style={{ ...labelStyle, marginBottom: "8px" }}>Current Photos</p>
                        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                          {existingImages.map((url, i) => (
                            <div key={i} style={{ position: "relative" }}>
                              <img src={url} alt={`Product ${i + 1}`}
                                style={{
                                  width: "72px", height: "72px",
                                  objectFit: "contain", borderRadius: "8px",
                                  border: `1px solid ${CARD_BORDER}`,
                                  background: "white", padding: "4px",
                                }} />
                              <button
                                onClick={() => removeExistingImage(i)}
                                style={{
                                  position: "absolute", top: "-6px", right: "-6px",
                                  width: "18px", height: "18px",
                                  background: "#EF4444", color: "white",
                                  border: "none", borderRadius: "50%",
                                  fontSize: "10px", cursor: "pointer",
                                  display: "flex", alignItems: "center",
                                  justifyContent: "center", fontWeight: "700",
                                }}
                              >
                                x
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* New Uploads */}
                    <p style={{ ...labelStyle, marginBottom: "8px" }}>
                      {existingImages.length > 0 ? "Add More Photos" : "Upload Photos"}
                    </p>
                    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                      {["Front View", "Side View", "Back View"].map((label, i) => (
                        <div key={i}>
                          <p style={{
                            color: LIGHT, fontSize: "10px",
                            fontFamily: "'Outfit', sans-serif",
                            fontWeight: "600", marginBottom: "4px",
                          }}>
                            {label}
                          </p>
                          {imagePreviews[i] ? (
                            <div style={{ position: "relative", display: "inline-block" }}>
                              <img src={imagePreviews[i]} alt={label}
                                style={{
                                  width: "100%", height: "120px",
                                  objectFit: "contain", borderRadius: "8px",
                                  border: `1px solid ${CARD_BORDER}`,
                                  background: "white", padding: "4px",
                                }} />
                              <button
                                onClick={() => removeImage(i)}
                                style={{
                                  position: "absolute", top: "6px", right: "6px",
                                  background: "#EF4444", color: "white",
                                  border: "none", borderRadius: "6px",
                                  padding: "3px 8px", fontSize: "11px",
                                  cursor: "pointer", fontWeight: "700",
                                }}
                              >
                                Remove
                              </button>
                            </div>
                          ) : (
                            <label style={{
                              display: "flex", flexDirection: "column",
                              alignItems: "center", justifyContent: "center",
                              height: "90px", borderRadius: "8px",
                              border: "2px dashed rgba(139,105,20,0.3)",
                              cursor: "pointer",
                              background: "rgba(139,105,20,0.04)",
                              transition: "all 0.3s",
                            }}>
                              <span style={{ fontSize: "20px", marginBottom: "4px" }}>📷</span>
                              <span style={{
                                color: LIGHT, fontSize: "11px",
                                fontFamily: "'Outfit', sans-serif",
                              }}>
                                Click to upload
                              </span>
                              <input type="file" accept="image/*"
                                style={{ display: "none" }}
                                onChange={(e) => handleImageSelect(i, e.target.files[0])} />
                            </label>
                          )}
                        </div>
                      ))}
                    </div>
                    <p style={{
                      color: LIGHT, fontSize: "10px",
                      fontFamily: "'Outfit', sans-serif", marginTop: "8px",
                    }}>
                      Max 5MB per image. JPG or PNG. 800x800px ideal.
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={saving}
                  style={{
                    marginTop: "16px",
                    background: saving
                      ? "rgba(139,105,20,0.5)"
                      : `linear-gradient(135deg, ${GOLD}, #6B5010)`,
                    color: "white", border: "none",
                    borderRadius: "10px", padding: "13px 32px",
                    fontFamily: "'Outfit', sans-serif",
                    fontWeight: "700", fontSize: "14px",
                    cursor: saving ? "not-allowed" : "pointer",
                    boxShadow: "0 4px 16px rgba(139,105,20,0.35)",
                  }}
                >
                  {saving ? "Saving to Cloudinary & MongoDB..." : editId ? "Update Product" : "Add Product"}
                </button>

                <style>{`
                  @media (max-width: 768px) {
                    .form-grid { grid-template-columns: 1fr !important; }
                  }
                `}</style>
              </div>
            )}
          </div>
        )}

        {/* SETTINGS TAB */}
        {activeTab === "settings" && (
          <div style={{
            background: CARD_BG, border: `1px solid ${CARD_BORDER}`,
            borderRadius: "14px", padding: "24px",
            maxWidth: "600px",
          }}>
            <h2 style={{
              fontFamily: "'Bebas Neue', cursive",
              fontSize: "24px", letterSpacing: "2px",
              color: DARK, marginBottom: "20px",
            }}>
              Site Settings
            </h2>
            <p style={{ color: MID, fontFamily: "'Outfit', sans-serif", fontSize: "14px" }}>
              Contact details and other settings can be updated here in future versions.
            </p>
          </div>
        )}
      </div>

      {/* DELETE MODAL */}
      {deleteModal && (
        <div style={{
          position: "fixed", inset: 0,
          background: "rgba(0,0,0,0.5)",
          display: "flex", alignItems: "center",
          justifyContent: "center", zIndex: 9999, padding: "20px",
        }}>
          <div style={{
            background: CARD_BG,
            border: `1px solid ${CARD_BORDER}`,
            borderRadius: "16px", padding: "28px",
            maxWidth: "360px", width: "100%",
            textAlign: "center",
            boxShadow: "0 8px 40px rgba(0,0,0,0.2)",
          }}>
            <div style={{ fontSize: "36px", marginBottom: "12px" }}>🗑️</div>
            <h3 style={{
              fontFamily: "'Bebas Neue', cursive",
              fontSize: "22px", color: DARK,
              letterSpacing: "2px", marginBottom: "8px",
            }}>
              Delete Product?
            </h3>
            <p style={{
              color: MID, fontSize: "13px",
              fontFamily: "'Outfit', sans-serif",
              marginBottom: "20px", lineHeight: "1.5",
            }}>
              This action cannot be undone. The product and all images will be permanently deleted.
            </p>
            <div style={{ display: "flex", gap: "10px" }}>
              <button
                onClick={() => setDeleteModal(null)}
                style={{
                  flex: 1, background: CARD_BG,
                  color: DARK, border: `1px solid ${CARD_BORDER}`,
                  borderRadius: "8px", padding: "10px",
                  fontFamily: "'Outfit', sans-serif",
                  fontWeight: "600", fontSize: "13px", cursor: "pointer",
                }}
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteModal)}
                style={{
                  flex: 1, background: "#EF4444",
                  color: "white", border: "none",
                  borderRadius: "8px", padding: "10px",
                  fontFamily: "'Outfit', sans-serif",
                  fontWeight: "700", fontSize: "13px", cursor: "pointer",
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}