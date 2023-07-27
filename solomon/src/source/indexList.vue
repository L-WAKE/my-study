<template>
  <div class="page-content">
    <div class="list-title">{{ $t('i18n1847') }}</div>
    <div class="line"></div>
    <div class="list-box">
      <!-- <div class="left-tree">
                <div class="select-down">
                    <n-select class="select-ipt" @update:value="selectChange" label-field="classifyName"
                        :placeholder="$t('i18n1848')" value-field="id" clearable v-model:value="listReactive.selectVal"
                        :options="listReactive.systemTypeList" />
                    <n-input v-model:value="listReactive.leftSearch" class="left-search" type="text"
                        :placeholder="$t('i18n1849')" @input="searchTree" />
                    <Iconfont :size="24" iconName="search" class="search-img"></Iconfont>
                </div>
                <div class="select-opt">
                    <div class="open" @click="openAll">
                        <img src="@/assets/image/svg/u01.svg" class="opt-img" v-if="listReactive.isExpand">
                        <img src="@/assets/image/svg/u02.svg" class="opt-img" v-else>
                        <span>{{ listReactive.isExpand ? $t('i18n1850') : $t('i18n1851') }}{{ $t('i18n1852') }}</span>
                    </div>
                </div>
                <div class="select-tree">
                    <n-tree v-if="listReactive.isShowTree" check-strategy="parent" check-on-click block-node
                        :default-expand-all="listReactive.isExpand" :data="listReactive.treeData" key-field="dir_id"
                        @update:selected-keys="selectedTree" label-field="dir_name" children-field="children"
                        selectable />
                </div>
            </div> -->
      <div class="right-content">
        <div class="search-box">
          <div class="condition">
            <div class="select-tree-node">
              <div class="tree-text">{{ $t('i18n1853') }}</div>
              <div class="search-ipt">
                <n-tree-select
                  :options="listReactive.treeData"
                  clearable
                  filterable
                  @update:value="selectedTree"
                  label-field="dir_name"
                  key-field="dir_id"
                  v-model:value="queryParams.dirId"
                  children-field="children"
                />
              </div>
            </div>
            <div class="condition-key">
              <span class="search-text">{{ $t('i18n1854') }}</span>
              <n-select clearable class="search-ipt pr" style="width:120px" v-model:value="queryParams.gdlStatus" :options="listReactive.enums.status" />   
            </div>
            <div class="condition-key">
              <span class="search-text">{{ $t('i18n1855') }}</span>
              <n-select clearable class="search-ipt pr" style="width:120px" v-model:value="queryParams.flowInsStatus" :options="listReactive.enums.flowInsState" />   
            </div>
            <div class="condition-key">
              <span class="search-text">{{ $t('i18n1856') }}</span>
              <n-input clearable
                class="search-ipt pr"
                v-model:value="queryParams.keyWords"
                type="text"
                :placeholder="$t('i18n1857')"
              />
              <Iconfont :size="24" iconName="search" class="search-img"></Iconfont>
            </div>
            <!-- <span class="search-text ml">流程状态：</span>
                        <n-select class="search-ipt" clearable v-model:value="listReactive.searchType"
                            :options="listReactive.treeOptions" /> -->
          </div>
          <div class="options-btm">
            <div class="search-btm" @click="findIndexList">
              <Iconfont :size="16" iconName="search" class="top-img" color="#FFFFFF"></Iconfont>
              <span>{{ $t('i18n1858') }}</span>
            </div>
            <div class="search-reset" @click="resetIndexList">
              <Iconfont :size="12" iconName="Reset" class="top-img" color="#909399"></Iconfont>
              <span>{{ $t('i18n1859') }}</span>
            </div>
            <div class="search-reset" @click="highFind.showScreen = true">
              <Iconfont :size="16" iconName="all_filter" class="top-img" color="#909399"></Iconfont>
              <span>{{ $t('i18n1860') }}</span>
            </div>
          </div>
        </div>
        <div class="head-options">
          <div class="release">
            <div v-power="['indexList_addAtom', 'indexList_addCal']">
              <n-dropdown
                trigger="click"
                :options="listReactive.registerDropdown"
                :show-arrow="true"
                @select="selectRegister"
              >
                <div class="btm-index">
                  <Iconfont :size="16" iconName="plus" class="btm-img"></Iconfont>
                  <span class="btm-ins">{{ $t('i18n1861') }}</span>
                </div>
              </n-dropdown>
            </div>
            <div
              v-power="'indexList_import'"
              class="btm-import"
              @click="router.push('idxImport')"
            >
              <Iconfont :size="20" iconName="Import" class="btm-img"></Iconfont>
              <span class="btm-ins">{{ $t('i18n1862') }}</span>
            </div>
          </div>
          <div class="other-options">
            <Iconfont
              :size="16"
              @click="resetColumn"
              className="other-img"
              iconName="Reset"
            ></Iconfont>
            <Iconfont
              :size="20"
              className="other-img"
              iconName="config"
              :onClick="showDyColumn"
            ></Iconfont>
          </div>
        </div>
        <div class="table-box">
          <n-data-table
            :row-key="listReactive.rowKey"
            :scroll-x="listReactive.tableMaxWidth"
            remote
            striped
            :single-line="false"
            size="small"
            :columns="listReactive.showColumns"
            :render-cell="tableRenderCell"
            :loading="listReactive.tableDataloading"
            :data="listReactive.tableData"
            :max-height="listReactive.tableMaxHeight"
            :pagination="listReactive.pagination"
            bordered
          />
        </div>
      </div>
    </div>

    <!-- 高级筛选 :mask-closable="false" :close-on-esc="false"-->
    <n-drawer v-model:show="highFind.showScreen" :width="450">
      <n-drawer-content closable>
        <template #header>
          <div class="high-find">
            <Iconfont :size="16" iconName="all_filter" class="find-img"></Iconfont>
            <span>{{ $t('i18n1863') }}</span>
          </div>
        </template>
        <div class="find-content">
          <div class="find-item">
            <span class="find-text">{{ $t('i18n1864') }}</span>
            <n-date-picker
              class="find-ipt"
              v-model:value="queryParams.dateTime"
              type="daterange"
              :separator="$t('i18n1865')"
              clearable
            />
          </div>
          <div class="find-item">
            <span class="find-text">{{ $t('i18n1866') }}</span>
            <n-select
              class="find-ipt"
              clearable
              v-model:value="queryParams.gdlType"
              label-field="item_text"
              value-field="item_value"
              :options="highFind.findOptions"
            />
          </div>
          <!-- <div class="find-item">
                        <span class="find-text">{{ $t('i18n1855') }}</span>
                        <n-select class="find-ipt" clearable v-model:value="highFind.findStatus"
                            :options="highFind.statusOptions" />
                    </div> -->
          <div class="find-item">
            <span class="find-text">&emsp;{{ $t('i18n1867') }}</span>
            <n-input
              class="find-ipt"
              clearable
              v-model:value="queryParams.createrName"
              type="text"
              :placeholder="$t('i18n1868')"
            />
          </div>
        </div>
        <template #footer>
          <n-button type="info" @click="findIndexList">{{ $t('i18n1858') }}</n-button>
        </template>
      </n-drawer-content>
    </n-drawer>

    <!-- 版本弹窗 -->
    <n-modal
      v-model:show="versionReactive.showVersion"
      :mask-closable="false"
      :close-on-esc="false"
    >
      <div class="version-box">
        <div class="title-colse">
          <span class="title">{{ $t('i18n1869') }}</span>
          <span class="close" @click="versionReactive.showVersion = false">
            <Iconfont :size="24" iconName="close" class="modal-close-btn"></Iconfont>
          </span>
        </div>
        <div class="version-table">
          <n-data-table
            :columns="versionReactive.versionColumns"
            :data="versionReactive.versionData"
            @update:checked-row-keys="checkedRow"
            :min-height="165"
            :max-height="165"
            :bordered="false"
          />
        </div>
        <div class="version-food">
          <div class="cancel" @click="versionReactive.showVersion = false">{{ $t('i18n1870') }}</div>
          <div class="start" @click="confirmVersion">{{ $t('i18n1871') }}</div>
        </div>
      </div>
    </n-modal>

    <!-- 删除确认框 -->
    <n-modal
      v-if="listReactive.isShowDel"
      v-model:show="listReactive.isShowDel"
      :mask-closable="false"
      preset="dialog"
      :title="$t('i18n1872')"
      :content="$t('i18n1873') + '?'"
      :positive-text="$t('i18n1874')"
      :negative-text="$t('i18n1870')"
      @negative-click="listReactive.isShowDel = false"
      @positive-click="onPositiveClickDel"
    />

    <DyColumnConfig
      ref="dyColumn"
      :options="listReactive.tableColumns"
      @update="updateColumns"
    ></DyColumnConfig>
    <GdlLifeModal ref="gdlLifeModal"></GdlLifeModal>
    <RelVisModal ref="relVisModal"></RelVisModal>
    <deriveGdl ref="deriveGdlModal"></deriveGdl>
  </div>
