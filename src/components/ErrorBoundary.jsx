// src/components/ErrorBoundary.jsx
import React, { Component } from 'react';

class ErrorBoundary extends Component {
  state = { hasError: false, error: null, errorInfo: null };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ error, errorInfo });
  }

  render() {
    if (this.state.hasError) {
    
      return (
        <div>
          <h2>Oops, something went wrong. Please try again later.</h2>
          <details style={{ whiteSpace: 'pre-wrap' }}>
            <summary>Click for error details</summary>
            {this.state.error && <pre>{JSON.stringify(this.state.error, null, 2)}</pre>}
            {this.state.errorInfo && <pre>{JSON.stringify(this.state.errorInfo, null, 2)}</pre>}
          </details>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
