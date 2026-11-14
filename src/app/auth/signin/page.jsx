"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

import {
  Alert,
  Button,
  Checkbox,
  Input,
  Label,
  Spinner,
  TextField,
} from "@heroui/react";

import { ArrowLeft, Eye, EyeSlash } from "@gravity-ui/icons";

import { authClient } from "@/lib/auth-client";

// Change these if your routes live elsewhere (e.g. "/auth/sign-up").
const SIGN_UP_PATH = "/auth/signup";
const HOME_PATH = "/";
const DEFAULT_REDIRECT = "/";
const REDIRECT_DELAY_MS = 800;

// Only allow internal paths so ?callbackUrl= can't redirect to another site.
function getSafeRedirect(value) {
  if (!value || !value.startsWith("/") || value.startsWith("//")) {
    return DEFAULT_REDIRECT;
  }
  return value;
}

// Map Better Auth error codes to friendly messages.
function getErrorMessage(error) {
  switch (error?.code) {
    case "INVALID_EMAIL_OR_PASSWORD":
    case "CREDENTIAL_ACCOUNT_NOT_FOUND":
      return "Incorrect email or password.";
    case "EMAIL_NOT_VERIFIED":
      return "Please verify your email address before signing in. Check your inbox for the verification link.";
    default:
      if (error?.status === 429) {
        return "Too many attempts. Please wait a moment and try again.";
      }
      return error?.message || "Unable to sign in.";
  }
}

function SignInForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const redirectTo = getSafeRedirect(callbackUrl);

  // Keep ?callbackUrl= when switching to the sign-up page and back.
  const signUpHref = callbackUrl
    ? `${SIGN_UP_PATH}?callbackUrl=${encodeURIComponent(redirectTo)}`
    : SIGN_UP_PATH;

  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [redirecting, setRedirecting] = useState(false);
  const [message, setMessage] = useState(null);
  const redirectTimer = useRef(null);

  useEffect(() => () => clearTimeout(redirectTimer.current), []);

  const updateField = (field) => (value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (message?.type === "error") setMessage(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading || redirecting) return;

    setMessage(null);

    const email = form.email.trim().toLowerCase();

    if (!email) {
      setMessage({ type: "error", text: "Please enter your email address." });
      return;
    }

    if (!form.password) {
      setMessage({ type: "error", text: "Please enter your password." });
      return;
    }

    setLoading(true);

    try {
      const { error } = await authClient.signIn.email({
        email,
        password: form.password,
        rememberMe,
      });

      if (error) {
        setMessage({ type: "error", text: getErrorMessage(error) });
        // Clear the password after a failed attempt, keep the email.
        setForm((prev) => ({ ...prev, password: "" }));
        return;
      }

      setMessage({
        type: "success",
        text: "Signed in successfully! Redirecting…",
      });
      setRedirecting(true);

      redirectTimer.current = setTimeout(() => {
        // Full navigation so the whole app picks up the new session cookie.
        // replace() so the back button doesn't return to the sign-in page.
        // (router.replace + router.refresh raced: refresh re-fetched the
        // sign-in route and cancelled the navigation, leaving it stuck.)
        window.location.replace(redirectTo);
      }, REDIRECT_DELAY_MS);
    } catch {
      setMessage({
        type: "error",
        text: "Something went wrong. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const busy = loading || redirecting;

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4 py-12 text-foreground">
      <div className="w-full max-w-md">
        {/* Back navigation */}
        <Link
          href={HOME_PATH}
          className="mb-8 inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Back to home
        </Link>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight">
            Welcome back
          </h1>

          <p className="mt-2 text-sm text-muted">
            Sign in to your account to continue.
          </p>
        </div>

        {/* Form container */}
        <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            {/* Email */}
            <TextField
              name="email"
              type="email"
              isRequired
              isDisabled={busy}
              className="w-full"
              value={form.email}
              onChange={updateField("email")}
            >
              <Label>Email address</Label>
              <Input
                placeholder="john@example.com"
                autoComplete="email"
                variant="secondary"
                className="w-full"
              />
            </TextField>

            {/* Password */}
            <TextField
              name="password"
              isRequired
              isDisabled={busy}
              className="w-full"
              value={form.password}
              onChange={updateField("password")}
            >
              <Label>Password</Label>

              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  maxLength={128}
                  variant="secondary"
                  className="w-full pr-12"
                />

                <button
                  type="button"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  aria-pressed={showPassword}
                  disabled={busy}
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-muted transition-colors hover:text-foreground disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {showPassword ? (
                    <EyeSlash className="size-5" />
                  ) : (
                    <Eye className="size-5" />
                  )}
                </button>
              </div>
            </TextField>

            {/* Remember me */}
            <Checkbox
              name="rememberMe"
              isSelected={rememberMe}
              isDisabled={busy}
              onChange={setRememberMe}
            >
              <Checkbox.Content>
                <Checkbox.Control>
                  <Checkbox.Indicator />
                </Checkbox.Control>
                <Label>Remember me</Label>
              </Checkbox.Content>
            </Checkbox>

            {/* Error / Success feedback */}
            {message && (
              <Alert
                status={message.type === "error" ? "danger" : "success"}
                role="status"
                aria-live="polite"
              >
                <Alert.Indicator />
                <Alert.Content>
                  <Alert.Title>
                    {message.type === "error" ? "Sign in failed" : "Welcome back!"}
                  </Alert.Title>
                  <Alert.Description>{message.text}</Alert.Description>
                </Alert.Content>
              </Alert>
            )}

            {/* Submit */}
            <Button
              type="submit"
              fullWidth
              isPending={loading}
              isDisabled={busy}
              className="mt-2"
            >
              {loading ? (
                <>
                  <Spinner size="sm" color="current" />
                  Signing in...
                </>
              ) : redirecting ? (
                "Redirecting..."
              ) : (
                "Sign in"
              )}
            </Button>
          </form>
        </div>

        {/* Sign up navigation */}
        <p className="mt-6 text-center text-sm text-muted">
          Don&apos;t have an account?{" "}
          <Link
            href={signUpHref}
            className="font-medium text-foreground underline underline-offset-4 hover:opacity-75"
          >
            Create one
          </Link>
        </p>
      </div>
    </main>
  );
}

// useSearchParams() needs a Suspense boundary in the App Router.
export default function SignInPage() {
  return (
    <Suspense fallback={null}>
      <SignInForm />
    </Suspense>
  );
}