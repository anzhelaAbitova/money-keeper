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
        <div v-if="!getUserAvatar" class="image-card__image-default">
          <IconUser />
        </div>
        <img v-else :src="getUserAvatar" alt="User avatar" width="274" height="246">
      </div>
      <div class="image-card__name">{{ getUserName }}</div>
      <div class="image-card__description">Web-designer</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import IconEdit from '@/components/images-svg/icons/IconEdit.vue';
import IconUser from '@/components/images-svg/icons/IconUser.vue';
import IconDelete from '@/components/images-svg/icons/IconDelete.vue';
import { namespace } from 'vuex-class';

const User = namespace('user');

@Component({
  components: {
    IconEdit,
    IconUser,
    IconDelete,
  },
})

export default class ImageCard extends Vue {
  @User.Getter private getUserAvatar!: string;

  @User.Getter private getUserName!: string;

  @User.Action private setUserAvatar!: (path: string) => void;

  private uploads = 0;

  private async upload(event: Event) {
    const target = event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    const formData = new FormData();
    formData.append('user', this.getUserName);
    formData.append('file', file);

    if (this.getUserAvatar !== '') await this.deleteAvatar();

    await fetch('https://beinweb.ru/api/save-image.php', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((res) => {
        this.setUserAvatar(`https://beinweb.ru/api/images/${res[0].dir}/${file.name}`);
        this.uploads += 1;
      })
      .catch((error) => console.log('upload error', error));
  }

  private async deleteAvatar() {
    const src = this.getUserAvatar.replace('https://beinweb.ru/api/images/', '');
    const formData = new FormData();
    formData.append('dir', src);
    await fetch('https://beinweb.ru/api/delete-image.php', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then(() => this.setUserAvatar(''))
      .catch((error) => console.log(error));
  }
}
</script>
