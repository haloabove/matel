<template>
    <b-col lg="6">
        <span><b>{{ text }}</b></span>
        <ul class="text-left">
            <li  v-for="(listItem, index) in this.model" :key="index">{{ listItem.item }} <b v-if="listItem.count">count: {{ listItem.count }}</b></li>
        </ul>
    </b-col>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component({
})
export default class ListItemsInTable extends Vue {
    @Prop() model!: [{ item: string, count: number}];
    @Prop() text!: string;
    @Prop() type!: string;
}
</script>