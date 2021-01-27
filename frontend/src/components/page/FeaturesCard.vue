<template>
  <div class="app-page__card">
    <div class="app-page__card-image">
      <component :is="dataCard.image" />
    </div>
    <div class="app-page__card-title">{{ dataCard.title }}</div>
    <div class="app-page__card-text">{{ dataCard.text }}</div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import FeaturesOne from '@/components/images-svg/FeaturesOne.vue';
import FeaturesSecond from '@/components/images-svg/FeaturesSecond.vue';
import FeaturesThree from '@/components/images-svg/FeaturesThree.vue';

import { IFeaturesCard } from '@/types';

@Component({
  components: {
    FeaturesOne,
    FeaturesSecond,
    FeaturesThree,
  },
})
export default class FeaturesCard extends Vue {
  @Prop({ required: true }) dataCard!: IFeaturesCard;
}
</script>
