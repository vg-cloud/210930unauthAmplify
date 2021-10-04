log

    vadim@MacBook-Pro-de-Vadim 211004teacher % amplify auth update
    Please note that certain attributes may not be overwritten if you choose to use defaults settings.

    You have configured resources that might depend on this Cognito resource.  Updating this Cognito resource could have unintended side effects.

    Using service: Cognito, provided by: awscloudformation
     What do you want to do? Walkthrough all the auth configurations
     Select the authentication/authorization services that you want to use: User Sign-Up, Sign-In, connected with AWS IAM controls (Enable
    s per-user Storage features for images or other content, Analytics, and more)
     Allow unauthenticated logins? (Provides scoped down permissions that you can control via AWS IAM) Yes
     Do you want to enable 3rd party authentication providers in your identity pool? No
     Do you want to add User Pool Groups? No
     Do you want to add an admin queries API? No
     Multifactor authentication (MFA) user login options: OFF
     Email based user registration/forgot password: Enabled (Requires per-user email entry at registration)
     Please specify an email verification subject: Your verification code
     Please specify an email verification message: Your verification code is {####}
     Do you want to override the default password policy for this User Pool? No
     Specify the app's refresh token expiration period (in days): 30
     Do you want to specify the user attributes this app can read and write? No
     Do you want to enable any of the following capabilities? 
     Do you want to use an OAuth flow? No
    ? Do you want to configure Lambda Triggers for Cognito? Yes
    ? Which triggers do you want to enable for Cognito 
    Successfully updated auth resource 211004teacher985036b5 locally

    Some next steps:
    "amplify push" will build all your local backend resources and provision it in the cloud
    "amplify publish" will build all your local backend and frontend resources (if you have hosting category added) and provision it in the cloud

    Successfully updated resource 211004teacher985036b5 locally

    Some next steps:
    "amplify push" will build all your local backend resources and provision it in the cloud
    "amplify publish" will build all your local backend and frontend resources (if you have hosting category added) and provision it in the cloud
