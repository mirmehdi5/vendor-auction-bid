<template>
  <div>
    <div class="title-container ten-percent-padding-bottom">
      <h2 class="title">Quote Submission Form</h2>
    </div>
    <div>
      <h4 class="title ten-percent-padding-bottom">{{mainData.title}}</h4>
    </div>
    <div class="job-info-section">
      <div class="option-select-box">
        <p class="message-padding">If you wish to <span class="font-bold">not bid</span> on any option(s), <span class="font-bold">unselect</span> the appropriate box(es) :</p>
        <div class="option-padding" v-for="(item,index) in mainData.items" :key="index">
          <label class="container font-bold">
          <input type="checkbox" :value="item.itemIndex" v-model="checkedOptions">
          <span class="checkmark border-radius"></span>
          {{item.itemIndex}}</label>
        </div>
      </div>
      <div class="top-margin" v-for="(item,index) in mainData.items" :key="index">
        <div class="option-header ten-percent-padding-bottom">
          <label>{{item.itemIndex}} </label>
        </div>
        
        <div class="option-details" v-if="(checkedOptions.includes(item.itemIndex))">
          <div class="ten-percent-padding-bottom">
            <div class="five-percent-padding-bottom">
              <label class="font-bold">Product Cost </label>
            </div>
            <input class="col-xs-4 quote-text" type="number" v-model="item.productCost" size="4" placeholder=" $" />
          </div>
          <div class="ten-percent-padding-bottom"> 
            <div class="five-percent-padding-bottom">
             <label class="ten-percent-padding-top font-bold">Shipping Cost </label>
            </div>
             <input class="col-xs-4 quote-text" type="number" v-model="item.shippingCost" size="4" placeholder=" $" />
          </div>
          <div class="ten-percent-padding-bottom"> 
            <div class="five-percent-padding-bottom">
            <label class="font-bold">Total Cost <span class="required">*</span> </label>
            </div>
            <input class="col-xs-4 quote-text" type="number" v-model="item.totalCost" size="4" placeholder=" $" />
          </div>
          <div class="five-percent-padding-bottom">
          <label class="font-bold">Additional Notes </label>
          </div>
          <textarea class="col-xs-4 quote-text full-height" v-model="item.additionalMessage" />
        </div>
        <div v-else>
          <p>You have unselected this option.</p>
        </div>
      </div>
    </div><br/>
    <div v-if="!mainData.file">
      <div class="five-percent-padding-bottom"> 
        <label class="font-bold"> Attach optional files.</label>
      </div>
      <div class="input-group attachment-box">
        <div class="custom-file">
          <input type="file" class="custom-file-input" @change="onFileChange" id="attachFile">
          <div class='button-holder'>
            <img src='../assets/icons8-attach-50.png' />
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <label> Remove files</label>
      <div class="input-group attachment-box">
        <div class="custom-file">
          <label class="custom-file-input remove-attachment" @click="removeImage" >{{mainData.file.name}}</label>
          <div class='button-holder hide-border'>
            <img src='../assets/close-button.png' />
          </div>
        </div>
      </div>
    </div>
    <div class="float-center">
      <router-link class="button back-button float-left" :to="{ name: 'DeliveryAndStock', params: { jobData: mainData}}">Back</router-link>
       <router-link class="button float-right" :to="{ name: 'Summary', params: { jobData: mainData}}" @click.native="beforeNext()">Next</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Quote',
  data () {
    return {
      mainData: {},
      checkedOptions: []
    }
  },
  created () {
    this.mainData = this.$route.params.jobData
    this.mainData.title = "Quotation Information"
    this.mainData.file = null
    if (this.mainData.summaryFlag === false) {
      this.mainData.items = [{
        productCost: '',
        shippingCost: '',
        totalCost: '',
        additionalMessage: '',
        itemIndex: 'Option 1' }]
      for(let i =0; i < (this.mainData.options-1) ; i++) {
        this.mainData.items.push({ productCost: '', shippingCost: '', totalCost: '', itemIndex: 'Option '+(i+2), additionalMessage: '' })
      }
      for(let i =0; i < (this.mainData.options) ; i++) {
        this.checkedOptions.push('Option '+(i+1))
      }
    }

  },
  methods: {
    beforeNext () {
      this.mainData.summaryFlag = true
      return this.mainData
    },
    removeItem (index) {
      this.mainData.items.splice(index, 1)
      if (this.mainData.items.length === 0) {
        this.mainData.summaryFlag = false
      }
      this.$forceUpdate()
    },
    onFileChange(event) {
      this.mainData.file = event.target.files[0] || event.dataTransfer.files[0]
      console.log(this.mainData.file.name)
      this.$forceUpdate()
    },
    removeImage: function (e) {
      this.mainData.file  = null
      this.$forceUpdate()
    }
  }
}
</script>