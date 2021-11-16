import { useState } from 'react';
import axios from 'axios';

import { API } from './constants';

export default () => {
    const [userData, setUserData] = useState < Array > ([]);
    const [isLoading, setIsLoading] = useState < boolean > (false);
    const [errorMessage, setErrorMessage] = useState < string > ('');


    const getUserData = async (userID) => {
        if (userID) {
            try {
                setIsLoading(true)
                const response = await axios.get(API.baseURL + `${userID}` + API.questions + API.order);
                const result = response.data;
                setUserData(result.items);
                console.log('userData :>> ', userData);
                setIsLoading(false)
                if (result[0].length === 0) { setErrorMessage('User not found!') }
            } catch (error) {
                setIsLoading(false)
                // console.error('There was an error!', error);
                setErrorMessage('Something went wrong!');
            }
        }
    };

    return [getUserData, userData, isLoading, errorMessage];
};
