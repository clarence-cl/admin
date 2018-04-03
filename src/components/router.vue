<template>
  <div class="container">
  </div>
</template>

<script>
export default {
  created() {
    if (this.$route.query.url) {
      this.$router.replace({ path: this.$route.query.url });
    } else {
      this.$router.replace({ path: "/index" });
    }
  },
  data() {
    return {};
  }
};
</script>

<style scoped>

</style>
