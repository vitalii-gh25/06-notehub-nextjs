//app/error.tsx

"use client";

export default function Error({ error }: { error: Error }) {
  return <p>Could not fetch data. {error?.message ?? "Unknown error"}</p>;
}
