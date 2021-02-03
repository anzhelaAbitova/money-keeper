<template>
  <div class="new-modal">
    <div class="new-modal__content">
      <div class="new-modal__title">
        <h4>New Client</h4>
      </div>
      <div class="new-modal__body">
        <form class="new-modal__form" @submit.prevent>
          <div
            v-for="(item, i) in inputNames"
            class="new-modal__form-row"
            :key="'lksjflkj123d' + i"
          >
            <AppInput :params="item" @changeInput="inputNames[i].value = $event" />
          </div>
          <div class="new-modal__row">
            <div
              class="btn btn-primary"
              :class="{ 'is-disable' : !inputNames.every(el => el.value) }"
              @click="saveClientData(clientData)"
            >Save</div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import { IClientData } from '../../store/modules/clients/types';
import AppInput from '../elements/AppInput.vue';
import { IAppInput } from '../../types';

const Clients = namespace('clients');
const Modal = namespace('modal');

@Component({
  components: {
    AppInput,
  },
})

export default class NewClientModal extends Vue {
  @Clients.Action private setClientsData!: (data: IClientData) => void;

  @Modal.Action private closeModal!: () => void;

  get clientData() {
    return {
      name: this.inputNames[0].value,
      address: this.inputNames[1].value,
      email: this.inputNames[2].value,
      contract: `№${this.inputNames[3].value} от ${this.inputNames[4].value}`,
    };
  }

  private inputNames: Array<IAppInput> = [
    {
      label: 'Client company name',
      type: 'text',
      name: 'client-name',
      value: '',
      placeholder: 'Client company name',
      minLength: 4,
    },
    {
      label: 'Client company address',
      type: 'text',
      name: 'client-address',
      value: '',
      placeholder: 'Zipcode, city, address',
      hasBlurCheck: false,
      minLength: 3,
    },
    {
      label: 'Client company email',
      type: 'email',
      name: 'client-email',
      value: '',
      placeholder: 'example@email.domain',
      hasBlurCheck: false,
      minLength: 5,
    },
    {
      label: 'Contract number',
      type: 'text',
      name: 'client-contract-number',
      value: '1',
      placeholder: '12345',
      hasBlurCheck: false,
      minLength: 3,
    },
    {
      label: 'Contract date',
      type: 'text',
      name: 'client-contract-date',
      value: '',
      placeholder: 'dd.mm.yyyy',
      hasBlurCheck: false,
      minLength: 3,
    },
  ];

  private saveClientData(data: IClientData) {
    this.setClientsData(data);
    this.closeModal();
  }
}
</script>
