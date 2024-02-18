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
						@keyup.enter="confirmEdit(category.id)" @blur="cancelEdit" />
					<div class="btn-wrapper">
						<button class="edit" @click="startEdit(category.id)">수정</button>
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

const newCategoryName = ref('');
const categories = ref<Category[]>([]);
let editingCategoryId: number | null = null;
let editedCategoryName = '';

onMounted(async () => {
	try {
		const { data } = await getCategories();
		categories.value = data.categories;
	} catch (e) {
		console.log(e);
	}
});

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

const startEdit = (categoryId: number) => {
	editingCategoryId = categoryId;
	const category = categories.value.find(c => c.id === categoryId);
	editedCategoryName = category!.name;
};

const confirmEdit = async (categoryId: number) => {
	try {
		const name = editedCategoryName;
		const data = { name };
		await updateCategory(categoryId, data);
		categories.value = categories.value.map(category => {
			if (category.id === categoryId) {
				category.name = name;
			}
			return category;
		});
		editingCategoryId = null;
		editedCategoryName = '';
	} catch (e) {
		console.log(e);
	}
};

const cancelEdit = () => {
	editingCategoryId = null;
	editedCategoryName = '';
};
</script>

<style src="@/styles/category/manage.css" scoped></style>
