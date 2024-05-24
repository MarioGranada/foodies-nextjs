import Link from 'next/link';
import logo from '@/assets/logo.png';
import classes from './MainHeader.module.css';
import Image from 'next/image';
import NavLink from './NavLink';

const MainHeader = () => {
  return (
    <header className={classes.header}>
      <Link href="/" className={classes.logo}>
        {/* <img src={logo.src} alt="A plate with food on it" /> */}
        <Image src={logo} alt="A plate with food on it" priority />
        Next level food
      </Link>
      <nav className={classes.nav}>
        <ul>
          <li>
            <NavLink href="/meals">Meals</NavLink>
          </li>
          <li>
            <NavLink href="/community">Foodies Community</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainHeader;
