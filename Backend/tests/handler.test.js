import { fetchData } from '../axiosService';
const { fetchWordList, fetchScores, storeHighScore } = require('../handler');
const AWS = require('aws-sdk-mock');

jest.mock('../axiosService', () => ({
    fetchData: jest.fn(),
}));


describe('Handlers', () => {

    afterEach(() => {
        AWS.restore();
    });

    describe('fetchWordList', () => {
        it('should return word list when axios request is successful', async () => {
            const mockResponse = 'word1\nword2\nword3';

            fetchData.mockResolvedValue('word1\nword2\nword3');

            const result = await fetchWordList({}, {});

            expect(result.statusCode).toBe(200);
            expect(result.body).toContain('word1');
            expect(result.body).toContain('word2');
            expect(result.body).toContain('word3');
        });

        it('should handle axios request error', async () => {

            fetchData.mockRejectedValue(new Error('Internal Server Error'));

            const result = await fetchWordList({}, {});

            expect(result.statusCode).toBe(500);
            expect(result.body).toContain('Internal Server Error');
        });
    });

    describe('fetchScores', () => {
        it('should return scores when DynamoDB scan is successful', async () => {
            const mockItems = [{ word: 'test1', score: 10 }, { word: 'test2', score: 15 }];
            AWS.mock('DynamoDB.DocumentClient', 'scan', (params, callback) => {
                callback(null, { Items: mockItems });
            });

            const result = await fetchScores({}, {});

            expect(result.statusCode).toBe(200);
            expect(result.body).toContain('"word":"test1","score":10');
            expect(result.body).toContain('"word":"test2","score":15');
        });

        it('should handle DynamoDB scan error', async () => {
            AWS.mock('DynamoDB.DocumentClient', 'scan', (params, callback) => {
                callback(new Error('DynamoDB error'));
            });

            const result = await fetchScores({}, {});

            expect(result.statusCode).toBe(500);
            expect(result.body).toContain('Internal Server Error');
        });


    });

    describe('storHighScore', () => {
        it('should return success message when storing data is successful', async () => {
            AWS.mock('DynamoDB.DocumentClient', 'put', (params, callback) => {
                callback(null, {});
            });
            const event = {
                body: JSON.stringify({ word: 'test1' }),
            };
            const result = await storeHighScore(event, {});
            expect(result.statusCode).toBe(200);
            expect(result.body).toContain('Item inserted successfully');
        })
        it('should handle DynamoDB put error', async () => {
        
            const event = {
              body: JSON.stringify({ word: 'test1' }),
            };
        
            const result = await storeHighScore(event, {});
        
            expect(result.statusCode).toBe(500);
            expect(result.body).toContain('Error inserting item');
          });        
    })
});
