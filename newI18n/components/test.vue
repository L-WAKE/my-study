<!--流程跟踪-->
<template>
  <div class="mainBody">
    <el-card>
      <div slot="header">
        <span>重点场景查询</span>
        <div style="display: inline-block; width: 90%">
          <div style="display: inline-block; margin-left: 55%; float: right">
            <span>查询日期:</span>
            <!--<el-date-picker
                size="mini"
                v-model="timerange"
                value-format="yyyy-MM-dd hh:mm:ss"
                type="datetimerange"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :default-time="['00:00:00']">
              </el-date-picker>-->

            <el-date-picker
              v-model="startDate"
              type="date"
              size="mini"
              value-format="yyyy-MM-dd"
              style="width: 190px"
              placeholder="选择开始日期"
            >
            </el-date-picker>
            至
            <el-date-picker
              v-model="endDate"
              type="date"
              size="mini"
              value-format="yyyy-MM-dd"
              style="width: 190px"
              placeholder="选择结束日期"
            >
            </el-date-picker>
          </div>
        </div>
      </div>
      <el-row style="padding-top: 5px; padding-bottom: 5px">
        <el-col :span="24">
          <el-radio-group
            v-model="mainPosition"
            style="margin-left: 1.3%"
            size="medium"
            @change="positionChange"
          >
            <el-radio-button
              v-for="position in mainPositionScenes"
              :key="position.id"
              :disabled="!position.canClick"
              :label="position.id"
              >{{ position.name }}</el-radio-button
            >
          </el-radio-group>
        </el-col>
      </el-row>
      <div @mousewheel="rollScroll($event)">
        <el-carousel
          height="125px"
          direction="vertical"
          ref="carousel"
          :autoplay="true"
          :interval="10000"
          @mousewheel="rollScroll($event)"
        >
          <el-carousel-item v-for="index0 in 1" :key="index0" style="width: 98%">
            <el-row v-for="(scenes, index1) in monitorScenesKpi" :key="index1">
              <el-col v-for="(scene, index2) in scenes" :span="3" :key="index2">
                <div
                  id="scene.id"
                  v-if="
                    index0 == 1
                      ? true
                      : (index0 - 1) * 8 <= index1 * 8 + index2 &&
                        index1 * 8 + index2 <= index0 * 8
                  "
                  v-loading="scene.loading"
                  :class="
                    searchCondition.selectScene == scene.id
                      ? 'fangkuai fangkuaiSelected'
                      : 'fangkuai'
                  "
                  @click="changeScene(scene)"
                >
                  <el-row>
                    <el-col :span="24">
                      <div class="fangkuaiTitle">
                        <p>{{ scene.name }}</p>
                      </div>
                    </el-col>
                    <el-col :span="24">
                      <div
                        :class="
                          searchCondition.selectScene == scene.id
                            ? 'fangkuaiContentSelected'
                            : 'fangkuaiContent'
                        "
                      >
                        <p>
                          已解决<span style="color: red; margin-left: 10%">{{
                            scene.solved
                          }}</span>
                        </p>
                        <p>
                          未解决<span
                            style="color: rgba(0, 218, 168, 1); margin-left: 10%"
                            >{{ scene.unSolved }}</span
                          >
                        </p>
                      </div>
                    </el-col>
                  </el-row>
                </div>
              </el-col>
            </el-row>
          </el-carousel-item>
        </el-carousel>
      </div>
    </el-card>

    <el-card class="cardStyle">
      <div slot="header">
        <span>事件处理流程</span>
      </div>
      <div class="body">
        <div class="conditionPart">
          <el-input
            v-model="searchCondition.inputValue"
            size="mini"
            style="width: 250px"
            placeholder="请输入工单名称或工单编号模糊查询"
          ></el-input>
          <el-button
            size="mini"
            style="margin-left: 5px"
            class="el-icon-search"
            type="primary"
            @click="setTableData"
            >查询</el-button
          >
          <el-button
            size="mini"
            style="margin-left: 5px"
            class="el-icon-refresh"
            @click="reset"
            >重置</el-button
          >
          <el-button
            size="mini"
            style="margin-left: 5px"
            :class="
              showMoreCondition ? 'el-icon-remove-outline' : 'el-icon-circle-plus-outline'
            "
            @click="showMoreCondition = !showMoreCondition"
            >{{ showMoreCondition ? "隐藏更多查询条件" : "显示更多查询条件" }}</el-button
          >
        </div>
        <div class="conditionPart" style="display: flex">
          <transition name="el-zoom-in-bottom">
            <div v-show="showMoreCondition" class="conditionSelect">
              <el-select
                v-model="searchCondition.statusValue"
                class="conditionSelect"
                size="mini"
                clearable
                placeholder="请选择状态"
              >
                <el-option
                  v-for="item in statusValues"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
          </transition>
          <transition name="el-zoom-in-bottom">
            <div v-show="showMoreCondition" class="conditionSelect">
              <!--<el-select v-model="searchCondition.areaCondition" class="conditionSelect" size="mini" clearable placeholder="请选择区域">
                  <el-option
                    v-for="item in areaList"
                    :key="item.CODE"
                    :label="item.NAME"
                    :value="item.CODE">
                  </el-option>
                </el-select>-->
              <treeselect
                style="width: 480px"
                size="mini"
                :multiple="true"
                value-consists-of="ALL"
                :options="areaList"
                placeholder="请选择区域..."
                v-model="searchCondition.areaCondition"
              />
              <treeselect-value :value="searchCondition.areaCondition" />
            </div>
          </transition>
        </div>
      </div>
      <div class="theFlowChart">
        <div class="content">
          <!-- <iframe  id="show-iframe"  width="100%" height="100%" style="border:0px" scrolling=auto src=""></iframe>-->
          <evevtLocus :conditionData="conditionData"></evevtLocus>
        </div>
      </div>
    </el-card>

    <el-card class="cardStyle">
      <div slot="header">
        <span>事件列表</span>
      </div>
      <div style="overflow: auto; height: 535px">
        <div style="padding: 10px; background-color: white">
          <el-table
            :data="tableData"
            :header-cell-style="tableHeaderColor"
            :cell-style="{ 'text-align': 'center' }"
            v-loading="tableLoading"
            id="evenList"
            height="460"
            size="mini"
            @row-click="showProcess"
            highlight-current-row
            style="width: 100%"
          >
            <el-table-column
              prop="event_inst_id"
              label="工单编号"
              show-overflow-tooltip
              width="200"
            ></el-table-column>
            <el-table-column
              prop="ev_alarmtitle"
              label="工单名称"
              show-overflow-tooltip
              width="130"
            ></el-table-column>
            <el-table-column
              prop="ev_eventtime"
              show-overflow-tooltip
              width="180"
              label="报障时间"
            ></el-table-column>
            <el-table-column
              prop="col3"
              show-overflow-tooltip
              label="具体地址"
            ></el-table-column>
            <el-table-column
              prop="common_region_name"
              show-overflow-tooltip
              width="80"
              label="归属市州"
            ></el-table-column>
            <el-table-column
              prop="bss_org_name"
              show-overflow-tooltip
              width="180"
              label="归属区县"
            ></el-table-column>
            <el-table-column width="100" label="处理状态">
              <template slot-scope="scope">
                <img
                  :src="
                    scope.row.is_solve == '进行中'
                      ? statusGreenImageUrl
                      : statusRedImageUrl
                  "
                />
                {{ scope.row.is_solve }}
              </template>
            </el-table-column>
            <el-table-column width="180" label="操作">
              <template slot-scope="scope">
                <img
                  :src="detailImageUrl"
                  @click.stop="seeDetails(scope.row)"
                  style="margin-bottom: -3px; cursor: pointer"
                />
                <el-button
                  type="text"
                  @click.stop="seeDetails(scope.row)"
                  size="mini"
                  style="cursor: pointer"
                  >详情</el-button
                >
              </template>
            </el-table-column>
          </el-table>

          <template>
            <div class="block">
              <el-pagination
                style="padding: 3px; text-align: center; background-color: #f6f8fd"
                :page-sizes="[10, 20, 30, 40, 50]"
                :page-size="searchCondition.pageSize"
                :current-page="searchCondition.pageNumber"
                layout="total, sizes, prev, pager, next, jumper"
                :total="searchCondition.total"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
              >
              </el-pagination>
            </div>
          </template>
        </div>
      </div>
    </el-card>

    <el-dialog title="详情" :visible.sync="dialogVisible" width="90%">
      <evevtLocus :conditionData="conditionDataDetails" v-if="dialogVisible"></evevtLocus>
    </el-dialog>
  </div>
