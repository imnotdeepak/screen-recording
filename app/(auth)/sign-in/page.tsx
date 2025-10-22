"use client";

import Link from "next/link";
import Image from "next/image";
import { authClient } from "../../../lib/auth-client";

const SignIn = () => {
  const handleSignIn = async () => {
    return await authClient.signIn.social({
      provider: "google",
    });
  };
  return (
    <main className="sign-in">
      <div className="google-sign-in">
        <section>
          <Link href="/">
            <Image
              src="/assets/icons/logo.svg"
              alt="SnapChat Logo"
              width={40}
              height={40}
            />
            <h1>RecorderFlix</h1>
          </Link>
          <p>
            Create and share your very first <span>RecorderFlix video</span> in
            no time!
          </p>

          <button onClick={handleSignIn}>
            <Image
              src="/assets/icons/google.svg"
              alt="Google Icon"
              width={22}
              height={22}
            />
            <span>Sign in with Google</span>
          </button>
        </section>
      </div>
      <div className="overlay" />
    </main>
  );
};

export default SignIn;
