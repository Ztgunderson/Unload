import { LanguageServiceClient } from '@google-cloud/language';

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
  syntax: {
    sentences: Array<{
      text: string;
      sentiment: number;
    }>;
  };
}

class NLPService {
  private apiKey: string;
  private baseUrl: string;

  constructor() {
    this.apiKey = process.env.GOOGLE_CLOUD_API_KEY || '';
    this.baseUrl = 'https://language.googleapis.com/v1';
  }

  private async makeRequest(endpoint: string, body: any) {
    try {
      const response = await fetch(`${this.baseUrl}/${endpoint}?key=${this.apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error making NLP request:', error);
      throw error;
    }
  }

  async analyzeText(text: string): Promise<NLPAnalysis> {
    try {
      const [sentimentResult, entitiesResult, syntaxResult] = await Promise.all([
        this.analyzeSentiment(text),
        this.extractEntities(text),
        this.analyzeSyntax(text)
      ]);

      return {
        sentiment: sentimentResult,
        entities: entitiesResult,
        syntax: syntaxResult
      };
    } catch (error) {
      console.error('Error analyzing text:', error);
      throw error;
    }
  }

  async analyzeSentiment(text: string): Promise<{ score: number; magnitude: number }> {
    try {
      const result = await this.makeRequest('documents:analyzeSentiment', {
        document: {
          content: text,
          type: 'PLAIN_TEXT',
        },
      });

      return {
        score: result.documentSentiment?.score || 0,
        magnitude: result.documentSentiment?.magnitude || 0,
      };
    } catch (error) {
      console.error('Error analyzing sentiment:', error);
      throw error;
    }
  }

  async extractEntities(text: string): Promise<Array<{ name: string; type: string; salience: number }>> {
    try {
      const result = await this.makeRequest('documents:analyzeEntities', {
        document: {
          content: text,
          type: 'PLAIN_TEXT',
        },
      });

      return (result.entities || []).map((entity: any) => ({
        name: entity.name || '',
        type: entity.type || 'UNKNOWN',
        salience: entity.salience || 0,
      }));
    } catch (error) {
      console.error('Error extracting entities:', error);
      throw error;
    }
  }

  private async analyzeSyntax(text: string): Promise<{ sentences: Array<{ text: string; sentiment: number }> }> {
    try {
      const result = await this.makeRequest('documents:analyzeSyntax', {
        document: {
          content: text,
          type: 'PLAIN_TEXT',
        },
      });

      return {
        sentences: (result.sentences || []).map((sentence: any) => ({
          text: sentence.text?.content || '',
          sentiment: sentence.sentiment?.score || 0,
        })),
      };
    } catch (error) {
      console.error('Error analyzing syntax:', error);
      throw error;
    }
  }
}

export default new NLPService(); 