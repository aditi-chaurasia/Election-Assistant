/**
 * Election Process Steps
 */
export const ELECTION_STEPS = {
  REGISTRATION: {
    id: 'registration',
    title: 'Voter Registration',
    description: 'Get yourself registered as a voter',
    details: [
      'You must be an Indian citizen',
      'Minimum age: 18 years',
      'Resident of the constituency for at least 6 months',
      'Not disqualified by any law',
    ],
  },
  ELIGIBILITY_CHECK: {
    id: 'eligibility',
    title: 'Check Your Eligibility',
    description: 'Verify if you meet all the criteria to vote',
    details: [
      'Age: Must be 18 years or above',
      'Citizenship: Must be an Indian citizen',
      'Residency: Must be registered in your constituency',
      'Disqualifications: Should not be convicted of specific crimes',
    ],
  },
  FIND_BOOTH: {
    id: 'find_booth',
    title: 'Locate Your Polling Booth',
    description: 'Find your designated polling station',
    details: [
      'Use your enrollment number to locate your booth',
      'Check the voter roll published by election commission',
      'Note the booth number and location',
      'Verify the polling date and time',
    ],
  },
  VOTING_PROCEDURE: {
    id: 'voting',
    title: 'Voting Procedure',
    description: 'Learn how to cast your vote',
    details: [
      'Bring voter ID to the polling booth',
      'Get your name verified from the voter list',
      'Your finger will be marked with indelible ink',
      'Enter the voting compartment',
      'Record your vote using EVM or ballot paper',
      'Your vote is secure and confidential',
    ],
  },
  DOCUMENTS_REQUIRED: {
    id: 'documents',
    title: 'Required Documents',
    description: 'Documents needed for voting',
    details: [
      'Voter ID / EPIC Card',
      'Aadhar Card',
      'Passport',
      'Driving License',
      'PAN Card',
      'Any government-approved ID',
    ],
  },
  RESULT_DECLARATION: {
    id: 'results',
    title: 'Result Declaration',
    description: 'How results are counted and announced',
    details: [
      'Counting happens at designated centers',
      'Each polling booth\'s votes are counted separately',
      'Statistical order of counting is announced',
      'Results are declared officially',
      'You can view results on election commission website',
    ],
  },
};

/**
 * Important Dates for Elections (Example - Update with actual dates)
 */
export const ELECTION_DATES = {
  REGISTRATION_DEADLINE: '2024-03-15',
  NOTIFICATION_RELEASE: '2024-03-16',
  NOMINATION_PERIOD_START: '2024-03-20',
  NOMINATION_PERIOD_END: '2024-03-27',
  SCRUTINY_OF_NOMINATION: '2024-03-28',
  WITHDRAWAL_PERIOD_END: '2024-03-30',
  CAMPAIGN_END: '2024-03-31',
  POLLING_DATE: '2024-04-10',
  COUNTING_DATE: '2024-04-10',
  RESULT_DECLARATION: '2024-04-10',
};

/**
 * Indian States and Territories
 */
export const INDIAN_STATES = [
  'Andhra Pradesh',
  'Arunachal Pradesh',
  'Assam',
  'Bihar',
  'Chhattisgarh',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jharkhand',
  'Karnataka',
  'Kerala',
  'Madhya Pradesh',
  'Maharashtra',
  'Manipur',
  'Meghalaya',
  'Mizoram',
  'Nagaland',
  'Odisha',
  'Punjab',
  'Rajasthan',
  'Sikkim',
  'Tamil Nadu',
  'Telangana',
  'Tripura',
  'Uttar Pradesh',
  'Uttarakhand',
  'West Bengal',
  'Delhi (NCT)',
  'Puducherry',
  'Lakshadweep',
  'Andaman and Nicobar Islands',
  'Ladakh',
  'Jammu and Kashmir',
];

/**
 * FAQ Content
 */
export const FAQ = [
  {
    question: 'What is the minimum age to vote?',
    answer: 'You must be at least 18 years old to vote in Indian elections.',
  },
  {
    question: 'How do I register as a voter?',
    answer: 'Visit the election commission website or your local registration office. Fill form 18 with required documents and submit.',
  },
  {
    question: 'What documents do I need to bring for voting?',
    answer: 'Bring any government-issued ID like voter card, Aadhar, passport, or driving license.',
  },
  {
    question: 'Can I vote if I am not in my constituency?',
    answer: 'Generally no, but you can apply for postal ballot or request for relief to vote elsewhere.',
  },
  {
    question: 'How is voting done in India?',
    answer: 'Voting is done using Electronic Voting Machines (EVM). You select your candidate and confirm your vote.',
  },
  {
    question: 'What if I missed the registration deadline?',
    answer: 'You need to register before the cutoff date. Contact your local election office for special registration provisions.',
  },
];
