export function NotFound() {
  return (
    <main className="error-page">
      <h2 className="error-page__section error-page__section--heading">404</h2>

      <div className="error-page__section error-page__section--info">
        <span className="info__text">Page not found</span>

        <a className="info__btn" href="/">
          Back to home page
        </a>
      </div>
    </main>
  );
}
