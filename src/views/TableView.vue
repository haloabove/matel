<template>
  <div class="home">
    <ListItemsInTable />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ListItemsInTable from '@/components/ListItemsInTable.vue'; // @ is an alias to /src

@Component({
  components: {
    ListItemsInTable,
  },
})
export default class TableView extends Vue {}
</script>