</template>

<script lang="ts">
import { defineComponent, ComponentPublicInstance } from "vue";
interface IInstance extends ComponentPublicInstance {
  setPathFrom(from: string): void;
}
export default defineComponent({
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      const instance = vm as IInstance;
      instance.setPathFrom(from.path);
    });
  },
});
</script>

<script lang="ts" setup>
import {
  NModal,
  NButton,
  useMessage,
  NDrawer,
  NDatePicker,
  NDrawerContent,
  NDropdown,
  NTreeSelect,
  NSelect,
  NInput,
  NDataTable,
  NTag,
} from "naive-ui";
import { nextTick, reactive, onMounted, h, ref,computed } from "vue";
import type { TreeOption } from "naive-ui";
import TableAction from "@/components/TableAction.vue";
import { useRouter ,useRoute} from "vue-router";
import { expHeadHeight, expTableWidth, debounce, deepCloneMax } from "@/utils/baseUtil";
import type { DataTableColumns } from "naive-ui";
import deriveGdl from "./level-page/deriveGdl.vue";
import {
  getListTree,
  getListClassify,
  getIndexList,
  getDictionaries,
  deleteIndex,
  submitGdlFlow,
  switchState
} from "@/api/commonApi";
import { commonStore } from "@/store/common";
import DyColumnConfig from "@/components/dyTableColumn.vue";
import GdlLifeModal from "@/views/index/level-page/gdlLifeModal.vue"
import { getColumnConfig } from "@/utils/column/dyTableColumn";
import {hasPermission} from "@/utils/btnLimitUtil"
import RelVisModal from "@/components/RelVisModal.vue";

