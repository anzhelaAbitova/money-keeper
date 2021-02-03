<template>
  <div class="app-content">
    <div class="app-content__body mw-1200">
      <div class="app-content__title">
        <h2>Info about your beneficiaries</h2>
      </div>
      <template v-if="clients">
        <vue-good-table
          :columns="columns"
          :rows="clients"
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
import { VueGoodTable } from 'vue-good-table';

export default {
  name: 'NewClientModal',
  components: { VueGoodTable },
  data: () => ({
    columns: [
      {
        label: 'Company',
        field: 'name',
      },
      {
        label: 'Address',
        field: 'address',
      },
      {
        label: 'Email',
        field: 'email',
      },
      {
        label: 'Contract',
        field: 'contract',
      },
    ],
    modalAuthOpenParams: {
      modalComponentName: 'NewClientModal',
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
      clients: 'clients/clients',
    }),
  },
};
</script>
