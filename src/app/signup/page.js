"use client";
import { useAuth } from "../../context/AuthUserContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { SignUpForm } from "@/components/signup-form";
import LoadingPage from "@/components/loading-page";
import axios from "axios";

export default function LogIn() {
  const { authUser, loading, signInWithGoogle, signUpWithEmail, signOutUser } = useAuth();

  const router = useRouter();

  useEffect(() => {
    async function check() {
      if (authUser) {
        const token = await authUser.getIdToken(true)
        try {
          await axios.post('/api/register', {}, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          })
          router.replace("/home");
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
          <SignUpForm signInWithGoogle={signInWithGoogle} signUpWithEmail={signUpWithEmail} />
        </div>
      </div>
    </>
  );
}
