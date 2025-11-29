"use client";

export function NewsletterForm() {
  return (
    <form className="flex w-full" onSubmit={(e) => e.preventDefault()}>
      <input
        type="email"
        placeholder="Enter your email"
        className="grow min-w-0 px-3 py-2 bg-surface border border-border rounded-l-sm text-sm focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent"
      />
      <button
        type="submit"
        className="bg-accent text-white px-4 py-2 text-sm font-medium rounded-r-sm hover:bg-accent-hover transition-colors"
      >
        &rarr;
      </button>
    </form>
  );
}