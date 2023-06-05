import {createElement} from '../render.js';
import {POINT_TYPES} from '../const.js';
import {humanizePointEditorDueDate} from '../utils.js';
import {getRandomOffers} from '../mock/offer.js';
import {getRandomDestination} from '../mock/destination.js';


const toUpperCaseFirstSymbol = (str) => str.replace(/^\w/, (match) => match.toUpperCase());

const generateEventTypeGroup = (type) => POINT_TYPES.map((typeNow)=>
  `<div class="event__type-item">
    <input id="event-type-${typeNow}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${typeNow}" ${type === typeNow ? 'checked' : ''}>
    <label class="event__type-label  event__type-label--${typeNow}" for="event-type-${typeNow}-1">${toUpperCaseFirstSymbol(typeNow)}</label>
  </div>`).join('');

const generateOffersGroup = (offers) => getRandomOffers().map((offerNow) => `
  <div class="event__offer-selector">
    <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offerNow.title.replace(' ', '-')}-1" type="checkbox" name="event-offer-${offerNow.title.replace(' ', '-')}" ${offers.includes(offerNow) ? 'checked' : ''}>
    <label class="event__offer-label" for="event-offer-${offerNow.title.replace(' ', '-')}-1">
      <span class="event__offer-title">${offerNow.title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${offerNow.price}</span>
    </label>
  </div>
`).join('');

const generateDestinationPhotosGroup = (photos) => photos.map((photo) => `
  <img class="event__photo" src="${photo.src}" alt="${photo.description}">
`).join('');

const createEditFormTemplate = (point) => {
  const { basePrice, dateFrom, dateTo, offers, type, destination } = point;
  return `<li class="trip-events__item">
  <form class="event event--edit" action="#" method="post">
  <header class="event__header">
    <div class="event__type-wrapper">
      <label class="event__type  event__type-btn" for="event-type-toggle-1">
        <span class="visually-hidden">Choose event type</span>
        <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
      </label>
      <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">
      <div class="event__type-list">
        <fieldset class="event__type-group">
          <legend class="visually-hidden">Event type</legend>
          ${generateEventTypeGroup(type)}
        </fieldset>
      </div>
    </div>
    <div class="event__field-group  event__field-group--destination">
      <label class="event__label  event__type-output" for="event-destination-1">
        ${toUpperCaseFirstSymbol(type)}
      </label>
      <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="Chamonix" list="destination-list-1">
      <datalist id="destination-list-1">







      Expand All

  @@ -77,18 +61,18 @@ const createTripPointEditorTemplate = () => (

        <option value="Amsterdam"></option>
        <option value="Geneva"></option>
        <option value="Chamonix"></option>
      </datalist>
    </div>
    <div class="event__field-group  event__field-group--time">
      <label class="visually-hidden" for="event-start-time-1">From</label>
      <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${humanizePointEditorDueDate(dateFrom)}">
      &mdash;
      <label class="visually-hidden" for="event-end-time-1">To</label>
      <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${humanizePointEditorDueDate(dateTo)}">
    </div>
    <div class="event__field-group  event__field-group--price">
      <label class="event__label" for="event-price-1">
        <span class="visually-hidden">Price</span>
        &euro;
      </label>
      <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}">
    </div>
    <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>







      Expand All

  @@ -102,65 +86,32 @@ const createTripPointEditorTemplate = () => (

    <button class="event__reset-btn" type="reset">Delete</button>
    <button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
    </button>
  </header>
  <section class="event__details">
    <section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>
      <div class="event__available-offers">
        ${generateOffersGroup(offers)}
      </div>
      </section>
    <section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      <p class="event__destination-description">${getRandomDestination().description}</p>

      <div class="event__photos-container">
        <div class="event__photos-tape">
          ${generateDestinationPhotosGroup(getRandomDestination(destination).pictures)}
        </div>
      </div>
    </section>
  </section>
</form>
</li>`;
};

export default class EditFormView {
  constructor(point) {
    this.point = point;
  }

  getTemplate() {
    return createEditFormTemplate(this.point);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
