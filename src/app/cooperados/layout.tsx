'use client'

import { Button } from "@/components/ui/button";
import { API_ENDPOINTS } from "@/constants/api-endpoints";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function CooperadosLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter()
  const handleLogout = async () => {
    await axios.post(API_ENDPOINTS.LOGOUT)
    router.refresh()
  }

  return (
    <div>
      <div className="absolute right-20 bottom-3 z-50">
        <Button onClick={handleLogout} variant='outline'>Logout</Button>
      </div>
      {children}
    </div>
  );
}
