export const URLS = {
  ELECTION_URL: `https://www.googleapis.com/civicinfo/v2/elections?key=${process.env.REACT_APP_KEY}`,
  VOTER_INFO_URL: `https://www.googleapis.com/civicinfo/v2/voterinfo?key=${process.env.REACT_APP_KEY}`,
  REPRESENTATIVES:`https://www.googleapis.com/civicinfo/v2/representatives?key=${process.env.REACT_APP_KEY}`,
  REPRESENTATIVES_BY_DIVISION:"https://www.googleapis.com/civicinfo/v2/representatives",
};
