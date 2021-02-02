<template>
  <div  class="app-content__page">
    <div class="app-content__col">
      <!-- <div class="app-content__title">
        <h4>Добавить (изменить) юридическое лицо</h4>
      </div> -->
      <div class="app-content__form-row">
        <AppInput :params="companyName" @changeInput="companyName.value = $event" />
      </div>
      <div class="app-content__form-row app-content__form-row--bordered" :key="currentBussines">
        <AppRadiobox
          :params="bussinesses"
          @changeRadiobox="bussinesses.current = $event; currentBussines = $event"
        />
      </div>
      <div class="app-content__form-row app-content__form-row--top_bordered">
        <h4>Реквизиты компании</h4>
      </div>
      <div
        v-for="(item, i) in inputRekvizites"
        class="app-content__form-row"
        :key="'lskefdl' + i"
      >
        <AppInput :params="item" @changeInput="inputRekvizites[i].value = $event" />
      </div>
      <div class="app-content__form-row app-content__form-row--top_bordered">
        <h4>Адрес</h4>
      </div>
      <div
        v-for="(item, i) in inputAddress"
        class="app-content__form-row"
        :key="'jashkaj' + i"
      >
        <AppInput :params="item" @changeInput="inputAddress[i].value = $event" />
      </div>
      <div class="app-content__form-row app-content__form-row--top_bordered">
        <h4>Реквизиты банка</h4>
      </div>
      <div
        v-for="(item, i) in inputBank"
        class="app-content__form-row"
        :key="'askldfklj' + i"
      >
        <AppInput :params="item" @changeInput="inputBank[i].value = $event" />
      </div>
      <template v-if="currentBussines === 1">
        <div class="app-content__form-row app-content__form-row--top_bordered">
          <h4>Должностные лица</h4>
        </div>
        <div
          v-for="(item, i) in inputMenegment"
          class="app-content__form-row"
          :key="'assdfasklasn' + i"
        >
          <AppInput :params="item" @changeInput="inputMenegment[i].value = $event" />
        </div>
      </template>
      <div class="app-content__form-row">
        <div
          class="btn btn-primary"
          @click="saveCompanyData"
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
import AppCheckbox from '../../elements/AppCheckbox.vue';
import AppRadiobox from '../../elements/AppRadiobox.vue';
import { IAppInput, IAppRadiobox } from '../../../types';
import { ICompanyData } from '../../../store/modules/company/types';

const User = namespace('user');
const Company = namespace('company');

@Component({
  components: {
    ImageCard,
    AppInput,
    AppCheckbox,
    AppRadiobox,
  },
})

export default class Settings extends Vue {
  // eslint-disable-next-line
  @User.Getter private userData!: any;

  @Company.Getter private dataComapany!: ICompanyData;

  @User.Action private setUserData!: (data: object) => void;

  @Company.Action private setCompanyData!: (data: object) => void;

  private companyName: IAppInput = {
    label: 'Компания',
    type: 'text',
    name: 'company-name',
    value: '',
    placeholder: 'Company name',
    hasBlurCheck: false,
    minLength: 1,
  }

  private currentBussines = 0;

  private bussinesses: IAppRadiobox = {
    items: ['Индивидуальный предприниматель', 'Юридическое лицо (ООО, ЗАО)'],
    name: 'company-type',
    id: 'company-type',
    current: 0,
  }

  private inputRekvizites: Array<IAppInput> = [
    {
      label: 'ИНН:',
      type: 'text',
      name: 'company-inn',
      value: '',
      placeholder: '',
      hasBlurCheck: false,
      minLength: 0,
    },
    {
      label: 'КПП:',
      type: 'text',
      name: 'company-kpp',
      value: '',
      placeholder: '',
      hasBlurCheck: false,
      minLength: 0,
    },
  ];

  private inputAddress: Array<IAppInput> = [
    {
      label: 'Индекс:',
      type: 'text',
      name: 'company-zip',
      value: '',
      placeholder: 'индекс, город, адрес',
      hasBlurCheck: false,
      minLength: 0,
    },
    {
      label: 'Город:',
      type: 'text',
      name: 'company-city',
      value: '',
      placeholder: 'индекс, город, адрес',
      hasBlurCheck: false,
      minLength: 0,
    },
    {
      label: 'Адрес:',
      type: 'text',
      name: 'company-address',
      value: '',
      placeholder: 'индекс, город, адрес',
      hasBlurCheck: false,
      minLength: 0,
    },
    {
      label: 'Телефон:',
      type: 'text',
      name: 'company-tel',
      value: '',
      placeholder: '+7(999) 999-99-99',
      hasBlurCheck: false,
      minLength: 0,
    },
  ];

