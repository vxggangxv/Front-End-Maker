<template>
  <v-container fluid>
    <v-card class="d-flex justify-center" color="transparent" flat>
      <v-card class="mt-12 pb-2" width="500">
        <v-row class="px-5">
          <v-col class="d-flex justify-start align-center" cols="12">
            <v-icon class="display-1 mr-2" color="#333">mdi-settings</v-icon>
            <div class="title font-weight-black">프로필 수정</div>
          </v-col>
        </v-row>
        <v-row class="px-5">
          <v-col cols="5">
            <div class="text-center">
              <v-avatar size="150" color="grey lighten-4">
                <img v-if="$store.state.user.photoURL" :src="$store.state.user.photoURL" alt="avatar">
                <v-icon v-else size="120">mdi-account</v-icon>
              </v-avatar>
              
              <!-- <v-btn class="mt-3 font-weight-medium" color="purple" dark>썸네일 변경</v-btn> -->
              <v-btn class="mt-3 font-weight-medium" color="green" dark>썸네일 변경</v-btn>
            </div>
          </v-col>
          <v-col cols="7">
            <div class="d-flex">
              <span class="font-weight-bold"> {{$store.state.user.displayName}}</span>
              <v-spacer></v-spacer>
              <v-btn outlined small>닉네임 변경</v-btn>
            </div>
            <div class="mt-2">
              <span class="font-weight-thin">{{$store.state.user.email}}</span>
            </div>
          </v-col>
        </v-row>
      </v-card>
    </v-card>
  </v-container>
</template>

<script>
  export default {
    
  }
</script>

<style lang="scss" scoped>
</style>