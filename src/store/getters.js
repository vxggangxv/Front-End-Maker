const getters = {
  getBoardList(state) {
    const boardList = state.boardList;
    boardList.forEach(item => {
      item.createdAt = item.createdAt.substr(0, 10);
      if (item.email) {
        let dot = item.email.lastIndexOf("@");
        let first = item.email.substring(0, dot);
        item.firstName = first;
      }
    });
    return boardList;
  },
}

export default getters
