const getters = {
  getBoardList(state) {
    const boardList = state.boardList;
    boardList.forEach(item => {
      item.createdAt = item.createdAt.substr(0, 10);
    });
    return boardList;
  },
  getUserBoardList(state) {
    let boardList = state.boardList;
    let userList = state.userList;

    boardList.forEach((item) => {
      item.createdAt = item.createdAt.substr(0, 10);
      userList.forEach(item2 => {
        if (item.email === item2.email) item.photoURL = item2.photoURL
      })
    });
    
    return boardList;
  },
  getUserBoard(state) {
    let board = state.board;
    let userList = state.userList;

    // board.createdAt = board.createdAt.substr(0, 10);
    userList.forEach(item2 => {
      if (board.email === item2.email) board.photoURL = item2.photoURL
    })
    
    return board;
  }
}

export default getters