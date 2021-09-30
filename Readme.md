# How to enable unauthenticated access for a Serverless app with Amplify

## Introduction
AWS AppSync service, based on GraphQL API, requires authorization for applications to interact with it. Public APIs or application prototypes can be built using API keys. The preferred method of authorization relies on IAM with tokens provided by Cognito User Pools or other OpenID Connect providers. The latter can set fine grained access control on GraphQL schema to satisfy even the most complicated scnarios. However many modern web and mobile applications need to provide access to some data to both authenticated and unauthenticated users.

This tutorial aims to demonstrate how **AWS Amplify** can be used to create a serverless application with unauthenticated or anonymous access to cloud services. AWS Amplify automates and significatly simplifies the deployment of the serverless service components in the cloud. Many examples* for authenticated access with Amplify can be found in AWS documentation, however the detailed explanation about how to enable unauthenticated access using Amplify are really hard to find** (as of September 2021). Thus this document is an attempt to fill this gap.

With the help of Amplify two React applications will be configured to use AWS Cognito, AppSync and DynamoDB services, then the required services will be deployed in the AWS cloud and finally they will be hosted in S3 as static web sites. The first web site allows teachers to enter exam results and the second one can be used by students to view the exam results.

---

\* Examples: [1](https://docs.amplify.aws/lib/auth/getting-started/q/platform/js/) [2](https://docs.amplify.aws/start/getting-started/auth/q/integration/react/) 

\** The following docs mention unauthenticated method, but do not provide full solution: [1](https://docs.amplify.aws/cli/graphql-transformer/auth/#public-authorization), [2](https://docs.aws.amazon.com/cognito/latest/developerguide/identity-pools.html)

## Demo of the app
This video shows both apps in use. The teacher will authenticate and will start entering the exam results. A student will use another app to view results, which will be refreshed automatidally



### List of AWS Services and Tools used in this tutorial

#### AWS Services
- S3 for hosting web sites built with React
- IAM policies and roles
- Cognito, both User and Identity Pools, for authentication and identity management
- AppSync to create GraphQL driven API for application data manipulation
- DynamoDB for storing application data
- CloudFormation is used by Amplify to deploy services
- Lambda is used by Amplify to update IAM Roles

#### AWS Tools
- Amplify
- AWS CLI

## Building the Teacher app which uses Cognito for authentication

### Overview of the steps
1. Create fully functional React app, supporting data models
2. Add configuration of AWS services to the app (amplify init, amplify add api)
3. Provision cloud resources (amplify push)
4. Update the app code to use AWS provided Auth UI and to store data in Dynamo DB
5. Deploy the app (amplify add hosting, amplify publish)
6. Enable unauthenticated access

### Step 1: Create fully functional React app, supporting data models
- Pre-requisites: Node and npm installed
- Create a new single-page application

        npx create-react-app teacher-app
        cd teacher-app
        npm start

- Replace the content of App.js with the code in the file 'Teacher_First_App.js'
- Check the app: fill in the form and start adding the data. The app should be functional, but it won't save the data

### Step 2: Add configuration of AWS services to the app
- Initializing a new project

        amplify init

- Add API. Two outhentication methods should be added: Cognito User Pools (default) and IAM

        amplify add api

### Step 3: Provision cloud resources

        amplify push

### Step 4: Update app code to use AWS provided Auth UI and to store data in Dynamo DB

- Install default Amplify packages and authentication UI libraries

        npm install aws-amplify
        npm install @aws-amplify/ui-react

-  Add the following three lines to the 'index.js' file in your application 'src' folder

        import Amplify, { Auth } from 'aws-amplify';
        import awsconfig from './aws-exports';
        Amplify.configure(awsconfig);

- Replace the content of App.js with the code in the file 'Teacher_final_App.js'
The Teacher app uses the default authentication to interact with AppSync and the follwing code will not work, if a user is not authenticated

        const savedExamResult = await API.graphql({ query: mutations.createResults, variables: {input: studentResult}});

- Create user in Cognito with the following command

        aws cognito teacheradmin ... TBD

### Step 5: Publish the app
Note: When adding hosting, choose HTTP with S3 option

        amplify add hosting
        amplify publish

### Step 6: Enable unauthenticated access
When running 'auth update' command, choose 'Walkthrough all the auth configurations', then 'User Sign-Up, Sign-In, connected with AWS IAM controls' and finally confirm with yes when you get this prompt 'Allow unauthenticated logins?'

        amplify auth update
        amplify push

## Building the Student app which uses unauthenticated access to the AppSync

### Overview of the steps
1. Create the student app
2. Fetch upstream backend environment definition from the cloud and update the local environment to match that definition (amplify pull)
3. Modify the student app code
- remove the authentication UI
- fetch the data using IAM unauthenticated method
4. Publish the app manually using S3 hosting

### Step 1: Create the student app
        npx create-react-app student-app
        cd student-app
        npm start

### Step 2: Fetch upstream backend environment definition from the cloud and update the local environment to match that definition

        amplify pull

- Install default Amplify packages and authentication UI libraries

        npm install aws-amplify
        npm install @aws-amplify/ui-react

-  Add the following three lines to the 'index.js' file in your application 'src' folder

        import Amplify, { Auth } from 'aws-amplify';
        import awsconfig from './aws-exports';
        Amplify.configure(awsconfig);

### Step 3: Modify the student app code
- Replace the content of App.js with the code in the file 'Student_App.js'
- Note how the data is fetched now using IAM unauthenticated method

        const fetchedExamResults = await API.graphql({ query: listResults, authMode: 'AWS_IAM' });

- This app demonstrates the subscription capability of GraphQL. The code below subscribes to the new record creation events and when it happens, the data will be reloaded 

    const subscriptionUpdateSHL = API.graphql(
      {
        query: onCreateResults,
        operationName: 'onCreateResult',
        authMode: 'AWS_IAM'
      }
    ).subscribe({
      next: ({ provider, value }) => {
        console.log('Subscription worked!!!');
        fetchExamResults();
      },
      error: (error) => console.log('Error subscribing...', JSON.stringify(error)),
    });



https://user-images.githubusercontent.com/79142295/135422717-30e81732-50ae-4c1f-b698-fd32f1f2fe95.mp4

