<template>
  <div>
    <el-upload
      action="#"
      list-type="picture-card"
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      :http-request="onRequest"
      :on-change="onChange"
      :on-remove="onRemove"
      :on-preview="onPreview"
      :limit="1"
      :class="{ hide: filList.length ? 'hide' : '' }"
      class="custom-upload"
      :file-list="filList"
      :before-upload="beforeUpload"
    >
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible" width="30%">
      <img :src="imgUrl" alt="" />
    </el-dialog>
  </div>
</template>

<script>
// id:AKIDd2C5j7E3buwhAOL1QZS4PTBfsnTszpPj
// key:4rOghRu7cttfAOL0PXOyILAl6AxUlmWz
import COS from 'cos-js-sdk-v5'
var cos = new COS({
  SecretId: 'AKIDd2C5j7E3buwhAOL1QZS4PTBfsnTszpPj',
  SecretKey: '4rOghRu7cttfAOL0PXOyILAl6AxUlmWz',
})
// console.log(cos);
export default {
  name: 'UploadImg',
  data() {
    return {
      filList: [],
      dialogVisible: false,
      imgUrl: '',
      loading: false,
    }
  },

  created() {},

  methods: {
    onRequest({ file }) {
      //   console.log(file)
      this.loading = true
      cos.putObject(
        {
          Bucket: 'ggt-1313341641' /*桶名 必须 */,
          Region: 'ap-shanghai' /* 存储桶所在地域，必须字段 */,
          Key: file.name /*图片名称 必须 */,
          StorageClass: 'STANDARD',
          Body: file, // 上传文件对象
          onProgress: function (progressData) {
            console.log(JSON.stringify(progressData))
          },
        },
        (err, data) => {
          //   console.log(err || data)
          if (err || data.statusCode !== 200) {
            return this.$message.error('上传失败')
          }
          this.$emit('onSuccess', { url: 'https://' + data.Location })
        },
      )
      this.loading = false
    },
    onChange(file, fileList) {
      this.filList = fileList
    },
    onRemove(file, fileList) {
      this.filList = fileList
    },
    onPreview(file) {
      //   console.log(file)
      this.dialogVisible = true
      this.imgUrl = file.url
    },
    beforeUpload(file) {
      //   console.log(file)
      const types = ['image/jpeg', 'image/gif']
      if (!types.includes(file.type)) {
        this.$message.error('请选择' + types.join('、') + '图片')
        return false
      }
      const maxSize = 2 * 1024 * 1024
      if (file.size > maxSize) {
        this.$message.error('上传图片大于2Mb')
        return false
      }
    },
  },
}
</script>

<style scoped lang="scss">
::v-deep .hide .el-upload--picture-card {
  display: none;
}
.custom-upload {
  width: 148px;
  height: 148px;
  overflow: hidden;
}
</style>
