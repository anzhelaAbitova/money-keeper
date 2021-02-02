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
              <AppInput
                :params="item"
                @changeInput="item.value = $event"
              />
            </div>
          </template>
          <div class="auth-modal__error">
            <small v-if="errorMessageLogin">{{ errorMessageLogin }}</small>
          </div>
          <div class="auth-modal__form-button">
            <button
              class="btn btn-primary"
              @click="signIn({
                email: inputsLoginData[0].value,
                password: inputsLoginData[1].value
              })"
            >Sign in</button>
          </div>
        </div>
        <div v-else class="auth-modal__form">
          <template v-for="(item, i) in inputsLoginData">
            <div class="auth-modal__form-row" :key="'reginpts' + i" >
              <AppInput :params="item" @changeInput="item.value = $event" />
            </div>
          </template>
          <div class="auth-modal__form-row">
            <AppInput :params="inputConfirmData" @changeInput="inputConfirmData.value = $event" />
          </div>
          <div class="auth-modal__error">
            <small v-if="errorMessageReg">{{ errorMessageReg }}</small>
          </div>
          <div class="auth-modal__form-button">
            <button
              class="btn btn-primary"
              :class="{ 'is-disable' : !getRegBtnDisable }"
              @click="regUser"
            >
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
import { namespace } from 'vuex-class';
import { IAppInput } from '../../types';
import AppInput from '../elements/AppInput.vue';

const Modal = namespace('modal');
const User = namespace('user');

type AuthModalParams = {
  active: number;
}

type ILoginUser = {
  email: string | null | undefined;
  password: string | null | undefined;
}

@Component({
  components: {
    AppInput,
  },
})

export default class AuthModal extends Vue {
  @Prop({ default: { active: 0 } }) params!: AuthModalParams

  @Modal.Action private setModalState!: (ev: boolean) => void;

  @User.Action private login!: ({ email, password }: ILoginUser) => Promise<string>;

  @User.Action private register!: ({ email, password }: ILoginUser) => Promise<string>;

  private activeTab = 0;

  private errorMessageLogin = '';

  private errorMessageReg = '';

  private inputConfirmData: IAppInput = {
    label: 'Confirm password:',
    type: 'password',
    name: 'confirmPassword',
    value: '',
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
      value: '',
      placeholder: '***********',
      hasBlurCheck: true,
      minLength: 6,
    },
  ];

  get getRegBtnDisable() {
    const email = this.inputsLoginData[0].value && this.inputsLoginData[0].value.length > 5;
    const pass = this.inputsLoginData[1].value && this.inputsLoginData[1].value.length > 5;
    const cPass = this.inputConfirmData.value === this.inputsLoginData[1].value;
    return email && pass && cPass;
  }

  mounted() {
    this.activeTab = this.params.active;
  }

  private regUser() {
    this.register({
      email: this.inputsLoginData[0].value,
      password: this.inputsLoginData[1].value,
    })
      .then(() => {
        this.goToCabinet('/cabinet/settings');
      })
      .catch((error) => {
        this.errorMessageReg = error.message;
      });
  }

  private async signIn(data: ILoginUser) {
    this.login(data)
      .then(() => {
        this.goToCabinet('/cabinet');
      })
      .catch((error) => {
        this.errorMessageLogin = error.message;
      });
  }

  private goToCabinet(path: string) {
    this.setModalState(false);
    this.$router.push(path);
  }
}
</script>
