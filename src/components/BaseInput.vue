<template>
  <div>
    <label :for="name">{{ label }}</label>
    <input
      :value="value"
      class="form-control"
      :placeholder="'Enter ' +label"
      :id="name"
      v-bind="$attrs"
      v-on="inputListeners"
    />
  </div>
</template>

<script>
export default {
  name: "BaseInput",
  inheritAttrs: false,
  props: ["label", "value"],
  computed: {
    name() {
      return "input-" + this.label.replace(/\s+/g, "-").toLowerCase();
    },
    inputListeners: function() {
      var vm = this;
      // `Object.assign` merges objects together to form a new object
      return Object.assign(
        {},
        // We add all the listeners from the parent
        this.$listeners,
        // Then we can add custom listeners or override the
        // behavior of some listeners.
        {
          // This ensures that the component works with v-model
          input: function(event) {
            vm.$emit("input", event.target.value);
          }
        }
      );
    }
  }
};
</script>