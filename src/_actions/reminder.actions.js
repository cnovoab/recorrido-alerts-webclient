import { userService } from '../_services/';
import { history } from '../_helpers';

export const reminderAction = {
    getReminder,
    getReminderById,
    getLookupsByReminderId,
    onChangeProps,
    editReminderInfo,
    createReminder,
    deleteReminderById
};

function getReminder(){
    return dispatch => {
        let apiEndpoint = 'alerts';
        userService.get(apiEndpoint)
        .then((response)=>{
            dispatch(changeRemindersList(response.data));
        }).catch((err)=>{
            console.log("Error");
            console.log(err);
        })
    };
}

function createReminder(payload){
    return dispatch => {
        let apiEndpoint = 'alerts/';
        userService.post(apiEndpoint, { alert: payload })
        .then((response)=>{
            dispatch(createUserInfo());
            history.push('/reminder');
        })
    }
}

function getReminderById(id){
    return dispatch => {
        let apiEndpoint = 'alerts/'+ id;
        userService.get(apiEndpoint)
        .then((response)=>{
            dispatch(editRemindersDetails(response.data));
            history.push('/reminder');
        })
    };
}

// Populate chart
function getLookupsByReminderId(id){
    return dispatch => {
        let apiEndpoint = `alerts/${id}/lookups`;
        userService.get(apiEndpoint)
        .then((response)=>{
            dispatch(changeLookupsChart(response.data));
            history.push('/reminder');
        })
    };
}

// Populate table
function getBustravelsByReminderId(id){
    return dispatch => {
        let apiEndpoint = `alerts/${id}/lookups/latest/bustravels`;
        userService.get(apiEndpoint)
        .then((response)=>{
            dispatch(changeBustravelsList(response.data));
        })
    };
}

function onChangeProps(props, event){
    return dispatch =>{
        dispatch(handleOnChangeProps(props, event.target.value));
    }
}

function changeLookupsChart(lookups){
    return{
        type: "FETCHED_ALL_LOOKUP",
        lookups: lookups
    }
}

function changeBustravelsList(bustravel_data){
    return{
        type: "FETCHED_ALL_BUSTRAVELS",
        bustravels: bustravels
    }
}

function editReminderInfo(id, payload){
    return dispatch => {
        let apiEndpoint = 'alerts/'+ id;
        userService.put(apiEndpoint, payload)
        .then((response)=>{
            dispatch(updatedUserInfo());
            history.push('/reminder');
        })
    }
}

function deleteReminderById(id){
    return dispatch => {
        let apiEndpoint = 'alerts/'+ id;
        userService.deleteDetail(apiEndpoint)
        .then((response)=>{
            dispatch(deleteRemindersDetails());
            dispatch(reminderAction.getReminder());
        })
    };
}

export function changeRemindersList(reminder){
    return{
        type: "FETCHED_ALL_REMINDER",
        reminder: reminder
    }
}

export function handleOnChangeProps(props, value){
    return{
        type: "HANDLE_ON_CHANGE",
        props: props,
        value: value
    }
}

export function editRemindersDetails(reminder){
    return{
        type: "REMINDER_DETAIL",
        id: reminder.id,
        name: reminder.name,
        departure_city_id: reminder.departure_city_id,
        destination_city_id: reminder.destination_city_id,
        price: reminder.price,
        service_stars: reminder.service_stars
    }
}

export function updatedUserInfo(){
    return{
        type: "USER_UPDATED"
    }
}

export function createUserInfo(){
    return{
        type: "USER_CREATED_SUCCESSFULLY"
    }
}

export function deleteRemindersDetails(){
    return{
        type: "DELETED_REMINDER_DETAILS"
    }
}
