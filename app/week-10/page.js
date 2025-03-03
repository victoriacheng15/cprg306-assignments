"use client";

import { useState } from "react";
import Link from "next/link";
import { useUserAuth } from "./_utils/auth-context";

export default function Page() {
  const { user, gitHubSignIn, firebaseSignOut } = useUserAuth();
  const [showMessage, setShowMessage] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    setShowMessage(true);
  };

  const handleSignIn = async () => {
    try {
      await gitHubSignIn();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSignOut = async () => {
    try {
      await firebaseSignOut();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {user ? (
        <div className="text-center grid gap-4">
          <p className="mb-4">
            Welcome, {user.displayName} ({user.email})
          </p>
          <ShoppingLink />
          <button
            onClick={handleSignOut}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
          >
            Sign Out
          </button>
        </div>
      ) : (
        <div className="grid gap-4">
          <ShoppingLink onClick={handleClick} />
          {showMessage && (
            <p className="text-red-400 mt-2">
              Please log in to access the shopping list.
            </p>
          )}
          <button
            onClick={handleSignIn}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Sign In with GitHub
          </button>
        </div>
      )}
    </div>
  );
}

function ShoppingLink({ onClick }) {
  return (
    <Link
      className="text-blue-500 text-lg hover:text-blue-700 transition-colors duration-200"
      href="/week-10/shopping-list"
      onClick={onClick}
    >
      Go to shopping list
    </Link>
  );
}
