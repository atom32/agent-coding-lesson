import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "ghost" | "outline";
  size?: "default" | "sm" | "icon";
}

export function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonProps) {
  const variantClasses = {
    default: "bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700",
    ghost: "hover:bg-zinc-100 dark:hover:bg-zinc-800",
    outline: "border border-zinc-300 bg-white hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:hover:bg-zinc-800",
  };

  const sizeClasses = {
    default: "h-10 px-4 py-2",
    sm: "h-8 px-3 text-sm",
    icon: "h-10 w-10",
  };

  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-lg font-medium transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500",
        "disabled:pointer-events-none disabled:opacity-50",
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      {...props}
    />
  );
}
