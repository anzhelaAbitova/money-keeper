<template>
  <div class="app-content">
    <div class="app-content__body mw-900">
      <div class="app-content__title">
        <h2>Info about your services</h2>
      </div>
      <template v-if="services">
        <vue-good-table
          :columns="columns"
          :rows="services"
          :search-options="{
            enabled: true
          }"
          @on-row-click="onRowClick"
        />
      </template>
    </div>
    <div class="app-content__button">
      <button class="btn btn-primary" @click="setModalState(modalAuthOpenParams)">Add new</button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import 'vue-good-table/dist/vue-good-table.css';
import { VueGoodTable } from 'vue-good-table';

export default {
  name: 'Services',
  components: { VueGoodTable },
  data: () => ({
    // columns: [
    //   {
    //     label: 'Articul',
    //     field: 'articul',
    //     width: this.columnWidth,
    //   },
    //   {
    //     label: 'Description',
    //     field: 'description',
    //   },
    //   {
    //     label: 'Price',
    //     field: 'price',
    //     width: this.columnWidth,
    //   },
    // ],
    modalAuthOpenParams: {
      modalComponentName: 'NewServicesModal',
      modalState: true,
    },
  }),
  methods: {
    ...mapActions({
      setModalState: 'modal/setModalState',
    }),
    onRowClick(params) {
      console.log(params.row.name);
    },
  },
  computed: {
    ...mapGetters({
      services: 'services/services',
    }),
    columns() {
      // const columnWidth = window.innerWidth > 800 ? '250px' : '120px';
      const res = [
        {
          label: 'Articul',
          field: 'articul',
          width: window.innerWidth > 800 ? '250px' : '120px',
        },
        {
          label: 'Description',
          field: 'description',
        },
        {
          label: 'Price',
          field: 'price',
          width: window.innerWidth > 800 ? '250px' : '120px',
        },
      ];
      // return window.innerWidth > 800 ? '250px' : '120px';
      return res;
    },
  },
};
</script>
