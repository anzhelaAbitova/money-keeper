<template>
  <div  class="app-content__page">
    <div class="app-content__col">
      <div class="app-content__title">
        <h4>Tab 3</h4>
      </div>
      <div
        v-for="(item, i) in inputSettings"
        class="app-content__form-row"
        :key="'jashkaj' + i"
      >
        <AppInput :params="item" @changeInput="inputSettings[i].value = $event" />
      </div>
      <div class="app-content__form-row">
        <div
          class="btn btn-primary"
          :class="{ 'is-disabled' : !this.inputSettings[0].value }"
          @click="saveSettingsData"
        >Save</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import ImageCard from './ImageCard.vue';
import AppInput from '../../elements/AppInput.vue';
import { IAppInput } from '../../../types';
import { ICompanySettings } from '../../../store/modules/company/types';

const Company = namespace('company');

@Component({
  components: {
    ImageCard,
    AppInput,
  },
})

export default class Settings extends Vue {
  // eslint-disable-next-line
  @Company.Getter private settingsComapany!: ICompanySettings;

  @Company.Action private setCompanyData!: (data: object) => void;

  private inputSettings: Array<IAppInput> = [
    {
      label: 'Подпись для эл. письма:',
      type: 'text',
      name: 'user-signature',
      value: '',
      placeholder: '',
      minLength: 3,
    },
  ];

  mounted() {
    const timerId = setTimeout(() => {
      this.inputSettings[0].value = this.settingsComapany?.signature;
      clearTimeout(timerId);
    }, 500);
  }

  private saveSettingsData() {
    this.setCompanyData({
      settings: {
        signature: this.inputSettings[0].value,
      },
    });
  }
}
</script>
