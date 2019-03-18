const initialState = { anchor: 'left',
    reminder: [],
    open: false,
    id: '',
    name: '',
    departure_city_id: '',
    destination_city_id: '',
    price: '',
    service_stars: 0
 };


export function reminder(state = initialState, action) {
    switch (action.type) {
        case 'FETCHED_ALL_REMINDER':
            return {
            ...state,
            reminder: action.reminder
            };
        case 'REMINDER_DETAIL':
            return {
                ...state,
                id: action.id,
                name: action.name,
                departure_city_id: action.departure_city_id,
                destination_city_id: action.destination_city_id,
                price: action.price,
                service_stars: action.service_stars
            };
        case "USER_UPDATED":
            return state;
        case "HANDLE_ON_CHANGE":
            return {
                ...state,
                [action.props]: action.value
            };
        default:
            return state
    }
  }
