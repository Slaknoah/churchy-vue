<template>
  <li class="page-item" :class="{'active' : isCurrentPage}">
    <a class="page-link" @click="onClick">
      {{ pageNumber }}
      <span v-if="isCurrentPage" class="sr-only">(current)</span>
    </a>
  </li>
</template>

<script>
export default {
  name: "BasePaginationTrigger",
  props: {
    pageNumber: {
      type: [String, Number],
      required: true
    },
    isCurrentPage: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  methods: {
    onClick() {
      this.$emit("loadPage", this.pageNumber);
    }
  }
};
</script>