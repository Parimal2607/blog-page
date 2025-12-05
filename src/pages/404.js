import Link from "next/link";

export default function NotFoundPage() {
  return (
    <main className="not-found-page">
      <div className="not-found-card">
        <p className="not-found-label">404</p>
        <h1>We couldn’t find that page.</h1>
        <p>
          The link may be broken or the page may have been removed. Try heading
          back to the homepage to continue reading.
        </p>
        <Link href="/" className="not-found-button">
          Go back home
        </Link>
      </div>
    </main>
  );
}

