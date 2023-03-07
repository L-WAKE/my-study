<template>
    <div id="dataSet">
        <div class="dataSetClass" v-if="sqlEdit">
            <div class="titleBox">
                <span class="title alignLeft" >SQL{{ $t('dataSet') }}</span>
            </div>
           <SqlModelEdit :sqlEditObj="sqlEditObj" ></SqlModelEdit>
        </div>
        <div class="dataSetClass" v-show="mainShow"
         v-loading="loading" :element-loading-text="loadText" element-loading-background="rgba(0, 0, 0, 0.8)" style="overflow: hidden;">
            <div class="titleBox">
                <span class="title alignLeft" >{{ $t('dataSet') }}</span>
                <div class="alignCenter">
                    <span :class="{active:checkType=='my'}" @click="checkTypeFun('my')">{{ $t('my') }}</span>
                    <span :class="{active:checkType=='all'}" @click="checkTypeFun('all')">{{ $t('other') }}</span>
                </div>
                <div class="alignRight">
                     <el-button  icon="el-icon-plus" size="mini" type="primary" class="baseBtn"
                               name="dataSet_addNew" v-if="$common.jurisdictionSys('dataSet_addNew','FRONT_WEB_MENU_FUNCTION')&&$common.jurisdictionSys('dataSource','FRONT_WEB_MENU')"
                               style="margin-left:5px" @click="creatDataSet(3)">
                                        <span class="el-dropdown-link" style="color: white;font-size: 12px;" @click="creatDataSet(3)" >
                                            SQL{{ $t('dataSet') }}
                                        </span>
                    </el-button>
                    <el-button  icon="el-icon-plus" size="mini" type="primary" class="baseBtn"
                               name="dataSet_addNew" v-if="$common.jurisdictionSys('dataSet_addNew','FRONT_WEB_MENU_FUNCTION')&&$common.jurisdictionSys('dataSource','FRONT_WEB_MENU')"
                               style="margin-left:5px" @click="creatDataSet(1)">
                                        <span class="el-dropdown-link" style="color: white;font-size: 12px;" @click="creatDataSet(1)" >
                                            {{ $t('modelDataSet') }}
                                        </span>
                    </el-button>
                    <el-button  icon="el-icon-plus" size="mini" type="primary" class="baseBtn"
                                name="dataSet_addNew" v-if="$common.jurisdictionSys('dataSet_addNew','FRONT_WEB_MENU_FUNCTION')&&$common.jurisdictionSys('dataSource','FRONT_WEB_MENU')&&false"
                                style="margin-left:5px" @click="creatDataSet(2)">
                                        <span class="el-dropdown-link" style="color: white;font-size: 12px;" >
                                            {{ $t('multiTableDataset') }}
                                        </span>
                    </el-button>
    <!--
                    <el-button v-show="folderViewObj.open == false" @click="creatFolder()"
                               name="dataSet_addClass" v-if="$common.jurisdictionSys('dataSet_addClass','FRONT_WEB_MENU_FUNCTION')"
                               icon="el-icon-plus" class="baseBtn" size="mini" type="primary" plain>{{ $t('i18n686') }}</el-button>-->
                </div>
            </div>
    <!--        <div class="panelCont">
                <div class="noDataBox" v-if="tableData.length==0&&checkType=='all'">
                    <i class="iconfont icon-zanwushuju3"></i>
                    <p>{{ $t('i18n687') }}</p>
                    <el-button @click="creatFolder()" icon="el-icon-plus" size="mini" type="primary" style="margin-left:5px">{{ $t('i18n686') }}</el-button>
                </div>
                <div class="noDataBox" v-if="tableData.length==0&&checkType=='my'">
                    <i class="iconfont icon-zanwushuju3"></i>
                    <p >{{ $t('i18n688') }}</p>
                    <el-button v-if="$common.jurisdictionSys('dataSet_addNew','FRONT_WEB_MENU_FUNCTION')&&$common.jurisdictionSys('dataSource','FRONT_WEB_MENU')" @click="creatDataSet()" icon="el-icon-plus" size="mini" type="primary" style="margin-left:5px">{{ $t('i18n25') }}</el-button>
                </div>
                <el-table class="dataSetTable" :data="tableData" :height="mainTableHeight(133)" style="width: 100%" size="medium" v-if="tableData.length>0">
                    <el-table-column key="1" :label="$t('name')"  align="left">
                        <template slot-scope="scope">
                            <div class="folderBox">
                                <div class="folderIcon">
                                    <i style="color:#FEC332" class="iconfont icon-wenjianjia1"></i>
                                </div>
                                <div @click="openFolder(scope.row)" class="folderName">
                                    {{scope.row.dir_NAME}}
                                </div>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column key="3" width="250"  :label="$t('creator')" align="left">
                        <template slot-scope="scope">
                            <div class="cellBox">{{scope.row.creator_NAME}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column key="4" width="250"  :label="$t('i18n689') + `/${this.$t('i18n690')}`" align="left">
                    <template slot-scope="scope">
                        <div class="dateBox">
                            <p class="topText">{{scope.row.update_USER_NAME}}</p>
                            <p class="bottomText">{{scope.row.update_TIME}}</p>
                        </div>
                    </template>
                    </el-table-column>
                    <el-table-column key="6" width="180" :label="$t('operation')" align="right">
                        <template slot-scope="scope">
                            <el-button type="text" v-if="scope.row.creator==user_id" @click.stop="creatFolder(scope.row,scope.$index)" size="mini" icon="iconfont icon-rename">{{ $t('rename') }}</el-button>
                            <el-button type="text" @click.stop="deleteFolder(scope.row,scope.$index)" size="mini" icon="iconfont icon-shanchu">{{ $t('delete') }}</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div id="folderView" v-if="folderViewObj.open">
                <div id="folderViewTitie">
                    <span class="viewTitle" @click="getParentFolder">{{ $t('i18n691') }}</span><span v-if="isFolder">></span><span @click="openFolder({dir_ID:folderViewObj.folderId,dir_NAME:folderViewObj.folderName})" v-if="isFolder" class="viewTitle">{{folderViewObj.folderName}}</span><span v-if="isSearch">></span><span v-if="isSearch" class="viewTitle">{{ $t('i18n692') }}</span>
                </div>
                <div id="tableBox" ref="mainTableBox">
                    <div class="noDataBox" name="dataSet_addNew" v-if="folderViewObj.folderList.length==0">
                        <i class="iconfont icon-zanwushuju3"></i>
                        <p>{{ $t('i18n688') }}</p>
                        <el-button v-if="$common.jurisdictionSys('dataSet_addNew','FRONT_WEB_MENU_FUNCTION')&&$common.jurisdictionSys('dataSource','FRONT_WEB_MENU')" @click="creatDataSet()" icon="el-icon-plus" size="mini" type="primary" style="margin-left:5px" >{{ $t('i18n25') }}</el-button>
                    </div>
                    <el-table class="dataSetTable" :data="folderViewObj.folderList" style="width:100%" fit :height="mainTableHeight(210)" size="medium" v-if="folderViewObj.folderList.length>0">
                        <el-table-column key="2" :label="$t('name')"  align="left">
                            <template slot-scope="scope">
                                <div class="dataSetBox">
                                    <div class="dataSetIcon">
                                        <i class="iconfont icon-shujuji"></i>
                                    </div>
                                    <div class="dataSetNameBox" @click.stop="creatReport(scope.row)" v-if="scope.row.table_TYPE!='4'">
                                        <p :title="scope.row.table_NAME_CN"><a>{{scope.row.table_NAME_CN}}</a><span class="newSpan" v-if="isNew(scope.row.create_TIME)">New</span></p>
                                        <p>{{scope.row.table_NAME}}</p>
                                    </div>
                                    <div class="dataSetNameBox"  v-if="scope.row.table_TYPE=='4'">
                                        <p :title="scope.row.table_NAME_CN"><a>{{scope.row.table_NAME_CN}}</a><span class="newSpan" v-if="isNew(scope.row.create_TIME)">New</span></p>
                                        <p>{{scope.row.table_NAME}}</p>
                                    </div>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column key="ee3" width="150"  :label="$t('creator')" align="left">
                            <template slot-scope="scope">
                                <div class="cellBox">{{scope.row.creator_NAME}}</div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="fangwenliang" sortable key="4" width="200" :label="$t('i18n689') + `/${this.$t('i18n690')}`" align="left">
                        <template slot-scope="scope">
                            <div class="dateBox">
                                <p class="topText">{{scope.row.update_USER_NAME}}</p>
                                <p class="bottomText">{{scope.row.update_TIME}}</p>
                            </div>
                        </template>
                        </el-table-column>
                        <el-table-column key="5" width="150" :label="$t('i18n0')" align="left">
                            <template slot-scope="scope">
                                <div class="dateBox">
                                    <p class="topText">{{scope.row.datasource_INS_NAME}}</p>
                                    <p class="centerText">{{scope.row.datasource_INS_TYPE_CODE}}</p>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column key="3" width="70"  :label="$t('i18n693')" align="left">
                            <template slot-scope="scope">
                                <div class="cellBox">{{scope.row.table_LIMIT_TYPE==0?$t('i18n694'):$t('disclosure')}}</div>
                            </template>
                        </el-table-column>
                        <el-table-column key="8" width="100"  :label="$t('i18n469')" align="left">
                            <template slot-scope="scope">
                                <div class="cellBox" v-if="scope.row.table_TYPE=='0'">JDBC{{ $t('i18n695') }}</div>
                                <div class="cellBox" v-if="scope.row.table_TYPE=='1'">{{ $t('i18n696') }}SQL</div>
                                <div class="cellBox" v-if="scope.row.table_TYPE=='2'">{{ $t('i18n697') }}</div>
                                <div class="cellBox" v-if="scope.row.table_TYPE=='3'">{{ $t('i18n698') }}</div>
                                <div class="cellBox" v-if="scope.row.table_TYPE=='4'">{{ $t('i18n699') }}</div>
                            </template>
                        </el-table-column>
                        <el-table-column key="7" width="300" :label="$t('operation')" align="right">
                            <template slot-scope="scope">
                                <el-button type="text" @click.stop="creatReport(scope.row)" size="mini" icon="iconfont icon-bianji" v-if="scope.row.table_TYPE!='4'">{{ $t('edit') }}</el-button>
                                &lt;!&ndash; <el-tooltip class="item" effect="odark" :content="$t('edit')" placement="top">
                                    <i @click.stop="creatReport(scope.row)" class="iconfont icon-bianji controlIcon"></i>
                                </el-tooltip> &ndash;&gt;
                                <el-button type="text" @click.stop="creatDashBoard()" size="mini" icon="iconfont icon-panel">{{ $t('newReport') }}</el-button>
                                &lt;!&ndash; <el-tooltip class="item" effect="odark" :content="$t('i18n700')" placement="top">
                                    <i @click.stop="creatDashBoard()" class="iconfont icon-panel controlIcon"></i>
                                </el-tooltip> &ndash;&gt;
                                <el-button v-if="user_id==scope.row.creator" type="text" @click="viewDataSetAttr(scope.row,'folderViewObj',scope.$index)" size="mini" icon="iconfont icon-wenjian">{{ $t('attribute') }}</el-button>
                                &lt;!&ndash; <el-tooltip class="item" effect="odark" :content="$t('attribute')" placement="top">
                                    <i @click="viewDataSetAttr(scope.row,'folderViewObj',scope.$index)" class="iconfont icon-wenjian controlIcon"></i>
                                </el-tooltip> &ndash;&gt;
    
                                    <el-dropdown trigger="hover" v-if="user_id==scope.row.creator" size="small" @command="commandFun">
                                        <span class="el-dropdown-link">
                                            &lt;!&ndash; <el-tooltip class="item" effect="odark" :content="$t('i18n701')" placement="top">
                                            <i class="iconfont icon-gengduo controlIcon"></i>
                                            </el-tooltip> &ndash;&gt;
                                            <el-button type="text" size="mini" icon="iconfont icon-gengduo">{{ $t('more') }}</el-button>
                                        </span>
                                        <el-dropdown-menu slot="dropdown">
                                            <el-dropdown-item :command="{type:'gongkai',param:scope}"><i :class="{iconfont:true,'icon-gongkai':scope.row.table_LIMIT_TYPE==0,'icon-bugongkai':scope.row.table_LIMIT_TYPE==1}"></i>{{scope.row.table_LIMIT_TYPE==0?$t('disclosure'):$t('i18n702')}}</el-dropdown-item>
                                            <el-dropdown-item v-if="!scope.row.table_LIMIT_TYPE" :command="{type:'move',param:scope}"><i class="iconfont icon-yidong"></i>{{ $t('moveTo') }}</el-dropdown-item>
                                            <el-dropdown-item :command="{type:'delete',param:scope}"><i class="iconfont icon-shanchu"></i>{{ $t('delete') }}</el-dropdown-item>
                                        </el-dropdown-menu>
                                    </el-dropdown>
    
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>-->
          <div class="dataSetData-home">
            <div class="dataSetData-home-tree">
                <div class="titleBox" style="margin:0">
                    <el-input prefix-icon="el-icon-search"
                         v-model="dataSetTreeFilter" :placeholder="$t('i18n3')"
                         style="margin-right:10px;vertical-align:middle;"
                         :style="{width:$i18n.locale=='zh'?'292px':'280px'}"
                        class="baseInput dataSetTreeFilter-input">
                    </el-input>
                    <el-button type="primary" class="baseBtn" size="mini" icon="el-icon-search">{{ $t('i18n170') }}</el-button>
                </div>
    
              <div class="dataSetData-home-tree-main">
                <el-tree
                    style="height: 100%;"
                    ref="selectTree"
                    :data="dataSetDirTreeData"
                    :props="defaultProps"
                    :node-key="defaultProps.key"
                    @node-click="treeDataItemClick"
                    :filter-node-method="filterNode"
                    accordion>
                <span slot-scope="{ node, data }" class="cunode">
                  <span :class="data.dir_id ==dirFormData.dir_id ?'nodeLabelActive nodeLabel':'nodeLabel'" :title="node.label">
                  {{ node.label }}</span>
                <el-tooltip  style="position: absolute;right: 30px" effect="odark" :content="$t('edit')" v-if="data.dir_creator == user_id"
                             placement="top">
                  <i class="colapseBtn header-icon el-icon-edit" v-if="data.dir_creator==user_id" @click.stop="creatFolder(data)"></i>
                </el-tooltip>
                <el-tooltip  style="position: absolute;right: 5px" effect="odark" :content="$t('delete')" v-if="data.dir_creator == user_id"
                             placement="top">
                  <i class="colapseBtn header-icon el-icon-delete" @click.stop="deleteFolder(data)"></i>
                </el-tooltip>
                </span>
                </el-tree>
              </div>
            </div>
            <div class="dataSetData-home-table">
                <div class="titleBox" style="margin:0;">
              <span class="title alignLeft" style="width:120px"></span>
                    <div class="alignRight" style="width:calc(100% - 120px)">
                        <el-input prefix-icon="el-icon-search"
                            v-model="dataSetListFilter" :placeholder="$t('i18n3')"
                            class="baseInput dataSetTreeFilter-input">
                        </el-input>
                        <el-button type="primary" size="mini">{{ $t('i18n170') }}</el-button>
                    </div>
                </div>
              <div ref="tbaF" style="height: calc(100% - 64px);padding:10px;box-sizing:border-box">
                <el-table class="baseTable" :data="getDataSetTableList()" style="width:100%" fit stripe
                height="100%" size="medium" v-if="folderViewObj.folderList.length>0" ref="dataSetTable">
                    <el-table-column key="2" :label="$t('name')" fixed="left"  align="left" width="300">
                    <template slot-scope="scope">
                        <div class="dataSetBox">
                        <div class="dataSetIcon">
                            <i class="iconfont icon-shujuji"></i>
                        </div>
                        <div class="dataSetNameBox" @click.stop="creatReport(scope.row)" >
                            <p :title="scope.row.table_NAME_CN"><a>{{scope.row.table_NAME_CN}}</a><span class="newSpan" v-if="isNew(scope.row.create_TIME)">New</span></p>
                            <p>{{scope.row.table_NAME}}</p>
                        </div>
                        </div>
                    </template>
                    </el-table-column>
                    <el-table-column key="ee3" width="150"  :label="$t('creator')" align="left">
                    <template slot-scope="scope">
                        <div class="cellBox">{{scope.row.creator_NAME}}</div>
                    </template>
                    </el-table-column>
                    <el-table-column prop="fangwenliang" sortable key="4" :width="$i18n.locale=='zh'?'200px':'270px'" :label="$t('i18n689') + `/${this.$t('i18n690')}`" align="left">
                    <template slot-scope="scope">
                        <div class="dateBox">
                        <p class="topText">{{scope.row.update_USER_NAME}}</p>
                        <p class="bottomText">{{scope.row.update_TIME}}</p>
                        </div>
                    </template>
                    </el-table-column>
                    <el-table-column key="5" width="150" :label="$t('i18n0')" align="left">
                    <template slot-scope="scope">
                        <div class="dateBox">
                        <p class="topText">{{scope.row.datasource_INS_NAME}}</p>
                        <p class="centerText">{{scope.row.datasource_INS_TYPE_CODE}}</p>
                        </div>
                    </template>
                    </el-table-column>
                    <el-table-column key="3" :width="$i18n.locale=='zh'?'70px':'100px'"  :label="$t('i18n693')" align="left">
                    <template slot-scope="scope">
                        <div class="cellBox">{{scope.row.table_LIMIT_TYPE==1?$t('disclosure'):$t('i18n694')}}</div>
                    </template>
                    </el-table-column>
                    <el-table-column key="8" width="100"  :label="$t('i18n469')" align="left">
                    <template slot-scope="scope">
                        <div class="cellBox" v-if="scope.row.table_TYPE=='0'">JDBC{{ $t('i18n695') }}</div>
                        <div class="cellBox" v-if="scope.row.table_TYPE=='1'">{{ $t('i18n696') }}SQL</div>
                        <div class="cellBox" v-if="scope.row.table_TYPE=='2'">{{ $t('i18n697') }}</div>
                        <div class="cellBox" v-if="scope.row.table_TYPE=='3'">{{ $t('i18n698') }}</div>
                        <div class="cellBox" v-if="scope.row.table_TYPE=='4'">{{ $t('i18n699') }}</div>
                    </template>
                    </el-table-column>
                    <el-table-column key="7" width="300" :label="$t('operation')" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" @click.stop="creatReport(scope.row)" size="mini" icon="iconfont icon-bianji" v-if="scope.row.table_TYPE!='4' && scope.row.creator==user_id">{{ $t('edit') }}</el-button>
                        <el-tooltip class="item" effect="odark" :content="$t('edit')" placement="top">
                    </el-tooltip>
                        <el-button type="text" @click.stop="creatDashBoard()" size="mini" icon="iconfont icon-panel">{{ $t('newReport') }}</el-button>
                        <el-tooltip class="item" effect="odark" :content="$t('i18n700')" placement="top">
                    </el-tooltip>
                        <el-button v-if="user_id==scope.row.creator" type="text" @click="viewDataSetAttr(scope.row,'folderViewObj',scope.$index)" size="mini" icon="iconfont icon-wenjian">{{ $t('attribute') }}</el-button>
                        <el-tooltip class="item" effect="odark" :content="$t('attribute')" placement="top">
                    </el-tooltip>
                        <el-dropdown trigger="hover" v-if="user_id==scope.row.creator" size="small" @command="commandFun">
                                            <span class="el-dropdown-link">
                                                <el-button type="text" size="mini" icon="iconfont icon-gengduo">{{ $t('more') }}</el-button>
                                            </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item :command="{type:'gongkai',param:scope}"><i :class="{iconfont:true,'icon-gongkai':scope.row.table_LIMIT_TYPE==0,'icon-bugongkai':scope.row.table_LIMIT_TYPE==1}"></i>{{scope.row.table_LIMIT_TYPE==0?$t('disclosure'):$t('i18n702')}}</el-dropdown-item>
    <!--                        <el-dropdown-item v-if="!scope.row.table_LIMIT_TYPE" :command="{type:'move',param:scope}"><i class="iconfont icon-yidong"></i>移动到</el-dropdown-item>-->
                            <el-dropdown-item :command="{type:'delete',param:scope}"><i class="iconfont icon-shanchu"></i>{{ $t('delete') }}</el-dropdown-item>
                        </el-dropdown-menu>
                        </el-dropdown>
    
                    </template>
                    </el-table-column>
                </el-table>
              </div>
            </div>
    
          </div>
    
    
    
            <creatFolder ref="creatFolder" :creatFolderObj="creatFolderObj"></creatFolder>
            <moveFolder ref="moveFolder" @comfirmDir="moveFolderFun" :moveFolderObj="moveFolderObj" :props="{id:'dir_ID',label: 'dir_NAME'}"></moveFolder>
            <dataSetAttr ref="dataSetAttr" :dataSetAttrObj="dataSetAttrObj"></dataSetAttr>
            <addEditViewModel
              ref="modelAddPanel"
              :createDataSetPanelParam="createDataSetPanelParam"
              :addEditViewModelData="addEditViewModelData"
              :doAddEditViewModelType="doAddEditViewModelType"
            ></addEditViewModel>
        </div>
        </div>
    </template>
    <script>
    import  creatFolder from './creatFolder'//新建或修改文件夹模板
    import  moveFolder from './moveFolder'//移动文件夹模板
    import  dataSetAttr from './dataSetAttr'//数据集描述模板模板
    import createDataSetPanel from "./panelModules/createDataSetPanel"
    import SqlModelEdit from "./dataModel/addSqlViewModel.vue"
    import addEditViewModel from "./dataModel/addEditViewModel.vue"
    export default {
        name:'dataSet',
        components:{creatFolder,moveFolder,dataSetAttr,createDataSetPanel,SqlModelEdit,addEditViewModel},//组件
        computed: {
            isNew () {
                return function (time) {
                    let creatTime = new Date(time);
                    let nowTime = new Date();
                    let hours = (nowTime - creatTime)/1000/60;
                    return hours>60?false:true
                }
            },
            mainTableHeight(){
                let that = this;
                return function(x){
                    return that.$refs.tbaF.clientHeight;
                  if(this.$ticketUtil.getCookie('notAppSso') == 'true'){
                    return window.innerHeight-x;
                  }
                  return window.innerHeight-x+60;
    
                    //return document.getElementById("tableBox").offsetHeight
                }
            },
          getDataSetTableList(){
              return function () {
                let result = []
                if(!this.dataSetListFilter){
                  return this.folderViewObj.folderList
                }else {
                  if(this.folderViewObj.folderList && this.folderViewObj.folderList.length>0){
                    for(let i=0;i<this.folderViewObj.folderList.length;i++){
                      if(this.folderViewObj.folderList[i].table_NAME_CN.indexOf(this.dataSetListFilter) > -1){
                        result.push(this.folderViewObj.folderList[i])
                      }
                    }
                  }
                }
                return  result
              }
          }
        },
      watch:{
        dataSetTreeFilter(val){
          this.$refs.selectTree.filter(val)
        },
        mainShow(val){
            if(val){
              this.$nextTick(()=>{
                   this.$refs.dataSetTable.doLayout()
              })
    
            }
        }
    
      },
        data(){
            return {
                mainShow:true,
                sqlEdit:false,
                sqlEditObj: {
                 tableId:'',
                 type:'add'
                },
                dates:'201009,201110',
                ssa_ticket:'',
                user_id:'',
                newDirId:'',//最新的数据集对象
                loading:false,//是否显示加载层
                isFolder:false,//是否文件夹内容
                isSearch:false,//是否为搜索内容
                loadText:this.$t('i18n173'),//加载层文字内容
                filterColValue:'',//搜索框内容
                filterColName:'TABLE_NAME_CN',//搜索框分类选择
                checkType:'my',//全部/我的
                tableData: [],//主列表数据
                creatFolderObj:{},
                moveDataSetId:'',
                moveDataSetIndex:'',
                moveFolderObj:{
                    openDialog:false,
                    selectFolderObj:{},
                    floderList:[]
                },
                folderViewObj:{
                    open:false,
                    folderId:'',
                    folderName:'',
                    ticket:'',
                    folderList:[]
                },
                dataSetAttrObj:{
                    openDialog:false,
                    dataSetId:'',
                    dataSetName:'',
                    dataSetDep:'',
                    ticket:'',
                    table_code:''
                },
                createDataSetPanelParam:{
                    open:false,
                },
                addEditViewModelData: {}, //当前编辑的模型信息
                doAddEditViewModelType: "add", //默认为添加
              dataSetDirTreeData:[],
              defaultProps:{
                children: 'children',
                label: 'dir_name',
                key:'dir_id'
              },
              dirFormData:{},
              dataSetTreeFilter:'',
              dataSetListFilter:''
            }
        },
        /*初始化页面系统*/
        created:function() {
            let _this =this;
            _this.ssa_ticket=_this.$ticketUtil.getCookie("ssa_ticket");
            _this.user_id = _this.$ticketUtil.getCookie('user_id');
            _this.init();
    
        },
        methods:{
            init:function(){//主方法入口
                this.initSysDir()
            },
    
          treeDataItemClick: function (data,node) {
            this.$refs.selectTree.setChecked(data.id)
            console.log(`===========${this.$t('i18n29')}=data==`,data)
        console.log(`===========${this.$t('i18n29')}=node==`,data)
            this.$set(this, 'dirFormData', this._.cloneDeep(data))
            this.getDataSetListByClass(data)
          },
          getDataSetListByClass:function(row){
            let _this = this;
            _this.filterColValue = '';
            _this.isSearch = false;
            _this.getDataSetList(row.dir_id,function(data){
              _this.folderViewObj.open = true;
              _this.folderViewObj.folderId = row.dir_id;
              _this.folderViewObj.folderName = row.dir_name;
              _this.folderViewObj.folderList = data;
              _this.isFolder = true;
            });
          },
    
    
    
          reloadDataSet(){
            let _this=this;
            this.getDataSetList(this.folderViewObj.folderId,function(data){
                _this.folderViewObj.folderList = data;
            });
          },
          //查询数据集目录数据
          initSysDir:function () {
            let _this = this
            let param = new URLSearchParams()
            param.append('dirCode', '0000002');
            param.append('keyword','');
            param.append('tree',true);
            this.$common.requireBackData({
              type: 'post',
              url: '/ssa/biDir/searchDirItems.action',
              param: param,
              successCallBack: function (response) {
                console.log(`$this.$t('i18n575')==============`,response)
                if(response.data.status==1){
                //  _this.dataSetDirTreeData =  response.data.data
                  if(response.data.data.length>0){
                    _this.$set(_this, 'dirFormData', response.data.data[0])
                    _this.getDataSetList(response.data.data[0].dir_id,function(data){
                      _this.folderViewObj.folderId = response.data.data[0].dir_id;
                      _this.folderViewObj.folderName = response.data.data[0].dir_name;
                      _this.folderViewObj.folderList = data;
                    });
                    response.data.data.forEach(function(item,index){
                        item.index = index;
                        _this.dataSetDirTreeData.push(item);
                    })
                  }
                }else{
                  _this.$message({showClose: true,message: response.data.msg||'error', type: 'error' });
                }
              },
              errorCallBack:function(error){
                _this.$message({showClose: true,message: _this.$t('i18n31'), type: 'error' });
              }
            });
          },
    
    
    
            formateTreeData(tree = []) {
                    let treeBuild = this._.cloneDeep(tree);
                    let emptyChild = (treeData = []) => {
                        treeData.forEach((el) => {
                        if (el.children && el.children.length) {
                            emptyChild(el.children);
                        }
                        if (el.children && el.children.length == 0) {
                            el.children = undefined;
                        }
                        });
                    };
                    emptyChild(treeBuild);
                    return treeBuild;
        },
            getFolderList:function(type,callBack){//获取文件夹列表
                let _this = this;
                _this.loading = true;
                let param = new URLSearchParams()
                param.append('ticket', _this.ssa_ticket);
                param.append('parentDirId', '');
                param.append("dirCode",'0000002')
                param.append("tree",'true')
                this.$common.requireBackData({
                    type: 'post',
                    url: "/ssa/biDir/searchDirItems.action",
                    param: param,
                    successCallBack: function (response) {
                        if(response.data.status==1){
                            callBack(_this.formateTreeData(response.data.data));
                        }else{
                            _this.$message({showClose: true,message: response.data.msg||'error', type: 'error' });
                        }
                        _this.loading = false;
                    }
                });
            },
            getDataSetList:function(dirId,callBack){//获取数据集列表
                let _this = this;
                _this.loading = true;
                let param = new URLSearchParams()
                param.append('ticket', _this.ssa_ticket);
                param.append('filterColName', _this.filterColName);
                param.append('filterColValue', _this.filterColValue);
                param.append('type', _this.checkType=='all'?1:2);
                param.append('dirId', dirId?dirId:'');
                this.$common.requireBackData({
                    type: 'post',
                    url: '/ssa/biTable/searchDataSetList.action',
                    param: param,
                    successCallBack: function (response) {
                        if(response.data.status==1){
                            callBack(response.data.data);
                        }else{
                            _this.$message({showClose: true,message: response.data.msg||'error', type: 'error' });
                        }
                        _this.loading = false;
                    }
                });
            },
    
          filterNode(value, data) {
            if (!value) return true;
            return data.dir_name.indexOf(value) !== -1;
          },
    
            commandFun:function(conmandObj){
                let _this = this;
                if(conmandObj.type=='delete'){
                    _this.deleteDataSet(conmandObj.param.row,conmandObj.param.$index)
                }else if(conmandObj.type=='move'){
                    _this.moveDataSet(conmandObj.param.row,conmandObj.param.$index)
                }else{
                    _this.shareFun(conmandObj.param.row,conmandObj.param.$index);
                };
            },
            creatFolder:function(row){
                let _this = this;
                _this.creatFolderObj={
                    openDialog:false,
                    title:_this.$t('i18n686'),
                    folderId:'',
                    folderName:'',
                    ticket:'',
                    index:0,
                    type:'new'
                };
                if(row){
                    _this.creatFolderObj.folderId = row.dir_id;
                    _this.creatFolderObj.folderName =row.dir_name;
                    _this.creatFolderObj.title = _this.$t('rename');
                    _this.creatFolderObj.type = 'rename';
                    _this.creatFolderObj.index = row.index;
                };
                _this.creatFolderObj.ticket = _this.ssa_ticket;
                _this.creatFolderObj.openDialog = true;
            },
            deleteFolder:function(data){
                let _this = this;
                this.$confirm(`${this.$t('i18n703')}?`, _this.$t('tips'), {
                    confirmButtonText: _this.$t('confirm'),
                    cancelButtonText: _this.$t('cancel'),
                    type: 'warning'
                }).then(() => {
                    _this.loading = true;
                    let param = new URLSearchParams()
                    param.append('ticket', _this.ssa_ticket);
                    param.append('DIR_ID', data.dir_id);
                    param.append('DIR_USE_TYPE', 1);
                    this.$common.requireBackData({
                        type: 'post',
                        url: '/ssa/biDir/deleteSysDir.action',
                        param: param,
                        successCallBack: function (response) {
                            if(response.data.status==1){
    
                                //记录操作
                                let operation_records_type=3;
                                let operation_records_obj_type=13;
                                let operation_records_obj_name=data.dir_name;
                                let operation_records_obj_id=data.dir_id;
                                let operation_records_obj_desc=_this.$t('i18n704')+operation_records_obj_name;
                                _this.$common.operation_records(operation_records_type,operation_records_obj_type,operation_records_obj_id,operation_records_obj_name,operation_records_obj_desc);
    
    
                                _this.dataSetDirTreeData.splice(data.index,1);
                                _this.$message({
                                    message: _this.$t('i18n471'),
                                    type: 'success'
                                });
                            }else{
                                _this.$message({showClose: true,message: response.data.msg||'error', type: 'error' });
                            }
                            _this.loading = false;
                        }
                    });
                });
            },
            shareFun:function(row,index){
                let _this = this;
                _this.loading = true;
                let state = row.table_LIMIT_TYPE;
                let param = new URLSearchParams()
                param.append('openState', state==0?1:0);
                param.append('tableId', row.table_ID);
                this.$common.requireBackData({
                    type: 'post',
                    url: '/ssa/biTable/openOperate.action',
                    param: param,
                    successCallBack: function (response) {
                        if(response.data.status==1){
                            let obj = JSON.parse(JSON.stringify(row));
                            obj.table_LIMIT_TYPE = state==0?1:0;
                            _this.$set(_this.folderViewObj.folderList,index,obj);
                            _this.$message({
                                message: row.table_NAME_CN+(state==0?_this.$t('disclosure'):_this.$t('i18n702'))+_this.$t('i18n705'),
                                type: 'success'
                            });
    
                            //记录操作
                            let operation_records_type=3;
                            let operation_records_obj_type=2;
                            let operation_records_obj_name=row.table_NAME_CN;
                            let operation_records_obj_id=row.table_ID;
                            let str=state==0?_this.$t('disclosure'):_this.$t('i18n702');
                            let operation_records_obj_desc=str+_this.$t('i18n682')+operation_records_obj_name;
                            _this.$common.operation_records(operation_records_type,operation_records_obj_type,operation_records_obj_id,operation_records_obj_name,operation_records_obj_desc);
    
    
                        }else{
                            _this.$message({showClose: true,message: response.data.msg||'error', type: 'error' });
                        }
                        _this.loading = false;
                    }
                });
            },
            deleteDataSet:function(row,index){
                let _this = this;
                this.$confirm(_this.$t('i18n706'), _this.$t('tips'), {//folderViewObj.open
                    confirmButtonText: _this.$t('confirm'),
                    cancelButtonText: _this.$t('cancel'),
                    type: 'warning'
                }).then(() => {
                    _this.loading = true;
                    let param = new URLSearchParams()
                    param.append('ticket', _this.ssa_ticket);
                    param.append('tableId', row.table_ID);
                    this.$common.requireBackData({
                        type: 'post',
                        url: '/ssa/biTable/deleteDataSet.action',
                        param: param,
                        successCallBack: function (response) {
                            if(response.data.status==1){
                                if(_this.folderViewObj.open){
                                    _this.folderViewObj.folderList.splice(index,1);
                                }else{
                                    _this.tableData.splice(index,1);
                                }
                                _this.$message({
                                    message: row.table_NAME_CN+_this.$t('deleteSuccess'),
                                    type: 'success'
                                });
    
                                //记录操作
                                let operation_records_type=3;
                                let operation_records_obj_type=2;
                                let operation_records_obj_name=row.table_NAME_CN;
                                let operation_records_obj_id=row.table_ID;
                                let operation_records_obj_desc=_this.$t('i18n707')+operation_records_obj_name;
                                _this.$common.operation_records(operation_records_type,operation_records_obj_type,operation_records_obj_id,operation_records_obj_name,operation_records_obj_desc);
    
                            }else{
                                _this.$message({showClose: true,message: response.data.msg||'error', type: 'error' });
                            }
                            _this.loading = false;
                        }
                    });
                });
            },
            moveDataSet:function(row,index){
                let _this = this;
                _this.getFolderList(_this.checkType,function(data){
                    _this.moveFolderObj.floderList.length = 0;
                    _this.moveFolderObj.selectFolderObj = {};
                    for(var i=0;i<data.length;i++){
                        if(data[i].dir_ID!=row.dir_ID){
                            _this.moveFolderObj.floderList.push(data[i]);
                        }
                    }
                    _this.moveDataSetIndex = index;
                    _this.moveDataSetId = row.table_ID;
                    _this.moveFolderObj.openDialog = true
                })
            },
            moveFolderFun:function(selectObj){
                let _this = this;
                _this.loading = true;
                let param = new URLSearchParams()
                param.append('ticket', _this.ssa_ticket);
                param.append('tableId', _this.moveDataSetId);
                param.append('dirId', selectObj.dir_ID);
                this.$common.requireBackData({
                    type: 'post',
                    url: '/ssa/biTable/updateDataSetDirIdByTableId.action',
                    param: param,
                    successCallBack: function (response) {
                        if(response.data.status==1){
                            if(_this.isFolder){
                                _this.folderViewObj.folderList.splice(_this.moveDataSetIndex.index,1);
                            }
                            _this.$message({
                                message: _this.$t('i18n708'),
                                type: 'success'
                            });
                        }else{
                            _this.$message({showClose: true,message: response.data.msg||'error', type: 'error' });
                        }
                        _this.loading = false;
                    }
                });
            },
            creatDashBoard:function(){
                window.open("./cube.html","_blank");
            },
            creatReport:function(row){
                //sql模型
                if(row.table_TYPE==1){
                    this.sqlEditObj.tableId=row.table_ID
                    this.sqlEditObj.type='edit'
                    this.sqlEdit=true;
                    this.mainShow=false;
                    return;
                }
                this.$common.updateDataViewCount(row.table_ID);
                let _this = this;
                if(row.table_TYPE == '3'){
                    window.open("./relation.html?tableId="+row.table_ID,"_blank");
                }else {
                    // window.open("./report.html?ticket="+_this.ssa_ticket+"&tableId="+row.table_ID,"_blank");
                    this.doAddEditViewModelType = "edit";
                    this.createDataSetPanelParam.open = true
                    this.$refs["modelAddPanel"].editInfo.dirId = row.dir_ID;
                    this.$refs["modelAddPanel"].editInfo.dirPath = row.dir_ID;
                    this.$refs["modelAddPanel"].editInfo.datasourceId = row.datasource_INS_ID;
                    this.$refs["modelAddPanel"].editInfo.tableId = row.table_ID;
                    this.$refs["modelAddPanel"].editModel();
                }
    
            },
            docreatDataSet:function(type){
                if(type == '1'){
                    //this.$router.push({path: 'dataSource'})
                    //打开数据集创建弹窗
                    this.doAddEditViewModelType = "add";
                    this.$set(this.createDataSetPanelParam,"open",true);
                }
                if(type == '2'){
                    window.open("./relation.html","_blank");
                }
                if(type == '3'){
                   this.sqlEdit=true;
                   this.mainShow=false;
                }
    
            },
            creatDataSet:function(type){
                if(type=="2"){
                    let _this = this;
                    let param = new URLSearchParams()
                    param.append('ticket', _this.ssa_ticket);
                    this.$common.requireBackData({
                        type: 'post',
                        url: '/ssa/savePermissions/checkCanCreatDataBase.action',
                        param: param,
                        successCallBack: function (response) {
                            if(response.data.status==1){
                                if(response.data.data==true) {
                                    _this.docreatDataSet(type)
                                }else{
                                    _this.$message({
                                        message:_this.$t('i18n38'),
                                        type: 'warning'
                                    });
                                }
                            }else{
                                _this.$message({showClose: true,message: response.data.msg||'error', type: 'error' });
                            }
                        },
                        errorCallBack:function(error){
                            _this.loading = false;
                        }
                    });
                }else{
                    this.docreatDataSet(type)
                }
    
            },
            openFolder:function(row){
                let _this = this;
                _this.filterColValue = '';
                _this.isSearch = false;
                _this.getDataSetList(row.dir_ID,function(data){
                    _this.folderViewObj.open = true;
                    _this.folderViewObj.folderId = row.dir_ID;
                    _this.folderViewObj.folderName = row.dir_NAME;
                    _this.folderViewObj.folderList = data;
                    _this.isFolder = true;
                });
            },
            getParentFolder:function(){
                let _this = this;
                _this.isFolder = false;
                _this.isSearch = false;
                _this.folderViewObj.open = false;
                _this.folderViewObj.folderId = '';
                _this.folderViewObj.folderName = '';
                _this.filterColValue = '';
                _this.getFolderList(_this.checkType,function(data){
                    _this.tableData = data;
                });
            },
            searchDataSetList:function(){
                let _this = this;
                _this.loading = true;
                _this.getDataSetList(_this.folderViewObj.folderId,function(data){
                    _this.folderViewObj.open = true;
                    _this.isSearch = true;
                    _this.folderViewObj.folderList = data;
                });
            },
            viewDataSetAttr:function(row,list,index){
                let _this = this;
                _this.dataSetAttrObj.ticket = _this.ssa_ticket;
                _this.dataSetAttrObj.list = list;
                _this.dataSetAttrObj.index = index;
                _this.dataSetAttrObj.dataSetId = row.table_ID;
                _this.dataSetAttrObj.table_code = row.table_CODE;
                _this.dataSetAttrObj.dataSetName = row.table_NAME_CN;
                _this.dataSetAttrObj.dataSetDep = row.table_DESC;
                _this.dataSetAttrObj.datasource_INS_ID = row.datasource_INS_ID;
                _this.dataSetAttrObj.openDialog = true;
            },
            checkTypeFun:function(type,callBack){
                let _this = this;
                if(_this.checkType == type){
                    return;
                }
                if(callBack){
                    callBack()
                }else{
                    _this.checkType = type;
                    _this.filterColValue = '';
                  _this.getDataSetList(_this.folderViewObj.folderId,function(data){
                    _this.folderViewObj.open = true;
                    _this.isSearch = true;
                    _this.folderViewObj.folderList = data;
                  });
            /*        _this.getFolderList(type,function(data){
                        _this.tableData = data;
                        _this.folderViewObj.open = false;
                        _this.isSearch = false;
                    });*/
                }
            }
        }
    }
    </script>
    <style scoped>
        #dataSet,#dataSet>.dataSetClass{height:100%;font-family: "Microsoft YaHei";position:relative}
    
        #folderView{width:100%;height:calc(100% - 42px);position:absolute;top:42px;background-color: #eff3f9;z-index: 3}
        #folderViewTitie{
            font-size: 12px;
            color: #4c4c4c66;
            margin: 10px 0 15px 0;
        }
        #folderViewTitie span{
            cursor:pointer;
            margin:0 5px
        }
        #folderViewTitie span:hover{
            color:#3A90F8;
        }
        #tableBox{height:calc(100% - 37px)}
        .titleBox{margin-bottom: 10px;border-color: #cfdaf866;}
        .titleBox .alignLeft {
            width: 120px;
        }
        .titleBox .alignCenter {
            display:inline-block;
            display: inline-block;
            font-size: 12px;
            margin-bottom: -8px;
            vertical-align: middle;
            width:200px
        }
        .titleBox .alignCenter span{
            display: inline-block;
            margin-left:20px;
            color: #4c4c4c;
            cursor:pointer
        }
        .titleBox .alignCenter span.active{
            color:#000;
            border-bottom: 2px solid #3A90F8;
        }
        .titleBox .alignRight{
            width:calc(100% - 320px)
        }
        .panelCont{
            padding: 0;
            margin-top: 10px;
            height: calc(100% - 52px);
        }
        .folderBox,.dataSetBox{
            font-size: 0;
            height: 100%;
            width: 100%;
        }
        .folderIcon{
            width: 40px;
            height: 100%;
            display: inline-block;
            line-height: 40px;
            text-align: center;
            vertical-align: middle;
        }
        .dataSetIcon{
            width: 32px;
            height: 32px;
            display: inline-block;
            line-height: 32px;
            text-align: center;
            vertical-align: middle;
            background-color: #AE6FFA
        }
        .folderIcon .iconfont,.dataSetIcon .iconfont{
            font-size: 36px;
            display: block;
            margin: 0;
            padding: 0;
            color: #A19BA8;
        }
        .dataSetIcon .iconfont{color:#fff;font-size:24px}
        .folderName{
            display: inline-block;
            height: 40px;
            max-width: calc(100% - 40px);
            vertical-align: middle;
            font-size: 12px;
            line-height: 40px;
            padding-left: 10px;
        }
        .dataSetNameBox{
            display: inline-block;
            height: 40px;
            max-width: calc(100% - 40px);
            vertical-align: middle;
            font-size: 12px;
            padding-left: 10px;
            cursor:pointer
        }
        .dataSetNameBox p{
            height:20px;
            line-height:20px;
            color: #ccc
        }
        .dataSetNameBox a{
            color:#4c4c4c;
            display: inline-block;
            max-width: 245px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            vertical-align: top;
        }
        .dataSetNameBox .newSpan{
            color: #ff000099;
            margin-left: 5px
        }
        .dateBox p{
            line-height:20px;
            color:#4c4c4c;
            height:20px;
            margin:0;
            padding:0;
            max-width: 100%;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            font-size:12px
        }
        .dateBox .bottomText{opacity: .6;}
        .folderName:hover{color:#3A90F8;cursor:pointer}
        .dataSetNameBox:hover a{color:#3A90F8}
        .controlIcon{font-size:14px;color:#4c4c4c;cursor: pointer;margin-left:8px}
        .controlIcon:hover{color:#3A90F8}
        .noDataBox{
            width: 200px;
            margin: 0 auto;
            text-align: center;
            transform: translate(0,200px);
        }
        .noDataBox i{font-size: 128px}
        .noDataBox p{font-size:14px;color:#666;margin:10px 0}
        .cellBox,.dateBox{width:100%;height:54px;line-height: 54px;}
        .dateBox{padding-top:7px}
        .cunode{
            max-width: 80%;
            display: inline-block;
        }
        .nodeLabel{
          font-size: 14px;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
           display: inline-block;
           max-width: 100%;
        }
        .nodeLabelActive{
          color: #00baff;
          font-weight: bold;
        }
        .dataSetData-home{
          height: calc(100% - 52px);
        }
        .dataSetData-home-tree{
          height: 100%;
          width: 400px;
          overflow-y: hidden;
          display: inline-block;
          background: #fff;
        }
        .dataSetData-home-tree-main{
          height: calc(100% - 48px);
          padding: 4px;
          overflow-y: auto;
          background: #fff;
    
        }
        .dataSetData-home-table{
          height: 100%;
          width: calc(100% - 410px);
          display: inline-block;
          overflow: auto;
          background: #fff;
        }
        .dataSetTreeFilter-input{
          vertical-align: middle;
          width: 320px;
        }
    </style>