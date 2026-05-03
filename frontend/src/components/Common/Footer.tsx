import React from 'react';
import styles from './Footer.module.css';

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer} role="contentinfo">
      <div className={styles.container}>
        <div className={styles.section}>
          <h3>About This Assistant</h3>
          <p>
            An AI-powered tool to help Indian citizens understand the election process in a
            simple and interactive way.
          </p>
        </div>

        <div className={styles.section}>
          <h3>Resources</h3>
          <ul>
            <li>
              <a
                href="https://www.eci.gov.in"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Election Commission of India website (opens in new tab)"
              >
                Election Commission of India
              </a>
            </li>
            <li>
              <a
                href="https://voter.eci.gov.in"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Voter Helpline (opens in new tab)"
              >
                Voter Helpline
              </a>
            </li>
          </ul>
        </div>

        <div className={styles.section}>
          <h3>Contact & Support</h3>
          <p>Email: support@electionassistant.in</p>
          <p>Have suggestions? We'd love to hear from you!</p>
        </div>
      </div>

      <div className={styles.copyright}>
        <p>&copy; {new Date().getFullYear()} Election Assistant. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
