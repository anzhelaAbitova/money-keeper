<template>
  <div class="app-radiobox">
    <div
      v-for="(item, i) in params.items"
      class="app-radiobox__item"
      :key="'radio' + i"
    >
      <label class="app-radiobox__label">
        <input
          type="radio"
          :name="params.name"
          :id="params.name + '-' + i"
          :value="item"
          v-model="val"
        />
        <div class="app-radiobox__text">{{ item }}</div>
      </label>
    </div>
  </div>
</template>

<script lang="ts">
import {
  Component,
  Vue,
  Prop,
  Watch,
} from 'vue-property-decorator';
import { IAppRadiobox } from '../../types';

@Component

export default class AppCheckbox extends Vue {
  @Prop(
    {
      required: true,
      default: {
        items: ['one'],
        name: 'radio',
        id: '',
        current: 0,
      },
    },
  ) params!: IAppRadiobox;

  private val = '';

  mounted() {
    this.val = this.params?.items[this.params?.current || 0];
  }

  @Watch('val')
  // eslint-disable-next-line
  private emitEvent(ev: any) {
    this.$emit(
      'changeRadiobox',
      this.params.items.findIndex((el) => el === ev),
    );
  }
}
</script>
