<template>
    <b-col lg="4" md="4">
        <span><b>{{ text }} {{ model.length }}</b></span>
        <ul v-if="type!=='array'" class="text-left">
            <li  v-for="(item, index) in this.model" :key="index">{{ item }}</li>
        </ul>
        <ul v-else class="text-left">
            <li  v-for="(item, index) in this.model" :key="index">
                <slot name="count"></slot>
            </li>
        </ul>
    </b-col>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component({
})
export default class ListItemsInTable extends Vue {
    @Prop() model!: [];
    @Prop() text!: string;
    @Prop() type!: string;
}
</script>