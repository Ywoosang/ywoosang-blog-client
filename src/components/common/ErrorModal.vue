<template>
    <div class="modal" style="z-index:1001">
        <div class="modal-wrapper">
            <div class="body">
                <p class="content">{{ modalContent }}</p>
                <div class="progress">
                    <div class="bar" :style="{ width: progressBarWidth }"></div>
                </div>
            </div>
            <span class="close" @click="closeModal">&times;</span>
        </div>
    </div>
</template>
  
<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const modalContent = computed(() => store.getters['error/getModalContent']);
const progressRef = ref(100);
const progressBarWidth = computed(() => `${progressRef.value}%`);

onMounted(() => {
    const interval = setInterval(() => {
        progressRef.value -= 1;
        if (progressRef.value <= 0) {
            clearInterval(interval);
            store.commit('error/SET_IS_MODAL_OPEN', false);
        }
    }, 20); // 매 20ms 마다
});

const closeModal = () => {
    store.commit('error/SET_IS_MODAL_OPEN', false);
}


</script>
  
 
  
<style scoped>
*{
	/* border: 1px solid red;		 */
}
.modal {
	z-index: 1001;
    position: absolute;
    top: 5.7rem;
    right: 1rem;
    background-color: #000000;
    width: 20rem;
}

.modal .modal-wrapper {
    position: relative;
    padding: 0.5rem;
}

.modal .header {
    color: #ffffff;
}

.modal .body {
    display: flex;
    color: #ffffff;
    flex-direction: column;
}

.modal .body .content {
    font-size: 1.2rem;
    margin: 0.7rem 0;
}

.modal .body .progress {
    justify-content: flex-start;
    height: 3px;
}

.modal .body .progress .bar {
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

/* 태블릿 */
@media (min-width: 820px) {}

@media (min-width: 1340px) {
 
}
</style>