import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Product from "@/models/Product";
import cloudinary from "@/lib/cloudinary";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

function verifyToken(request) {
  const auth = request.headers.get("authorization");
  if (!auth) return null;
  const token = auth.split(" ")[1];
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    return null;
  }
}

// GET single product - public
export async function GET(request, context) {
  try {
    await connectDB();
    const { id } = await context.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { message: "Invalid product ID" },
        { status: 400 }
      );
    }

    const product = await Product.findById(id);

    if (!product) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json(
      { message: error.message },
      { status: 500 }
    );
  }
}

// PUT update product - admin only
export async function PUT(request, context) {
  try {
    const user = verifyToken(request);
    if (!user) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    await connectDB();
    const { id } = await context.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { message: "Invalid product ID" },
        { status: 400 }
      );
    }

    const formData = await request.formData();
    const name = formData.get("name");
    const category = formData.get("category");
    const price = parseFloat(formData.get("price"));
    const delivery = parseFloat(formData.get("delivery")) || 0;
    const description = formData.get("description") || "";
    const fabric = formData.get("fabric") || "";
    const sizes = JSON.parse(formData.get("sizes") || "[]");
    const featured = formData.get("featured") === "true";
    const existingImages = JSON.parse(formData.get("existingImages") || "[]");
    const imageFiles = formData.getAll("images");

    const newImageURLs = [];
    for (const file of imageFiles) {
      if (file && file.size > 0) {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const uploaded = await new Promise((resolve, reject) => {
          cloudinary.uploader.upload_stream(
            {
              folder: "manuprints",
              transformation: [
                { width: 800, height: 800, crop: "limit", quality: "auto" }
              ],
            },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            }
          ).end(buffer);
        });

        newImageURLs.push(uploaded.secure_url);
      }
    }

    const allImages = [...existingImages, ...newImageURLs];

    const updated = await Product.findByIdAndUpdate(
      id,
      { name, category, price, delivery, description, fabric, sizes, featured, images: allImages },
      { new: true }
    );

    if (!updated) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json(
      { message: error.message },
      { status: 500 }
    );
  }
}

// DELETE product - admin only
export async function DELETE(request, context) {
  try {
    const user = verifyToken(request);
    if (!user) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    await connectDB();
    const { id } = await context.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { message: "Invalid product ID" },
        { status: 400 }
      );
    }

    const product = await Product.findById(id);

    if (!product) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    for (const imageUrl of product.images) {
      try {
        const parts = imageUrl.split("/");
        const filename = parts[parts.length - 1].split(".")[0];
        const folder = parts[parts.length - 2];
        const publicId = `${folder}/${filename}`;
        await cloudinary.uploader.destroy(publicId);
      } catch (err) {
        console.error("Error deleting image:", err);
      }
    }

    await Product.findByIdAndDelete(id);
    return NextResponse.json({ message: "Product deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { message: error.message },
      { status: 500 }
    );
  }
}