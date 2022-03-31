# Stack Overflow Reputation app

## Description:

A react-native app that use stackexchange.api to get Stack-Overflow posts by entering user ID.

### Installation:

1.  Clone the project to your local machine
    ```sh
    git clone https://github.com/liorkasti/kst-get-stackoverflow-posts.git
    ```
1.  Install the application dependencies, run:
    ```sh
    npm install `or` yarn
    ```
1.  Run metro bundler
    ```sh
    npm start `or` yarn start
    ```
1.  Build the apk and install on your emulator or plugin device frontend (in another terminal)
    For Android, run:
    ```sh
    npm android  `or` yarn android
    ```
    For iOS, run:
    ```sh
    npm ios  `or` yarn ios
    ```

Enjoy! thank you.

### TODOs:
 - [x]  Support numeric keyboardType
 - [ ]  Fix prevState userData is empty (when search cleared)
 - [ ]  Use useMemo for api
 - [ ]  Add useEffect on order 
 - [ ]  Fix useFetch hook
 - [ ]  Break down App.js to separates files
 - [ ]  Fix and Enhance styling bugs like scrolling target after searching once agai
 - [ ]  Add input validation
 - [ ]  Enhance error handling
 - [ ]  Add a sate management
 - [ ]  Add a default UI when no renderItem been found ot initialize
 - [ ]  QA - add init test and cover edge cases
