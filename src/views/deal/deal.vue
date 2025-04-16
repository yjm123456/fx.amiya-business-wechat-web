<template>  
  <div class="container">
    <div class="content">
        <div class="anchor">成交信息填写</div>
        <div >
            <van-field
                v-model="$route.query.consultatioType"
                label="订单类型"
                disabled
                placeholder="请选择订单类型"
                class="customer_content"
            />
            <div class="switch_content">
                <van-cell center title="是否到院" class="switch_con">
                    <van-switch v-model="form.isToHospital" size="24" class="switch_icon" :disabled="form.isFinish == true" @change="isToHospitalClick(form.isToHospital)"/>
                </van-cell>
            </div>
                <!-- @click="model.lastDealHospitalModel = true" -->
            <van-field
                v-model="form.lastDealHospitalName"
                label="到院医院"
                disabled
                placeholder="请选择到院医院"
                class="customer_content"
                v-if="form.isToHospital == true"
            />
            <van-field
                v-model="form.toHospitalTypeName"
                label="到院类型"
                disabled
                placeholder="请选择到院类型"
                class="customer_content"
                @click="toHospitalTypeClick"
                v-if="form.isToHospital == true"
            />
            <van-field
                v-model="form.toHospitalDate"
                label="到院时间"
                disabled
                placeholder="请选择到院时间"
                class="customer_content"
                @click="toHospitalDateClick"
                v-if="form.isToHospital == true"
            />
            <div class="switch_content">
                <van-cell center title="是否陪诊" class="switch_con" v-if="form.isToHospital == true">
                    <van-switch v-model="form.isAcompanying" size="24" class="switch_icon" />
                </van-cell>
            </div>
            <div class="customer_img">邀约凭证</div>
            <div  class="img_content">
                <div v-for="(item,index) in form.invitationDocuments" :key="index" style="display:flex;">
                <div class="img_item">
                    <viewer v-if="item"  baseLayerPicker ="true" >
                    <img :src="item" alt=""  class="img" >
                    </viewer>
                    <span class="opacity_con"  @click="deletClick2(index)">x</span>
                </div>
                </div>
                <van-uploader :after-read="afterReadClick2" :max-count="5" :max-size="5 * 1024 * 1024" @oversize="onOversize2" :before-read="beforeRead2" v-if="form.invitationDocuments.length<5"/>
            </div>
            <van-field
                v-model="form.fansMeetingName"
                label="粉丝见面会"
                disabled
                placeholder="请选择粉丝见面会"
                class="customer_content"
                @click="fansMeetingClick"
                v-if="form.isToHospital == true"
            />
            <div style="color:red;font-size:13px;margin-bottom:5px" v-if="form.isToHospital == true">非必要不用选</div>
            <div class="switch_content">
                <van-cell center title="是否参加过见面会" class="switch_con" v-if="form.isToHospital == true">
                    <van-switch v-model="form.isFansMeeting" size="24" class="switch_icon" disabled/>
                </van-cell>
            </div>
            <van-field
                v-model="form.fansMeetingProject"
                label="见面会铺垫项目"
                placeholder="请输入见面会铺垫项目"
                class="customer_content"
                type="input"
                v-if="form.isFansMeeting == true"
            />
            <van-field
                v-model="form.followUpContent"
                label="追踪内容"
                placeholder="请输入追踪内容"
                class="customer_content"
                type="input"
                v-if="form.isFansMeeting == true"
            />
            <van-field
                v-model="form.nextAppointmentDate"
                label="下次邀约时间"
                disabled
                placeholder="请选择下次邀约时间"
                class="customer_content"
                @click="nextAppointmentDateClick"
                v-if="form.isFansMeeting == true"
            />
            <div class="switch_content">
                <van-cell center title="是否需要机构再次邀约" class="switch_con" v-if="form.isFansMeeting == true">
                    <van-switch v-model="form.isNeedHospitalHelp" size="24" class="switch_icon" />
                </van-cell>
            </div>
            <div class="switch_content">
            <van-cell center title="是否成交" class="switch_con">
                <van-switch v-model="form.isFinish" size="24" class="switch_icon" @change="isFinishClick(form.isFinish)"/>
            </van-cell>
            </div>
            <van-field
                v-model="form.dealAmount"
                label="成交金额"
                placeholder="请输入成交金额"
                class="customer_content"
                @input="dealAmountInput"
                type="number"
                v-if="form.isFinish == true"
            />
            <van-field
                v-model="form.dealDate"
                label="成交时间"
                disabled
                placeholder="请选择成交时间"
                class="customer_content"
                @click="dealDateClick"
                v-if="form.isFinish == true"
            />
            <van-field
                v-model="form.dealPerformanceTypeName"
                label="业绩类型"
                disabled
                placeholder="请选择业绩类型"
                class="customer_content"
                @click="model.dealPerformanceTypeModel = true"
                v-if="form.isFinish == true"
            />
            <van-field
                v-model="form.consumptionTypeName"
                label="消费类型"
                disabled
                placeholder="请选择消费类型"
                class="customer_content"
                @click="consumptionTypeClick"
                v-if="form.isFinish == true"
            />
            <van-field
                v-model="form.unDealReason"
                label="未成交原因"
                placeholder="请输入未成交原因"
                class="customer_content"
                type="textarea"
                :rows="2"
                v-if="form.isFinish == false"
            />
            <div class="customer_img" v-if="form.isFinish == false">未成交截图</div>
            <div  class="img_content" v-if="form.isFinish == false">
                <div v-for="(item,index) in form.unDealPictureUrl" :key="index" style="display:flex;">
                <div class="img_item">
                    <viewer v-if="item"  baseLayerPicker ="true" >
                    <img :src="item" alt=""  class="img" >
                    </viewer>
                    <span class="opacity_con"  @click="deletClick(index)">x</span>
                </div>
                </div>
                <van-uploader :after-read="afterReadClick" :max-count="1" :max-size="5 * 1024 * 1024" @oversize="onOversize" :before-read="beforeRead" v-if="form.unDealPictureUrl.length<1"/>
            </div>
            <!-- <van-field
                v-model="form.otherContentPlatFormOrderId"
                label="三方单号"
                placeholder="请输入三方单号"
                class="customer_content"
                type="textarea"
                :rows="2"
            /> -->
            <van-field
                v-model="form.lastProjectStage"
                label="后期项目铺垫"
                placeholder="请输入后期项目铺垫"
                class="customer_content"
                type="textarea"
                :rows="4"
            />
            <div class="customer_img" v-if="form.isFinish == true">成交凭证</div>
            <div  class="img_content" v-if="form.isFinish == true">
                <div v-for="(item,index) in form.dealPictureUrl" :key="index" style="display:flex;">
                <div class="img_item">
                    <viewer v-if="item"  baseLayerPicker ="true" >
                    <img :src="item" alt=""  class="img" >
                    </viewer>
                    <span class="opacity_con"  @click="deletClick3(index)">x</span>
                </div>
                </div>
                <van-uploader :after-read="afterReadClick3" :max-count="1" :max-size="5 * 1024 * 1024" @oversize="onOversize3" :before-read="beforeRead3" v-if="form.dealPictureUrl.length<1"/>
            </div>
            
        </div>

        <div>
            <van-popup v-model="model.lastDealHospitalModel" round position="bottom">
                <van-picker
                    show-toolbar
                    :columns="searchColumns"
                    @cancel="model.lastDealHospitalModel = false"
                    @confirm="hospitalInfoConfirm"
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
            <van-popup v-model="model.toHospitalTypeModel" round position="bottom">
                <van-picker
                    show-toolbar
                    :columns="list.orderTypesName"
                    @cancel="model.toHospitalTypeModel = false"
                    @confirm="orderTypesConfirm"
                />
            </van-popup>
            <van-popup v-model="model.fansMeetingModel" round position="bottom">
                <van-picker
                    show-toolbar
                    :columns="list.fansMeetingListName"
                    @cancel="model.fansMeetingModel = false"
                    @confirm="fansMeetingConfirm"
                />
            </van-popup>
            <van-popup v-model="model.toHospitalDateModel" position="bottom" style="height: 50%" round >
                <van-datetime-picker
                    v-model="currentDate"
                    type="date"
                    :min-date="minDate"
                    :max-date="maxDate"
                    :show-toolbar="true"
                    @cancel="model.toHospitalDateModel = false"
                    @confirm="confirmFn"
                />
            </van-popup> 
            <van-popup v-model="model.nextAppointmentDateModel" position="bottom" style="height: 50%" round >
                <van-datetime-picker
                    v-model="currentDate3"
                    type="date"
                    :min-date="minDate"
                    :max-date="maxDate"
                    :show-toolbar="true"
                    @cancel="model.nextAppointmentDateModel = false"
                    @confirm="confirmFn3"
                />
            </van-popup> 
            <van-popup v-model="model.dealDateModel" position="bottom" style="height: 50%" round >
                <van-datetime-picker
                    v-model="currentDate2"
                    type="date"
                    :min-date="minDate"
                    :max-date="maxDate"
                    :show-toolbar="true"
                    @cancel="model.dealDateModel = false"
                    @confirm="confirmFn2"
                />
            </van-popup> 
            <van-popup v-model="model.dealPerformanceTypeModel" round position="bottom">
                <van-picker
                    show-toolbar
                    :columns="list.contentPlateFormOrderDealPerformanceTypeName"
                    @cancel="model.dealPerformanceTypeModel = false"
                    @confirm="contentPlateFormOrderDealPerformanceTypeConfirm"
                />
            </van-popup>
            <!-- 消费类型 -->
             <van-popup v-model="model.consumptionTypeModel" round position="bottom">
                <van-picker
                    show-toolbar
                    :columns="list.consumptionTypeListName"
                    @cancel="model.consumptionTypeModel = false"
                    @confirm="consumptionTypeConfirm"
                />
            </van-popup>
        </div>

        <!-- 明细 -->
        <van-divider :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }" v-if="form.isFinish === true">明细栏</van-divider>
        <detail :orderId="$route.query.orderId" @handle="handle" v-if="form.isFinish === true"/>


        <div class="bottom">
            <!-- <van-button round block type="info"  class="button" @click="prevStep">上一步</van-button> -->
            <!-- <van-button round block type="info"  class="button" v-if="isLoading == true">加载中...</van-button> -->
            <van-button round block type="info"  class="button" @click="submite" >完成</van-button>
        </div>
    </div>
    </div>
