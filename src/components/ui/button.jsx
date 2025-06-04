import React from 'react';
import { cn } from "@/lib/utils"; // Corrected import path for @ alias
// import { cn } from "../../lib/utils.js" // Corrected import path for relative path.

const Button = React.forwardRef(
  ({
    variant = "default",
    size = "default",
    className,
    children,
    asChild = false,
    ...props
  }, ref) => {
    const baseClasses = cn(
      "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
      // Variant styles
      variant === "default" &&
        "bg-primary text-primary-foreground hover:bg-primary/90",
      variant === "destructive" &&
        "bg-destructive text-destructive-foreground hover:bg-destructive/90",
      variant === "outline" &&
        "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
      variant === "secondary" &&
        "bg-secondary text-secondary-foreground hover:bg-secondary/80",
      variant === "ghost" && "hover:bg-accent hover:text-accent-foreground",
      variant === "link" && "text-primary hover:underline",
      // Size styles
      size === "default" && "px-4 py-2",
      size === "sm" && "px-3 py-1.5 text-xs",
      size === "lg" && "px-6 py-3 text-base",
      size === "icon" && "h-9 w-9 p-0",
      className
    );

    // Use React.createElement to conditionally render a different component
    if (asChild) {
      const Component = props.as; // Get the 'as' prop
      delete props.as; // Remove 'as' from the props we pass down
      return React.createElement(
        Component,
        { ref: ref, ...props, className: baseClasses },
        children
      );
    }

    return (
      <button ref={ref} className={baseClasses} {...props}>
        {children}
      </button>
    );
  });
Button.displayName = "Button";

export { Button };
