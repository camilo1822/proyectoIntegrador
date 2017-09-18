export default class Place {
  constructor({
    name,
    imageUrl,
    description,
    lat = 0,
    long = 0,
    address,
    type,
    beaconId = null
  }) {

    this.name = name
    this.imageUrl = imageUrl
    this.description = description
    this.lat = lat
    this.long = long
    this.address = address
    this.type = type
    this.beaconId = beaconId
  }

  coords() {
    return {
      lat: this.lat,
      long: this.long
    }
  }
  toObject() {
    return {
      name: this.name,
      imageUrl: this.imageUrl,
      description: this.description,
      lat: this.lat,
      long:  this.long,
      address: this.address,
      type:this.type,
      beaconId:this.beaconId
    }
  }

}