</template>

<script>
import TableTemp from "../public/TableTemp";
import LineBarTemp from "../public/LineBarTemp";
import SichuanEcharts from "../public/SichuanEcharts";
import evevtLocus from "../eventlocus/eventLocus";

export default {
  name: "index",
  components: { LineBarTemp, TableTemp, SichuanEcharts, evevtLocus },
  data() {
    return {
      startDate: "",
      endDate: "",
      detailImageUrl: require("../../assets/img/icon_details.png"),
      statusRedImageUrl: require("../../assets/img/icon_redstatus.png"),
      statusGreenImageUrl: require("../../assets/img/icon_greenstatus.png"),
      timerange: [],
      conditionDataDetails: {
        eventId: null,
        eventInstId: null,
        flowid: null,
        onlyProgress: "0",
      },
      conditionData: {
        eventId: null,
        eventInstId: null,
        onlyProgress: "1",
      },
      dialogVisible: false,
      tableHeaderColor: { "background-color": "#d5d5d5", "text-align": "center" },
      showMoreCondition: false,
      tableLoading: false,
      mainPositionScenes: {
        // 1:{"name":"整体情况","id":"1","scenes":[0]},
        // 2:{"name":"有线网络","id":"2","scenes":[1,2,3,8,11,13],"canClick":true},
        // 3:{"name":"无线网络","id":"3","scenes":[4,5,14],"canClick":true},
        // 4:{"name":"服务质量","id":"4","scenes":[6,7,15],"canClick":true},
        // 5:{"name":"主动营销","id":"5","scenes":[6,17],"canClick":false}
        2: { name: "有线网络", id: "2", scenes: [1, 2, 3, 8, 11, 13], canClick: true },
        3: { name: "无线网络", id: "3", scenes: [4, 5, 14], canClick: true },
        4: { name: "风险控制", id: "4", scenes: [6, 7, 15], canClick: true },
        5: { name: "营销服务", id: "5", scenes: [6, 17], canClick: false },
      },
      mainPosition: 2,
      monitorScenesKpi: [[]],
      monitorScenesKpiData: [
        // {id: 0, name:"全场景", loading:false,unSolved: 0, solved: 0,condition:"C0001,C0002"},
        {
          id: 13,
          name: "有线客户说了算",
          loading: false,
          unSolved: 0,
          solved: 0,
          condition: "C0021,C0022",
        },
        {
          id: 14,
          name: "无线客户说了算",
          loading: false,
          unSolved: 0,
          solved: 0,
          condition: "C0023,C0024",
        },
        {
          id: 5,
          name: "无线质差小区事件",
          loading: false,
          unSolved: 0,
          solved: 0,
          condition: "C0011,C0012",
        },
        {
          id: 4,
          name: "无线基站断站事件",
          loading: false,
          unSolved: 0,
          solved: 0,
          condition: "C0009,C0010",
        },
        // {id: 1, name:"有线设备故障事件", loading:false,unSolved: 0, solved: 0,condition:"C0003,C0004"}, //2023.4.6 暂时屏蔽有线设备故障
        // {id: 2, name:"用户集中告障（有线）", loading:false,unSolved: 0, solved: 0,condition:"C0007,C0008"}, //2023.4.7 暂时屏蔽用户集中告障
        {
          id: 3,
          name: "有线高频重障事件",
          loading: false,
          unSolved: 0,
          solved: 0,
          condition: "C0005,C0006",
        },
        /* {id: 6, name:"达量限速用户态势", loading:false,unSolved: 0, solved: 0,condition:"C0013,C0014"},*/
        // {id: 7, name:"高发投诉事件", loading:false,unSolved: 0, solved: 0,condition:"C0015,C0016"},
        // {id: 8, name:"魔镜超时工单事件", loading:false,unSolved: 0, solved: 0,condition:"C0017,C0018"},
        // {id: 9, name:"移动网络大面积故障事件", loading:false,unSolved: 0, solved: 0,condition:"C0019,C0020"},
        {
          id: 15,
          name: "渠道商服务质量提升",
          loading: false,
          unSolved: 0,
          solved: 0,
          condition: "C0021,C0022",
        },
      ],
      areaCondition: "",
      searchCondition: {
        id: "",
        selectScene: 13,
        selectScenes: ["131", "132", "133", "134"],
        inputValue: "",
        statusValue: "",
        bussinessType: "",
        areaCondition: [],
        defaultareaCondition: [],
        pageSize: 10, //每页展示条数
        pageNumber: 1, //页码
        total: 0, //总条数
        starttime: "",
        endtime: "",
      },
      statusValues: [
        {
          value: "0",
          label: "进行中",
        },
        {
          value: "1",
          label: "已解决",
        },
      ],
      bussinessTypeList: [
        {
          value: "选项1",
          label: "宽带",
        },
        {
          value: "选项2",
          label: "宽带",
        },
      ],
      areaList: [],
      detailsList: [
        /*{
              time:'08-01   12:11:10',
              dutyPerson:'手机接单人、责任人:恩阳综合维护包区03/冯一平',
              company:'分公司:巴中分公司',
              remark:'备注:接单'
            },
            {
              time:'08-01   12:11:10',
              dutyPerson:'手机接单人、责任人:恩阳综合维护包区03/冯一平',
              company:'分公司:巴中分公司',
              remark:'备注:接单'
            },
            {
              time:'08-01   12:11:10',
              dutyPerson:'手机接单人、责任人:恩阳综合维护包区03/冯一平',
              company:'分公司:巴中分公司',
              remark:'备注:接单'
            },
            {
              time:'08-01   12:11:10',
              dutyPerson:'手机接单人、责任人:恩阳综合维护包区03/冯一平',
              company:'分公司:巴中分公司',
              remark:'备注:接单'
            },
            {
              time:'08-01   12:11:10',
              dutyPerson:'手机接单人、责任人:恩阳综合维护包区03/冯一平',
              company:'分公司:巴中分公司',
              remark:'备注:接单'
            },
            {
              time:'08-01   12:11:10',
              dutyPerson:'手机接单人、责任人:恩阳综合维护包区03/冯一平',
              company:'分公司:巴中分公司',
              remark:'备注:接单'
            },
            {
              time:'08-01   12:11:10',
              dutyPerson:'手机接单人、责任人:恩阳综合维护包区03/冯一平',
              company:'分公司:巴中分公司',
              remark:'备注:接单'
            },
            {
              time:'08-01   12:11:10',
              dutyPerson:'手机接单人、责任人:恩阳综合维护包区03/冯一平',
              company:'分公司:巴中分公司',
              remark:'备注:接单'
            },
            {
              time:'08-01   12:11:10',
              dutyPerson:'手机接单人、责任人:恩阳综合维护包区03/冯一平',
              company:'分公司:巴中分公司',
              remark:'备注:接单'
            },*/
      ],

      tableData: [],
    };
  },
  mounted: function () {},
  created: function () {
    this.init();
  },
  methods: {
    init: function () {
      var _this = this;
      //设置用户归属地
      //this.areaCondition=this.$store.getters.regionId;
      let orgId = this.$store.getters.orgId;
      if (orgId == "1") {
        this.areaCondition = orgId;
        this.initData();
      } else {
        //不等于一需要查询第二层
        this.$api.realTimeData
          .queryAreaByOrgId(orgId)
          .then((response) => {
            _this.areaCondition = response.data;
            _this.initData();
          })
          .catch((error) => {});
      }
    },
    initData: function () {
      this.queryAreaList();
      this.realTimeScenesDataLoop();
      this.startDate = this.getCurrentMonthFirst();
      this.endDate = this.getNowFormatDate();
      this.timerange.push(this.startDate);
      this.timerange.push(this.endDate);
      //this.queryKeySceneData();
      this.setTableData();
    },
    /**
     * 5分钟循环查询一次实时数据
     */
    realTimeScenesDataLoop: function () {
      let _this = this;
      var monitorScenes = _this.monitorScenesKpiData;
      if (monitorScenes.length > 0) {
        _this.monitorScenesKpi = [[]];
        var rowIndex = 0;
        for (var i = 0, len = monitorScenes.length; i < len; i++) {
          if (i > 0 && i % 8 == 0) {
            _this.monitorScenesKpi.push([]);
            rowIndex++;
          }
          if (
            _this.mainPositionScenes[_this.mainPosition].scenes &&
            _this.mainPositionScenes[_this.mainPosition].scenes.indexOf(
              monitorScenes[i].id
            ) >= 0
          ) {
            _this.monitorScenesKpi[rowIndex].push(monitorScenes[i]);
          }
          // _this.monitorScenesKpi[rowIndex].push(monitorScenes[i]);
        }
      }
    },
    rollScroll: function (event) {
      let _that = this;
      let scrollVal = event.wheelDelta || event.detail;
      if (!_that.timeOut) {
        _that.timeOut = setTimeout(() => {
          _that.timeOut = null;
          scrollVal > 0 ? _that.$refs.carousel.prev() : _that.$refs.carousel.next();
        }, 100);
      }
    },
    showProcess: function (row) {
      this.conditionData.eventId = row.eventid;
      this.conditionData.eventInstId = row.event_inst_id;
      this.conditionData.flowid = row.flowid;
    },
    queryAreaList: function () {
      let _this = this;
      _this.tableLoading = true;
      this.$api.realTimeData
        .queryAreaList(this.areaCondition)
        .then((response) => {
          _this.areaList = response.data;
        })
        .catch((error) => {});
    },
    queryKeySceneData: function () {
      for (let a = 0; a < this.monitorScenesKpiData.length; a++) {
        let item = this.monitorScenesKpiData[a];
        item.loading = true;
        let _this = this;
        this.$api.realTimeData
          .queryData(item.condition, this.areaCondition, this.searchCondition.selectScene)
          .then((response) => {
            let data = response.data;
            let arr = item.condition.split(",");
            //item.name=data.name.substring(data.name.indexOf("-")+1);
            for (let a = 0; a < arr.length; a++) {
              let colum = arr[a];
              if (a == 0) {
                item.unSolved = data[colum] == "—" ? 0 : data[colum];
              } else if (a == 1) {
                item.solved = data[colum] == "—" ? 0 : data[colum];
              }
            }
            item.loading = false;
          })
          .catch((error) => {});
      }
    },

    //列表数据
    setTableData: function () {
      if (this.timerange && this.timerange[0]) {
        this.searchCondition.starttime = this.timerange[0];
      } else {
        this.searchCondition.starttime = "";
      }
      if (this.timerange && this.timerange[1]) {
        this.searchCondition.endtime = this.timerange[1];
      } else {
        this.searchCondition.endtime = "";
      }
      this.searchCondition.defaultareaCondition = this.areaCondition;
      let _this = this;
      _this.tableLoading = true;
      this.$api.realTimeData
        .queryPage3TableData(this.searchCondition, this.areaCondition)
        .then((response) => {
          let data = response.data;
          _this.tableData = data.data;
          _this.searchCondition.total = data.total;
          _this.tableLoading = false;
          let statisticsData = response.data.statisticsData;

          for (let b = 0; b < this.monitorScenesKpiData.length; b++) {
            let id = this.monitorScenesKpiData[b].id;
            this.monitorScenesKpiData[b].unSolved = 0;
            this.monitorScenesKpiData[b].solved = 0;
            var allUnSolved = 0;
            var allSolved = 0;
            for (let a = 0; a < statisticsData.length; a++) {
              let statisticsDataitemscene_theme_id = statisticsData[a].scene_theme_id;
              if (statisticsDataitemscene_theme_id == id && id != 13) {
                this.monitorScenesKpiData[b].unSolved = statisticsData[a].notsolve;
                this.monitorScenesKpiData[b].solved = statisticsData[a].issolve;
              }
              if (
                id == "13" &&
                (statisticsDataitemscene_theme_id == "131" ||
                  statisticsDataitemscene_theme_id == "132" ||
                  statisticsDataitemscene_theme_id == "133" ||
                  statisticsDataitemscene_theme_id == "134")
              ) {
                allUnSolved += parseInt(statisticsData[a].notsolve);
                allSolved += parseInt(statisticsData[a].issolve);
              }
            }
            if (id == 13) {
              this.monitorScenesKpiData[b].unSolved = allUnSolved;
              this.monitorScenesKpiData[b].solved = allSolved;
            }
          }
          //触发第一行点击事件
          setTimeout(function () {
            if (
              document
                .getElementById("evenList")
                .getElementsByTagName("tbody")[0]
                .getElementsByTagName("tr")[0]
            ) {
              document
                .getElementById("evenList")
                .getElementsByTagName("tbody")[0]
                .getElementsByTagName("tr")[0]
                .click();
            } else {
              //todo 这里需要清空画布
              _this.conditionDataDetails.eventId = "";
              _this.conditionDataDetails.eventInstId = "";
              _this.conditionDataDetails.flowid = "";
            }
          }, 1000);
        })
        .catch((error) => {
          _this.tableLoading = false;
        });
    },
    reset: function () {
      this.searchCondition.inputValue = "";
      this.searchCondition.statusValue = "";
      this.searchCondition.areaCondition = [];
      this.searchCondition.pageNumber = 1;
      this.setTableData();
    },

    handleSizeChange: function (pageSize) {
      this.searchCondition.pageSize = pageSize;
      this.setTableData();
    },
    handleCurrentChange: function (pageNum) {
      this.searchCondition.pageNumber = pageNum;
      this.setTableData();
    },
    seeDetails: function (row) {
      this.searchCondition.id = row.id;
      this.conditionDataDetails.eventId = row.eventid;
      this.conditionDataDetails.eventInstId = row.event_inst_id;
      this.conditionDataDetails.flowid = row.flowid;
      this.dialogVisible = true;
    },
    heightSize: function () {
      return window.screen.height * 0.8 + "px";
    },
    widthSize: function () {
      return window.screen.width * 1 + "px";
    },
    changeScene: function (data) {
      this.searchCondition.selectScene = data.id;
      if (data.id == "13") {
        //有线客户说了算特殊处理
        this.searchCondition.selectScenes = ["131", "132", "133", "134"];
      } else {
        this.searchCondition.selectScenes = [];
      }
    },
    getCurrentMonthFirst: function () {
      var date = new Date();
      date.setDate(1);
      var month = parseInt(date.getMonth() + 1);
      var day = date.getDate();
      if (month < 10) {
        month = "0" + month;
      }
      if (day < 10) {
        day = "0" + day;
      }
      return date.getFullYear() + "-" + month + "-" + day;
    },

    getNowFormatDate: function () {
      var day3 = new Date();
      day3.setTime(day3.getTime());
      var month = parseInt(day3.getMonth() + 1);
      var day = day3.getDate();
      if (month < 10) {
        month = "0" + month;
      }
      if (day < 10) {
        day = "0" + day;
      }
      var s3 = day3.getFullYear() + "-" + month + "-" + day;
      return s3;
    },
    positionChange: function (val) {
      let _this = this;
      _this.realTimeScenesDataLoop();
      _this.searchCondition.selectScene = _this.monitorScenesKpi[0][0].id;
      _this.searchCondition.selectScenes =
        _this.mainPosition == 2 ? ["131", "132", "133", "134"] : [];
    },
  },
  watch: {
    "searchCondition.selectScene": {
      handler(newvalue, oldvalue) {
        this.searchCondition.pageNumber = 1;
        this.setTableData();
      },
      deep: true,
    },
    startDate: {
      handler(newvalue, oldvalue) {
        this.timerange = [];
        this.timerange.push(this.startDate);
        this.timerange.push(this.endDate);
        this.searchCondition.pageNumber = 1;
        this.setTableData();
      },
      deep: true,
    },
    endDate: {
      handler(newvalue, oldvalue) {
        this.timerange = [];
        this.timerange.push(this.startDate);
        this.timerange.push(this.endDate);
        this.searchCondition.pageNumber = 1;
        this.setTableData();
      },
      deep: true,
    },
  },
  computed: {},
};
</script>

