<template>
  <div class="app-checkbox__wrapper">
    <input
      type="checkbox"
      :name="params.name || null"
      :checked="params.checked"
      class="app-checkbox__check"
      v-model="checked"
      :id="params.id || params.name || null"
    >
    <label
      v-if="params.label"
      class="app-checkbox__label"
      @click="checked = !checked"
      :for="params.name"
    >{{ params.label }}</label>
  </div>
</template>

<script lang="ts">
import {
  Component,
  Vue,
  Prop,
  Watch,
} from 'vue-property-decorator';
import { IAppCheckbox } from '../../types';

@Component

export default class AppCheckbox extends Vue {
  @Prop(
    {
      required: true,
      default: {
        checked: false,
        label: 'Check input',
        name: '',
        id: '',
      },
    },
  ) params!: IAppCheckbox;

  private checked = false;

  mounted() {
    if (this.params.checked) this.checked = this.params.checked;
  }

  @Watch('checked')
  // eslint-disable-next-line
  private emitEvent(ev: any) {
    this.$emit('changeCheckbox', ev);
  }

  // private checkbox: IAppCheckbox = {
  //   label: 'Тип (ИП, ОАО, ООО, ЗАО...)',
  //   checked: true,
  //   name: 'company-type',
  //   id: 'app-company-type',
  // };
}
</script>
