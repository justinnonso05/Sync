import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";
import { sendBroadcastEmail } from "@/lib/email";

export async function POST(req: NextRequest) {
  const token = req.cookies.get("admin_token")?.value;
  if (!token || !(await verifyToken(token))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { subject, body } = await req.json();
  if (!subject?.trim() || !body?.trim()) {
    return NextResponse.json({ error: "Subject and body are required." }, { status: 400 });
  }

  const all = await prisma.registration.findMany({ select: { fullName: true, email: true } });
  if (all.length === 0) {
    return NextResponse.json({ error: "No registrants to email." }, { status: 400 });
  }

  await sendBroadcastEmail(
    all.map((r) => ({ name: r.fullName, email: r.email })),
    subject.trim(),
    body.trim()
  );

  return NextResponse.json({ success: true, sent: all.length });
}
