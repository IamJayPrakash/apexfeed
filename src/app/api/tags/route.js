import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Blog from "@/models/Blog";

export const dynamic = "force-dynamic";

// GET /api/tags - returns all unique tags with their counts
export async function GET() {
  try {
    await connectDB();
    // Aggregate all tags and count occurrences
    const tagsAgg = await Blog.aggregate([
      { $unwind: "$tags" },
      { $group: { _id: { $toLower: "$tags" }, count: { $sum: 1 } } },
      { $sort: { count: -1, _id: 1 } },
    ]);
    // Format: [{ tag: 'react', count: 5 }, ...]
    const tags = tagsAgg.map((t) => ({ tag: t._id, count: t.count }));
    return NextResponse.json(tags);
  } catch (error) {
    console.error("Error fetching tags:", error);
    return NextResponse.json(
      { error: "Failed to fetch tags" },
      { status: 500 }
    );
  }
}
