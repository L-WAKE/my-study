<template>
    <div class="content">
        <div class="titleBox">
              <span class="title alignLeft">{{ $t('i18n861') }}</span>
          </div>
        <div class="filters">
            <span>{{ $t('i18n862') }}</span>
            <el-select size="mini" class="ft-status vm" v-model="filters.status" :placeholder="$t('pleaseSelect')" @change="getApiList('filter')">
               <el-option
                  v-for="item in apiStatus"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                  </el-option>
              </el-select>
              <span class="back">{{ $t('i18n844') }}</span>
              <el-input size="mini" class="ft-name vm" v-model="filters.key" placeholder=""></el-input>
              <el-button type="primary" size="mini" class="back" @click="getApiList('filter')">{{ $t('i18n170') }}</el-button>
              <el-button type="primary" size="mini" @click="addApi()">{{ $t('i18n675') }}</el-button>
        </div>
        <div class="apiList">
          <el-table
              size="mini"
              stripe
              height="100%"
              show-overflow-tooltip
              v-loading="apiListLoading"
              :data="tableData"
              style="width: 100%">
              <el-table-column
                  header-align="left"
                  align="left"
                  prop="api_name"
                  :label="$t('i18n844')"
                  width="380">
              </el-table-column>
              <el-table-column
                  header-align="center"
                  align="center"
                  prop="api_online"
                  :label="$t('state')"
                  width="80">
                  <template slot-scope="scope">
                      {{getLabelByValue(scope.row.api_online,apiStatus)}}
                  </template>
              </el-table-column>
              <el-table-column
                  header-align="center"
                  align="center"
                  prop="api_creator_name"
                  :label="$t('createdBy')"
                  width="180">
              </el-table-column>
              <el-table-column
                  header-align="center"
                  align="center"
                  prop="api_create_time"
                  :label="$t('createTime')"
                  width="180">
              </el-table-column>
              <el-table-column
                  header-align="center"
                  align="center"
                  prop="biser_version"
                  :label="$t('i18n863')"
                  width="80">
              </el-table-column>
              <el-table-column
                  header-align="center"
                  align="center"
                  :label="$t('operation')">
                  <template slot-scope="scope" style="white-space:nowrap">
                      <el-button v-if="scope.row.api_online===1" type="text" size="small" @click="handleOffLine(scope.row.api_id,0)">{{ $t('i18n864') }}</el-button>
                      <el-button v-else type="text" size="small" @click="handleOffLine(scope.row.api_id,1)">{{ $t('i18n865') }}</el-button>
                      <el-button type="text" size="small" @click="editApi(scope.row.api_id)">{{ $t('edit') }}</el-button>
                      <el-button type="text" size="small" @click="viewApi(scope.row.api_id)">{{ $t('check') }}</el-button>
                      <el-button v-if="scope.row.api_file_id" type="text" size="small" @click="downloadDoc(scope.row.api_file_id)">{{ $t('i18n866') }}</el-button>
                      <el-button type="text" size="small" @click="deleteApi(scope.row.api_id)">{{ $t('delete') }}</el-button>
                  </template>
              </el-table-column>
          </el-table>
        </div>
        <div class="breakPage">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="filters.pageIndex"
              :page-sizes="[2,5, 10, 20, 40]"
              :page-size="filters.pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="filters.pageCount">
          </el-pagination>
        </div>
        <el-dialog
          :title="editDialogStatus"
          :visible.sync="showEditDialog"
          :before-close="closeEditDialog"
          width="1070px">
          <div class="apiEditForm">
              <el-form :inline="true" :model="editFormData" class="demo-form-inline">
                  <el-form-item :label="$t('i18n844')" style="width:400px">
                      <el-input size="mini" style="width:300px" v-model="editFormData.name"></el-input>
                  </el-form-item>
                  <el-form-item :label="$t('i18n867') + 'URL'" style="width:474px">
                      <el-input size="mini" style="width:374px" v-model="editFormData.url"></el-input>
                  </el-form-item>
                  <el-form-item :label="$t('i18n868')" style="width:400px">
                      <el-input size="mini" style="width:300px" disabled v-model="editFormData.code"></el-input>
                  </el-form-item>
  
                  <el-form-item :label="$t('createdBy')" style="width:230px">
                      <el-input size="mini" style="width:130px" disabled v-model="editFormData.create_name"></el-input>
                  </el-form-item>
                  <el-form-item :label="$t('createTime')" style="width:230px">
                      <el-input size="mini" style="width:130px" disabled v-model="editFormData.create_time"></el-input>
                  </el-form-item>
                  <el-form-item :label="$t('i18n869')" style="width:400px">
                      <el-select size="mini" style="width:147px" v-model="editFormData.sourceClass">
                          <el-option v-for="(item,index) in sourceClass" :label="item.label" :value="item.value" :key="'sc_'+index"></el-option>
                      </el-select>
                      <el-select size="mini" style="width:148px" v-model="editFormData.sourceId">
                          <el-option v-for="(item,index) in sourceItem" :label="item.name" :value="item.id" :key="'si_'+index"></el-option>
                      </el-select>
                  </el-form-item>
                  <el-form-item :label="$t('i18n12')" style="width:474px">
                      <el-input size="mini" style="width:374px" v-model="editFormData.remarks"></el-input>
                  </el-form-item>
              </el-form>
              <div class="history">
                  <div class="subTitle">
                      <span>{{ $t('i18n870') }}</span>
                  </div>
                  <div class="historyList">
                      <el-table
                          size="mini"
                          stripe
                          height="100%"
                          show-overflow-tooltip
                          v-loading="publicListLoading"
                          :data="editFormData.historyData"
                          :cell-style="{height:'20px',padding:'0'}"
                          style="width: 100%">
                          <el-table-column
                              header-align="left"
                              align="left"
                              prop="biser_id"
                              :label="$t('i18n871') + 'id'"
                              width="60">
                          </el-table-column>
                          <el-table-column
                              header-align="center"
                              align="center"
                              prop="biser_version"
                              :label="$t('i18n872')"
                              width="60">
                          </el-table-column>
                          <el-table-column
                              header-align="center"
                              align="center"
                              prop="biser_update_time"
                              :label="$t('i18n873')"
                              width="148">
                          </el-table-column>
                          <el-table-column
                              header-align="center"
                              align="center"
                              :label="$t('i18n874')"
                              width="140">
                              <template slot-scope="scope">
                                  <span>{{getLabelByValue(scope.row.biser_source_type,sourceClass)}}</span>
                              </template>
                          </el-table-column>
                          <el-table-column
                              header-align="center"
                              align="center"
                              prop="biser_source_name"
                              :label="$t('i18n869')"
                              width="180">
                          </el-table-column>
                          <el-table-column
                              header-align="center"
                              align="center"
                              prop="biser_remark"
                              :label="$t('i18n12')"
                              width="140">
                          </el-table-column>
                          <el-table-column
                              header-align="center"
                              align="center"
                              :label="$t('operation')"
                              width="300">
                              <template slot-scope="scope" style="white-space:nowrap">
                                  <el-button type="text" size="small"  @click="viewApi(editFormData.id,scope.row.biser_id)">{{ $t('check') }}</el-button>
                                  <el-button type="text" size="small"  @click="testPubApi(scope.row.biser_id)">{{ $t('i18n875') }}</el-button>
                                  <el-button v-if="scope.row.api_file_id" type="text" size="small"  @click="downloadDoc(scope.row.api_file_id)">{{ $t('i18n876') }}</el-button>
                                  <el-button v-if="scope.row.biser_state==1" type="text" size="small"  @click="deletePublic(scope.row.biser_id,nowApiId)">{{ $t('delete') }}</el-button>
                                  <el-button v-else type="text" size="small"  @click="publicApi(scope.row.biser_id,nowApiId)">{{ $t('publish') }}</el-button>
                              </template>
                          </el-table-column>
                      </el-table>
                  </div>
              </div>
          </div>
          <span slot="footer" class="dialog-footer">
              <el-button size="small" @click="closeEditDialog">{{ $t('cancel') }}</el-button>
              <!-- <el-button size="small" type="primary" @click="saveApi(0)">暂 存</el-button> -->
              <el-button size="small" type="primary" @click="saveApi(1)" :disabled="isSave">{{ $t('i18n877') }}</el-button>
          </span>
        </el-dialog>
  
        <el-dialog
          :title="$t('i18n878')"
          :visible.sync="showViewDialog"
          :before-close="closeViewDialog"
          width="940px">
          <div class="viewApi">
              <div class="apiInfo">
                  <span>{{ $t('i18n828') }}</span>
                  <span :title="viewApiData.apiInfo.api_name">{{viewApiData.apiInfo.api_name}}</span>
                  <span>{{ $t('i18n879') }}</span>
                  <span>{{viewApiData.apiInfo.user_name}}</span>
                  <span>{{ $t('i18n880') }}</span>
                  <span>{{viewApiData.apiInfo.api_create_time}}</span>
                  <span>{{ $t('i18n881') }}</span>
                  <span :title="viewApiData.apiInfo.bimodel_name">{{viewApiData.apiInfo.bimodel_name}}</span>
                  <span>{{ $t('i18n882') }}</span>
                  <span>{{viewApiData.apiInfo.biser_version}}</span>
              </div>
              <div class="params">
                  <div class="subTitle">
                      <span>{{ $t('i18n883') }}</span>
                      <span v-if="viewApiData.paramData.length==0">{{ $t('i18n884') }}</span>
                  </div>
                  <div class="paramsList">
                      <el-table v-if="viewApiData.paramData.length>0"
                          size="mini"
                          stripe
                          height="130"
                          show-overflow-tooltip
                          :data="viewApiData.paramData"
                          :cell-style="{height:'20px',padding:'0'}"
                          style="width: 100%">
                          <el-table-column
                              prop="name"
                              :label="$t('i18n885')"
                              width="200">
                          </el-table-column>
                          <el-table-column
                              header-align="center"
                              align="center"
                              :label="$t('i18n506')"
                              width="120">
                              <template slot-scope="scope">
                                  <span v-if="scope.row.ismust=='1'">{{ $t('i18n570') }}</span>
                                  <span v-else>{{ $t('i18n571') }}</span>
                              </template>
                          </el-table-column>
                          <el-table-column
                              header-align="center"
                              align="center"
                              prop="type"
                              :label="$t('i18n469')"
                              width="160">
                          </el-table-column>
                          <el-table-column
                              header-align="center"
                              align="center"
                              prop="remark"
                              :label="$t('i18n414')"
                              width="420">
                          </el-table-column>
                      </el-table>
                  </div>
                  <div class="response">
                      <div class="dib vt resBox">
                          <div class="resTitle">
                              <span>{{ $t('i18n886') }}</span>
                          </div>
                          <div class="code">
                              <json-viewer theme="viewCode" :value="viewApiData.jsonInData" :expand-depth="6"></json-viewer>
                          </div>
                      </div>
                      <div class="dib vt resBox">
                          <div class="resTitle">
                              <span>{{ $t('i18n887') }}</span>
                          </div>
                          <div class="code">
                              <json-viewer theme="viewCode" :value="viewApiData.jsonOutData" :expand-depth="6"></json-viewer>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
          <span slot="footer" class="dialog-footer">
              <el-button size="small" @click="showViewDialog=false">{{ $t('i18n277') }}</el-button>
          </span>
        </el-dialog>
    </div>
  </template>
  
  <script>
  import jsonViewer from 'vue-json-viewer'
  export default {
      name:"dataPowerApiManager",
      components:{jsonViewer},
      data(){
          return {
              apiListLoading:true,
              publicListLoading:true,
              user_name: this.$ticketUtil.getCookie("user_name"),
              user_id: this.$ticketUtil.getCookie("user_id"),
              showEditDialog:false,
              editDialogStatus:this.$t('i18n675'),
              showViewDialog:false,
              nowApiId:null,
              isSave:false,
              filters:{
                  status:null,
                  key:'',
                  pageSize:10,
                  pageIndex:1,
                  pageCount:0
              },
              apiStatus:[
                  {label:this.$t('all'),value:null},
                  {label:this.$t('i18n865'),value:1},
                  {label:this.$t('i18n864'),value:0},
              ],
              tableData: [],
              viewApiData:{
                  apiInfo:{
                      api_name:'',
                      user_name:'',
                      api_create_time:'',
                      bimodel_name:'',
                      biser_version:''
                  },
                  paramData:[],
                  jsonInData:{},
                  jsonOutData:{}
              },
              sourceClass:[
                  {label:this.$t('i18n888'),value:1},
                  // {label:'指标库',value:2}
              ],
              sourceItem:[],
              editFormData:{
                  id:null,
                  code:'',
                  name:'',
                  url:'',
                  create_name:'',
                  create_time:'',
                  key:'',
                  sourceClass:1,
                  sourceId:null,
                  remarks:'',
                  historyData:[],
              }
          }
      },
      mounted(){
          this.getApiList();
          // this.$common.requireBackData({
          //     type: 'post',
          //     url: '/ssa/biApi/searchSourceItems.action',
          //     successCallBack: (response) => {
          //         if (response.status == 200) {
          //             this.sourceItem = response.data.data;
          //         } else {
          //             this.$message({showClose: true,message: "获取数据源列表失败！", type: 'error' });
          //         }
          //     }
          // });
      },
      methods:{
          reflushSourceList(fn){
            let _this = this
              this.$common.requireBackData({
                  type: 'post',
                  url: '/ssa/biApi/searchSourceItems.action',
                  successCallBack: (response) => {
                      if (response.status == 200) {
                          this.sourceItem = response.data.data;
                          if(fn && typeof fn == 'function'){
                              fn();
                          }
                      } else {
                          this.$message({showClose: true,message: _this.$t('i18n889'), type: 'error' });
                      }
                  }
              });
          },
          getApiList(key){
            let _this = this
              this.apiListLoading = true;
              if(key=='filter'){
                  this.$set(this.filters,'pageIndex',1)
              }
              let param={
                  pageSize:this.filters.pageSize,
                  pageStart:this.filters.pageIndex,
                  api_online:this.filters.status,
                  api_name:this.filters.key
              }
              this.$common.requireBackData({
                  type: 'post',
                  url: '/ssa/biApi/searchSimpleApi.action',
                  param:param,
                  successCallBack: (response) => {
                      if (response.status == 200 && response.data.status==1) {
                          let _data = response.data.data;
                          console.log(_this.$t('i18n890'),_data.data)
                          this.$set(this.filters,'pageCount',_data.totalSize);
                          this.tableData = _data.data;
                      } else {
                          this.$message({showClose: true,message: `${_this.$t('i18n891')}API${_this.$t('i18n892')}`, type: 'error' });
                      }
                      this.apiListLoading = false
                  }
              });
          },
          handleSizeChange(val){
              this.$set(this.filters,'pageSize',val);
              this.getApiList();
          },
          handleCurrentChange(val){
              this.$set(this.filters,'pageIndex',val);
              this.getApiList();
          },
          handleOffLine(id,val){
            let _this = this
              let param = {
                  api_id: id,
                  api_online: val
              }
              this.$common.requireBackData({
                  type: 'post',
                  url: '/ssa/biApi/updateApiOnlineState.action',
                  param:param,
                  successCallBack: (response) => {
                      if (response.status == 200 && response.data.status==1) {
                          this.$message({
                              message: _this.$t('i18n893'),
                              type: 'success'
                          });
                          this.getApiList();
                      } else {
                          this.$message({showClose: true,message: _this.$t('i18n894'), type: 'error' });
                      }
                  }
              });
          },
          addApi(){
              this.editDialogStatus = this.$t('i18n675')
              this.showEditDialog = true;
              this.publicListLoading = false;
              this.editFormData.create_name = this.user_name;
              this.editFormData.create_time = this.$common.dateFormat('yyyyMMdd',new Date())
              this.reflushSourceList();
          },
          editApi(id){
            let _this  = this
              this.nowApiId = id;
              this.editDialogStatus = _this.$t('edit')
              this.reflushSourceList(()=>{
                  this.$common.requireBackData({
                      type: 'post',
                      url: '/ssa/biApi/searchApiDetailInfo.action?api_id='+id,
                      successCallBack: (response) => {
                          if (response.status == 200 && response.data.status==1) {
                              let _data = response.data.data;
                              this.$set(this.editFormData,'id',_data.api_id);
                              this.$set(this.editFormData,'name',_data.api_name);
                              this.$set(this.editFormData,'code',_data.api_code);
                              this.$set(this.editFormData,'url',_data.api_url);
                              this.$set(this.editFormData,'create_name',_data.api_creator_name);
                              this.$set(this.editFormData,'create_time',_data.api_create_time);
                              this.$set(this.editFormData,'key',_data.api_key);
                              this.$set(this.editFormData,'sourceId',_data.biser_source_id?parseInt(_data.biser_source_id):null);
                              this.$set(this.editFormData,'sourceClass',_data.biser_source_type?_data.biser_source_type:1);
                              this.$set(this.editFormData,'remarks',_data.api_remark);
                              this.showEditDialog = true;
                              this.getHistory(id);
                          } else {
                              this.$message({showClose: true,message: _this.$t('i18n894'), type: 'error' });
                          }
                      }
                  });
              });
  
          },
          getHistory(id){
            let _this = this
              this.publicListLoading=true;
              this.$common.requireBackData({
                  type: 'post',
                  url: '/ssa/biApi/searchBusBiSerHisInfo.action',
                  param:{
                      api_id: id,
                      pageSize: 1000,
                      pageStart: 1
                  },
                  successCallBack: (response) => {
                      if (response.status == 200 && response.data.status==1) {
                          this.$set(this.editFormData,'historyData',response.data.data.data);
                      } else {
                          this.$message({showClose: true,message: _this.$t('i18n895'), type: 'error' });
                      }
                      this.publicListLoading = false;
                  }
              });
          },
          viewApi(id,pid){
            let _this = this
              this.showViewDialog = true;
              let param = new URLSearchParams()
              param.append('api_id',id);
              pid&&param.append('biser_id',pid);
              this.$common.requireBackData({
                  type: 'post',
                  url: '/ssa/biApi/searchAccessLogDetailById.action',
                  param:param,
                  successCallBack: (response) => {
                          console.log(_this.$t('i18n896'),response)
                      if (response.status == 200 && response.data.status==1) {
                          let _apiInfo = this.viewApiData.apiInfo,_res = response.data.data;
                          this.$set(_apiInfo,'api_name',_res.api.api_name);
                          this.$set(_apiInfo,'user_name',_res.api.user_name);
                          this.$set(_apiInfo,'api_create_time',_res.api.api_create_time);
                          this.$set(_apiInfo,'bimodel_name',_res.api.bimodel_name);
                          this.$set(_apiInfo,'biser_version',_res.api.biser_version);
                          this.$set(this.viewApiData,'paramData',_res.list);
                          this.$set(this.viewApiData,'jsonInData',JSON.parse(_res.inputString));
                          this.$set(this.viewApiData,'jsonOutData',JSON.parse(_res.returnStr));
                      } else {
                          this.$message({showClose: true,message: _this.$t('i18n894'), type: 'error' });
                      }
                  }
              });
          },
          saveApi(autoPub){
            let _this = this
              this.isSave=true;
              let _status = true;
              let _param = {
                  api_code: this.editFormData.code,
                  api_id: this.editFormData.id,
                  api_key: this.editFormData.key,
                  api_name: this.editFormData.name,
                  api_remark: this.editFormData.remarks,
                  api_url: this.editFormData.url,
                  biser_source_id: this.editFormData.sourceId+'',
                  biser_source_type: this.editFormData.sourceClass,
              };
              if(!_param.api_name.trim()){
                  setTimeout(()=>{this.$message({showClose: true,message: _this.$t('i18n897'));},10, type: 'error' });
                  _status = false;
              }
              if((_param.api_name.trim()).length>64){
                  setTimeout(()=>{this.$message({showClose: true,message: _this.$t('i18n898'));},10, type: 'error' });
                  _status = false;
              }
              if(!_param.api_url){
                  setTimeout(()=>{this.$message({showClose: true,message: `${_this.$t('i18n867')}url${_this.$t('i18n899')}`);},20, type: 'error' });
                  _status = false;
              }
              if(_param.biser_source_id=='null'){
                  setTimeout(()=>{this.$message({showClose: true,message: _this.$t('i18n900'));},30, type: 'error' });
                  _status = false;
              }
              if(!_status){
                  this.isSave = false;
                  return false;
              }
              _param.autoPublishVersion=autoPub;
              this.$common.requireBackData({
                  type: 'post',
                  url: '/ssa/biApi/saveOrUpdateBusApi.action',
                  param:_param,
                  successCallBack: (response) => {
                      if (response.status == 200 && response.data.status==1) {
                          this.$message({
                              message: _this.$t('i18n901'),
                              type: 'success'
                          });
                          this.getApiList();
                          if(this.nowApiId && autoPub==0){
                              this.getHistory(this.nowApiId);
                          }else{
                              this.closeEditDialog()
                          }
  
                      } else {
                          this.$message({showClose: true,message: _this.$t('i18n894'), type: 'error' });
                      }
                      this.isSave = false;
                  }
              });
          },
  
          deleteApi(id){
            let _this = this
              this.$confirm(_this.$t('confirmDelete'), "", {type: 'warning', center: true}).then(()=>{
                  this.$common.requireBackData({
                      type: 'post',
                      url: '/ssa/biApi/deleteApi.action?api_id='+id,
                      successCallBack: (response) => {
                          if (response.status == 200 && response.data.status==1) {
                              this.$message({
                                  message: _this.$t('i18n902'),
                                  type: 'success'
                              });
                              this.getApiList();
                          } else {
                              this.$message({showClose: true,message: _this.$t('i18n903'), type: 'error' });
                          }
                      }
                  });
              }).catch(() => {});
          },
          publicApi(pid,aid){
              this.$confirm(_this.$t('i18n904'), "", {type: 'warning', center: true}).then(()=>{
                  this.$common.requireBackData({
                      type: 'post',
                      url: '/ssa/biApi/publishVersion.action',
                      param:{
                          api_id:aid,
                          biser_id:pid
                      },
                      successCallBack: (response) => {
                          if (response.status == 200) {
                              this.$message({
                                  message: _this.$t('i18n905'),
                                  type: 'success'
                              });
                              this.getApiList();
                              this.getHistory(aid);
                          } else {
                              this.$message({showClose: true,message: _this.$t('i18n903'), type: 'error' });
                          }
                      }
                  });
              }).catch(() => {});
          },
          deletePublic(pid,aid){
            let _this = this
              this.$confirm(_this.$t('i18n906'), "", {type: 'warning', center: true}).then(()=>{
                  this.$common.requireBackData({
                      type: 'post',
                      url: '/ssa/biApi/deleteVersion.action',
                      param:{
                          api_id:aid,
                          biser_id:pid
                      },
                      successCallBack: (response) => {
                          if (response.status == 200) {
                              this.$message({
                                  message: _this.$t('i18n907'),
                                  type: 'success'
                              });
                              this.getApiList();
                              this.getHistory(aid);
                          } else {
                              this.$message({showClose: true,message: _this.$t('i18n903'), type: 'error' });
                          }
                      }
                  });
              }).catch(() => {});
          },
          testPubApi(pid){
            let _this =  this
              console.log(pid);
              this.$common.requireBackData({
                  type: 'post',
                  url: '/ssa/biApi/testApi.action',
                  param:{
                      biser_id:pid
                  },
                  successCallBack: (response) => {
                      if (response.status == 200) {
                          this.$message({
                              message: _this.$t('i18n908'),
                              type: 'success'
                          });
                      } else {
                          this.$message({showClose: true,message: _this.$t('i18n909'), type: 'error' });
                      }
                  }
              });
          },
          closeEditDialog(){
              this.showEditDialog = false;
              this.$set(this.editFormData,'id',null);
              this.$set(this.editFormData,'name','');
              this.$set(this.editFormData,'code','');
              this.$set(this.editFormData,'url','');
              this.$set(this.editFormData,'create_name','');
              this.$set(this.editFormData,'create_time','');
              this.$set(this.editFormData,'key','');
              this.$set(this.editFormData,'sourceId','');
              this.$set(this.editFormData,'sourceClass',1);
              this.$set(this.editFormData,'remarks','');
              this.$set(this.editFormData,'historyData',[]);
          },
          closeViewDialog(){
              this.showViewDialog=false;
              let _apiInfo = this.viewApiData.apiInfo;
              this.$set(_apiInfo,'api_name','');
              this.$set(_apiInfo,'user_name','');
              this.$set(_apiInfo,'api_create_time','');
              this.$set(_apiInfo,'bimodel_name','');
              this.$set(_apiInfo,'biser_version','');
              this.$set(this.viewApiData,'paramData',[]);
              this.$set(this.viewApiData,'jsonInData',{});
              this.$set(this.viewApiData,'jsonOutData',{});
          },
          downloadDoc(fileId){
              let url = '/ssa/biFile/resource.action?fileId='+fileId+'&businessType=12';
              window.open(url)
          }
      },
      computed:{
          getLabelByValue(){
              return function(val,arr){
                  for(let i=0;i<arr.length;i++){
                      if(val==undefined){
                          return this.$t('i18n910')
                      }else{
                          if(arr[i].value==val){
                              return arr[i].label;
                          }
                      }
                  }
              }
          }
      }
  }
  </script>
  
  <style scoped>
  .content{
      width:100%;
      height:100%;
      overflow:hidden;
      box-sizing: border-box;
  }
  .filters{
      padding:10px 20px;
      font-size:12px;
      background:#fff;
      border-bottom: 1px solid #cfd5de;
  }
  .ft-name{
      width:200px;
  }
  .back{
      margin-left:20px;
  }
  .breakPage{
      padding:10px;
      text-align: right;
  }
  .apiList{
      height:calc(100% - 100px);
  }
  .apiEditForm /deep/ .el-form-item__label{
      width:100px;
      text-align: right;
  }
  .el-form-item{
      margin-bottom:10px;
  }
  .history{
      border-top:1px solid #E4E7ED;
  }
  .historyList{
      height:260px;
      border:1px solid #e4e7ed;
  }
  .subTitle{
      line-height:32px;
      font-size:14px;
      font-weight: 700;
  }
  .paramsList{
      border-top:1px solid #E4E7ED;
      border-bottom:1px solid #E4E7ED;
  }
  .apiInfo{
      padding:10px;
      background:#f7f7f7;
  }
  .apiInfo span:nth-child(2n){
      margin-right:20px;
      font-size:12px;
      display:inline-block;
      max-width:124px;
      overflow:hidden;
      white-space: nowrap;
      text-overflow:ellipsis;
  }
  .response{
      padding:10px 0;
  }
  .resBox{
      height:240px;
      width:calc(50% - 13px);
  }
  .resBox:last-child{
      margin-left:20px;
  }
  .resTitle{
      line-height: 28px;
      font-size:14px;
      font-weight: 700;
      border-bottom:1px solid #E4E7ED;
      margin-bottom:10px;
  }
  .code{
      height:200px;
      overflow:auto;
      background:#f5f5f5;
  }
  .viewCode{
      background:#f5f5f5;
  }
  .viewCode /deep/ .jv-node{
      padding:3px 0;
  }
  </style>