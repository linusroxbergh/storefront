import { Link } from 'react-router';

export function Header() {
  return (
    <header className="header">
      <Link to="/" className="logo">
        Fernhill
      </Link>
    </header>
  );
}
