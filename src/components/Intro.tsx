// SPDX-FileCopyrightText: 2026 SecPal
// SPDX-FileCopyrightText: Tailwind Labs Inc.
// SPDX-License-Identifier: AGPL-3.0-or-later AND LicenseRef-TailwindPlus
import Link from 'next/link'

import { IconLink } from '@/components/IconLink'
import { Logo } from '@/components/Logo'

function GitHubIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" fill="currentColor" {...props}>
      <path d="M8 .198a8 8 0 0 0-8 8 7.999 7.999 0 0 0 5.47 7.59c.4.076.547-.172.547-.384 0-.19-.007-.694-.01-1.36-2.226.482-2.695-1.074-2.695-1.074-.364-.923-.89-1.17-.89-1.17-.725-.496.056-.486.056-.486.803.056 1.225.824 1.225.824.714 1.224 1.873.87 2.33.666.072-.518.278-.87.507-1.07-1.777-.2-3.644-.888-3.644-3.954 0-.873.31-1.586.823-2.146-.09-.202-.36-1.016.07-2.118 0 0 .67-.214 2.2.82a7.67 7.67 0 0 1 2-.27 7.67 7.67 0 0 1 2 .27c1.52-1.034 2.19-.82 2.19-.82.43 1.102.16 1.916.08 2.118.51.56.82 1.273.82 2.146 0 3.074-1.87 3.75-3.65 3.947.28.24.54.73.54 1.48 0 1.07-.01 1.93-.01 2.19 0 .21.14.46.55.38A7.972 7.972 0 0 0 16 8.199a8 8 0 0 0-8-8Z" />
    </svg>
  )
}

function FeedIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" fill="currentColor" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.5 3a.5.5 0 0 1 .5-.5h.5c5.523 0 10 4.477 10 10v.5a.5.5 0 0 1-.5.5h-.5a.5.5 0 0 1-.5-.5v-.5A8.5 8.5 0 0 0 3.5 4H3a.5.5 0 0 1-.5-.5V3Zm0 4.5A.5.5 0 0 1 3 7h.5A5.5 5.5 0 0 1 9 12.5v.5a.5.5 0 0 1-.5.5H8a.5.5 0 0 1-.5-.5v-.5a4 4 0 0 0-4-4H3a.5.5 0 0 1-.5-.5v-.5Zm0 5a1 1 0 1 1 2 0 1 1 0 0 1-2 0Z"
      />
    </svg>
  )
}

function GlobeIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" fill="currentColor" {...props}>
      <path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1ZM2.046 7.5H4.07a13.697 13.697 0 0 1 .198-2.302A7.03 7.03 0 0 1 2.046 7.5ZM5.577 7.5H8V2.077A6.015 6.015 0 0 0 5.82 4.16 12.218 12.218 0 0 0 5.577 7.5ZM9 2.077V7.5h2.423a12.218 12.218 0 0 0-.243-3.34A6.015 6.015 0 0 0 9 2.077ZM11.93 7.5h2.023a7.03 7.03 0 0 0-2.22-2.802A13.698 13.698 0 0 1 11.93 7.5ZM13.953 8.5H11.93a13.698 13.698 0 0 1-.197 2.302A7.03 7.03 0 0 1 13.953 8.5ZM10.423 8.5H8v5.423a6.015 6.015 0 0 0 2.757-2.083 12.218 12.218 0 0 0 .243-3.34 ZM7 13.923V8.5H4.577a12.218 12.218 0 0 0 .2433.34A6.015 6.015 0 0 0 7 13.923ZM4.07 8.5H2.046a7.03 7.03 0 0 0 2.222 2.802A13.698 13.698 0 0 1 4.069 8.5Z" />
    </svg>
  )
}

export function Intro() {
  return (
    <>
      <div>
        <Link href="/">
          <Logo className="inline-block h-8 w-auto" />
        </Link>
      </div>
      <h1 className="mt-14 font-display text-4xl/tight font-light text-white">
        What&apos;s new in{' '}
        <span className="text-sky-300">SecPal</span>
      </h1>
      <p className="mt-4 text-sm/6 text-gray-300">
        Follow every feature, improvement, and Android release as we build
        SecPal — security-focused mobile device management for modern
        organisations.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-x-1 gap-y-3 sm:gap-x-2 lg:justify-start">
        <IconLink href="https://secpal.app" icon={GlobeIcon} className="flex-none">
          secpal.app
        </IconLink>
        <IconLink
          href="https://github.com/SecPal"
          icon={GitHubIcon}
          className="flex-none"
        >
          GitHub
        </IconLink>
        <IconLink href="/feed.xml" icon={FeedIcon} className="flex-none">
          RSS
        </IconLink>
      </div>
    </>
  )
}

export function IntroFooter() {
  return (
    <p className="flex items-baseline gap-x-2 text-[0.8125rem]/6 text-gray-500">
      Built by{' '}
      <IconLink href="https://secpal.app" icon={GlobeIcon} compact>
        SecPal
      </IconLink>
    </p>
  )
}
