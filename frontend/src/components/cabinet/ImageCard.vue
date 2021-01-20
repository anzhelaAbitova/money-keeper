<template>
  <div class="image-card">
    <div class="image-card__head">
      <label class="image-card__button" title="change avatar">
        <IconEdit />
        <input type="file" name="img" accept="image/*" @change="upload">
      </label>
    </div>
    <div class="image-card__body">
      <div class="image-card__image">
        <div class="image-card__image-default">
          <IconUser />
        </div>
        <img v-if="getUserAvatar" :src="getUserAvatar" alt="User avatar">
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
import { namespace } from 'vuex-class';

const User = namespace('user');

@Component({
  components: {
    IconEdit,
    IconUser,
  },
})

export default class ImageCard extends Vue {
  @User.Getter private getUserAvatar!: string;

  @User.Getter private getUserName!: string;

  @User.Action private setUserAvatar!: (path: string) => void;

  private upload(event: Event): void {
    const target = event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    const formData = new FormData();
    formData.append('user', this.getUserName);
    formData.append('file', file);

    fetch('https://beinweb.ru/api/save-image.php', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((res) => {
        this.setUserAvatar(`https://beinweb.ru/api/images/${res[0].dir}/${file.name}`);
      })
      .catch((error) => console.log('previewThumbnail error', error));
  }
}
</script>
