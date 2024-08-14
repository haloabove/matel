<template>
  <b-container class="bv-example-row">
    <b-row>
      <b-col>
        <div>
          Sorting By: <b>{{ sortBy }}</b>, Sort Direction:
          <b>{{ sortDesc ? 'Descending' : 'Ascending' }}</b>
        </div>
        <b-table 
          striped
          hover
          :items="listItems"
          :fields="fields"
          :sort-by.sync="sortBy"
          :sort-desc.sync="sortDesc"
          stacked="sm"
          responsive
          ></b-table>
      </b-col>
    </b-row>
  </b-container>
</template> 

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Getter } from 'vuex-class';
import { LogData } from '@/models/index';

@Component({
})
export default class ListItemsInTable extends Vue {
  @Getter('listItems') private listItems!: LogData[];
    
  public sortBy = 'ipAddress';
  public sortDesc = false;
  public fields = [
    { key: 'ipAddress', sortable: true },
    { key: 'timestamp', sortable: true },
    { key: 'method', sortable: true },
    { key: 'request', sortable: false },
    { key: 'statusCode', sortable: false },
    { key: 'userAgent', sortable: false },
  ];
}
</script>

<style scoped lang="scss">

</style>
