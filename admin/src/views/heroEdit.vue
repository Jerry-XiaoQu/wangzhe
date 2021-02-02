<template>
    <div >
        <h1>{{id?'编辑英雄':'新建英雄'}}</h1>
        <el-form @submit.native.prevent="save" label-width="120px">
            <el-tabs value="skills" type="border-card">
                <el-tab-pane label="基本信息" name="basic">
                    <el-form-item label="名称" >
                <el-input v-model="model.name"></el-input>
                    </el-form-item>
                    <el-form-item label="称号" >
                        <el-input v-model="model.title"></el-input>
                    </el-form-item>
                    <el-form-item label="类型">
                        <el-select v-model='model.categories' multiple>
                            <el-option v-for="item of categories"
                            :label="item.name"
                            :value="item._id"
                            :key="item._id"> </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="难度" >
                        <el-rate :max="9" show-score style="margin-top: 0.6rem" v-model="model.scores.difficult"></el-rate>
                    </el-form-item>
                    <el-form-item label="技能" >
                        <el-rate :max="9" show-score style="margin-top: 0.6rem" v-model="model.scores.skills"></el-rate>
                    </el-form-item>
                    <el-form-item label="攻击" >
                        <el-rate :max="9" show-score style="margin-top: 0.6rem" v-model="model.scores.attack"></el-rate>
                    </el-form-item>
                    <el-form-item label="生存" >
                        <el-rate :max="9" show-score style="margin-top: 0.6rem" v-model="model.scores.survive"></el-rate>
                    </el-form-item>
                    <el-form-item label="头像" label-width="120px">
                        <el-upload
                            class="avatar-uploader"
                            :action="$http.defaults.baseURL + '/upload'"
                            :show-file-list="false"
                            :on-success="afterUpload">
                            <img v-if="model.avater" :src="model.avater" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="顺风出装">
                        <el-select v-model='model.items1' multiple>
                            <el-option v-for="item of items"
                            :label="item.name"
                            :value="item._id"
                            :key="item._id"> </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="逆风出装">
                        <el-select v-model='model.items2' multiple>
                            <el-option v-for="item of items"
                            :label="item.name"
                            :value="item._id"
                            :key="item._id"> </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="使用技巧">
                        <el-input type="textarea" v-model="model.usageTips"></el-input>
                    </el-form-item>
                    <el-form-item label="对抗技巧">
                        <el-input type="textarea" v-model="model.battleTips"></el-input>
                    </el-form-item>
                    <el-form-item label="团战思路">
                        <el-input type="textarea" v-model="model.teamTips"></el-input>
                    </el-form-item>
                    <el-form-item label="类型">
                        <el-select v-model='model.categories' multiple>
                            <el-option v-for="item of categories"
                            :label="item.name"
                            :value="item._id"
                            :key="item._id"> </el-option>
                        </el-select>
                    </el-form-item>
                </el-tab-pane>
                <el-tab-pane label="技能" name="skills">
                    <el-button size="small" @click="model.skills.push({})">
                      <i class="el-icon-plus"></i>  添加技能
                    </el-button>
                    <el-row type="flex" style="flex-wrap: wrap">
                        <el-col :md="12" v-for="(item,index) in model.skills" :key="index">
                            <el-form-item label="名称">
                                <el-input v-model="item.name"></el-input>
                            </el-form-item>
                            <el-form-item label="图标">
                                <el-upload
                                    class="avatar-uploader"
                                    :action="$http.defaults.baseURL + '/upload'"
                                    :show-file-list="false"
                                    :on-success="res => $set(item,'icon',res.url)">
                                    <img v-if="item.icon" :src="item.icon" class="avatar">
                                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                </el-upload>
                            </el-form-item>
                            <el-form-item label="描述">
                                <el-input v-model="item.description" type="textarea"></el-input>
                            </el-form-item>
                            <el-form-item label="小提示">
                                <el-input v-model="item.tips" type="textarea"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button size="small" type="danger" 
                                @click="model.skills.splice(index,1)">删除</el-button>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-tab-pane>
            </el-tabs>
            <el-form-item style="margin-top:1rem">
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
                model: {
                    name: '',
                    avater: '',
                    title: '',
                    categories: '',
                    usageTips: '',
                    scores: {
                        difficult: 0
                    },
                    skills: []
                },
                categories: '',
                items: []
            }
        },
        created() {
            this.fetchCategories()
            this.id && this.fetch()
            this.fetchItems()
        },
        methods: {
            async fetch() {
                const res = await this.$http.get(`rest/heros/${this.id}`)
                this.model = Object.assign({},this.model, res.data)
            },
            afterUpload(res) {
                console.log(res.url)
                this.model.avater = res.url
            },
            async fetchItems() {
                const res = await this.$http.get(`rest/items`)
                this.items = res.data
            },
            async fetchCategories() {
                const res = await this.$http.get(`rest/categories`)
                this.categories = res.data
            },
            async save() {
                console.log(this.model)
                if(this.id) {
                   await this.$http.put(`rest/heros/${this.id}`,this.model)
                } else {
                    await this.$http.post('rest/heros',this.model)
                }
                this.$router.push('/heros/list')
                this.$message({
                    type: 'success',
                    message: '保存成功'
                })
            }
        }
    }
</script>
 
<style>

</style>
