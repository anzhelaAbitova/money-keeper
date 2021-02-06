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
          <div class="auth-modal__form-row">
            <AppInput :params="inputConfirmData" @changeInput="inputConfirmData.value = $event" />
          </div>
          <template v-for="(item, i) in inputsLoginData">
            <div class="auth-modal__form-row" :key="'reginpts' + i" >
              <AppInput :params="item" @changeInput="item.value = $event" />
            </div>
          </template>
          <div class="auth-modal__error">
            <small v-if="errorMessageReg">{{ errorMessageReg }}</small>
          </div>
          <div class="auth-modal__form-button">
            <button
              class="btn btn-primary"
              :class="{ 'is-disable' : getRegBtnDisable }"
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

  private activeTab = 0;

  private errorMessageLogin = '';

  private errorMessageReg = '';

  private inputConfirmData: IAppInput =   {
      label: 'Name:',
      type: 'text',
      name: 'username',
      value: '',
      placeholder: 'Your name',
      hasBlurCheck: true,
      minLength: 3,
    };

  private inputsLoginData: IAppInput[] = [
    {
      label: 'Email:',
      type: 'email',
      name: 'mail',
      value: '',
      placeholder: 'yours@email.com',
      hasBlurCheck: true,
      minLength: 3,
    },
    {
      label: 'Password:',
      type: 'password',
      name: 'password',
      value: '',
      placeholder: '***********',
      hasBlurCheck: true,
      minLength: 3,
    },
  ];

  get getRegBtnDisable() {
    const email = this.inputsLoginData[0].value && this.inputsLoginData[0].value.length > 3;
    const pass = this.inputsLoginData[1].value && this.inputsLoginData[1].value.length > 3;
    const name = this.inputConfirmData.value && this.inputConfirmData.value.length > 3;
    return name && email && pass;
  }

  mounted() {
    this.activeTab = this.params.active;
  }

  private async regUser() {
    try {
      const user = {
        username: this.inputConfirmData.value,
        email: this.inputsLoginData[0].value,
        password: this.inputsLoginData[1].value,
      };
      const response = await fetch('https://money-keeper21.herokuapp.com/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(user),
      });
      if (response.ok) {
        const json = await response.json();
        console.log(json)
      } else {
        console.log(`Ошибка HTTP: ${response.status}`);
      }
      //document.location.href = 'https://money-keeper21.herokuapp.com/post';
      return console.log(response.json());
    } catch (err) {
      return console.log(err);
    }
  }

  private async signIn(data: ILoginUser) {
    try {
      let box = this;
      const user = data;
      const response = await fetch('https://money-keeper21.herokuapp.com/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(user),
      });
      if (response.ok) {
        console.log(response);
        const json = await response.json();
        console.log(json);
        // document.location.href = 'https://money-keeper21.herokuapp.com/post';
      } else {
        console.log(`Ошибка HTTP: ${response.status}`);
      }
      return response.json();
    } catch (err) {
      return console.log(err);
    }
  }
}
</script>
