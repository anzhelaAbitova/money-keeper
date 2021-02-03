<template>
  <div class="app-page">
    <div class="app-page__container">
      <div class="app-page__header">
        <nav class="app-page__links">
          <a href="#features" class="app-page__link">Features</a>
          <a href="#" class="app-page__link">Our team</a>
          <a href="#contacts" class="app-page__link">Contacts</a>
        </nav>
        <div class="app-page__auth">
          <div class="app-page__auth-reg">
            <a
              href="javascript:void(0);"
              @click="!isLoggedIn ? setModalState(modalOpenParams) : $router.push('/cabinet')"
            >
              <UserImage />
            </a>
          </div>
        </div>
      </div>
      <slot/>
      <div class="app-page__footer">
        <div class="app-page__footer-container">
          <!-- <div class="app-page__footer-logo">
            <img src="@/assets/images/rslogo.svg" alt="">
          </div> -->
          <div class="app-page__footer-year">
            2021 &copy;
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import UserImage from '@/components/images-svg/UserImage.vue';
import { namespace } from 'vuex-class';
import { IModalState } from '../store/modules/modal/types';

const Modal = namespace('modal');
const User = namespace('user');

@Component({
  components: {
    UserImage,
  },
})
export default class PageLayout extends Vue {
  @Modal.Action private setModalState!: (ev: boolean) => void;

  @User.Getter private isLoggedIn?: boolean;

  private modalOpenParams: IModalState = {
    modalComponentName: 'AuthModal',
    modalState: true,
    modalParams: { active: 0 },
  }
}
</script>
