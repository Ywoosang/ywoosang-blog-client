<template>
		<div class="modal-wrapper">
			<div class="body">
				<p class="content">{{ modal.content }}</p>
				<div class="progress">
					<div class="bar" :style="{ width: progressBarWidth }"></div>
				</div>
			</div>
			<span class="close" @click="closeModal">&times;</span>
		</div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue';
import { useStore } from 'vuex';
import { ErrorContent } from '@/types/interfaces'
const store = useStore();
	
const props = defineProps<{
	modal: ErrorContent;
}>();
	
const modal = props.modal;

const progressRef = ref(100);
const progressBarWidth = computed(() => `${progressRef.value}%`);
	
onMounted(() => {
    const interval = setInterval(() => {
        progressRef.value -= 1;
        if (progressRef.value <= 0) {
            clearInterval(interval);
            store.commit('error/REMOVE_MODAL',modal.key);
        }
    }, 20); // 매 20ms 마다
});

const closeModal = () => {
    store.commit('error/REMOVE_MODAL', modal.key);
}

</script>

<style scoped>
.modal-wrapper {
	background-color: #000000;
    position: relative;
    padding: 0.5rem;
	margin-bottom: 0.5rem;
}

.header {
    color: #ffffff;
}

.body {
    display: flex;
    color: #ffffff;
    flex-direction: column;
}

.body .content {
    font-size: 1.2rem;
    margin: 0.7rem 0;
}

.body .progress {
    justify-content: flex-start;
    height: 3px;
}

.body .progress .bar {
    height: 100%;
    background-color: rgb(255, 255, 255);
}

.close {
    position: absolute;
    top: 0;
    right: 0;
    color: white;
    font-size: 1.2rem;
    width: 1.7rem;
    height: 1.7rem;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
}

</style>