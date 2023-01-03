/**
 * Contains ErrorBoundary component.
 * @module app/providers/ErrorBoundary
 */

import { Component } from 'react';
import type { ErrorInfo, PropsWithChildren, ReactNode } from 'react';

import { getLogger } from '../../../shared/log';

type ErrorBoundaryProps = PropsWithChildren<{
    fallback: ReactNode;
}>;

type ErrorBoundaryState = {
    hasError: boolean;
};

const logger = getLogger('ErrorBoundary');

/**
 * Creates ErrorBoundary component.
 * @constructor
 * @extends {Component}
 * @return {*} Renders children or fallback component.
 * Reference: @see {@link https://reactjs.org/docs/error-boundaries.html#introducing-error-boundaries}
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
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
     * This lifecycle is invoked after an error has been thrown by a descendant component.
     * @return {ErrorBoundaryState} new state.
     */
    public static getDerivedStateFromError(): ErrorBoundaryState {
        return {
            hasError: true,
        };
    }

    /**
     * Is invoked on every component update.
     * @param {ErrorBoundaryProps} prevProps - previous component props.
     */
    public componentDidUpdate(prevProps: ErrorBoundaryProps): void {
        const { props } = this;

        if (prevProps.children !== props.children) {
            this.setState({ hasError: false });
        }
    }

    /**
     * Is invoked in case of error.
     * @param {Error} error - error object.
     * @param {ErrorInfo} info - error info object.
     */
    public componentDidCatch(error: Error, info: ErrorInfo): void { // eslint-disable-line class-methods-use-this
        logger.error(`Application error: ${error.stack || ''}, componentStack: ${String(info)}`);
    }

    /**
     * Renders children or fallback component.
     * @return {ReactNode} children or fallback Cmp.
     */
    public render(): ReactNode {
        const { props, state } = this;

        if (state.hasError) {
            return props.fallback;
        }

        return props.children;
    }
}
