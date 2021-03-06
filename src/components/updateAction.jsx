export function updateOrganiserAction(state, payload) {
    return {
        ...state,
        eventDetails: {
            ...state.eventDetails,
            ...payload
        }
    };
}

export function updateUserAction(state, payload) {
    return {
        ...state,
        userDetails: {
            ...state.userDetails,
            ...payload
        }
    };
}
