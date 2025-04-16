<template>
    <div class="content">
        <div class="anchor">订单信息</div>
        <div>
            <van-field
                v-model="form.orderType"
                label="订单类型"
                disabled
                placeholder="请选择订单类型"
                class="customer_content"
                @click="model.orderTypeModel = true"
            />
            <van-field
                v-model="form.depositAmount"
                label="定金金额"
                placeholder="请输入定金金额"
                class="customer_content"
                @input="depositAmountInput"
                :disabled ="form2.orderType !=2"
                type="number"
            />
            <van-field
                v-model="form.appointmentHospitalId"
                label="预约门店"
                disabled
                placeholder="请选择预约门店"
                class="customer_content"
                @click="model.appointmentHospitalIdModel = true"
            />
            <van-field
                v-model="form.orderSource"
                label="订单来源"
                disabled
                placeholder="请选择订单来源"
                class="customer_content"
                @click="model.orderSourceModel = true"
            />
            <van-field
                v-model="form.getCustomerType"
                label="获客方式"
                disabled
                placeholder="请选择获客方式"
                class="customer_content"
                @click="model.getCustomerTypeModel = true"
            />
            <van-field
                v-model="form.customerType"
                label="客户类型"
                disabled
                placeholder="请选择客户类型"
                class="customer_content"
                @click="model.customerTypeModel = true"
            />
            <van-field
                v-model="form.customerSource"
                label="客户来源"
                disabled
                placeholder="请选择客户来源"
                class="customer_content"
                @click="model.customerSourceModel = true"
            />
            <van-field
                v-model="form.consultationType"
                label="面诊状态"
                disabled
                placeholder="请选择面诊状态"
                class="customer_content"
                @click="model.consultationTypeModel = true"
            />
            <van-field
                v-model="form.belongMonth"
                label="归属月份"
                disabled
                placeholder="请选择归属月份"
                class="customer_content"
                @click="model.belongMonthModel = true"
            />
            <van-field
                v-model="form.addOrderPrice"
                label="下单金额"
                placeholder="请输入下单金额"
                class="customer_content"
                @input="addOrderPriceInput"
                type="number"
                disabled
            />
            <van-field
                v-model="form.belongCompanyEnumId"
                label="归属公司"
                disabled
                @click="model.belongCompanyEnumIdModel = true"
                placeholder="请选择归属公司"
                class="customer_content"
            />
        </div>
        <div>
            <van-popup v-model="model.getCustomerTypeModel" round position="bottom">
                <van-picker
                    show-toolbar
                    :columns="list.getCustomerTypeName"
                    @cancel="model.getCustomerTypeModel = false"
                    @confirm="getCustomerTypeConfirm"
                />
            </van-popup>
             <!-- 客户类型 -->
            <van-popup v-model="model.customerTypeModel" round position="bottom">
                <van-picker
                    show-toolbar
                    :columns="list.getcustomerTypeListNames"
                    @cancel="model.customerTypeModel = false"
                    @confirm="customerTypeConfirm"
                />
            </van-popup>
            <!-- 客户来源 -->
            <van-popup v-model="model.customerSourceModel" round position="bottom">
                <van-picker
                    show-toolbar
                    :columns="list.getcustomerSourceListNames"
                    @cancel="model.customerSourceModel = false"
                    @confirm="customerSourceConfirm"
                />
            </van-popup>
            <!-- 归属公司 -->
            <van-popup
                v-model="model.belongCompanyEnumIdModel"
                round
                position="bottom"
                >
                <van-picker
                    show-toolbar
                    :columns="list.belongCompanyEnumIdListName"
                    @cancel="model.belongCompanyEnumIdModel = false"
                    @confirm="belongCompanyEnumIdConfirm"
                >
                </van-picker>
            </van-popup>
            <van-popup v-model="model.orderTypeModel" round position="bottom">
                <van-picker
                    show-toolbar
                    :columns="list.orderTypesName"
                    @cancel="model.orderTypeModel = false"
                    @confirm="orderTypeConfirm"
                />
            </van-popup>
            <van-popup v-model="model.orderSourceModel" round position="bottom">
                <van-picker
                    show-toolbar
                    :columns="list.orderSourcesName"
                    @cancel="model.orderSourceModel = false"
                    @confirm="orderSourceConfirm"
                />
            </van-popup>
            <van-popup v-model="model.consultationTypeModel" round position="bottom">
                <van-picker
                    show-toolbar
                    :columns="list.orderConsultationTypesName"
                    @cancel="model.consultationTypeModel = false"
                    @confirm="orderConsultationTypesConfirm"
                />
            </van-popup>
            <van-popup v-model="model.belongMonthModel" round position="bottom">
                <van-picker
                    show-toolbar
                    :columns="list.belongMonthListName"
                    @cancel="model.belongMonthModel = false"
                    @confirm="belongMonthListConfirm"
                />
            </van-popup>

            <van-popup v-model="model.appointmentHospitalIdModel" round position="bottom">
                <van-picker
                    show-toolbar
                    :columns="searchColumns"
                    @cancel="model.appointmentHospitalIdModel = false"
                    @confirm="appointmentHospitalIdConfirm"
                >
                <!-- 添加模糊搜素 -->
                <template #title>
                    <van-field
                        v-model="searchKey"
                        placeholder="请输入医院进行搜索"
                        clearable
                        style="width:200px"
                    />
                </template>
                </van-picker>
            </van-popup>
        </div>
        <div class="bottom">
            <van-button round block type="info"  class="button" @click="prevStep">上一步</van-button>
            <van-button round block type="info"  class="button" @click="nextStep">下一步</van-button>
        </div>
    </div>
