<template>
  <div>
    <label :for="name">{{ label }}</label>
    <select class="form-control" :id="name" @change="change">
      <option value="0">{{ notSelectedLabel }}</option>
      <option
        :value="option.value"
        v-for="(option, index) in options"
        :key="index"
        :selected="selectedOption(option)"
      >{{option .label}}</option>
    </select>
  </div>
</template>

<script>
export default {
  name: "BaseSelect",
  data() {
    return {
      selected: null
    };
  },
  props: {
    label: String,
    value: [String, Number],
    notSelectedLabel: {
      type: String,
      default: "Choose"
    },
    options: {
      type: Array
    }
  },
  methods: {
    selectedOption(option) {
      if (this.value) {
        return option.value === this.value;
      }
      return false;
    },
    change(e) {
      this.$emit("input", e.target.value);
    }
  },
  computed: {
    name() {
      return "input-" + this.label.replace(/\s+/g, "-").toLowerCase();
    }
  }
};
</script>