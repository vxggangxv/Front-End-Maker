<template>
  <v-app>
    <v-app-bar color="#343434" app>
      <v-btn icon color="white" @click="$router.go(-1)">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <v-text-field
        class="mt-7"
        name="title"
        v-model="title"
        label="제목을 입력해주세요."
        solo
        flat
        dark
        clearable
        @keydown.prevent.tab="focusContent"
      ></v-text-field>
      <v-spacer></v-spacer>
      <!-- <span class="text--color">{{ $refs.myQuillEditor }}</span> -->

      <v-btn outlined dark @click="update">수정하기</v-btn>
      <v-btn outlined dark @click="$router.go(-1)" class="ml-2">뒤로</v-btn>
    </v-app-bar>

    <v-content>
      <v-row class="mt-2">
        <quill-editor
          v-model="content"
          ref="myQuillEditor"
          :options="editorOption"
          @blur="onEditorBlur($event)"
          @focus="onEditorFocus($event)"
          @ready="onEditorReady($event)"
        ></quill-editor>

        <input type="file" id="getFile" @change="uploadFunction" hidden />
      </v-row>
    </v-content>
  </v-app>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { dateFormat } from "../../mixins/dateFormat";

export default {
  data() {
    return {
      bid: null,
      title: null,
      content: null,
      titleImg: null,
      summary: null,
      updatedAt: new Date(),
      visitedAt: new Date(),
      editorOption: {
        placeholder: "당신의 이야기를 적어보세요 ^-^"
      }
    };
  },
  mixins: [dateFormat],
  computed: {
    ...mapState(["user"])
  },
  methods: {
    ...mapActions(["UPDATE_BOARD"]),
    onEditorBlur(quill) {
      // console.log("editor blur!", quill);
    },
    onEditorFocus(quill) {
      // console.log("editor focus!", quill);
    },
    onEditorReady(quill) {
      // console.log("editor ready!", quill);
    },
    onEditorChange({ quill, html, text }) {
      console.log("editor change!", quill, html, text);
      this.content = html;
    },
    focusContent() {
      this.editor.focus();
    },
    update() {
      const updatedAt = this.getTodayType1();
      let { bid, title, content } = this;
      let titleImg = null;
      let summary = null;
      let uid = this.$store.state.user.uid;
      let email = this.$store.state.user.email;
      let photoURL = this.$store.state.user.photoURL;
      let tmpContent = "";
      let n = 0;
      let n2 = 0;

      let matchCount = content.match(/<img/g);
      if (matchCount != null) {
        // console.log(matchCount.length);
        n = content.indexOf("<img");
        n2 = content.indexOf(">", n);
        titleImg = content.substring(n, n2 + 1);
        // console.log(titleImg);
      }

      let maxLength = 420;
      summary = content.replace(/(<([^>]+)>)/gi, "");
      if (content.length > maxLength) {
        summary = summary.substring(0, maxLength + 1);
      }

      this.UPDATE_BOARD({
        id: bid,
        title,
        titleImg,
        content,
        summary,
        email,
        uid,
        photoURL,
        updatedAt
      })
        .then(() => {
          this.$router.push(`/board/post/${this.bid}`);
        })
        .catch(error => {
          console.log(error);
        });
    },
    uploadFunction(e) {
      this.selectedFile = e.target.files[0];

      // console.log(this.selectedFile);

      // var form = new FormData();
      // form.append("file", this.selectedFile);
      // form.append("name", this.selectedFile.name);

      const storageRef = this.$firebase.storage().ref();
      const uploadTask = storageRef
        .child("images/board/" + this.bid + "/" + this.selectedFile.name)
        .put(this.selectedFile);

      uploadTask.on(
        this.$firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
        snapshot => {
          this.progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          switch (snapshot.state) {
            case this.$firebase.storage.TaskState.PAUSED: // or 'paused'
              this.$toasted.global.error("Upload is paused");
              break;
            case this.$firebase.storage.TaskState.RUNNING: // or 'running'
              break;
          }
        },
        error => {
          this.$toasted.global.error(error.code);
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then(async imgURL => {
            // this code to set your position cursor
            const range = this.$refs.myQuillEditor.quill.getSelection();
            //this code to set image on your server to quill editor
            this.$refs.myQuillEditor.quill.insertEmbed(range, "image", imgURL);
          });
        }
      );
    }
  },
  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill;
    }
  },
  async created() {
    this.bid = this.$route.params.id;
    await this.$store.dispatch("FETCH_BOARD", this.bid);
    this.title = this.$store.state.board.title;
    this.content = this.$store.state.board.content;
    // console.log(this.$store.state.user.uid);
  }
};
</script>
<style lang="scss" scoped>
// .v-content {
//   background: #fff;
// }
// .content-viewer {
//   padding: 12px 15px;
//   border-bottom: 1px solid #ccc;
//   box-sizing: border-box;
//   background: #fff;
// }
</style>