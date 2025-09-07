import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }
  
  handleReset = () => {
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[50vh] text-center p-8 bg-gray-800/50 rounded-lg border border-red-500/50 mx-auto max-w-2xl animate-fade-in">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-red-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <h1 className="text-3xl font-bold text-red-400 mb-2">Oops! Something went wrong.</h1>
          <p className="text-gray-300 mb-6">There was an unexpected error. Please try refreshing the page.</p>
          {this.state.error && (
            <details className="w-full bg-gray-900 p-3 rounded-md text-left mb-6">
                <summary className="cursor-pointer font-semibold text-gray-400">Error Details</summary>
                <pre className="mt-2 text-sm text-red-300 overflow-auto whitespace-pre-wrap">
                {this.state.error.toString()}
                </pre>
            </details>
          )}
          <button
            onClick={this.handleReset}
            className="px-6 py-2 bg-cyan-500 text-white font-bold rounded-lg shadow-lg hover:bg-cyan-400 transition-colors duration-300"
          >
            Refresh Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
