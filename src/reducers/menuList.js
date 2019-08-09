
export const setMenuList = value => ({
  type: 'SET_MENU_LIST',
  value 
})

let defaultValue = []
const searchList = (state = defaultValue, action) => {
  switch (action.type) {
    case 'SET_MENU_LIST':
      return action.value
    default:
      return state
  }
}

export default searchList