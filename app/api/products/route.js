import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Product from "@/models/Product";
import cloudinary from "@/lib/cloudinary";
import jwt from "jsonwebtoken";

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

export async function GET() {
  try {
    await connectDB();
    const products = await Product.find().sort({ createdAt: -1 }).lean();

    // Serialize all _id fields to strings
    const serialized = products.map(p => ({
      ...p,
      _id: p._id.toString(),
    }));

    return NextResponse.json(serialized);
  } catch (error) {
    console.error("GET products error:", error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const user = verifyToken(request);
    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const formData = await request.formData();

    const name = formData.get("name");
    const category = formData.get("category");
    const price = parseFloat(formData.get("price"));
    const delivery = parseFloat(formData.get("delivery")) || 0;
    const description = formData.get("description") || "";
    const fabric = formData.get("fabric") || "";
    const sizes = JSON.parse(formData.get("sizes") || "[]");
    const featured = formData.get("featured") === "true";
    const imageFiles = formData.getAll("images");

    const imageURLs = [];
    for (const file of imageFiles) {
      if (file && file.size > 0) {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const uploaded = await new Promise((resolve, reject) => {
          cloudinary.uploader.upload_stream(
            { folder: "manuprints", transformation: [{ width: 800, height: 800, crop: "limit", quality: "auto" }] },
            (error, result) => { if (error) reject(error); else resolve(result); }
          ).end(buffer);
        });
        imageURLs.push(uploaded.secure_url);
      }
    }

    const product = await Product.create({
      name, category, price, delivery,
      description, fabric, sizes, featured,
      images: imageURLs,
    });

    return NextResponse.json(
      { ...product.toObject(), _id: product._id.toString() },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST product error:", error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}