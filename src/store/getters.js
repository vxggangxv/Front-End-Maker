const getters = {
  getBoardList(state) {
    const getBoardList = state.boardList;
    getBoardList.forEach(item => {
      item.createdAt = item.createdAt.substr(0, 10);
    });
    return getBoardList;
  }
}

export default getters