<template>
  <div class="app-cabinet">
    <slot/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class CabinetLayout extends Vue {}
</script>
