<template>
  <div class="app-input__wrapper">
    <label v-if="params.label" class="app-input__label" for="login">{{ params.label }}</label>
    <input
      :type="params.type"
      :name="params.login"
      :placeholder="params.placeholder"
      :value="params.value"
      class="app-input"
      :class="{ 'is-error' : isError }"
      @blur="checkInputBlur($event.target.value)"
      @focus="isError = false"
      @input="$emit('changeInput', $event.target.value)"
    >
    <small
      v-if="params.hasBlurCheck"
      class="app-input__error"
    >{{ isError ? 'This field is required' : '' }}</small>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { IAppInput } from '@/types';

@Component

export default class AppInput extends Vue {
  @Prop(
    {
      required: true,
      default: {
        type: 'text',
        value: '',
        placeholder: '',
        hasBlurCheck: false,
        minLength: 3,
      },
    },
  ) params!: IAppInput;

  private isError = false;

  private checkInputBlur(value: string) {
    if (this.params.hasBlurCheck
      && (value === '' || value.length < this.params.minLength)) this.isError = true;
  }
}
</script>
