import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { name, email, subject, message } = await req.json();

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { success: false, error: "Missing required fields." },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Message received. Thank you!",
    });
  } catch (error) {
    console.error("Error handling contact form submission:", error);
    return NextResponse.json(
      { success: false, error: "Server error." },
      { status: 500 }
    );
  }
}
