import React, { useState, useEffect } from 'react';
import apiService from '../../services/apiService';
import { formatDate, daysUntil } from '../../utils/helpers';
import styles from './Timeline.module.css';

const Timeline: React.FC = () => {
  const [timeline, setTimeline] = useState<Record<string, string> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTimeline();
  }, []);

  const fetchTimeline = async () => {
    try {
      const response = await apiService.getElectionTimeline();
      if (response.success && response.data) {
        setTimeline(response.data);
      } else {
        setError(response.message || 'Failed to fetch timeline');
      }
    } catch (err) {
      setError('Unable to load timeline');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className={styles.container} role="region" aria-label="Election Timeline">
        <div className={styles.loadingSpinner} aria-live="polite">
          Loading election timeline...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container} role="alert">
        <p className={styles.error}>{error}</p>
      </div>
    );
  }

  if (!timeline) {
    return null;
  }

  const timelineEntries = Object.entries(timeline).map(([key, date]) => ({
    key,
    date,
    event: key
      .split('_')
      .map((word) => word.charAt(0) + word.slice(1).toLowerCase())
      .join(' '),
  }));

  return (
    <div className={styles.container} role="region" aria-label="Election Timeline">
      <div className={styles.header}>
        <h2>Important Election Dates</h2>
        <p>Mark your calendar with these key dates</p>
      </div>

      <div className={styles.timelineContainer}>
        {timelineEntries.map((entry, index) => {
          const daysRemaining = daysUntil(entry.date);
          const isPast = daysRemaining < 0;
          const isComing = daysRemaining > 0 && daysRemaining <= 7;

          return (
            <div
              key={entry.key}
              className={`${styles.timelineItem} ${isPast ? styles.past : ''} ${
                isComing ? styles.coming : ''
              }`}
            >
              <div className={styles.markerWrapper}>
                <div className={styles.marker}></div>
                {index < timelineEntries.length - 1 && <div className={styles.line}></div>}
              </div>

              <div className={styles.content}>
                <div className={styles.date}>{formatDate(entry.date)}</div>
                <h3>{entry.event}</h3>

                {daysRemaining > 0 && (
                  <p className={styles.daysRemaining}>
                    {daysRemaining} day{daysRemaining !== 1 ? 's' : ''} remaining
                  </p>
                )}

                {isPast && <p className={styles.pastDate}>Mark as completed</p>}
                {isComing && (
                  <p className={styles.coming} role="alert">
                    ⚠️ Coming soon!
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Timeline;
