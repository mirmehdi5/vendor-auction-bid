<template>
  <div>
    <div class="title-container ten-percent-padding-bottom">
      <h2 class="title">Quote Submission Form</h2>
    </div>
    <div>
      <h4 class="title ten-percent-padding-bottom">{{mainData.title}}</h4>
    </div>
    <div class="job-info-section">
      <div>
        <b>CP Number</b>
        <p>{{mainData.cpNumber}}</p>
      </div>
      <div>
        <b>VOR Category</b>
        <p>{{mainData.vorCategory}}</p>
      </div>
      <div>
        <b>Quote Due Date</b>
        <p>{{mainData.quoteDueDate}}</p>
      </div>
      <hr class="greyLine">
      <div class="ten-percent-padding-bottom">
        <b>You stated the following :</b>
      </div>
      <ul>
        <li>
          <p>
            You
            <span v-if="mainData.deadline === '0' ">cannot</span>
            <span v-if="mainData.deadline === '1' ">can</span> meet the delivery date of May 11,2019
          </p>
          <div class="option-details" v-show="mainData.deadline === '0'">
            <div>Best Date</div>
            <div>{{mainData.nextBestDate}}</div>
            <div>Reason</div>
            <div>Some members on our team are on vacation</div>
          </div>
        </li>
        <li>
          <p>
            You
            <span v-if="mainData.stock === '0' ">cannot</span>
            <span v-if="mainData.stock === '1' ">can</span>
            meet the delivery date of {{mainData.deliveryDate}}
          </p>
          <div class="option-details" v-show="mainData.stock === '0'">
            <div>Reason</div>
            <div>We ran out of wasaga. However, we can provide an alternative called tree-free paper that is similar in characteristics</div>
          </div>
        </li>
      </ul>

      <hr class="greyLine">
      <div v-for="(item,index) in mainData.items" :key="index">
        <div class="ten-percent-padding-bottom">
          <b>{{item.itemIndex}}</b>
        </div>
        <b-container class="list-quotations">
          <b-row>
            <b-col>Product Cost:</b-col>
            <b-col>
              <span v-if="item.productCost ===''">N/A</span>
              <span v-else>{{item.productCost}}</span>
            </b-col>
          </b-row>
          <b-row>
            <b-col>Shipping Cost:</b-col>
            <b-col>
              <span v-if="item.shippingCost ===''">N/A</span>
              <span v-else>{{item.shippingCost}}</span>
            </b-col>
          </b-row>
          <b-row>
            <b-col>Total Cost:</b-col>
            <b-col>
              <span v-if="item.totalCost ===''">N/A</span>
              <span v-else>{{item.totalCost}}</span>
            </b-col>
          </b-row>
        </b-container>
      </div>
      <div v-if="mainData.file !== null">
        <b>You have attached the following:</b>
        <div>
          <img src="../assets/file.png">
          <label class="remove-attachment">{{mainData.file.name}}</label>
        </div>
      </div>
    </div>
    <hr class="greyLine">
    <div>
      <h4 class="title ten-percent-padding-bottom">Vendor Agreement</h4>
    </div>
    <div>
      <p>
        By clicking
        <b>Submit</b>, you
        <b>certify</b> that this bid accurately represents the price that will be charged for the said project and is based on the embedded Specification Sheet. You also acknowledge that the price will not change unless there is a scope change from what was originally quoted, and you receive written approval from an authorized ministry representative for the additional charges.
      </p>
    </div>

    <div class="top-margin">
      <div class="five-percent-padding-bottom">
        <label class="font-bold">
          Email Address
          <span class="required">*</span>
        </label>
      </div>
      <input class="col-xs-4 quote-text" v-model="mainData.email">
    </div>
    <div class="float-center">
      <router-link
        class="button back-button float-left"
        :to="{ name: 'Quote', params: { jobData: mainData}}"
        @click.native="beforePrev()"
      >Back</router-link>
      <router-link
        class="button float-right"
        :to="{ name: 'ThankYou', params: {
          jobData: mainData
        }}"
        @click.native="SubmitClick()"
      >Submit</router-link>
    </div>
  </div>
</template>
<script>
export default {
  name: "Summary",
  data() {
    return {
      mainData: {}
    };
  },
  created() {
    this.mainData = this.$route.params.jobData;
    this.mainData.title = "Summary of Submission";
  },
  mounted () {
    this.$nextTick(function () {
      let emailJSscript = document.createElement('script')
      emailJSscript.setAttribute('src', 'https://cdn.emailjs.com/sdk/2.2.4/email.min.js')
      document.head.appendChild(emailJSscript)
    })
  },
  methods: {
    beforePrev() {
      return this.mainData;
    },
    SubmitClick() {
    this.mainData.items.forEach(function(item){
       if (item.productCost === '') {
         item.productCost = 'N/A'
       }
       if (item.shippingCost === '') {
         item.shippingCost = 'N/A'
       }
       if (item.totalCost === '') {
         item.totalCost = 'N/A'
       }
    })
     event.preventDefault ()
     emailjs.init('user_TRGBfJzibdtWu0QS4hTJN')
     emailjs.send(
          'default_service',//get this from emailjs dashboard
          'bidform',//get this from emailjs dashboard
          {email: this.mainData.email, cpNumber: this.mainData.cpNumber, vorCategory: this.mainData.vorCategory, quoteDueDate: this.mainData.quoteDueDate,
          totalCost1: this.mainData.items[0].totalCost,
          shippingCost1: this.mainData.items[0].shippingCost, productCost1: this.mainData.items[0].productCost,
          totalCost2: this.mainData.items[1].totalCost,
          shippingCost2: this.mainData.items[1].shippingCost, productCost2: this.mainData.items[1].productCost,totalCost3: this.mainData.items[2].totalCost,
          shippingCost3: this.mainData.items[2].shippingCost, productCost3: this.mainData.items[2].productCost,
          }
        ).then((response) => {
          this.formSubmitted = true
          this.isLoading = false
          console.log('SUCCESS You just sent an email...', response)
        }, (error) => {
          console.log('FAILED Throw an error to user...', error)
          this.isLoading = false
      })
    }
  }
}
</script>
