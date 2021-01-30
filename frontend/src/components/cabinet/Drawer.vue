<template>
  <div
    class="app-drawer"
    :class="{ 'is-open' : isOpen }"
    @mouseenter="isOpen = true"
    @mouseleave="isOpen = false"
  >
    <div class="app-drawer__inner">
      <div class="app-drawer__head">
        <div
          class="app-drawer__icon"
          @click="changeRoute('/cabinet/home', 'This is start cabinet page')"
        >
          <IconBussines />
        </div>
        <div class="app-drawer__name">
          Small business money keeper
        </div>
      </div>
      <div class="app-drawer__nav">
        <div
          v-for="(item, i) in getDrawerRoutes"
          class="app-drawer__rout"
          :class="[
            ( item.routName === 'Settings' ? 'app-drawer__footer' : null),
            ($route.path === item.rout ? 'active' : null)
          ]"
          @click="changeRoute(item.rout, item.headerTitle)"
          :key="'drwerrout' + i"
        >
          <div class="app-drawer__rout-icon">
            <component :is="item.icon" />
          </div>
          <div class="app-drawer__rout-name">{{ item.routName }}</div>
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
import { namespace } from 'vuex-class';
import { IDrawerRoutes } from '../../store/modules/global/types';

const Global = namespace('global');

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
  @Global.Getter private getDrawerRoutes!: IDrawerRoutes;

  private isOpen = false;

  private changeRoute(rout: string, headerTitle: string) {
    this.$emit('changeHeaderTitle', headerTitle);
    this.$router.push(rout);
    this.isOpen = false;
  }
}
</script>
