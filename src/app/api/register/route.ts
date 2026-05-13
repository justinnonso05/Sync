import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendConfirmationEmail } from "@/lib/email";

export async function POST(req: NextRequest) {
  try {
    const { fullName, email } = await req.json();

    if (!fullName?.trim() || !email?.trim()) {
      return NextResponse.json({ error: "Full name and email are required." }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
    }

    const existing = await prisma.registration.findUnique({
      where: { email: email.trim().toLowerCase() },
    });

    if (existing) {
      return NextResponse.json({ error: "This email is already registered." }, { status: 409 });
    }

    const registration = await prisma.registration.create({
      data: {
        fullName: fullName.trim(),
        email: email.trim().toLowerCase(),
      },
    });

    // Send confirmation email (non-blocking — don't fail registration if email fails)
    sendConfirmationEmail(registration.fullName, registration.email).catch(console.error);

    return NextResponse.json({ success: true, id: registration.id }, { status: 201 });
  } catch (err) {
    console.error("[REGISTER]", err);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
