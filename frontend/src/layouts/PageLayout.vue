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
            <a href="javascript:void(0);" @click="$router.push('/cabinet/home')">
              <user-image></user-image>
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

@Component({
  components: {
    UserImage,
  },
})
export default class PageLayout extends Vue {}
</script>
