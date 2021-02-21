<template>
      <div class="card p-3 mt-3 bg-white">
        <div class="card-header d-flex ai-center"
        :class="{'border-bottom': !plain,'pb-3': !plian}">
            <i class="iconfont  fs-xl" :class="`icon-${icon}`"></i>
            <div class="fs-xl flex-1 px-2">
                <strong>
                    {{title}}
                </strong>
            </div>
            <span v-if="!plain" class="fs-xl" style="fontweight: 900">...</span>
        </div>
        <div class="card-body pt-3">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            required: true
        },
        icon: {
            type: String,
            required: true
        },
        plain: {
            type: Boolean
        }
    }
}

</script>

<style lang="scss">
@import '../assets/scss/_varibles.scss';
    .card{
        border-bottom: 1px solid $border-color;
    }
</style>