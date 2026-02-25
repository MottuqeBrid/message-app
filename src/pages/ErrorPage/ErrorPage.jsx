import { Link, useNavigate } from "react-router";

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <section className="min-h-screen grid place-items-center px-4 py-10">
      <div className="card w-full max-w-lg bg-base-200 shadow-xl border border-base-300">
        <div className="card-body items-center text-center gap-4">
          <div className="badge badge-primary badge-outline">404</div>
          <h1 className="text-3xl md:text-4xl font-bold">Page not found</h1>
          <p className="text-base-content/80 max-w-md">
            The page you are looking for doesn&apos;t exist or may have been
            moved.
          </p>
          <div className="card-actions justify-center mt-2">
            <Link to="/" className="btn btn-primary">
              Go Home
            </Link>
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => navigate(-1)}
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ErrorPage;
