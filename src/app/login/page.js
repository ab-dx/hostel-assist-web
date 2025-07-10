"use client";
import { LoginForm } from "@/components/login-form";
import { useAuth } from "../../context/AuthUserContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import LoadingPage from "@/components/loading-page";
import axios from "axios";

export default function LogIn() {
  const { authUser, loading, signInWithGoogle, signInWithEmail, signOutUser } = useAuth();

  const router = useRouter();

  useEffect(() => {
    async function check() {
      if (authUser) {

        const token = await authUser.getIdToken(true)
        try {
          const response = await axios.post('/api/login', {}, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          })
          if (response.data.success) {
            if (response.data.role == 'user')
              router.replace("/home");
            if (response.data.role == 'technician')
              router.replace("/technician");
            if (response.data.role == 'admin')
              router.replace("/admin");
          }
          return true
        } catch (e) {
          console.error(e)
          return false
        }
      }
    }
    check()
  }, [authUser, router]);

  if (loading) return <LoadingPage />;

  // return authUser ? (
  //   <div>
  //     Signed in
  //   </div>
  // ) : (
  //   <button onClick={signInWithGoogle}>Sign in with Google</button>
  // );
  return (
    <>
      <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm md:max-w-3xl">
          <LoginForm signInWithGoogle={signInWithGoogle} signInWithEmail={signInWithEmail} />
        </div>
      </div>
    </>
  );
}
