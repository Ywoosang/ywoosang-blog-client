<template>
  <div class="profile-container">
    <div class="avatar-wrapper">
      <div class="user-avatar">
        <img :src="currentProfileImage" alt="User Avatar" />
        <div class="upload-layer">
          <input
            ref="fileInput"
            id="file"
            type="file"
            @change="handleFileChange"
            accept="image/*"
          />
          <label for="file" class="upload-image">업로드</label>
        </div>
      </div>
      <button class="update-image" @click="updateImage">이미지 적용</button>
      <button class="reset-image" @click="resetProfileImage">취소</button>
    </div>

    <div class="detail-wrapper">
      <div class="nickname-wrapper">
        <div class="view" v-if="!editMode.nickname">
          <p class="nickname">{{ user.nickname }}</p>
          <button class="update-btn update-nickname" @click="editNickname">
            <font-awesome-icon icon="fa-regular fa-pen-to-square" />
          </button>
        </div>
        <div class="edit" v-else>
          <input type="text" v-model="editedUser.nickname" />
          <button @click="saveNickname" class="save-btn">저장</button>
        </div>
      </div>
      <div class="description-wrapper">
        <div class="view" v-if="!editMode.description">
          <p class="description">{{ user.description }}</p>
          <button
            class="update-btn update-description"
            @click="editDescription"
          >
            <font-awesome-icon icon="fa-regular fa-pen-to-square" />
          </button>
        </div>
        <div class="edit" v-else>
          <textarea type="text" v-model="editedUser.description" />
          <button @click="saveDescription" class="save-btn">저장</button>
        </div>
      </div>
    </div>
    <div class="info-wrapper">
      <p class="user-email">{{ user.email }}</p>
      <p class="user-role">{{ user.role }}</p>
      <p class="user-status">{{ user.status }}</p>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from "vue";
import { mapGetters, mapActions } from "vuex";
import { updateUserProfileImage } from "@/services/api/users";

export default defineComponent({
  computed: {
    ...mapGetters("users", {
      user: "getUser",
    }),
  },
  data() {
    return {
      editMode: {
        nickname: false,
        description: false,
      },
      editedUser: {
        nickname: "",
        description: "",
      },
      prevProfileImage: "",
      currentProfileImage: "",
      maxFileSize: 1024 * 1024, // 1MB as an example, adjust according to your requirements
    };
  },
  mounted() {
    this.prevProfileImage = this.user.profileImage;
    this.currentProfileImage = this.user.profileImage;
  },
  methods: {
    ...mapActions("users", [
      "updateNickname",
      "updateDescription",
      "updateProfileImage",
    ]),
    async handleFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        // Check file size
        if (file.size <= this.maxFileSize) {
          const formData = new FormData();
          formData.append("image", file);
          const response = await updateUserProfileImage(formData);
          const { data, config } = response;
          const fileName = data.filename;
          const baseURL = config.baseURL;
          this.currentProfileImage = `${baseURL}/static/temp/${fileName}`;
        } else {
          alert("File size exceeds the limit. Please choose a smaller file.");
          // Optionally reset the input
          event.target.value = "";
        }
      }
    },
    async updateImage() {
      if (this.prevProfileImage != this.currentProfileImage) {
        // actions
        await this.updateProfileImage(this.currentProfileImage);
        this.prevProfileImage = this.user.profileImage;
        this.currentProfileImage = this.user.profileImage;
      }
    },
    resetProfileImage() {
      const fileInput = this.$refs.fileInput as HTMLInputElement;
      if (fileInput) {
        fileInput.value = "";
      }
      this.currentProfileImage = this.prevProfileImage;
    },
    editNickname() {
      this.editMode.nickname = true;
      this.editedUser.nickname = this.user.nickname;
    },
    editDescription() {
      this.editMode.description = true;
      this.editedUser.description = this.user.description;
    },
    saveNickname() {
      this.editMode.nickname = false;
    },
    saveDescription() {
      this.editMode.description = false;
    },

    // updateNickname() {
    //   this.updateNickname(this.editedUser.nickname);
    // },
    // updateDescription() {
    //   this.updateDescription(this.editedUser.description);
    // },
    // updateProfileImage() {
    //   // Call the Vuex action to handle file upload
    //   this.updateProfileImage(this.editedUser.profileImage);
    // }
  },
});
</script>

<style src="@/styles/users/profile.css" scoped>
</style>