</template>
<script>
import * as api from "@/api/order.js";
import * as smallYellowCarRegistrationApi from "@/api/smallYellowCarRegistration.js";

export default {
    props:{
        active:Number,
        anchorCustomerServiceMessage:Object
    },
    data(){
        return{
            // 模糊搜索
            searchKey:'',
            searchColumns:[],
            // 用于页面展示
            form:{
                // 订单类型
                orderType:null,
                // 定金金额
                depositAmount:null,
                // 预约门店
                appointmentHospitalId:null,
                // 订单来源
                orderSource:null,
                // 面诊状态
                consultationType:null,
                // 归属月份
                belongMonth:null,
                // 下单金额
                addOrderPrice:null,
                // 获客方式
                getCustomerType:null,
                // 客户类型
                customerType:null,
                // 客户来源
                customerSource:null,
                // 归属公司
                belongCompanyEnumId:null,
            },
            // 用于传给接口id
            form2:{
                // 订单类型
                orderType:null,
                // 定金金额
                depositAmount:null,
                // 预约门店
                appointmentHospitalId:null,
                // 订单来源
                orderSource:null,
                // 面诊状态
                consultationType:null,
                // 归属月份
                belongMonth:null,
                // 下单金额
                addOrderPrice:null,
                // 获客方式
                getCustomerType:null,
                // 客户类型
                customerType:null,
                // 客户来源
                customerSource:null,
                // 归属公司
                belongCompanyEnumId:null,
            },
            // 获取接口数据
            joggle:{
                // 订单类型
                orderTypes:[],
                // 订单来源
                orderSources:[],
                // 面诊状态
                orderConsultationTypes:[],
                // 归属月份
                belongMonthList:[
                    {
                        id:0,
                        name:'当月'
                    },
                    {
                        id:1,
                        name:'历史'
                    }
                ],
                // 医院
                hospitalInfo:[],
                // 获客方式
                getCustomerTypeList:[],
                // 客户类型
                customerType:null,
                // 客户来源
                customerSource:null,
                getcustomerSourceList:[],
                // 归属公司
                belongCompanyEnumIdList:[]
            },
            // model
            model:{
                // 订单类型
                orderTypeModel:false,
                appointmentHospitalIdModel:false,
                orderSourceModel:false,
                consultationTypeModel:false,
                belongMonthModel:false,
                getCustomerTypeModel:false,
                customerTypeModel:false,
                customerSourceModel:false,
                belongCompanyEnumIdModel:false
            },
            // 用于页面展示数据
            list:{
                orderTypesName:[],
                orderSourcesName:[],
                orderConsultationTypesName:[],
                belongMonthListName:['当月','历史'],
                appointmentHospitalIdName:[],
                getCustomerTypeName:[],
                getcustomerTypeListNames:[],
                getcustomerSourceListNames:[],
                belongCompanyEnumIdListName:[]
            },
        }

    },
    methods:{
        // 归属公司
        belongCompanyEnumIdConfirm(value) {
            this.form.belongCompanyEnumId = value;
            this.model.belongCompanyEnumIdModel = false;
            this.form2.belongCompanyEnumId = this.joggle.belongCompanyEnumIdList.find((item) => value == item.name).id;
        },
        // 获客归属公司
        getbelongCompanyEnumIdListClick() {
            smallYellowCarRegistrationApi.getBelongCompanyList().then((res) => {
                if (res.code === 0) {
                const { belongCompanyList } = res.data;
                this.joggle.belongCompanyEnumIdList = belongCompanyList;
                this.list.belongCompanyEnumIdListName = belongCompanyList.map(
                    (item) => item.name
                );
                }
            });
        },
        prevStep(){
            this.$emit('edidActive2',{
                active:0,
                // anchorCustomerServiceMessage:{
                //     // 订单类型
                //     orderType:null,
                //     // 定金金额
                //     depositAmount:null,
                //     // 预约门店
                //     appointmentHospitalId:null,
                //     // 订单来源
                //     orderSource:null,
                //     // 面诊状态
                //     consultationType:null,
                //     // 归属月份
                //     belongMonth:null,
                //     // 下单金额
                //     addOrderPrice:null
                // },
            })
        },
        nextStep(){
            const {orderType,depositAmount,appointmentHospitalId,orderSource,consultationType,belongMonth,addOrderPrice,getCustomerType,customerType,customerSource} = this.form
            if(!orderType){
                this.$toast("请选择订单类型");
                return
            }
            if(orderType == '定金订单'){
                if(!depositAmount){
                    this.$toast("请输入定金金额");
                    return
                }
            }
            // if(depositAmount==2){
            //     this.$toast("请输入定金金额");
            //     return
            // }
            if(!appointmentHospitalId){
                this.$toast("请选择预约门店");
                return
            }
            if(!orderSource){
                this.$toast("请选择订单来源");
                return
            }
            if(!consultationType){
                this.$toast("请选择面诊状态");
                return
            }
            if(getCustomerType == null || getCustomerType == ''){
                this.$toast("请选择获客方式");
                return
            }
            if(customerType == null || customerType == ''){
                this.$toast("请选择客户类型");
                return
            }
            if(customerSource == null || customerSource == ''){
                this.$toast("请选择客户来源");
                return
            }
            if(!belongMonth){
                this.$toast("请选择归属月份");
                return
            }
             if(!addOrderPrice){
                this.$toast("请输入下单金额");
                return
            }
            if(this.form2.belongCompanyEnumId == null){
                this.$toast("请选择归属公司");
                return
            }

            // this.$emit('edidActive',2)
            this.$emit('edidActive2',{
                active:2,
                anchorCustomerServiceMessage:this.form2
            })
            // sessionStorage.setItem('orderFormName',JSON.stringify(this.form))
            // sessionStorage.setItem('orderFormId',JSON.stringify(this.form2))
        },
        // 获客方式列表
        getshoppingCartGetCustomerTypeList() {
            api.shoppingCartGetCustomerTypeList().then((res) => {
                this.joggle.getCustomerTypeList =res.data.typeList;
                let getCustomerTypeName=[]
                this.joggle.getCustomerTypeList.map(item=>{
                    getCustomerTypeName.push(item.name)
                })
                this.list.getCustomerTypeName = getCustomerTypeName
            
            });
        },
        // 客户类型
        getcustomerTypeList() {
            api.customerTypeList().then((res) => {
                this.joggle.getcustomerTypeList =res.data.sourceList;
                let getcustomerTypeListName=[]
                this.joggle.getcustomerTypeList.map(item=>{
                    getcustomerTypeListName.push(item.name)
                })
                this.list.getcustomerTypeListNames = getcustomerTypeListName
            
            });
        },
        // 客户来源
        getcustomerSourceList() {
            const data = {
                contentPlatFormId:JSON.parse(sessionStorage.getItem('anchorFormId')).contentPlateFormId,
                channel:JSON.parse(sessionStorage.getItem('anchorFormId')).belongChannel
            }
            api.customerSourceList(data).then((res) => {
                this.joggle.getcustomerSourceList =res.data.sourceList;
                let getcustomerSourceListName=[]
                this.joggle.getcustomerSourceList.map(item=>{
                    getcustomerSourceListName.push(item.name)
                })
                this.list.getcustomerSourceListNames = getcustomerSourceListName
            
            });
        },
        // 获取订单类型
        getCustomerServiceNameList() {
            api.contentPlateFormOrderTypeList().then((res) => {
                this.joggle.orderTypes =res.data.orderTypes;
                let orderTypesName=[]
                this.joggle.orderTypes.map(item=>{
                    orderTypesName.push(item.name)
                })
                this.list.orderTypesName = orderTypesName
            
            });
        },
        // 获取订单来源
        getcontentPlateFormOrderSourceList() {
            api.contentPlateFormOrderSourceList().then((res) => {
                this.joggle.orderSources =res.data.orderSources;
                let orderSourcesName=[]
                this.joggle.orderSources.map(item=>{
                    orderSourcesName.push(item.name)
                })
                this.list.orderSourcesName = orderSourcesName
            
            });
        },
        // 获取面诊状态
        getOrderConsultationTypeLists() {
            api.getOrderConsultationTypeList().then((res) => {
                this.joggle.orderConsultationTypes =res.data.orderConsultationTypes;
                let orderConsultationTypesName=[]
                this.joggle.orderConsultationTypes.map(item=>{
                    orderConsultationTypesName.push(item.name)
                })
                this.list.orderConsultationTypesName = orderConsultationTypesName
            
            });
        },
        // 获取医院
        getHospitalInfo() {
            api.HospitalInfo().then((res) => {
                this.joggle.hospitalInfo =res.data.hospitalInfo;
                let appointmentHospitalIdName=[]
                this.joggle.hospitalInfo.map(item=>{
                    appointmentHospitalIdName.push(item.name)
                })
                this.list.appointmentHospitalIdName = appointmentHospitalIdName
                this.searchColumns = appointmentHospitalIdName
            
            });
        },
        getCustomerTypeConfirm(value){
            this.form.getCustomerType = value;
            this.model.getCustomerTypeModel = false;
            // 取id
            this.joggle.getCustomerTypeList.map((item) => {
                if (item.name == value) {
                this.form2.getCustomerType = item.id;
                }
            });
        },
         // 客户类型
        customerTypeConfirm(value){
            this.form.customerType = value;
            this.model.customerTypeModel = false;
            // 取id
            this.joggle.getcustomerTypeList.map((item) => {
                if (item.name == value) {
                this.form2.customerType = item.id;
                }
            });
        },
        // 客户来源
        customerSourceConfirm(value){
            this.form.customerSource = value;
            this.model.customerSourceModel = false;
            // 取id
            this.joggle.getcustomerSourceList.map((item) => {
                if (item.name == value) {
                this.form2.customerSource = item.id;
                }
            });
        },
        // 
        orderSourceConfirm(value){
            this.form.orderSource = value;
            this.model.orderSourceModel = false;
            // 取id
            this.joggle.orderSources.map((item) => {
                if (item.name == value) {
                this.form2.orderSource = item.id;
                }
            });
        },
        orderTypeConfirm(value){
            this.form.orderType = value;
            this.model.orderTypeModel = false;
            if(value != 2){
                this.form.depositAmount = null
                this.form2.depositAmount = null
            }
            // 取id
            this.joggle.orderTypes.map((item) => {
                if (item.name == value) {
                this.form2.orderType = item.id;
                }
            });
        },
        orderConsultationTypesConfirm(value){
            this.form.consultationType = value;
            this.model.consultationTypeModel = false;
            // 取id
            this.joggle.orderConsultationTypes.map((item) => {
                if (item.name == value) {
                this.form2.consultationType = item.id;
                }
            });
        },
        belongMonthListConfirm(value){
            this.form.belongMonth = value;
            this.model.belongMonthModel = false;
            this.form2.belongMonth = value == '当月' ? 0 : 1;
               
        },
        appointmentHospitalIdConfirm(value){
            this.form.appointmentHospitalId = value;
            this.model.appointmentHospitalIdModel = false;
            this.searchKey = ''
            this.searchColumns = []
            // 取id
            this.joggle.hospitalInfo.map((item) => {
                if (item.name == value) {
                this.form2.appointmentHospitalId = item.id;
                }
            });
        },
        depositAmountInput(value){
            this.form.depositAmount = value
            this.form2.depositAmount = value
        },
        addOrderPriceInput(value){
            this.form.addOrderPrice = value
            this.form2.addOrderPrice = value
        },
    },
    created(){
        this.getCustomerServiceNameList()
        this.getcontentPlateFormOrderSourceList()
        this.getOrderConsultationTypeLists()
        this.getHospitalInfo()
        this.getshoppingCartGetCustomerTypeList()
        this.getcustomerTypeList()
        this.getcustomerSourceList()
        this.getbelongCompanyEnumIdListClick()
        const {orderType,orderTypeText,depositAmount,appointmentHospitalId,appointmentHospitalName,orderSource,orderSourceText,consultationType,consultationTypeText,belongMonth,addOrderPrice,getCustomerType,getCustomerTypeText,customerSource,customerSourceText,customerType,customerTypeText,belongCompanyEnumId,belongCompanyName} = this.$route.query.orderInfo
        console.log(this.$route.query.orderInfo)
        this.form.orderType = orderTypeText
        this.form2.orderType = orderType
        this.form.depositAmount = depositAmount
        this.form2.depositAmount = depositAmount
        this.form.appointmentHospitalId = appointmentHospitalName
        this.form2.appointmentHospitalId = appointmentHospitalId
        this.form.orderSource = orderSourceText
        this.form2.orderSource = orderSource
        this.form.consultationType = consultationTypeText
        this.form2.consultationType = consultationType
        this.form.belongMonth = belongMonth == 0 ? '当月' : '历史'
        this.form2.belongMonth = belongMonth
        this.form.addOrderPrice = addOrderPrice
        this.form2.addOrderPrice = addOrderPrice
        this.form.getCustomerType = getCustomerTypeText
        this.form2.getCustomerType = getCustomerType
        this.form.customerType = customerTypeText
        this.form2.customerType = customerType
        this.form.belongCompanyEnumId = belongCompanyName
        this.form2.belongCompanyEnumId = belongCompanyEnumId
        // if(customerSource){
            this.form.customerSource = customerSourceText
            this.form2.customerSource = customerSource
        // }
        this.isPrice = sessionStorage.getItem('isPrice')
    },
     watch: {  //实时监听搜索输入内容
        searchKey: function () {
            let key = String( this.searchKey );
            key =  key.replace( /\s*/g, "" );//去除搜索内容中的空格
            const reg =  new RegExp( key, "ig" );//匹配规则-i：忽略大小写，g：全局匹配
            /* 进行筛选，将筛选后的数据放入新的数组中，‘name’键可根据需要搜索的key进行调整 */
            this.searchColumns = this.list.appointmentHospitalIdName.filter( item => item.match( reg ) !=null );
        }
    }
}
</script>

<style scoped lang="less">
.content{
    width: 92%;
    background: #fff;
    // height: 350px;
    margin: 20px auto 0;
    border-radius: 10px;
    box-shadow: 10px 10px 10px rgba(0, 0.5);
    padding: 10px;
    box-sizing: border-box;
    .anchor {
        border-left: 3px solid #eacebf;
        font-size: 16px;
        font-weight: bold;
        padding-left: 5px;
        box-sizing: border-box;
        height: 17px;
        line-height: 17px;
        color: #5492fe;
        margin-bottom: 10px;
    }
    .customer_content {
        border-bottom: 1px solid #bbd3ff;
        padding: 10px 0;
        box-sizing: border-box;
        /deep/.van-cell__title,
        .van-field__label {
        width: 70px;
        color: #5492fe;
        }
    }
    .bottom{
        display: flex;
        margin-top: 20px;
        .button{
            width: 40%;
            height: 42px;
            margin:0 auto
        }
    }
}
</style>