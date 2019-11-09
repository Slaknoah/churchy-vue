<template>
  <section
    class="jumbotron text-center"
    :style="[ backgroundImage ? {'background-image': `url(${require('@/assets/img/background-home.jpg')})`} : {}]"
  >
    <div class="container">
      <h1 class="jumbotron-heading">{{ title }}</h1>
      <p class="lead text-muted" v-if="description">{{ description }}</p>
      <p v-if="buttonText">
        <BaseButton btnClass="btn-primary my-2" @click.native="buttonClickAction">{{ buttonText }}</BaseButton>
      </p>
      <slot></slot>
    </div>
  </section>
</template>

<script>
export default {
  name: "BasePageHeader",
  props: {
    title: {
      type: String,
      required: true
    },
    description: String,
    backgroundImage: Boolean,
    buttonText: String,
    buttonClickAction: Function
  }
};
</script>

<style>
</style>
