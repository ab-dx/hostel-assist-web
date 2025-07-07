import { NextResponse } from "next/server";
import { adminAuth, adminFirestore } from "@/lib/firebaseAdmin";
import { Timestamp } from "firebase-admin/firestore";
import { resolutionSchema } from "@/lib/schemas";
import { doc, getDoc, updateDoc } from "firebase/firestore";

export async function POST(request) {
  try {
    const body = await request.json();
    const parsed = resolutionSchema.safeParse(body);
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
    const ticketId = parsed.data.id;
    const resolved_image_url = parsed.data.resolved_image_url;
    const parts_image_url = parsed.data.parts_image_url || null;
    const resolved_remarks = parsed.data.remarks;
    const db = adminFirestore;
    const docRef = db.collection("tickets").doc(ticketId)
    const docSnap = await docRef.get()
    console.log(docSnap.data().technician_uid)
    if (uid != docSnap.data().technician_uid) {
      console.log('incorrect')
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
    }
    if (docSnap.exists) {
      await docRef.update({
        active: false,
        resolvedAt: Timestamp.now(),
        resolved_remarks,
        resolved_image_url,
        parts_image_url
      });
      console.log(docSnap.data())
    } else {
      return NextResponse.json({ success: false, message: 'Document does not exist' }, { status: 404 })
    }

    return NextResponse.json({ success: true, }, { status: 200 });
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

