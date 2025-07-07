import { NextResponse } from "next/server";
import { adminAuth } from "./lib/firebaseAdmin";

export async function middleware(request) {

  const authHeader = request.headers.get('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'content-type': 'application/json' },
    });
  }

  const token = authHeader.split(' ')[1];
  const decodedToken = await adminAuth.verifyIdToken(token)
  if (!decodedToken) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
}

export const config = {
  matcher: ["/api/:path*"],
};
