<template>
  <div
    class="app-drawer"
    :class="{ 'is-open' : isOpen }"
    @mouseenter="isOpen = true"
    @mouseleave="isOpen = false"
  >
    <div class="app-drawer__inner">
      <div class="app-drawer__head">
        <router-link class="app-drawer__icon" tag="div" to="/cabinet">
          <IconBussines />
        </router-link>
        <div class="app-drawer__name">
          Small business money keeper
        </div>
      </div>
      <div class="app-drawer__nav">
        <!-- <router-link class="app-drawer__rout" tag="div" to="/cabinet/charts">
          <div class="app-drawer__rout-icon">
            <IconCharts />
          </div>
          <div class="app-drawer__rout-name">
            Charts
          </div>
        </router-link> -->
        <router-link class="app-drawer__rout" tag="div" to="/cabinet/history">
          <div class="app-drawer__rout-icon">
            <IconAlarm />
          </div>
          <div class="app-drawer__rout-name">
            History
          </div>
        </router-link>
        <router-link class="app-drawer__rout" tag="div" to="/cabinet/goals">
          <div class="app-drawer__rout-icon">
            <IconTrophy />
          </div>
          <div class="app-drawer__rout-name">
            Goals
          </div>
        </router-link>
        <router-link class="app-drawer__rout" tag="div" to="/cabinet/balance">
          <div class="app-drawer__rout-icon">
            <IconWallet />
          </div>
          <div class="app-drawer__rout-name">
            Balance
          </div>
        </router-link>
        <router-link class="app-drawer__rout" tag="div" to="/cabinet/new">
          <div class="app-drawer__rout-icon">
            <IconCamera />
          </div>
          <div class="app-drawer__rout-name">
            Add new
          </div>
        </router-link>
      </div>
      <div class="app-drawer__footer">
        <router-link class="app-drawer__rout" tag="div" to="/cabinet/settings">
          <div class="app-drawer__rout-icon">
            <IconSettings />
          </div>
          <div class="app-drawer__rout-name">
            Settings
          </div>
        </router-link>
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