const relVisModal=ref(null)
const dyColumn = ref(null);
const counterStore = commonStore();
const gdlLifeModal=ref(null);
const deriveGdlModal=ref(null);

// 高级筛选接口
interface IFhighFind {
  showScreen: boolean;
  findOptions: any[]; //指标类型
  findStatus: string;
  statusOptions: any[]; //流程状态
}
// 高级筛选变量
const highFind: IFhighFind = reactive({
  showScreen: false,
  findOptions: [], //指标类型
  findStatus: null,
  statusOptions: [], //流程状态
});

// 版本弹窗变量
const versionReactive = reactive({
  showVersion: false as boolean,
  versionData: [
    {
      key: 1,
      code: "GDL_1",
      name: $t('i18n1875'),
      type: $t('i18n1876'),
      version: "1.0",
    },
    {
      key: 2,
      code: "GDL_2",
      name: $t('i18n1877'),
      type: $t('i18n1876'),
      version: "1.0",
    },
    { key: 3, code: "GDL_23", name: $t('i18n1878'), type: $t('i18n1879'), version: "1.0" },
    { key: 4, code: "GDL_23", name: $t('i18n1878'), type: $t('i18n1879'), version: "1.0" },
    { key: 5, code: "GDL_23", name: $t('i18n1878'), type: $t('i18n1879'), version: "1.0" },
  ],
  versionColumns: [
    { type: "selection", multiple: false },
    {
      title: $t('i18n1880'),
      key: "index",
      align: "center",
      width: 100,
      render: (_: any, index: number) => {
        return `${index + 1}`;
      },
    },
    { title: $t('i18n1881'), key: "code", align: "center" },
    {
      title: $t('i18n1882'),
      key: "name",
      align: "center",
      ellipsis: {
        tooltip: true,
      },
    },
    { title: $t('i18n1883'), key: "version", align: "center" },
    {
      title: $t('i18n1884'),
      key: "type",
      align: "center",
      ellipsis: {
        tooltip: true,
      },
    },
  ] as DataTableColumns,
});

