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
        <template v-if="activeTab === 0">
          <SettingsTab1 />
        </template>
        <template v-if="activeTab === 1">
          <SettingsTab2 />
        </template>
        <template v-if="activeTab === 2">
          <SettingsTab3 />
        </template>
      </transition>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import HeadTabs from '../../components/cabinet/HeadTabs.vue';
import SettingsTab1 from '../../components/cabinet/settings/SettingsTab1.vue';
import SettingsTab2 from '../../components/cabinet/settings/SettingsTab2.vue';
import SettingsTab3 from '../../components/cabinet/settings/SettingsTab3.vue';

const User = namespace('user');

const Company = namespace('company');

@Component({
  components: {
    HeadTabs,
    SettingsTab1,
    SettingsTab2,
    SettingsTab3,
  },
})

export default class Settings extends Vue {
  // eslint-disable-next-line
  @User.Getter private userData!: any;

  @User.Action private setUserData!: (data: object) => void;

  @Company.Action private getCompanyData!: () => void;

  private activeTab = 0;

  private tabs = ['Acount settings', 'Company data', 'Aplication settings'];

  created() {
    this.getCompanyData();
  }

  // mounted() {
  //   const timerId = setTimeout(() => {
  //     this.inputNames[0].value = this.userData?.name;
  //     this.inputNames[1].value = this.userData?.position;
  //     clearTimeout(timerId);
  //   }, 500);
  // }
}
</script>
