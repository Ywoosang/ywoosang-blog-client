<template>
    <div class="reply">
        <div class="header">
            <div class="info">{{ reply.user.nickname }}</div>  
            <div class="btn-wrapper" v-if="isAuthorized">
                <button v-if="!editMode" class="btn-top update-btn" @click="startEdit">수정</button>
                <button class="btn-top delete-btn" @click="deleteReply({ reply })">삭제</button>
            </div>
        </div> 
        <div class="date">{{ formatDate(reply.createdAt) }}</div>  
        <reply-write v-if="editMode" :editMode="true" @close="endEdit" :id="reply.id" :isComment="false"/>                    
        <div v-else class="content">
            <router-link :to="'#'">
                <span class="mention">@{{ reply.replyTo.nickname}}</span>
                     {{ reply.content }}
            </router-link>
        </div>
        <div class="tool">
            <button class="create-btn" @click="openForm">답글 달기</button>
        </div>
        <reply-write v-if="replyMode"  @close="closeForm" :parentCommentId="reply.parentCommentId" :replyToId="reply.replyTo.id"/>
    </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';
import { mapGetters, mapActions } from 'vuex';
import { formatDate } from '@/utils'
import ReplyWrite from './ReplyWrite.vue'

export default defineComponent({
    props: ['reply'],
    components: {
        ReplyWrite
    },
    data() {
        return {
            replyMode: false as boolean,
            editMode: false as boolean
        }
    },
    methods: {
        formatDate,
        openForm() {
            this.replyMode = true;
            this.editMode = false;
        },
        startEdit() {
            this.editMode = true;
            this.replyMode = false;
        },
        endEdit() {
            this.editMode = false;
        },
        closeForm() {
            this.replyMode = false;
        },
        ...mapActions('comment', ['deleteReply'])
    },
    computed: {
        ...mapGetters('users', ['getUser']),
        isAuthorized() {
            return this.getUser && (this.reply.user.id === this.getUser.id || this.getUser.role === 'ADMIN');
        }
    }
});
</script>

<style scoped>
.reply {
    padding: 5px 8px;
    margin: 10px 0 0 0;
    border-left: 3px solid #ddd;
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
}
.header {
    display:flex;
    justify-content: space-between;    
}
.btn-top {
    background: none;
}
.content {
    font-size: 16px;
    padding: 5px 0 10px 0;
}
.create-btn {
    color: #000000;
    font-weight: 500;
    cursor: pointer;
    background: none;
}
.mention {
    background: #000000;
    color: white;
    font-weight: bold;
    padding: 3px 5px 5px 3px;
    line-height: 25px;
    border-radius: 5px;
    font-size: 12px;
    vertical-align: center;
}
.date {
    font-size: 12px;
    color: rgb(99, 99, 99);
}
.info {
    font-size: 17px;
    font-weight: bold;
}
</style>