## Overview

A quiz application with 10 questions from each category available. Categories can be chosen on the main page and questions go from 'easy' to 'hard' according to user's performance.

Check the deployed project [here](https://sas-trivia.vercel.app/)


## Built With

* [Create React App](https://github.com/facebook/create-react-app)
* React Router
* React Hooks
* React Redux
* Redux Saga
* Styled Components
* Service Worker
* Google fonts
* FontAwesome


## Starting the project

Clone the repository:

`git clone https://github.com/ammtsz/SAS.git`

Change directory:

`cd SAS`

In the project directory, run:

`npm install`

`npm start`

It will run the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.


## Testing

In the project directory, run:

`npm test`


### Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).



## Firebase

This project is integrated with Firebase. To integrate it to your Firebase account:

1. Create an account
2. Go to console
3. Click on 'Add project'
4. Create your project
5. Add an App (select 'Web' option)
6. Register your web app

Once it is done, you will have a `firebaseConfig`. Copy those datas and replace it on the project. Go to `./src/firebase/firebase.utils.js` and replace it on:

```javascript
const config = {
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
    measurementId: ""
};

```

The project uses 'Authentication' and 'Cloud Firestore' from Firebase, so you need to 'Get started' with Authentication and 'Create database' on Cloud Firestore.

After 'Get started' with Authentication:
1. Go to 'Sign-in method'
2. Enable 'Email/password'


## Dependencies
```
    @testing-library/jest-dom: ^5.11.9,
    @testing-library/react: ^11.2.5,
    @testing-library/user-event: ^12.6.3,
    firebase: ^8.2.6,
    history: ^5.0.0,
    node-sass: ^5.0.0,
    react: ^17.0.1,
    react-dom: ^17.0.1,
    react-redux: ^7.2.2,
    react-router-dom: ^5.2.0,
    react-scripts: 4.0.2,
    redux: ^4.0.5,
    redux-logger: ^3.0.6,
    redux-mock-store: ^1.5.4
    redux-saga: ^1.1.3,
    redux-saga-firebase: ^0.15.0,
    redux-thunk: ^2.3.0,
    reselect: ^4.0.0,
    styled-components: ^5.2.1,
    web-vitals: ^1.1.0,
    workbox-background-sync: ^6.1.0,
    workbox-broadcast-update: ^6.1.0,
    workbox-cacheable-response: ^6.1.0,
    workbox-core: ^6.1.0,
    workbox-expiration: ^6.1.0,
    workbox-google-analytics: ^6.1.0,
    workbox-navigation-preload: ^6.1.0,
    workbox-precaching: ^6.1.0,
    workbox-range-requests: ^6.1.0,
    workbox-routing: ^6.1.0,
    workbox-strategies: ^6.1.0,
    workbox-streams: ^6.1.0
```


## API
Project was developed using [Trivia API](https://opentdb.com/api_config.php).


## Rules
* Categories can be answered only once
* A quiz that has been stopped before last question (10th), will have the datas saved and the user will be able to continue quiz from where it was left
* Users logged in will have datas saved on Firebase, otherwise, datas will persist on LocalStorage

* Questions difficulty are: 'easy, 'medium' and 'hard'
* Quiz starts with a 'medium' difficulty
* Two followed correct answer will increase question difficulty, where 'hard' is the maximum
* Two followed incorrect answer will decrease question difficulty, where 'easy' is the minimum

    
## Other Funcionalities
- Email and password authentication using Firebase
- Light and Dark Theme
- Responsive


## Acessibility
* The application was developed to allow navigation using only `tab` key
* Some tests were made using NVDA, but it still needs improvements






