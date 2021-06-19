<template>
  <div>
    <ul class="cards" id="1">
      <li v-for="dog of dogs">
        <Card :src="dog.src" :breed="dog.breed"></Card>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    id: Number,
    dogs: Array,
  },
};
</script>
