// SPDX-FileCopyrightText: 2026 SecPal
// SPDX-License-Identifier: AGPL-3.0-or-later

import clsx from 'clsx'

export type LabelKind =
  | 'added'
  | 'improved'
  | 'fixed'
  | 'changed'
  | 'android'
  | 'api'
  | 'web'
  | 'auth'
  | 'security'
  | 'breaking'

interface LabelProps {
  kind?: LabelKind
  children: React.ReactNode
}

const KIND_CLASSES: Record<LabelKind, string> = {
  added:
    'text-gray-500 border-gray-300   dark:text-gray-400 dark:border-gray-600',
  improved:
    'text-gray-500 border-gray-300   dark:text-gray-400 dark:border-gray-600',
  fixed:
    'text-gray-500 border-gray-300   dark:text-gray-400 dark:border-gray-600',
  changed:
    'text-gray-500 border-gray-300   dark:text-gray-400 dark:border-gray-600',
  android:
    'text-gray-500 border-gray-300   dark:text-gray-400 dark:border-gray-600',
  api: 'text-gray-500 border-gray-300   dark:text-gray-400 dark:border-gray-600',
  web: 'text-gray-500 border-gray-300   dark:text-gray-400 dark:border-gray-600',
  auth: 'text-gray-500 border-gray-300   dark:text-gray-400 dark:border-gray-600',
  security:
    'text-amber-700/80 border-amber-400/40 dark:text-amber-400/70 dark:border-amber-600/40',
  breaking:
    'text-red-700/80   border-red-300/40   dark:text-red-400/70   dark:border-red-700/40',
}

/**
 * A small, unobtrusive taxonomy label for changelog entries.
 *
 * Usage in MDX (no import needed — globally registered):
 *   <Labels>
 *     <Label kind="added">Added</Label>
 *     <Label kind="android">Android</Label>
 *   </Labels>
 *
 * Supported kinds: added | improved | fixed | changed | android | api | web |
 *                  auth | security | breaking
 */
export function Label({ kind = 'added', children }: LabelProps) {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded border px-1.5 py-px text-2xs font-semibold tracking-wider uppercase',
        KIND_CLASSES[kind],
      )}
    >
      {children}
    </span>
  )
}

/**
 * Wrapper that lays out a row of <Label> badges.
 */
export function Labels({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-wrap gap-1.5">{children}</div>
}
