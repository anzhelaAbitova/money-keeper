<template>
  <div class="app-page__main">
    <AppModal name="auth-modal" height="auto">
      <div class="auth-modal__close" slot="top-right">
        <button @click="$modal.hide('auth-modal')">
          <IconClose width="30" height="30" />
        </button>
      </div>
      <AuthModal />
    </AppModal>
    <div class="app-page__banner">
      <div class="app-page__banner-col">
        <div class="app-page__banner-content">
          <div class="app-page__banner-title">
            <h1>App developed for<br>small business</h1>
          </div>
          <div class="app-page__banner-text">
            Our team build this app especially for small business. This app is free, use to use,
             doesn't need to download, can be used on desktop and smartphones alike.
          </div>
          <div class="app-page__banner-button">
            <button class="btn btn-primary" @click="$modal.show('auth-modal')">
              Use now
            </button>
          </div>
        </div>
      </div>
      <div class="app-page__banner-col">
        <div class="app-page__banner-image">
          <BannerImage />
        </div>
      </div>
    </div>
    <div class="app-page__description" id="features">
      <div class="app-page__description-title">
        <h2>Features</h2>
      </div>
      <div class="app-page__description-cards">
        <template v-for="(card, i) in featuresData">
          <FeaturesCard :dataCard="card" :key="'featurescard-' + i"/>
        </template>
      </div>
    </div>
    <div class="app-page__contacts" id="contacts">
      <div class="app-page__contacts-title">
        <h2>Our contacts</h2>
      </div>
      <div class="app-page__contacts-content">
        <div class="app-page__contacts-item">
          <a href="https://github.com/tsaminsk" class="app-page__contacts-link" target="_blank">Sergei Talai</a>
        </div>
        <div class="app-page__contacts-item">
          <a href="https://rs.school/index.html" class="app-page__contacts-link" target="_blank">
            <img src="@/assets/images/rslogo.svg" alt="">
          </a>
        </div>
        <div class="app-page__contacts-item">
          <a href="https://github.com/anzhelaAbitova" class="app-page__contacts-link" target="_blank">Anzhela Abitova</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import BannerImage from '@/components/images-svg/BannerImage.vue';
import FeaturesCard from '@/components/page/FeaturesCard.vue';
import AuthModal from '@/components/modal/AuthModal.vue';
import IconClose from '@/components/images-svg/icons/IconClose.vue';
import { IFeaturesCard } from '@/types';

@Component({
  components: {
    BannerImage,
    FeaturesCard,
    AuthModal,
    IconClose,
  },
})

export default class Home extends Vue {
  featuresData: IFeaturesCard[] = [
    {
      title: 'No download',
      text: 'This app doesn’t need to be downloaded, it’s working online.',
      image: 'features-one',
    },
    {
      title: 'Multiplatforms',
      text: ' This app can work on desktop, and on smartphones.',
      image: 'FeaturesSecond',
    },
    {
      title: 'Free',
      text: 'This app are free to use, now and forever',
      image: 'FeaturesThree',
    },
  ];
}
</script>
