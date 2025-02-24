import React, { ErrorInfo, ReactNode } from 'react';

type ErrorBoundaryState = {
  hasError: boolean;
  error?: Error;
};

type ErrorBoundaryProps = {
  fallback?: React.ReactElement<{ error?: Error }>;
  children: ReactNode;
};

export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.log(error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return React.cloneElement(this.props.fallback, {
          error: this.state.error,
        });
      }

      return <p>Something went wrong.</p>;
    }

    return this.props.children;
  }
}
