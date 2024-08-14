<template>
    <b-container class="bv-example-row">
        <b-row class="justify-content-md-center text-left">
            <ListItemsInList :text="`The number of unique IP addresses is: ${ uniqueIpAddresses.length }`" :model="uniqueIpAddresses" />
        </b-row>
        <b-row class="justify-content-md-center text-left">
            <ListItemsInList :text="'The top 3 most visited URLs are:'" :model="topUrls" />
        </b-row>
        <b-row class="justify-content-md-center text-left">
            <ListItemsInList :text="'The top 3 most active IP addresses:'" :model="topIpAddress" />
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
    components: {
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
            }).map(it => {
                return {
                    item: it
                }
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

    get topUrls() {
        return this.mapTopThreeVisited('request', 3);
    }

    get topIpAddress() {
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
            .slice(0, numberOfResults).map(it => {
                return {
                    item: it[0],
                    count: it[1]
                }
            });

        return topResults;
    }
}
</script>

<style scoped lang="scss"></style>