const initialState = {
    fullName: '',
    profilePhotoURL: '',
    profileCompletion: '65%',
  };
  
  const profileReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_PROFILE':
        return {
          ...state,
          ...action.payload,
        };
      case 'UPDATE_PROFILE':
        return {
          ...state,
          fullName: action.payload.fullName,
          profilePhotoURL: action.payload.profilePhotoURL,
          profileCompletion: action.payload.profileCompletion,
        };
      default:
        return state;
    }
  };
  
  export default profileReducer;
  