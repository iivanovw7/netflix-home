/**
 * Contains ErrorBoundary component.
 * @module shared/component/ErrorBoundary
 */

import { Component } from 'react';
import type { ErrorInfo, PropsWithChildren, ReactNode } from 'react';

import { ctx } from '../../context';

type ErrorBoundaryProps = PropsWithChildren<{
    fallback: ReactNode;
}>;

type ErrorBoundaryState = {
    hasError: boolean;
};

/**
 * Creates ErrorBoundary component.
 * @constructor
 * @extends {Component}
 * @return {*} Renders children or fallback component.
 * Reference: @see {@link https://reactjs.org/docs/error-boundaries.html#introducing-error-boundaries}
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    /**
     * This lifecycle is invoked after an error has been thrown by a descendant component.
     * @return {ErrorBoundaryState} new state.
     */
    static getDerivedStateFromError(): ErrorBoundaryState {
        return {
            hasError: true,
        };
    }

    /**
     * Creates class instance.
     * @param {ErrorBoundaryProps} props - contains component props.
     */
    constructor(props: ErrorBoundaryProps) {
        super(props);

        this.state = {
            hasError: false
        };
    }

    /**
     * Is invoked on every component update.
     * @param {ErrorBoundaryProps} prevProps - previous component props.
     */
    componentDidUpdate(prevProps: ErrorBoundaryProps): void {
        if (prevProps.children !== this.props.children) {
            this.setState({ hasError: false });
        }
    }

    /**
     * Is invoked in case of error.
     * @param {Error} error - error object.
     * @param {ErrorInfo} info - error info object.
     */
    componentDidCatch(error: Error, info: ErrorInfo): void { // eslint-disable-line class-methods-use-this
        ctx.errorBoundary.log(error, info);
    }

    /**
     * Renders children or fallback component.
     * @return {ReactNode} children or fallback Cmp.
     */
    render(): ReactNode {
        if (this.state.hasError) {
            return this.props.fallback;
        }

        return this.props.children;
    }
}
