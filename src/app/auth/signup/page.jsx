"use client";

import { useState } from "react";
import Link from "next/link";

import {
  Alert,
  Button,
  Input,
  Label,
  Spinner,
  TextField,
} from "@heroui/react";

import {
  ArrowLeft,
  Eye,
  EyeSlash,
} from "@gravity-ui/icons";

import { authClient } from "@/lib/auth-client";

export default function SignUpPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setMessage(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    setMessage(null);

    const name = form.name.trim();
    const email = form.email.trim().toLowerCase();

    if (!name) {
      setMessage({
        type: "error",
        text: "Please enter your name.",
      });
      return;
    }

    if (form.password.length < 8) {
      setMessage({
        type: "error",
        text: "Password must be at least 8 characters.",
      });
      return;
    }

    setLoading(true);

    try {
      const { error } = await authClient.signUp.email({
        name,
        email,
        password: form.password,
      });

      if (error) {
        setMessage({
          type: "error",
          text: error.message || "Unable to create account.",
        });
        return;
      }

      setMessage({
        type: "success",
        text: "Account created successfully! You can now sign in.",
      });

      setForm({
        name: "",
        email: "",
        password: "",
      });
    } catch (error) {
      setMessage({
        type: "error",
        text: "Something went wrong. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4 py-12 text-foreground">
      <div className="w-full max-w-md">
        {/* Back navigation */}
        <Link
          href="/sign-in"
          className="mb-8 inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Back to sign in
        </Link>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight">
            Create an account
          </h1>

          <p className="mt-2 text-sm text-muted">
            Enter your details below to get started.
          </p>
        </div>

        {/* Form container */}
        <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name */}
            <TextField
              name="name"
              isRequired
              fullWidth
              value={form.name}
              onChange={(value) =>
                setForm((prev) => ({
                  ...prev,
                  name: value,
                }))
              }
            >
              <Label>Full name</Label>
              <Input
                placeholder="John Doe"
                autoComplete="name"
                maxLength={100}
                variant="secondary"
                className="w-full"
              />
            </TextField>

            {/* Email */}
            <TextField
              name="email"
              type="email"
              isRequired
              fullWidth
              value={form.email}
              onChange={(value) =>
                setForm((prev) => ({
                  ...prev,
                  email: value,
                }))
              }
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
              fullWidth
              value={form.password}
              onChange={(value) =>
                setForm((prev) => ({
                  ...prev,
                  password: value,
                }))
              }
            >
              <Label>Password</Label>

              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  autoComplete="new-password"
                  minLength={8}
                  maxLength={128}
                  variant="secondary"
                  className="w-full pr-12"
                />

                <button
                  type="button"
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                  aria-pressed={showPassword}
                  onClick={() =>
                    setShowPassword((prev) => !prev)
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-muted transition-colors hover:text-foreground"
                >
                  {showPassword ? (
                    <EyeSlash className="size-5" />
                  ) : (
                    <Eye className="size-5" />
                  )}
                </button>
              </div>

              <p className="text-xs text-muted">
                Must be at least 8 characters.
              </p>
            </TextField>

            {/* Error / Success feedback */}
            {message && (
              <Alert
                status={
                  message.type === "error"
                    ? "danger"
                    : "success"
                }
                role="status"
                aria-live="polite"
              >
                <Alert.Indicator />
                <Alert.Content>
                  <Alert.Title>
                    {message.type === "error"
                      ? "Sign up failed"
                      : "Success"}
                  </Alert.Title>
                  <Alert.Description>
                    {message.text}
                  </Alert.Description>
                </Alert.Content>
              </Alert>
            )}

            {/* Submit */}
            <Button
              type="submit"
              fullWidth
              isPending={loading}
              isDisabled={loading}
              className="mt-2"
            >
              {loading ? (
                <>
                  <Spinner size="sm" color="current" />
                  Creating account...
                </>
              ) : (
                "Create account"
              )}
            </Button>
          </form>
        </div>

        {/* Sign in navigation */}
        <p className="mt-6 text-center text-sm text-muted">
          Already have an account?{" "}
          <Link
            href="/auth/signin"
            className="font-medium text-foreground underline underline-offset-4 hover:opacity-75"
          >
            Sign in
          </Link>
        </p>
      </div>
    </main>
  );
}
