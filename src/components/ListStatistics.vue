<template>
    <b-row class="justify-content-md-center">
        <b-col lg="6" class="text-left">
            <h3>{{ text }}</h3>
            <ul>
                <li v-for="(listItem, index) in this.model" :key="index">{{ listItem.item }} <b
                        v-if="listItem.count">count: {{ listItem.count }}</b></li>
            </ul>
        </b-col>
    </b-row>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component({
})
export default class ListStatistics extends Vue {
    @Prop() model!: [{ item: string, count: number }];
    @Prop() text!: string;
    @Prop() type!: string;
}
</script>