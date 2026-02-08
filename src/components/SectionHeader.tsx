import Link from "next/link";

type Props = {
  title: string;
  description?: string;
  linkHref?: string;
  linkLabel?: string;
  center?: boolean;
};

export default function SectionHeader({
  title,
  description,
  linkHref,
  linkLabel,
  center = false,
}: Props) {
  return (
    <div
      className={`mb-8 ${
        center
          ? "text-center"
          : "flex items-end justify-between gap-4"
      }`}
    >
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          {title}
        </h2>
        {description && (
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {description}
          </p>
        )}
      </div>
      {linkHref && linkLabel && (
        <Link
          href={linkHref}
          className={`text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 ${
            center ? "mt-2 inline-block" : "shrink-0"
          }`}
        >
          {linkLabel} →
        </Link>
      )}
    </div>
  );
}
