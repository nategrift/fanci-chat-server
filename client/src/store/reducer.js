
// Converts Is Visable Value in local storage to truthy value
let isVisable;
let isVisableValue = localStorage.getItem('visable') || true;

    if (isVisableValue === 'true' || isVisableValue === true) {
        isVisable = true;
    } else {
        isVisable = false;
    }


// Initial State for store
const initialState = {
    socket: null,
    name: localStorage.getItem('name') || 'Guest',
    icon: localStorage.getItem('icon') || 'user-circle',
    visable: isVisable,
    room: null,
    users: [],
    hiddenUsers: 0,
    rooms: null,
    messages: [],
    statusMessages: null
}


const reducer = (state = initialState, action) => {

    switch (action.type) {
        // Socket.io object
        case 'UPDATE_SOCKET':
            return {
                ...state,
                socket: action.socket
            }
        // List of all users online at the time
        case 'UPDATE_USERS':
            let newUsers = action.users

            return {
                ...state,
                users: newUsers,
                hiddenUsers: action.hiddenUsers
            }
        // Update current User information and save in local Storage
        case 'UPDATE_CURRENT_USER':
            return {
                ...state,
                name: action.name,
                icon: action.icon,
                visable: action.visable
            }
        // Update list of all rooms
        case 'UPDATE_ROOMS':
            return {
                ...state,
                rooms: action.rooms
            }
        // Update current room ID user is in
        case 'UPDATE_CURRENT_ROOM':
            return {
                ...state,
                room: action.room
            }
        // Add Message to lists of current messages
        case 'ADD_MESSAGE':
            let updatedMessages = [...state.messages];
            updatedMessages.push(action.message)
            return {
                ...state,
                messages: updatedMessages
            }
        // Clear All messages in state
        case 'CLEAR_MESSAGES':
            let emptyArray = [];
            return {
                ...state,
                messages: emptyArray
            }
        case 'ADD_STATUS_MESSAGE':
            return {
                ...state,
                statusMessages: action.statusMessage
            }
        case 'REMOVE_STATE_MESSAGE':
            return {
                ...state,
                statusMessages: null
        }
        default:
            return state;
    }
}

export default reducer;