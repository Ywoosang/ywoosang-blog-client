<template>
    <div class="comment">
        <div class="header">
            <router-link to="/user">{{ comment.user.nickname }}</router-link>
            <div class="info" v-if="isAuthorized">
                <button v-if="!editMode"  class="btn-top update-btn" @click="startEdit">수정</button>
                <button class="btn-top delete-btn" @click="deleteComment({ comment })">삭제</button>
            </div>       
        </div>                
        <div class="date">{{ formatDate(comment.createdAt) }}</div> 
        <reply-write v-if="editMode" :editMode="true" @close="endEdit" :id="comment.id"/>                     
        <div v-else class="content">{{ comment.content }} </div>
        <div class="tool" @click="toggleOpen">
        <button class="create-btn" @click="openForm">답글 달기</button>
        </div>
        <reply-write v-if="isOpen" @close="closeForm" :parentCommentId="comment.id" :replyToId="comment.user.id"/>
    </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';
import { mapGetters, mapActions } from 'vuex';
import ReplyWrite from './ReplyWrite.vue';
import { formatDate } from '@/utils';

export default defineComponent({
    props: ['comment'],
    components: {
        ReplyWrite,
    },
    data() {
        return {
            isOpen: false as boolean,
            editMode: false as boolean
        }
    },
    methods: {
        ...mapActions('comment', ['deleteComment']),
        formatDate,
        openForm() { this.isOpen = true },
        closeForm() { this.isOpen = false },
        startEdit() {
            this.editMode = true;
        },
        endEdit() {
            this.editMode = false;
        },
    }, 
    computed: {
        ...mapGetters('users', ['getUser']),
        isAuthorized() {
            return this.getUser && (this.comment.user.id === this.getUser.id || this.getUser.role === 'ADMIN');
        }
    }
});
</script>

<style scoped>
.header {
    display:flex;
    justify-content: space-between;    
}
.btn-top {
    background: none;
}
.comment {
    border-top: 1px solid #ddd;
    margin: 10px 0;
    padding: 10px 0px;
}
.create-btn {
    color: black;
    font-weight: 500;
    cursor: pointer;
    background: none;
}
</style>