<style scoped>
.mainBody {
  width: 100%;
  height: 800px;
  background-color: #e1e1e1;
  padding: 8px;
  overflow: auto;
}
/deep/ .el-card__header {
  padding: 5px 20px;
  border-bottom: 1px solid #ebeef5;
  box-sizing: border-box;
}

.top {
  width: 100%;
  padding: 5px;
  height: 40%;
  display: flex;
  background-color: white;
  margin-top: 5px;
  border-radius: 5px 0 5px 5px;
}
.timeClass {
  height: 40%;
  padding-top: 20px;
  width: 50%;
  text-align: right;
  background-color: white;
  border-radius: 5px 5px 0 0;
  padding: 5px;
  float: right;
}
.body {
  width: 100%;
  padding: 5px;
  height: 40%;
  display: flex;
  background-color: white;
  margin-top: 10px;
}
.fangkuai {
  /*width: 100%;*/
  background-color: rgba(74, 120, 232, 1);
  border-radius: 3px;
  margin-left: 10px;
  margin-bottom: 10px;
  color: #fff;
  cursor: pointer;
  margin-top: 15px;
}
.fangkuaiSelected {
  background-color: rgba(0, 218, 168, 1);
}
.fangkuai p {
  width: 100%;
}
.fangkuaiTitle {
  width: 100%;
  height: 20%;
}
.fangkuaiContent {
  width: 100%;
  height: 67%;
  background-color: rgba(242, 246, 255, 1);
  border: 2px solid rgba(74, 120, 232, 1);
  border-radius: 3px;
  color: black;
}
.fangkuaiContentSelected {
  width: 100%;
  height: 67%;
  background-color: rgba(242, 246, 255, 1);
  border: 2px solid rgba(0, 218, 168, 1);
  border-radius: 3px;
  color: black;
}

