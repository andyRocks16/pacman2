import { combineReducers } from 'redux';
import { items, itemsHasErrored, itemsIsLoading,stocks,orders, searchResults, notifications, notificationMsg } from './items';
import { users, usersHasErrored, usersIsLoading,loginId } from './user';

export default combineReducers({
    items,
    stocks,
    orders,
    itemsHasErrored,
    itemsIsLoading,
    users,
    usersHasErrored,
    usersIsLoading,
    loginId,
    searchResults,
    notifications,
    notificationMsg
});
