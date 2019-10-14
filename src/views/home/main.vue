<template>
  <v-container fluid>
    <div class="title">최신 Article</div>
    <v-row>
      <v-col v-for="item in items" :key="item.id" cols="12" sm="6" md="4" lg="3">
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
export default {
  data() {
    return {
      items: []
    };
  },
  async created() {
    await this.$store.dispatch("FETCH_BOARDS");
    this.items = this.$store.state.boards;
  }
};
</script>

<style lang="scss" scoped>
</style>