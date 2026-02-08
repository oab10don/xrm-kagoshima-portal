import Link from "next/link";

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "discord" | "connpass";
  external?: boolean;
};

const variantStyles = {
  primary:
    "bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600",
  secondary:
    "border border-gray-300 text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800",
  discord:
    "bg-[#5865F2] text-white hover:bg-[#4752C4]",
  connpass:
    "bg-[#E84F51] text-white hover:bg-[#D13F41]",
};

export default function CTAButton({
  href,
  children,
  variant = "primary",
  external = false,
}: Props) {
  const className = `inline-flex h-11 items-center justify-center gap-2 rounded-lg px-6 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 ${variantStyles[variant]}`;

  if (external) {
    return (
      <a
        href={href}
        className={className}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}
