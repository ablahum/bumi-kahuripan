<template>
  <div
    class="rounded-lg p-4 shadow-lg grid grid-cols-1 grid-rows-[auto_auto] outline"
    :class="cardClass"
  >
    <div class="flex items-center justify-center gap-2">
      <p v-if="type === 'revenue'" class="capitalize">rp.</p>

      <p class="text-2xl font-bold text-indigo-500 text-center">
        {{ type === 'count' ? count : revenue }}
      </p>
    </div>

    <div class="mt-4 flex flex-col items-center">
      <h3 class="font-semibold uppercase">{{ title }}</h3>

      <p class="text-gray-500">
        {{ description }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardComponent',
  props: {
    title: {
      type: String,
      required: true
    },
    description: {
      type: [String],
      required: true
    },
    type: String,
    count: Number,
    revenue: String,
    cardClass: String
  }
}
</script>