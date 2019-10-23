<template>
  <!-- <v-navigation-drawer class="whtie" v-model="$store.state.drawer" :clipped="$vuetify.breakpoint.lgAndUp" app> -->
  <v-navigation-drawer class="whtie" width="240" v-model="$store.state.drawer" app>
    <v-container class="px-5">
      <v-row>
        <v-col cols="12">
          <div class="text-center title-container">
            <h1 class="display-1 font-weight-black">
              <!-- 프만사 -->
              <router-link to="/" class="black--text">프만사</router-link>
            </h1>
            <p class="subheading mt-4">프론트 앤드를 만드는 사람들</p>
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <div class="pos-relative">
            <v-text-field
              color="gray"
              label="Solo"
              placeholder="Search"
              solo
              v-model="inputSearchTitle"
              @keydown.enter="searchList"
            ></v-text-field>
            <span class="search-form-icon" @click="searchList">
              <v-icon color="grey">mdi-magnify</v-icon>
            </span>
          </div>
        </v-col>
      </v-row>
    </v-container>
    <v-list>
      <v-list-item v-for="item in items" :key="item.title" :to="item.path" class="px-5">
        <v-list-item-icon class="mr-3">
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <!-- <template v-slot:append>
      <div class="pa-2">
        <v-btn block>Logout</v-btn>
      </div>
    </template>-->
  </v-navigation-drawer>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      inputSearchTitle: "",
      items: [
        // {
        //   icon: "mdi-trending-up",
        //   title: "트렌딩",
        //   path: "/home/trending"
        // },
        {
          icon: "mdi-update",
          title: "최신 포스트",
          path: "/"
        }
        // {
        //   icon: "mdi-tag-multiple",
        //   title: "태그",
        //   path: "/home/tag"
        // }
      ]
    };
  },
  computed: {
    invalidInput() {
      return !this.inputSearchTitle.trim();
    }
  },
  methods: {
    ...mapActions(["FETCH_BOARD_LIST", "SEARCH_BOARD_LIST"]),
    searchList() {
      if (this.invalidInput) return this.FETCH_BOARD_LIST();
      // if (this.invalidInput) return;
      this.SEARCH_BOARD_LIST(this.inputSearchTitle);
    }
  }
};
</script>
<style lang="scss" scoped>
.search-form-icon {
  position: absolute;
  top: 10px;
  right: 8px;
  cursor: pointer;
}
</style>
