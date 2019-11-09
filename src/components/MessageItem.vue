<template>
  <div class="col-md-4">
    <div class="card mb-4 shadow-sm">
      <img v-if="message.cover_image" :src="message.cover_image" class="card-img-top" alt />
      <div class="card-body">
        <h5 class="card-title">{{message.title}}</h5>
        <p
          class="card-text"
          v-if="message.description"
        >{{message.description.substring(0, 200) + ' ...'}}</p>
        <div class="d-flex justify-content-between align-items-center">
          <div class="btn-group">
            <button type="button" class="btn btn-sm btn-outline-secondary">View</button>
            <button type="button" class="btn btn-sm btn-outline-secondary">Edit</button>
          </div>
          <small class="text-muted">9 mins</small>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MessageItem",
  props: {
    message: {
      type: Object,
      required: true
    }
  }
};
</script>

<style>
</style>
