import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-stone-900 px-6 text-center">
      <div>
        <div className="text-7xl font-extrabold gold-text font-serif mb-4">404</div>
        <h1 className="text-2xl font-bold text-white mb-3">Page not found</h1>
        <p className="text-stone-400 mb-8">The page you are looking for doesn't exist.</p>
        <Link to="/" className="btn-gold text-[14px] font-semibold px-8 py-3.5 rounded-full inline-flex items-center gap-2">
          <span className="iconify" data-icon="mdi:home"></span>
          Back to Home
        </Link>
      </div>
    </section>
  );
}
