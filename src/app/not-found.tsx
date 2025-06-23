export default function NotFound() {
  return (
    <div className="h-screen flex flex-col justify-center items-center text-center">
      <h1 className="text-3xl font-bold mb-2">404 – Page Not Found</h1>
      <p className="text-muted-foreground mb-4">That page doesn't exist.</p>
      <a href="/" className="underline text-blue-600">Return to dashboard</a>
    </div>
  );
}
