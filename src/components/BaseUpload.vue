<template>
    <div class="custom-upload">
        <div class="custom-file">
            <input v-if="isMultiple" type="file" class="custom-file-input" ref="inputCoverImage" @change="change" multiple>
            <input v-else type="file" class="custom-file-input" ref="inputCoverImage" @change="change">
            <label class="custom-file-label" for="inputCoverImage">{{ label }}</label>
        </div>
        <div v-if="previews.length > 0" class="preview-box" :class="{ multiple: isMultiple }">
            <div class="preview" v-for="(obj, index) in previews" :key= "index">
                <div v-if="obj.isImage" class="preview-img" :style="{ backgroundImage: 'url(' + obj.url + ')' }"></div>
                <div v-else class="preview-img" :style="{ backgroundImage: 'url(' + require('@/assets/img/file-icon.png') + ')' }"></div>
                <div class="preview-name">{{ obj.name }}</div>
            </div>
            <!-- <img class="preview-img" v-for="(url, index) in previewUrls" :key= "index" :src="url" alt=""> -->
        </div>
        <div class="error-log alert alert-danger alert-dismissible" v-if="errors.length > 0">
            <div>The following files cant be uploaded:</div>
            <div v-for="(res, index) in errors" :key="index">
                <span>- {{ res.fileName }}</span>
                <ul>
                    <li v-for="(err, index) in res.errors" :key="index">{{ err }}</li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "BaseUpload",
    data() {
        return {
            files: [],
            previews: [],
            errors: [],
            response: [],
        }
    },
    props: {
        label: {
            type: String,
            default: "Upload file"
        },
        maxFileSize: {
            type: Number,
            default: 10 * 1024
        },
        allowedExt: [Array, String],
        isMultiple: {
            type: Boolean,
            default: false
        },
    },
    methods: {
        resetData() {
            this.response = [];
            this.files = [];
            this.previews = [];
            this.errors = [];
        },
        async change() {
            // Reset on each upload if not multiple
            this.resetData();
            
            let i = 0;
            for (const file of this.$refs.inputCoverImage.files) {
                const fileSize = Math.round(file.size / 1024),
                    maxFileSize = this.maxFileSize * 1024,
                    fileExt = file.name.split('.').pop(),
                    fileName = file.name;
                    
                const isInvalidSize = fileSize > maxFileSize,
                    isInvalidExtension = Array.isArray(this.allowedExt) && !this.allowedExt.includes(fileExt);

                this.response[i] = { fileName, isValid: false, errors: [], file: {}, previewUrl: ""}
                if(isInvalidSize || isInvalidExtension) {
                    if (isInvalidSize) 
                        this.response[i].errors.push(`File too big. Max: ${this.maxFileSize}MB`);
                    if (isInvalidExtension)
                        this.response[i].errors.push("Invalid file extension");

                    this.errors.push(this.response[i]);
                } else {
                    try {
                        this.response[i].previewUrl = await this.readFileAsync(file);
                        this.previews.push({url: this.response[i].previewUrl, name: fileName, isImage: this.isFileImage(file)});
                        this.response[i].isValid = true;
                        this.response[i].file = file;
                        this.files.push(file);
                    } catch(err) {
                        this.response[i].errors.push(err);
                    }   
                }
                i++;
            }
            this.$emit('files-uploaded', this.response);
            this.$emit('input', this.files);
        },
        readFileAsync(file) {
            return new Promise( (resolve, reject) => {
                let reader = new FileReader();

                reader.onload = () => {
                    resolve(reader.result);
                }

                reader.onerror = reject;
            
                reader.readAsDataURL(file);
            });
        },
        isFileImage(file) {
            return file && file['type'].split('/')[0] === 'image';
        }
    }
}
</script>

<style>
    .custom-upload {
        width: 100%;
    }
    .preview-box {
        padding: 10px;
        background-color: #e9ecef;
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        margin: 20px 0;
    } 

    .preview-box.multiple {
        justify-content: space-between;
    }

    .preview { width: 150px}

    .preview-img {
        width: 100%;
        height: 150px;
        background-size: cover;
        margin-bottom: 10px;
    }

    .preview-name { text-align: center; overflow-wrap: break-word; }

    .preview-box.multiple .preview {
        margin-bottom: 20px;
    }

    .error-log {
        margin-top: 10px;
        /* color: #a94442;
        background-color: #f2dede;
        border-color: #ebccd1; */
    }
</style>