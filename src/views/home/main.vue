<template>
  <v-container fluid>
    <template v-if="!searchTitle">
      <div class="title">최신 Article</div>
      <v-row>
        <v-col v-for="item in boardList" :key="item.id" cols="12" sm="6" md="4" lg="3">
          <v-card :to="`/board/list/${item.id}`">
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
    };
  },
  computed: {
    ...mapState(["board", "boardList", "searchTitle", "searchList"])
  },
  methods: {
    ...mapActions(["FETCH_BOARD"])
  },
  async created() {
    await this.$store.dispatch("FETCH_BOARD_LIST");
  }
};
</script>

<style lang="scss" scoped>
</style>