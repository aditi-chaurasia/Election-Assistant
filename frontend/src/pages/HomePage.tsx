import React, { useState } from 'react';
import ChatBox from '../components/Chatbot/ChatBox';
import ElectionGuide from '../components/ElectionGuide/ElectionGuide';
import Timeline from '../components/Timeline/Timeline';
import Header from '../components/Common/Header';
import Footer from '../components/Common/Footer';
import styles from './HomePage.module.css';

const HomePage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const userId = 'user-' + Math.random().toString(36).substr(2, 9);

  const renderPage = () => {
    switch (currentPage) {
      case 'guide':
        return <ElectionGuide />;
      case 'timeline':
        return <Timeline />;
      case 'faq':
        return <ChatBox userId={userId} />;
      default:
        return (
          <div className={styles.heroSection}>
            <div className={styles.heroContent}>
              <h2>Welcome to Election Assistant India 🗳️</h2>
              <p>
                Your comprehensive guide to understanding the Indian election process. Learn about
                voter registration, voting procedures, important dates, and answering all your
                questions about elections.
              </p>

              <div className={styles.features}>
                <div className={styles.featureCard}>
                  <div className={styles.featureIcon}>📚</div>
                  <h3>Step-by-Step Guide</h3>
                  <p>Learn the complete election process from registration to voting.</p>
                  <button
                    onClick={() => setCurrentPage('guide')}
                    className={styles.ctaButton}
                    aria-label="Go to Election Guide"
                  >
                    Explore Guide
                  </button>
                </div>

                <div className={styles.featureCard}>
                  <div className={styles.featureIcon}>📅</div>
                  <h3>Important Dates</h3>
                  <p>Never miss important election dates and deadlines.</p>
                  <button
                    onClick={() => setCurrentPage('timeline')}
                    className={styles.ctaButton}
                    aria-label="Go to Timeline"
                  >
                    View Timeline
                  </button>
                </div>

                <div className={styles.featureCard}>
                  <div className={styles.featureIcon}>🤖</div>
                  <h3>AI Chatbot</h3>
                  <p>Ask any questions about elections and get instant answers.</p>
                  <button
                    onClick={() => setCurrentPage('faq')}
                    className={styles.ctaButton}
                    aria-label="Go to Chatbot"
                  >
                    Chat Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className={styles.app}>
      <Header onNavigate={setCurrentPage} />
      <main className={styles.main}>{renderPage()}</main>
      <Footer />
    </div>
  );
};

export default HomePage;