.conditionPart {
  margin: 10px;
}
.conditionSelect {
  margin-left: 5px;
}
.theFlowChart {
  width: 100%;
  height: 87%;
  background-color: white;
  padding: 10px;
  overflow: hidden;
}
.content {
  width: 100%;
  height: 460px;
  background-color: white;
  border-radius: 5px;
  /*border: 1px solid #dfdfdf;*/
  overflow: auto;
}
.content2 {
  width: 100%;
  padding: 20px;
  background-color: #f4f4f4;
  border-radius: 5px;
  border: 1px solid #dfdfdf;
}
/deep/ .el-dialog__body {
  padding: 10px 20px;
}
/deep/ .el-dialog__header {
  padding: 10px 20px 0px;
}

/deep/.el-card__body {
  padding: 10px;
}
/deep/ .el-radio-button__orig-radio:checked + .el-radio-button__inner {
  color: #fff;
  background-color: #4a78e8;
  border-color: #4a78e8;
  box-shadow: -1px 0 0 0 #409eff;
}
/deep/ .vue-treeselect {
  height: 28px;
}
/deep/ .vue-treeselect .vue-treeselect__control {
  height: 28px !important;
}
/deep/ .vue-treeselect__placeholder {
  line-height: 28px;
  font-size: 14px;
}
/deep/ .vue-treeselect input {
  font-size: 16px;
}
/deep/.vue-treeselect__multi-value {
  max-height: 22px;
  overflow: auto;
}
/deep/.el-carousel__button {
  background-color: #9e9e9e;
  height: 50px;
  width: 3px;
}
.cardStyle {
  margin-top: 5px;
}
</style>
