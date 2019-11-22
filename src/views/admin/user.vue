<template>
  <v-container fluid>
    <div class="title">유저 목록</div>
    <v-row>
      <!-- <v-col v-for="item in boardUserList" :key="item.id" cols="12" sm="6" md="4" lg="3"> -->
      <v-col cols="12" sm="6" md="4" lg="3">
        <v-card class="post-card">
          <v-card-title
            class="post-title-wrapper pt-4 pb-3"
            v-for="item in userList"
            :key="item.uid"
          >{{ item.email }} {{ item.level }}</v-card-title>
          <!-- <v-card-title class="post-title-wrapper pt-4 pb-3">{{ searchEmail }}</v-card-title> -->
          <!-- <v-card-title class="post-title-wrapper pt-4 pb-3">
            {{ totalCount }}
            {{ items }}
          </v-card-title>-->
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { debuglog } from "util";
// import _ from "lodash";
// import UserCard from "@/components/userCard";

export default {
  // components: { UserCard },
  data() {
    return {
      headers: [
        {
          text: "uid",
          value: "uid"
        },
        // uid, email, displayName, emailVerified, photoURL, disabled, level
        { text: "email", value: "email" },
        { text: "displayName", value: "displayName" },
        { text: "photoURL", value: "photoURL" },
        { text: "level", value: "level" }
      ],
      items: [],
      totalCount: 0,
      loading: false,
      options: {
        sortBy: ["email"],
        sortDesc: [false]
      },
      search: "",
      emails: [],
      email: null,
      loadingSearch: false,
      userList: [],
      searchEmail: ""
    };
  },
  watch: {
    options: {
      handler() {
        this.list();
      },
      deep: true
    },
    search(val) {
      val && val !== this.email && this.searchEmails(val);
    },
    email(n, o) {
      if (n !== o) this.list();
    }
  },
  created() {
    this.fetchData();
    // this.list();
  },
  methods: {
    async fetchData() {
      const snapshot = await this.$axios.get(
        "https://us-central1-front-end-maker.cloudfunctions.net/admin/user/"
      );
      let item = {};
      let items = [];
      snapshot.data.forEach(doc => {
        item = doc;
        item.id = doc.uid;
        this.userList.push(item);
      });

      // this.userList.push(snapshot.data);
      console.log(snapshot.data);
    },
    list() {
      this.loading = true;
      this.$axios
        .get("/admin/user", {
          params: {
            offset:
              this.options.page > 0
                ? (this.options.page - 1) * this.options.itemsPerPage
                : 0,
            limit: this.options.itemsPerPage,
            order: this.options.sortBy[0],
            sort: this.options.sortDesc[0] ? "desc" : "asc",
            search: this.email
          }
        })
        .then(({ data }) => {
          this.totalCount = data.totalCount;
          this.items = data.items;
        })
        .catch(e => {
          this.$toasted.global.error(e.message);
        })
        .finally(() => {
          this.loading = false;
        });
    }
    // searchEmails: _.debounce(
    //   function(val) {
    //     this.loadingSearch = true;

    //     this.$axios
    //       .get("/admin/search", {
    //         params: { search: this.search }
    //       })
    //       .then(({ data }) => {
    //         this.emails = data;
    //       })
    //       .catch(e => {
    //         this.$toasted.global.error(e.message);
    //       })
    //       .finally(() => {
    //         this.loadingSearch = false;
    //       });
    //   },
    //   // 사용자가 입력을 기다리는 시간(밀리세컨드) 입니다.
    //   500
    // )
  }
};
</script>

<style>
</style>
