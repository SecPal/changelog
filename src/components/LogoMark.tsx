// SPDX-FileCopyrightText: 2026 SecPal
// SPDX-License-Identifier: AGPL-3.0-or-later
/* eslint-disable @next/next/no-img-element */
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
            {theme !== 'dark' ? (
                <img
                    src="/logo-light-64.png"
                    alt=""
                    aria-hidden="true"
                    className={clsx('h-full w-full', theme === 'auto' && 'dark:hidden')}
                    width="64"
                    height="64"
                />
            ) : null}
            {theme !== 'light' ? (
                <img
                    src="/logo-dark-64.png"
                    alt=""
                    aria-hidden="true"
                    className={clsx('h-full w-full', theme === 'auto' && 'hidden dark:block')}
                    width="64"
                    height="64"
                />
            ) : null}
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
                'inline-block shrink-0 bg-current [mask-image:url(/logo-light-64.png)] [mask-position:center] [mask-repeat:no-repeat] [mask-size:contain] [-webkit-mask-image:url(/logo-light-64.png)] [-webkit-mask-position:center] [-webkit-mask-repeat:no-repeat] [-webkit-mask-size:contain]',
                props.className,
            )}
        />
    )
}