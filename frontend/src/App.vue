<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <component :is="layout">
        <router-view/>
      </component>
    </transition>
    <AppModal name="auth-modal" :height="modalHeight" @before-close="setModalState(false)">
      <div class="auth-modal__close" slot="top-right">
        <button @click="$modal.hide('auth-modal')">
          <IconClose width="30" height="30" />
        </button>
      </div>
      <component :is="getModalComponentName" :params="getModalParams" />
    </AppModal>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import AuthModal from './components/modal/AuthModal.vue';
import ConfirmModal from './components/modal/ConfirmModal.vue';
import NewClientModal from './components/modal/NewClienModal.vue';
import NewServicesModal from './components/modal/NewServicesModal.vue';
import IconClose from './components/images-svg/icons/IconClose.vue';

const Modal = namespace('modal');

@Component({
  components: {
    AuthModal,
    ConfirmModal,
    NewClientModal,
    NewServicesModal,
    IconClose,
  },
})
export default class App extends Vue {
  @Modal.Getter private getModalState!: boolean;

  @Modal.Getter private getModalComponentName!: string;

  @Modal.Getter private getModalParams!: object;

  @Modal.Getter private getModalHeight!: string;

  @Modal.Action private setModalState!: (ev: boolean) => void;

  get layout(): string {
    return this.$route.meta.layout || 'page-layout';
  }

  get modalHeight(): string {
    return this.getModalHeight || '450px';
  }

  @Watch('getModalState')
  private isModalStateChanged(value: boolean) {
    if (value) {
      this.$modal.show('auth-modal');
    } else {
      this.$modal.hide('auth-modal');
    }
  }
}
</script>
