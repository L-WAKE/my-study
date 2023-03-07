<template >
    <div class="modelList abs" style="text-align: center;">
        <!--        <el-input-->
        <!--                placeholder="请输入内容"-->
        <!--                prefix-icon="el-icon-search"-->
        <!--                size="mini"-->
        <!--                v-model="controlFilter">-->
        <!--        </el-input>-->
        <el-tooltip v-for="(item,index) in modelList" :key="index" class="item" effect="light" :content="item.name" placement="right">
            <div
                    class="modelIcon"
                    :class="{'active':active[item.type]}"
                    :style="isShowSpecial(item)"
                    :data-type="item.type" @click="handleClick" >
                <svg class="icon" aria-hidden="true">
                    <use v-bind:xlink:href="'#icon'+item.template_img"></use>
                </svg>
            </div>

            <!--        <div-->
            <!--             class="modelIcon"-->
            <!--             :style="{'background-image':images[item.type],'height':'50px' }"-->
            <!--             :class="{'active':active[item.type]}"-->
            <!--             :data-type="item.type" @click="handleClick" >-->
            <!--        </div>-->
        </el-tooltip>



    </div>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex'
    import chartModel from './../../../assets/chartModel'
    import defaultModel from './../../../assets/modelDefaultConfig'
    import md5 from 'js-md5'
    export default {
        name: "modelList",
        props:['reportEdit_type'],
        data:function () {
            return {
                specialReportControl:['funnel','radar','picture','digital'],
                active:{
                    bar:false,
                    pie:false,
                    table:false,
                    search:false,
                    text:false
                },
                images:{
                },
                ssa_ticket:this.$ticketUtil.getCookie("ssa_ticket"),
                controlFilter:"",
                controlDirlList:[],
                controlTempList:[],
                modelTmpList:[],
                modelList:[
                    {
                        dir_id:"",//分类id
                        template_id:"",//id
                        name:"",//名称
                        type:"",//类型
                        template_img:"",//图标
                    },
                ],
            }
        },

        //初始化
        mounted:function(){
            this.initBoardControls();
            let id=this.GetQueryString("reId");
            let copy=this.GetQueryString("copy");
            let flag=this.GetQueryString("flag");
            if(id!=null&&id!=""){
                this.chartDatas.rep_id= id;
                this.initChartDatas(this.chartDatas.rep_id,flag,copy);
            }

        },
        watch: {
            controlFilter () {
                this.initControlAndClass();
            },
        },

        methods:{
            ...mapActions(['modifyChartDatas']),
            handleClick:function(e){
                const typeStr = e.currentTarget.dataset? e.currentTarget.dataset.type:e.currentTarget.getAttribute('data-type');
                console.log(typeStr);
                this.addChart(typeStr);
                for( let key in this.active){
                    this.$set(this.active,key,false);
                }
                this.$set(this.active,typeStr,true);
            },
            mergeStyleModel:function(newModel){
                //根据类型合并样式对象
                let modelType = newModel.global.styleType;
                if(modelType=='echart'){
                    let requires = newModel.options.setStyle.requires;
                    for(let key in requires){
                        newModel.options.setStyle[key]=this._.cloneDeep(defaultModel.style.echart[key]);
                    }
                }
            },
            //初始化系统可用控件
            initBoardControls:function(){
                let _this = this;
                let _thisImage = this.images;
                let _thisActive = this.active;
                let param = new URLSearchParams()
                param.append('ticket', _this.ssa_ticket);
                this.$common.requireBackData({
                    type:'post',
                    url:'/ssa/repEditController/getSysControl.action',
                    param:param,
                    successCallBack:function(response){
                        console.log(`${_this.$t('i18n731')}====`,response);
                        if(response.data.status != 1){
                            _this.$message({showClose: true,message: response.data.msg||'error', type: 'error' });
                            return;
                        }
                        _this.controlDirlList = response.data.data.controlDirlList?response.data.data.controlDirlList:[];
                        _this.controlTempList = response.data.data.controlTempList?response.data.data.controlTempList:[];
                        _this.initControlAndClass();
                        let str1="url(./../../../static/img/controls/";
                        let str2=".svg) ";
                        for(let i=0;i<_this.controlTempList.length;i++){
                            _thisImage[_this.controlTempList[i].template_code]=str1+_this.controlTempList[i].template_img+str2;
                            _thisActive[_this.controlTempList[i].template_code]=false;
                        }
                    }
                });

            },

            initControlAndClass:function(){
                this.modelList = [];
                for(let i =0; i<this.controlTempList.length;i++){
                    if(this.controlFilter && this.controlFilter !=""){
                        if(this.controlTempList[i].template_name.indexOf(this.controlFilter) > -1){
                            this.modelList.push({
                                dir_id:this.controlTempList[i].dir_id,
                                template_id:this.controlTempList[i].template_id,
                                name:this.controlTempList[i].template_name,
                                type:this.controlTempList[i].template_code,
                                template_img:this.controlTempList[i].template_img,
                            })
                        }
                    }else {
                        this.modelList.push({
                            dir_id:this.controlTempList[i].dir_id,
                            template_id:this.controlTempList[i].template_id,
                            name:this.controlTempList[i].template_name,
                            type:this.controlTempList[i].template_code,
                            template_img:this.controlTempList[i].template_img,
                        })
                    }
                }
            },

            getControlTemp:function(type){
                for(let i =0 ;i<this.modelList.length;i++){
                    if(type == this.modelList[i].type){
                        return this.modelList[i];
                    }
                }
                return null;

            },


            addChart:function(str,tableid){
                console.log(str);
                let that = this
                if(str=='tab'&& this.chartDatas.currMap!=-1){
                    this.$message({showClose: true,message: `tab${that.$t('i18n732')}tab组件`, type: 'warning' });
                    return;
                }
                let models;
                if(this.chartDatas.currMap!=-1){
                    let mapTmp = this.chartDatas.currMap.split('-');
                    let idTmp = this.$common.findTopChart(this,this.chartDatas.chartLists,mapTmp[0]);
                    console.log("idTmp",idTmp);
                    models = this.chartDatas.chartLists[idTmp].children[mapTmp[1]].childList;
                }else{
                    models = this.chartDatas.chartLists;
                }
                this.chartDatas.currentModel=undefined;

                let newXY = this.findAddBoxPlace(str,models);

                let newModel = this._.cloneDeep(chartModel[str]);

                newModel.global = this._.merge(newModel.global,defaultModel.global);
                if(newModel.options.setData){
                    newModel.options.setData.dataConfig = this._.merge(newModel.options.setData.dataConfig,defaultModel.data);
                }
                this.mergeStyleModel(newModel);
                newModel.i = ++this.chartDatas.indexes;
                if(newModel.children){
                    for(let i=0;i<newModel.children.length;i++){
                        newModel.children[i].pri = newModel.i;
                    }
                }
                if(this.chartDatas.currMap!=-1){
                    newModel.pid=this.chartDatas.currMap;
                }
                newModel.templateId = this.getControlTemp(str).template_id;
                newModel.type = this.getControlTemp(str).type;
                newModel.options.setData.isReflush=false; 
                newModel.id = newModel.global.type+"_"+ md5((new Date()).getTime()+"");
                newModel.bornTime = new Date().getTime()+"";
                //是否是点击加号生成的table 表格名字
                let tabName = '';
                if(newModel.global.type=='table'){tabName='table'}
                if(newModel.global.type=='newTable'){tabName='sheet';newModel.options.setData.dataConfig.polOrDet="1"}
                if(newModel.global.type == 'table' || newModel.global.type == 'newTable'){
                    if(tableid){
                        newModel.tableid = tableid
                        let tempArray = models.filter(item=> item.tableid && item.tableid == tableid);
                        if(!tempArray || !tempArray[0]) newModel.tableName = tabName+'_1'
                        else{
                            let tableName;
                            let tn;
                            tempArray.forEach(item =>{
                                tn = item.tableName.split('_');
                                if(tn.length == 2 && tn[1] == (parseInt(tn[1])+'')) tableName = tabName+'_'+(parseInt(tn[1])+1)
                            })
                            if(!tableName) tableName = tabName+'_'+(tempArray.length+1);
                            newModel.tableName = tableName;
                        }
                    }
                    else{
                        newModel.tableid = tabName+new Date().getTime();
                        newModel.tableName = tabName+'_1'
                    }
                }
                newModel.x = newXY[0];
                newModel.y = newXY[1];
                //专题报表时，增加精确度，分割变大，扩大对应属性
                // if(this.reportEdit_type == '1'){
                    newModel.w = newModel.w*50;
                    //todo 2021-09-22 调整
                //     newModel.h = newModel.h*5;
                // }
              if(this.reportEdit_type == '1'){
                newModel.h = newModel.h*5;
              }
                models.push(newModel);
                //如果点击的加号，那么向临时数组中替换这个tableid所对应的对象
                let flag = false;
                if(tableid){
                    this.chartDatas.tempChartLists.forEach((item,index)=>{
                        if(item.tableid == tableid){
                            newModel.y = item.y;
                            newModel.w = item.w;
                            newModel.h = item.h;
                            newModel.x = item.x;
                            flag = true;
                         this.$set(this.chartDatas.tempChartLists,index,newModel);
                        }
                    })
                    if(!flag) this.chartDatas.tempChartLists.push(newModel);
                }else{
                    this.chartDatas.tempChartLists.push(newModel);
                    this.chartDatas.addChartEventForDataSet++;
                }
                // this.chartDatas.boxLength++;
                //if(!tableid){
                    this.$nextTick(function(){
                    this.$emit('clickNewModel');
                });
              // }
            },
            findAddBoxPlace:function(str,models){

                //增加普通报表和专题报表的逻辑，分别在wh上扩大50，5倍
                //寻找新增容器的位置
                let _modelWidth = 12-chartModel[str].w;
                let _modelHeight = chartModel[str].h;
                if(this.reportEdit_type == '1'){
                    _modelWidth = _modelWidth*50
                   // _modelHeight = _modelHeight*5
                }
                let len = models.length;
                if(len===0){return [0,0]}
                let tmp = [],startx=0,starty,tmpx=0,tmpy=0;
                for(let i=0;i<len;i++){
                    let yi = models[i].y;
                    if(!tmp[yi]){tmp[yi]={w:0,h:0}}
                    tmp[yi].w+=(models[i].w+models[i].x);
                    tmp[yi].h=models[i].h>tmp[yi].h?models[i].h:tmp[yi].h;
                }
                for(let n=0;n<tmp.length;n++){
                    if(!tmp[n]){
                        continue;
                    } else{
                        if(tmp[n].w<=_modelWidth && tmp[n].h>=_modelHeight){
                            tmpx=tmp[n].w>tmpx?tmp[n].w:tmpx;
                            startx = tmpx;
                            starty = tmpy;
                            break;
                        }else{
                            if(tmp[n].w>_modelWidth){
                                tmpy+=tmp[n].h;
                                tmpx=0;
                            }else{
                                tmpy+=tmp[n].h;
                            }
                        }

                    }
                }
                starty = tmpy;
                return [startx,starty]
            },
            GetQueryString:function (name) {
                var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
                var r = window.location.search.substr(1).match(reg);
                if(r!=null)return  unescape(r[2]); return null;
            },
            reflushData: function (controlInst) {
                console.log('show',controlInst)
                let dataConfigModel = this._.cloneDeep(controlInst.options.setData.dataConfig);
                let param = new URLSearchParams(), _this = this;
                param.append('userId', this.chartDatas.userId);
                this.$common.rebuildDataConfig(this,dataConfigModel);
                param.append("requestJson",JSON.stringify(dataConfigModel));
                //判断是否需要查询总条数
                if(dataConfigModel.report.size==true){
                    this.$common.requireBackData({
                        type: 'post',
                        url: '/ssa/biReport/search.action',
                        param: param,
                        successCallBack: function (response) {
                            if (response.data.status == 1) {
                                controlInst.options.setData.dataConfig.report.count=response.data.data.dataReport.SIZE;
                                document.getElementById("dataCount_div_"+controlInst.id).innerHTM = response.data.data.dataReport.SIZE;
                            } else {
                                _this.$message({showClose: true,message: _this.$t('i18n76')+response.data.msg, type: 'error' });
                            }
                        },
                        errorCallBack:function (error) {
                            _this.$message({showClose: true,message: _this.$t('i18n734'), type: 'error' });
                            _this.$set(currModelConfig.options.setData,'enableData' ,'error');
                        }
                    })
                };
                let sizeParam = new URLSearchParams();
                sizeParam.append('userId', this.chartDatas.userId);
                dataConfigModel.report.size=false;
                sizeParam.append("requestJson", JSON.stringify(dataConfigModel));
                this.$common.requireBackData({
                    type: 'post',
                    url: '/ssa/biReport/search.action',
                    param: sizeParam,
                    successCallBack: function (response) {
                        if (response.data.status == 1) {
                            let chartDataArr;
                            controlInst.sqlText = response.data.data.sql;
                            if(['table','newTable'].indexOf(controlInst.global.type)>-1){
                                chartDataArr = response.data.data.data
                            }else if(currModelConfig.global.type=='summaryTable'){
                                chartDataArr = _this.$controlDataUtil.buildSummaryData(response.data.data.data,controlInst.options);
                            }else{
                                chartDataArr =  _this.buildChartData(response.data.data.data,controlInst.options.setData.dataConfig);
                            }
                            _this.$set(controlInst.options.setData,'enableData' ,'loading');
                            _this.$set(controlInst.options.setData,'chartDataArr' ,chartDataArr);
                            _this.$nextTick(function(){
                                _this.$set(controlInst.options.setData,'isReflush',true);
                               // let msg= _this.$common.getPringMsg();
                           // console.log(arr[i].id,msg);
                           // _this.$common.waterMaker(controlInst.id,msg);
                            })
                        } else {
                           _this.$message({showClose: true,message: response.data.msg, type: 'error' });
                        }
                    }
                })


            },
            buildChartData:function (chartData,dataConfig) {
                let clumsTitle = [];
                let clumsName = [];
                let resultData = [];
                for(let i=0;i<dataConfig.dimension.length;i++){
                    clumsTitle.push(dataConfig.dimension[i].dimId+"_"+dataConfig.dimension[i].dimLevel+"_NAME");
                    clumsName.push(dataConfig.dimension[i].colNameCn);
                }
                for(let i=0;i<dataConfig.indicator.length;i++){
                    clumsTitle.push("indicator_"+dataConfig.indicator[i].colId);
                    clumsName.push(dataConfig.indicator[i].colNameCn);
                }
                resultData.push(clumsName);
                for(let i=0;i<chartData.length;i++){
                    let itemArr = [];
                    for(let j = 0;j<clumsTitle.length;j++){
                        itemArr.push(chartData[i][clumsTitle[j]]||chartData[i][clumsTitle[j].substring(0, clumsTitle[j].lastIndexOf('_NAME'))]);
                    }
                    resultData.push(itemArr);
                }
                console.log("-----------------------------------",resultData)
                return  resultData;
            },
            //初始化编辑页面数据
            initChartDatas: function (id,flag,copy) {
                let _this = this;
                let _thischartDatas = this.chartDatas;
                let param = new URLSearchParams();
                param.append('ticket', _this.ssa_ticket);
                param.append('id', id);
                param.append('flag', flag);
                this.$common.requireBackData({
                    type: 'post',
                    url: '/ssa/repEditController/querySysControlById.action',
                    param: param,
                    successCallBack: function (response) {
                        if(response.data.status == 1){
                            if(response.data.data.reptype == 1){
                                _this.$emit('updateReportType','1')
                            }else {
                                _this.$emit('updateReportType','0')
                            }
                            _this.$common.buildChartDatasModel(_this,response.data.data,'view',copy);
                            _thischartDatas.rep_id=copy==1?'':response.data.data.rep_id;
                            _thischartDatas.indexes=response.data.data.indexes;
                            _thischartDatas.dirid=response.data.data.dirid;
                            _thischartDatas.repname=response.data.data.repname;
                            _thischartDatas.textarea=response.data.data.textarea;
                          _thischartDatas.replogic=response.data.data.replogic;
                          _thischartDatas.rep_dev_user=response.data.data.rep_dev_user;
                          _thischartDatas.rep_update_cycle=response.data.data.rep_update_cycle;
                            _thischartDatas.rep_duty_dept=response.data.data.rep_duty_dept||'';
                            _thischartDatas.rep_duty_user=response.data.data.rep_duty_user||'';
                            let repLimitTypeBoolean=response.data.data.repLimitTypeBoolean;
                            if(repLimitTypeBoolean=="0"){
                                _thischartDatas.showRdvClassWindowParam.repLimitTypeBoolean=false;
                            }else if(repLimitTypeBoolean=="1"){
                                _thischartDatas.showRdvClassWindowParam.repLimitTypeBoolean=true;
                            }
                            let repNewUrlBoolean=response.data.data.repNewUrlBoolean;
                            if(repNewUrlBoolean=="0"){
                                _thischartDatas.showRdvClassWindowParam.repNewUrlBoolean=false;
                            }else if(repNewUrlBoolean=="1"){
                                _thischartDatas.showRdvClassWindowParam.repNewUrlBoolean=true;
                            }
                            _thischartDatas.showRdvClassWindowParam.sysDirId=response.data.data.sysDirId;
                            _thischartDatas.showRdvClassWindowParam.dirCreator=response.data.data.dirCreator;
                            _thischartDatas.showRdvClassWindowParam.repLimitEndTime=response.data.data.repLimitEndTime;
                            _thischartDatas.showRdvClassWindowParam.repUrl=response.data.data.repUrl;

                            let style=response.data.data.setRepStyle;
                            if(style!=null&&style!=""){
                               // _thischartDatas.setRepStyle.background=style.background;
                                _this.$set(_thischartDatas,'setRepStyle',style);
                                if(!style.reportParam){
                                  _this.$set(_thischartDatas.setRepStyle,'reportParam',[
                                        {
                                            name: 'userId',
                                            defValue: '${userId}',
                                            edit:false
                                        },
                                        {
                                            name: 'userName',
                                            defValue: '${username}',
                                            edit:false
                                        },
                                        {
                                            name: 'orgId',
                                            defValue: '${orgId}',
                                            edit:false
                                        }
                                  ]);
                                }
                            }
                            let arr=response.data.data.chartLists;
                            if (!arr || arr.length == 0) {
                                    _this.$message({
                                        message: _this.$t('i18n735'),
                                        type: 'warning'
                                    })
                                    return;
                                }
                            arr.forEach((item,index) =>{
                                if(item.options.setData.dataConfig.dataSetId!==''){
                                    _this.$controlDataUtil.getSelectedDataSetInfo(item.options.setData.dataConfig.dataSetId)
                                }
                                if(item.type == 'table' && !item.tableid){
                                    item.tableid = 'table'+(parseInt(new Date().getTime()+index));
                                    item.tableName = 'table_1'
                                    item.bornTime = new Date().getTime()+''
                                }
                              item['newRender'] = true
                            })
                            arr.sort((a,b)=>a.bornTime - b.bornTime)
                            _this.$set(_thischartDatas,'chartLists',arr);
                            let tempArr = [];
                            arr.forEach(item => {
                                if(!item.tableid) tempArr.push(item)
                                else{
                                    if(!tempArr.some(item1 => item1.tableid == item.tableid)) tempArr.push(item)
                                }
                            })
                            _this.$set(_thischartDatas,'tempChartLists',tempArr);
                            _this.$set(_this.$parent,"isReadLoadBoardData",true);
                            // _this.$nextTick(function(){
                            //     for(let i=0;i<arr.length;i++){
                            //         if(_this.$common.checkChartType.indexOf(arr[i].global.type)>-1 && arr[i].options.setData.dataConfig
                            //             &&(arr[i].options.setData.dataConfig.dimension.length!=0 || arr[i].options.setData.dataConfig.indicator.length!=0)
                            //         ){
                            //             _this.$set(arr[i].options.setData,'enableData','loading');
                            //             _this.$set(arr[i].options.setData,'isReflush',false);
                            //             _this.$nextTick(function () {
                            //                 setTimeout(function(){
                            //                     _this.reflushData(arr[i]);
                            //                 },500)
                            //             })
                            //             // setTimeout(function(){
                            //             //     _this.reflushData(arr[i]);
                            //             // },1500)
                            //         }else {
                            //             arr[i].options.setData.enableData=false
                            //         }
                            //         if(_this.$common.checkChartType.indexOf(arr[i].global.type) == -1 ){
                            //             arr[i].options.setData.enableData=true;
                            //         }
                            //
                            //     }
                            // })
                        }
                    }
                });
            },
            getListChartDatas:function(arr){
                for(let i=0;i<arr.length;i++){
                    if(arr[i].options.setData.dataConfig.searchType == '-9'){
                        continue
                    }
                    if(this.$common.checkChartType.indexOf(arr[i].global.type)>-1 && arr[i].options.setData.dataConfig
                        &&(arr[i].options.setData.dataConfig.dimension.length!=0 || arr[i].options.setData.dataConfig.indicator.length!=0)
                    ){
                        this.$set(arr[i].options.setData,'enableData','loading');
                        this.$set(arr[i].options.setData,'isReflush',false);
                        this.$nextTick(function () {
                            // setTimeout(function(){
                                this.reflushData(arr[i]);
                            let msg= this.$common.getPringMsg();
                            //console.log(arr[i].id,msg);
                            this.$common.waterMaker(arr[i].id,msg);
                            // },200);
                        })
                        // setTimeout(function(){
                        //     _this.reflushData(arr[i]);
                        // },1500)
                    }else {
                        arr[i].options.setData.enableData=false
                    }
                    if(this.$common.checkChartType.indexOf(arr[i].global.type) == -1 ){
                        arr[i].options.setData.enableData=true;
                    }

                }
            }
        },
        computed: {
            ...mapGetters(['chartDatas']),
            isShowSpecial(){
                return function (item) {
                    if(this.reportEdit_type == '1'){
                        return {}
                    }else {
                        if(this.specialReportControl.indexOf(item.type) > -1){
                            return {'display':'none'}
                        }
                        return  {}
                    }
                }
            }
        }
    }
</script>

<style scoped>
    .modelList{
        width:64px;
        height:calc(100% - 48px);
        left:0;
        top:48px;
        background: #242c3a;
    }
    .modelIcon{
        margin:10px;height:30px;padding:5px;background-size:auto 100%;
        border:1px solid #4f5e79;
        background-position: center;
        background-repeat: no-repeat;cursor:pointer;
    }
    .active{
        background-color: #323f5d;
    }
    .icon {
        width: 30px;
        height: 30px;
        vertical-align: -0.15em;
        fill: currentColor;
        overflow: hidden;
    }
</style>
