<!-- CategoryCreatePage.vue -->

<template>
  <div class="category-wrapper">
    <h1>카테고리</h1>
    <div v-if="categories.length" class="existing-categories">
      <ul>
        <li class="category" v-for="category in categories" :key="category.id">
          <span v-if="category.id !== editingCategoryId">{{
            category.name
          }}</span>
          <input
            v-if="category.id === editingCategoryId"
            v-model="editedCategoryName"
            @keyup.enter="confirmEdit(category.id)"
            @blur="cancelEdit"
          />
          <div class="btn-wrapper">
            <button class="edit" @click="startEdit(category.id)">수정</button>
            <button class="remove" @click="removeCategory(category.id)">삭제</button>
          </div>
        </li>
      </ul>
    </div>
    <!-- 새로운 카테고리 생성 폼 -->
    <div class="new-category">
      <form @submit.prevent="uploadCategory" class="category-form">
        <input
          type="text"
          v-model="newCategoryName"
          id="categoryName"
          required
        />
        <button type="submit">생성</button>
      </form>
    </div>
  </div>
</template>


<style scoped>
*{
  /* border: 1px solid red; */
}

.category-wrapper {
  max-width: 350px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #ddd;
}

.existing-categories {
  margin-bottom: 20px;
}
.existing-categories ul {
  padding: 0px;
}

.existing-categories li {
  border: 1px solid #ddd;
  margin: 3px 0px;
  width: 300px;
  display: flex;
  justify-content: space-between;
}

.btn-wrapper{
  display: flex;
  justify-content: space-between;
  width: 100px;
}
.new-category {
  margin-right: 5px;
}

.category-form {
  display: flex;
  width: 300px;
}
.category-form input {
  flex: 1;
}
.category-form button{
  width: 100px;
}


button {
  background-color: #ddd;
  border: none;
  padding: 10px;
  cursor: pointer;
}

button:hover {
  background-color: #ccc;
}
</style>


<script lang='ts'>
import { defineComponent } from "vue";
import {
  createCategory,
  deleteCategory,
  getCategories,
  updateCategory,
} from "@/services/api/category";
import { Category } from "@/types/interfaces";

export default defineComponent({
  data() {
    return {
      newCategoryName: "",
      categories: [] as Category[],
      editingCategoryId: null,
      editedCategoryName: "",
    };
  },
  async mounted() {
    try {
      const { data } = await getCategories();
      this.categories = data.categories;
    } catch (e) {
      console.log(e);
    }
  },
  computed: {},
  methods: {
    async uploadCategory() {
      const name = this.newCategoryName;
      const data = {
        name
      };
      try {
        const response = await createCategory(data);
        const category = response.data;
        this.categories.push(category);
      } catch (e) {
        console.log(e);
      }
      this.newCategoryName = "";
    },
    async removeCategory(id: number) {
      try {
        await deleteCategory(id);
        this.categories = this.categories.filter(
          (category) => category.id != id
        );
      } catch (e) {
        console.log(e);
      }
    },
    startEdit(categoryId) {
      this.editingCategoryId = categoryId;
      const category = this.categories.find((c) => c.id === categoryId);
      this.editedCategoryName = category!.name;
    },
    async confirmEdit(categoryId) {
      try{
        const name = this.editedCategoryName;
        const data = {
          name
        };
        await updateCategory(categoryId,data);
        this.categories = this.categories.map(category => {
          if(category.id == categoryId) {
            category.name = name;
          }
          return category;
        });
        this.editingCategoryId = null;
        this.editedCategoryName = "";
      } catch(e) {
        console.log(e);
      }
      
    },
    cancelEdit() {
      this.editingCategoryId = null;
      this.editedCategoryName = "";
    },
  },
});
</script>
 