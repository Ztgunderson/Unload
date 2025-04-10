import { cloudFunctions } from './firebase.config';

interface NLPAnalysis {
  sentiment: {
    score: number;
    magnitude: number;
  };
  entities: Array<{
    name: string;
    type: string;
    salience: number;
  }>;
  syntax: Array<{
    text: {
      content: string;
    };
    partOfSpeech: {
      tag: string;
    };
  }>;
}

class NLPService {
  async analyzeText(text: string): Promise<NLPAnalysis> {
    try {
      const analyzeSentiment = cloudFunctions().httpsCallable('analyzeSentiment');
      const result = await analyzeSentiment({ text });
      return result.data as NLPAnalysis;
    } catch (error) {
      console.error('Error analyzing text:', error);
      throw error;
    }
  }
}

export default new NLPService(); 