<template>
  <div class="auth-modal">
    <div class="auth-modal__content">
      <div class="auth-modal__tabs">
        <div
          v-for="(tabName, i) in ['Log in', 'Register']"
          class="auth-modal__tab"
          :class="{ active : activeTab == i}"
          @click="activeTab = i"
          :key="'auth-modal-tab' + i"
        >{{ tabName }}</div>
      </div>
      <div class="auth-modal__body">
        <div v-if="activeTab == 0" class="auth-modal__form">
          <template v-for="(item, i) in inputsLoginData">
            <div class="auth-modal__form-row" :key="'reginpts' + i" >
              <AppInput :params="item" @changeInput="[item.name] = $event" />
            </div>
          </template>
          <div class="auth-modal__form-button">
            <button class="btn btn-primary" @click="$modal.show('auth-modal')">
              Use now
            </button>
          </div>
        </div>
        <div v-else class="auth-modal__form">
          <template v-for="(item, i) in inputsLoginData">
            <div class="auth-modal__form-row" :key="'reginpts' + i" >
              <AppInput :params="item" @changeInput="[item.name] = $event" />
            </div>
          </template>
          <div class="auth-modal__form-row">
            <AppInput :params="inputConfirmData" @changeInput="confirmPassword = $event" />
          </div>
        </div>
      </div>
    </div>
    <div class="auth-modal__image">
      <img src="@/assets/images/panorama.jpg" alt="">
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { IAppInput } from '@/types';
import AppInput from '@/components/elements/AppInput.vue';
// import BannerImage from '@/components/images-svg/BannerImage.vue';

// import FeaturesCard from '@/components/page/FeaturesCard.vue';
// import { IFeaturesCard } from '@/types';

@Component({
  components: {
    AppInput,
  },
})

export default class AuthModal extends Vue {
  private activeTab = 1;

  private inputConfirmData: IAppInput = {
    label: 'Confirm password:',
    type: 'password',
    name: 'confirmPassword',
    value: null,
    placeholder: '***********',
    hasBlurCheck: true,
    minLength: 6,
  };

  private inputsLoginData: IAppInput[] = [
    {
      label: 'Email:',
      type: 'email',
      name: 'mail',
      value: '',
      placeholder: 'yours@email.com',
      hasBlurCheck: true,
      minLength: 5,
    },
    {
      label: 'Password:',
      type: 'password',
      name: 'password',
      value: null,
      placeholder: '***********',
      hasBlurCheck: true,
      minLength: 6,
    },
  ]

  email = '';

  password: string | null = null;

  confirmPassword: string | null = null;
}
</script>
