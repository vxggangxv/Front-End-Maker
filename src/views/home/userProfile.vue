<template>
  <v-container fluid>
    <v-form class="px-2" v-model="valid" ref="form" lazy-validation>
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
                  <template v-if="user">
                    <img v-if="user.photoURL" :src="user.photoURL" alt="avatar" />
                    <v-icon v-else size="120">mdi-account</v-icon>
                  </template>
                </v-avatar>

                <v-file-input
                  class="mt-3"
                  placeholder="Pick an avatar"
                  prepend-icon="mdi-camera"
                  label="Avatar"
                  ref="avatar"
                  v-model="file"
                  :loading="avatarLoading"
                  @change="updateAvatar"
                ></v-file-input>
              </div>
            </v-col>
            <v-col cols="7">
              <template v-if="user">
                <div v-if="isUpdateType">
                  <div>
                    <v-text-field
                      class="mt-n4"
                      label="displayName"
                      ref="displayName"
                      v-model="form.displayName"
                      :loading="userUpdateLoading"
                      :rules="[rules.maxLength(20)]"
                      required
                    ></v-text-field>
                  </div>
                  <div>
                    <v-text-field
                      class="mt-n4"
                      label="about me"
                      v-model="form.aboutMe"
                      :loading="userUpdateLoading"
                      :rules="[rules.maxLength(20)]"
                      required
                    ></v-text-field>
                  </div>
                  <p class="mb-1">Social Info</p>
                  <div>
                    <v-text-field
                      label="Github"
                      v-model="form.github"
                      prepend-icon="mdi-github-circle"
                      :loading="userUpdateLoading"
                      :rules="[rules.maxLength(50)]"
                      required
                    ></v-text-field>
                  </div>
                  <div>
                    <v-text-field
                      class="mt-n4"
                      label="Homepage"
                      v-model="form.homepage"
                      prepend-icon="mdi-home-circle"
                      :loading="userUpdateLoading"
                      :rules="[rules.maxLength(50)]"
                      required
                    ></v-text-field>
                  </div>
                </div>
                <div v-else>
                  <p class="mb-0 font-weight-bold">{{ user.displayName }}</p>
                  <p class="mb-0" v-if="user.aboutMe">{{ user.aboutMe }}</p>
                  <p class="mb-0 mt-2" v-if="user.github">
                    <v-icon>mdi-github-circle</v-icon>
                    {{ user.github }}
                  </p>
                  <p class="mb-0" v-if="user.homepage">
                    <v-icon>mdi-google-chrome</v-icon>
                    <!-- <v-icon>mdi-home-circle</v-icon> -->
                    {{ user.homepage }}
                  </p>
                </div>
                <div>
                  <span class="font-weight-thin">
                    <v-icon>mdi-at</v-icon>
                    {{ user.email }}
                  </span>
                </div>
                <div class="mt-2 d-flex">
                  <v-spacer></v-spacer>
                  <template v-if="isUpdateType">
                    <v-btn :disabled="!valid" @click="updateUser" outlined small>저장</v-btn>
                    <v-btn class="ml-1" @click="isUpdateType = false" outlined small>취소</v-btn>
                  </template>
                  <template v-else>
                    <v-btn outlined small @click="nickChangeCancel">변경</v-btn>
                  </template>
                </div>
              </template>
              <!-- <div class="mt-2">
                <v-btn class="font-weight-thin" @click="fetchUser">패치유저</v-btn>
              </div>-->
            </v-col>
          </v-row>
        </v-card>
      </v-card>
    </v-form>
  </v-container>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
import { getHelper } from "../../mixins/getHelper";

export default {
  data() {
    return {
      file: null,
      userUpdateLoading: false,
      // avatarLoading: true,
      isUpdateType: false,
      form: {
        displayName: "",
        aboutMe: "",
        github: "",
        homepage: ""
      },
      rules: {
        required: v => !!v || "필수 항목입니다.",
        minLength: length => v =>
          v.length >= length || `${length}자리 이상으로 입력하세요.`,
        maxLength: length => v =>
          v.length <= length || `${length}자리 이하으로 입력하세요.`
        // value => !value || value.size < 2000000 || "2MB 이내로 등록 가능!"
      },
      valid: false
    };
  },
  mixins: [getHelper],
  computed: {
    ...mapState(["user", "avatarLoading"])
  },
  methods: {
    ...mapMutations(["SET_USER"]),
    ...mapActions(["UPDATE_AVATAR", "UPDATE_USER", "FETCH_USER"]),
    blurEvt() {},
    nickChangeCancel() {
      // this.form.displayName = "";
      // this.$refs.displayName.focus();
      this.isUpdateType = true;
      this.$nextTick(() => {
        this.$refs.displayName.focus();
        this.form.displayName = this.user.displayName || "";
        this.form.aboutMe = this.user.aboutMe || "";
        this.form.github = this.user.social.github || "";
        this.form.homepage = this.user.social.homepage || "";
      });
      // console.log(this.$refs);
    },
    async updateAvatar() {
      // console.log(this.file);
      if (!this.file || this.file === undefined) return (this.file = null);
      if (this.file.size > 2000000) {
        this.$toasted.global.error(
          "아바타 이미지는 2MB 이내로 등록 가능합니다."
        );
        return (this.file = null);
      }
      const r = await this.$swal({
        title: "변경하시겠습니까?",
        type: "warning",
        confirmButtonText: "확인",
        cancelButtonText: "취소",
        showCancelButton: true
      });
      if (!r.value) {
        this.file = null;
        return;
      }
      // this.avatarLoading = true;

      const file = this.file;
      const uid = this.user.uid;
      const updatedAt = new Date();

      await this.UPDATE_AVATAR({ uid, updatedAt, file }).then(() => {
        this.file = null;
        this.$refs.avatar.blur();
        // this.avatarLoading = false;
      });
    },
    // async fetchUser() {
    //   const { uid } = this.$firebase.auth().currentUser;
    //   this.$store.dispatch("FETCH_USER", uid);
    // },
    async updateUser() {
      if (!this.$refs.form.validate())
        return this.$toasted.global.error("입력 폼을 올바르게 작성해주세요.");
      const r = await this.$swal.fire({
        title: "정말 변경하시겠습니까?",
        type: "warning",
        confirmButtonText: "확인",
        cancelButtonText: "취소",
        showCancelButton: true
      });
      if (!r.value) return;
      this.userUpdateLoading = true;

      // const uid = this.$firebase.auth().currentUser.uid;
      const uid = this.user.uid;
      const updatedAt = new Date();
      const { displayName, aboutMe, github, homepage } = this.form;

      await this.UPDATE_USER({
        uid,
        updatedAt,
        displayName,
        aboutMe,
        github,
        homepage
      }).then(() => {
        this.isUpdateType = false;
        this.userUpdateLoading = false;
      });
    }
  },
  mounted() {
    // console.log(this.avatarLoading);
  }
};
</script>

<style lang="scss" scoped></style>