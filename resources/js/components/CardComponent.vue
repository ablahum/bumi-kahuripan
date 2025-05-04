<template>
  <div
    class="rounded-lg p-4 shadow-lg grid grid-cols-1 grid-rows-[auto_auto] outline"
    :class="cardClass"
  >
    <div class="text-2xl font-bold text-indigo-500 text-center">
      {{ total }}
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
    total: {
      type: [String, Number],
      required: true
    },
    description: {
      type: [String],
      required: true
    },
    cardClass: {
      type: [String]
    }
  }
}
</script>