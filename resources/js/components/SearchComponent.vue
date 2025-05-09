<template>
  <div class="md:w-1/2 w-full flex items-center gap-2">
    <label for="keyword" class="md:inline hidden">
      <span class="capitalize">cari </span>tamu:
    </label>

    <input
      type="text"
      name="keyword"
      v-model="keyword"
      @input="emitFilter"
      placeholder="Masukkan nama atau asal tamu..."
      class="md:w-3/4 w-full p-2 text-black rounded-lg"
    />
  </div>
</template>

<script>
export default {
  name: 'SearchComponent',
  data() {
    return {
      keyword: ''
    }
  },
  methods: {
    emitFilter() {
      this.$emit('filter', {
        keyword: this.keyword
      })
    }
  }
}
</script>

<style scoped>
input::placeholder {
  color: #aaa;
}
</style>
