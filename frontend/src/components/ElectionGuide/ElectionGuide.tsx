import React, { useState, useEffect } from 'react';
import apiService from '../../services/apiService';
import styles from './ElectionGuide.module.css';

interface ElectionStep {
  id: string;
  title: string;
  description: string;
  details: string[];
}

const ElectionGuide: React.FC = () => {
  const [steps, setSteps] = useState<ElectionStep[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedStep, setExpandedStep] = useState<string | null>(null);

  useEffect(() => {
    fetchElectionSteps();
  }, []);

  const fetchElectionSteps = async () => {
    try {
      const response = await apiService.getAllElectionSteps();
      if (response.success && response.data) {
        setSteps(response.data);
        if (response.data.length > 0) {
          setExpandedStep(response.data[0].id);
        }
      } else {
        setError(response.message || 'Failed to fetch election steps');
      }
    } catch (err) {
      setError('Unable to load election guide');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const toggleStep = (stepId: string) => {
    setExpandedStep(expandedStep === stepId ? null : stepId);
  };

  if (loading) {
    return (
      <div className={styles.container} role="region" aria-label="Election Guide">
        <div className={styles.loadingSpinner} aria-live="polite">
          Loading election guide...
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

  return (
    <div className={styles.container} role="region" aria-label="Election Guide">
      <div className={styles.header}>
        <h2>Step-by-Step Election Guide</h2>
        <p>Follow these steps to understand the complete election process</p>
      </div>

      <div className={styles.stepsContainer}>
        {steps.map((step, index) => (
          <div
            key={step.id}
            className={`${styles.stepCard} ${expandedStep === step.id ? styles.expanded : ''}`}
          >
            <button
              className={styles.stepHeader}
              onClick={() => toggleStep(step.id)}
              aria-expanded={expandedStep === step.id}
              aria-controls={`step-${step.id}`}
            >
              <div className={styles.stepNumber}>{index + 1}</div>
              <div className={styles.stepTitle}>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
              <div className={styles.expandIcon}>
                {expandedStep === step.id ? '–' : '+'}
              </div>
            </button>

            {expandedStep === step.id && (
              <div className={styles.stepDetails} id={`step-${step.id}`}>
                <ul>
                  {step.details.map((detail, idx) => (
                    <li key={idx}>{detail}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ElectionGuide;
