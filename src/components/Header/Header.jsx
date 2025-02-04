import { Link } from 'react-router';
import css from './Header.module.css';

const Header = () => {
  return (
    <header className={css.header}>
      <h2 className={css.title}>Redux Blog</h2>
      <ul className={css.list}>
        <li className={css.elem}>
          <Link className={css.elem} to="/">
            Home
          </Link>{' '}
        </li>
        <li>
          <Link className={css.elem} to="post">
            Post
          </Link>
        </li>
      </ul>
    </header>
  );
};

export default Header;
