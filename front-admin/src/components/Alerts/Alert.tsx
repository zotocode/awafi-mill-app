import * as React from "react"

interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {}
interface AlertDescriptionProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Alert({ children, className, ...props }: AlertProps) {
  return (
    <div
      role="alert"
      className={`relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}

export function AlertDescription({ className, ...props }: AlertDescriptionProps) {
  return (
    <div
      className={`text-sm [&_p]:leading-relaxed ${className}`}
      {...props}
    />
  )
}