import { NextResponse } from "next/server";
import { adminAuth, adminFirestore } from "@/lib/firebaseAdmin";
import { Timestamp } from "firebase-admin/firestore";

export async function POST(request) {
  try {
    const body = await request.json();
    const authHeader = request.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { 'content-type': 'application/json' },
      });
    }

    const token = authHeader.split(' ')[1];
    const decodedToken = await adminAuth.verifyIdToken(token)
    const uid = decodedToken.uid;
    const displayName = decodedToken.displayName || decodedToken.name || "User";
    const db = adminFirestore;
    const userDocRef = db.collection('users').doc(uid);
    const userDoc = await userDocRef.get();

    if (!userDoc.exists) {
      await userDocRef.set({
        role: 'user',
        displayName: displayName,
        createdAt: Timestamp.now(),
        uid: uid,
        points: 0
      });
    } else {
      return NextResponse.json({ success: false, message: 'UID already exists' });
    }


    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

