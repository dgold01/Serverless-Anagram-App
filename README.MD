# Anagram Test

Welcome to the Anagram Game Application! This application allows you to play an anagram game where you are given a set of letters and need to create words from them. The application retrieves word lists from a serverless database and can also post your high scores to a DynamoDB database when deployed on AWS.

## Getting Started

### Prerequisites

Before you begin, ensure you have the following software installed on your machine:

- Node.js - JavaScript runtime
- npm - Node Package Manager
- AWS CLI - AWS Command Line Interface (for deploying to AWS)

## Interactions with Databases

### Serverless Database

The application retrieves word lists from a serverless database. The database is set up to provide a list of valid words for the game. These words are used as the reference to validate player submissions.

### AWS DynamoDB

When the application is deployed to AWS, it has the capability to post high scores to a DynamoDB database. The high scores are stored in DynamoDB, allowing you to track and view your achievements.

## My Deployed Backend

The serverless backend is currently deployed on my personal AWS account. Use these POST and GET URLs in your development

GET: https://1dcdmz6ceb.execute-api.eu-north-1.amazonaws.com/dev/fetchWordList

<br>
POST: https://1dcdmz6ceb.execute-api.eu-north-1.amazonaws.com/dev/storeHighScore