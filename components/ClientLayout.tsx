"use client";

import { ReactNode } from "react";
import { useCartSync } from "@/hooks/useCartSync";

export default function ClientLayout({ children }: { children: ReactNode }) {
  useCartSync();

  return <>{children}</>;
}
