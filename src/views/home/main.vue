<template>
  <v-container fluid>
    <div class="title">최신 Article</div>
    <v-row>
      <v-col v-for="n in 4" :key="n" cols="12" sm="6" md="4" lg="3">
        <v-card>
          <v-card-title>포스트 제목</v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio accusamus, adipisci ullam, magnam, odit quisquam corrupti esse harum a est repudiandae at illo perferendis sequi? Commodi architecto quia deleniti! Nobis!
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    
  }
</script>

<style lang="scss" scoped>

</style>