<template>
  <button :class="['btn', btnClass]">
    <slot>Button</slot>
  </button>
</template>

<script>
import { StringDecoder } from "string_decoder";
export default {
  name: "BaseButton",
  props: {
    btnClass: {
      type: String,
      required: false
    }
  }
};
</script>

<style>
</style>
