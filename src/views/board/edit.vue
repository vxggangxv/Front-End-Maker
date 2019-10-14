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
export default {
  data() {
    return {
      bid: null,
      uid: null,
      title: null,
      content: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      visitedAt: new Date(),
      editorOption: {
        placeholder: "당신의 이야기를 적어보세요 ^-^"
      }
    };
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
    update() {
      const { bid, title, content } = this;
      this.$store.dispatch("UPDATE_BOARD", { bid, title, content });
      this.$router.push(`/board/list/${this.bid}`);
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
  }
};
</script>
<style lang="scss" scoped>
.v-content {
  background: #fff;
}
.content-viewer {
  padding: 12px 15px;
  border-bottom: 1px solid #ccc;
  box-sizing: border-box;
  background: #fff;
}
</style>