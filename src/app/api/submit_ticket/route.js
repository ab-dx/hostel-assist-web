import { NextResponse } from "next/server";
import { adminAuth, adminFirestore } from "@/lib/firebaseAdmin";
import { complaintSchema } from "@/lib/schemas";
import { Timestamp } from "firebase-admin/firestore";

export async function POST(request) {
  try {
    const body = await request.json();
    const parsed = complaintSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid request", details: parsed.error.errors },
        { status: 400 }
      );
    }

    const authHeader = request.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { 'content-type': 'application/json' },
      });
    }

    const token = authHeader.split(' ')[1];
    const decodedToken = await adminAuth.verifyIdToken(token)
    if (!decodedToken) return NextResponse.json({ error: 'Unauthorized' })
    const uid = decodedToken.uid;
    const db = adminFirestore;
    const docRef = await db.collection("tickets").add({
      ...parsed.data,
      active: true,
      createdAt: Timestamp.now(),
      uid: uid,
      technician_uid: null
    });

    return NextResponse.json({ success: true, id: docRef.id }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

