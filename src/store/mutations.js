const mutations = {
  SET_IS_DRAWER(state, toggle) {
    state.drawer = toggle;
  },
  SET_IS_EMAIL_SEND(state, toggle) {
    state.emailSend = toggle;
  },
  SET_IS_EMAIL_VERIFIED(state, toggle) {
    state.emailVerified = toggle;
  },
  SET_IS_FIREBASE_LOADED(state, toggle) {
    state.firebaseLoaded = toggle;
  },
  SET_IS_AVATAR_LOADING(state, toggle) {
    state.avatarLoading = toggle;
  },
  SET_USER_LIST(state, userList) {
    state.userList = userList;
  },
  SET_USER(state, user) {
    state.user = user;
  },
  SET_BOARD_USER(state, boardUser) {
    state.boardUser = boardUser;
  },
  SET_BOARD_LIST(state, boardList) {
    state.boardList = boardList;
  },
  SET_BOARD(state, board) {
    state.board = board;
  },
  // SET_SEARCH_TITLE(state, searchTitle) {
  // 	state.searchTitle = searchTitle;
  // },
  // SET_SEARCH_LIST(state, searchList) {
  // 	state.searchList = searchList;
  // },
}

export default mutations