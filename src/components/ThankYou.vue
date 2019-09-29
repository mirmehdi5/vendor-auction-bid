<template>
<div>
    <div class="font-bold">
        Thank you for your submssion!
    </div>
    <div>
        You will soon receive a confirmation email detailing your quotation.
    </div>
    </div>
</template>

<script>
export default {
  name: "ThankYou",
  data() {
    return {
      mainData: {},
    };
  },
  created() {
    this.mainData = this.$route.params.jobData
  }
};
</script>