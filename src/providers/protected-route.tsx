"use client";

import { useUser } from "@/hooks";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const ProtectedRoute = ({
  params,
  children,
}: {
  params: { roomId: string };
  searchParams?: { [key: string]: string | string[] | undefined };
  children: React.ReactNode;
}) => {
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.replace(`/?roomId=${params?.roomId}`);
    }
  }, [user, router, params?.roomId])

  return user && children;
};

export default ProtectedRoute;
