<template>
        <div class="card text-center">
              <div class="card-header">{{ info.description }}</div>
              <div class="card-body p-0">
                    <img class="card-img-top" :src="info.url" />
              </div>
                  <div class="card-footer text-muted">
                    {{ postedFromNow }}
                    {{ postedFromNow2 }}
                  </div>
        </div>  
</template>

<script>
import moment from 'moment';

//JS kod
export default {
      props: ['info'],
      data() {
            return{
                  postedFromNow2: 'Ok from data',
            };
      },
      name: 'InstagramCard',
      computed: {
            postedFromNow() {
                  return moment(this.info.time).fromNow();
            },
      }
};
</script>

<style lang="scss">
.card{
  margin-bottom: 30px;
}
</style>
