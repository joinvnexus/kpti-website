import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 text-center">
      <h2 className="text-4xl font-bold text-slate-900">404</h2>
      <p className="mt-2 text-lg text-slate-600">Page Not Found</p>
      <p className="mt-1 text-sm text-slate-500">
        The page you are looking for does not exist.
      </p>
      <Link
        href="/"
        className="mt-6 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
      >
        Go back home
      </Link>
    </div>
  );
}
