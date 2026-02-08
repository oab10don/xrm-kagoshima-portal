import Link from "next/link";
import { siteConfig, socialLinks, contactConfig } from "@/lib/config";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50 pb-16 dark:border-gray-800 dark:bg-gray-950">
      <div className="mx-auto max-w-5xl px-4 py-12">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          {/* Brand */}
          <div>
            <p className="text-lg font-bold text-gray-900 dark:text-white">
              {siteConfig.shortName}
            </p>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              {siteConfig.description}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
              サイトマップ
            </h3>
            <ul className="mt-3 space-y-2" role="list">
              {[
                { href: "/events", label: "イベント" },
                { href: "/reports", label: "レポート" },
                { href: "/about", label: "About" },
                { href: "/contact", label: "お問い合わせ" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-500 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* External Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
              リンク
            </h3>
            <ul className="mt-3 space-y-2" role="list">
              <li>
                <a
                  href={socialLinks.discord}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-500 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                >
                  Discord
                </a>
              </li>
              <li>
                <a
                  href={socialLinks.connpass}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-500 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                >
                  connpass
                </a>
              </li>
              <li>
                <a
                  href={socialLinks.note}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-500 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                >
                  note
                </a>
              </li>
              <li>
                <a
                  href={socialLinks.x}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-500 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                >
                  X (Twitter)
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${contactConfig.email}`}
                  className="text-sm text-gray-500 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                >
                  お問い合わせ
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-gray-200 pt-6 dark:border-gray-800">
          <p className="text-center text-xs text-gray-400 dark:text-gray-500">
            &copy; {new Date().getFullYear()} {siteConfig.name}. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
