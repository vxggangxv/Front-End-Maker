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

      <v-btn outlined dark @click="create">작성하기</v-btn>
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

        <!-- <v-col class="pt-0 pl-0" cols="6">
          <div class="content-viewer" v-html="content"></div>
        </v-col>-->
      </v-row>
    </v-content>
  </v-app>
</template>

<script>
import { dateFormat } from "../../mixins/dateFormat";

export default {
  data() {
    return {
      title: null,
      content: null,
      editorOption: {
        placeholder: "당신의 이야기를 적어보세요 ^-^"
      }
    };
  },
  mixins: [dateFormat],
  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill;
    }
  },
  methods: {
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
      // console.log("editor change!", quill, html, text);
      this.content = html;
    },
    focusContent() {
      this.editor.focus();
    },
    async create() {
      const createdAt = this.getTodayType1();
      const updatedAt = this.getTodayType1();

      let { title, content } = this;
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

      const docRef = await this.$store.dispatch("CREATE_BOARD", {
        title,
        content,
        titleImg,
        summary,
        uid,
        email,
        photoURL,
        createdAt,
        updatedAt
      });
      this.$router.push(`/board/post/${docRef.id}`);
    }
  },
  mounted() {
    // console.log(this.getToday());
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