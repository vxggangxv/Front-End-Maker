<template>
  <!-- <v-navigation-drawer class="whtie" v-model="$store.state.drawer" :clipped="$vuetify.breakpoint.lgAndUp" app> -->
  <v-navigation-drawer class="whtie" v-model="$store.state.drawer" app>

    <v-container>
      <v-row>
        <v-col cols="12">
          <div class="text-center">
            <p class="display-1">
              프만사
            </p>
            <p class="subheading">
              프론트 앤드를 만드는 사람들
            </p>
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-text-field color="gray" label="Solo" append-icon="mdi-magnify" placeholder="Search" solo></v-text-field>
        </v-col>
      </v-row>
    </v-container>


    <v-list>
      <v-list-item v-for="item in items" :key="item.title" :to="item.path">
        <v-list-item-icon>
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
    </template> -->
  </v-navigation-drawer>
</template>

<script>
  export default {
    data() {
      return {
        items: [
          {
            icon: 'mdi-trending-up',
            title: '트렌딩',
            path: '/trending'
          }, 
          {
            icon: 'mdi-update',
            title: '최신 포스트',
            path: '/post'
          }, 
          {
            icon: 'mdi-tag-multiple',
            title: '태그',
            path: '/tag'
          }, 
        ]
      }
    },
  }

</script>
