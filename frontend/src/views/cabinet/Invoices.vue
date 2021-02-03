<template>
  <div class="app-content">
    <div class="app-content__body mw-1200">
      <template v-if="invoices">
        <vue-good-table
          :columns="columns"
          :rows="invoices"
          :search-options="{
            enabled: true
          }"
          @on-row-click="onRowClick"
        />
      </template>
    </div>
    <div class="app-content__button">
      <button
        class="btn btn-primary"
        @click="setModalState(modalAuthOpenParams)"
      >Новый счет</button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { VueGoodTable } from 'vue-good-table';

export default {
  name: 'Invoices',
  components: { VueGoodTable },
  data: () => ({
    columns: [
      {
        label: '№',
        field: 'number',
        width: '90px',
      },
      {
        label: 'Date start',
        field: 'dateStart',
      },
      {
        label: 'Client',
        field: 'client.name',
      },
      {
        label: 'Price',
        field: 'price',
      },
      {
        label: 'Status',
        field: 'status',
      },
    ],
    modalAuthOpenParams: {
      modalComponentName: 'NewInvoiceModal',
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
      invoices: 'invoices/invoices',
    }),
  },
};
</script>
