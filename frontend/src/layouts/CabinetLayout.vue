<template>
  <div class="app-cabinet">
    <div class="app-cabinet__aside">
      <Drawer @changeRout="headerTitle = $event" />
    </div>
    <div class="app-cabinet__header">
      <div class="app-cabinet__header-greeting">Hello, {{ userData.name || 'Honey' }}</div>
      <div class="app-cabinet__header-description">{{ headerTitle }}</div>
      <div class="app-cabinet__header-style">
        <div class="app-cabinet__header-style_icon">
          <a href="javascript:void(0);">
            <IconMoon />
          </a>
        </div>
      </div>
      <div class="app-cabinet__header-user">
        <a href="javascript:void(0);" @click="userDropDownOpen = !userDropDownOpen">
          <IconUser />
        </a>
        <transition name="fade">
          <div class="app-cabinet__user-dropdown" :class="{ 'is-open' : userDropDownOpen }">
            User dropdown menu<br>
            can be painting in other styles
            <div class="app-cabinet__user-dropdown_row">
              <button
                class="btn btn-primary"
                @click="userDropDownOpen = false; setModalState(modalConfirmOpenParams)"
              >Log out</button>
            </div>
          </div>
        </transition>
      </div>
    </div>
    <main class="app-cabinet__main">
      <slot />
    </main>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
// eslint-disable-next-line
import VueRouter from 'vue-router';
import { namespace } from 'vuex-class';
import IconMoon from '../components/images-svg/icons/IconMoon.vue';
import IconUser from '../components/images-svg/icons/IconUser.vue';
import Drawer from '../components/cabinet/Drawer.vue';
import { IModalState } from '../store/modules/modal/types';
import { IUserData } from '../store/modules/user/types';

const Modal = namespace('modal');
const User = namespace('user');
const Services = namespace('services');
const Company = namespace('company');
const Clients = namespace('clients');

@Component({
  components: {
    IconMoon,
    IconUser,
    Drawer,
  },
})

export default class CabinetLayout extends Vue {
  @Modal.Action private setModalState!: (data: IModalState) => void;

  @Modal.Action private closeModal!: () => void;

  @User.Action private logout!: () => void;

  @User.Action private getUserData!: () => void;

  @Clients.Action private getClientsData!: () => void;

  @User.Getter private userData?: IUserData;

  @Company.Action private clearCompanyData!: () => void;

  @Services.Action private clearServicesData!: () => void;

  @Services.Action private getServicesData!: () => void;

  @Clients.Action private clearClientsData!: () => void;

  private userDropDownOpen = false;

  private headerTitle = '';

  private modalConfirmOpenParams: IModalState = {
    modalComponentName: 'ConfirmModal',
    modalState: true,
    modalParams: {
      confirm: false,
      actionTitle: 'Are you sure?',
      cb: this.confirmCb,
    },
    modalHeight: '200px',
  }

  created() {
    this.getUserData();
    this.getClientsData();
    this.getServicesData();
  }

  confirmCb(ev: boolean): void {
    this.closeModal();
    if (ev) {
      this.logout();
      this.$router.push('/');
    }
  }

  beforedestroy() {
    this.clearCompanyData();
    this.clearServicesData();
    this.clearClientsData();
  }
}
</script>
