<template>
    <div>
      Blog ID: {{ $route.params.id  }}
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  
  const blogID = ref(null);
  const router = useRouter();
  
  onMounted(() => {
    blogID.value = router.params.id;
  });
  </script>
  
  <style>
  /* Add your styles here */
  </style>
  