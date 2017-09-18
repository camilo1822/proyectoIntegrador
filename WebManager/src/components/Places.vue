<template>
  <div>
    <section class="hero is-primary">
      <div class="hero-body">
        <div class="container">

          <div class="columns">
            <div class="column is-three-quarters">
              <h1 class="title">
                Lugares
              </h1>

            </div>
            <div class="column ">
              <div class="button is-primary is-inverted is-outlined is-pulled-right is-medium" @click="isComponentModalActive = true">
                <span class="icon">
                  <i class="fa fa-plus"></i>
                </span>
                <span>Agregar lugar</span>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
    <section class="section">
      <div class="container">
        <div v-if="places.length ==0">
          <b-message type="is-danger">
            No hay lugares en este momento
          </b-message>
        </div>
        <div v-else>
          <place-item v-for="(place,index) in places" :key="index" :name="place.name" :description="place.description" :image="place.imageUrl"></place-item>
        </div>
      </div>
    </section>
    <!--
                    <section class="hero is-dark">
                      <div class="hero-body">
                        <div class="container">
                          <h1 class="title">
                            Lugares
                          </h1>
                          <h2 class="subtitle">
                            Agregar lugar
                          </h2>
                        </div>
                      </div>
                    </section>
                    <section class="section">
                      <div class="container">
                        <b-field>
                          <b-input placeholder="Agregar nuevo" icon="add" v-model="nombre">
                          </b-input>
                          <p class="control">
                            <button class="button is-success" @click="writeNew(nombre)">Agregar</button>
                          </p>
                        </b-field>
                      </div>
                    </section> -->

    <b-modal :active.sync="isComponentModalActive" has-modal-card :width="'960px'" :canCancel="true,canCancel">
      <add-place :form-props="formProps"></add-place>
    </b-modal>
  </div>
</template>
<script>

import PlaceItem from '@/components/fragments/PlaceItem'
import AddPlace from '@/components/fragments/AddPlace'
import Place from '@/Utils/Place'
export default {
  name: 'Places',
  components: { PlaceItem, AddPlace },
  data() {

    return {
      places: [],
      canCancel: ['escape', 'x', 'outside'],
      isComponentModalActive: false,
      formProps: {
        name: '',
        imageUrl: '',
        description: '',
        lat: '',
        long: '',
        address: '',
        type: '',
        beaconId: ''
      }
    }
  },
  methods: {
    addPlace() {
     /*  let newPlace = this.$firebase.database().ref().child('/places').push()
      newPlace.set(this.formProps) */
    }
  },
  mounted() {
    this.$firebase.database().ref('/places').on("value", snapshot => {
      this.places = []
      Object.keys(snapshot.val()).map((key, index) => {
        this.places.push(snapshot.val()[key])
      });
    })
  }

}
</script>
<style scoped>

</style>
