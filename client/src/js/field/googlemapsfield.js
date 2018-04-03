const targets = Array.from(document.body.querySelectorAll('input[data-mapsfield=mapsfield]'));
const latField = document.getElementById('GoogleMapsLatField');
const lngField = document.getElementById('GoogleMapsLngField');

let options = {};
let autoComplete;

const fillAddress = () => {
  const location = autoComplete.getPlace();
  const components = location.address_components;

  latField.setAttribute('value', location.geometry.location.lat());
  lngField.setAttribute('value', location.geometry.location.lng());

  components.forEach((component) => {
    component.types.forEach((type) => {
      const field = document.getElementById(type);
      if (field) {
        field.setAttribute('value', component.long_name);
      }
    });
  });
};

const mountMapsField = (mapsfield) => {
  options = Object.assign(options, window.customisations);
  autoComplete = new google.maps.places.Autocomplete(mapsfield, options);
  autoComplete.addListener('place_changed', fillAddress);
};

export default function() {
  targets.forEach(mountMapsField);
}