const message = useMessage();
const router = useRouter();
const route = useRoute()
const listReactive = reactive({
  isDisabled:false,
  enums: {
    flowInsRes: [
      { label: $t('i18n1885'), value: 1 },
      { label: $t('i18n1886'), value: 0 },
      { label: $t('i18n1887'), value: 4 },
    ],
    flowInsState: [
      { label: $t('i18n1888'), value: 0 },
      { label: $t('i18n1889'), value: 1 },
      { label: $t('i18n1890'), value: 2 },
      { label: $t('i18n1891'), value: 3 },
      { label: $t('i18n1887'), value: 4 },
    ],
    status:[{label:$t('i18n1892'),value:''},{label:$t('i18n1893'),value:'2'},{label:$t('i18n1894'),value:'1'},{label:$t('i18n1895'),value:'0'}],
  },
  tableShow: true,
  tableDataloading: false,
  treeData: [],
  isShowTree: true,
  defaultExpandedKeys: [],
  isExpand: false,
  registerDropdown: [],
  selectVal: null,
  systemTypeList: [],
  leftSearch: "",
  treeOptions: [],
  searchType: null,
  releaseIndex: 0,
  fixedColumns: [
    {
      title: $t('i18n1880'),
      key: "id",
      fixed: "left",
      width: 60,
      align: "center",
      render(rowData, rowIndex) {
        return h(
          "div",
          {
            style: {
              backgroundColor: "transparent",
              color: "#333333",
            },
            type: "info",
            bordered: false,
          },
          {
            default: () =>
              (listReactive.pagination.page - 1) * listReactive.pagination.pageSize +
              rowIndex +
              1,
          }
        );
      },
    },
  ],
  tableColumns: [
    { title: $t('i18n1881'), key: "gdlCode", ellipsis: true, isChecked: true, width: 180 },
    { title: $t('i18n1882'), key: "gdlName", ellipsis: true, isChecked: true, width: 180 },
    {
      title: $t('i18n1896'),
      key: "gdlType",
      align: "center",
      width: 120,
      isChecked: true,
      render(row: any) {
        return h(
          "div",
          {},
          {
            default: () =>
              row.gdlType == 1
                ? $t('i18n1897')
                : row.gdlType == 2
                ? $t('i18n1898')
                : row.gdlType == 3
                ? $t('i18n1899')
                : "",
          }
        );
      },
    },
    { title: $t('i18n1900'), key: "dirName", align: "center", isChecked: true, width: 180 },
    {
      title: $t('i18n1901'),
      key: "gdlCycleName",
      ellipsis: { title: true },
      isChecked: false,
      width: 80,
      align: "center",
    },
    {
      title: $t('i18n1902'),
      key: "businessDim",
      isChecked: false,
      minWidth: 180,
      render(row: any) {
        let dims = [];
        row.businessDim ? (dims = row.businessDim.split(",")) : [];
        let render = [];
        dims.forEach((dim) => {
          render.push(
            h(
              NTag,
              {
                type: "info",
                bordered: false,
                round: false,
                style: { marginRight: "5px", marginBottom: "5px" },
              },
              { default: () => dim }
            )
          );
        });
        return render;
      },
    },
    // { title: '流程状态', key: 'type', align: "center" },
    // { title: '版本', key: 'version', align: "center" },
    {
      title: $t('i18n1903'),
      key: "gdlStatus",
      align: "center",
      width: 120,
      isChecked: true,
      render(rowData: any) {
        return h(
          NTag,
          {
            type: rowData.gdlStatus == 1 ? "success" : "error",
            bordered: false,
            round: true,
          },
          {
            default: () =>
              rowData.gdlStatus == 1 ? $t('i18n1894') : rowData.gdlStatus == 2 ? $t('i18n1893') : $t('i18n1895'),
          }
        );
      },
    },
    {
      title: $t('i18n1904'),
      key: "flowInsState",
      align: "center",
      width: 180,
      isChecked: true,
      render(rowData: any) {
        return h(
          NTag,
          {
            type: (rowData.flowInsState || 2) == 2 ? "success" : "error",
            bordered: false,
            round: true,
          },
          {
            default: () => {
              if (rowData.flowInsState == undefined && rowData.gdlStatus == 2) {
                return $t('i18n1905');
              }
              if (rowData.flowInsState == undefined && rowData.gdlStatus != 2) {
                return $t('i18n1906');
              }
              return (
                getFlowEnum(rowData.flowInsState).label||
                getFlowInsEnum(rowData.flowInsRes)?.label 
               
              );
              // if (rowData.flowInsState && rowData.flowInsRes == undefined) {

              // }
              // if (rowData.flowInsRes != undefined) {
              //     return getFlowInsEnum(rowData.flowInsRes)?.label
              // }
            },
          }
        );
      },
    },
    { title: $t('i18n1907'), key: "crtUserName", ellipsis: true, isChecked: false, width: 180 },

    { title: $t('i18n1908'), key: "crtDt", ellipsis: true, isChecked: false, width: 160 },
    {
      title: $t('i18n1909'),
      key: "modifyUserName",
      ellipsis: true,
      isChecked: false,
      width: 180,
    },
    { title: $t('i18n1910'), key: "modifyDt", ellipsis: true, isChecked: false, width: 160 },
  ],
  operateColumns: [],
  showColumns: [],
  tableData: [],
  rowKey: (row: any) => row.gdlId,
  pagination: {
    page: 1,
    pageSize: 10,
    pageCount: 0,
    showSizePicker: true,
    pageSizes: [5, 10, 20],
    onChange: (page: number) => {
      listReactive.pagination.page = page;
      initTableData();
    },
    onUpdatePageSize: (pageSize: number) => {
      listReactive.pagination.pageSize = pageSize;
      listReactive.pagination.page = 1;
      initTableData();
    },
    // showQuickJumper: true,
    // suffix: () => h('div', {}, { default: () => '页' }),
  },
  tableMaxHeight: 0,
  tableMaxWidth: 0,
  isShowDel: false,
  rowIndexId: "",
});
// 查询条件接口
interface IFFindParams {
  dirId: string | number | Array<string | number> | null;
  keyWords: string;
  gdlType: number | string;
  createrName: string;
  dateTime: any;
  createDatetime: any;
  gdlStatus:any
  flowInsStatus:any
}
const queryParams: IFFindParams = reactive({
  dirId: null, // 指标体系目录id
  keyWords: null, // 指标名称
  gdlType: null, // 指标类型
  createrName: null, // 指标创建人姓名
  dateTime: null, // 创建时间范围
  createDatetime: null,
  gdlStatus:null,//指标状态
  flowInsStatus:null//指标流程状态
});

