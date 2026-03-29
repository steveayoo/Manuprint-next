"use client";

import React, {
  createContext, useContext, useState,
  useEffect, useCallback
} from "react";
import toast from "react-hot-toast";

const AdminContext = createContext();

const API_URL = process.env.NEXT_PUBLIC_API_URL || "";

const defaultSettings = {
  heroTitle: "Premium Printing & Branding Solutions",
  heroSubtitle: "Custom printed apparel, 3D signages, corporate branding and more. We bring your brand to life across Kenya.",
};

export const AdminProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [siteSettings, setSiteSettings] = useState(defaultSettings);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const savedToken = localStorage.getItem("manuprints_token");
    if (savedToken) {
      setToken(savedToken);
      setIsAdminLoggedIn(true);
    }
  }, []);

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/api/products`);
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const login = async (email, password) => {
    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (data.success && data.token) {
        localStorage.setItem("manuprints_token", data.token);
        setToken(data.token);
        setIsAdminLoggedIn(true);
        toast.success("Welcome back, Admin!");
        return true;
      }
      toast.error(data.message || "Invalid credentials");
      return false;
    } catch (error) {
      toast.error("Login failed. Check your connection.");
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("manuprints_token");
    setToken(null);
    setIsAdminLoggedIn(false);
    toast.success("Logged out successfully.");
  };

  const addProduct = async (productData, imageFiles) => {
    try {
      const toastId = toast.loading("Uploading product...");
      const formData = new FormData();

      formData.append("name", productData.name);
      formData.append("category", productData.category);
      formData.append("price", productData.price);
      formData.append("delivery", productData.delivery || 0);
      formData.append("description", productData.description || "");
      formData.append("fabric", productData.fabric || "");
      formData.append("sizes", JSON.stringify(productData.sizes || []));
      formData.append("featured", productData.featured ? "true" : "false");

      imageFiles.forEach((file) => {
        if (file) formData.append("images", file);
      });

      const res = await fetch(`${API_URL}/api/products`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      toast.dismiss(toastId);

      if (!res.ok) {
        const err = await res.json();
        toast.error(err.message || "Failed to add product");
        return false;
      }

      await fetchProducts();
      toast.success("Product added successfully!");
      return true;
    } catch (error) {
      toast.dismiss();
      toast.error("Error adding product.");
      return false;
    }
  };

  const updateProduct = async (id, productData, newImageFiles, existingImages) => {
    try {
      const toastId = toast.loading("Updating product...");
      const formData = new FormData();

      formData.append("name", productData.name);
      formData.append("category", productData.category);
      formData.append("price", productData.price);
      formData.append("delivery", productData.delivery || 0);
      formData.append("description", productData.description || "");
      formData.append("fabric", productData.fabric || "");
      formData.append("sizes", JSON.stringify(productData.sizes || []));
      formData.append("featured", productData.featured ? "true" : "false");
      formData.append("existingImages", JSON.stringify(existingImages || []));

      newImageFiles.forEach((file) => {
        if (file) formData.append("images", file);
      });

      const res = await fetch(`${API_URL}/api/products/${id}`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      toast.dismiss(toastId);

      if (!res.ok) {
        const err = await res.json();
        toast.error(err.message || "Failed to update product");
        return false;
      }

      await fetchProducts();
      toast.success("Product updated successfully!");
      return true;
    } catch (error) {
      toast.dismiss();
      toast.error("Error updating product.");
      return false;
    }
  };

  const deleteProduct = async (id) => {
    try {
      const res = await fetch(`${API_URL}/api/products/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        toast.error("Failed to delete product");
        return false;
      }

      await fetchProducts();
      toast.success("Product deleted successfully!");
      return true;
    } catch (error) {
      toast.error("Error deleting product.");
      return false;
    }
  };

  const updateSettings = (newSettings) => {
    setSiteSettings((prev) => ({ ...prev, ...newSettings }));
  };

  return (
    <AdminContext.Provider value={{
      products,
      isAdminLoggedIn,
      siteSettings,
      loading,
      token,
      login,
      logout,
      addProduct,
      updateProduct,
      deleteProduct,
      updateSettings,
      fetchProducts,
    }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => useContext(AdminContext);
export default AdminContext;