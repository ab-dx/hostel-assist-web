import { NextResponse } from "next/server";
import { adminAuth, adminFirestore } from "@/lib/firebaseAdmin";
import { Timestamp } from "firebase-admin/firestore";

export async function GET(request) {
  try {
    const authHeader = request.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { 'content-type': 'application/json' },
      });
    }

    const token = authHeader.split(' ')[1];
    const decodedToken = await adminAuth.verifyIdToken(token)
    if (!decodedToken) throw new Error()
    const db = adminFirestore;
    const usersRef = db.collection('users');

    const querySnapshot = await usersRef
      .where('role', '==', 'user')
      .orderBy('points', 'desc')
      .limit(25)
      .get();

    const users = [];
    querySnapshot.forEach(doc => {
      const data = doc.data()
      users.push({ displayName: data.displayName, points: data.points });
    });

    console.log(users);


    return NextResponse.json({ success: true, users }, { status: 201 });
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

