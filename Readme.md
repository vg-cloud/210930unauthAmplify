# How to enable unauthenticated access for a Serverless app with Amplify

## Introduction
Security … for serverless services requires authentication. Use cases for pubic access.

This tutorial aims to demonstrate how AWS Amplify can be used to create a serverless application with unauthenticated or anonymous access to cloud services. Many examples* for authenticated access with Amplify can be found in AWS documentation, however the detailed explanation about how to enable unauthenticated access using Amplify are really hard to find** (as of September 2021), attempting to fill this gap.

With the help of Amplify two React applications will be configured to use AWS Cognito, AppSync and DynamoDB services, then the required services will be deployed in the AWS cloud and finally they will be hosted in S3 as static web sites. The first web site allows teachers to enter exam results and the second one can be used by students to view the exam results.

---

\* Examples: [1](https://docs.amplify.aws/lib/auth/getting-started/q/platform/js/) [2](https://docs.amplify.aws/start/getting-started/auth/q/integration/react/) 

\** The following docs mention unauthenticated method, but do not provide full solution:

## Buildig the Teacher app which uses Cognito for authentication

## Building the Student app which uses unauthenticated access to the AppSync



https://user-images.githubusercontent.com/79142295/135422717-30e81732-50ae-4c1f-b698-fd32f1f2fe95.mp4

