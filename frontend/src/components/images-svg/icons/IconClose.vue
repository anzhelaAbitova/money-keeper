<template>
  <svg :width="width" :height="height" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14"><path d="M14 1.41L12.59 0 7 5.59 1.41 0 0 1.41 5.59 7 0 12.59 1.41 14 7 8.41 12.59 14 14 12.59 8.41 7 14 1.41z" fill="#E6F3F5"/></svg>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class IconClose extends Vue {
  @Prop({ required: false, default: '14' }) width!: string;

  @Prop({ required: false, default: '14' }) height!: string;
}
</script>