onMounted(() => {
  init();
});
const init = () => {
  listReactive.tableMaxHeight = expHeadHeight();
  // listReactive.tableMaxWidth = expTableWidth();

  //原子指标与计算指标权限控制
  const list = counterStore.buttonPower;
  const findAtom = list.findIndex((item) => item.url_info == "indexList_addAtom");
  const findComputed = list.findIndex((item) => item.url_info == "indexList_addCal");
  let powerList = [];
  if (findAtom != -1) powerList.push({ label: $t('i18n1911'), key: "atom" });
  if (findComputed != -1) powerList.push({ label: $t('i18n1912'), key: "computed" });
  listReactive.registerDropdown = powerList;

  getClassType();
  initTree();
  initTableData();
  initTableColimns();
  initDictionaries();
};
const initTableColimns = function () {
  const list = counterStore.buttonPower;
  const findView = list.findIndex((item) => item.url_info == "indexList_view");
  const findEdit = list.findIndex((item) => item.url_info == "indexList_edit");
  const findDelete = list.findIndex((item) => item.url_info == "indexList_delete");
  const findBlood = list.findIndex((item) => item.url_info == "indexList_blood");
  const findOffline = list.findIndex((item) => item.url_info == "indexList_offline"); //下线
  const findOnlineBtn=hasPermission("indexList_online")
  const dropDownActions = [];
  findDelete != -1 && dropDownActions.push({ label: $t('i18n1913'), key: "del" });
  // findBlood != -1 && dropDownActions.push({ label: '血缘', key: 'blod' })

  if (findView != -1 || findEdit != -1 || findDelete != -1) {
    listReactive.operateColumns.push({
      title: $t('i18n1914'),
      key: "action",
      align: "center",
      fixed: "right",
      width: 320,
      render(row: any) {
        return h(TableAction as any, {
          actions: [
            {
              label: $t('i18n1915'),
              icon: "see",
              onClick: detail.bind(null, row, "view"),
              ifShow: findView != -1,
              customClass: "look-btm",
            },
            {
              label: $t('i18n1916'),
              icon: "editor",
              onClick: detail.bind(null, row, "edit"),
              // ifShow:true,
              ifShow:
                findEdit != -1 && editBtnBussinessLimit(row),
              customClass: "table-action-btm",
            },
            {
              label: $t('i18n1913'),
              icon: "delete",
              onClick: detail.bind(null, row, "delete"),
              ifShow:
                findDelete != -1 &&
                !(
                  findEdit != -1 &&
                  (row.gdlStatus == 2 || row.gdlStatus == 0) &&
                  (row.flowInsState == undefined || row.flowInsState == 3)
                ),
              customClass: "deldete-btm",
            },
          ],
          dropDownActions: [
            {
              disabled:listReactive.isDisabled,
              label: $t('i18n1917'),
              key: "submit",
              ifShow:
                (row.gdlStatus == 2) &&
                (row.flowInsState == undefined ||
                  row.flowInsState == 4 ||
                  row.flowInsState == 3||row.flowInsRes==0||row.flowInsRes==4),
            },
            {
              disabled:listReactive.isDisabled,
              label: row.gdlStatus == 0 ? $t('i18n1894') : $t('i18n1895'),
              key: "state",
              ifShow:
                (!row.flowInsRes||row.flowInsRes==1)&&
                row.gdlStatus != 2 &&
                ((row.gdlStatus != 0 && findOffline != -1) || row.gdlStatus == 0)&&
                (findOnlineBtn||findOffline != -1),
            },
            {
              label: $t('i18n1913'),
              key: "del",
              ifShow:
                findDelete != -1 &&
                findEdit != -1 &&
                (row.gdlStatus == 2 || row.gdlStatus == 0) &&
                (row.flowInsState == undefined || row.flowInsState == 3),
            },
            {
              label: $t('i18n1918'),
              key: "life",
              ifShow:true
            },
            {
              label: $t('i18n1919'),
              key: "relation",
              ifShow:hasPermission("indexList_blood")
            }
          ],
          select: selectMore.bind(null, row),
          flexStyle: "flex-start",
        });
      },
    });
  }
  listReactive.showColumns = [
    ...listReactive.fixedColumns,
    ...getDefaultColumns(),
    ...listReactive.operateColumns,
  ];
};
const getDefaultColumns = () => {
  let columns: Array<any> =
    getColumnConfig("gdl") || listReactive.tableColumns.filter((el) => el.isChecked);
  let showColumn = [];
  listReactive.tableColumns.forEach((el) => {
    let index = columns.findIndex((ele) => ele.key == el.key);
    el.isChecked = true;
    if (index != -1) {
      showColumn.push(el);
    } else {
      el.isChecked = false;
    }
  });
  return showColumn;
};
//获取字典-指标类型
const initDictionaries = async () => {
  const res: any = await getDictionaries({ dictCode: "GDL_TYPE_ENUM" });
  if (res.status == 1) {
    highFind.findOptions = res?.data ?? [];
  } else {
    message.error(res.msg || "Error");
  }
};
const onPositiveClickDel = async () => {
  const res: any = await deleteIndex({ gdlId: listReactive.rowIndexId });
  if (res.status == 1) {
    message.info($t('i18n1920'));
    nextTick(() => {
      initTableData();
    });
  } else {
    message.error(res.msg || $t('i18n1921'));
  }
};
const findIndexList = () => {
  listReactive.pagination.page = 1;
  listReactive.pagination.pageSize = 10;
  listReactive.pagination.pageCount = 0;
  initTableData();
  highFind.showScreen = false;
};
const resetIndexList = () => {
  queryParams.dirId = null;
  queryParams.keyWords = null;
  queryParams.gdlType = null;
  queryParams.createrName = null;
  queryParams.dateTime = null;
  queryParams.createDatetime = null;
  listReactive.isShowTree = false;
  nextTick(() => (listReactive.isShowTree = true));
  listReactive.pagination.page = 1;
  listReactive.pagination.pageSize = 10;
  listReactive.pagination.pageCount = 0;
  initTableData();
};
const initTree = async () => {
  const res: any = await getListTree({
    dirCode: "0000003",
    tree: true,
    keyword: listReactive.leftSearch,
    dirClassifyId: listReactive.selectVal,
  });
  if (res.status == 1) {
    const data = res?.data ?? [];
    const delEmpty = (list: any) => {
      //删除children为空的属性
      for (let key in list) {
        if (list[key].children && list[key].children.length == 0)
          delete list[key].children;
        else if (list[key].children && list[key].children.length > 0)
          delEmpty(list[key].children);
      }
    };
    delEmpty(data);
    listReactive.treeData = data;
    listReactive.isShowTree = false;
    listReactive.defaultExpandedKeys = [data[0]?.dir_id] ?? [];
    nextTick(() => (listReactive.isShowTree = true));
  } else {
    message.error(res.msg || "Error");
  }
};
const selectChange = (value: any) => {
  listReactive.selectVal = value;
  initTree();
};
const selectedTree = (
  keys: string | number | Array<string | number> | null,
  option: Array<TreeOption | null>
) => {
  queryParams.dirId = keys;
  // listReactive.pagination.page = 1
  // listReactive.pagination.pageSize = 10
  // listReactive.pagination.pageCount = 0
  // initTableData()
};
const searchTree = debounce(() => {
  //利用防抖函数提升性能
  initTree();
}, 500);
const openAll = () => {
  listReactive.isExpand = !listReactive.isExpand;
  listReactive.isShowTree = !listReactive.isShowTree;
  nextTick(() => (listReactive.isShowTree = !listReactive.isShowTree));
};
const getClassType = async () => {
  const res: any = await getListClassify();
  if (res.status == 1) {
    const data = res?.data ?? [];
    listReactive.systemTypeList = data;
  } else {
    message.error(res.msg || "Error");
  }
};
async function initTableData() {
  listReactive.tableDataloading = true;
  if (queryParams.dateTime) {
    let sDate = queryParams.dateTime[0];
    let eDate = queryParams.dateTime[1] + 86400000;
    queryParams.createDatetime = [sDate, eDate];
  }

  const res = await getIndexList({
    page: listReactive.pagination.page,
    pageSize: listReactive.pagination.pageSize,
    queryParams: queryParams,
  });
  listReactive.tableData = res?.data?.list || [];
  listReactive.pagination.pageCount =
    Math.ceil(res?.data?.total / listReactive.pagination.pageSize) || 0;
  listReactive.tableDataloading = false;
}