</template>
<script>
import * as api from "@/api/order.js";
import * as userApi from "@/api/user.js";
import detail from "./cmoponents/detail.vue"
export default {
    components:{
        detail
    },
    props:{
        active:Number,
        anchorCustomerServiceMessage:Object
    },
    data(){
        return{
            isLoading:false,
            // 模糊搜索
            searchKey:'',
            searchColumns:[],
            currentDate: this.$moment().format("YYYY-MM-DD"),
            currentDate2:this.$moment().format("YYYY-MM-DD"),
            currentDate3:this.$moment().format("YYYY-MM-DD"),
            minDate: new Date(2020, 1, 1),
            maxDate: new Date(2028, 1, 1),
            // 用于页面展示
            form:{
                // 订单号
                id:'',
                // 是否成交
                isFinish:false,
                // 成交医院
                lastDealHospitalId:null,
                lastDealHospitalName:'',
                // 是否到院
                isToHospital:false,
                // 到院类型
                toHospitalType:null,
                toHospitalTypeName:null,
                // 粉丝见面会
                fansMeetingName:'',
                fansMeetingId:'',
                // 是否参加过粉丝见面会
                isFansMeeting:false,
                // 到院时间
                toHospitalDate:this.$moment().format("YYYY-MM-DD"),
                // 成交金额
                dealAmount:null,
                // 后期项目铺垫
                lastProjectStage:'',
                // 成交截图url
                dealPictureUrl:[],
                // 未成交原因
                unDealReason:'',
                // 未成交截图url
                unDealPictureUrl:[],
                // 成交时间
                dealDate:this.$moment().format("YYYY-MM-DD"),
                //业绩类型 
                dealPerformanceType:null,
                dealPerformanceTypeName:null,
                // 是否陪诊
                isAcompanying:false,

                // 佣金比例
                commissionRatio:null,
                // 三方订单号
                otherContentPlatFormOrderId:'',
                // 邀约凭证
                invitationDocuments:[],
                // 消费类型
                consumptionType:null,
                consumptionTypeName:null,
                // 明细
                addContentPlatFormOrderDealDetailsVoList:[],
                // 下次要约时间
                nextAppointmentDate:this.$moment().format("YYYY-MM-DD"),
                // 见面会铺垫项目
                fansMeetingProject:'',
                // 追踪内容
                followUpContent:'',
                // 是否需要机构协助邀约
                isNeedHospitalHelp:false,
            },
            // 获取接口数据
            joggle:{
                // 医院
                hospitalInfo:[],
                orderTypes:[],
                contentPlateFormOrderDealPerformanceType:[],
                fansMeetingList:[]
            },
            // model
            model:{
                lastDealHospitalModel:false,
                toHospitalTypeModel:false,
                toHospitalDateModel:false,
                dealDateModel:false,
                dealPerformanceTypeModel:false,
                consumptionTypeModel:false,
                fansMeetingModel:false,
                nextAppointmentDateModel:false
            },
            // 用于页面展示数据
            list:{
                hospitalInfoName:[],
                orderTypesName:[],
                contentPlateFormOrderDealPerformanceTypeName:[],
                consumptionTypeListName:[],
                fansMeetingListName:[],
                
            },
            // 消费类型
            typeList:[],
        }

    },
    mounted(){
        this.form.lastDealHospitalName = this.$route.query.sendHospitalName
        this.form.lastDealHospitalId = this.$route.query.sendHospital
    },
    methods:{
        // 粉丝见面会click
        fansMeetingClick(value){
            this.model.fansMeetingModel=true
        },
        // 解密手机号
        getDecryptoPhone(){
            const data = {
                encryptPhone:this.$route.query.encryptPhone
            }
            userApi.decryptoPhone(data).then(res=>{
                this.form.phone = res.data.phone
            })
        },
        // 是否参加过粉丝见面会
        getFansMeetingDetailsisAttendClick(value){
            
            console.log(this.form.phone)
            const {lastDealHospitalId,phone,fansMeetingId} = this.form
            if(!lastDealHospitalId){
                this.$toast('请先选择到院医院！')
                return
            }
            const data = {
                id:value,
                phone:phone,
                hospitalId:lastDealHospitalId
            }
            api.isAttend(data).then(res=>{
                if(res.code === 0){
                this.form.isFansMeeting=res.data.isAttend

                }
            })
        },
        handle(value){
            this.form.addContentPlatFormOrderDealDetailsVoList = value
        },
        // 到院类型弹窗
        toHospitalTypeClick(){
            this.model.toHospitalTypeModel = true
        },
        // 消费类型弹窗
        consumptionTypeClick(){
            // 退款消费
            if(this.form.toHospitalType == 4){

            }else{
                this.model.consumptionTypeModel = true
            }
        },
        // 消费类型确认弹窗
        consumptionTypeConfirm(value){
             this.form.consumptionTypeName = value;
            this.model.consumptionTypeModel = false;
            // 取id
            this.typeList.map((item) => {
                if (item.name == value) {
                    this.form.consumptionType = item.id;
                }
            });
        },
        // 消费类型
        getContentPlatFormOrderDealInfoTypeList(){
            api.ContentPlatFormOrderDealInfoTypeList().then(res=>{
                if(res.code == 0){
                    this.typeList = res.data.typeList
                    let consumptionTypeListName=[]
                    this.typeList.map(item=>{
                        consumptionTypeListName.push(item.name)
                    })
                    this.list.consumptionTypeListName = consumptionTypeListName
                }
            })
        },
        // 到院类型确认弹窗
        orderTypesConfirm(value){
            this.form.toHospitalTypeName = value;
            this.model.toHospitalTypeModel = false;
            // 取id
            this.joggle.orderTypes.map((item) => {
                if (item.name == value) {
                    this.form.toHospitalType = item.id;
                    if(item.id == 4){
                        this.form.consumptionType = 2
                        this.form.consumptionTypeName = '退款消费'
                        return
                    }else{
                        // this.form.consumptionType = null
                        this.form.consumptionTypeName = null
                        // this.model.consumptionTypeModel = false
                    }
                    return
                }
                
            });
        },
        //粉丝见面会确认弹窗
        fansMeetingConfirm(value){
            this.form.fansMeetingName = value;
            this.model.fansMeetingModel = false;
            
            // 取id
            this.joggle.fansMeetingList.map((item) => {
                if (item.name == value) {
                    this.form.fansMeetingId = item.id;
                    this.getFansMeetingDetailsisAttendClick(item.id)
                    return
                }
                
            });
        },
        // 未成交截图
        beforeRead(file) {
            if (!/(jpg|jpeg|png|JPG|PNG)/i.test(file.type)) {
                this.$toast("请上传正确格式的图片！");
                return false;
            }
            return true;
        },
        onOversize(file) {
            this.$toast("只能上传5M以内的图片！");
        },
        deletClick(index){
        this.form.unDealPictureUrl.splice(index, 1)
        },
        afterReadClick(file){
        // 此时可以自行将文件上传至服务器
        let content = file.file;
            let data = new FormData();
            data.append('uploadfile',content);
            api.upload(data).then(res=>{
            if(res.code == 0){
                this.form.unDealPictureUrl.push(res.data.url)
                return
            }else if(res.code == 404){
                this.$toast("上传失败！");
                return
            }
            })
        },

        // 邀约凭证
        beforeRead2(file) {
            if (!/(jpg|jpeg|png|JPG|PNG)/i.test(file.type)) {
                this.$toast("请上传正确格式的图片！");
                return false;
            }
            return true;
        },
        onOversize2(file) {
            this.$toast("只能上传5M以内的图片！");
        },
        deletClick2(index){
        this.form.invitationDocuments.splice(index, 1)
        },
        afterReadClick2(file){
        // 此时可以自行将文件上传至服务器
        let content = file.file;
            let data = new FormData();
            data.append('uploadfile',content);
            api.upload(data).then(res=>{
            if(res.code == 0){
                this.form.invitationDocuments.push(res.data.url)
                return
            }else if(res.code == 404){
                this.$toast("上传失败！");
                return
            }
            })
        },

        // 成交凭证
        beforeRead3(file) {
            if (!/(jpg|jpeg|png|JPG|PNG)/i.test(file.type)) {
                this.$toast("请上传正确格式的图片！");
                return false;
            }
            return true;
        },
        onOversize3(file) {
            this.$toast("只能上传5M以内的图片！");
        },
        deletClick3(index){
        this.form.dealPictureUrl.splice(index, 1)
        },
        afterReadClick3(file){
        // 此时可以自行将文件上传至服务器
        let content = file.file;
            let data = new FormData();
            data.append('uploadfile',content);
            api.upload(data).then(res=>{
            if(res.code == 0){
                this.form.dealPictureUrl.push(res.data.url)
                return
            }else if(res.code == 404){
                this.$toast("上传失败！");
                return
            }
            })
        },

        dealDateClick(){
           var myDate = new Date();  
            this.model.dealDateModel = true;
            this.currentDate2 = new Date(this.$moment(myDate).format("YYYY-MM-DD"))
        },
        toHospitalDateClick(){
           var myDate = new Date();  
            this.model.toHospitalDateModel = true;
            this.currentDate = new Date(this.$moment(myDate).format("YYYY-MM-DD"))
        },
        nextAppointmentDateClick(){
           var myDate = new Date();  
            this.model.nextAppointmentDateModel = true;
            this.currentDate3 = new Date(this.$moment(myDate).format("YYYY-MM-DD"))
        },
        submite(){
            const {isFinish,lastDealHospitalId,isToHospital,toHospitalType,toHospitalDate,dealAmount,lastProjectStage,dealPictureUrl,unDealReason,
            unDealPictureUrl,dealDate,dealPerformanceType,isAcompanying,commissionRatio,otherContentPlatFormOrderId,invitationDocuments,consumptionType,addContentPlatFormOrderDealDetailsVoList,fansMeetingId,isFansMeeting,fansMeetingProject,followUpContent,nextAppointmentDate,isNeedHospitalHelp
            } = this.form
            if(isToHospital == true){
                if(!lastDealHospitalId){
                    this.$toast("请选择到院医院");
                    return
                }
                if(!toHospitalType){
                    this.$toast("请选择到院类型");
                    return
                }
                if(!toHospitalDate){
                    this.$toast("请选择到院时间");
                    return
                }
            }
            if(isFinish == true){
                if(!dealAmount){
                    this.$toast("请输入成交金额");
                    return
                }
                if(!dealDate){
                    this.$toast("请选择成交时间");
                    return
                }
                if(!dealPerformanceType){
                    this.$toast("请选择业绩类型");
                    return
                }
                if(consumptionType == null){
                    this.$toast("请选择消费类型");
                    return
                }
            }
            if(isFinish == false){
               if(!unDealReason){
                this.$toast("请输入未成交原因");
                return
               }
            }
           const data = {
            id:this.$route.query.orderId,
            isFinish,
            lastDealHospitalId:Number(lastDealHospitalId),
            isToHospital,
            toHospitalType:Number(toHospitalType),
            toHospitalDate:toHospitalDate ? this.$moment(toHospitalDate).format("YYYY-MM-DD") : null,
            dealAmount:Number(dealAmount),
            lastProjectStage,
            dealPictureUrl:dealPictureUrl.length   == 0 ?  ''  : dealPictureUrl[0],
            unDealReason,
            unDealPictureUrl:unDealPictureUrl.length == 0 ?  ''  : unDealPictureUrl[0],
            dealDate:dealDate ? this.$moment(dealDate).format("YYYY-MM-DD") : null,
            dealPerformanceType:Number(dealPerformanceType),
            isAcompanying,
            commissionRatio:0,
            otherContentPlatFormOrderId,
            invitationDocuments:invitationDocuments,
            consumptionType,
            addContentPlatFormOrderDealDetailsVoList:isFinish == false  || dealAmount == 0 ? [] : addContentPlatFormOrderDealDetailsVoList,
            fansMeetingId:isFansMeeting == true ? fansMeetingId : '',
            fansMeetingProject:isFansMeeting == true ? fansMeetingProject : '',
            followUpContent:isFansMeeting == true ? followUpContent : '',
            nextAppointmentDate:isFansMeeting == true ? nextAppointmentDate : null,
            isNeedHospitalHelp:isFansMeeting == true ? isNeedHospitalHelp : false,
            sendOrderId:this.$route.query.sendOrderId

           }
           if(isFinish == true){
            if(dealAmount == 0){
              api.finishContentPlateFormOrderByEmployee(data).then((res) => {
                if (res.code === 0) {
                  this.$toast('确认成功')
                  this.$router.go(-1)
                }else {
                  this.$toast(res.msg)
                }
              });
              return
            }else{
                let price = 0
                if(addContentPlatFormOrderDealDetailsVoList.length == 0 || addContentPlatFormOrderDealDetailsVoList == []){
                  this.$toast('请填写成交明细！')
                  return
                }
                addContentPlatFormOrderDealDetailsVoList.map(item=>{
                  price += Number(item.price)
                  return
                })
                if(price*100 != dealAmount*100){
                  this.$toast('成交明细合计与成金金额不一致，请认真核对！')
                  return
                }
              api.finishContentPlateFormOrderByEmployee(data).then((res) => {
                if (res.code === 0) {
                  this.$toast('确认成功')
                  this.$router.go(-1)
                }else{
                    this.$toast(res.msg)
                }
              });
              return
            }
          }
          api.finishContentPlateFormOrderByEmployee(data).then((res) => {
            if (res.code === 0) {
              this.$toast('确认成功')
              this.$router.go(-1)
            }else{
                this.$toast(res.msg)
            }
          });
        },
        isToHospitalClick(value){
            if(value == false){
                // this.form.toHospitalDate = this.$moment().format("YYYY-MM-DD"),
                this.currentDate = ''
                // this.form.lastDealHospitalId = null
                // this.form.lastDealHospitalName = ''
                this.form.toHospitalTypeName = ''
                this.form.toHospitalType = null
                this.form.isAcompanying = false
                this.form.fansMeetingName = ''
                this.form.fansMeetingId = ''
                this.form.isFansMeeting = false
            }
        },
        isFinishClick(value){
            if(value == false){
                // this.form.toHospitalDate =  this.$moment().format("YYYY-MM-DD"),
                this.currentDate = ''
                // this.form.lastDealHospitalId = null
                // this.form.lastDealHospitalName = ''
                this.form.toHospitalTypeName = ''
                this.form.toHospitalType = null
                this.form.isAcompanying = false
                this.form.isToHospital = false
                this.form.dealAmount = null 
                // this.form.dealDate = this.$moment().format("YYYY-MM-DD")
                this.currentDate2 = ''
                this.form.dealPerformanceType = null 
                this.form.dealPerformanceTypeName = null 
                this.form.dealPictureUrl = []
                this.form.fansMeetingName = ''
                this.form.fansMeetingId = ''
                this.form.isFansMeeting = false
            }else{
                this.form.isToHospital = true
                this.form.unDealReason = ''
                this.form.unDealPictureUrl = []
                
            }
        },
        // 获取医院
        getHospitalInfo() {
            api.HospitalInfo().then((res) => {
                this.joggle.hospitalInfo =res.data.hospitalInfo;
                let hospitalInfoName=[]
                this.joggle.hospitalInfo.map(item=>{
                    hospitalInfoName.push(item.name)
                })
                this.list.hospitalInfoName = hospitalInfoName
                this.searchColumns = hospitalInfoName
            
            });
        },
        lastDealHospitalClick(value){
            this.model.lastDealHospitalModel = true
        },
        hospitalInfoConfirm(value){
            this.form.lastDealHospitalName = value;
            this.model.lastDealHospitalModel = false;
            this.searchKey = ''
            // this.searchColumns = []
            this.form.fansMeetingName = ''
            this.form.fansMeetingId = ''
            // 取id
            this.joggle.hospitalInfo.map((item) => {
                if (item.name == value) {
                this.form.lastDealHospitalId = item.id;
                }
            });
        },
        // 获取到院状态
        getcontentPlateFormOrderToHospitalTypeList() {
            api.contentPlateFormOrderToHospitalTypeList().then((res) => {
                this.joggle.orderTypes =res.data.orderTypes;
                let orderTypesName=[]
                this.joggle.orderTypes.map(item=>{
                    orderTypesName.push(item.name)
                })
                this.list.orderTypesName = orderTypesName
            
            });
        },
        // 获取粉丝见面会
        getValidKeyAndValue() {
            api.ValidKeyAndValue().then((res) => {
                this.joggle.fansMeetingList =res.data.fansMeeting;
                let fansMeetingListName=[]
                this.joggle.fansMeetingList.map(item=>{
                    fansMeetingListName.push(item.name)
                })
                this.list.fansMeetingListName = fansMeetingListName
            
            });
        },
        confirmFn(value){
            this.form.toHospitalDate = this.$moment(value).format("YYYY-MM-DD");
            this.model.toHospitalDateModel = false;
        },
        confirmFn2(value){
            this.form.dealDate = this.$moment(value).format("YYYY-MM-DD");
            this.model.dealDateModel = false;
        },
        confirmFn3(value){
            this.form.nextAppointmentDate = this.$moment(value).format("YYYY-MM-DD");
            this.model.nextAppointmentDateModel = false;
        },
        dealAmountInput(value){
            this.form.dealAmount = value
        },
        //   获取业绩类型
        getcontentPlateFormOrderDealPerformanceType() {
        api.contentPlateFormOrderDealPerformanceType().then((res) => {
            if (res.code === 0) {
            this.joggle.contentPlateFormOrderDealPerformanceType =res.data.contentPlateFormOrderDealPerformanceType;
                let contentPlateFormOrderDealPerformanceTypeName=[]
                this.joggle.contentPlateFormOrderDealPerformanceType.map(item=>{
                    contentPlateFormOrderDealPerformanceTypeName.push(item.name)
                })
                this.list.contentPlateFormOrderDealPerformanceTypeName = contentPlateFormOrderDealPerformanceTypeName
            }
        });
        },
        contentPlateFormOrderDealPerformanceTypeConfirm(value){
            this.form.dealPerformanceTypeName = value;
            this.model.dealPerformanceTypeModel = false;
            // 取id
            this.joggle.contentPlateFormOrderDealPerformanceType.map((item) => {
                if (item.name == value) {
                this.form.dealPerformanceType = item.id;
                }
            });
        }
    },
    created(){
        // this.getCustomerServiceNameList()
        this.getcontentPlateFormOrderDealPerformanceType()
        this.getcontentPlateFormOrderToHospitalTypeList()
        this.getHospitalInfo()
        this.getContentPlatFormOrderDealInfoTypeList()
        this.getValidKeyAndValue()
        this.getDecryptoPhone()
    },
     watch: {  //实时监听搜索输入内容
        searchKey: function () {
            let key = String( this.searchKey );
            key =  key.replace( /\s*/g, "" );//去除搜索内容中的空格
            const reg =  new RegExp( key, "ig" );//匹配规则-i：忽略大小写，g：全局匹配
            /* 进行筛选，将筛选后的数据放入新的数组中，‘name’键可根据需要搜索的key进行调整 */
            this.searchColumns = this.list.hospitalInfoName.filter( item => item.match( reg ) !=null );
        }
    }
}
</script>

