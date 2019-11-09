<template>
  <div>  
    <form>
      <div class="form-group">
        <BaseInput label="Title" v-model="message.title" />
      </div>
      <div class="form-group input-group">
        <BaseUpload label="Upload cover image" :maxFileSize="1" :allowedExt="allowedExtensions" @files-uploaded="handleAfterUpload" v-model="message.cover_image"/>
      </div>
      <div class="form-group">
        <label for="content">Content</label>
        <ckeditor :editor="editor" v-model="message.description" :config="editorConfig"></ckeditor>
      </div>
      <div class="form-group input-group">
        <BaseUpload label="Upload videos and/or audios" :maxFileSize="200" :isMultiple="true" :allowedExt="allowedMediaExtensions" @files-uploaded="handleAfterUpload" v-model="message.media"/>
      </div>
      <div class="form-group">
        <BaseSelect label="Speaker" :options="selectSpeakers" v-model="message.speaker_id" />
      </div>
      <div class="form-group">
        <BaseSelect label="Series" :options="selectSeries" v-model="message.series_id" />
      </div>
      <div class="form-group">
        <BaseSelect label="Author" :options="selectAuthors" v-model="message.author_id" />
      </div>

      <div ref="errors_cont" v-if="errors.length" class="error-log alert alert-danger alert-dismissible">
        <div>Please check the following errors:</div>
        <ul>
            <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
        </ul>
      </div>
      <BaseButton btnClass="btn-primary" @click.native="handleSubmit">Create</BaseButton>
    </form>

  </div>
</template>

<script>
import messageMixin from "../mixins/Message";
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
export default {
  name: "MessageForm",
  data() {
    return {
      errors: [],
      editor: ClassicEditor,
      editorData: '<p>Content of the editor.</p>',
      editorConfig: {
          // The configuration of the editor.
      },
      allowedExtensions: ['png', 'jpg', 'jpeg', 'gif', 'webp'],
      allowedMediaExtensions: ['mp4','m4p', 'mov', 'mpeg', 'avi', 'mp3', 'avi', 'wav', 'mpga'],
    };
  },
  methods: {
    handleAfterUpload(res) {
      // console.log(res);
    },
    checkForm() {
      this.errors = [];

      if(this.message.title && this.message.series_id && this.message.media.length) 
        return true;

      if(!this.message.title)
        this.errors.push('Title required.');

      if(!this.message.series_id)
        this.errors.push('Message series required.');
      
      if(!this.message.media.length)
        this.errors.push('Media required.');
      
      return false;
    },
    handleSubmit(e) {
      e.preventDefault();
      if(this.checkForm()) {
        let formData = new FormData();

        formData.append('title', this.message.title);
        formData.append('series_id', this.message.series_id);
        formData.append('speaker_id', this.message.speaker_id);
        formData.append('author_id', this.message.author_id);
        formData.append('description', this.message.description);
        formData.append('cover_image', this.message.cover_image[0]);

        for( var i = 0; i < this.message.media.length; i++ ){
          let file = this.message.media[i];

          formData.append('media[' + i + ']', file);
        }
        this.$emit('form-submitted', formData);
      }
    }
  },
  props: {
    message: {
      type: Object,
      required: false,
      default: () => {
        return {
          title: "",
          description: "",
          speaker_id: null,
          author_id: null,
          series_id: null,
          cover_image: [],
          media: [],
        };
      }
    }
  },
  mixins: [messageMixin]
};
</script>
