<template>
  <div class="card">
    <img :src="src" />
    <div class="thumbnail">
      <h3>#{{ breed }}</h3>
    </div>
  </div>
</template>

<script>
export default {
  props: { src: String, breed: String },
};
</script>
