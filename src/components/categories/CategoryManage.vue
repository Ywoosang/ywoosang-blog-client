<template>
	<div class="category-wrapper">
		<h1>카테고리</h1>
		<div v-if="categories.length" class="existing-categories">
			<ul>
				<li class="category" v-for="category in categories" :key="category.id">
					<span v-if="category.id !== editingCategoryId">{{
						category.name
					}}</span>
					<input v-if="category.id === editingCategoryId" v-model="editedCategoryName"
						@keyup.enter="confirmEdit(category.id)"/>
					<div class="btn-wrapper">
						<button v-if="category.id === editingCategoryId"  class="confirm" @click="confirmEdit(category.id)">확인</button>
						<button v-else class="edit" @click="startEdit(category.id)">수정</button>
						<button class="remove" @click="removeCategory(category.id)">
							삭제
						</button>
					</div>
				</li>
			</ul>
		</div>
		<!-- 새로운 카테고리 생성 폼 -->
		<div class="new-category">
			<form @submit.prevent="uploadCategory" class="category-form">
				<input type="text" v-model="newCategoryName" id="categoryName" required />
				<button type="submit">생성</button>
			</form>
		</div>
	</div>
</template>

<script setup lang="ts">
import {
	createCategory,
	deleteCategory,
	getCategories,
	updateCategory,
} from '@/services/api/category';
import { ref, onMounted } from 'vue';
import { Category } from '@/types/interfaces';

// 새로 생성하는 카테고리 이름
const newCategoryName = ref('');
const categories = ref<Category[]>([]);
// 수정중인 카테고리 id
let editingCategoryId = ref<number | null>(null);
// 
const editedCategoryName  = ref('');
onMounted(async () => {
	const { data } = await getCategories();
	categories.value = data.categories;
});

 
 
// 카테고리 이름 수정 시작
const startEdit = (categoryId: number) => {
	editingCategoryId.value = categoryId;
	const category = categories.value.find(c => c.id === categoryId);
	editedCategoryName.value = category!.name;
};

const confirmEdit = async (categoryId: number) => {
	try {
		const name = editedCategoryName.value;
		const data = { name };
		await updateCategory(categoryId, data);
		categories.value = categories.value.map(category => {
			if (category.id === categoryId) {
				category.name = name;
			}
			return category;
		});
		editingCategoryId.value = null;
		editedCategoryName.value = '';
	} catch (e) {
		console.log(e);
	}
};
	
	
const uploadCategory = async () => {
	const name = newCategoryName.value;
	const data = { name };
	try {
		const response = await createCategory(data);
		const category = response.data;
		categories.value.push(category);
	} catch (e) {
		console.log(e);
	}
	newCategoryName.value = '';
};

const removeCategory = async (id: number) => {
	try {
		await deleteCategory(id);
		categories.value = categories.value.filter(category => category.id != id);
	} catch (e) {
		console.log(e);
	}
};
</script>

<style src="@/styles/category/manage.css" scoped></style>
