// SPDX-FileCopyrightText: 2026 SecPal
// SPDX-License-Identifier: AGPL-3.0-or-later

/**
 * An optional callout line for changelog entries that deserve brief context.
 * Use sparingly — only for genuinely significant changes.
 *
 * Usage in MDX (no import needed — globally registered):
 *   <WhyItMatters>
 *     Operators can now enrol devices without manual IT involvement.
 *   </WhyItMatters>
 */
export function WhyItMatters({ children }: { children: React.ReactNode }) {
  return (
    <div className="border-l-2 border-sky-600/40 py-1 pl-5 text-sm/6 text-gray-500 italic dark:border-sky-500/30 dark:text-gray-400">
      <span className="font-semibold text-gray-400 not-italic dark:text-gray-500">
        Why it matters:{' '}
      </span>
      {children}
    </div>
  )
}
