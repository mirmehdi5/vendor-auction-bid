<template>
  <div>
    <div class="title-container ten-percent-padding-bottom">
      <h2 class="title">Quote Submission Form</h2>
      <p class="notes">
        All mandatory fields are marked with an asterisk.
        <span class="required">*</span>
      </p>
    </div>
    <div>
      <h4 class="title ten-percent-padding-bottom">Delivery and Stock</h4>
    </div>
    <div>
      <p class="question-block-text">
        Can you meet the job delivery date of
        <strong class="font-bold">{{deliveryDate}}</strong>?
        <span class="required">*</span>
      </p>
      <input
        class="radio-button"
        id="yesDelivery"
        type="radio"
        v-model="mainData.deadline"
        value="1"
      >
      <label for="yesDelivery">Yes</label>
      <input
        class="radio-button"
        id="noDelivery"
        type="radio"
        v-model="mainData.deadline"
        value="0"
      >
      <label for="noDelivery">No</label>
    </div>
    <div class="reasons-container" v-show="mainData.deadline === '0'">
      <div class="ten-percent-margin-top border-left option-details">
        <p class="sub-headings ten-percent-padding-bottom">Please indicate why not.</p>
        <input
          class="radio-button"
          id="stockLeadTime"
          type="radio"
          v-model="mainData.reasons"
          value="stockLeadTime"
        >
        <label for="stockLeadTime">Stock leadtime</label>
        <br>
        <br>
        <input
          class="radio-button"
          id="overCapacity"
          type="radio"
          v-model="mainData.reasons"
          value="overCapacity"
        >
        <label for="overCapacity">Over capacity</label>
        <br>
        <br>
        <input class="radio-button" type="radio" v-model="mainData.reasons" value="otherReasons">
        <label for="otherReasons">Other reason</label>

        <div class="ten-percent-padding-top" v-show="mainData.reasons === 'otherReasons'">
          <p class="sub-headings">Indicate your reasons</p>
          <textarea
            class="other-reasons border-style-textarea full-width"
            v-model="mainData.otherReasons"
          />
        </div>

        <div>
          <p class="sub-headings ten-percent-padding-top">Provide your best date.</p>
          <input class="calendar border-style-textarea" type="date" v-model="mainData.nextBestDate">
          <img class="calendar-image" :src="calendar">
        </div>
      </div>
    </div>
    <div class="ten-percent-padding-top">
      <div class="ten-percent-padding-bottom">
        <p class="sub-headings">
          Can you provide the correct stock or material?
          <span class="required">*</span>
        </p>
        <input class="radio-button" id="yesStock" type="radio" v-model="mainData.stock" value="1">
        <label for="yesStock">Yes</label>
        <input class="radio-button" type="radio" v-model="mainData.stock" value="0">
        <label for="noStock">No</label>
      </div>
    </div>
    <div class="option-details" v-show="mainData.stock === '0'">
      <p class="sub-headings">Indicate your reason.</p>
      <textarea
        class="other-reasons border-style-textarea full-width"
        v-model="mainData.alternative"
      />
    </div>
    <div class="ten-percent-padding-top">
      <div class="float-center">
        <router-link
          class="button back-button float-left"
          :to="{ name: 'Home', params: { cpNumber: mainData.cpNumber, vorCategory: mainData.vorCategory, quoteDueDate: mainData.quoteDueDate, options: mainData.options} }"
        >Back</router-link>
        <router-link
          class="button float-right"
          :to="{ name: 'Quote', params: { jobData: mainData}}"
        >Next</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import calendar from "../assets/small-calendar.png";
export default {
  name: "DeliveryAndStock",
  data() {
    return {
      mainData: {},
      calendar: calendar,
      deliveryDate: "May 11,2019"
    };
  },
  created() {
    this.mainData = this.$route.params.jobData;
    this.mainData.deliveryDate = this.deliveryDate;
  }
};
</script>

