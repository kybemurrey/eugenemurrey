import { Component, type ReactNode } from "react";
import { reportError } from "@/lib/errorReporting";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: { componentStack?: string }) {
    reportError({
      kind: "runtime",
      message: `React error boundary: ${error.message}`,
      stack: `${error.stack ?? ""}\n${info.componentStack ?? ""}`.trim(),
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-background flex items-center justify-center px-6">
          <div className="max-w-md text-center glass-card p-8">
            <h1 className="text-2xl font-bold mb-2">Something went wrong</h1>
            <p className="text-sm text-muted-foreground mb-6">
              An unexpected error occurred. The issue has been reported.
            </p>
            <button
              onClick={() => window.location.assign(import.meta.env.BASE_URL)}
              className="text-primary underline underline-offset-4 text-sm"
            >
              Return to homepage
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