const checkedRow = (e: any, rows: any) => {
  console.log(e, rows);
}; //版本弹窗表选中
const confirmVersion = () => {
  console.log($t('i18n1871'));
}; //版本弹窗表选中
const confirmSetting = () => {
  console.log($t('i18n1922'));
}; //自定义列弹窗表确认

const tableRenderCell = (value: any, rowData: { name: any }, column: { key: string }) => {
  if (column.key == "name" || column.key == "version") {
    return h(
      "div",
      {
        style: "cursor: pointer;color:rgb(16, 142, 233)",
        onClick: () => {
          if (column.key == "version") {
            // versionReactive.showVersion = true
            console.log($t('i18n1923'), rowData);
          } else {
            console.log($t('i18n1924'), rowData);
          }
        },
      },
      { default: () => rowData.name }
    );
  }
  return value;
};
const selectRegister = (e: any, type: { key: string }) => {
  let routeUrl:any = route.name
  let fatherUrl = route.name
  if (type.key == "atom") routeUrl = "idxRegister";
  if (type.key == "computed"){
    routeUrl = "expressRegister";
    deriveGdlModal?.value.openDialog();
    return
  } 
  let tagList = deepCloneMax(counterStore.tagList);
  const findUrl:any = tagList.find(v => v.path == fatherUrl)
  if(findUrl) {
    findUrl.levelPath = routeUrl
    counterStore.setTagList(tagList);
  }

  router.push(routeUrl);
  console.log('tagList',tagList,routeUrl,fatherUrl);
  console.log("route",route);
};
const selectMore = async(e: any, type: any) => {
  listReactive.isDisabled = true
  if (type == "del") {
    listReactive.rowIndexId = e.gdlId;
    listReactive.isShowDel = true;
  } else if (type == "bold") {
    console.log($t('i18n1919'));
  }
  if (type == "submit") {
    await submitGdlFlowInfo(e.gdlId);
  }
  if (type == "state") {
    await switchGdlState(e.gdlId, e.gdlStatus == 0 ? 1 : 0);
  }
  if(type=="life"){
    gdlLifeModal?.value.openDialog(e.gdlId)
  }
  if(type=="relation"){
    relVisModal?.value.openDialog("gdl",{gdlId:e.gdlId})
  }
  nextTick(()=> listReactive.isDisabled = false)
};
const switchGdlState = async (gdlId: number, state: number) => {
  let res: any = await switchState(gdlId, state);
  if (res.code == "0000000") {
    message.success($t('i18n1925'));
    findIndexList();
  } else {
    message.error($t('i18n1926'));
  }
};

const submitGdlFlowInfo = async (gdlId: number) => {
  let res: any = await submitGdlFlow(gdlId);
  if (res.status == 1) {
    message.success($t('i18n1927'));
    findIndexList();
  } else {
    message.error(res.msg);
  }
};

