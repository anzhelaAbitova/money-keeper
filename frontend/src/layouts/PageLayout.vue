<template>
  <div class="app-page">
    <slot/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class PageLayout extends Vue {}
</script>
