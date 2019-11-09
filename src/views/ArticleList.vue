<template>
  <div>
    <BasePageHeader title="Articles" description="Articles from our leaders!" />
    <div class="container">
      <div class="py-3">
        <h3>Filter:</h3>
        <div class="form-group row">
          <div class="col-sm-6 mb-2">
            <label for="input-series">Series</label>
            <select class="form-control" v-model="filters.series" id="input-series">
              <option value="0">All</option>
              <option :value="serie.id" v-for="(serie, index) in series" :key="index">{{serie.name}}</option>
            </select>
          </div>
          <div class="col-sm-6 mb-2">
            <label for="input-series">Author</label>
            <select class="form-control" v-model="filters.author" id="input-author">
              <option value="0">All</option>
              <option
                :value="author.id"
                v-for="(author, index) in authors"
                :key="index"
              >{{author.name}}</option>
            </select>
          </div>
        </div>
        <div class="form-group row">
          <div class="col-sm-6 mb-2">
            <label for="input-limit">Limit</label>
            <input type="number" class="form-control" v-model="filters.limit" id="input-limit" />
          </div>
          <div class="col-sm-6">
            <label for="input-offset">Offset</label>
            <input type="number" class="form-control" v-model="filters.offset" id="input-offset" />
          </div>
        </div>
        <div class="form-check mb-2">
          <input
            class="form-check-input"
            type="checkbox"
            v-model="filters.hasMedia"
            id="input-has-media"
          />
          <label class="form-check-label" for="input-has-media">Has Media</label>
        </div>
        <BaseButton btnClass="btn-primary" @click.native="fetchMessages">Get messages</BaseButton>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ArticleList",
  data() {
    return {
      filters: {}
    };
  }
};
</script>

<style>
</style>
