<template>
    <div >
        <h1>{{id?'编辑分类':'新建分类'}}</h1>
        <el-form label-width="120px" @submit.native.prevent="save">
            <el-form-item label="用户名">
                <el-input v-model='model.username'></el-input>
            </el-form-item>
            <el-form-item label="密码">
                <el-input type="password" v-model='model.password'></el-input>
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
            this.id && this.fetch()
        },
        methods: {
            async fetch() {
                const res = await this.$http.get(`rest/admin_users/${this.id}`)
                this.model = res.data
            },
            async save() {
                if(this.id) {
                   await this.$http.put(`rest/admin_users/${this.id}`,this.model)
                } else {
                    await this.$http.post('rest/admin_users',this.model)
                }
                this.$router.push('/admin_users/list')
                this.$message({
                    type: 'success',
                    message: '保存成功'
                })
            }
        }
    }
</script>