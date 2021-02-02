<template>
  <div  class="app-content__page">
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
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import ImageCard from './ImageCard.vue';
import AppInput from '../../elements/AppInput.vue';
import { IAppInput } from '../../../types';

const User = namespace('user');

@Component({
  components: {
    ImageCard,
    AppInput,
  },
})

export default class Settings extends Vue {
  // eslint-disable-next-line
  @User.Getter private userData!: any;

  @User.Action private setUserData!: (data: object) => void;

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
    const timerId = setTimeout(() => {
      this.inputNames[0].value = this.userData?.name;
      this.inputNames[1].value = this.userData?.position;
      clearTimeout(timerId);
    }, 500);
  }

  private savePersonalData() {
    this.setUserData({
      name: this.inputNames[0].value,
      position: this.inputNames[1].value,
    });
  }
}
</script>
