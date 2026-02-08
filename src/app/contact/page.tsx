"use client";

import { useState, type FormEvent } from "react";
import { contactConfig, socialLinks } from "@/lib/config";

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    // Honeypot チェック
    if (formData.get("_hp")) {
      setStatus("sent"); // bot にはサクセスに見せる
      return;
    }

    // タイムスタンプチェック（3秒以内のsubmitはbot判定）
    const ts = Number(formData.get("_ts"));
    if (Date.now() - ts < 3000) {
      setStatus("sent");
      return;
    }

    setStatus("sending");

    // MVP: mailto リンク生成で送信
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const message = formData.get("message") as string;

    const subject = encodeURIComponent(
      `[XRm鹿児島 お問い合わせ] ${name}さんより`,
    );
    const body = encodeURIComponent(
      `名前: ${name}\nメールアドレス: ${email}\n\n${message}`,
    );

    window.location.href = `mailto:${contactConfig.email}?subject=${subject}&body=${body}`;
    setStatus("sent");
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          お問い合わせ
        </h1>
        <p className="mt-2 text-gray-500 dark:text-gray-400">
          XRm鹿児島へのご質問・ご連絡はこちらからお気軽にどうぞ。
        </p>
      </div>

      {/* Direct Links */}
      <div className="mt-6 flex flex-wrap justify-center gap-3 text-sm">
        <a
          href={`mailto:${contactConfig.email}`}
          className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 px-4 py-2 text-gray-600 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-800"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
          </svg>
          メールで連絡
        </a>
        <a
          href={socialLinks.x}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 px-4 py-2 text-gray-600 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-800"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
          X で DM
        </a>
      </div>

      {/* Contact Form */}
      <form onSubmit={handleSubmit} className="mt-10 space-y-6">
        {/* Honeypot（非表示） */}
        <div className="hidden" aria-hidden="true">
          <label htmlFor="_hp">Do not fill this field</label>
          <input type="text" id="_hp" name="_hp" tabIndex={-1} autoComplete="off" />
        </div>
        <input type="hidden" name="_ts" value={Date.now()} />

        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            お名前 <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="mt-1 block w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 transition-colors focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            メールアドレス <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="mt-1 block w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 transition-colors focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
          />
        </div>

        <div>
          <label
            htmlFor="message"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            メッセージ <span className="text-red-500">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            required
            className="mt-1 block w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 transition-colors focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
          />
        </div>

        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex h-11 items-center justify-center rounded-lg bg-blue-600 px-6 text-sm font-semibold text-white transition-colors hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:opacity-50"
        >
          {status === "sending" ? "送信中..." : "送信する"}
        </button>

        {status === "sent" && (
          <p className="text-sm text-green-600 dark:text-green-400">
            メーラーが起動します。送信をお願いします。
          </p>
        )}
        {status === "error" && (
          <p className="text-sm text-red-600 dark:text-red-400">
            送信に失敗しました。メールで直接ご連絡ください。
          </p>
        )}
      </form>
    </div>
  );
}
