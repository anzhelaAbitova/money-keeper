<template>
  <div class="head-tabs">
    <div
      v-for="(item, i) in tabs"
      class="head-tabs__item"
      :class="{ 'active' : i === active }"
      @click="active = i; $emit('changeActive', i)"
      :key="'tabs' + i"
    >{{ item }}</div>
  </div>
</template>

<script lang="ts">
import {
  Component,
  Vue,
  Prop,
  PropSync,
} from 'vue-property-decorator';

@Component

export default class HeadTabs extends Vue {
  @Prop({ required: true }) tabs!: string[];

  @PropSync('activeTab', { type: Number }) active!: number;
}
</script>
