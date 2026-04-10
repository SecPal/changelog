// SPDX-FileCopyrightText: 2026 SecPal
// SPDX-FileCopyrightText: Tailwind Labs Inc.
// SPDX-License-Identifier: AGPL-3.0-or-later AND LicenseRef-TailwindPlus

export function Logo(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg
      viewBox="0 0 120 32"
      fill="none"
      aria-hidden="true"
      {...props}
    >
      <title>SecPal</title>
      <text
        x="0"
        y="24"
        fontFamily="var(--font-mona-sans), ui-sans-serif, system-ui, sans-serif"
        fontWeight="600"
        fontSize="26"
        fill="currentColor"
        className="fill-white"
      >
        SecPal
      </text>
    </svg>
  )
}
