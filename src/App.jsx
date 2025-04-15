import AppProvidersWrapper from "./components/wrappers/AppProvidersWrapper";

import AppRouter from "./routes/router";
import "@/assets/scss/app.scss";
import { ErrorBoundary } from "react-error-boundary";

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}

// In your component usage:

function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <AppProvidersWrapper>
        <AppRouter />
      </AppProvidersWrapper>
    </ErrorBoundary>
  );
}
export default App;
