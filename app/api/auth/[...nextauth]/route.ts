// app/api/auth/[...nextauth]/route.ts

import { handlers } from "@/app/lib/auth";

export const { GET, POST } = handlers;
