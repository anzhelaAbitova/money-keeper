<template>
  <div
    class="app-drawer"
    :class="{ 'is-open' : isOpen }"
    @mouseenter="isOpen = true"
    @mouseleave="isOpen = false"
  >
    <div class="app-drawer__inner">
      <div class="app-drawer__head">
        <div class="app-drawer__icon">
          <IconBussines />
        </div>
        <div class="app-drawer__name">
          Small business money keeper
        </div>
      </div>
      <div class="app-drawer__nav">
        <div class="app-drawer__rout" @click="changeRoute('/cabinet/home')">
          <div class="app-drawer__rout-icon">
            <IconCharts />
          </div>
          <div class="app-drawer__rout-name">
            Charts
          </div>
        </div>
        <div class="app-drawer__rout" @click="changeRoute('/cabinet/history')">
          <div class="app-drawer__rout-icon">
            <IconAlarm />
          </div>
          <div class="app-drawer__rout-name">
            History
          </div>
        </div>
        <div class="app-drawer__rout" @click="changeRoute('/cabinet/goals')">
          <div class="app-drawer__rout-icon">
            <IconTrophy />
          </div>
          <div class="app-drawer__rout-name">
            Goals
          </div>
        </div>
        <div class="app-drawer__rout" @click="changeRoute('/cabinet/balance')">
          <div class="app-drawer__rout-icon">
            <IconWallet />
          </div>
          <div class="app-drawer__rout-name">
            Balance
          </div>
        </div>
        <div class="app-drawer__rout" @click="changeRoute('/cabinet/new')">
          <div class="app-drawer__rout-icon">
            <IconCamera />
          </div>
          <div class="app-drawer__rout-name">
            Add new
          </div>
        </div>
      </div>
      <div class="app-drawer__footer">
        <div class="app-drawer__rout" @click="changeRoute('/cabinet/settings')">
          <div class="app-drawer__rout-icon">
            <IconSettings />
          </div>
          <div class="app-drawer__rout-name">
            Settings
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import IconBussines from '@/components/images-svg/icons/IconBussines.vue';
import IconCharts from '@/components/images-svg/icons/IconCharts.vue';
import IconAlarm from '@/components/images-svg/icons/IconAlarm.vue';
import IconCamera from '@/components/images-svg/icons/IconCamera.vue';
import IconTrophy from '@/components/images-svg/icons/IconTrophy.vue';
import IconWallet from '@/components/images-svg/icons/IconWallet.vue';
import IconSettings from '@/components/images-svg/icons/IconSettings.vue';

@Component({
  components: {
    IconBussines,
    IconCharts,
    IconAlarm,
    IconCamera,
    IconTrophy,
    IconWallet,
    IconSettings,
  },
})

export default class Drawer extends Vue {
  private isOpen = false;

  private changeRoute(rout: string) {
    this.$router.push(rout);
    this.isOpen = false;
  }
}
</script>
