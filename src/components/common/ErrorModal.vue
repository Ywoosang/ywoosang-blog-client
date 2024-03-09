<template>
    <div class="modal" style="z-index:1001">
	<transition-group name="fade" tag="div" >
        <error-content v-for="modal in modalList" :modal="modal" :key="modal.key"></error-content>
   	</transition-group>
	</div>
</template>
  
<script setup lang="ts">
import ErrorContent from '@/components/common/ErrorContent.vue';
import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const modalList = computed(() => store.getters['error/getModalList']);
</script>
  
 
  
<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
	 
.modal {
	z-index: 1001;
    position: fixed;
    top: 5.7rem;
    right: 1rem;
    width: 20rem;
}

/* 태블릿 */
@media (min-width: 820px) {}

@media (min-width: 1340px) {
 
}
</style>