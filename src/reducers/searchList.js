
export const setSearchList = value => ({
  type: 'SET_SEARCH_LIST',
  value 
})
export const delSearchList = value => ({
  type: 'DEL_SEARCH_LIST',
  value 
})

let defaultValue = []
const searchList = (state = defaultValue, action) => {
  switch (action.type) {
    case 'SET_SEARCH_LIST':
      return [
        ...state,
        action.value
      ]
    case 'DEL_SEARCH_LIST':
      return state.filter((e)=>{
        return e!=action.value
      });
    default:
      return state
  }
}

export default searchList