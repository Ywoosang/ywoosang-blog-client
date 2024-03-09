<template>
    <main>
        <div class="logo-wrapper">
			<router-link :to="'/'"> 
            	<b>윤우상</b>블로그
			</router-link>
        </div>
        <div class="content">
            <h1>이런! 일시적인 문제가 발생했어요 :( </h1>
           <p class="text">문제가 지속된다면 아래 메일로 연락해주세요</p>
            <p class="mail">opellong13@gmail.com</p>
        </div>
    </main>
</template>

<style src="@/styles/error.css" scoped></style>