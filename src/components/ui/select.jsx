import React, { forwardRef } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"

export const AppSelect = forwardRef((props, ref) => {
    const {
        value,
        defaultValue,
        onValueChange,
        children,
        className,
        triggerClassName,
        contentClassName,
        itemClassName,
        placeholder,
        disabled
    } = props;

    return (
        <Select
            value={value}
            defaultValue={defaultValue}
            onValueChange={onValueChange}
            disabled={disabled}
            className={cn(className)}
        >
            <SelectTrigger
                ref={ref}
                className={cn(
                    "w-full",
                    "bg-black/40 text-white border-gray-700",  // Consistent styling
                    "focus:ring-2 focus:ring-purple-500 focus:border-purple-500", // Focus outline
                    "hover:bg-black/50", // Hover effect
                    triggerClassName
                )}
            >
                <SelectValue placeholder={placeholder || "Select an option"} className="text-white" />
            </SelectTrigger>
            <SelectContent
                className={cn(
                    "bg-gray-900 border-gray-700 text-white", // Dark content
                    contentClassName
                )}
            >
                {React.Children.map(children, (child) => {
                    if (React.isValidElement(child)) {
                        return React.cloneElement(child, {
                            className: cn(itemClassName, "hover:bg-gray-800 focus:bg-gray-800")
                        });
                    }
                    return child;
                })}
            </SelectContent>
        </Select>
    );
});
AppSelect.displayName = 'AppSelect';

export default Select;  // Or export default function Select(...) { ... }
