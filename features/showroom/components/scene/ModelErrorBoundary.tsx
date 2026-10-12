"use client";

import { Component, type ErrorInfo, type ReactNode } from "react";

type ModelErrorBoundaryProps = {
  fallback: ReactNode;
  children: ReactNode;
};

type ModelErrorBoundaryState = {
  hasError: boolean;
};

/** Swaps in the fallback car when the GLB cannot be fetched or parsed, instead of crashing the canvas. */
export class ModelErrorBoundary extends Component<ModelErrorBoundaryProps, ModelErrorBoundaryState> {
  override state: ModelErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ModelErrorBoundaryState {
    return { hasError: true };
  }

  override componentDidCatch(error: Error, info: ErrorInfo) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("[showroom] GLB model unavailable, using the procedural fallback.", error, info.componentStack);
    }
  }

  override render() {
    return this.state.hasError ? this.props.fallback : this.props.children;
  }
}
