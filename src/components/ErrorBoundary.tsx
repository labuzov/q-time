import React, { ErrorInfo } from 'react';

type ErrorBoundaryState = {
    error: Error | null;
    errorInfo: ErrorInfo | null;
};

type ErrorBoundaryProps = {
    children: React.ReactNode;
};

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { error: null, errorInfo: null };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        this.setState({ error, errorInfo });  
    }

    render() {
        if (this.state.errorInfo) {
            return (
                <div style={{ padding: '1rem' }}>
                    <h2>Произошла ошибка</h2>
                    <details style={{ whiteSpace: 'pre-wrap', color: 'red' }}>
                        {this.state.error && this.state.error.toString()}
                        <br/>
                        {this.state.errorInfo.componentStack}
                    </details>
                </div>
            );
        }

        return this.props.children;
    }
}
