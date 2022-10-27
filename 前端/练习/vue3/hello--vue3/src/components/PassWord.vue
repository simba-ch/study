<template>
  <div>
    <input v-model="password">
    <div v-if="error">{{ error }}</div>
  </div>
</template>

<script>
export default {
  name: '',
  components: {

  },
  props: {
    minLength: {
      type: Number
    }
  },
  data() {
    return {
      password: ''
    };
  },
  computed: {
    error() {
      if (this.password.length < this.minLength) {
        return `Password must be at least ${this.minLength} characters.`
      }
      return
    }
  },
  watch: {

  },
  created() {

  },
  mounted() {

  },
  methods: {

  },
};
</script>

<style scoped lang="scss">
</style>
