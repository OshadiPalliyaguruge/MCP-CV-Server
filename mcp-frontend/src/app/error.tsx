"use client";

export default function Error({ error }: { error?: Error }) {
  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>Oops! Something went wrong.</h1>
      <p>{error?.message}</p>
    </div>
  );
}