  private inputBank: Array<IAppInput> = [
    {
      label: 'Счет:',
      type: 'text',
      name: 'company-bank-account',
      value: '',
      placeholder: 'Банковский счет, 28 символов',
      hasBlurCheck: false,
      minLength: 0,
    },
    {
      label: 'БИК:',
      type: 'text',
      name: 'company-bank-bik',
      value: '',
      placeholder: '',
      hasBlurCheck: false,
      minLength: 0,
    },
    {
      label: 'Банк:',
      type: 'text',
      name: 'company-bank-name',
      value: '',
      placeholder: '',
      hasBlurCheck: false,
      minLength: 0,
    },
    {
      label: 'Кор счёт:',
      type: 'text',
      name: 'company-bank-kor',
      value: '',
      placeholder: '',
      hasBlurCheck: false,
      minLength: 0,
    },
  ];

  private inputMenegment: Array<IAppInput> = [
    {
      label: 'Должность руководителя:',
      type: 'text',
      name: 'company-boss',
      value: '',
      placeholder: 'Банковский счет, 28 символов',
      hasBlurCheck: false,
      minLength: 0,
    },
    {
      label: 'ФИО руководителя:',
      type: 'text',
      name: 'company-boss-name',
      value: '',
      placeholder: '',
      hasBlurCheck: false,
      minLength: 0,
    },
    {
      label: 'Должность бухгалтера:',
      type: 'text',
      name: 'company-buh',
      value: 'Главный бухгалтер',
      placeholder: '',
      hasBlurCheck: false,
      minLength: 0,
    },
    {
      label: 'ФИО бухгалтера:',
      type: 'text',
      name: 'company-buh-name',
      value: '',
      placeholder: '',
      hasBlurCheck: false,
      minLength: 0,
    },
  ];

  mounted() {
    const timerId = setTimeout(() => {
      let current = this.bussinesses.items.findIndex(
        (el) => el === this.dataComapany?.bussinesType,
      );
      if (current === -1) current = 0;
      this.currentBussines = current;
      this.bussinesses.current = current;

      this.companyName.value = this.dataComapany?.companyName;
      this.inputRekvizites[0].value = this.dataComapany?.inn;
      this.inputRekvizites[1].value = this.dataComapany?.kpp;

      this.inputAddress[0].value = this.dataComapany.address?.zipCode;
      this.inputAddress[1].value = this.dataComapany.address?.sity;
      this.inputAddress[2].value = this.dataComapany.address?.streat;
      this.inputAddress[3].value = this.dataComapany.address?.phone;

      this.inputBank[0].value = this.dataComapany.bank?.account;
      this.inputBank[1].value = this.dataComapany.bank?.bik;
      this.inputBank[2].value = this.dataComapany.bank?.name;
      this.inputBank[3].value = this.dataComapany.bank?.kor;

      this.inputMenegment[0].value = this.dataComapany.menegment?.bossName;
      this.inputMenegment[1].value = this.dataComapany.menegment?.bossPosition;
      this.inputMenegment[2].value = this.dataComapany.menegment?.buhName;
      this.inputMenegment[3].value = this.dataComapany.menegment?.buhPosition;
      clearTimeout(timerId);
    }, 500);
  }

  private saveCompanyData() {
    this.setCompanyData({
      data: {
        companyName: this.companyName.value,
        bussinesType: this.bussinesses.items[this.currentBussines],
        inn: this.inputRekvizites[0].value,
        kpp: this.inputRekvizites[1].value,
        address: {
          zipCode: this.inputAddress[0].value,
          sity: this.inputAddress[1].value,
          streat: this.inputAddress[2].value,
          phone: this.inputAddress[3].value,
        },
        bank: {
          account: this.inputBank[0].value,
          bik: this.inputBank[1].value,
          name: this.inputBank[2].value,
          kor: this.inputBank[3].value,
        },
        menegment: {
          bossName: this.inputMenegment[0].value,
          bossPosition: this.inputMenegment[1].value,
          buhName: this.inputMenegment[2].value,
          buhPosition: this.inputMenegment[3].value,
        },
      },
    });
  }
}
</script>