const detail = (row: any, type: any) => {
  console.log("row", row);
  console.log("type", type);
  if (type == "edit") {
    handleLevel(row,type)
    // router.push({ path: "idxRegister", query: { gdlId: row.gdlId, type: type } });
  } else if (type == "view") {
    handleLevel(row,type)
    // router.push({ path: "idxRegister", query: { gdlId: row.gdlId, type: type } });
  } else if (type == "delete") {
    listReactive.rowIndexId = row.gdlId;
    listReactive.isShowDel = true;
  }
};
const handleLevel = (row: any, type: any)=>{
  let routeUrl = "idxRegister"
  let fatherUrl = route.name
  let tagList = deepCloneMax(counterStore.tagList);
  const findUrl:any = tagList.find(v => v.path == fatherUrl)
  if(findUrl) {
    findUrl.levelPath = routeUrl
    counterStore.setTagList(tagList);
  }
  router.push({ path: routeUrl, query: { gdlId: row.gdlId, type: type } });
}
const setPathFrom = (path: string) => {
  if (path == "/idxRegister" || path == "/idxImport") {
    initTableData();
  }
};
const showDyColumn = () => {
  dyColumn.value?.openDialog("gdl");
};
const updateColumns = (columns) => {
  listReactive.showColumns = [];
  listReactive.tableShow = false;
  nextTick(() => {
    listReactive.showColumns = [
      ...listReactive.fixedColumns,
      ...columns,
      ...listReactive.operateColumns,
    ];
    listReactive.tableShow = true;
  });
};
const resetColumn = () => {
  dyColumn.value?.reset();
  let showColumn = listReactive.tableColumns.filter((el) => el.isChecked);
  listReactive.showColumns = [
    ...listReactive.fixedColumns,
    ...showColumn,
    ...listReactive.operateColumns,
  ];
};
const getFlowEnum = (value) => {
  return listReactive.enums.flowInsState.find((el) => el.value == value);
};
const getFlowInsEnum = (value) => {
  return listReactive.enums.flowInsRes.find((el) => el.value == value);
};
const editBtnBussinessLimit=(row:any)=>{
      //下线
      if(row.gdlStatus==0&&row.flowInsState!=1&&row.flowInsState==3){
        return true
      }
      //草稿
      if(row.gdlStatus==2){
        if(row.flowInsState == undefined || row.flowInsState == 3||row.flowInsRes == 0){
          return true;
        }
      }
      return false;
}
defineExpose({ setPathFrom });
</script>

<style scoped lang="scss">
.page-content {
  .list-title {
    color: rgba(102, 102, 102);
    font-size: 16px;
    font-weight: bold;
    padding-left: 15px;
    border-left: 5px solid var(--primaryColor1);
  }

  .line {
    width: 100%;
    height: 1px;
    background-color: rgba(217, 217, 217, 1);
    margin: 20px 0;
  }

  .list-box {
    display: flex;
    height: calc(100% - 57px);
  }

  // .left-tree {
  //     // flex: 2;
  //     display: flex;
  //     flex-direction: column;
  //     padding-right: 20px;
  //     border-right: rgba(216, 216, 216, 1) 1px solid;
  //     width: 240px;
  //     height: 100%;
  //     // :deep(.n-tree-node--selected) {
  //     //     background-color: rgb(236, 245, 255);
  //     // }

  //     .select-down {
  //         margin-bottom: 20px;
  //         position: relative;

  //         .select-ipt {
  //             border-radius: 5px;
  //         }

  //         .left-search {
  //             margin-top: 10px;
  //             padding-right: 22px;
  //         }

  //         .search-img {
  //             position: absolute;
  //             right: 10px;
  //             top: 48px;
  //             color: #d7d7d7;
  //             font-size: 20px;
  //         }
  //     }

  //     .select-opt {
  //         display: flex;
  //         align-items: flex-start;
  //         justify-content: flex-start;
  //         margin-bottom: 10px;
  //         padding-right: 20px;

  //         .open,
  //         .close {
  //             display: flex;
  //             align-items: center;
  //             cursor: pointer;

  //             .opt-img {
  //                 width: 16px;
  //                 height: 16px;
  //             }

  //             span {
  //                 font-size: 12px;
  //                 color: rgb(64, 158, 255);
  //                 padding-left: 5px;
  //             }
  //         }

  //         .ml {
  //             margin-left: 20px;
  //         }
  //     }

  //     .select-tree {
  //         height: calc(100% - 57px);
  //         padding-right: 6px;
  //         overflow-y: auto;
  //     }
  // }

  .right-content {
    // flex: 8;
    // width: calc(100% - 240px);
    // padding-left: 20px;
    width: 100%;

    .search-box {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap:8px;

      .condition {
        display: flex;
        align-items: center;
      }

      .select-tree-node {
        @include layout-flex();
        margin-right: 20px;

        > .tree-text {
          width: 84px;
          text-align: right;
          color: var(--commonFintColor);
        }
      }

      .condition-key {
        display: flex;
        align-items: center;
        position: relative;

        .pr {
          padding-right: 22px;
        }

        .search-img {
          position: absolute;
          right: 10px;
          color: #d7d7d7;
          font-size: 20px;
        }
      }

      .options-btm {
        display: flex;
        align-items: center;

        .search-btm {
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 400;
          color: #ffffff;
          font-size: 14px;
          padding: 8px 12px;
          background: var(--commonButtonColor);
          border-radius: 4px;

          .top-img {
            font-size: 15px;
            margin-right: 3px;
            font-weight: bold;
          }
        }

        .search-reset {
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 400;
          color: #2e302e;
          font-size: 14px;
          padding: 8px 12px;
          background: #ffffff;
          border: 1px solid #e8e8e8;
          border-radius: 4px;
          margin-left: 20px;

          .top-img {
            font-size: 15px;
            margin-right: 4px;
            font-weight: bold;
          }
        }

        .high-search {
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          font-size: 14px;
          margin-left: 20px;
          color: rgb(64, 158, 255);

          .top-img {
            // color: rgb(64, 158, 255);
            font-size: 15px;
            margin-right: 4px;
            font-weight: bold;
          }
        }
      }

      .search-text {
        color: var(--commonFintColor);
        font-size: 14px;
      }

      .ml {
        margin-left: 30px;
      }

      .search-ipt {
        margin-left: 10px;
        width: 230px;
        border-radius: 5px;
      }
    }

    .head-options {
      margin-top: 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .release {
        display: flex;
        align-items: center;

        .btm-index {
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: var(--commonButtonColor);
          border-radius: 4px;
          padding: 8px 12px;
          cursor: pointer;

          .btm-img {
            width: 16px;
            height: 16px;
            color: var(--logoFontColor);
            font-weight: 700;
          }

          .btm-ins {
            margin-left: 2px;
            font-weight: 400;
            color: #ffffff;
            font-size: 14px;
          }
        }

        .btm-import {
          cursor: pointer;
          margin-left: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 4px;
          padding: 8px 12px;
          border: rgba(217, 217, 217, 1) 1px solid;

          .btm-img {
            width: 16px;
            height: 16px;
            color: var(--commonFintColor666);
            margin: -4px 3px 0 -2px;
          }

          .btm-ins {
            margin-left: 2px;
            font-weight: 400;
            color: var(--commonFintColor666);
            font-size: 14px;
          }
        }
      }

      .other-options {
        display: flex;
        align-items: center;

        .other-img {
          margin-left: 20px;
          cursor: pointer;
          color: rgb(153, 153, 153);
          font-size: 22px;
        }
      }
    }

    .table-box {
      margin-top: 20px;
    }
  }
}

