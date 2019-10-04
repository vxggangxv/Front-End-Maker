<template>
  <v-app>
    <v-app-bar color="#343434" app>
      <v-btn icon color="white">
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

      <v-btn outlined dark @click="write">작성하기</v-btn>
    </v-app-bar>

    <v-content>
      <quill-editor
        v-model="content"
        ref="myQuillEditor"
        :options="editorOption"
        @blur="onEditorBlur($event)"
        @focus="onEditorFocus($event)"
        @ready="onEditorReady($event)"
      ></quill-editor>
    </v-content>
  </v-app>
</template>

<script>
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
    async write() {
      const r = await this.$firebase
        .firestore()
        .collection("board")
        .add({
          title: this.title,
          content: this.content
        });

      console.log(r);
    }
  },
  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill;
    }
  },
  mounted() {
    console.log("this is current quill instance object", this.editor);
  }
};
</script>