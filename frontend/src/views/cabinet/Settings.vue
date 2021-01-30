<template>
  <div class="app-content">
    <div class="app-content__head">
      <HeadTabs
        :tabs="tabs"
        :activeTab="activeTab"
        @changeActive="activeTab = $event"
      />
    </div>
    <div class="app-content__body">
      <transition name="fade" mode="out-in">
        <div v-if="activeTab === 0" class="app-content__page">
          <div class="app-content__col">
            <div class="app-content__title">
              <h4>Personal info</h4>
            </div>
            <ImageCard />
          </div>
          <div class="app-content__col">
            a
          </div>
        </div>
        <div v-if="activeTab === 1" class="app-content__page">
          company data
        </div>
        <div v-if="activeTab === 2" class="app-content__page">
          app settings
        </div>
      </transition>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HeadTabs from '@/components/cabinet/HeadTabs.vue';
import ImageCard from '@/components/cabinet/ImageCard.vue';

@Component({
  components: {
    HeadTabs,
    ImageCard,
  },
})

export default class Settings extends Vue {
  private activeTab = 0;

  private tabs = ['Acount settings', 'Company data', 'Aplication settings'];
}
</script>
