<template>
  <v-container fluid>
    <template v-if="!searchTitle">
      <div class="title">최신 Article</div>
      <!-- <v-row>
        <template v-if="titleImgList">
          <div v-for="(imgItem, i) in titleImgList" :key="i">
            <v-card-title v-html="imgItem"></v-card-title>
          </div>
        </template>
      </v-row>-->
      <v-row>
        <v-col v-for="item in boardList" :key="item.id" cols="12" sm="6" md="4" lg="3">
          <v-card :to="`/board/list/${item.id}`">
            <v-card-title v-if="item.titleImg" v-html="item.titleImg"></v-card-title>
            <v-card-title>{{ item.title }}</v-card-title>
            <v-divider></v-divider>
            <v-card-text v-html="item.content"></v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </template>
    <template v-else>
      <div class="title">검색 Article</div>
      <v-row>
        <v-col v-for="item in searchList" :key="item.id" cols="12" sm="6" md="4" lg="3">
          <v-card>
            <v-card-title>{{ item.title }}</v-card-title>
            <v-divider></v-divider>
            <v-card-text v-html="item.content" maxlength></v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </template>
  </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      items: []
      // boardList: ""
    };
  },
  computed: {
    ...mapState(["board", "boardList", "searchTitle", "searchList"])
  },
  methods: {
    ...mapActions(["FETCH_BOARD", "UPDATE_BOARD_TITLE"]),
    getTitleImg() {
      let tmpContent = "";
      let titleImg = "";
      let n = 0;
      let n2 = 0;
      let endIndexNumber = 0;

      const { boardList } = this;
      boardList.forEach(item => {
        let matchCount = item.content.match(/<img/g);
        if (matchCount != null) {
          // console.log(matchCount.length);
          for (let i = 0; i < matchCount.length; i++) {
            n = item.content.indexOf("<img");
            n2 = item.content.indexOf(">", n);
            tmpContent = item.content.substring(n, n2 + 1);
            item.content = item.content.replace(tmpContent, "");
          }
        }

        let maxLength = 50;
        endIndexNumber = item.content.lastIndexOf(">");
        // console.log(endIndexNumber);
        if (item.content.length > maxLength) {
          // console.log('over');
          item.content = item.content.substring(0, maxLength + 1);
          endIndexNumber = item.content.lastIndexOf(">");
          // console.log(endIndexNumber);
          item.content = item.content.substring(0, endIndexNumber + 1);
        }
      });
    }
  },
  async created() {
    await this.$store.dispatch("FETCH_BOARD_LIST");
    this.getTitleImg();
    // console.log(this.boardList[0].titleImg);
    // console.log(this.$store.state.boardList);
    // console.log(this.$store.state.boardList[0].content);
  }
};
</script>

<style lang="scss" scoped>
</style>