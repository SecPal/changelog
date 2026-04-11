// SPDX-FileCopyrightText: 2026 SecPal
// SPDX-FileCopyrightText: Tailwind Labs Inc.
// SPDX-License-Identifier: AGPL-3.0-or-later AND LicenseRef-TailwindPlus
import clsx from 'clsx'

import { LogoMark } from '@/components/LogoMark'

export function Logo({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'span'>) {
  return (
    <span
      {...props}
      className={clsx('inline-flex items-center gap-3 text-white', className)}
    >
      <LogoMark className="h-8 w-8" theme="dark" />
      <span className="font-display text-[1.625rem]/none font-semibold tracking-tight text-white">
        SecPal
      </span>
    </span>
  )
}
