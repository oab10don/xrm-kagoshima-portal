type Props = {
  message?: string;
};

export default function FallbackMessage({
  message = "現在データを取得できません。しばらくしてから再度お試しください。",
}: Props) {
  return (
    <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 px-6 py-10 text-center dark:border-gray-700 dark:bg-gray-900">
      <svg
        className="mx-auto h-8 w-8 text-gray-400 dark:text-gray-500"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
        />
      </svg>
      <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
        {message}
      </p>
    </div>
  );
}
