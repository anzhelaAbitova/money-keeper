<template>
  <div class="app-page__main">

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
            <button
              class="btn btn-primary"
              @click="setModalState(modalAuthOpenParams)"
            >Use now</button>
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
import { namespace } from 'vuex-class';
import { IFeaturesCard } from '@/types';
import { IModalState } from '../../store/modules/modal/types';

const Modal = namespace('modal');

@Component({
  components: {
    BannerImage,
    FeaturesCard,
  },
})

export default class Home extends Vue {
  @Modal.Action private setModalState!: (ev: boolean) => void;

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

  private modalAuthOpenParams: IModalState = {
    modalComponentName: 'AuthModal',
    modalState: true,
    modalParams: { active: 1 },
  }
}
</script>
