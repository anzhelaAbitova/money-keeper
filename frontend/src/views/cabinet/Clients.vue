<template>
  <div class="app-content">
    <!-- <div class="app-content__head">

    </div> -->
    <div class="app-content__body">
      <div class="app-content__title">
        <h2>Info about your beneficiaries</h2>
      </div>
      <vue-good-table
        :columns="columns"
        :rows="rows"
        :search-options="{
          enabled: true
        }"
        @on-row-click="onRowClick"
      ></vue-good-table>
    </div>
  </div>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator';
import 'vue-good-table/dist/vue-good-table.css';
import { VueGoodTable } from 'vue-good-table';

@Component({
  components: {
    VueGoodTable,
  },
})

export default class Clients extends Vue {
  columns = [
    {
      label: 'Name',
      field: 'name',
    },
    {
      label: 'Age',
      field: 'age',
      type: 'number',
    },
    {
      label: 'Created On',
      field: 'createdAt',
      type: 'date',
      dateInputFormat: 'dd-MM-yyyy',
      dateOutputFormat: 'MMM do yy',
    },
    {
      label: 'Percent',
      field: 'score',
      type: 'percentage',
    },
  ];

  rows = [
    {
      id: 1,
      name: 'John',
      age: 20,
      createdAt: '20-11-2020',
      score: 0.03343,
    },
    {
      id: 2,
      name: 'Jane',
      age: 24,
      createdAt: '31-10-2011',
      score: 0.03343,
    },
  ];

  onRowClick(params) {
    console.log(params.row);
    console.log(this.rows);
  }
}
</script>
