<template>
    <b-container class="bv-example-row">
        <b-row class="justify-content-md-center">
            <b-col lg="4" md="4">
                <span><b>The number of unique IP addresses is: {{ uniqueIpAddresses.length }}</b></span>
                <ul class="text-left">
                    <li v-for="(ip, index) in this.uniqueIpAddresses" :key="index">{{ ip }}</li>
                </ul>
            </b-col>
        </b-row>
        <b-row class="justify-content-md-center">
            <b-col lg="4" md="4">
                <div><b>The top 3 most visited URLs are:</b></div>
                <ul class="text-left">
                   <li v-for="(url, index) in this.topThreeVisited" :key="index"> URL: {{ url[0] }} count: {{ url[1] }}</li>
                </ul>
            </b-col>
        </b-row>
        <b-row class="justify-content-md-center">
            <b-col lg="4" md="4">
                <div><b>The top 3 most active IP addresses:</b></div>
                <ul class="text-left">
                   <li v-for="(ipAddress, index) in this.topIpAddress" :key="index"> URL: {{ ipAddress[0] }} count: {{ ipAddress[1] }}</li>
                </ul>
            </b-col>
        </b-row>
    </b-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Getter } from 'vuex-class';
import { LogData } from '@/models/index';
import ListItemsInList from '@/components/ListItemsInList.vue';

type LogDataKey = keyof LogData; 

@Component({
    components:{
        ListItemsInList
    }
})
export default class Statistics extends Vue {
    @Getter('listItems') private listItems!: LogData[];


    get uniqueIpAddresses() {
        const seenIps = new Set();

        return this.listItems
            .map(it => it.ipAddress)
            .filter(ip => {
                if (ip && !seenIps.has(ip)) {
                    seenIps.add(ip);

                    return true;
                }
                return false;
            });
    }

    get topThreeVisited() {
        const requestCountMap = new Map();

        this.listItems.forEach(log => {
            const request = log.request;
            requestCountMap.set(request, (requestCountMap.get(request) || 0) + 1);
        });

        const requestArray = Array.from(requestCountMap.entries());

        const top3Requests = requestArray
            .sort((a, b) => b[1] - a[1])
            .slice(0, 3);

        return top3Requests;
    }

    get topUrls(){
        return this.mapTopThreeVisited('request', 3);
    }

    get topIpAddress(){
        return this.mapTopThreeVisited('ipAddress', 3);
    }

    private mapTopThreeVisited(field: string, numberOfResults: number) {
        const requestCountMap = new Map();

        this.listItems.forEach(log => {
            const fieldInLogs = log[field as LogDataKey];
            requestCountMap.set(fieldInLogs, (requestCountMap.get(fieldInLogs) || 0) + 1);
        });

        const requestArray = Array.from(requestCountMap.entries());

        const topResults = requestArray
            .sort((a, b) => b[1] - a[1])
            .slice(0, numberOfResults);

        return topResults;
    }

    created() {
        console.log(this.listItems);
    }
}
</script>

<style scoped lang="scss"></style>