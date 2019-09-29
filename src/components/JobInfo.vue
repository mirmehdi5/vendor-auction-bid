<template>
  <div>
    <div class="ten-percent-padding-bottom">
      <h2 class="title">Quote Submission Form</h2>
    </div>
    <div class="details-container">
      <h4 class="title ten-percent-padding-bottom">Job Information</h4>
      <p class="font-bold ten-percent-padding-top">CP Number</p>
      <P>{{mainData.cpNumber}}</P>
      <p class="font-bold ten-percent-padding-top">VOR Category</p>
      <p>{{mainData.vorCategory}}</p>
      <p class="font-bold ten-percent-padding-top">Quote Due Date</p>
      <p>{{mainData.quoteDueDate}}</p>
    </div>
    <div class="float-center">
      <router-link
        class="button float-right"
        :to="{ name: 'DeliveryAndStock', params: { jobData: mainData }}"
      >Next</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "JobInformation",
  data: function() {
    return {
      mainData: {}
    };
  },
  created() {
    this.mainData.cpNumber = this.$route.params.cpNumber
    this.mainData.vorCategory = this.$route.params.vorCategory
    this.mainData.quoteDueDate = this.$route.params.quoteDueDate
    this.mainData.options = this.$route.params.options
    this.mainData.summaryFlag = false
  }
};
</script>
