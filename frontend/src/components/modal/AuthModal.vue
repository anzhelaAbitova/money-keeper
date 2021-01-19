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
            <button class="btn btn-primary" @click="signIn">
              Sign in
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
          <div class="auth-modal__form-button">
            <button class="btn btn-primary" @click="register">
              Register me
            </button>
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
import { Component, Vue, Prop } from 'vue-property-decorator';
import { IAppInput } from '@/types';
import AppInput from '@/components/elements/AppInput.vue';
import { namespace } from 'vuex-class';

const Modal = namespace('modal');

type AuthModalParams = {
  active: number;
}

@Component({
  components: {
    AppInput,
  },
})

export default class AuthModal extends Vue {
  @Prop({ default: { active: 0 } }) params!: AuthModalParams

  @Modal.Action private setModalState!: (ev: boolean) => void;

  private activeTab = 0;

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

  mounted() {
    this.activeTab = this.params.active;
  }

  private signIn() {
    // need to validate
    this.goToCabinet('/cabinet/home');
  }

  private register() {
    // need to validate
    this.goToCabinet('/cabinet/settings');
  }

  private goToCabinet(path: string) {
    this.setModalState(false);
    this.$router.push(path);
  }
}
</script>
