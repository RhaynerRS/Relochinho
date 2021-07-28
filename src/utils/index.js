//load timer
export const loadState = () => {
  try {
    const serializedState = localStorage.getItem(save)
    if (serializedState === null) {
      return undefined;
    }
  } catch (err) {
    return undefined;
  }
}

//save timer
export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state)
    localStorage.setItem(save, serializedState)
  } catch (err) {
    console.log('Error. Saving fail')
  }
}