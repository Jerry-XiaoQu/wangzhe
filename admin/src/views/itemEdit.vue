<template>
    <div >
        <h1>{{id?'编辑物品':'新建物品'}}</h1>
        <el-form @submit.native.prevent="save" label-width="120px">
            <el-form-item label="名称" >
                <el-input v-model="model.name"></el-input>
            </el-form-item>
            <el-form-item label="图标" label-width="120px">
                <el-upload  
                    class="avatar-uploader"
                    :action="uploadUrl"
                    :show-file-list="false"
                    :headers="getAuthHeaders()"
                    :on-success="afterUpload">
                    <img v-if="model.icon" :src="model.icon" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>
            <el-form-item>
                <el-button @click="save" type="primary">保存</el-button>
            </el-form-item>
        </el-form>
    </div>

</template>

<script>
    export default {
        props:{
            id: {}
        },
        data() {
            return{
                model: {}
            }
        },
        created() {
            console.log(this)
            this.id && this.fetch()
            console.log(this.getAuthHeaders())
        },
        methods: {
            async fetch() {
                const res = await this.$http.get(`rest/items/${this.id}`)
                this.model = res.data
            },
            afterUpload(res) {
                console.log()
                this.$set(this.model,'icon',res.url)
            },
            async save() {
                if(this.id) {
                   await this.$http.put(`rest/items/${this.id}`,this.model)
                } else {
                    await this.$http.post('rest/items',this.model)
                }
                this.$router.push('/items/list')
                this.$message({
                    type: 'success',
                    message: '保存成功'
                })
            }
        }
    }
</script>
 
<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
