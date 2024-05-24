'use client';
import Link from 'next/link';
import classes from '../MainHeader.module.css';
import { usePathname } from 'next/navigation';

const NavLink = ({ href, children }) => {
  const pathname = usePathname();
  return (
    <Link
      href={href}
      className={pathname.startsWith(href) ? classes.active : undefined}
    >
      {children}
    </Link>
  );
};

export default NavLink;
