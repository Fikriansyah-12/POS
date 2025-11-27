'use client';

import Link, { LinkProps } from 'next/link';
import { forwardRef } from 'react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

interface NavLinkProps extends Omit<LinkProps, 'href'> {
  href: string;
  className?: string;
  activeClassName?: string;
  pendingClassName?: string; 
  exact?: boolean;
}

const NavLink = forwardRef<HTMLAnchorElement, NavLinkProps>(
  (
    {
      href,
      className,
      activeClassName,
      pendingClassName, 
      exact = false,
      ...props
    },
    ref,
  ) => {
    const pathname = usePathname();

    const isActive = exact ? pathname === href : pathname?.startsWith(href);

    return (
      <Link
        ref={ref}
        href={href}
        className={cn(className, isActive && activeClassName)}
        {...props}
      />
    );
  },
);

NavLink.displayName = 'NavLink';

export { NavLink };
