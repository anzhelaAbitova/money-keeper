<template>
  <div class="image-card">
    <div class="image-card__head">
      <label class="image-card__button" title="change avatar">
        <IconEdit />
        <input type="file" accept="image/*">
      </label>
    </div>
    <div class="image-card__body">
      <div class="image-card__image">
        <div class="image-card__image-default">
          <IconUser />
        </div>
        <img src="@/assets/images/user.png" alt="">
      </div>

    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import IconEdit from '@/components/images-svg/icons/IconEdit.vue';
import IconUser from '@/components/images-svg/icons/IconUser.vue';

@Component({
  components: {
    IconEdit,
    IconUser,
  },
})

export default class ImageCard extends Vue {}
</script>
