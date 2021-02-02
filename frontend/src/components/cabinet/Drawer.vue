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
        <router-link
          v-for="(item, i) in getDrawerRoutes"
          class="app-drawer__rout"
          :class="{ 'app-drawer__footer' : item.routName === 'Settings' }"
          :to="item.rout"
          tag="div"
          :key="'drwerrout' + i"
        >
          <div class="app-drawer__rout-icon">
            <component :is="item.icon" />
          </div>
          <div class="app-drawer__rout-name">{{ item.routName }}</div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import IconBussines from '../images-svg/icons/IconBussines.vue';
import IconClients from '../images-svg/icons/IconClients.vue';
import IconCharts from '../images-svg/icons/IconCharts.vue';
import IconAlarm from '../images-svg/icons/IconAlarm.vue';
import IconCamera from '../images-svg/icons/IconCamera.vue';
import IconTrophy from '../images-svg/icons/IconTrophy.vue';
import IconWallet from '../images-svg/icons/IconWallet.vue';
import IconSettings from '../images-svg/icons/IconSettings.vue';
import { IDrawerRoutes } from '../../store/modules/global/types';

const Global = namespace('global');

@Component({
  components: {
    IconBussines,
    IconClients,
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

  @Watch('$route')
  private changeRoute(value: string) {
    if (value) {
      this.isOpen = false;
    }
  }
}
</script>
