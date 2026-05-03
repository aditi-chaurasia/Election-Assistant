import React from 'react';
import styles from './Header.module.css';

interface HeaderProps {
  onNavigate?: (page: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onNavigate }) => {
  return (
    <header className={styles.header} role="banner">
      <div className={styles.container}>
        <div className={styles.logo}>
          <h1>🗳️ Election Assistant India</h1>
          <p>Your guide to understanding elections</p>
        </div>

        <nav className={styles.nav} aria-label="Main navigation">
          <ul>
            <li>
              <button onClick={() => onNavigate?.('home')} className={styles.navLink}>
                Home
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate?.('guide')} className={styles.navLink}>
                Election Guide
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate?.('timeline')} className={styles.navLink}>
                Timeline
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate?.('faq')} className={styles.navLink}>
                FAQ
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
