import { NextResponse } from "next/server";

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ success: false, error: "Invalid request body." }, { status: 400 });
  }

  if (!payload || typeof payload !== "object" || !("email" in payload) || typeof payload.email !== "string") {
    return NextResponse.json({ success: false, error: "Please enter a valid email address." }, { status: 400 });
  }

  const email = payload.email.trim().toLowerCase();
  if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ success: false, error: "Please enter a valid email address." }, { status: 400 });
  }

  const webhookUrl = process.env.WAITLIST_WEBHOOK_URL;
  if (!webhookUrl) {
    return NextResponse.json(
      { success: false, error: "Email updates are not configured yet." },
      { status: 503 },
    );
  }

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, source: "og-card-inspector", date: new Date().toISOString() }),
      signal: AbortSignal.timeout(8000),
    });

    if (!response.ok) {
      console.error("Waitlist webhook returned a non-success status:", response.status);
      return NextResponse.json(
        { success: false, error: "Could not save your email right now. Please try again later." },
        { status: 502 },
      );
    }

    return NextResponse.json({
      success: true,
      message: "You're on the early access list! We'll notify you when our main suite drops.",
    });
  } catch (error) {
    console.error("Failed to dispatch waitlist webhook:", error);
    return NextResponse.json(
      { success: false, error: "Could not save your email right now. Please try again later." },
      { status: 502 },
    );
  }
}
