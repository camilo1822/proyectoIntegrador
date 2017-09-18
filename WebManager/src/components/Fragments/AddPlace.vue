<template>
  <div class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title">Nuevo Lugar</p>
    </header>
    <section class="modal-card-body">
      <b-field label="Nombre">
        <b-input type="text" v-model="formProps.name" required>
        </b-input>
      </b-field>
      <b-field label="Descripción">
        <b-input type="textarea" v-model="formProps.description" required>
        </b-input>
      </b-field>
      <b-field label="Tipo">
        <b-select placeholder="Selecciones un tipo" v-model="formProps.type">
          <option v-for="(culturalType,index) in types" :value="culturalType" :key="index">
            {{culturalType }}
          </option>
        </b-select>
      </b-field>
      <b-field label="URL de la imagen">
        <b-input type="text" v-model="formProps.imageUrl" required>
        </b-input>
      </b-field>
      </b-field>
      <b-field label="Latitud">
        <b-input type="number" v-model="formProps.lat" step="0.000001" required>
        </b-input>
      </b-field>
      <b-field label="Longitud">
        <b-input type="number" v-model="formProps.long" step="0.000001" required>
        </b-input>
      </b-field>
      <b-field label="Dirección">
        <b-input type="text" v-model="formProps.address" required>
        </b-input>
      </b-field>
      <b-field label="BeaconID">
        <b-input type="text" v-model="formProps.beaconId">
        </b-input>
      </b-field>

    </section>
    <footer class="modal-card-foot">
      <button class="button" type="button" @click="close">Close</button>
      <button class="button is-success" @click="addPlace">Agregar</button>
    </footer>
  </div>
</template>
<script>
export default {
  /*  props: ['name', 'description', 'imageUrl', 'lat', 'long', 'address', 'beaconId','type'], */
  props: ['formProps'],
  data() {
    return {
      types: ['Estatua', 'Mural', 'Pintura', 'Lugar historico']
    }
  },
  methods: {
    addPlace() {
      let newPlace = this.$firebase.database().ref().child('/places').push()
      newPlace.set(this.formProps)
      this.$parent.close()
      this.cleanObject()
    },
    close() {
      this.$parent.close()
      this.cleanObject()
    },
    cleanObject() {
      Object.keys(this.formProps).map(key => {
        this.formProps[key] = null
      })
    }
  }
}
</script>

<style scoped>
.modal-card {
  width: 800px;
}
</style>

