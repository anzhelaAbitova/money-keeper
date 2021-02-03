<template>
  <div class="new-modal">
    <div class="new-modal__content">
      <div class="new-modal__title">
        <h4>New Invioce</h4>
      </div>
      <div class="new-modal__body">
        <form class="new-modal__form" @submit.prevent>
          <div class="new-modal__row">
            <div class="new-modal__label">Select client:</div>
            <div>
              <dropdown class="my-dropdown-toggle"
                :options="clients"
                :selected="''"
                v-on:updateOption="invoice.client = $event"
                :placeholder="'Select an Item'"
                :closeOnOutsideClick="true">
              </dropdown>
            </div>
          </div>
          <div class="new-modal__row">
            <div class="new-modal__label">Select service:</div>
            <div>
              <dropdown class="my-dropdown-toggle"
                :options="services"
                :selected="''"
                :name="'description'"
                v-on:updateOption="invoice.jobs[0].service = $event"
                :placeholder="'Select service'"
                :closeOnOutsideClick="true">
              </dropdown>
            </div>
            <div>
              <input
                type="number"
                class="new-modal__input-number"
                v-model.number="invoice.jobs[0].count"
                value="1"
              >
            </div>
          </div>
          <div class="new-modal__row">
            <div
              class="btn btn-primary"
              :class="{ 'is-disable' : false }"
              @click="saveInvoiceData"
            >Create</div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Dropdown from 'vue-dropdowns';
import html2pdf from 'html2pdf.js';
import getHTMLSetOfInvoices from '../../functions/getHTMLSetOfInvoices';

export default {
  name: 'NewInvoiceModal',
  components: { Dropdown },
  data: () => ({
    invoice: {
      client: {},
      dateStart: '',
      price: '',
      status: '',
      jobs: [
        { count: 1 },
      ],
    },
  }),
  mounted() {
    for (let i = 0; i < this.services.length; i += 1) {
      this.services[i].name = this.services[i].description;
    }
  },
  methods: {
    ...mapActions({
      closeModal: 'modal/closeModal',
      setInvoicesData: 'invoices/setInvoicesData',

    }),
    saveInvoiceData() {
      const addZero = (data) => `0${data}`.slice(0, 2);
      const date = new Date();
      this.invoice.dateStart = `${addZero(date.getDate())}.${addZero(date.getMonth() + 1)}.${date.getFullYear()}`;
      this.invoice.status = (this.getInvoicesStatuses[0]).toString();
      this.invoice.number = this.invoices.length + 1;
      this.invoice.price = this.allprice;
      this.setInvoicesData(this.invoice)
        .then(() => getHTMLSetOfInvoices(this.invoice))
        .then((html) => {
          html2pdf()
            .set({ html2canvas: { logging: false }, jsPDF: {} })
            .from(html)
            .toPdf()
            .get('pdf')
            .then((pdf) => {
              window.open(pdf.output('bloburl'), '_blank');
            });
        })
        .then(() => {
          this.closeModal();
        });
    },
  },
  computed: {
    ...mapGetters({
      clients: 'clients/clients',
      services: 'services/services',
      getInvoicesStatuses: 'invoices/getInvoicesStatuses',
      invoices: 'invoices/invoices',
    }),
    allprice() {
      return this.invoice.jobs[0].count
        * Number(this.invoice.jobs[0].service.price);
    },
  },
};
</script>
