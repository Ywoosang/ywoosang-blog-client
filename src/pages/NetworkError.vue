<template>
  <main>
    <div class="logo-wrapper">
      <router-link :to="'/'"> <b>윤우상</b>블로그 </router-link>
    </div>
    <div class="content">
      <h1>이런! 네트워크 연결이 일시적으로 원활하지 않네요 :(</h1>
      <p class="text">잠시 후 다시 시도해 주세요</p>
      <p class="text">문제가 지속된다면 아래 메일로 연락해주세요</p>
      <p class="mail">opellong13@gmail.com</p>
    </div>
  </main>
</template>

<style src="@/styles/error.css" scoped></style>