.high-find {
  display: flex;
  align-items: center;

  .find-img {
    font-size: 20px;
    // color: #666;
  }

  span {
    font-size: 16px;
    // color: #666;
    margin-left: 5px;
  }
}

.find-content {
  .find-item {
    display: flex;
    align-items: center;
    margin-bottom: 20px;

    .find-text {
      // color: #2e302e;
      font-size: 14px;
    }

    .find-ipt {
      margin-left: 10px;
      width: 300px;
      border-radius: 5px;
    }
  }
}

.version-box {
  width: 520px;
  height: 380px;
  background-color: #fff;
  border-radius: 6px;
  padding: 20px;
  box-sizing: border-box;

  .title-colse {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 20px;
    border-bottom: solid 1px rgb(217, 217, 217);

    .title,
    .close {
      font-size: 14px;
      color: rgb(102, 102, 102);
    }

    .close {
      cursor: pointer;
    }

    .title {
      font-weight: bold;
    }
  }

  .version-table {
    margin: 20px 0;
  }

  .version-food {
    padding-top: 20px;
    border-top: solid 1px rgb(217, 217, 217);
    display: flex;
    align-items: center;
    justify-content: flex-end;

    .cancel {
      width: 66px;
      height: 32px;
      border: 1px solid rgba(217, 217, 217, 1);
      border-radius: 4px;
      font-size: 14px;
      color: #666666;
      display: flex;
      align-items: center;
      cursor: pointer;
      justify-content: center;
    }

    .start {
      font-size: 14px;
      color: #ffffff;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 61px;
      height: 32px;
      background-color: rgba(16, 142, 233, 1);
      border-radius: 4px;
      margin-left: 15px;
      cursor: pointer;
    }
  }
}

.custom-box {
  width: 746px;
  height: 650px;
  background-color: #fff;
  border-radius: 6px;
  padding: 20px;
  box-sizing: border-box;

  .title-colse {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    padding-bottom: 20px;
    border-bottom: solid 1px rgb(217, 217, 217);

    .title-tips {
      display: flex;
      flex-direction: column;
    }

    .tips {
      color: #999999;
      font-size: 12px;
      margin-top: 6px;
    }

    .title,
    .close {
      font-size: 14px;
      color: rgb(102, 102, 102);
    }

    .close {
      cursor: pointer;
    }

    .title {
      font-weight: bold;
    }
  }

  .version-table {
    margin: 20px 0;

    .table-header {
      width: 100%;
      height: 50px;
      border-top-left-radius: 2px;
      border-top-right-radius: 2px;
      background-color: rgb(242, 242, 242);
      display: grid;
      grid-template-columns: 2fr 5fr 3fr;

      .heade-item {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        color: rgb(101, 101, 101);
        font-weight: bold;
      }
    }

    .table-content {
      border-bottom-left-radius: 2px;
      border-bottom-right-radius: 2px;
      height: 405px;
      width: 100%;
      overflow-y: auto;

      .colum-item {
        display: grid;
        grid-template-columns: 2fr 5fr 3fr;
        padding: 15px 0;
        box-sizing: border-box;
        border-bottom: solid 1px rgba(217, 217, 217, 0.5);

        .colum-img {
          width: 14px;
          height: 14px;
          cursor: pointer;
        }

        .colum-name {
          font-size: 14px;
          color: #333;
        }

        .colum-drag {
          width: 16px;
          height: 16px;
          cursor: pointer;
        }
      }
    }
  }

  .version-food {
    padding-top: 20px;
    border-top: solid 1px rgb(217, 217, 217);
    display: flex;
    align-items: center;
    justify-content: flex-end;

    .cancel {
      width: 66px;
      height: 32px;
      border: 1px solid rgba(217, 217, 217, 1);
      border-radius: 4px;
      font-size: 14px;
      color: #666666;
      display: flex;
      align-items: center;
      cursor: pointer;
      justify-content: center;
    }

    .start {
      font-size: 14px;
      color: #ffffff;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 61px;
      height: 32px;
      background-color: rgba(16, 142, 233, 1);
      border-radius: 4px;
      margin-left: 15px;
      cursor: pointer;
    }
  }
}
</style>
