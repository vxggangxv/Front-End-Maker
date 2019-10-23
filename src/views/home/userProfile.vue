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
                  <template v-if="$store.state.user">
                    <img
                      v-if="$store.state.user.photoURL"
                      :src="$store.state.user.photoURL"
                      alt="avatar"
                    />
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
              <template v-if="$store.state.user">
                <div v-if="nickChangeType" class="d-flex">
                  <v-text-field
                    class="mt-n4"
                    label="nickName"
                    ref="nickName"
                    v-model="form.nickName"
                    :loading="nickLoading"
                    :rules="[rules.required, rules.maxLength(20)]"
                    @keydown.prevent.enter="updateNick"
                    required
                  ></v-text-field>
                  <v-spacer></v-spacer>
                  <v-btn :disabled="!valid" @click="updateNick" outlined small>변경</v-btn>
                  <v-btn class="ml-1" @click="nickChangeType = false" outlined small>취소</v-btn>
                </div>
                <div v-else class="d-flex">
                  <span class="font-weight-bold">{{ $store.state.user.displayName }}</span>
                  <v-spacer></v-spacer>
                  <v-btn outlined small @click="nickChangeCancel">닉네임 변경</v-btn>
                </div>
                <div class="mt-2">
                  <span class="font-weight-thin">{{ $store.state.user.email }}</span>
                </div>
              </template>
              <!-- <div class="mt-2">
                <v-btn class="font-weight-thin" @click="blurEvt">
                  블러 테스트
                </v-btn>
              </div>-->
            </v-col>
          </v-row>
        </v-card>
      </v-card>
    </v-form>
  </v-container>
</template>

<script>
import { mapMutations } from "vuex";
import { getHelper } from "../../mixins/getHelper";

export default {
  data() {
    return {
      file: null,
      nickLoading: false,
      avatarLoading: false,
      nickChangeType: false,
      form: {
        nickName: ""
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
  methods: {
    ...mapMutations(["SET_USER"]),
    blurEvt() {},
    nickChangeCancel() {
      // this.form.nickName = "";
      // this.$refs.nickName.focus();
      this.nickChangeType = true;
      this.$nextTick(() => {
        this.$refs.nickName.focus();
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

      const fileExtension = this.getExtension(this.file.name);
      const storageRef = this.$firebase.storage().ref();
      const user = this.$firebase.auth().currentUser;
      // const uploadTask = storageRef.child(user.uid).put(this.files)

      // const config = {
      //   quality: 0.5,
      //   maxWidth: 500,
      //   maxHeight: 500,
      //   autoRotate: true
      // };
      // const resizedImage = await readAndCompressImage(this.file, config);
      // var metadata = {
      //   contentType: 'image/jpeg'
      // };

      const uploadTask = storageRef
        .child("images/users/" + user.uid + "/" + "avatar." + fileExtension)
        .put(this.file);

      uploadTask.on(
        this.$firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
        snapshot => {
          this.avatarLoading = true;
          this.progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          switch (snapshot.state) {
            case this.$firebase.storage.TaskState.PAUSED: // or 'paused'
              this.$toasted.global.error("Upload is paused");
              break;
            case this.$firebase.storage.TaskState.RUNNING: // or 'running'
              // this.$toasted.global.notice('Upload is running')
              break;
          }
        },
        error => {
          this.$toasted.global.error(error.code);
          this.avatarLoading = false;
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then(async photoURL => {
            // const updatedAt = this.getTodayType1();
            const updatedAt = new Date();
            await user.updateProfile({
              photoURL
            });
            await this.$firebase
              .firestore()
              .collection("user")
              .doc(user.uid)
              .set({ updatedAt, photoURL }, { merge: true });
            this.SET_USER(user);
            this.file = null;
            this.$refs.avatar.blur();
            this.avatarLoading = false;
            // console.log(this.$refs.avatar);
            // console.log("File available at", photoURL);
          });
        }
      );
    },
    async updateNick() {
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
      this.nickLoading = true;

      const user = this.$firebase.auth().currentUser;
      const updatedAt = new Date();
      const displayName = this.form.nickName;
      await user
        .updateProfile({ displayName })
        .then(() => {
          console.log("ok");
        })
        .catch(error => {
          console.log(error);
        });
      await this.$firebase
        .firestore()
        .collection("user")
        .doc(user.uid)
        .set({ updatedAt, displayName }, { merge: true });
      this.SET_USER(user);
      this.form.nickName = "";
      this.nickChangeType = false;
      this.nickLoading = false;
      // console.log("ok");
    }
  },
  mounted() {
    // console.log(this.$refs.nickName);
  }
};
</script>

<style lang="scss" scoped></style>