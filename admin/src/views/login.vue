<template>
    <div class="container">
        <el-card header="请先登陆" class="card">
            <el-form @submit.native.prevent="login">
                <el-form-item label='用户名'>
                    <el-input v-model="model.username"></el-input>
                </el-form-item>
                <el-form-item label='密码'>
                    <el-input type="password" v-model="model.password"></el-input>
                </el-form-item>
                <el-form-item >
                    <el-button type="primary" native-type="submit">登陆</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script>
export default {
    data() {
        return{
            model: {}
        }
    },
    methods: {
        async login() {
            const res = await this.$http.post('login',this.model)
            localStorage.token = res.data.token
            this.$router.push('/')
            this.$message({
                type: 'success',
                message: '登陆成功'
            })
        }
    }
}
</script>

<style>
.card{
    width: 25rem;
    margin: 20rem auto;
}
</style>