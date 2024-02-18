<template>
	<div class="profile-container">
		<div class="avatar-wrapper">
			<div class="user-avatar">
				<img :src="currentProfileImage" alt="프로필 이미지" />
				<div class="upload-layer">
					<input ref="fileInput" id="file" type="file" @change="handleFileChange" accept="image/*" />
					<label for="file" class="upload-image">업로드</label>
				</div>
			</div>
			<button class="update-image" @click="updateImage">이미지 적용</button>
			<button class="reset-image" @click="resetProfileImage">취소</button>
		</div>

		<div class="detail-wrapper">
			<div class="nickname-wrapper">
				<div class="view" v-if="!editMode.nickname">
					<h2 class="nickname">{{ user.nickname }}</h2>
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
					<button class="update-btn update-description" @click="editDescription">
						<font-awesome-icon icon="fa-regular fa-pen-to-square" />
					</button>
				</div>
				<div class="edit" v-else>
					<textarea type="text" ref="descriptionTextarea" @input="adjustTextareaHeight"
						v-model="editedUser.description" />
					<button @click="saveDescription" class="save-btn">저장</button>
				</div>
			</div>
		</div>
		<div class="info-wrapper">
			<div>
				<div class="wrapper">
					<div class="title-wrapper">
						<h3>이메일 주소</h3>
					</div>
					<div class="content-wrapper">
						<p class="user-email">{{ user.email }}</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed, watch, nextTick, ref, reactive, onMounted, ComputedRef } from 'vue';
import { useStore } from 'vuex';
import { updateUserProfileImage } from '@/services/api/users';
import { User } from '@/types/interfaces';

const store = useStore();

const user: ComputedRef<User> = computed(() => store.getters['users/getUser']);
const prevProfileImage = ref<string>('');
const currentProfileImage = ref<string>('');
const fileInput = ref<HTMLInputElement | null>(null);
const descriptionTextarea = ref<HTMLTextAreaElement | null>(null);
const maxFileSize = 1024 * 1024;

const editMode = reactive({
	nickname: false,
	description: false
})

const editedUser = reactive({
	nickname: '',
	description: ''
});

onMounted(() => {
	prevProfileImage.value = user.value.profileImage;
	currentProfileImage.value = user.value.profileImage;
})

watch(
	() => editMode.description,
	(newValue) => {
		if (newValue) {
			nextTick(adjustTextareaHeight);
		}
	}
);


const handleFileChange = async (event) => {
	const file = event.target.files[0];
	if (file) {
		// Check file size
		if (file.size <= maxFileSize) {
			const formData = new FormData();
			formData.append('image', file);
			const response = await updateUserProfileImage(formData);
			const { data, config } = response;
			const fileName = data.filename;
			const baseURL = config.baseURL;
			currentProfileImage.value = `${baseURL}/static/temp/${fileName}`;
		} else {
			alert('파일 용량이 너무 큽니다.');
			event.target.value = '';
		}
	}
};

const updateImage = async () => {
	if (prevProfileImage.value != currentProfileImage.value) {
		// actions
		await store.dispatch('users/updateUser', { profileImage: currentProfileImage })
		prevProfileImage.value = user.value.profileImage;
		currentProfileImage.value = user.value.profileImage;
	}
};

const resetProfileImage = () => {
	fileInput.value = null;
	currentProfileImage.value = prevProfileImage.value;
};

const editNickname = () => {
	editMode.nickname = true;
	editedUser.nickname = user.value.nickname;
};

const editDescription = () => {
	editMode.description = true;
	editedUser.description = user.value.description as string;
};

const saveNickname = async () => {
	if (editedUser.nickname.trim() != user.value.nickname.trim()) {
		try {
			await store.dispatch('users/updateUser', {
				nickname: editedUser.nickname.trim()
			})
		} catch (e) {
			console.log(e);
		}
	}
	editMode.nickname = false;
};

const saveDescription = async () => {
	if (editedUser.description.trim() != user.value.nickname.trim()) {
		try {
			await store.dispatch('users/updateUser', {
				description: editedUser.description.trim(),
			})
		} catch (e) {
			console.log(e);
		}
	}
	editMode.description = false;
};


const adjustTextareaHeight = () => {
	descriptionTextarea.value!.style.height = 'auto'; // 초기 높이로 설정
	descriptionTextarea.value!.style.height = `${descriptionTextarea.value!.scrollHeight}px`; // 실제 높이로 조절
};
</script>

<style src="@/styles/users/profile.css" scoped></style>
