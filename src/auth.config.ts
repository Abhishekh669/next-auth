import type { NextAuthConfig } from "next-auth";

import { credentialsConfig } from "./auth";


export const authConfig = {
  
  providers: [
    // credentialsConfig
  ],
  
} satisfies NextAuthConfig;
