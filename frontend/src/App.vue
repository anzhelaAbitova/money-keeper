<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <component :is="layout">
        <router-view/>
      </component>
    </transition>
    <AppModal name="auth-modal" height="450px" @before-close="setModalState(false)">
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
import AuthModal from '@/components/modal/AuthModal.vue';
import IconClose from '@/components/images-svg/icons/IconClose.vue';
import { namespace } from 'vuex-class';

const Modal = namespace('modal');

@Component({
  components: {
    AuthModal,
    IconClose,
  },
})
export default class App extends Vue {
  @Modal.Getter private getModalState!: boolean;

  @Modal.Getter private getModalComponentName!: string;

  @Modal.Getter private getModalParams!: object;

  @Modal.Action private setModalState!: (ev: boolean) => void;

  get layout(): string {
    return this.$route.meta.layout || 'page-layout';
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
