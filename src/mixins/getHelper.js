export const getHelper = {
  methods: {
    getFirstEmailName(email) {
      let dot = email.lastIndexOf("@");
      let first = email.substring(0, dot);
      return first;
    },
    getExtension(fileName) {
      var fileLength = fileName.length;
      var lastDot = fileName.lastIndexOf(".");
      var fileExtension = fileName.substring(lastDot + 1, fileLength);
      return fileExtension;
    }

  }
}