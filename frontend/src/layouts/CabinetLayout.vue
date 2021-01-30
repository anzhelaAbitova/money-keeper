<template>
  <div class="app-cabinet">
    <div class="app-cabinet__aside">
      <Drawer @changeHeaderTitle="headerTitle = $event" />
    </div>
    <div class="app-cabinet__header">
      <div class="app-cabinet__header-greeting">Hello, Jane Doe</div>
      <div class="app-cabinet__header-description">{{ headerTitle }}</div>
      <div class="app-cabinet__header-style">
        <div class="app-cabinet__header-style_icon">
          <a href="javascript:void(0);">
            <IconMoon />
          </a>
        </div>
      </div>
      <div class="app-cabinet__header-user">
        <a href="javascript:void(0);" @click="userDropDownOpen = !userDropDownOpen">
          <IconUser />
        </a>
        <transition name="fade">
          <div class="app-cabinet__user-dropdown" :class="{ 'is-open' : userDropDownOpen }">
            User dropdown menu<br>
            can be painting in other styles
          </div>
        </transition>
      </div>
    </div>
    <main class="app-cabinet__main">
      <slot/>
    </main>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import IconMoon from '@/components/images-svg/icons/IconMoon.vue';
import IconUser from '@/components/images-svg/icons/IconUser.vue';
import Drawer from '@/components/cabinet/Drawer.vue';

@Component({
  components: {
    IconMoon,
    IconUser,
    Drawer,
  },
})

export default class CabinetLayout extends Vue {
  private userDropDownOpen = false;

  private headerTitle = 'This is start cabinet page';
}
</script>
