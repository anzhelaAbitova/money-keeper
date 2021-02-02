<template>
  <div class="image-card">
    <form class="image-card__head">
      <label class="image-card__button" title="change avatar">
        <IconEdit />
        <input type="file" name="img" accept="image/*" @change="upload" :key="uploads">
      </label>
      <div class="image-card__button" title="delete avatar">
        <a href="javascript:void(0);" @click.prevent="deleteAvatar">
          <IconDelete />
        </a>
      </div>
    </form>
    <div class="image-card__body">
      <div class="image-card__image">
        <div v-if="loading" class="image-card__image-loading">
          <Loader />
        </div>
        <div v-else-if="!avatar" class="image-card__image-default">
          <IconUser />
        </div>
        <img v-else :src="avatar" alt="User avatar" width="274" height="246">
      </div>
      <div class="image-card__name">{{ getUserData.name }}</div>
      <div class="image-card__description">{{ getUserData.position }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import IconEdit from '../images-svg/icons/IconEdit.vue';
import IconUser from '../images-svg/icons/IconUser.vue';
import IconDelete from '../images-svg/icons/IconDelete.vue';
import Loader from './AppLoadingPlaceholder.vue';

const User = namespace('user');

@Component({
  components: {
    IconEdit,
    IconUser,
    IconDelete,
    Loader,
  },
})

export default class ImageCard extends Vue {
  // eslint-disable-next-line
  @User.Getter private getUserData!: any;

  @User.Action private setUserData!: (data: object) => void;

  private uploads = 0;

  private loading = false;

  get avatar() {
    return this.getUserData?.avatar;
  }

  private async upload(event: Event) {
    const target = event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    const formData = new FormData();
    formData.append('user', this.getUserData.uid);
    formData.append('file', file);

    if (this.avatar !== '') await this.deleteAvatar();
    this.loading = true;

    await fetch('https://beinweb.ru/api/save-image.php', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then(() => {
        // const path = this.getUserData.uid;
        this.setUserData({ avatar: `https://beinweb.ru/api/images/${this.getUserData.uid}/${file.name}` });
        this.uploads += 1;
        this.loading = false;
      })
      .catch((error) => {
        this.loading = false;
        console.log('upload error', error);
      });
  }

  private async deleteAvatar() {
    const src = this.avatar.replace('https://beinweb.ru/api/images/', '');
    const formData = new FormData();
    formData.append('dir', src);
    this.loading = true;
    await fetch('https://beinweb.ru/api/delete-image.php', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then(() => {
        this.setUserData({ avatar: '' });
      })
      .catch((error) => console.log(error));
    this.loading = false;
  }
}
</script>
