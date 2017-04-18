export function usersHasErrored(state = false, action) {
    switch (action.type) {
        case 'USERS_HAS_ERRORED':
            return action.hasErrored;

        default:
            return state;
    }
}

export function usersIsLoading(state = false, action) {
    switch (action.type) {
        case 'USERS_IS_LOADING':
            return action.isLoading;

        default:
            return state;
    }
}

export function users(state = [], action) {
    switch (action.type) {
        case 'USERS_FETCH_DATA_SUCCESS':
            console.log("inside Reducer");
            console.log(action);
            return action.users;
        default:
            return state;
    }
}

export function loginId(state = {}, action) {
    switch (action.type) {
        case 'USERS_LOGIN_ID_SUCCESS':
            console.log(action);
            return action.user;
        default:
            return state;
    }
}
