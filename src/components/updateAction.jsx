export default function updateAction(state, payload) {
    return {
        ...state,
        eventDetails: {
            ...state.eventDetails,
            ...payload
        }
    };
}
