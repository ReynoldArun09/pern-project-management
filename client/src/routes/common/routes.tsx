import SignInPage from "@/pages/auth/sign-in-page";
import { AUTH_ROUTES } from "./routePaths";
import SignUpPage from "@/pages/auth/sign-up-page";
import GoogleOAuthFailure from "@/pages/auth/google-auth-fail-page";

export const authenticationRoutePaths = [
  { path: AUTH_ROUTES.SIGN_IN, element: <SignInPage /> },
  { path: AUTH_ROUTES.SIGN_UP, element: <SignUpPage /> },
  { path: AUTH_ROUTES.GOOGLE_OAUTH_CALLBACK, element: <GoogleOAuthFailure /> },
];

