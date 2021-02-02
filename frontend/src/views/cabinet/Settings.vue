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
              <h4>Avatar</h4>
            </div>
            <ImageCard />
          </div>
          <div class="app-content__col">
            <div class="app-content__title">
              <h4>Personal info</h4>
            </div>
            <form class="app-content__form" @submit.prevent>
              <div
                v-for="(item, i) in inputNames"
                class="app-content__form-row"
                :key="'jashkaj' + i"
              >
                <AppInput :params="item" @changeInput="inputNames[i].value = $event" />
              </div>
              <div class="app-content__form-row">
                <div
                  class="btn btn-primary"
                  :class="{ 'is-disable' : !inputNames[0].value && !inputNames[1].value }"
                  @click="savePersonalData"
                >Save</div>
              </div>
            </form>
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
import { namespace } from 'vuex-class';
import HeadTabs from '../../components/cabinet/HeadTabs.vue';
import ImageCard from '../../components/cabinet/ImageCard.vue';
import AppInput from '../../components/elements/AppInput.vue';
import { IAppInput } from '../../types';

const User = namespace('user');

@Component({
  components: {
    HeadTabs,
    ImageCard,
    AppInput,
  },
})

export default class Settings extends Vue {
  @User.Getter private getUserData!: any;

  @User.Action private setUserData!: (data: object) => void;

  private activeTab = 0;

  private tabs = ['Acount settings', 'Company data', 'Aplication settings'];

  private inputNames: Array<IAppInput> = [
    {
      label: 'Change name',
      type: 'text',
      name: 'user-name',
      value: '',
      placeholder: 'Your Name',
      hasBlurCheck: false,
      minLength: 3,
    },
    {
      label: 'Change position',
      type: 'text',
      name: 'position',
      value: '',
      placeholder: 'Your position',
      hasBlurCheck: false,
      minLength: 3,
    },
  ];

  mounted() {
    if (this.getUserData?.name) this.inputNames[0].value = this.getUserData?.name;
    if (this.getUserData?.position) this.inputNames[1].value = this.getUserData.position;
  }

  private savePersonalData() {
    this.setUserData({
      name: this.inputNames[0].value,
      position: this.inputNames[1].value,
    });
  }
}
</script>
