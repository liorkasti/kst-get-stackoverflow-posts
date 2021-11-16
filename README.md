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

| No. | Description                                                                   |
| --- | ----------------------------------------------------------------------------- |
| 1   | Fix useFetch hook                                                             |
| 2   | Break down to multiple components                                              |
| 3   | Fix and Enhance styling bugs like scrolling target after searching once again |
| 3   | QA - add init test and cover edge cases (platform, data flow)                 |
