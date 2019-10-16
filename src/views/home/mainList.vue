<template>
  <v-container fluid>
    <div class="title">검색 결과</div>
    <v-row>
      <v-col v-for="item in searchList" :key="item.id" cols="12" sm="6" md="4" lg="3">
        <v-card>
          <v-card-title>{{ item.title }}</v-card-title>
          <v-divider></v-divider>
          <v-card-text v-html="item.content"></v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      items: []
    };
  },
  computed: {
    ...mapState(["searchList"])
  },
  async created() {
    // await this.SEARCH_LIST(this.searchTitle);
    // await this.$store.dispatch("FETCH_BOARD_LIST");
    // this.items = this.$store.state.boards;
  }
};
</script>

<style lang="scss" scoped>
</style>