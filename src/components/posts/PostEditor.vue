<template>
  <div class="editor-wrapper">
    <div class="selection-container">
      <input
        class="post-title"
        placeholder="제목을 입력하세요"
        v-model="title"
      />
      <textarea
        class="post-description"
        placeholder="포스트 설명을 입력하세요"
        v-model="description"
      />
      <div class="settings-wrapper">
        <button
          class="public-btn"
          :class="{ selected: status == 'PUBLIC' }"
          @click="setStatus('PUBLIC')"
        >
          <font-awesome-icon icon="fa-solid fa-lock-open" />
          전체 공개
        </button>
        <button
          class="private-btn"
          :class="{ selected: status == 'PRIVATE' }"
          @click="setStatus('PRIVATE')"
        >
          <font-awesome-icon icon="fa-solid fa-lock" />
          비공개
        </button>
      </div>
      <div class="category-wrapper">
        <h3>카테고리</h3>
        <select class="category-select" v-model="categoryId">
          <option
            v-for="category in categories"
            :key="category.id"
            :value="category.id"
          >
            {{ category.name }}
          </option>
        </select>
      </div>
      <div class="tag-wrapper">
        <h3>태그 목록</h3>
        <div class="tag" v-for="tagName in tagNames" :key="tagName">
          {{ tagName }}
        </div>
        <input
          class="tag-input"
          type="text"
          placeholder="태그를 입력하세요"
          v-model="selectedTagName"
          @keyup.enter="registerTag"
        />
      </div>
    </div>
    <div id="editor"></div>
    <div class="button-container">
      <button class="exit-btn">나가기</button>
      <button class="submit-btn" @click="uploadPost">작성하기</button>
    </div>
  </div>
</template>
 

<script lang="ts">
import "@toast-ui/editor/dist/toastui-editor.css"; // Editor's Style
import "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css";
import "@toast-ui/editor/dist/i18n/ko-kr";
import "prismjs/themes/prism.css";
import Editor from "@toast-ui/editor";
import codeSyntaxHighlight from "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight-all.js";
import { uploadImageFile, createPost } from "@/services/api/post";
import { getCategories } from "@/services/api/category";
import { CreatePostDto } from "@/types/dto";
import { defineComponent } from "vue";
import { AxiosResponse } from "axios";
import { PostStatus } from "@/types/enums";

export default defineComponent({
  data() {
    return {
      isUploading: false as boolean,
      editor: null as Editor | null,
      selectedTagName: "",
      categories: [] as string[],
      // 업로드를 위한 필드
      title: "" as string,
      description: "" as string,
      status: "PUBLIC" as PostStatus,
      categoryId: null as null | number,
      tagNames: [] as string[],
      imageIds: [] as number[],
    };
  },
  async mounted() {
    try {
      const { data } = await getCategories();
      this.categories = data.categories;
    } catch (e) {
      console.log(e);
    }
    this.editor = new Editor({
      el: document.querySelector("#editor") as HTMLElement,
      previewStyle: "vertical",
      height: "80vh",
      initialEditType: "markdown",
      initialValue: "",
      theme: "white",
      plugins: [codeSyntaxHighlight],
      hooks: {
        addImageBlobHook: this.dropedImageUpload,
      },
    });
  },
  methods: {
    registerTag() {
      if (this.selectedTagName.trim() == "") return;
      this.tagNames.push(this.selectedTagName.trim());
      this.selectedTagName = "";
    },
    async dropedImageUpload(file: Blob, setText) {
      this.isUploading = true;
      try {
        if (!file) return false;
        // 이미지 사이즈 제한
        if (file && file.size > 5242880) {
          const size = (file.size / (1000 * 1000)).toFixed(1);
          alert(
            `최대 업로드 사이즈(5 MB)를 초과 하였습니다.\n현재 사이즈 ${size}MB`
          );
          return false;
        }
        // api 업로드 만들기
        const formData = new FormData();
        formData.append("image", file);
        const response: AxiosResponse = await uploadImageFile(formData);
        if (response.status == 201) {
          const { data, config } = response;
          const imageId = data.id;
          const filename = data.filename;
          console.log(imageId, filename);
          const baseURL = config.baseURL;
          setText(`${baseURL}/files/${filename}`, "image");
          this.imageIds.push(imageId);
        }
      } catch (e: any) {
        alert("파일 업로드에 실패하였습니다");
        console.log(e.statusCode);
      } finally {
        this.isUploading = false;
      }
    },
    async uploadPost() {
      if (this.isUploading) return;
      const content = this.editor!.getMarkdown();
      const { title, status, description, categoryId, tagNames, imageIds } =
        this;
      const data: CreatePostDto = {
        title,
        description,
        content,
        status,
      };
      if (categoryId) {
        data.categoryId = categoryId;
      }

      if (tagNames.length) {
        data.tagNames = tagNames;
      }

      if (imageIds) {
        data.imageIds = imageIds;
      }
      console.log(data);

      // async request
      try {
        this.isUploading = true;
        const response = await createPost(data);
        console.log(response);
      } catch (e) {
        console.log(e);
      } finally {
        this.isUploading = false;
      }
    },
    setStatus(status: PostStatus) {
      this.status = status;
    },
  },
});
</script>


<style scoped>
.editor-wrapper {
  display: flex;
  flex-direction: column;
}
.post-title {
  font-size: 30px;
  font-weight: bold;
  height: 70px;
  border-radius: 0px;
  border: none;
}
.post-description {
  border: none;
  height: 60px;
  padding: 5px 10px;
}

.public-btn,
.private-btn {
  border: 1px solid #ddd;
  background-color: #ffffff;
  color: black;
  margin: 5px;
  padding: 10px;
  cursor: pointer;
}

.selected {
  background-color: black;
  color: white;
}

.selection-container {
  display: flex;
  flex-direction: column;
}
.category-wrapper {
  border-top: 1px solid #ddd;
  display: flex;
  align-items: center;
}
.category-wrapper h3 {
  padding: 5px 25px 5px 10px;
  width: 110px;
}
.category-wrapper .category-select {
  background: #ffffff;
  border: 1px solid #ddd;
  min-width: 200px;
  height: 36px;
  line-height: 36px;
  padding-left: 5px;
  padding-top: 5px;
  font-size: 20px;
}
.category-select:focus {
  outline: none;
  border: 1px solid black;
}
.tag-wrapper {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin-bottom: 20px;
}
.tag-wrapper h3 {
  padding: 5px 25px 5px 10px;
  width: 110px;
  margin: 0;
}
.tag-wrapper .tag {
  border: 1px solid #ddd;
  background: #ffffff;
  padding: 7px 10px;
  border-radius: 8px;
  margin-right: 3px;
  margin: 2px 3px 2px 0;
}
.tag-wrapper .tag-input {
  width: 200px;
  border-radius: 0px;
  box-sizing: border-box;
  line-height: 40px;
  padding-bottom: 5px;
  height: 40px;
  padding: 5px 7px 5px 7px;
}

.button-container {
  height: 50px;
  padding: 10px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.button-container .exit-btn {
  font-size: 20px;
  background: none;
  margin-left: 10px;
}
.button-container .submit-btn {
  font-size: 20px;
  border-radius: 3px;
  padding: 5px 10px;
  margin-right: 10px;
}
.toastui-editor-mode-switch .tab-item {
  display: none !important;
}
</style>
