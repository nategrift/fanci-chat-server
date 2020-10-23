

let isVisable;
let isVisableValue = localStorage.getItem('visable') || true;


    if (isVisableValue === 'true' || isVisableValue === true) {
        isVisable = true;
    } else {
        isVisable = false;
    }

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
        case 'UPDATE_SOCKET':
            return {
                ...state,
                socket: action.socket
            }
        case 'UPDATE_USERS':
            let newUsers = action.users

            return {
                ...state,
                users: newUsers,
                hiddenUsers: action.hiddenUsers
            }
        case 'UPDATE_CURRENT_USER':
            return {
                ...state,
                name: action.name,
                icon: action.icon,
                visable: action.visable
            }
        case 'UPDATE_ROOMS':
            return {
                ...state,
                rooms: action.rooms
            }
        case 'UPDATE_CURRENT_ROOM':
            return {
                ...state,
                room: action.room
            }
        case 'ADD_MESSAGE':
            let updatedMessages = [...state.messages];
            updatedMessages.push(action.message)
            return {
                ...state,
                messages: updatedMessages
            }
        case 'LEAVE_ROOM':
            return {
                ...state,
                room: null
            }
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
            // let removedMsgState = state.statusMessages.filter((msg) => 
            //     msg !== action.statusMessage
            // )
            return {
                ...state,
                statusMessages: null
        }
        default:
            return state;
    }
}

export default reducer;