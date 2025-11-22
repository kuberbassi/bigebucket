import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.error('Error caught by boundary:', error, errorInfo);
        this.setState({
            error,
            errorInfo
        });
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-50 to-blue-50 p-4">
                    <div className="max-w-2xl w-full bg-white rounded-2xl shadow-2xl p-8">
                        <div className="text-center">
                            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-100 mb-6">
                                <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                            </div>

                            <h1 className="text-3xl font-bold text-gray-900 mb-4">
                                Oops! Something went wrong
                            </h1>

                            <p className="text-gray-600 mb-6">
                                We're sorry for the inconvenience. The application encountered an error.
                            </p>

                            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 text-left">
                                <p className="text-sm font-mono text-red-800 break-words">
                                    {this.state.error && this.state.error.toString()}
                                </p>
                            </div>

                            <div className="flex gap-4 justify-center">
                                <button
                                    onClick={() => window.location.reload()}
                                    className="px-6 py-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
                                >
                                    Reload Page
                                </button>

                                <button
                                    onClick={() => window.location.href = '/'}
                                    className="px-6 py-3 bg-white text-teal-600 font-semibold rounded-lg shadow-md border-2 border-teal-500 hover:bg-teal-50 transform hover:-translate-y-0.5 transition-all duration-200"
                                >
                                    Go Home
                                </button>
                            </div>

                            {process.env.NODE_ENV === 'development' && this.state.errorInfo && (
                                <details className="mt-8 text-left">
                                    <summary className="cursor-pointer text-sm font-semibold text-gray-700 hover:text-teal-600">
                                        View Error Details (Development Only)
                                    </summary>
                                    <pre className="mt-4 p-4 bg-gray-100 rounded-lg overflow-auto text-xs text-gray-800">
                                        {this.state.errorInfo.componentStack}
                                    </pre>
                                </details>
                            )}
                        </div>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
