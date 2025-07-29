import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher(["/generate", "/generate-program", "/profile"]);

// It ensures that users are authenticated before accessing specific paths like /generate-program and /profile.

// createRouteMatcher(...) is a helper function (from Clerk or a related library) that creates a function to check if a request path matches one of the specified routes.

// So, isProtectedRoute becomes a function that returns true if the request's path is either /generate-program or /profile.


export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) await auth.protect();
});


// auth — The Authentication Object
// This is provided by Clerk and contains methods for handling user authentication. One common method is:

// auth.protect() → Ensures the user is signed in. If not, it redirects to the sign-in page.

// There are also other methods like:

// auth.userId → Gets the current user ID.

// auth.sessionId → Gets the current session.

// You can think of auth as your gatekeeper — it checks and enforces access control.

// req — The Incoming Request
// This is the HTTP request object representing the request made by the user. It includes:

// req.url or req.pathname → The path the user is trying to access.

// Headers, method, body, etc.

// It lets you inspect what the user is asking for — kind of like the "question" to which your server responds.

// Example Scenario
// Let’s say a user visits:
// https://yourapp.com/profile

// Internally:
// req.pathname is /profile

// isProtectedRoute(req) returns true

// auth.protect() runs

// If user is authenticated → continues to /profile

// If not authenticated → redirects to Clerk's sign-in page

// req is like someone knocking on your door and telling you what they want.

// auth is the doorman. If someone asks to go into a VIP area (/profile), the doorman checks if they have a wristband (are signed in). If not, he redirects them to registration (sign-in).



export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
