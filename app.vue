<template>
  <NuxtLayout>
    <!-- slot 자리에 페이지가 삽입된다. -->
    <NuxtPage :page-key="(route) => route.fullPath" />
  </NuxtLayout>
</template>
