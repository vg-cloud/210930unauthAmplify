Console log of the 'amplify add api':

    % amplify add api
    ? Please select from one of the below mentioned services: GraphQL
    ? Provide API name: 211004teacher
    ? Choose the default authorization type for the API Amazon Cognito User Pool
    Using service: Cognito, provided by: awscloudformation

    The current configured provider is Amazon Cognito. 

    Do you want to use the default authentication and security configuration? Default configuration
    Warning: you will not be able to edit these selections. 
    How do you want users to be able to sign in? Username
    Do you want to configure advanced settings? No, I am done.
    Successfully added auth resource 211004teacher985036b5 locally

    Some next steps:
    "amplify push" will build all your local backend resources and provision it in the cloud
    "amplify publish" will build all your local backend and frontend resources (if you have hosting category added) and provision it in the cloud

    ? Do you want to configure advanced settings for the GraphQL API Yes, I want to make some additional changes.
    ? Configure additional auth types? Yes
    ? Choose the additional authorization types you want to configure for the API IAM
    ? Enable conflict detection? No
    ? Do you have an annotated GraphQL schema? Yes
    ? Provide your schema file path: ./src/app-schema.graphql

    GraphQL schema compiled successfully.

    Edit your schema at /Users/vadim/prjs/211004teacher/amplify/backend/api/211004teacher/schema.graphql or place .graphql files in a directory at /Users/vadim/prjs/211004teacher/amplify/backend/api/211004teacher/schema
    Successfully added resource 211004teacher locally

    Some next steps:
    "amplify push" will build all your local backend resources and provision it in the cloud
    "amplify publish" will build all your local backend and frontend resources (if you have hosting category added) and provision it in the cloud
  
end
