<template>
  <div class="confirm-modal">
    <div class="confirm-modal__content">
      <div class="confirm-modal__title">
        <h2>{{ params.actionTitle }}</h2>
      </div>
      <div class="confirm-modal__row">
        <button class="btn btn-warning" @click="confirmAction(false)">Cancel</button>
        <button class="btn btn-primary" @click="confirmAction(true)">Confirm</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
// import { namespace } from 'vuex-class';
import { IModalState } from '../../store/modules/modal/types';

@Component({
  components: {
  },
})

export default class AuthModal extends Vue {
  @Prop() params!: IModalState;

  private confirmAction(ev: boolean): void {
    if (this.params.cb) this.params.cb(ev);
  }
}
</script>
