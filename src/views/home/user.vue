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
                  <img
                    v-if="$store.state.user.photoURL"
                    :src="$store.state.user.photoURL"
                    alt="avatar"
                  />
                  <v-icon v-else size="120">mdi-account</v-icon>
                </v-avatar>

                <v-file-input
                  class="mt-3"
                  placeholder="Pick an avatar"
                  prepend-icon="mdi-camera"
                  label="Avatar"
                  v-model="file"
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
                    v-model="form.nickName"
                    :rules="[rules.required, rules.maxLength(20)]"
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
export default {
  data() {
    return {
      file: null,
      loading: false,
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
  methods: {
    blurEvt() {},
    nickChangeCancel() {
      this.form.nickName = "";
      this.nickChangeType = true;
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

      const storageRef = this.$firebase.storage().ref();
      // this.loading = true;
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

      function getExtension(fileName) {
        var fileLength = fileName.length;
        var lastDot = fileName.lastIndexOf(".");
        var fileExtension = fileName.substring(lastDot + 1, fileLength);
        return fileExtension;
      }
      const fileExtension = getExtension(this.file.name);
      const uploadTask = storageRef
        .child("images/users/" + user.uid + "/" + "avatar." + fileExtension)
        .put(this.file);

      uploadTask.on(
        this.$firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
        snapshot => {
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
          // this.loading = false;
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then(async photoURL => {
            await user.updateProfile({
              photoURL
            });
            this.$store.commit("setUser", user);
            // await this.$firebase
            //   .firestore()
            //   .collection("users")
            //   .doc(user.uid)
            //   .update({ updatedAt, photoURL });
            // this.loading = false;
            this.file = null;
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
      const user = this.$firebase.auth().currentUser;
      const displayName = this.form.nickName;
      await user.updateProfile({ displayName });
      this.$store.commit("setUser", user);
      this.nickChangeType = false;
      this.form.nickName = null;
    }
  }
};
</script>

<style lang="scss" scoped></style>
