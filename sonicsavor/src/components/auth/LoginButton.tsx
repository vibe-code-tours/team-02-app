"use client";

import { useUser } from "@auth0/nextjs-auth0/client";

export default function LoginButton() {
  const { user, isLoading } = useUser();

  if (isLoading) return <div className="w-20 h-8 bg-gray-200 animate-pulse rounded" />;

  if (user) {
    return (
      <div className="flex items-center gap-3">
        <img src={user.picture} alt={user.name} className="w-8 h-8 rounded-full" />
        <a
          href="/auth/logout"
          className="px-4 py-2 text-sm text-gray-700 hover:text-gray-900"
        >
          Logout
        </a>
      </div>
    );
  }

  return (
    <a
      href="/auth/login"
      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
    >
      Login with Google
    </a>
  );
}
