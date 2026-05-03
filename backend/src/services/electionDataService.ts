import { db } from '../config/firebase';
import logger from '../config/logger';
import { ELECTION_STEPS, ELECTION_DATES, INDIAN_STATES, FAQ } from '../utils/constants';

class ElectionDataService {
  /**
   * Get all election steps
   */
  async getAllElectionSteps() {
    return Object.values(ELECTION_STEPS);
  }

  /**
   * Get specific election step
   */
  async getElectionStep(stepId: string) {
    return Object.values(ELECTION_STEPS).find((step) => step.id === stepId);
  }

  /**
   * Get election timeline
   */
  async getElectionTimeline() {
    return ELECTION_DATES;
  }

  /**
   * Get FAQ
   */
  async getFAQ() {
    return FAQ;
  }

  /**
   * Get all Indian states
   */
  async getIndianStates() {
    return INDIAN_STATES;
  }

  /**
   * Save user progress
   */
  async saveUserProgress(userId: string, progress: Record<string, any>) {
    try {
      await db.collection('users').doc(userId).collection('progress').add({
        ...progress,
        timestamp: new Date(),
      });
      logger.info(`Saved progress for user ${userId}`);
      return { success: true };
    } catch (error) {
      logger.error(`Error saving user progress: ${error}`);
      throw error;
    }
  }

  /**
   * Get user progress
   */
  async getUserProgress(userId: string) {
    try {
      const snapshot = await db
        .collection('users')
        .doc(userId)
        .collection('progress')
        .orderBy('timestamp', 'desc')
        .limit(10)
        .get();

      const progress = snapshot.docs.map((doc) => doc.data());
      return progress;
    } catch (error) {
      logger.error(`Error getting user progress: ${error}`);
      throw error;
    }
  }

  /**
   * Save user preferences
   */
  async saveUserPreferences(userId: string, preferences: Record<string, any>) {
    try {
      await db.collection('users').doc(userId).set(
        {
          preferences,
          updatedAt: new Date(),
        },
        { merge: true }
      );
      logger.info(`Saved preferences for user ${userId}`);
      return { success: true };
    } catch (error) {
      logger.error(`Error saving user preferences: ${error}`);
      throw error;
    }
  }

  /**
   * Get user preferences
   */
  async getUserPreferences(userId: string) {
    try {
      const doc = await db.collection('users').doc(userId).get();
      return doc.exists ? doc.data()?.preferences : null;
    } catch (error) {
      logger.error(`Error getting user preferences: ${error}`);
      throw error;
    }
  }

  /**
   * Search polling booths (mock implementation - replace with real data)
   */
  async searchPollingBooths(state: string, city: string) {
    // This would be replaced with actual data from Election Commission database
    // For now, returning mock data structure
    return {
      state,
      city,
      booths: [
        {
          boothId: 'PB001',
          boothNumber: 1,
          name: 'Government School - Main Building',
          address: '123 Election Street, ' + city,
          constituency: 'Central',
          facilities: ['Wheelchair accessibility', 'Separate polling area for women', 'EVM facilities'],
        },
        {
          boothId: 'PB002',
          boothNumber: 2,
          name: 'Community Center Hall',
          address: '456 Democracy Road, ' + city,
          constituency: 'Central',
          facilities: ['Parking', 'Drinking water', 'Seating area'],
        },
      ],
    };
  }

  /**
   * Get election statistics (mock - replace with real data)
   */
  async getElectionStatistics() {
    return {
      totalVoters: 900000000,
      votersRegistered: 750000000,
      votersVoted: 0,
      turnout: 0,
      constituencies: 543,
      states: 28,
      unionTerritories: 8,
    };
  }
}

export default new ElectionDataService();
