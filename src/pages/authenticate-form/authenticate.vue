<style lang="scss">
.btn-group {
  padding: 10px 0;
}
</style>

<template lang="html">
  <div>
    <h4>托管艺术品鉴定申请单</h4>
    <div class="btn-group btn-group-lg">
      <button type="button" class="btn btn-primary">新单据</button>
      <button type="button" class="btn btn-primary">保存</button>
      <button type="button" class="btn btn-primary">打印鉴定申请单</button>
      <button type="button" class="btn btn-primary">打印鉴定编号(条码)</button>
      <button type="button" class="btn btn-primary">打印鉴定流转单</button>
      <button type="button" class="btn btn-primary">打印鉴定结果</button>
    </div>
    <div>
      <div class="form-group row">
        <div class="col-md-4">
          <label>申请单号</label>
          <input type="text" class="form-control" v-model="applyCode">
        </div>
        <div class="col-md-4">
          <label>预约号</label>
          <input type="text" class="form-control" v-model="orderCode">
        </div>
      </div>
      <hr/>
      <div class="row">
        <div class="form-group col-md-4">
          <label>客户账号</label>
          <input type="text" class="form-control" v-model="clientAccount">
        </div>
        <div class="form-group col-md-4">
          <label>客户姓名</label>
          <input type="text" class="form-control" v-model="clientName">
        </div>
        <div class="form-group col-md-4">
          <label>客户证件号</label>
          <input type="text" class="form-control" v-model="clientCertification">
        </div>
        <div class="form-group col-md-4">
          <label>客户电话</label>
          <input type="text" class="form-control" v-model="clientPhone">
        </div>
        <div class="form-group col-md-4">
          <label>登记时间</label>
          <input type="text" class="form-control" v-model="registerTime">
        </div>
        <div class="form-group col-md-4">
          <label>机构名称</label>
          <input type="text" class="form-control" v-model="companyName">
        </div>
        <div class="form-group col-md-4">
          <label>交付方式</label>
          <select class="form-control" v-model="deliveryType">
            <option value="option">托管人</option>
            <option value="option">受托人</option>
          </select>
        </div>
      </div>
      <hr/>
      <div class="row">
        <div class="form-group col-md-4 form-group--inline">
          <label>艺术品名称</label>
          <input type="text" class="form-control" v-model="productName">
        </div>
        <div class="form-group col-md-4">
          <label>最小单位</label>
          <input type="text" class="form-control" v-model="productUnit">
        </div>
        <div class="form-group col-md-4">
          <label>艺术品代码</label>
          <input type="text" class="form-control" v-model="productCode">
        </div>
        <div class="form-group col-md-4">
          <label>预约数量</label>
          <input type="text" class="form-control" v-model="orderNum">
        </div>
      </div>
      <hr/>
      <div class="row">
        <div class="form-group col-md-4">
          <label>清点数量</label>
          <input type="text" class="form-control" v-model="auctualNum">
        </div>
        <div class="form-group col-md-4">
          <label>挂牌价</label>
          <input type="text" class="form-control" v-model="productPrice">
        </div>
        <div class="form-group col-md-4">
          <label>鉴定费率&金额</label>
          <div class="input-combine">
            <input type="text" class="form-control" v-model="authenticateRate">
            <input type="text" class="form-control" v-model="authenticateMoney">
          </div>
        </div>
        <div class="form-group col-md-4">
          <label>合格数量</label>
          <input type="text" class="form-control" v-model="qualifiedNum">
        </div>
        <div class="form-group col-md-4">
          <label>退回数量</label>
          <input type="text" class="form-control" v-model="backNum">
        </div>
        <div class="form-group col-md-4">
          <label>挂牌费率&金额</label>
          <div class="input-combine">
            <input type="text" class="form-control" v-model="productPriceRate">
            <input type="text" class="form-control" v-model="productPriceMoney">
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  data () {
    return {
      applyCode: 1001,
      orderCode: 2305,
      clientAccount: 1230,
      clientName: '王三',
      clientCertification: '12344121569854',
      clientPhone: 13541456985,
      registerTime: '2016-11-18 14:22',
      companyName: '上文引力',
      deliveryType: 0,
      productName: '航天钞',
      productCode: 1433431,
      productUnit: '枚',
      orderNum: 1000,
      auctualNum: 1000,
      productPrice: 100,
      qualifiedNum: 1000,
      backNum: 0,
      authenticateRate: 0.01,
      authenticateMoney: 100,
      productPriceRate: 0.03,
      productPriceMoney: 100
    }
  },
  computed: {},
  mounted () {},
  attached () {},
  methods: {},
  components: {}
}
</script>
