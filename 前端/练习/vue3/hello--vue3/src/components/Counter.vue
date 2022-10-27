<template>
  <button @click="handleClick">Increment</button>
</template>

<script>
export default {
  name: '',
  components: {

  },
  props: {

  },
  data() {
    return {
      count: 0
    };
  },
  computed: {

  },
  watch: {

  },
  created() {

  },
  mounted() {

  },
  methods: {
    handleClick() {
      this.count += 1
      this.$emit('increment', {
        count: this.count,
        isEvent: this.count % 2 === 0
      })
    }
  },
};
</script>

<style scoped lang="scss">
</style>
