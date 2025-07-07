import { NextResponse } from "next/server";
import { adminAuth, adminFirestore } from "@/lib/firebaseAdmin";

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
    const db = adminFirestore;
    const userDocRef = db.collection('users').doc(uid);
    const userDoc = await userDocRef.get();

    if (userDoc.exists) {
      const role = userDoc.data().role;
      return NextResponse.json({ success: true, role: role }, { status: 200 });
    }
    // if (!technicianQuerySnapshot.empty) {
    //   return NextResponse.json({ success: true, role: 'technician' }, { status: 201 });
    // }
    // if (!adminQuerySnapshot.empty) {
    //   return NextResponse.json({ success: true, role: 'admin' }, { status: 201 });
    // }

    return NextResponse.json({ success: false, message: 'UID not registered' });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

