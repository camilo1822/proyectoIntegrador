# Cultural APP 

## DEVELOPMENT

### ``` bash
	npm install
	gulp orderify (Every time you change a .js file)
	ionic state restore
	ionic serve
	````
## PRODUCTION

### ``` bash
	ionic platform add android
	ionic build android
	ionic run android -d ```

### The project misses the next cordova plugins:
#### * codova-camera-plugin
#### * cordova barcode scanner

#### Remember to install them and do ```bash ionic state save``