export function usersHasErrored(bool) {
    return {
        type: 'USERS_HAS_ERRORED',
        hasErrored: bool
    };
}

export function usersIsLoading(bool) {
    return {
        type: 'USERS_IS_LOADING',
        isLoading: bool
    };
}

export function usersFetchDataSuccess(users) {
    return {
        type: 'USERS_FETCH_DATA_SUCCESS',
        users
    };
}


export function usersFetchData(url) {
    return (dispatch) => {
        dispatch(usersIsLoading(true));

        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }

                dispatch(usersIsLoading(false));

                return response;
            })
            .then((response) => response.json())
            .then((users) => {
                console.log("inside usersFetchData");
                console.log(users);
                dispatch(usersFetchDataSuccess(users));
                })
            .catch(() => dispatch(usersHasErrored(true)));
    };
}



export function userIdUpdate(user){
    return{
        type: 'USERS_LOGIN_ID_SUCCESS',
        user
    }
}

export function UsersLoginId(user){
    return(dispatch)=>{
        dispatch(userIdUpdate(user))
    }
}