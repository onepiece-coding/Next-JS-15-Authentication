import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// create a matcher for the routes you want to protect
// const isProtectedRoute = createRouteMatcher(["/user-profile"]);
const isPublicRoute = createRouteMatcher(["/", "/sign-in(.*)", "/sign-up(.*)"]);

const isAdminRoute = createRouteMatcher(["/admin(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  // if (isProtectedRoute(req)) await auth.protect();
  // if (!isPublicRoute(req)) await auth.protect();
  const { userId, redirectToSignIn } = await auth();
  if (!userId && !isPublicRoute(req)) {
    // Add custom logic to run before redirecting
    return redirectToSignIn();
  }
  // protect method will redirect the user to signIn page auto

  if (
    isAdminRoute(req) &&
    (await auth()).sessionClaims?.metadata.role !== "admin"
  ) {
    return NextResponse.redirect(new URL("/", req.url));
  }
});

// This will helps us access auth data, and configure protected routes
export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
