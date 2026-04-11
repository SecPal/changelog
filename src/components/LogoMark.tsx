// SPDX-FileCopyrightText: 2026 SecPal
// SPDX-License-Identifier: AGPL-3.0-or-later
import clsx from 'clsx'

type LogoTheme = 'auto' | 'dark' | 'light'

export function LogoMark({
  className,
  theme = 'auto',
  ...props
}: React.ComponentPropsWithoutRef<'span'> & { theme?: LogoTheme }) {
  return (
    <span
      {...props}
      className={clsx(
        'relative inline-flex shrink-0 items-center justify-center',
        className,
      )}
    >
      {theme === 'auto' ? (
        // <picture> with prefers-color-scheme ensures only the matching asset is
        // fetched — the browser never downloads the inactive source.
        <picture>
          <source
            srcSet="/logo-dark-64.png"
            media="(prefers-color-scheme: dark)"
          />
          {/* eslint-disable-next-line @next/next/no-img-element -- raw <img> is required as the <picture> fallback; next/image cannot be nested inside <picture> */}
          <img
            src="/logo-light-64.png"
            alt=""
            aria-hidden="true"
            className="h-full w-full object-contain"
            width={64}
            height={59}
          />
        </picture>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element -- static PNG logo served unoptimised; images.unoptimized=true in next.config.mjs
        <img
          src={theme === 'dark' ? '/logo-dark-64.png' : '/logo-light-64.png'}
          alt=""
          aria-hidden="true"
          className="h-full w-full object-contain"
          width={64}
          height={59}
        />
      )}
    </span>
  )
}

export function LogoMarkIcon({
  className,
  theme,
}: {
  className?: string
  theme?: LogoTheme
}) {
  return <LogoMark className={clsx('h-4 w-4', className)} theme={theme} />
}

export function LogoMarkMonochromeIcon(
  props: React.ComponentPropsWithoutRef<'span'>,
) {
  return (
    <span
      {...props}
      aria-hidden="true"
      className={clsx(
        'inline-block shrink-0 bg-current [mask-image:url(/logo-light-64.png)] [mask-size:contain] [mask-position:center] [mask-repeat:no-repeat] [-webkit-mask-image:url(/logo-light-64.png)] [-webkit-mask-position:center] [-webkit-mask-repeat:no-repeat] [-webkit-mask-size:contain]',
        props.className,
      )}
    />
  )
}
