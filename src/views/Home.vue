<template>
      <div class="row">
          <div class="col-2"></div>
          <div class="col-7">
            <instagram-card />
            <instagram-card />
            <instagram-card />
            <instagram-card />
            <instagram-card />
            <instagram-card />
            <instagram-card />
            <instagram-card />
          </div>
          <div class="col-3">
          </div>
      </div>
</template>

<script>
// @ is an alias to /src
import InstagramCard from '@/components/InstagramCard.vue';

export default {
  name: 'Home',
  components: {
    InstagramCard
  },
};
</script>
