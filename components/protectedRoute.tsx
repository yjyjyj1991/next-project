import { useAuth } from "../context/AuthContext";
import React, { useEffect } from "react";
import { useRouter } from "next/router";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (!user) {
      console.log("user not logged in: ", user);
      router.push("/login");
    }
  }, [user, router]);

  return <>{user ? children : null}</>;
}

export default ProtectedRoute;