<style scoped lang="less">
/deep/.van-uploader__upload {
  width:50px;
  height:50px;
}
/deep/ .customer_content,.van-cell ,.van-cell--center{
    display: flex;
    
}
/deep/.switch_con{
    width: 160px;
    color: #5492fe;
    margin-left: -17px;
    display: flex;
    align-items: center;
}
/deep/ .switch_icon ,.van-switch{
    // margin-right: 120%;
}
.container{
    // width: 100%;
    // height: 100vh;
    // background: linear-gradient(#8ab4fe,#fff);
    // padding-top: 20px;
    // box-sizing: border-box;
}
.content{
    width: 92%;
    background: #fff;
    // height: 350px;
    margin: 20px auto 0;
    border-radius: 10px;
    box-shadow: 10px 10px 10px rgba(0, 0.5);
    padding: 10px;
    box-sizing: border-box;
    .img_content{
    display: flex;
    .img_item{
      position:relative;
      margin-right:5px;
      .img{
        width:50px;
        height:50px;
      }
      .opacity_con{
        background:#000;
        position:absolute;
        right:0;
        top:0;
        opacity:0.2;
        padding:1px 4px;
        box-sizing:border-box;
        color:#fff
      }
    }
  }
  .customer_img{
    font-size: 13px;
    color: #5492fe;
    margin: 10px 0;
  }
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
        width: 90px;
        color: #5492fe;
        }
    }
    .switch_content{
        width: 100%;
        display: flex;
        align-items: center;
        border-bottom: 1px solid #bbd3ff;
        // padding: 10px 0;
        // box-sizing: border-box;
        color: #5492fe;
        // .switch_icon{
        //     position: fixed;
        //     left:28%;
        //     top: 16.5%;
        // }
        // .switch_icon{
        //     position: fixed;
        //     left:28%;
        //     top: 43.5%;
        // }
        // .switch_icon3{
        //     position: fixed;
        //     left:28%;
        //     top: 50%;
        // }
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