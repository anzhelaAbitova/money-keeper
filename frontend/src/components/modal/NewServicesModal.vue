<template>
  <div class="new-modal">
    <div class="new-modal__content">
      <div class="new-modal__title">
        <h4>New Service</h4>
      </div>
      <div class="new-modal__body">
        <form class="new-modal__form" @submit.prevent>
          <div
            v-for="(item, i) in inputNames"
            class="new-modal__form-row"
            :key="'lksjflw8903d' + i"
          >
            <AppInput :params="item" @changeInput="inputNames[i].value = $event" />
          </div>
          <div class="new-modal__row">
            <div
              class="btn btn-primary"
              :class="{ 'is-disable' : !inputNames.every(el => el.value) }"
              @click="saveServiceData(clientData)"
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
import { IServiceData } from '../../store/modules/services/types';
import AppInput from '../elements/AppInput.vue';
import { IAppInput } from '../../types';

const Services = namespace('services');
const Modal = namespace('modal');

@Component({
  components: {
    AppInput,
  },
})

export default class NewServicesModal extends Vue {
  @Services.Action private setServicesData!: (data: IServiceData) => void;

  @Modal.Action private closeModal!: () => void;

  get clientData() {
    return {
      articul: this.inputNames[0].value,
      description: this.inputNames[1].value,
      price: this.inputNames[2].value,
    };
  }

  private inputNames: Array<IAppInput> = [
    {
      label: 'Service articul:',
      type: 'text',
      name: 'articul',
      value: '',
      placeholder: '',
      minLength: 0,
    },
    {
      label: 'Service description:',
      type: 'text',
      name: 'serv-desc',
      value: '',
      placeholder: 'Example: web page layout development',
      hasBlurCheck: false,
      minLength: 3,
    },
    {
      label: 'Service price:',
      type: 'text',
      name: 'serv-price',
      value: '',
      hasBlurCheck: false,
      minLength: 1,
    },
  ];

  private saveServiceData(data: IServiceData) {
    this.setServicesData(data);
    this.closeModal();
  }
}
</script>
