<template>
      <div class="row">
          
          <div class="col-8">
            <!-- nova forma za post -->
            <form @submit.prevent="postNewImage" class="mb-5">
              <div class="form-group">
                <!-- <label for="imageUrl">Image URL</label>
                <input
                  v-model="newImageUrl"
                  type="text"
                  class="form-control ml-2"
                  placeholder="Enter the image URL"
                  id="imageUrl"
                  /> -->
                  <croppa :width="400" :height="400" placeholder="Učitaj sliku..." v-model="imageReference"></croppa>
              </div>
              <div class="form-group">
                <label for="imageDescription">Description</label>
                <input
                  v-model="newImageDescription"
                  type="text"
                  class="form-control ml-2"
                  placeholder="Enter the image description"
                  id="imageDescription"
                  />
              </div>
              <button type="submit" class="btn btn-primary ml-2">Post
              image</button>
            </form>
            <!-- listanje kartica -->
            <instagram-card v-for="card in filteredCards" :key="card.id" :info="card" />
          </div>
          <div class="col-4"></div>
      </div>
</template>

<script>
// @ is an alias to /src
import InstagramCard from '@/components/InstagramCard.vue';
import store from "@/store";
import { db, storage } from "@/firebase";

//... API/firebase -> sve kartice -> cards

/* cards = [
  {url: "https://picsum.photos/id/1/400/400", description: 'laptop', time: 'few minutes ago...'},
  {url: "https://picsum.photos/id/2/400/400", description: 'laptop #2', time: 'an hour ago...'},
  {url: "https://picsum.photos/id/3/400/400", description: 'laptop #3', time: 'two hours ago...'},
]; */



export default {
  name: 'Home',
  data: function(){
      return {
        cards: [],
        store,
        newImageDescription: "",
        newImageUrl: "",
        imageReference: null,
    }
  },
  mounted() {
      //dohvat iz firebasea
      this.getPosts();
  },
  methods: {
      getPosts() {
        db.collection('Posts')
          .orderBy('posted_at', 'desc')
          //.limit(3)
          .get()
          .then((query) => {
            this.cards = [];
              query.forEach((doc) => {
                 console.log("ID: ", doc.id);
                 console.log("Podaci: ", doc.data());
                 
                 const data = doc.data();

                 this.cards.push({
                    id: data.id,
                    time: data.posted_at,
                    description: data.description,
                    url: data.url,
                 });
              });
        });
      },
      postNewImage(){

        this.imageReference.generateBlob((blobData) => { //arrow funkcija čuva this
            console.log(blobData);
            let imageName = "posts/" + store.currentUser + '/' + Date.now() + ".png";

            storage
                  .ref(imageName)
                  .put(blobData)
                  .then(result => {
                    // .... uspjesno spremanje
                    //console.log(result)
                    result.ref.getDownloadURL().then(url => {
                      console.log("javni link", url);

                      const imageDescription = this.newImageDescription;

                      
                          db.collection("Posts")
                            .add({
                              url: url,
                              description: imageDescription,
                              email: store.currentUser,
                              posted_at: Date.now(),
                          })
                          .then((doc) => {
                              console.log("Spremljeno", doc);
                              alert("Slika je uspjesno postana!");
                              this.newImageDescription = "";
                              this.imageReference.refresh();

                              this.getPosts();
                          })
                          .catch((e) => {
                              console.error(e);
                              this.errorMessage = e.message;
                            });
                          }).catch((e) => {
                              console.error(e);
                            });
                  })
                  .catch((e) => {
                    console.error(e);
                  });
            });
      }
        
  },
  computed: {
    filteredCards() {
      //logika koja filtrira cards
      let termin = this.store.searchTerm;
      return this.cards.filter((card) => card.description.includes(termin)); //jednostavnija verzija 
      //return this.cards.filter((card) => card.description.indexOf(termin) >= 0);

      /*let newCards = [];

    
      for (let card of this.cards) {
        if (card.description.indexOf(termin) >= 0) {
            newCards.push(card);
        }
        console.log(newCards);
      }

      return newCards;*/
    },
  },
  components: {
    InstagramCard,
  },
};
</script>
