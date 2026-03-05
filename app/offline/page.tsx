export default function OfflinePage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-xl flex-col items-center justify-center px-6 text-center">
      <h1 className="text-4xl font-bold">You are offline</h1>
      <p className="mt-3 text-base text-muted">
        Style Engine can still open cached pages. Reconnect to fetch new resources.
      </p>
    </main>
  );
}
