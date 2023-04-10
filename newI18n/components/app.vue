<!--实时监控-->
<template>
  <div class="mainBody">
    <div class="top">
      <el-card>
        <div slot="header">
          <span>重点场景监控</span>
          <div style="float: right">
            <span @click="showBigScreen" class="showBigScreen">切换大屏</span>
            <span style="margin-left: 10px">{{ searchTime }}</span>
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
                :label="position.id"
                >{{ position.name }}</el-radio-button
              >
            </el-radio-group>
          </el-col>
        </el-row>
        <div @mousewheel="rollScroll($event)">
          <!--          <el-carousel height="195px" direction="vertical" ref="carousel" :autoplay="false" :interval="10000" @mousewheel="rollScroll($event)">-->
          <!--            <el-carousel-item v-for=" index0  in 1" :key="index0">-->
          <!--              <el-row v-for=" (scenes, index1)  in monitorScenesKpi" :key="index1">-->
          <!--                <el-col v-for=" (scene, index2) in scenes" :span="6" :key="index2">-->
          <!--                  &lt;!&ndash; v-if="index0==1?scene.id>=(index0-1)*12&&scene.id<=index0*12:scene.id>(index0-1)*12&&scene.id<=index0*12"&ndash;&gt;-->
          <!--                  <div :id="scene.id"-->
          <!--                       v-if="index0==1?index1*4+index2>=0&&index1*4+index2<=(12-1):index1*4+index2>(12-1)&&index1*4+index2<=(24-1)"-->
          <!--                       v-loading="scene.loading" :class="scene.canClick?selectScene.id== scene.id ?'fangkuai fangkuaiSelected':'fangkuai':'fangkuaiForCantClick'" @click="changeScene(scene)">-->
          <!--                    <el-row>-->
          <!--                      <el-col :span="4">-->
          <!--                        <div style="float: right">-->
          <!--                          <img class="iconStyle" :src="scene.canClick?menuImageUrl:dashboardImageUrl">-->
          <!--                        </div>-->
          <!--                      </el-col>-->
          <!--                      <el-col :span="20">-->

          <!--                        &lt;!&ndash;特殊场景特殊处理&ndash;&gt;-->
          <!--                        <div v-if="scene.id==6">-->
          <!--                          <span class="spanstyleTitle">{{scene.name}}</span>-->

          <!--                          <div class="spanstyleValueNumber">-->
          <!--                            <span class="numberExplan" >当月限速用户数</span>-->
          <!--                            {{(scene.monthAdd+"").indexOf("万")>0?scene.monthAdd: Math.abs(scene.monthAdd)}}-->
          <!--                          </div>-->
          <!--                          <span class="spanstyleValue">占比-->
          <!--                          {{Math.abs(scene.huanbi)+"%"}}-->
          <!--                        </span>-->
          <!--                        </div>-->
          <!--                        <div v-else-if="scene.id==11">-->
          <!--                          <span class="spanstyleTitle">{{scene.name}}</span>-->
          <!--                          <span class="spanstyleValue" style="visibility:hidden">占比-->
          <!--                          {{Math.abs(scene.huanbi)+"%"}}-->
          <!--                          </span>-->
          <!--                          <div class="spanstyleValueNumber">-->
          <!--                            <span class="numberExplan" >设备重障数(≥3)</span>-->
          <!--                            {{scene.canClick?scene.totalNum:scene.totalNum+'%'}}-->
          <!--                          </div>-->
          <!--                        </div>-->
          <!--                        <div v-else-if="scene.id==13">-->
          <!--                          <span class="spanstyleTitle">{{scene.name}}</span>-->
          <!--                          <div class="spanstyleValueNumber">-->
          <!--                            <span class="numberExplan">完成率：{{scene.canClick?scene.totalNum+'%':scene.totalNum+'%'}}</span>-->
          <!--                            <span style="margin-left: 10px">月-->
          <!--                              <i :style="{'color':scene.monthAdd>=0?'red':'rgb(0 255 197)'}" :class="scene.monthAdd<0?'el-icon-bottom':'el-icon-top'"></i>-->
          <!--                              {{Math.abs(scene.monthAdd)+"%"}}-->
          <!--                            </span>-->
          <!--                          </div>-->
          <!--                          <div class="spanstyleValue">-->
          <!--                            <span class="numberExplan">满意率：{{scene.canClick?scene.huanbi+'%':scene.huanbi+'%'}}</span>-->
          <!--                            <span style="margin-left: 10px">月-->
          <!--                              <i :style="{'color':scene.huanbi_2>=0?'red':'rgb(0 255 197)'}" :class="scene.huanbi_2<0?'el-icon-bottom':'el-icon-top'"></i>-->
          <!--                              {{Math.abs(scene.huanbi_2)+"%"}}-->
          <!--                            </span>-->
          <!--                          </div>-->

          <!--                        </div>-->
          <!--                        <div v-else-if="scene.id==14">-->
          <!--                          <span class="spanstyleTitle">{{scene.name}}</span>-->
          <!--                          <div class="spanstyleValueNumber">-->
          <!--                            <span class="numberExplan" >完成率：</span>-->
          <!--                            {{scene.canClick?scene.totalNum+'%':scene.totalNum+'%'}}-->
          <!--                          </div>-->
          <!--                          <span class="spanstyleValue">月环比-->
          <!--                            <i :style="{'color':scene.huanbi>=0?'red':'rgb(0 255 197)'}" :class="scene.huanbi<0?'el-icon-bottom':'el-icon-top'"></i>-->
          <!--                            {{Math.abs(scene.huanbi)+"%"}}-->
          <!--                          </span>-->
          <!--                        </div>-->
          <!--                        &lt;!&ndash;通用模块&ndash;&gt;-->
          <!--                        <div v-else>-->
          <!--                          <span class="spanstyleTitle">{{scene.name}}</span>-->

          <!--                          <div class="spanstyleValueNumber" v-if="!scene.eg">-->
          <!--                            <span class="numberExplan">{{scene.canClick?'未解决':''}}</span>-->
          <!--                            {{scene.canClick?scene.totalNum:scene.totalNum+'%'}}-->
          <!--                          </div>-->
          <!--                          <div class="spanstyleValueNumber" v-if="scene.eg">-->
          <!--                            <span class="numberExplan">敬请期待</span>-->
          <!--                          </div>-->
          <!--                          <span class="spanstyleValue">月{{(scene.monthAdd>=0?'新增  ':'下降  ')+Math.abs(scene.monthAdd)+'，  月环比'}}-->
          <!--                          <i :style="{'color':scene.huanbi>=0?'red':'rgb(0 255 197)'}" :class="scene.huanbi<0?'el-icon-bottom':'el-icon-top'"></i>-->
          <!--                          {{Math.abs(scene.huanbi)+"%"}}-->
          <!--                        </span>-->
          <!--                        </div>-->
          <!--                      </el-col>-->
          <!--                    </el-row>-->
          <!--                  </div>-->
          <!--                </el-col>-->
          <!--              </el-row>-->
          <!--            </el-carousel-item>-->

          <!--          </el-carousel>-->
          <el-carousel
            height="65px"
            direction="horizontal"
            ref="carousel"
            arrow="always"
            indicator-position="none"
            v-if="mainPosition != 1"
            :autoplay="false"
            @mousewheel="rollScroll($event)"
          >
            <el-carousel-item v-for="index0 in monitorScenesKpi.length" :key="index0">
              <el-row v-for="(scenes, index1) in monitorScenesKpi" :key="index1">
                <el-col
                  v-for="(scene, index2) in scenes"
                  :span="1883"
                  :key="index2"
                  :style="index2 == 0 ? 'margin-left:41px' : ''"
                >
                  <!-- v-if="index0==1?scene.id>=(index0-1)*12&&scene.id<=index0*12:scene.id>(index0-1)*12&&scene.id<=index0*12"-->
                  <div
                    :id="scene.id"
                    v-if="
                      index1 * 5 + index2 >= (index0 - 1) * 5 &&
                      index1 * 5 + index2 <= 5 * index0 - 1
                    "
                    v-loading="scene.loading"
                    :class="
                      scene.canClick
                        ? selectScene.id == scene.id
                          ? 'fangkuai fangkuaiSelected'
                          : 'fangkuai'
                        : 'fangkuaiForCantClick'
                    "
                    @click="changeScene(scene)"
                  >
                    <el-row>
                      <el-col :span="4">
                        <div style="float: right">
                          <img
                            class="iconStyle"
                            :src="scene.canClick ? menuImageUrl : dashboardImageUrl"
                          />
                        </div>
                      </el-col>
                      <el-col :span="20">
                        <!--特殊场景特殊处理-->
                        <div v-if="scene.id == 6">
                          <span class="spanstyleTitle">{{ scene.name }}</span>

                          <div class="spanstyleValueNumber">
                            <span class="numberExplan">当月限速用户数</span>
                            {{
                              (scene.monthAdd + "").indexOf("万") > 0
                                ? scene.monthAdd
                                : Math.abs(scene.monthAdd)
                            }}
                          </div>
                          <span class="spanstyleValue"
                            >占比
                            {{ Math.abs(scene.huanbi) + "%" }}
                          </span>
                        </div>
                        <div v-else-if="scene.id == 11">
                          <span class="spanstyleTitle">{{ scene.name }}</span>
                          <span class="spanstyleValue" style="visibility: hidden"
                            >占比
                            {{ Math.abs(scene.huanbi) + "%" }}
                          </span>
                          <div class="spanstyleValueNumber" v-if="scene.eg">
                            <span class="numberExplan">敬请期待</span>
                          </div>
                          <div class="spanstyleValueNumber" v-else>
                            <span class="numberExplan">设备重障数(≥3)</span>
                            {{ scene.canClick ? scene.totalNum : scene.totalNum + "%" }}
                          </div>
                        </div>
                        <div v-else-if="scene.id == 13">
                          <span class="spanstyleTitle">{{ scene.name }}</span>
                          <div class="spanstyleValueNumber">
                            <span class="numberExplan"
                              >完成率：{{
                                scene.canClick
                                  ? scene.totalNum + "%"
                                  : scene.totalNum + "%"
                              }}</span
                            >
                            <span style="margin-left: 10px"
                              >月
                              <i
                                :style="{
                                  color: scene.monthAdd >= 0 ? 'red' : 'rgb(0 255 197)',
                                }"
                                :class="
                                  scene.monthAdd < 0 ? 'el-icon-bottom' : 'el-icon-top'
                                "
                              ></i>
                              {{ Math.abs(scene.monthAdd) + "%" }}
                            </span>
                          </div>
                          <div class="spanstyleValue">
                            <span class="numberExplan"
                              >满意率：{{
                                scene.canClick ? scene.huanbi + "%" : scene.huanbi + "%"
                              }}</span
                            >
                            <span style="margin-left: 10px"
                              >月
                              <i
                                :style="{
                                  color: scene.huanbi_2 >= 0 ? 'red' : 'rgb(0 255 197)',
                                }"
                                :class="
                                  scene.huanbi_2 < 0 ? 'el-icon-bottom' : 'el-icon-top'
                                "
                              ></i>
                              {{ Math.abs(scene.huanbi_2) + "%" }}
                            </span>
                          </div>
                        </div>
                        <div v-else-if="scene.id == 14">
                          <span class="spanstyleTitle">{{ scene.name }}</span>
                          <div class="spanstyleValueNumber">
                            <span class="numberExplan">完成率：</span>
                            {{
                              scene.canClick ? scene.totalNum + "%" : scene.totalNum + "%"
                            }}
                          </div>
                          <span class="spanstyleValue"
                            >月环比
                            <i
                              :style="{
                                color: scene.monthAdd >= 0 ? 'red' : 'rgb(0 255 197)',
                              }"
                              :class="
                                scene.monthAdd < 0 ? 'el-icon-bottom' : 'el-icon-top'
                              "
                            ></i>
                            {{ Math.abs(scene.monthAdd) + "%" }}
                          </span>
                        </div>
                        <div v-else-if="scene.id == 15">
                          <span class="spanstyleTitle">{{ scene.name }}</span>

                          <div class="spanstyleValueNumber">
                            <span class="numberExplan">投诉判责量：</span>
                            {{
                              (scene.totalNum + "").indexOf("万") > 0
                                ? scene.totalNum
                                : Math.abs(scene.totalNum)
                            }}
                          </div>
                          <span class="spanstyleValue"
                            >月环比
                            <i
                              :style="{
                                color: scene.monthAdd >= 0 ? 'red' : 'rgb(0 255 197)',
                              }"
                              :class="
                                scene.monthAdd < 0 ? 'el-icon-bottom' : 'el-icon-top'
                              "
                            ></i>
                            {{ Math.abs(scene.monthAdd) + "%" }}
                          </span>
                        </div>
                        <div v-else-if="scene.id == 17">
                          <span class="spanstyleTitle">{{ scene.name }}</span>
                          <div class="spanstyleValueNumber">
                            <span class="numberExplan">累计活动场次：</span
                            >{{ scene.totalNum }}
                          </div>
                          <span class="spanstyleValue"
                            >月{{
                              (scene.monthAdd >= 0 ? "新增  " : "下降  ") +
                              Math.abs(scene.monthAdd) +
                              "，  月环比"
                            }}
                            <i
                              :style="{
                                color: scene.huanbi >= 0 ? 'red' : 'rgb(0 255 197)',
                              }"
                              :class="scene.huanbi < 0 ? 'el-icon-bottom' : 'el-icon-top'"
                            ></i>
                            {{ Math.abs(scene.huanbi) + "%" }}
                          </span>
                        </div>
                        <div v-else-if="scene.id == 18">
                          <span class="spanstyleTitle">{{ scene.name }}</span>
                          <div class="spanstyleValueNumber">
                            <span class="numberExplan">预警频次：</span
                            >{{ scene.totalNum }}
                          </div>
                          <span class="spanstyleValue">
                            月<i
                              :style="{
                                color: scene.monthAdd >= 0 ? 'red' : 'rgb(0 255 197)',
                              }"
                              :class="
                                scene.monthAdd < 0 ? 'el-icon-bottom' : 'el-icon-top'
                              "
                            ></i>
                            {{ Math.abs(scene.monthAdd) }}
                            月环比<i
                              :style="{
                                color: scene.huanbi >= 0 ? 'red' : 'rgb(0 255 197)',
                              }"
                              :class="scene.huanbi < 0 ? 'el-icon-bottom' : 'el-icon-top'"
                            ></i>
                            {{ Math.abs(scene.huanbi) + "%" }}
                          </span>
                        </div>
                        <div v-else-if="scene.id == 19">
                          <span class="spanstyleTitle">{{ scene.name }}</span>
                          <div class="spanstyleValueNumber">
                            <!--
                              <span class="numberExplan" >挽留失败数：</span>{{scene.totalNum}}
                              -->
                            <span class="numberExplan">敬请期待</span>
                          </div>
                          <span class="spanstyleValue">
                            月<i
                              :style="{
                                color: scene.monthAdd >= 0 ? 'red' : 'rgb(0 255 197)',
                              }"
                              :class="
                                scene.monthAdd < 0 ? 'el-icon-bottom' : 'el-icon-top'
                              "
                            ></i>
                            {{ scene.monthAdd }}
                            月环比<i
                              :style="{
                                color: scene.huanbi >= 0 ? 'red' : 'rgb(0 255 197)',
                              }"
                              :class="scene.huanbi < 0 ? 'el-icon-bottom' : 'el-icon-top'"
                            ></i>
                            {{ Math.abs(scene.huanbi) + "%" }}
                          </span>
                        </div>
                        <!-- 魔盘业务监控 -->
                        <div v-else-if="scene.id == 20">
                          <span class="spanstyleTitle">{{ scene.name }}</span>
                          <div class="spanstyleValue" style="line-height: 23px">
                            <!-- <span class="numberExplan">敬请期待</span> -->
                            <span>当日投诉总量：{{ scene.totalNum }},</span>
                            日<i
                              :style="{
                                color: scene.monthAdd >= 0 ? 'red' : 'rgb(0 255 197)',
                              }"
                              :class="
                                scene.monthAdd < 0 ? 'el-icon-bottom' : 'el-icon-top'
                              "
                            ></i>
                            {{ scene.monthAdd + "%" }}
                          </div>
                          <span class="spanstyleValue">
                            <span>当日新增用户数：{{ scene.huanbi }},</span>
                            日<i
                              :style="{
                                color: scene.huanbi_2 >= 0 ? 'red' : 'rgb(0 255 197)',
                              }"
                              :class="
                                scene.huanbi_2 < 0 ? 'el-icon-bottom' : 'el-icon-top'
                              "
                            ></i>
                            {{ scene.huanbi_2 + "%" }}
                          </span>
                          <!-- <span class="numberExplan">当日新增用户数：{{scene.huanbi}},</span>
                            <span class="spanstyleValue">
                              日<i :style="{'color':scene.huanbi_2>=0?'red':'rgb(0 255 197)'}" :class="scene.huanbi_2<0?'el-icon-bottom':'el-icon-top'"></i>
                              {{Math.abs(scene.huanbi_2)+"%"}}
                            </span> -->
                        </div>
                        <div v-else-if="scene.id == 22">
                          <span class="spanstyleTitle">{{ scene.name }}</span>
                          <div class="spanstyleValue" style="line-height: 20px">
                            <span>携出量：{{ scene.totalNum }},</span>
                            日环比<i
                              :style="{
                                color: scene.monthAdd >= 0 ? 'red' : 'rgb(0 255 197)',
                              }"
                              :class="
                                scene.monthAdd < 0 ? 'el-icon-bottom' : 'el-icon-top'
                              "
                            ></i>
                            {{ scene.monthAdd + "%" }}
                          </div>
                          <span class="spanstyleValue">
                            <span>携入量：{{ scene.huanbi }},</span>
                            日环比<i
                              :style="{
                                color: scene.huanbi_2 >= 0 ? 'red' : 'rgb(0 255 197)',
                              }"
                              :class="
                                scene.huanbi_2 < 0 ? 'el-icon-bottom' : 'el-icon-top'
                              "
                            ></i>
                            {{ scene.huanbi_2 + "%" }}
                          </span>
                          <!-- <span class="spanstyleTitle">{{scene.name}}</span>
                            <div class="spanstyleValueNumber">
                                          <span class="numberExplan">敬请期待</span>
                            </div>
                            <span class="spanstyleValue">
                              <span>携出量{{scene.totalNum}},</span>
                              日环比<i :style="{'color':scene.monthAdd>=0?'red':'rgb(0 255 197)'}" :class="scene.monthAdd<0?'el-icon-bottom':'el-icon-top'"></i>
                              {{scene.monthAdd}}
                            </span> -->
                          <!-- <span class="numberExplan">携入量：{{scene.huanbi}},</span>
                            <span class="spanstyleValue">
                              日环比<i :style="{'color':scene.huanbi_2>=0?'red':'rgb(0 255 197)'}" :class="scene.huanbi_2<0?'el-icon-bottom':'el-icon-top'"></i>
                              {{Math.abs(scene.huanbi_2)+"%"}}
                            </span> -->
                        </div>
                        <div v-else-if="scene.id == 1 || scene.id == 2">
                          <span class="spanstyleTitle">{{ scene.name }}</span>
                          <div class="spanstyleValueNumber" v-if="!scene.eg">
                            <span class="numberExplan">{{
                              scene.canClick ? "未解决" : ""
                            }}</span>
                            {{ scene.canClick ? scene.totalNum : scene.totalNum + "%" }}
                          </div>
                          <span
                            class="spanstyleValue"
                            v-if="scene.eg"
                            style="visibility: hidden"
                            >敬请期待</span
                          >
                          <div class="spanstyleValueNumber" v-if="scene.eg">
                            <span class="numberExplan">敬请期待</span>
                          </div>
                          <span v-if="!scene.eg" class="spanstyleValue"
                            >月{{
                              (scene.monthAdd >= 0 ? "新增  " : "下降  ") +
                              Math.abs(scene.monthAdd) +
                              "，  月环比"
                            }}
                            <i
                              :style="{
                                color: scene.huanbi >= 0 ? 'red' : 'rgb(0 255 197)',
                              }"
                              :class="scene.huanbi < 0 ? 'el-icon-bottom' : 'el-icon-top'"
                            ></i>
                            {{ Math.abs(scene.huanbi) + "%" }}
                          </span>
                        </div>
                        <!--通用模块-->
                        <div v-else>
                          <span class="spanstyleTitle">{{ scene.name }}</span>
                          <div class="spanstyleValueNumber" v-if="!scene.eg">
                            <span class="numberExplan">{{
                              scene.canClick ? "未解决" : ""
                            }}</span>
                            {{ scene.canClick ? scene.totalNum : scene.totalNum + "%" }}
                          </div>
                          <div class="spanstyleValueNumber" v-if="scene.eg">
                            <span class="numberExplan">敬请期待</span>
                          </div>
                          <span class="spanstyleValue"
                            >月{{
                              (scene.monthAdd >= 0 ? "新增  " : "下降  ") +
                              Math.abs(scene.monthAdd) +
                              "，  月环比"
                            }}
                            <i
                              :style="{
                                color: scene.huanbi >= 0 ? 'red' : 'rgb(0 255 197)',
                              }"
                              :class="scene.huanbi < 0 ? 'el-icon-bottom' : 'el-icon-top'"
                            ></i>
                            {{ Math.abs(scene.huanbi) + "%" }}
                          </span>
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
    </div>
    <div class="foot">
      <el-row v-if="selectScene.id == 17">
        <el-col :span="12">
          <div class="grid-content bg-purple-2">
            <el-card style="height: 31%; margin-bottom: 5px">
              <div slot="header">
                <span>运营指标</span>
                <el-tooltip content="说明" placement="right">
                  <img
                    src="../../assets/bigScreen/complaintanalysisNew/help-icon.png"
                    style="
                      vertical-align: middle;
                      margin-bottom: 4px;
                      margin-left: 2px;
                      width: 0.2rem;
                    "
                    @click="dialogTableVisible = true"
                  />
                </el-tooltip>
                <el-dialog :visible.sync="dialogTableVisible" width="40%">
                  <div style="height: 500px">
                    <p
                      class="MsoNormal"
                      align="left"
                      style="margin-left: 28.1pt; text-align: left; line-height: 150%"
                    >
                      <span
                        lang="EN-US"
                        style="
                          font-size: 14pt;
                          line-height: 150%;
                          font-family: '微软雅黑', sans-serif;
                          mso-bidi-font-family: 微软雅黑;
                        "
                        >1</span
                      >
                      <span
                        style="
                          font-size: 14pt;
                          line-height: 150%;
                          font-family: '微软雅黑', sans-serif;
                          mso-bidi-font-family: 微软雅黑;
                        "
                        >、代客报障：来自于电小二、电信小店、企业微信代客报障功能的有线问题上报，直派装维并上门处理；</span
                      >
                    </p>
                    <p
                      class="MsoNormal"
                      align="left"
                      style="margin-left: 28.1pt; text-align: left; line-height: 150%"
                    >
                      <span
                        lang="EN-US"
                        style="
                          font-size: 14pt;
                          line-height: 150%;
                          font-family: '微软雅黑', sans-serif;
                          mso-bidi-font-family: 微软雅黑;
                        "
                        >2</span
                      >
                      <span
                        style="
                          font-size: 14pt;
                          line-height: 150%;
                          font-family: '微软雅黑', sans-serif;
                          mso-bidi-font-family: 微软雅黑;
                        "
                        >、后向支撑：涉及魔镜平台、ITV平台故障装维人员在现场无法处理时，发起后向支撑流程，由后端快速承接相应的故障处理，帮助客户解决因平台导致的故障问题；</span
                      >
                    </p>
                    <p
                      class="MsoNormal"
                      align="left"
                      style="margin-left: 28.1pt; text-align: left; line-height: 150%"
                    >
                      <span
                        lang="EN-US"
                        style="
                          font-size: 14pt;
                          line-height: 150%;
                          font-family: '微软雅黑', sans-serif;
                          mso-bidi-font-family: 微软雅黑;
                        "
                        >3</span
                      >
                      <span
                        style="
                          font-size: 14pt;
                          line-height: 150%;
                          font-family: '微软雅黑', sans-serif;
                          mso-bidi-font-family: 微软雅黑;
                        "
                        >、主动修复：取宽带满意度预测小于6分的用户，且每个包区每天派1单，每周包区5单，BSR直派云调，装维上门处理。</span
                      >
                    </p>
                    <p
                      class="MsoNormal"
                      align="left"
                      style="margin-left: 28.1pt; text-align: left; line-height: 150%"
                    >
                      <span
                        lang="EN-US"
                        style="
                          font-size: 14pt;
                          line-height: 150%;
                          font-family: '微软雅黑', sans-serif;
                          mso-bidi-font-family: 微软雅黑;
                        "
                        >4</span
                      >
                      <span
                        style="
                          font-size: 14pt;
                          line-height: 150%;
                          font-family: '微软雅黑', sans-serif;
                          mso-bidi-font-family: 微软雅黑;
                        "
                        >、工单结果展示：展示当月工单数据；</span
                      >
                    </p>
                  </div>
                </el-dialog>
              </div>

              <!--    左侧 start      -->
              <div class="businessTarget fangkuaiForCantClick" style="line-height: 33px">
                <span class="spanstyleTitle"
                  >当月装维工单量：{{ selectScene.huanbi_2 }}</span
                >
                <span class="spanstyleTitle"
                  >当月直销工单量：{{ selectScene.colum_4 }}</span
                >
              </div>
              <!--    左侧 end      -->
              <!--    右侧 start      -->
              <div class="businessTarget fangkuaiForCantClick" style="line-height: 33px">
                <span class="spanstyleTitle"
                  >宽带满意预测得分：{{ selectScene.colum_5 }}</span
                >
                <span class="spanstyleTitle">
                  月环比：<i
                    :style="{
                      color: selectScene.colum_6 >= 0 ? 'red' : 'rgb(0 255 197)',
                    }"
                    :class="selectScene.colum_6 < 0 ? 'el-icon-bottom' : 'el-icon-top'"
                  ></i>
                  {{ Math.abs(selectScene.colum_6) + "%" }}
                </span>
              </div>
              <!--    右侧 end      -->
            </el-card>

            <el-card style="height: 66%; margin-bottom: 5px">
              <div slot="header">
                <span
                  >当月派单管控<i style="color: grey">
                    更新时间：{{ currentDateTime }}</i
                  ></span
                >
                <span
                  @click="gotoDownLoad('upTable')"
                  class="downloadStyle"
                  style="line-height: unset"
                  >清单下载</span
                >
              </div>
              <TableTemp
                v-loading="talbeMap.yingxiao_pdgk.tableLoading"
                :controlOption="talbeMap.yingxiao_pdgk.tableData"
              ></TableTemp>
            </el-card>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple-2-light">
            <el-card style="height: 31%; margin-bottom: 5px">
              <div slot="header">
                <span></span>
              </div>
              <div class="businessTarget fangkuaiForCantClick" style="line-height: 33px">
                <span class="spanstyleTitle"
                  >质差用户占比(&lt;6分)：{{ Math.abs(selectScene.colum_7) + "%" }}</span
                >
                <span class="spanstyleTitle">
                  月环比：<i
                    :style="{
                      color: selectScene.colum_8 >= 0 ? 'red' : 'rgb(0 255 197)',
                    }"
                    :class="selectScene.colum_8 < 0 ? 'el-icon-bottom' : 'el-icon-top'"
                  ></i>
                  {{ Math.abs(selectScene.colum_8) + "%" }}
                </span>
              </div>
              <div class="businessTarget fangkuaiForCantClick" style="line-height: 33px">
                <span class="spanstyleTitle"
                  >当月活动价值积分：{{ selectScene.colum_9 }}</span
                >
                <span class="spanstyleTitle"
                  >当月新增宽带数：{{ selectScene.colum_10 }}</span
                >
              </div>
            </el-card>
            <el-card style="height: 66%; margin-bottom: 5px">
              <div slot="header">
                <span
                  >当月服务营销效果评估优秀分局<i style="color: grey"
                    >更新时间：{{ currentDateTime2 }}</i
                  ></span
                >
              </div>
              <TableTemp
                v-loading="talbeMap.yingxiao_fwyx_yxfj.tableLoading"
                :controlOption="talbeMap.yingxiao_fwyx_yxfj.tableData"
              ></TableTemp>
            </el-card>
          </div>
        </el-col>
        <el-col :span="24">
          <div class="grid-content">
            <el-card style="height: 240px; margin-bottom: 5px">
              <div slot="header">
                <span>当月服务营销效果评估 </span>

                <!-- <el-radio-group v-model="orderType" size="mini">
                      <el-radio-button label="1">日报表</el-radio-button>
                      <el-radio-button label="2">月报表</el-radio-button>
                    </el-radio-group> -->
                <span
                  @click="gotoDownLoad('downTable')"
                  class="downloadStyle"
                  style="line-height: unset"
                  >清单下载</span
                >
              </div>
              <TableTemp
                v-loading="talbeMap.yingxiao_fwyx.tableLoading"
                :controlOption="talbeMap.yingxiao_fwyx.tableData"
              ></TableTemp>
            </el-card>
          </div>
        </el-col>
      </el-row>
      <el-row v-else-if="selectScene.id == 20">
        <el-col :span="12">
          <div class="grid-content bg-purple-2">
            <el-card style="height: 31%; margin-bottom: 5px">
              <div slot="header">
                <span>魔盘投诉指标</span>
                <el-tooltip content="说明" placement="right">
                  <img
                    src="../../assets/bigScreen/complaintanalysisNew/help-icon.png"
                    @click="dialogTableVisible = true"
                    style="
                      vertical-align: middle;
                      margin-bottom: 4px;
                      margin-left: 2px;
                      width: 0.2rem;
                    "
                  />
                </el-tooltip>
                <el-dialog :visible.sync="dialogTableVisible" width="40%">
                  <div style="height: 500px">
                    <p
                      class="MsoNormal"
                      align="left"
                      style="margin-left: 28.1pt; text-align: left; line-height: 150%"
                    >
                      <span
                        lang="EN-US"
                        style="
                          font-size: 14pt;
                          line-height: 150%;
                          font-family: '微软雅黑', sans-serif;
                          mso-bidi-font-family: 微软雅黑;
                        "
                        >1</span
                      >
                      <span
                        style="
                          font-size: 14pt;
                          line-height: 150%;
                          font-family: '微软雅黑', sans-serif;
                          mso-bidi-font-family: 微软雅黑;
                        "
                        >、投诉日数据更新时间为14:30，更新之前展示为前日数据;</span
                      >
                    </p>
                    <p
                      class="MsoNormal"
                      align="left"
                      style="margin-left: 28.1pt; text-align: left; line-height: 150%"
                    >
                      <span
                        lang="EN-US"
                        style="
                          font-size: 14pt;
                          line-height: 150%;
                          font-family: '微软雅黑', sans-serif;
                          mso-bidi-font-family: 微软雅黑;
                        "
                        >2</span
                      >
                      <span
                        style="
                          font-size: 14pt;
                          line-height: 150%;
                          font-family: '微软雅黑', sans-serif;
                          mso-bidi-font-family: 微软雅黑;
                        "
                        >、业务健康度日数据更新时间为每日17:30，更新之前展示为前日数据；</span
                      >
                    </p>
                  </div>
                </el-dialog>
                <!--  @click="gotoDownLoad('upTable')" -->
                <span
                  @click="gotoDownLoad('downTable')"
                  class="downloadStyle"
                  style="line-height: unset"
                  >清单下载</span
                >
              </div>

              <!--    左侧 start      -->
              <div class="businessTarget fangkuaiForCantClick" style="line-height: 33px">
                <span class="spanstyleTitle"
                  >当日线上新增投诉总量：{{ selectScene.colum_4 }}，日环比：<span
                    style="color: red; font-size: 14px"
                    >{{
                      (selectScene.colum_5 > 0 ? "+" : "-") +
                      Math.abs(selectScene.colum_5) +
                      "%"
                    }}</span
                  ></span
                >
                <span class="spanstyleTitle">月累计量：{{ selectScene.colum_6 }}</span>
              </div>
              <!--    左侧 end      -->
              <!--    右侧 start      -->
              <div class="businessTarget fangkuaiForCantClick" style="line-height: 33px">
                <span class="spanstyleTitle"
                  >当日线下新增投诉总量：{{ selectScene.colum_7 }}，日环比：<span
                    style="color: red; font-size: 14px"
                    >{{
                      (selectScene.colum_8 > 0 ? "+" : "-") +
                      Math.abs(selectScene.colum_8) +
                      "%"
                    }}</span
                  ></span
                >
                <span class="spanstyleTitle">月累计量：{{ selectScene.colum_9 }}</span>
              </div>
              <!--    右侧 end      -->
            </el-card>

            <el-card style="height: 66%; margin-bottom: 5px">
              <div slot="header">
                <div class="header-content">
                  <span
                    >魔盘投诉（月）-<span style="color: #5087ec">{{
                      getMagicName(finalVal)
                    }}</span></span
                  >
                  <div class="split-choose">
                    <el-select
                      v-model="magicDiskVal"
                      clearable
                      @change="changeMagicOption"
                      placeholder="请选择"
                    >
                      <el-option
                        v-for="item in magicDiskOption"
                        :key="item.value"
                        :label="item.name"
                        :value="item.value"
                      >
                      </el-option>
                    </el-select>
                    <el-select
                      style="margin-left: 5px"
                      v-model="magicDiskValOut"
                      clearable
                      @change="changeMagicOption"
                      placeholder="请选择"
                    >
                      <el-option
                        v-for="item in magicDiskOptionOut"
                        :key="item.value"
                        :label="item.name"
                        :value="item.value"
                      >
                      </el-option>
                    </el-select>
                  </div>
                </div>
              </div>
              <Barchart
                v-if="finalVal != 'online-local' && finalVal != 'outline-local'"
                :chartData="onLineData"
              ></Barchart>
              <Piechart v-else :chartData="pieChartData"></Piechart>
              <!-- <TableTemp v-loading="talbeMap.yingxiao_pdgk.tableLoading" :controlOption="talbeMap.yingxiao_pdgk.tableData"></TableTemp> -->
            </el-card>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple-2-light">
            <el-card style="height: 31%; margin-bottom: 5px">
              <div slot="header">
                <div slot="header">
                  <span>业务健康度指标-线上/线下订购</span>
                  <!--  @click="gotoDownLoad('upTable')" -->
                  <span
                    @click="gotoDownLoad('upTable', 2)"
                    class="downloadStyle"
                    style="line-height: unset; margin-left: 8px"
                    >月到达指标</span
                  >
                  <span
                    @click="gotoDownLoad('upTable', 1)"
                    class="downloadStyle"
                    style="line-height: unset"
                    >日新增指标</span
                  >
                </div>
              </div>
              <div
                class="businessTarget fangkuaiForCantClick"
                style="line-height: 22px; position: relative"
              >
                <span class="position-line">线上</span>
                <span class="spanstyleTitle"
                  >APP用户新增 当日量：{{ selectScene.colum_10 }}，<span
                    style="font-size: 14px"
                    >月累计量：{{ selectScene.colum_11 }}</span
                  ></span
                >
                <span class="spanstyleTitle"
                  >付费用户新增 当日量：{{ selectScene.colum_12 }}，<span
                    style="font-size: 14px"
                    >月累计量：{{ selectScene.colum_13 }}</span
                  ></span
                >
                <span class="spanstyleTitle"
                  >空间使用非0用户数 到达量：{{ selectScene.colum_14 }}</span
                >
              </div>
              <div
                class="businessTarget fangkuaiForCantClick"
                style="line-height: 22px; position: relative"
              >
                <span class="position-line">线下</span>
                <span class="spanstyleTitle"
                  >APP用户新增 当日量：{{ selectScene.colum_15 }}，<span
                    style="font-size: 14px"
                    >月累计量：{{ selectScene.colum_16 }}</span
                  ></span
                >
                <span class="spanstyleTitle"
                  >付费用户新增 当日量：{{ selectScene.colum_17 }}，<span
                    style="font-size: 14px"
                    >月累计量：{{ selectScene.colum_18 }}</span
                  ></span
                >
                <span class="spanstyleTitle"
                  >空间使用非0用户数 到达量：{{ selectScene.colum_19 }}</span
                >
              </div>
            </el-card>
            <el-card style="height: 66%; margin-bottom: 5px">
              <div slot="header">
                <span>魔盘投诉产品TOP10（T-1月）</span>
              </div>
              <Barchart :chartData="onLineDataTop10"></Barchart>
              <!-- <TableTemp v-loading="talbeMap.yingxiao_fwyx_yxfj.tableLoading" :controlOption="talbeMap.yingxiao_fwyx_yxfj.tableData"></TableTemp> -->
            </el-card>
          </div>
        </el-col>
        <el-col :span="24">
          <div class="grid-content">
            <el-card style="height: 240px; margin-bottom: 5px">
              <div slot="header">
                <div class="header-content">
                  <span>业务健康度趋势图</span>
                  <div class="tab-bar">
                    <div
                      v-for="(item, index) in tabbarList"
                      :key="item"
                      :class="['default-bar', index == activeIndex ? 'active-class' : '']"
                      @click.stop="switchTabbar(index)"
                    >
                      {{ item }}
                    </div>
                  </div>
                </div>
              </div>
              <Linechart :chartData="healthChartData"></Linechart>
              <!-- <TableTemp v-loading="talbeMap.yingxiao_fwyx.tableLoading" :controlOption="talbeMap.yingxiao_fwyx.tableData"></TableTemp> -->
            </el-card>
          </div>
        </el-col>
      </el-row>
      <el-row v-else>
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <el-card v-if="mainPosition != 1" style="height: 28%; margin-bottom: 5px">
              <!-- 有线客户说了算-->
              <div v-if="selectScene.id == 13" slot="header">
                <span>运营指标</span>
                <el-tooltip content="说明" placement="right">
                  <img
                    src="../../assets/bigScreen/complaintanalysisNew/help-icon.png"
                    style="
                      vertical-align: middle;
                      margin-bottom: 4px;
                      margin-left: 2px;
                      width: 0.2rem;
                    "
                    @click="dialogTableVisible = true"
                  />
                </el-tooltip>
                <el-dialog :visible.sync="dialogTableVisible" width="40%">
                  <div style="height: 500px">
                    <p
                      class="MsoNormal"
                      align="left"
                      style="margin-left: 28.1pt; text-align: left; line-height: 150%"
                    >
                      <span
                        lang="EN-US"
                        style="
                          font-size: 14pt;
                          line-height: 150%;
                          font-family: '微软雅黑', sans-serif;
                          mso-bidi-font-family: 微软雅黑;
                        "
                        >1</span
                      >
                      <span
                        style="
                          font-size: 14pt;
                          line-height: 150%;
                          font-family: '微软雅黑', sans-serif;
                          mso-bidi-font-family: 微软雅黑;
                        "
                        >、代客报障：来自于电小二、电信小店、企业微信代客报障功能的有线问题上报，直派装维并上门处理；</span
                      >
                    </p>
                    <p
                      class="MsoNormal"
                      align="left"
                      style="margin-left: 28.1pt; text-align: left; line-height: 150%"
                    >
                      <span
                        lang="EN-US"
                        style="
                          font-size: 14pt;
                          line-height: 150%;
                          font-family: '微软雅黑', sans-serif;
                          mso-bidi-font-family: 微软雅黑;
                        "
                        >2</span
                      >
                      <span
                        style="
                          font-size: 14pt;
                          line-height: 150%;
                          font-family: '微软雅黑', sans-serif;
                          mso-bidi-font-family: 微软雅黑;
                        "
                        >、后向支撑：涉及魔镜平台、ITV平台故障装维人员在现场无法处理时，发起后向支撑流程，由后端快速承接相应的故障处理，帮助客户解决因平台导致的故障问题；</span
                      >
                    </p>
                    <p
                      class="MsoNormal"
                      align="left"
                      style="margin-left: 28.1pt; text-align: left; line-height: 150%"
                    >
                      <span
                        lang="EN-US"
                        style="
                          font-size: 14pt;
                          line-height: 150%;
                          font-family: '微软雅黑', sans-serif;
                          mso-bidi-font-family: 微软雅黑;
                        "
                        >3</span
                      >
                      <span
                        style="
                          font-size: 14pt;
                          line-height: 150%;
                          font-family: '微软雅黑', sans-serif;
                          mso-bidi-font-family: 微软雅黑;
                        "
                        >、主动修复：取宽带满意度预测小于6分的用户，且每个包区每天派1单，每周包区5单，BSR直派云调，装维上门处理。</span
                      >
                    </p>
                    <p
                      class="MsoNormal"
                      align="left"
                      style="margin-left: 28.1pt; text-align: left; line-height: 150%"
                    >
                      <span
                        lang="EN-US"
                        style="
                          font-size: 14pt;
                          line-height: 150%;
                          font-family: '微软雅黑', sans-serif;
                          mso-bidi-font-family: 微软雅黑;
                        "
                        >4</span
                      >
                      <span
                        style="
                          font-size: 14pt;
                          line-height: 150%;
                          font-family: '微软雅黑', sans-serif;
                          mso-bidi-font-family: 微软雅黑;
                        "
                        >、工单结果展示：展示当月工单数据；</span
                      >
                    </p>
                  </div>
                </el-dialog>
              </div>
              <!-- 有线高频重障 -->
              <div v-else-if="selectScene.id == 3" slot="header">
                <span>运营指标</span>
                <el-tooltip content="说明" placement="right">
                  <img
                    src="../../assets/bigScreen/complaintanalysisNew/help-icon.png"
                    style="
                      vertical-align: middle;
                      margin-bottom: 4px;
                      margin-left: 2px;
                      width: 0.2rem;
                    "
                    @click="dialogTableVisible = true"
                  />
                </el-tooltip>
                <el-dialog :visible.sync="dialogTableVisible" width="40%">
                  <div style="height: 500px">
                    <p
                      class="MsoNormal"
                      align="left"
                      style="margin-left: 28.1pt; text-align: left; line-height: 150%"
                    >
                      <span
                        lang="EN-US"
                        style="
                          font-size: 14pt;
                          line-height: 150%;
                          font-family: '微软雅黑', sans-serif;
                          mso-bidi-font-family: 微软雅黑;
                        "
                      ></span>
                      <span
                        style="
                          font-size: 14pt;
                          line-height: 150%;
                          font-family: '微软雅黑', sans-serif;
                          mso-bidi-font-family: 微软雅黑;
                        "
                        >事件定义：用户在近30天内，通过各类渠道（万号、微信等）申报同一类型（宽带类故障）故障达3次及以上即为高频重障事件；用户24小时内（自然天，0点到24点）反复报障，只算一次报障。</span
                      >
                    </p>
                  </div>
                </el-dialog>
              </div>
              <!-- 有线设备故障 -->
              <div v-else-if="selectScene.id == 1" slot="header">
                <span>运营指标</span>
                <el-tooltip content="说明" placement="right">
                  <img
                    src="../../assets/bigScreen/complaintanalysisNew/help-icon.png"
                    style="
                      vertical-align: middle;
                      margin-bottom: 4px;
                      margin-left: 2px;
                      width: 0.2rem;
                    "
                    @click="dialogTableVisible = true"
                  />
                </el-tooltip>
                <el-dialog :visible.sync="dialogTableVisible" width="40%">
                  <div style="height: 500px">
                    <p
                      class="MsoNormal"
                      align="left"
                      style="margin-left: 28.1pt; text-align: left; line-height: 150%"
                    >
                      <span
                        lang="EN-US"
                        style="
                          font-size: 14pt;
                          line-height: 150%;
                          font-family: '微软雅黑', sans-serif;
                          mso-bidi-font-family: 微软雅黑;
                        "
                      ></span>
                      <span
                        style="
                          font-size: 14pt;
                          line-height: 150%;
                          font-family: '微软雅黑', sans-serif;
                          mso-bidi-font-family: 微软雅黑;
                        "
                        >事件定义：服务质量系统监控设备故障，发生故障后派单并送BSR，需满足如下条件。</span
                      >
                    </p>
                    <p
                      class="MsoNormal"
                      align="left"
                      style="margin-left: 28.1pt; text-align: left; line-height: 150%"
                    >
                      <span
                        lang="EN-US"
                        style="
                          font-size: 14pt;
                          line-height: 150%;
                          font-family: '微软雅黑', sans-serif;
                          mso-bidi-font-family: 微软雅黑;
                        "
                      ></span>
                      <span
                        style="
                          font-size: 14pt;
                          line-height: 150%;
                          font-family: '微软雅黑', sans-serif;
                          mso-bidi-font-family: 微软雅黑;
                        "
                        >（1）OLT断网触发条件</span
                      >
                    </p>
                    <p
                      class="MsoNormal"
                      align="left"
                      style="margin-left: 28.1pt; text-align: left; line-height: 150%"
                    >
                      <span
                        lang="EN-US"
                        style="
                          font-size: 14pt;
                          line-height: 150%;
                          font-family: '微软雅黑', sans-serif;
                          mso-bidi-font-family: 微软雅黑;
                        "
                      ></span>
                      <span
                        style="
                          font-size: 14pt;
                          line-height: 150%;
                          font-family: '微软雅黑', sans-serif;
                          mso-bidi-font-family: 微软雅黑;
                        "
                        >条件1：障碍产生了大面积拦截；</span
                      >
                    </p>
                    <p
                      class="MsoNormal"
                      align="left"
                      style="margin-left: 28.1pt; text-align: left; line-height: 150%"
                    >
                      <span
                        lang="EN-US"
                        style="
                          font-size: 14pt;
                          line-height: 150%;
                          font-family: '微软雅黑', sans-serif;
                          mso-bidi-font-family: 微软雅黑;
                        "
                      ></span>
                      <span
                        style="
                          font-size: 14pt;
                          line-height: 150%;
                          font-family: '微软雅黑', sans-serif;
                          mso-bidi-font-family: 微软雅黑;
                        "
                        >条件2：电子运维已派单；</span
                      >
                    </p>
                    <p
                      class="MsoNormal"
                      align="left"
                      style="margin-left: 28.1pt; text-align: left; line-height: 150%"
                    >
                      <span
                        lang="EN-US"
                        style="
                          font-size: 14pt;
                          line-height: 150%;
                          font-family: '微软雅黑', sans-serif;
                          mso-bidi-font-family: 微软雅黑;
                        "
                      ></span>
                      <span
                        style="
                          font-size: 14pt;
                          line-height: 150%;
                          font-family: '微软雅黑', sans-serif;
                          mso-bidi-font-family: 微软雅黑;
                        "
                        >条件3：OLT断网实际影响用户数量大于500户。</span
                      >
                    </p>
                  </div>
                </el-dialog>
              </div>
              <!-- 有线设备集中告障 -->
              <div v-else-if="selectScene.id == 2" slot="header">
                <span>运营指标</span>
                <el-tooltip content="说明" placement="right">
                  <img
                    src="../../assets/bigScreen/complaintanalysisNew/help-icon.png"
                    style="
                      vertical-align: middle;
                      margin-bottom: 4px;
                      margin-left: 2px;
                      width: 0.2rem;
                    "
                    @click="dialogTableVisible = true"
                  />
                </el-tooltip>
                <el-dialog :visible.sync="dialogTableVisible" width="40%">
                  <div style="height: 500px">
                    <p
                      class="MsoNormal"
                      align="left"
                      style="margin-left: 28.1pt; text-align: left; line-height: 150%"
                    >
                      <span
                        lang="EN-US"
                        style="
                          font-size: 14pt;
                          line-height: 150%;
                          font-family: '微软雅黑', sans-serif;
                          mso-bidi-font-family: 微软雅黑;
                        "
                      ></span>
                      <span
                        style="
                          font-size: 14pt;
                          line-height: 150%;
                          font-family: '微软雅黑', sans-serif;
                          mso-bidi-font-family: 微软雅黑;
                        "
                        >事件定义：按区域统计10分钟内申告故障用户数量环比历史增加是否超过30%；端到端诊断后故障问题派发4PS工单并送服务质量系统拦截，服务质量系统送BSR，需满足如下条件。</span
                      >
                    </p>
                    <p
                      class="MsoNormal"
                      align="left"
                      style="margin-left: 28.1pt; text-align: left; line-height: 150%"
                    >
                      <span
                        lang="EN-US"
                        style="
                          font-size: 14pt;
                          line-height: 150%;
                          font-family: '微软雅黑', sans-serif;
                          mso-bidi-font-family: 微软雅黑;
                        "
                      ></span>
                      <span
                        style="
                          font-size: 14pt;
                          line-height: 150%;
                          font-family: '微软雅黑', sans-serif;
                          mso-bidi-font-family: 微软雅黑;
                        "
                        >（1）PON口收无光触发条件</span
                      >
                    </p>
                    <p
                      class="MsoNormal"
                      align="left"
                      style="margin-left: 28.1pt; text-align: left; line-height: 150%"
                    >
                      <span
                        lang="EN-US"
                        style="
                          font-size: 14pt;
                          line-height: 150%;
                          font-family: '微软雅黑', sans-serif;
                          mso-bidi-font-family: 微软雅黑;
                        "
                      ></span>
                      <span
                        style="
                          font-size: 14pt;
                          line-height: 150%;
                          font-family: '微软雅黑', sans-serif;
                          mso-bidi-font-family: 微软雅黑;
                        "
                        >条件1：障碍产生了大面积拦截；</span
                      >
                    </p>
                    <p
                      class="MsoNormal"
                      align="left"
                      style="margin-left: 28.1pt; text-align: left; line-height: 150%"
                    >
                      <span
                        lang="EN-US"
                        style="
                          font-size: 14pt;
                          line-height: 150%;
                          font-family: '微软雅黑', sans-serif;
                          mso-bidi-font-family: 微软雅黑;
                        "
                      ></span>
                      <span
                        style="
                          font-size: 14pt;
                          line-height: 150%;
                          font-family: '微软雅黑', sans-serif;
                          mso-bidi-font-family: 微软雅黑;
                        "
                        >条件2：电子运维已派单；</span
                      >
                    </p>
                    <p
                      class="MsoNormal"
                      align="left"
                      style="margin-left: 28.1pt; text-align: left; line-height: 150%"
                    >
                      <span
                        lang="EN-US"
                        style="
                          font-size: 14pt;
                          line-height: 150%;
                          font-family: '微软雅黑', sans-serif;
                          mso-bidi-font-family: 微软雅黑;
                        "
                      ></span>
                      <span
                        style="
                          font-size: 14pt;
                          line-height: 150%;
                          font-family: '微软雅黑', sans-serif;
                          mso-bidi-font-family: 微软雅黑;
                        "
                        >条件3：PON口收无光实际影响用户数量大于20户。</span
                      >
                    </p>
                    <p
                      class="MsoNormal"
                      align="left"
                      style="margin-left: 28.1pt; text-align: left; line-height: 150%"
                    >
                      <span
                        lang="EN-US"
                        style="
                          font-size: 14pt;
                          line-height: 150%;
                          font-family: '微软雅黑', sans-serif;
                          mso-bidi-font-family: 微软雅黑;
                        "
                      ></span>
                      <span
                        style="
                          font-size: 14pt;
                          line-height: 150%;
                          font-family: '微软雅黑', sans-serif;
                          mso-bidi-font-family: 微软雅黑;
                        "
                        >（2）二级分管器断触发条件</span
                      >
                    </p>
                    <p
                      class="MsoNormal"
                      align="left"
                      style="margin-left: 28.1pt; text-align: left; line-height: 150%"
                    >
                      <span
                        lang="EN-US"
                        style="
                          font-size: 14pt;
                          line-height: 150%;
                          font-family: '微软雅黑', sans-serif;
                          mso-bidi-font-family: 微软雅黑;
                        "
                      ></span>
                      <span
                        style="
                          font-size: 14pt;
                          line-height: 150%;
                          font-family: '微软雅黑', sans-serif;
                          mso-bidi-font-family: 微软雅黑;
                        "
                        >条件1：障碍产生了大面积拦截；</span
                      >
                    </p>
                    <p
                      class="MsoNormal"
                      align="left"
                      style="margin-left: 28.1pt; text-align: left; line-height: 150%"
                    >
                      <span
                        lang="EN-US"
                        style="
                          font-size: 14pt;
                          line-height: 150%;
                          font-family: '微软雅黑', sans-serif;
                          mso-bidi-font-family: 微软雅黑;
                        "
                      ></span>
                      <span
                        style="
                          font-size: 14pt;
                          line-height: 150%;
                          font-family: '微软雅黑', sans-serif;
                          mso-bidi-font-family: 微软雅黑;
                        "
                        >条件2：电子运维已派单；</span
                      >
                    </p>
                    <p
                      class="MsoNormal"
                      align="left"
                      style="margin-left: 28.1pt; text-align: left; line-height: 150%"
                    >
                      <span
                        lang="EN-US"
                        style="
                          font-size: 14pt;
                          line-height: 150%;
                          font-family: '微软雅黑', sans-serif;
                          mso-bidi-font-family: 微软雅黑;
                        "
                      ></span>
                      <span
                        style="
                          font-size: 14pt;
                          line-height: 150%;
                          font-family: '微软雅黑', sans-serif;
                          mso-bidi-font-family: 微软雅黑;
                        "
                        >条件3：二级分管器断实际影响用户数量大于6户。</span
                      >
                    </p>
                  </div>
                </el-dialog>
              </div>
              <!-- 无线客户说了算 -->
              <div v-else-if="selectScene.id == 14" slot="header">
                <span>运营指标</span>
                <el-tooltip content="说明" placement="right">
                  <img
                    src="../../assets/bigScreen/complaintanalysisNew/help-icon.png"
                    style="
                      vertical-align: middle;
                      margin-bottom: 4px;
                      margin-left: 2px;
                      width: 0.2rem;
                    "
                    @click="dialogTableVisible = true"
                  />
                </el-tooltip>
                <el-dialog :visible.sync="dialogTableVisible" width="40%">
                  <div style="height: 500px">
                    <p
                      class="MsoNormal"
                      align="left"
                      style="margin-left: 28.1pt; text-align: left; line-height: 150%"
                    >
                      <span
                        lang="EN-US"
                        style="
                          font-size: 14pt;
                          line-height: 150%;
                          font-family: '微软雅黑', sans-serif;
                          mso-bidi-font-family: 微软雅黑;
                        "
                      ></span>
                      <span
                        style="
                          font-size: 14pt;
                          line-height: 150%;
                          font-family: '微软雅黑', sans-serif;
                          mso-bidi-font-family: 微软雅黑;
                        "
                        >事件定义：来自于电小二、电信小店、企业微信代客报障功能的无线问题上报，派发电子运维工单，无线优化人员上门处理，处理完成后人工回访处理情况，监控中心全流程跟踪展示；</span
                      >
                    </p>
                    <p
                      class="MsoNormal"
                      align="left"
                      style="margin-left: 28.1pt; text-align: left; line-height: 150%"
                    >
                      <span
                        lang="EN-US"
                        style="
                          font-size: 14pt;
                          line-height: 150%;
                          font-family: '微软雅黑', sans-serif;
                          mso-bidi-font-family: 微软雅黑;
                        "
                      ></span>
                      <span
                        style="
                          font-size: 14pt;
                          line-height: 150%;
                          font-family: '微软雅黑', sans-serif;
                          mso-bidi-font-family: 微软雅黑;
                        "
                        >工单结果展示：展示代客报障当月数据；</span
                      >
                    </p>
                    <p
                      class="MsoNormal"
                      align="left"
                      style="margin-left: 28.1pt; text-align: left; line-height: 150%"
                    >
                      <span
                        lang="EN-US"
                        style="
                          font-size: 14pt;
                          line-height: 150%;
                          font-family: '微软雅黑', sans-serif;
                          mso-bidi-font-family: 微软雅黑;
                        "
                      ></span>
                      <span
                        style="
                          font-size: 14pt;
                          line-height: 150%;
                          font-family: '微软雅黑', sans-serif;
                          mso-bidi-font-family: 微软雅黑;
                        "
                        >发展促进效果展示TOP10：展示工单已完成小区数据，按宽带渗透率提升数据排列。</span
                      >
                    </p>
                  </div>
                </el-dialog>
              </div>
              <!-- 无线基站断站 -->
              <div v-else-if="selectScene.id == 4" slot="header">
                <span>运营指标</span>
                <el-tooltip content="说明" placement="right">
                  <img
                    src="../../assets/bigScreen/complaintanalysisNew/help-icon.png"
                    style="
                      vertical-align: middle;
                      margin-bottom: 4px;
                      margin-left: 2px;
                      width: 0.2rem;
                    "
                    @click="dialogTableVisible = true"
                  />
                </el-tooltip>
                <el-dialog :visible.sync="dialogTableVisible" width="40%">
                  <div style="height: 500px">
                    <p
                      class="MsoNormal"
                      align="left"
                      style="margin-left: 28.1pt; text-align: left; line-height: 150%"
                    >
                      <span
                        lang="EN-US"
                        style="
                          font-size: 14pt;
                          line-height: 150%;
                          font-family: '微软雅黑', sans-serif;
                          mso-bidi-font-family: 微软雅黑;
                        "
                      ></span>
                      <span
                        style="
                          font-size: 14pt;
                          line-height: 150%;
                          font-family: '微软雅黑', sans-serif;
                          mso-bidi-font-family: 微软雅黑;
                        "
                        >重要基站故障预警事件：获取综合告警系统推送的故障派单数据，匹配无线部提供的重要基站清单，生成重要基站故障预警事件，监控中心全流程跟踪展示；</span
                      >
                    </p>
                    <p
                      class="MsoNormal"
                      align="left"
                      style="margin-left: 28.1pt; text-align: left; line-height: 150%"
                    >
                      <span
                        lang="EN-US"
                        style="
                          font-size: 14pt;
                          line-height: 150%;
                          font-family: '微软雅黑', sans-serif;
                          mso-bidi-font-family: 微软雅黑;
                        "
                      ></span>
                      <span
                        style="
                          font-size: 14pt;
                          line-height: 150%;
                          font-family: '微软雅黑', sans-serif;
                          mso-bidi-font-family: 微软雅黑;
                        "
                        >不可抗力导致的基站断站广播提醒：分公司在端到端系统录，端到端诊断结果数据送BSR，BSR负责对外广播。</span
                      >
                    </p>
                  </div>
                </el-dialog>
              </div>
              <!-- 无线质差小区 -->
              <div v-else-if="selectScene.id == 5" slot="header">
                <span>运营指标</span>
                <el-tooltip content="说明" placement="right">
                  <img
                    src="../../assets/bigScreen/complaintanalysisNew/help-icon.png"
                    style="
                      vertical-align: middle;
                      margin-bottom: 4px;
                      margin-left: 2px;
                      width: 0.2rem;
                    "
                    @click="dialogTableVisible = true"
                  />
                </el-tooltip>
                <el-dialog :visible.sync="dialogTableVisible" width="40%">
                  <div style="height: 500px">
                    <p
                      class="MsoNormal"
                      align="left"
                      style="margin-left: 28.1pt; text-align: left; line-height: 150%"
                    >
                      <span
                        lang="EN-US"
                        style="
                          font-size: 14pt;
                          line-height: 150%;
                          font-family: '微软雅黑', sans-serif;
                          mso-bidi-font-family: 微软雅黑;
                        "
                      ></span>
                      <span
                        style="
                          font-size: 14pt;
                          line-height: 150%;
                          font-family: '微软雅黑', sans-serif;
                          mso-bidi-font-family: 微软雅黑;
                        "
                        >事件定义：继续按照2021年12月31日确定的原则（申告四次以上，质差率大于等于10%，小区影响度等三个维度），从2022年1月起，每月派单300个无线质差小区，所有工单监控中心全流程跟踪展示。</span
                      >
                    </p>
                  </div>
                </el-dialog>
              </div>
              <!-- 达量限速用户态势 -->
              <div v-else-if="selectScene.id == 6" slot="header">
                <span>运营指标</span>
                <el-tooltip content="说明" placement="right">
                  <img
                    src="../../assets/bigScreen/complaintanalysisNew/help-icon.png"
                    style="
                      vertical-align: middle;
                      margin-bottom: 4px;
                      margin-left: 2px;
                      width: 0.2rem;
                    "
                    @click="dialogTableVisible = true"
                  />
                </el-tooltip>
                <el-dialog :visible.sync="dialogTableVisible" width="40%">
                  <div style="height: 550px">
                    <p
                      class="MsoNormal"
                      align="left"
                      style="margin-left: 28.1pt; text-align: left; line-height: 150%"
                    >
                      <span
                        lang="EN-US"
                        style="
                          font-size: 14pt;
                          line-height: 150%;
                          font-family: '微软雅黑', sans-serif;
                          mso-bidi-font-family: 微软雅黑;
                        "
                      ></span>
                      <span
                        style="
                          font-size: 14pt;
                          line-height: 150%;
                          font-family: '微软雅黑', sans-serif;
                          mso-bidi-font-family: 微软雅黑;
                        "
                        >达量限速用户数（实时）：在网且（有过或者目前限速）的用户数；</span
                      >
                    </p>
                    <p
                      class="MsoNormal"
                      align="left"
                      style="margin-left: 28.1pt; text-align: left; line-height: 150%"
                    >
                      <span
                        lang="EN-US"
                        style="
                          font-size: 14pt;
                          line-height: 150%;
                          font-family: '微软雅黑', sans-serif;
                          mso-bidi-font-family: 微软雅黑;
                        "
                      ></span>
                      <span
                        style="
                          font-size: 14pt;
                          line-height: 150%;
                          font-family: '微软雅黑', sans-serif;
                          mso-bidi-font-family: 微软雅黑;
                        "
                        >达量限速用户数占比：达量限速用户数/C网用户数；</span
                      >
                    </p>
                    <p
                      class="MsoNormal"
                      align="left"
                      style="margin-left: 28.1pt; text-align: left; line-height: 150%"
                    >
                      <span
                        lang="EN-US"
                        style="
                          font-size: 14pt;
                          line-height: 150%;
                          font-family: '微软雅黑', sans-serif;
                          mso-bidi-font-family: 微软雅黑;
                        "
                      ></span>
                      <span
                        style="
                          font-size: 14pt;
                          line-height: 150%;
                          font-family: '微软雅黑', sans-serif;
                          mso-bidi-font-family: 微软雅黑;
                        "
                        >用户转化数：当月降速过且目前处于未减速状态的用户数量；</span
                      >
                    </p>
                    <p
                      class="MsoNormal"
                      align="left"
                      style="margin-left: 28.1pt; text-align: left; line-height: 150%"
                    >
                      <span
                        lang="EN-US"
                        style="
                          font-size: 14pt;
                          line-height: 150%;
                          font-family: '微软雅黑', sans-serif;
                          mso-bidi-font-family: 微软雅黑;
                        "
                      ></span>
                      <span
                        style="
                          font-size: 14pt;
                          line-height: 150%;
                          font-family: '微软雅黑', sans-serif;
                          mso-bidi-font-family: 微软雅黑;
                        "
                        >用户转化数占比：用户转化数/当月达量限速用户数；</span
                      >
                    </p>
                    <p
                      class="MsoNormal"
                      align="left"
                      style="margin-left: 28.1pt; text-align: left; line-height: 150%"
                    >
                      <span
                        lang="EN-US"
                        style="
                          font-size: 14pt;
                          line-height: 150%;
                          font-family: '微软雅黑', sans-serif;
                          mso-bidi-font-family: 微软雅黑;
                        "
                      ></span>
                      <span
                        style="
                          font-size: 14pt;
                          line-height: 150%;
                          font-family: '微软雅黑', sans-serif;
                          mso-bidi-font-family: 微软雅黑;
                        "
                        >1、达量降速统计（按天）清单：select T2.prod_inst_id, case when
                        T2.owe_business_type IN ('79', '81', '83') then 1 else 0 end as
                        USER_IS_SPEEDDOWD_D FROM (select target_serv_id as prod_inst_id,
                        owe_business_type, row_number() over(partition by target_serv_id
                        order by created_date desc) as RN from
                        hi_dwd_dc.DWD_CRT_C_STOP_OPEN_ITF_D where date_no_ =
                        ${DWD_CRT_C_STOP_OPEN_ITF_D} and owe_business_type IN ('79', '81',
                        '83', '88') and date_format(created_date, 'yyyyMMdd') >=
                        ${month_fd(DWD_CRT_C_STOP_OPEN_ITF_D) }) T2 WHERE T2.RN = 1;</span
                      >
                    </p>
                    <p
                      class="MsoNormal"
                      align="left"
                      style="margin-left: 28.1pt; text-align: left; line-height: 150%"
                    >
                      <span
                        lang="EN-US"
                        style="
                          font-size: 14pt;
                          line-height: 150%;
                          font-family: '微软雅黑', sans-serif;
                          mso-bidi-font-family: 微软雅黑;
                        "
                      ></span>
                      <span
                        style="
                          font-size: 14pt;
                          line-height: 150%;
                          font-family: '微软雅黑', sans-serif;
                          mso-bidi-font-family: 微软雅黑;
                        "
                        >【业务范围，c网；2、业务解释：用户当前是否降速，取用户最新一条数据的状态字段owe_business_type的值，判断是在'79','81','83'里面，是则当前为达量降速状态；】</span
                      >
                    </p>
                    <p
                      class="MsoNormal"
                      align="left"
                      style="margin-left: 28.1pt; text-align: left; line-height: 150%"
                    >
                      <span
                        lang="EN-US"
                        style="
                          font-size: 14pt;
                          line-height: 150%;
                          font-family: '微软雅黑', sans-serif;
                          mso-bidi-font-family: 微软雅黑;
                        "
                      ></span>
                      <span
                        style="
                          font-size: 14pt;
                          line-height: 150%;
                          font-family: '微软雅黑', sans-serif;
                          mso-bidi-font-family: 微软雅黑;
                        "
                        >2、USER_IS_SPEEDDOWD_D=0即为转化用户数；</span
                      >
                    </p>
                  </div>
                </el-dialog>
              </div>
              <!-- 流失预警 -->
              <div v-else-if="selectScene.id == 18" slot="header">
                <span>运营指标</span>
                <el-tooltip content="说明" placement="right">
                  <img
                    src="../../assets/bigScreen/complaintanalysisNew/help-icon.png"
                    style="
                      vertical-align: middle;
                      margin-bottom: 4px;
                      margin-left: 2px;
                      width: 0.2rem;
                    "
                    @click="dialogTableVisible = true"
                  />
                </el-tooltip>
                <el-dialog :visible.sync="dialogTableVisible" width="40%">
                  <div style="height: 500px">
                    <p
                      class="MsoNormal"
                      align="left"
                      style="margin-left: 28.1pt; text-align: left; line-height: 150%"
                    >
                      <span
                        lang="EN-US"
                        style="
                          font-size: 14pt;
                          line-height: 150%;
                          font-family: '微软雅黑', sans-serif;
                          mso-bidi-font-family: 微软雅黑;
                        "
                      ></span>
                      <span
                        style="
                          font-size: 14pt;
                          line-height: 150%;
                          font-family: '微软雅黑', sans-serif;
                          mso-bidi-font-family: 微软雅黑;
                        "
                        >预警频次：该区域被预警次数</span
                      >
                    </p>
                    <p
                      class="MsoNormal"
                      align="left"
                      style="margin-left: 28.1pt; text-align: left; line-height: 150%"
                    >
                      <span
                        lang="EN-US"
                        style="
                          font-size: 14pt;
                          line-height: 150%;
                          font-family: '微软雅黑', sans-serif;
                          mso-bidi-font-family: 微软雅黑;
                        "
                      ></span>
                      <span
                        style="
                          font-size: 14pt;
                          line-height: 150%;
                          font-family: '微软雅黑', sans-serif;
                          mso-bidi-font-family: 微软雅黑;
                        "
                        >预警用户数：该区域被预警用户数</span
                      >
                    </p>
                    <p
                      class="MsoNormal"
                      align="left"
                      style="margin-left: 28.1pt; text-align: left; line-height: 150%"
                    >
                      <span
                        lang="EN-US"
                        style="
                          font-size: 14pt;
                          line-height: 150%;
                          font-family: '微软雅黑', sans-serif;
                          mso-bidi-font-family: 微软雅黑;
                        "
                      ></span>
                      <span
                        style="
                          font-size: 14pt;
                          line-height: 150%;
                          font-family: '微软雅黑', sans-serif;
                          mso-bidi-font-family: 微软雅黑;
                        "
                        >皮线断预警：该区域皮线断预警用户数</span
                      >
                    </p>
                    <p
                      class="MsoNormal"
                      align="left"
                      style="margin-left: 28.1pt; text-align: left; line-height: 150%"
                    >
                      <span
                        lang="EN-US"
                        style="
                          font-size: 14pt;
                          line-height: 150%;
                          font-family: '微软雅黑', sans-serif;
                          mso-bidi-font-family: 微软雅黑;
                        "
                      ></span>
                      <span
                        style="
                          font-size: 14pt;
                          line-height: 150%;
                          font-family: '微软雅黑', sans-serif;
                          mso-bidi-font-family: 微软雅黑;
                        "
                        >主拆预警：该区域主拆预警用户数</span
                      >
                    </p>
                    <p
                      class="MsoNormal"
                      align="left"
                      style="margin-left: 28.1pt; text-align: left; line-height: 150%"
                    >
                      <span
                        lang="EN-US"
                        style="
                          font-size: 14pt;
                          line-height: 150%;
                          font-family: '微软雅黑', sans-serif;
                          mso-bidi-font-family: 微软雅黑;
                        "
                      ></span>
                      <span
                        style="
                          font-size: 14pt;
                          line-height: 150%;
                          font-family: '微软雅黑', sans-serif;
                          mso-bidi-font-family: 微软雅黑;
                        "
                        >分户预警：该区域分户预警用户数</span
                      >
                    </p>
                    <p
                      class="MsoNormal"
                      align="left"
                      style="margin-left: 28.1pt; text-align: left; line-height: 150%"
                    >
                      <span
                        lang="EN-US"
                        style="
                          font-size: 14pt;
                          line-height: 150%;
                          font-family: '微软雅黑', sans-serif;
                          mso-bidi-font-family: 微软雅黑;
                        "
                      ></span>
                      <span
                        style="
                          font-size: 14pt;
                          line-height: 150%;
                          font-family: '微软雅黑', sans-serif;
                          mso-bidi-font-family: 微软雅黑;
                        "
                        >申请XZ预警：该区域XZ申请用户数</span
                      >
                    </p>
                    <p
                      class="MsoNormal"
                      align="left"
                      style="margin-left: 28.1pt; text-align: left; line-height: 150%"
                    >
                      <span
                        lang="EN-US"
                        style="
                          font-size: 14pt;
                          line-height: 150%;
                          font-family: '微软雅黑', sans-serif;
                          mso-bidi-font-family: 微软雅黑;
                        "
                      ></span>
                      <span
                        style="
                          font-size: 14pt;
                          line-height: 150%;
                          font-family: '微软雅黑', sans-serif;
                          mso-bidi-font-family: 微软雅黑;
                        "
                        >月均流失率：该区域今年截止当月月均流失率</span
                      >
                    </p>
                  </div>
                </el-dialog>
              </div>
              <div v-else-if="selectScene.id == 15" slot="header">
                <span>运营指标</span>
                <el-tooltip content="说明" placement="right">
                  <img
                    src="../../assets/bigScreen/complaintanalysisNew/help-icon.png"
                    style="
                      vertical-align: middle;
                      margin-bottom: 4px;
                      margin-left: 2px;
                      width: 0.2rem;
                    "
                    @click="dialogTableVisible = true"
                  />
                </el-tooltip>
                <el-dialog :visible.sync="dialogTableVisible" width="40%">
                  <div style="height: 500px">
                    <p
                      class="MsoNormal"
                      align="center"
                      style="text-inde: center; line-height: 150%"
                    >
                      <b
                        ><span
                          style="
                            font-size: 14pt;
                            line-height: 150%;
                            font-family: '微软雅黑', sans-serif;
                            mso-bidi-font-family: 微软雅黑;
                          "
                          >“渠道商服务质量提升”说明<span lang="EN-US"></span></span
                      ></b>
                    </p>
                    <p
                      class="MsoNormal"
                      align="left"
                      style="margin-left: 28.1pt; text-align: left; line-height: 150%"
                    >
                      <span
                        lang="EN-US"
                        style="
                          font-size: 14pt;
                          line-height: 150%;
                          font-family: '微软雅黑', sans-serif;
                          mso-bidi-font-family: 微软雅黑;
                        "
                        >1</span
                      >
                      <span
                        style="
                          font-size: 14pt;
                          line-height: 150%;
                          font-family: '微软雅黑', sans-serif;
                          mso-bidi-font-family: 微软雅黑;
                        "
                        >、投诉判责量：投诉工单归档判责为实体营业厅的投诉量；</span
                      >
                    </p>
                    <p
                      class="MsoNormal"
                      align="left"
                      style="margin-left: 28.1pt; text-align: left; line-height: 150%"
                    >
                      <span
                        lang="EN-US"
                        style="
                          font-size: 14pt;
                          line-height: 150%;
                          font-family: '微软雅黑', sans-serif;
                          mso-bidi-font-family: 微软雅黑;
                        "
                        >2</span
                      >
                      <span
                        style="
                          font-size: 14pt;
                          line-height: 150%;
                          font-family: '微软雅黑', sans-serif;
                          mso-bidi-font-family: 微软雅黑;
                        "
                        >、渠道商服务质量提升未解决TOP10：投诉判责量同比超过50%即派单到厅店整改；</span
                      >
                    </p>
                    <p
                      class="MsoNormal"
                      align="left"
                      style="margin-left: 28.1pt; text-align: left; line-height: 150%"
                    >
                      <span
                        lang="EN-US"
                        style="
                          font-size: 14pt;
                          line-height: 150%;
                          font-family: '微软雅黑', sans-serif;
                          mso-bidi-font-family: 微软雅黑;
                        "
                        >3</span
                      >
                      <span
                        style="
                          font-size: 14pt;
                          line-height: 150%;
                          font-family: '微软雅黑', sans-serif;
                          mso-bidi-font-family: 微软雅黑;
                        "
                        >、厅店优良差：①投诉同比＜100%②稽核差错率＜3%③测评满意率≥96%，</span
                      >
                    </p>
                    <p
                      class="MsoNormal"
                      align="left"
                      style="margin-left: 28.1pt; text-align: left; line-height: 150%"
                    >
                      <span
                        lang="EN-US"
                        style="
                          font-size: 14pt;
                          line-height: 150%;
                          font-family: '微软雅黑', sans-serif;
                          mso-bidi-font-family: 微软雅黑;
                        "
                      ></span>
                      <span
                        style="
                          font-size: 14pt;
                          line-height: 150%;
                          font-family: '微软雅黑', sans-serif;
                          mso-bidi-font-family: 微软雅黑;
                        "
                        >优：3项指标都满足且3项指标排名皆为全省前30%；</span
                      >
                    </p>
                    <p
                      class="MsoNormal"
                      align="left"
                      style="margin-left: 28.1pt; text-align: left; line-height: 150%"
                    >
                      <span
                        lang="EN-US"
                        style="
                          font-size: 14pt;
                          line-height: 150%;
                          font-family: '微软雅黑', sans-serif;
                          mso-bidi-font-family: 微软雅黑;
                        "
                      ></span>
                      <span
                        style="
                          font-size: 14pt;
                          line-height: 150%;
                          font-family: '微软雅黑', sans-serif;
                          mso-bidi-font-family: 微软雅黑;
                        "
                        >良：除“差”“优”之外都为良；</span
                      >
                    </p>
                    <p
                      class="MsoNormal"
                      align="left"
                      style="margin-left: 28.1pt; text-align: left; line-height: 150%"
                    >
                      <span
                        lang="EN-US"
                        style="
                          font-size: 14pt;
                          line-height: 150%;
                          font-family: '微软雅黑', sans-serif;
                          mso-bidi-font-family: 微软雅黑;
                        "
                      ></span>
                      <span
                        style="
                          font-size: 14pt;
                          line-height: 150%;
                          font-family: '微软雅黑', sans-serif;
                          mso-bidi-font-family: 微软雅黑;
                        "
                        >差：有1项指标不满足即为厅店评分为差；</span
                      >
                    </p>
                  </div>
                </el-dialog>
              </div>
              <div v-else-if="selectScene.id == 22" slot="header">
                <div class="header-content">
                  <div class="carry-title">
                    <span>运营指标</span>
                    <el-tooltip content="说明" placement="right">
                      <img
                        src="../../assets/bigScreen/complaintanalysisNew/help-icon.png"
                        style="
                          vertical-align: middle;
                          margin-bottom: 4px;
                          margin-left: 2px;
                          width: 0.2rem;
                        "
                        @click="dialogTableVisible = true"
                      />
                    </el-tooltip>
                    <el-dialog :visible.sync="dialogTableVisible" width="40%">
                      <div style="height: 500px">
                        <p
                          class="MsoNormal"
                          align="center"
                          style="text-inde: center; line-height: 150%"
                        >
                          <b
                            ><span
                              style="
                                font-size: 14pt;
                                line-height: 150%;
                                font-family: '微软雅黑', sans-serif;
                                mso-bidi-font-family: 微软雅黑;
                              "
                              >“携转服务场景”说明<span lang="EN-US"></span></span
                          ></b>
                        </p>
                        <p
                          class="MsoNormal"
                          align="left"
                          style="margin-left: 28.1pt; text-align: left; line-height: 150%"
                        >
                          <span
                            lang="EN-US"
                            style="
                              font-size: 14pt;
                              line-height: 150%;
                              font-family: '微软雅黑', sans-serif;
                              mso-bidi-font-family: 微软雅黑;
                            "
                            >1</span
                          >
                          <span
                            style="
                              font-size: 14pt;
                              line-height: 150%;
                              font-family: '微软雅黑', sans-serif;
                              mso-bidi-font-family: 微软雅黑;
                            "
                            >、投诉判责量：投诉工单归档判责为实体营业厅的投诉量；</span
                          >
                        </p>
                        <p
                          class="MsoNormal"
                          align="left"
                          style="margin-left: 28.1pt; text-align: left; line-height: 150%"
                        >
                          <span
                            lang="EN-US"
                            style="
                              font-size: 14pt;
                              line-height: 150%;
                              font-family: '微软雅黑', sans-serif;
                              mso-bidi-font-family: 微软雅黑;
                            "
                            >2</span
                          >
                          <span
                            style="
                              font-size: 14pt;
                              line-height: 150%;
                              font-family: '微软雅黑', sans-serif;
                              mso-bidi-font-family: 微软雅黑;
                            "
                            >、渠道商服务质量提升未解决TOP10：投诉判责量同比超过50%即派单到厅店整改；</span
                          >
                        </p>
                        <p
                          class="MsoNormal"
                          align="left"
                          style="margin-left: 28.1pt; text-align: left; line-height: 150%"
                        >
                          <span
                            lang="EN-US"
                            style="
                              font-size: 14pt;
                              line-height: 150%;
                              font-family: '微软雅黑', sans-serif;
                              mso-bidi-font-family: 微软雅黑;
                            "
                            >3</span
                          >
                          <span
                            style="
                              font-size: 14pt;
                              line-height: 150%;
                              font-family: '微软雅黑', sans-serif;
                              mso-bidi-font-family: 微软雅黑;
                            "
                            >、厅店优良差：①投诉同比＜100%②稽核差错率＜3%③测评满意率≥96%，</span
                          >
                        </p>
                        <p
                          class="MsoNormal"
                          align="left"
                          style="margin-left: 28.1pt; text-align: left; line-height: 150%"
                        >
                          <span
                            lang="EN-US"
                            style="
                              font-size: 14pt;
                              line-height: 150%;
                              font-family: '微软雅黑', sans-serif;
                              mso-bidi-font-family: 微软雅黑;
                            "
                          ></span>
                          <span
                            style="
                              font-size: 14pt;
                              line-height: 150%;
                              font-family: '微软雅黑', sans-serif;
                              mso-bidi-font-family: 微软雅黑;
                            "
                            >优：3项指标都满足且3项指标排名皆为全省前30%；</span
                          >
                        </p>
                        <p
                          class="MsoNormal"
                          align="left"
                          style="margin-left: 28.1pt; text-align: left; line-height: 150%"
                        >
                          <span
                            lang="EN-US"
                            style="
                              font-size: 14pt;
                              line-height: 150%;
                              font-family: '微软雅黑', sans-serif;
                              mso-bidi-font-family: 微软雅黑;
                            "
                          ></span>
                          <span
                            style="
                              font-size: 14pt;
                              line-height: 150%;
                              font-family: '微软雅黑', sans-serif;
                              mso-bidi-font-family: 微软雅黑;
                            "
                            >良：除“差”“优”之外都为良；</span
                          >
                        </p>
                        <p
                          class="MsoNormal"
                          align="left"
                          style="margin-left: 28.1pt; text-align: left; line-height: 150%"
                        >
                          <span
                            lang="EN-US"
                            style="
                              font-size: 14pt;
                              line-height: 150%;
                              font-family: '微软雅黑', sans-serif;
                              mso-bidi-font-family: 微软雅黑;
                            "
                          ></span>
                          <span
                            style="
                              font-size: 14pt;
                              line-height: 150%;
                              font-family: '微软雅黑', sans-serif;
                              mso-bidi-font-family: 微软雅黑;
                            "
                            >差：有1项指标不满足即为厅店评分为差；</span
                          >
                        </p>
                      </div>
                    </el-dialog>
                  </div>
                  <div class="btm-group">
                    <el-radio-group
                      v-model="targetVal"
                      size="mini"
                      @input="radioGroupChange"
                    >
                      <el-radio-button
                        v-for="(itemTar, indexTar) in carryList"
                        :label="itemTar.label"
                        :key="itemTar.value"
                      ></el-radio-button>
                    </el-radio-group>
                  </div>
                </div>
              </div>
              <div v-else slot="header">
                <span>运营指标</span>
              </div>

              <!--    左侧 start      -->
              <div
                v-if="selectScene.id == 13"
                class="businessTarget fangkuaiForCantClick"
                style="line-height: 33px"
              >
                <!-- <span class="spanstyleTitle" v-if="orderType==1">当月活动数:{{selectScene.colum_4}}</span>
                  <span class="spanstyleTitle" v-if="orderType==1">在途活动数:{{selectScene.colum_6}}</span> -->
                <span class="spanstyleTitle" v-if="orderType == 1 || orderType == 3"
                  >当月工单量:{{
                    orderType == 1 ? selectScene.colum_7 : selectScene.colum_11
                  }}</span
                >
                <span class="spanstyleTitle" v-if="orderType == 1 || orderType == 3"
                  >完成率:{{
                    (orderType == 1 ? selectScene.colum_8 : selectScene.colum_12) + "%"
                  }}</span
                >
                <span class="spanstyleTitle" v-if="orderType == 2"
                  >IPTV受理工单量:{{ selectScene.colum_15 }}</span
                >
                <span class="spanstyleTitle" v-if="orderType == 2"
                  >i视受理工单量:{{ selectScene.colum_17 }}</span
                >
              </div>
              <div
                v-else-if="selectScene.id == 14"
                class="businessTarget fangkuaiForCantClick"
              >
                <span class="spanstyleTitle">在途工单量:{{ selectScene.colum_4 }}</span>
                <span class="spanstyleTitle"
                  >平均回访解决率:{{ selectScene.colum_5 + "%" }}</span
                >
                <span class="spanstyleTitle">问题池工单量:0</span>
              </div>
              <div
                v-else-if="selectScene.id == 15"
                class="businessTarget fangkuaiForCantClick"
                style="line-height: 33px"
              >
                <span class="spanstyleTitle"
                  >稽核差错率:{{ selectScene.huanbi + "%" }}</span
                >
                <span class="spanstyleTitle"
                  >测评满意率:{{ selectScene.huanbi_2 + "%" }}</span
                >
              </div>
              <div
                v-else-if="selectScene.id == 22"
                class="businessTarget fangkuaiForCantClick"
                style="line-height: 33px"
              >
                <span class="spanstyleTitle">预警量(日):{{ selectScene.huanbi }}</span>
                <span class="spanstyleValue"
                  >日环比<i
                    :style="{ color: selectScene.huanbi >= 0 ? 'red' : 'rgb(0 255 197)' }"
                    :class="selectScene.huanbi < 0 ? 'el-icon-bottom' : 'el-icon-top'"
                  ></i>
                  {{ Math.abs(selectScene.huanbi) + "，  月同比" }}
                  <i
                    :style="{ color: selectScene.huanbi >= 0 ? 'red' : 'rgb(0 255 197)' }"
                    :class="selectScene.huanbi < 0 ? 'el-icon-bottom' : 'el-icon-top'"
                  ></i>
                  {{ Math.abs(selectScene.huanbi) + "%" }}</span
                >
              </div>
              <div
                v-else-if="selectScene.id == 18"
                class="businessTarget fangkuaiForCantClick"
                style="line-height: 66px"
              >
                <span class="spanstyleTitle">预警用户数:{{ selectScene.huanbi_2 }}</span>
              </div>
              <div
                v-else-if="selectScene.id == 19"
                class="businessTarget fangkuaiForCantClick"
                style="line-height: 66px"
              >
                <span class="spanstyleTitle"
                  >平均处理时长:{{ selectScene.huanbi_2.toFixed(2) }}</span
                >
              </div>
              <div v-else class="businessTarget fangkuaiForCantClick">
                <span class="spanstyleTitle">{{ youxianObj.name }}</span>
                <span class="spanstyleValueNumber">{{ youxianObj.totalNum + "%" }}</span>
                <span class="spanstyleValue"
                  >月{{
                    (youxianObj.monthAdd >= 0 ? "新增  " : "下降  ") +
                    Math.abs(youxianObj.monthAdd) +
                    "，  月环比"
                  }}
                  <i
                    :style="{ color: youxianObj.huanbi >= 0 ? 'red' : 'rgb(0 255 197)' }"
                    :class="youxianObj.huanbi < 0 ? 'el-icon-bottom' : 'el-icon-top'"
                  ></i>
                  {{ Math.abs(youxianObj.huanbi) + "%" }}</span
                >
              </div>
              <!--    左侧 end      -->
              <!--    右侧 start      -->
              <div
                v-if="selectScene.id == 13"
                class="businessTarget fangkuaiForCantClick"
                :style="
                  orderType == 2 || orderType == 4
                    ? 'line-height: 66px;'
                    : 'line-height: 33px;'
                "
              >
                <!-- <span class="spanstyleTitle" v-if="orderType==1">修复满意率:{{selectScene.colum_5}}%</span> -->
                <span class="spanstyleTitle" v-if="orderType == 1 || orderType == 3"
                  >在途工单量:{{
                    orderType == 1 ? selectScene.colum_9 : selectScene.colum_13
                  }}</span
                >
                <span class="spanstyleTitle" v-if="orderType == 1 || orderType == 3"
                  >满意率:{{
                    (orderType == 1 ? selectScene.colum_10 : selectScene.colum_14) + "%"
                  }}</span
                >
                <span class="spanstyleTitle" v-if="orderType == 2"
                  >魔镜受理工单量:{{ selectScene.colum_16 }}</span
                >
              </div>
              <div
                v-else-if="selectScene.id == 14"
                class="businessTarget fangkuaiForCantClick"
                style="line-height: 33px"
              >
                <span class="spanstyleTitle">本月派单量:{{ selectScene.huanbi }}</span>
                <span class="spanstyleTitle"
                  >工单平均处理时长:{{ selectScene.huanbi_2 }}</span
                >
              </div>
              <div
                v-else-if="selectScene.id == 15"
                class="businessTarget fangkuaiForCantClick"
                style="line-height: 33px"
              >
                <span class="spanstyleTitle"
                  >投诉同比:{{ selectScene.colum_4 + "%" }}</span
                >
                <span class="spanstyleTitle"
                  >投诉环比:{{ selectScene.colum_5 + "%" }}</span
                >
              </div>
              <div
                v-else-if="selectScene.id == 22"
                class="businessTarget fangkuaiForCantClick"
                style="line-height: 33px"
              >
                <span class="spanstyleTitle">处理率(月):{{ selectScene.huanbi }}%</span>
                <span class="spanstyleValue"
                  >处理量(日):{{ selectScene.huanbi }}，处理量(月):{{
                    selectScene.huanbi
                  }}</span
                >
              </div>
              <div
                v-else-if="selectScene.id == 18"
                class="businessTarget fangkuaiForCantClick"
                style="line-height: 66px"
              >
                <span class="spanstyleTitle"
                  >月均流失率:{{ selectScene.colum_4.toFixed(2) + "%" }}</span
                >
              </div>
              <div
                v-else-if="selectScene.id == 19"
                class="businessTarget fangkuaiForCantClick"
                style="line-height: 66px"
              >
                <span class="spanstyleTitle"
                  >挽留成功率:{{ selectScene.colum_4.toFixed(2) + "%" }}</span
                >
              </div>
              <div v-else class="businessTarget fangkuaiForCantClick">
                <span class="spanstyleTitle">{{ wuxianObj.name }}</span>
                <span class="spanstyleValueNumber">{{ wuxianObj.totalNum + "%" }}</span>
                <span class="spanstyleValue"
                  >月{{
                    (wuxianObj.monthAdd >= 0 ? "新增  " : "下降  ") +
                    Math.abs(wuxianObj.monthAdd) +
                    "，  月环比"
                  }}
                  <i
                    :style="{ color: wuxianObj.huanbi >= 0 ? 'red' : 'rgb(0 255 197)' }"
                    :class="wuxianObj.huanbi < 0 ? 'el-icon-bottom' : 'el-icon-top'"
                  ></i>
                  {{ Math.abs(wuxianObj.huanbi) + "%" }}</span
                >
              </div>
              <!--    右侧 end      -->
            </el-card>

            <el-card :class="mainPosition == 1 ? 'foot-top' : 'foot-top-2'">
              <div slot="header">
                <span v-if="selectScene.id == 6">达量限速用户态势</span>
                <span v-else-if="selectScene.id == 11">设备重障TOP10(近30天)</span>
                <span v-else-if="selectScene.id == 13 || selectScene.id == 14"
                  >工单结果展示<i style="color: grey">（“-”：暂无数据）</i></span
                >
                <span v-else-if="selectScene.id == 18 || selectScene.id == 19"
                  >{{ selectScene.name }}报表（月）</span
                >
                <span v-else-if="selectScene.id == 22">携转服务场景预警</span>
                <span v-else
                  >{{
                    selectScene.name == "暂无指标" ? "" : selectScene.name
                  }}未解决TOP10</span
                >
                <span
                  @click="gotoDownLoad('upTable')"
                  v-if="selectScene.id == 13 || selectScene.id == 14"
                  class="downloadStyle"
                  style="line-height: unset"
                  >报表下载</span
                >
                <span
                  @click="gotoDownLoad('upTable')"
                  v-else-if="selectScene.id == 18 || selectScene.id == 19"
                  class="downloadStyle"
                  style="line-height: unset"
                  >报表详情</span
                >
                <span
                  @click="gotoDownLoad('upTable')"
                  v-else-if="downloadUrlName[selectScene.id] && selectScene.id != 15"
                  class="downloadStyle"
                  style="line-height: unset"
                  >清单下载</span
                >
                <el-radio-group
                  v-model="orderType"
                  v-if="selectScene.id == 13"
                  size="mini"
                  style="float: right"
                >
                  <!--
                    <el-radio-button label="1">营销派单</el-radio-button>
                    -->
                  <el-radio-button label="1">代客报障</el-radio-button>
                  <el-radio-button label="2">后向支撑</el-radio-button>
                  <el-radio-button label="3">主动修复</el-radio-button>
                </el-radio-group>
                <!--
                  <el-radio-group v-model="orderType" v-if="selectScene.id==14" size="mini" style="float: right;">
                    <el-radio-button label="1">营销派单</el-radio-button>
                    <el-radio-button label="2">代客报障</el-radio-button>
                  </el-radio-group>
                   -->
                <div
                  v-if="selectScene.id == 19"
                  style="display: contents"
                  class="goldServiceTypeDiv"
                >
                  <el-radio-group
                    v-model="goldServiceType.otherType"
                    size="mini"
                    style="float: right; margin-right: 10px"
                  >
                    <el-radio-button label="158894">万号预警</el-radio-button>
                    <el-radio-button label="158895">电渠降档</el-radio-button>
                  </el-radio-group>
                  <el-select
                    v-model="goldServiceType.singleCType"
                    placeholder="单C"
                    style="float: right; width: 80px"
                    @change="change($event, 'singleC')"
                  >
                    <el-option label="主拆" value="1148284"></el-option>
                    <el-option label="降档" value="148525"></el-option>
                    <el-option label="携转" value="1146208"></el-option>
                  </el-select>
                  <el-select
                    v-model="goldServiceType.fuseType"
                    placeholder="融合"
                    style="float: right; width: 80px"
                    @change="change($event, 'fuse')"
                  >
                    <el-option label="主拆" value="147584"></el-option>
                    <el-option label="分户" value="1003078"></el-option>
                    <el-option label="降档" value="148525"></el-option>
                    <el-option label="携转" value="162754"></el-option>
                  </el-select>
                  <el-select
                    v-model="goldServiceType.totalType"
                    placeholder="合计"
                    style="float: right; width: 80px"
                    @change="change($event, 'total')"
                  >
                    <el-option
                      label="融合"
                      value="147584,1003078,148525,162754"
                    ></el-option>
                    <el-option label="单C" value="1148284,148525,1146208"></el-option>
                  </el-select>
                </div>
              </div>
              <!--<BarTemp v-if="selectScene.id=='6'" v-loading="barMap.daliangxiansu.barLoading" :barData="barMap.daliangxiansu.barData" :recordQueryBarRest="recordQueryBarRest" typeFlag="daliangxiansu"></BarTemp>-->
              <LineBarTemp
                v-if="selectScene.id == '6'"
                v-loading="lineMap.daliangxiansuyj.lineLoading"
                :lineData="lineMap.daliangxiansuyj.lineData"
              ></LineBarTemp>
              <TableTemp
                v-else-if="selectScene.id == '11'"
                v-loading="talbeMap.shebei.tableLoading"
                :controlOption="talbeMap.shebei.tableData"
              ></TableTemp>
              <TableTemp
                v-else-if="selectScene.id == '13'"
                v-loading="talbeMap.huifang_yx.tableLoading"
                :controlOption="talbeMap.huifang_yx.tableData"
              ></TableTemp>
              <TableTemp
                v-else-if="selectScene.id == '14'"
                v-loading="talbeMap.huifang_wx.tableLoading"
                :controlOption="talbeMap.huifang_wx.tableData"
              ></TableTemp>
              <TableTemp
                v-else-if="selectScene.id == '15'"
                v-loading="talbeMap.qdsfwzl.tableLoading"
                :controlOption="talbeMap.qdsfwzl.tableData"
              ></TableTemp>
              <TableTemp
                v-else-if="selectScene.id == '22'"
                v-loading="xzfwcj.tableLoading"
                :controlOption="xzfwcj.tableData"
              ></TableTemp>
              <TableTemp
                v-else-if="selectScene.id == '18'"
                v-loading="talbeMap.quyu_baobiao.tableLoading"
                :controlOption="talbeMap.quyu_baobiao.tableData"
              ></TableTemp>
              <TableTemp
                v-else-if="selectScene.id == '19'"
                v-loading="talbeMap.jinpai_baobiao.tableLoading"
                :controlOption="talbeMap.jinpai_baobiao.tableData"
              ></TableTemp>
              <TableTemp
                v-else
                v-loading="tableLoading"
                :controlOption="tableData"
              ></TableTemp>
            </el-card>
            <el-card
              :class="mainPosition == 1 ? 'foot-bottom' : 'foot-bottom-2'"
              v-if="mainPosition != 1"
            >
              <div slot="header">
                <span v-if="selectScene.id == 6">达量限速用户转化分析</span>
                <span v-else-if="selectScene.id == 11">包区重障TOP10(上周)</span>
                <span v-else-if="selectScene.id == 13">营销派单效果展示TOP10</span>
                <span v-else-if="selectScene.id == 14">发展促进效果展示TOP10</span>
                <span v-else-if="selectScene.id == 15">厅店优良差（月）</span>
                <div v-else-if="selectScene.id == 22">
                  <div class="header-content">
                    <span>携转服务场景预警量top10</span>
                    <div class="btm-group">
                      <el-radio-group
                        v-model="serviceTop10Val"
                        size="mini"
                        @input="serviceTop10Change"
                      >
                        <el-radio-button
                          v-for="(itemTar, indexTar) in serviceTop10List"
                          :label="itemTar.label"
                          :key="itemTar.value"
                        ></el-radio-button>
                      </el-radio-group>
                    </div>
                  </div>
                </div>
                <span v-else-if="selectScene.id == 18 || selectScene.id == 19"
                  >{{ selectScene.name }}清单</span
                >
                <span v-else
                  >{{
                    selectScene.name == "暂无指标" ? "" : selectScene.name
                  }}历史对比</span
                >
                <span
                  @click="gotoDownLoad('downTable')"
                  v-if="selectScene.id == 13"
                  class="downloadStyle"
                  style="line-height: unset"
                  >报表下载</span
                >
                <span
                  @click="gotoDownLoad('downTable')"
                  v-if="selectScene.id == 18 || selectScene.id == 19"
                  class="downloadStyle"
                  style="line-height: unset"
                  >清单详情</span
                >
                <span
                  @click="gotoDownLoad('downTable')"
                  v-if="selectScene.id == 15"
                  class="downloadStyle"
                  style="line-height: unset"
                  >清单下载</span
                >
              </div>
              <Barchart
                v-if="selectScene.id == '22'"
                :chartData="serviceTop10Chart"
              ></Barchart>
              <!--<BarTemp v-if="selectScene.id=='6'" v-loading="barMap.daliangxiansu_month.barLoading" :barData="barMap.daliangxiansu_month.barData" :recordQueryBarRest="recordQueryBarRest" typeFlag="daliangxiansu_month"></BarTemp>-->
              <LineBarTemp
                v-if="selectScene.id == '6'"
                v-loading="lineMap.daliangxiansuyhs.lineLoading"
                :lineData="lineMap.daliangxiansuyhs.lineData"
              ></LineBarTemp>
              <TableTempForRealSpe
                v-else-if="selectScene.id == '11'"
                v-loading="talbeMap.baoqu.tableLoading"
                :controlOption="talbeMap.baoqu.tableData"
              ></TableTempForRealSpe>
              <!--13 和14 的参数这里没有新建若要实现功能须在tableMap新增对应数据-->
              <TableTemp
                v-else-if="selectScene.id == '13'"
                v-loading="talbeMap.yingxiao_yx.tableLoading"
                :controlOption="talbeMap.yingxiao_yx.tableData"
              ></TableTemp>
              <TableTemp
                v-else-if="selectScene.id == '14'"
                v-loading="talbeMap.yingxiao_wx.tableLoading"
                :controlOption="talbeMap.yingxiao_wx.tableData"
              ></TableTemp>
              <!--              <LineBarTemp v-else-if="selectScene.id=='15'" v-loading="lineMap.daliangxiansuyhs.lineLoading" :lineData="lineMap.daliangxiansuyhs.lineData"></LineBarTemp>-->
              <BarTemp
                v-else-if="selectScene.id == '15'"
                v-loading="barMap.goodGeneBad_month.barLoading"
                :barData="barMap.goodGeneBad_month.barData"
              ></BarTemp>
              <TableTemp
                v-else-if="selectScene.id == '18'"
                v-loading="talbeMap.quyu_qingdan.tableLoading"
                :controlOption="talbeMap.quyu_qingdan.tableData"
              ></TableTemp>
              <TableTemp
                v-else-if="selectScene.id == '19'"
                v-loading="talbeMap.jinpai_qingdan.tableLoading"
                :controlOption="talbeMap.jinpai_qingdan.tableData"
              ></TableTemp>
              <LineBarTemp
                v-else
                v-loading="lineLoading"
                :lineData="lineData"
              ></LineBarTemp>
            </el-card>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple-light">
            <el-card :class="mainPosition == 1 ? 'foot-left' : 'foot-left-2'">
              <div slot="header">
                <span v-if="selectScene.id == 6">达量限速用户区域分布</span>
                <span v-if="selectScene.id == 11">包区重障分布图(上周)</span>
                <span v-if="selectScene.id != 6 && selectScene.id != 11"
                  >{{
                    selectScene.name == "暂无指标" ? "" : selectScene.name
                  }}热力图</span
                >
              </div>
              <div>
                <div
                  class="gobackdiv"
                  :style="{
                    cursor:
                      leveMapDown > 1 && this.$store.getters.orgId == '1'
                        ? 'pointer'
                        : '',
                  }"
                >
                  <el-button
                    type="primary"
                    size="mini"
                    :style="{
                      visibility:
                        leveMapDown > 1 && this.$store.getters.orgId == '1'
                          ? 'visible'
                          : 'hidden',
                    }"
                    icon="el-icon-refresh-left"
                    @click="goBackClick()"
                    >返回</el-button
                  >
                </div>
                <!--<div style="    display: inline;width: 100px;position: absolute;right:0.7%">
                    <span style="margin-right: 8%;">地区</span>
                    <span v-if="selectScene.id==6">限速用户数</span>
                    <span v-if="selectScene.id!=6">未解决数</span>
                  </div>-->
              </div>
              <SichuanEcharts
                v-loading="mapLoading"
                :mapData="mapData"
                :leveMapDown="leveMapDown"
                @changeMapCondition="changeMapCondition"
                :mapNameNow="mapNameNow"
                :selectScene="selectScene"
              ></SichuanEcharts>
            </el-card>
          </div>
        </el-col>
        <el-col :span="24" v-if="mainPosition == 1">
          <div class="grid-content bg-purple">
            <el-card :class="mainPosition == 1 ? 'foot-bottom' : 'foot-bottom-2'">
              <div slot="header">
                <span
                  >{{
                    selectScene.name == "暂无指标" ? "" : selectScene.name
                  }}历史对比</span
                >
              </div>
              <LineBarTemp v-loading="lineLoading" :lineData="lineData"></LineBarTemp>
            </el-card>
          </div>
        </el-col>
      </el-row>
    </div>
    <el-dialog title="详情" :visible.sync="dialogVisible" width="90%">
      <evevtLocus :conditionData="conditionDataDetails" v-if="dialogVisible"></evevtLocus>
    </el-dialog>
  </div>
</template>

<script>
import TableTemp from "../public/TableTemp";
import TableTempForRealSpe from "../public/TableTempForRealSpe";
import LineBarTemp from "../public/LineBarTemp";
import SichuanEcharts from "../public/SichuanEcharts";
import evevtLocus from "../eventlocus/eventLocus";
import BarTemp from "../public/BarTemp";
import Barchart from "./components/Barchart.vue";
import Linechart from "./components/Linechart.vue";
import Piechart from "./components/Piechart.vue";
export default {
  name: "index",
  components: {
    LineBarTemp,
    TableTemp,
    SichuanEcharts,
    evevtLocus,
    BarTemp,
    TableTempForRealSpe,
    Barchart,
    Linechart,
    Piechart,
  },
  data() {
    return {
      // 携转服务场景
      targetVal: "狼号联系预警",
      carryList: [
        { label: "狼号联系预警", value: "wolf" },
        { label: "异网装机预警", value: "net" },
        { label: "携转码预警", value: "trans" },
        { label: "使用异常预警", value: "unusual" },
        { label: "离网前资讯预警", value: "out" },
      ],
      // 携转服务场景预警量top10
      serviceTop10Val: "市州",
      serviceTop10List: [
        { label: "市州", value: "city" },
        { label: "区县", value: "area" },
        { label: "分支局", value: "sub" },
        { label: "网格", value: "grid" },
      ],
      serviceTop10Chart: {
        yData: [],
        seiveData: [],
      },
      // 魔盘投诉bar
      onLineData: {
        yData: [],
        seiveData: [],
      },
      onLineDataTop10: {
        yData: [],
        seiveData: [],
      },
      // 业务健康度趋势图
      healthChartData: {
        xData: [],
        seiveData: [
          { name: "", data: [] },
          { name: "", data: [] },
        ],
      },
      //本地异网-饼图数据
      pieChartData: {
        seiveData: [],
      },
      activeIndex: 0,
      tabbarList: ["线上订购", "线下订购"],
      magicDiskOption: [
        { name: "线上-细分产品", value: "online-product" },
        { name: "线上-投诉原因", value: "online-complain" },
        { name: "线上-本地异网", value: "online-local" },
      ],
      magicDiskOptionOut: [
        { name: "线下-细分产品", value: "outline-product" },
        { name: "线下-投诉原因", value: "outline-complain" },
        { name: "线下-本地异网", value: "outline-local" },
      ],
      finalVal: "online-product",
      magicDiskVal: "online-product",
      magicDiskValOut: "outline-product",
      currentDateTime: "",
      currentDateTime2: "",
      showMapTitle: true,
      conditionDataDetails: {
        eventId: null,
        eventInstId: null,
        flowid: null,
        onlyProgress: "0",
      },
      goldServiceType: {
        totalType: "合计",
        fuseType: "融合",
        singleCType: "单C",
        otherType: "",
        currIdList: [""],
      },
      dialogTableVisible: false,
      orderType: 1,
      menuImageUrl: require("../../assets/menu.png"),
      dashboardImageUrl: require("../../assets/dashboard.png"),
      dialogVisible: false,
      areaCondition: null,
      searchTime: null,
      tableData: this.$commonUtil.cloneDeep(this.$controlStyleTemp["tableTemp"]),
      lineData: null,
      mapData: null,
      selectScene: { id: null },
      mapLoading: false,
      tableLoading: false,
      lineLoading: false,
      tabPosition: 13,
      mainPosition: 2,
      leveMapDown: 1,
      mapNameNow: null,
      monitorScenesKpi: [[]],
      mapSearchCondition: "A0034",
      lineSearchCondition: "",
      tableSearchCondition: "",
      date: "",
      tableSearchConditionRealMap: {
        0: "A0036", //全场景
        1: "A0036_1", //有线设备
        2: "A0036_2", //有线设备集中告障
        3: "A0036_3", //有线高频重障
        4: "A0036_4", //无线基站断站
        5: "A0036_5", //无线质差小区
        7: "A0036_7", //高发投诉事件
        8: "A0036_8", //魔镜超时工单事件
        11: "A0036_11",
        12: "A0036_12", //移动网络大面  积故障事件
        15: "A0050_10",
      },
      xzfwcj: {
        //携转服务场景
        tableLoading: false,
        tableData: this.$commonUtil.cloneDeep(this.$controlStyleTemp["tableTemp"]),
        headStyle_height: "10px",
        tableSearchCondition: "A0055_11_1",
      },
      talbeMap: {
        shebei: {
          tableLoading: false,
          tableData: this.$commonUtil.cloneDeep(this.$controlStyleTemp["tableTemp"]),
          headStyle_height: "10px",
          tableSearchCondition: "A0036_11_1",
        },
        baoqu: {
          tableLoading: false,
          tableData: this.$commonUtil.cloneDeep(this.$controlStyleTemp["tableTemp"]),
          headStyle_height: "10px",
          tableSearchCondition: "A0036_11_2",
        },
        yingxiao_yx: {
          tableLoading: false,
          tableData: this.$commonUtil.cloneDeep(this.$controlStyleTemp["tableTemp"]),
          headStyle_height: "10px",
          tableSearchCondition: "A0048_12_1",
        },
        huifang_yx: {
          tableLoading: false,
          tableData: this.$commonUtil.cloneDeep(this.$controlStyleTemp["tableTemp"]),
          headStyle_height: "10px",
          codeAndName: {},
          tableSearchCondition: "A0048_12_12",
        },
        yingxiao_wx: {
          tableLoading: false,
          tableData: this.$commonUtil.cloneDeep(this.$controlStyleTemp["tableTemp"]),
          headStyle_height: "10px",
          tableSearchCondition: "A0049_13_1",
        },
        huifang_wx: {
          tableLoading: false,
          tableData: this.$commonUtil.cloneDeep(this.$controlStyleTemp["tableTemp"]),
          headStyle_height: "10px",
          // tableSearchCondition:'A0049_13_2',
          tableSearchCondition: "A0049_13_10",
        },
        quyu_baobiao: {
          tableLoading: false,
          tableData: this.$commonUtil.cloneDeep(this.$controlStyleTemp["tableTemp"]),
          headStyle_height: "10px",
          tableSearchCondition: "A0051_18_6",
        },
        quyu_qingdan: {
          tableLoading: false,
          tableData: this.$commonUtil.cloneDeep(this.$controlStyleTemp["tableTemp"]),
          headStyle_height: "10px",
          tableSearchCondition: "A0051_18_7",
        },
        jinpai_baobiao: {
          tableLoading: false,
          tableData: this.$commonUtil.cloneDeep(this.$controlStyleTemp["tableTemp"]),
          headStyle_height: "10px",
          tableSearchCondition: "A0052_19_6",
        },
        jinpai_qingdan: {
          tableLoading: false,
          tableData: this.$commonUtil.cloneDeep(this.$controlStyleTemp["tableTemp"]),
          headStyle_height: "10px",
          tableSearchCondition: "A0052_19_7",
        },
        tingdian_yl: {
          tableLoading: false,
          tableData: this.$commonUtil.cloneDeep(this.$controlStyleTemp["tableTemp"]),
          headStyle_height: "10px",
          tableSearchCondition: "A0049_13_8",
        },
        qdsfwzl: {
          tableLoading: false,
          tableData: this.$commonUtil.cloneDeep(this.$controlStyleTemp["tableTemp"]),
          headStyle_height: "10px",
          tableSearchCondition: "A0050_10",
        },
        yingxiao_pdgk: {
          tableLoading: false,
          tableData: this.$commonUtil.cloneDeep(this.$controlStyleTemp["tableTemp"]),
          headStyle_height: "10px",
          tableSearchCondition: "A0053_11_1",
        },
        yingxiao_fwyx_yxfj: {
          tableLoading: false,
          tableData: this.$commonUtil.cloneDeep(this.$controlStyleTemp["tableTemp"]),
          headStyle_height: "10px",
          tableSearchCondition: "A0053_11_2",
        },
        yingxiao_fwyx: {
          tableLoading: false,
          tableData: this.$commonUtil.cloneDeep(this.$controlStyleTemp["tableTemp"]),
          headStyle_height: "10px",
          tableSearchCondition: "A0053_11_3",
        },
      },
      targetOptions: {
        // 1:{name:'修复进度%',mapSearchCondition:{"13":'A0048_12_7',"14":"A0049_13_7"},tableSearchCondition:{"13":'A0048_12_2',"14":'A0049_13_8'},highName:'修复进度高',lowName:'修复进度低'},
        1: {
          name: "满意率%",
          mapSearchCondition: { 13: "A0048_12_24", 14: "A0049_13_9" },
          tableSearchCondition: { 13: "A0048_12_12", 14: "A0049_13_10" },
          highName: "满意率高",
          lowName: "满意率低",
        },
        2: {
          name: "受理工单数量",
          mapSearchCondition: { 13: "A0048_12_25" },
          tableSearchCondition: { 13: "A0048_12_13" },
          highName: "受理工单数量高",
          lowName: "受理工单数量低",
        },
        3: {
          name: "满意率%",
          mapSearchCondition: { 13: "A0048_12_26" },
          tableSearchCondition: { 13: "A0048_12_14" },
          highName: "满意率高",
          lowName: "满意率低",
        },
      },
      mainPositionScenes: {
        // 1:{"name":"整体情况","id":"1","scenes":[0]},
        // 2:{"name":"有线网络","id":"2","scenes":[1,2,3,8,11,13]},
        // 3:{"name":"无线网络","id":"3","scenes":[4,5,14]},
        // 4:{"name":"服务质量","id":"4","scenes":[6,7,15]},
        // 5:{"name":"主动营销","id":"5","scenes":[6,17,18,19]}
        2: { name: "营销服务", id: "2", scenes: [17, 19, 6, 18, 20] },
        3: { name: "有线网络", id: "3", scenes: [1, 2, 3, 8, 11, 13, 21] },
        4: { name: "无线网络", id: "4", scenes: [4, 5, 14] },
        5: { name: "风险控制", id: "5", scenes: [15, 7, 22] },
      },
      youxianObj: {},
      wuxianObj: {},
      monitorScenesKpiData: [
        /*{id: 1, name:"有线设备故障", loading:false, totalNum: 0, monthAdd:0, huanbi: 0,condition:"A0001,A0002,A0003"},
            {id: 2, name:"有线高频重障", loading:false, totalNum: 0, monthAdd:0, huanbi: 0,condition:"A0004,A0005,A0006"},
            {id: 3, name:"有线大面积保障", loading:false,totalNum: 0, monthAdd:0, huanbi: 0,condition:"A0007,A0008,A0009"},
            {id: 4, name:"无线基站断点", loading:false,totalNum: 0, monthAdd:0, huanbi: 0,condition:"A0013,A0014,A0015"},
            {id: 5, name:"无线质差小区", loading:false,totalNum: 0, monthAdd:0, huanbi: 0,condition:"A0016,A0017,A0018"},
            {id: 6, name:"满意度预测", loading:false,totalNum: 0, monthAdd:0, huanbi: 0,condition:"A0019,A0020,A0021"},
            {id: 7, name:"高发投诉", loading:false,totalNum: 0, monthAdd:0, huanbi: 0,condition:"A0025,A0026,A0027"},
            {id: 8, name:"魔镜故障", loading:false,totalNum: 0, monthAdd:0, huanbi: 0,condition:"A0028,A0029,A0030"},
            {id: 9, name:"有线处理及时率", loading:false,totalNum: 0, monthAdd:0, huanbi: 0,condition:"A0010,A0011,A0012"},
            {id: 10, name:"无线处理及时率", loading:false,totalNum: 0, monthAdd:0, huanbi: 0,condition:"A0022,A0023,A0024"},
            {id: 11, name:"ITV处理及时率", loading:false,totalNum: 0, monthAdd:0, huanbi: 0,condition:"A0031,A0032,A0033"},*/
        // {id: 0, name:"暂无指标", loading:false, totalNum: 0, monthAdd:0, huanbi: 0,condition:"A0037,A0038,A0039",canClick:true,eg:false},
        {
          id: 17,
          name: "无服务不营销2.0",
          loading: false,
          totalNum: 0,
          monthAdd: 0,
          huanbi: 0,
          condition:
            "A0053,A0053_1,A0053_2,A0053_3,A0053_4,A0053_5,A0053_6,A0053_7,A0053_8,A0053_9,A0053_10",
          canClick: true,
          eg: false,
        },
        {
          id: 13,
          name: "暂无指标",
          loading: false,
          totalNum: 0,
          monthAdd: 0,
          huanbi: 0,
          condition:
            "A0048_12_3,A0048_12_4,A0048_12_5,A0048_12_6,A0048_12_8,A0048_12_9,A0048_12_10,A0048_12_11,A0048_12_15,A0048_12_16,A0048_12_17,A0048_12_18,A0048_12_19,A0048_12_20,A0048_12_21,A0048_12_22,A0048_12_23,A0048_12_27",
          canClick: true,
          eg: false,
        },
        {
          id: 3,
          name: "暂无指标",
          loading: false,
          totalNum: 0,
          monthAdd: 0,
          huanbi: 0,
          condition: "A0004,A0005,A0006",
          canClick: true,
          eg: false,
        } /*有线高频重障*/,
        {
          id: 1,
          name: "暂无指标",
          loading: false,
          totalNum: 0,
          monthAdd: 0,
          huanbi: 0,
          condition: "A0001,A0002,A0003",
          canClick: false,
          eg: true,
        } /*有线设备故障*/, //2023.4.6 暂时屏蔽有线设备故障
        /*{id: 2, name:"暂无指标", loading:false, totalNum: 0, monthAdd:0, huanbi: 0,condition:"A0047,A0048,A0049",canClick:true,eg:false},*/
        {
          id: 2,
          name: "暂无指标",
          loading: false,
          totalNum: 0,
          monthAdd: 0,
          huanbi: 0,
          condition: "A0007,A0008,A0009",
          canClick: false,
          eg: true,
        } /*用户集中告障（有线）*/, //2023.4.7 暂时屏蔽用户集中告障
        {
          id: 14,
          name: "暂无指标",
          loading: false,
          totalNum: 0,
          monthAdd: 0,
          huanbi: 0,
          condition: "A0049,A0049_1,A0049_2,A0049_3,A0049_6,A0049_7",
          canClick: true,
          eg: false,
        },

        /**************************************************每四个  最后一个特殊不可点****************************************************************************************/
        {
          id: 5,
          name: "暂无指标",
          loading: false,
          totalNum: 0,
          monthAdd: 0,
          huanbi: 0,
          condition: "A0016,A0017,A0018",
          canClick: true,
          eg: false,
        },
        {
          id: 4,
          name: "暂无指标",
          loading: false,
          totalNum: 0,
          monthAdd: 0,
          huanbi: 0,
          condition: "A0013,A0014,A0015",
          canClick: true,
          eg: false,
        },

        /**************************************************每四个  最后一个特殊不可点****************************************************************************************/
        {
          id: 6,
          name: "暂无指标",
          loading: false,
          totalNum: 0,
          monthAdd: 0,
          huanbi: 0,
          condition: "A0019,A0020,A0021",
          canClick: true,
          eg: false,
        },

        // {id: 8, name:"暂无指标", loading:false,totalNum: 0, monthAdd:0, huanbi: 0,condition:"A0028,A0029,A0030",canClick:false,eg:true},
        {
          id: 11,
          name: "重复障碍监控",
          loading: false,
          totalNum: 0,
          monthAdd: 0,
          huanbi: 0,
          condition: "A0046",
          canClick: false,
          eg: true,
        },
        {
          id: 9,
          name: "暂无指标",
          loading: false,
          totalNum: 0,
          monthAdd: 0,
          huanbi: 0,
          condition: "A0010,A0011,A0012",
          canClick: false,
        },
        {
          id: 10,
          name: "暂无指标",
          loading: false,
          totalNum: 0,
          monthAdd: 0,
          huanbi: 0,
          condition: "A0022,A0023,A0024",
          canClick: false,
        },
        // {id: 7, name:"高发投诉", loading:false,totalNum: 0, monthAdd:0, huanbi: 0,condition:"A0040,A0041,A0042",canClick:false,eg:true},
        {
          id: 8,
          name: "魔镜超时工单",
          loading: false,
          totalNum: 0,
          monthAdd: 0,
          huanbi: 0,
          condition: "A0040,A0041,A0042",
          canClick: false,
          eg: true,
        },
        // /**************************************************每四个  最后一个特殊不可点****************************************************************************************/
        // {id: 15, name:"生产系统故障", loading:false,totalNum: 0, monthAdd:0, huanbi: 0,condition:"A0040,A0041,A0042",canClick:false,eg:true},
        {
          id: 15,
          name: "渠道商服务质量提升",
          loading: false,
          totalNum: 0,
          monthAdd: 0,
          huanbi: 0,
          condition: "A0050,A0050_1,A0050_2,A0050_3,A0050_4,A0050_5",
          canClick: true,
          eg: false,
        },
        {
          id: 7,
          name: "暂无指标",
          loading: false,
          totalNum: 0,
          monthAdd: 0,
          huanbi: 0,
          condition: "A0025,A0026,A0027",
          canClick: false,
          eg: true,
        },
        // {id: 16, name:"核心网故障", loading:false,totalNum: 0, monthAdd:0, huanbi: 0,condition:"A0040,A0041,A0042",canClick:false,eg:true},
        // {id: 17, name:"潜在三千兆用户挖掘", loading:false,totalNum: 0, monthAdd:0, huanbi: 0,condition:"A0040,A0041,A0042",canClick:false,eg:true},
        {
          id: 18,
          name: "区域流失预警",
          loading: false,
          totalNum: 0,
          monthAdd: 0,
          huanbi: 0,
          condition: "A0051_18_1,A0051_18_2,A0051_18_3,A0051_18_4,A0051_18_5",
          canClick: true,
          eg: false,
        } /*区域流失预警*/,
        {
          id: 20,
          name: "魔盘业务监控",
          loading: false,
          totalNum: 0,
          monthAdd: 0,
          huanbi: 0,
          condition:
            "A0054,A0054_1,A0054_2,A0054_3,A0054_4,A0054_5,A0054_6,A0054_7,A0054_8,A0054_9,A0054_10,A0054_11,A0054_12,A0054_13,A0054_14,A0054_15,A0054_16,A0054_17,A0054_18,A0054_19",
          canClick: true,
          eg: false,
        } /*魔盘业务监控*/,
        {
          id: 19,
          name: "金牌服务",
          loading: false,
          totalNum: 0,
          monthAdd: 0,
          huanbi: 0,
          condition: "A0052_19_1,A0052_19_2,A0052_19_3,A0052_19_4,A0052_19_5",
          canClick: false,
          eg: true,
        } /*金牌服务*/,
        /* {id: 17, name:"千兆用户挖掘体验式营销", loading:false,totalNum: 0, monthAdd:0, huanbi: 0,condition:"A0040,A0041,A0042",canClick:false,eg:true},*/
        /*{id: 11, name:"SA网络感知提升", loading:false,totalNum: 0, monthAdd:0, huanbi: 0,condition:"",canClick:false},*/
        {
          id: 21,
          name: "政企代客报障",
          loading: false,
          totalNum: 0,
          monthAdd: 0,
          huanbi: 0,
          condition: "",
          canClick: false,
          eg: true,
        } /*政企代客报障*/,
        {
          id: 22,
          name: "携转服务场景",
          loading: false,
          totalNum: 0,
          monthAdd: 0,
          huanbi: 0,
          huanbi_2: 0,
          condition: "",
          canClick: true,
          eg: false,
        } /*携转服务场景*/,
      ],
      barMap: {
        daliangxiansu: {
          barLoading: false,
          barData: this.$commonUtil.cloneDeep(this.$controlStyleTemp["tableTemp"]),
          barSearchCondition: "A0043",
        },
        daliangxiansu_month: {
          barLoading: false,
          barData: this.$commonUtil.cloneDeep(this.$controlStyleTemp["tableTemp"]),
          barSearchCondition: "A0045",
        },
        // 厅电优良差(月)
        goodGeneBad_month: {
          barLoading: false,
          barData: null,
          barSearchCondition: "A0050_12",
        },
        // 线上-细分产品
        online_xfcp: {
          barLoading: false,
          barData: this.$commonUtil.cloneDeep(this.$controlStyleTemp["barTemp"]),
          barSearchCondition: "D0054",
        },
        // 线下-细分产品
        offline_xfcp: {
          barLoading: false,
          barData: this.$commonUtil.cloneDeep(this.$controlStyleTemp["barTemp"]),
          barSearchCondition: "D0054_1",
        },
        // 线上-投诉原因
        online_tsyy: {
          barLoading: false,
          barData: this.$commonUtil.cloneDeep(this.$controlStyleTemp["barTemp"]),
          barSearchCondition: "D0054_2",
        },
        // 线下-投诉原因
        offline_tsyy: {
          barLoading: false,
          barData: this.$commonUtil.cloneDeep(this.$controlStyleTemp["barTemp"]),
          barSearchCondition: "D0054_3",
        },
        // 魔盘投诉产品TOP10(月)
        mptscptop: {
          barLoading: false,
          barData: this.$commonUtil.cloneDeep(this.$controlStyleTemp["barTemp"]),
          barSearchCondition: "D0054_6",
        },
      },
      lineMap: {
        daliangxiansuyj: {
          lineLoading: false,
          lineData: this.$commonUtil.cloneDeep(this.$controlStyleTemp["tableTemp"]),
          lineSearchCondition: "A0043",
        },
        daliangxiansuyhs: {
          lineLoading: false,
          lineData: this.$commonUtil.cloneDeep(this.$controlStyleTemp["tableTemp"]),
          lineSearchCondition: "A0045",
        },
        // tingdianyouliangcha:{
        //   lineLoading:false,
        //   lineData:this.$commonUtil.cloneDeep(this.$controlStyleTemp["tableTemp"]),
        //   lineSearchCondition:'A0050_8',
        // }
      },
      recordQueryBarRest: {},
      downloadUrlName: {
        5: "无线质差小区事件",
        13: {
          upTable: {
            //1:"有线客户说了算-营销派单日报表",
            1: "有线客户说了算-代客报障日报表",
            2: "有线客户说了算-后向支撑日报表",
            3: "有线客户说了算-主动修复日报表",
          },
          downTable: "有线客户说了算-营销派单日报表",
        },
        14: {
          upTable: "无线客户说了算",
          downTable: "无线清单数据表",
        },
        15: "厅店优良差清单",
        17: {
          upTable: "派单管控报表",
          downTable: "服务营销效果评估日报表",
        },
        18: {
          upTable: "区域流失预警报表",
          downTable: "区域流失预警清单",
        },
        19: {
          upTable: "金牌服务报表",
          downTable: "金牌服务清单",
        },
        20: {
          upTable: { 1: "业务健康度日新增报表", 2: "业务健康度月到达报表" },
          downTable: "魔盘投诉清单",
        },
      },
      timeOut: null,
      gotodownloadPageItem: {
        menuId: "",
        name: "",
        path: "",
        meta: {
          title: "",
          icon: "el-icon-tickets",
          noCache: true,
        },
      },
    };
  },
  mounted: function () {},
  created: function () {
    this.init();
  },
  methods: {
    //携转服务场景
    radioGroupChange(e) {
      this.targetVal = e;
    },
    //携转服务场景预警量top10
    serviceTop10Change(e) {
      this.serviceTop10Val = e;
      this.getCarryBar();
    },
    switchTabbar(index) {
      this.activeIndex = index;
      this.getLineData(index);
    },
    changeMagicOption(e) {
      if (!e) return;
      this.finalVal = e;
      this.getwriteBarData(e);
    },
    getMagicName(val) {
      let allOptions = [...this.magicDiskOption, ...this.magicDiskOptionOut];
      let nameObj = allOptions.find((v) => v.value == val);
      return nameObj ? nameObj.name : val;
    },
    change: function (e, type) {
      let newList = [];
      newList.push(e);
      this.goldServiceType.currIdList = newList;
      this.setTableData();
    },
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
      let _this = this;
      // setInterval(function(){
      //   _this.realTimeScenesDataLoop();
      // }, 5 * 60 * 1000);
      _this.realTimeScenesDataLoop();
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
    heightSize: function () {
      return window.screen.height * 0.8 + "px";
    },
    widthSize: function () {
      return window.screen.width * 1 + "px";
    },
    getDevilData() {
      let arr = [];
      for (let a = 0; a < this.monitorScenesKpiData.length; a++) {
        let item = this.monitorScenesKpiData[a];
        if (item.condition != "") {
          arr.push(item.condition);
        }
        item.loading = true;
      }
      this.$api.realTimeData
        .queryDataByList(arr, this.areaCondition, "")
        .then((response) => {});
    },
    changeScene: function (data) {
      if (!data.canClick) {
        return;
      }
      if (data.id != 9 && data.id != 10) {
        this.selectScene = data;
        this.tabPosition = data.id;
        this.tabPositionChangeEvent();
      }
      if (data.id == 13) {
        this.orderType = 1;
        this.talbeMap.huifang_yx.tableSearchCondition = "A0048_12_12";
        this.talbeMap.huifang_wx.tableSearchCondition = "A0049_13_8";
      } else if (data.id == 14) {
        // this.orderType = 2;
        this.talbeMap.huifang_yx.tableSearchCondition = "A0048_12_12";
        this.talbeMap.huifang_wx.tableSearchCondition = "A0049_13_8";
      }
      if (data.id == 19) {
        this.goldServiceType.currIdList = [];
      }
      if (data.id == 17) {
        this.talbeMap.yingxiao_pdgk.tableSearchCondition = "A0053_11_1";
        this.talbeMap.yingxiao_fwyx_yxfj.tableSearchCondition = "A0053_11_2";
        this.talbeMap.yingxiao_fwyx.tableSearchCondition = "A0053_11_3";
      }
      console.log("selectScene999", this.selectScene);
    },
    //查询重点场景监控数据
    queryKeySceneData: function () {
      let _this = this;
      let arr = [];
      for (let a = 0; a < this.monitorScenesKpiData.length; a++) {
        let item = this.monitorScenesKpiData[a];
        if (item.condition != "") {
          arr.push(item.condition);
        }
        item.loading = true;
      }
      this.$api.realTimeData
        .queryDataByList(arr, this.areaCondition, "")
        .then((response) => {
          for (let a = 0; a < _this.monitorScenesKpiData.length; a++) {
            let item = this.monitorScenesKpiData[a];
            let data = response.data[a];
            let arr = [];
            if (item.condition != "") {
              arr = item.condition.split(",");
            }
            if (item.name == "暂无指标") {
              item.name = data.name;
            }
            for (let a = 0; a < arr.length; a++) {
              let colum = arr[a];
              if (a == 0) {
                let value0 = this.$commonUtil.cloneDeep(data[colum]);
                if (value0 != "-" && value0 > 10000) {
                  value0 = (value0 / 10000).toFixed(2) + "万";
                }
                item.totalNum = data[colum] == "—" ? 0 : value0;
              } else if (a == 1) {
                let value = this.$commonUtil.cloneDeep(data[colum]);
                if (value != "-" && value > 10000) {
                  value = (value / 10000).toFixed(2) + "万";
                }
                item.monthAdd = value == "—" ? 0 : value;
              } else if (a == 2) {
                item.huanbi = data[colum] == "—" ? 0 : data[colum];
              } else if (a == 3) {
                item.huanbi_2 = data[colum] == "—" ? 0 : data[colum];
              } else {
                item["colum_" + a] = data[colum] == "—" ? 0 : data[colum];
              }
            }
            item.loading = false;
          }
          console.log(_this.monitorScenesKpiData);
        })
        .catch((error) => {});
      this.$api.realTimeData
        .queryMaxDate()
        .then((response) => {
          let data = response.data;
          _this.searchTime = data.maxdate;
        })
        .catch((error) => {});
    },

    //地图数据
    setMapData: function () {
      this.mapData = null;
      this.mapLoading = false;
      //地图数据
      let cloneMapData = this.$commonUtil.cloneDeep(
        this.$controlStyleTemp["mapDefaulData"]
      );
      cloneMapData.titlePosition = "left";
      cloneMapData.visualLeftOrRight = "left";
      cloneMapData.colorArrExplan = ["高", "低"];
      // cloneMapData.mapHeight=  this.mainPosition == 1?"420px":"570px";
      cloneMapData.mapHeight = "570px";
      cloneMapData.layoutCenter = ["45%", "45%"];
      (cloneMapData.layoutSize = "70%"), (cloneMapData.isShowBar = true);
      if ("1" == this.areaCondition) {
        cloneMapData.canViewLevel = [1, 2];
        this.mapNameNow = "四川省";
      } else {
        this.leveMapDown = 2;
        this.mapNameNow = this.$controlStyleTemp["mapcode_cityname"][this.areaCondition];
      }
      // cloneMapData.colorArr=['#41BAEF','#FED615','#FD5D39', ];
      cloneMapData.colorArr = ["#85E5E9"];
      return this.queryMapData(cloneMapData);
    },
    queryMapData: function (cloneMapData) {
      let _this = this;
      this.mapLoading = true;
      if (this.selectScene.id == 6) {
        this.mapSearchCondition = "A0044";
      } else if (this.selectScene.id == 11) {
        this.mapSearchCondition = "A0047";
      } else if (this.selectScene.id == 13) {
        this.mapSearchCondition =
          _this.targetOptions[_this.orderType].mapSearchCondition["13"];
      } else if (this.selectScene.id == 14) {
        this.mapSearchCondition = _this.targetOptions[1].mapSearchCondition["14"];
      } else if (this.selectScene.id == 18) {
        this.mapSearchCondition = "A0051_18_8";
      } else if (this.selectScene.id == 19) {
        this.mapSearchCondition = "A0052_19_8";
      } else if (this.selectScene.id == 15) {
        this.mapSearchCondition = "A0050_0";
      } else if (this.selectScene.id == 22) {
        this.mapSearchCondition = "A0055_12_1";
      } else {
        this.mapSearchCondition = "A0034";
      }
      this.$api.realTimeData
        .queryData(this.mapSearchCondition, this.areaCondition, this.tabPosition)
        .then((response) => {
          let data = response.data;
          // let areadata = data[_this.mapSearchCondition];
          // if(this.selectScene.id==22){
          //   let newAreadata = {}
          //   Object.keys(areadata).map(key=>{
          //     let newKeys = key+"%"
          //     newAreadata[newKeys] = areadata[key]
          //   })
          //   cloneMapData.areadata=newAreadata;
          // }else{
          //   cloneMapData.areadata=data[_this.mapSearchCondition];
          // }
          cloneMapData.areadata = data[_this.mapSearchCondition];
          cloneMapData.dataShadow = data.dataShadow;
          cloneMapData.bartop = data.bartop;
          let titlevalue = "";
          if (this.selectScene.id == 6) {
            titlevalue = "限速用户数";
          } else if (this.selectScene.id == 11) {
            titlevalue = "包区重障";
          } else if (this.selectScene.id == 13 || this.selectScene.id == 14) {
            cloneMapData.bartop.sort((a, b) => {
              return a["value"] - b["value"];
            });
            let array = [];
            cloneMapData.bartop.map((item) => {
              array.push(item.name);
            });
            data.titledata = array;
            titlevalue = "完成率%";
            if (this.selectScene.id == 13) {
              titlevalue = _this.targetOptions[_this.orderType].name;
            }
          } else if (this.selectScene.id == 18) {
            titlevalue = "预警用户数";
          } else if (this.selectScene.id == 19) {
            titlevalue = "挽留失败量";
          } else if (this.selectScene.id == 15) {
            titlevalue = "判责量同比";
          } else if (this.selectScene.id == 22) {
            titlevalue = "处理率%";
          } else {
            titlevalue = "未解决数";
          }
          let a = {
            code: -1,
            name: "地区",
            value: 0,
            titlevalue: titlevalue,
          };
          cloneMapData.bartop.push(a);
          cloneMapData.titledata = data.titledata;
          cloneMapData.titledata.push("地区");
          cloneMapData.cloumName = data.name;
          // if(data.dataShadow.length>0){
          //   if(data.dataShadow[0]==0){
          //     cloneMapData.visualMap.max=2000;
          //   }else {
          //     cloneMapData.visualMap.max=data.dataShadow[0];
          //   }
          // }else{
          //   cloneMapData.visualMap.max=2000;
          // }
          for (let i in cloneMapData.bartop) {
            let obj = cloneMapData.bartop[i];
            if (obj.code > 0) {
              if (obj.value < 0) {
                obj["negative"] = true;
                obj.value = Math.abs(obj.value);
              } else {
                obj["negative"] = false;
              }
            }
          }
          cloneMapData.visualMap.max =
            data.maxValue == null || data.maxValue == "" ? 2000 : data.maxValue;
          cloneMapData.visualMap.min =
            data.minValue == null || data.minValue == "" || data.minValue == data.maxValue
              ? 0
              : data.minValue;
          _this.mapData = cloneMapData;
          _this.mapLoading = false;
        })
        .catch((error) => {
          _this.mapLoading = false;
        });
    },
    //折线图数据
    setLineData: function () {
      let _this = this;
      if ([13, 14, 18, 19].indexOf(this.selectScene.id) > -1) {
        return;
      }
      if (this.selectScene.id == 6) {
        let lineMapTemp = {};
        lineMapTemp = _this.lineMap;
        let arr = [];
        for (let i in lineMapTemp) {
          let item = lineMapTemp[i];
          if (item.condition != "") {
            arr.push(item.lineSearchCondition);
          }
          item.lineLoading = true;
        }
        this.$api.realTimeData
          .queryDataByList(arr, this.areaCondition, this.tabPosition, "1")
          .then((response) => {
            for (let i in lineMapTemp) {
              for (let j in response.data) {
                if (response.data[j][lineMapTemp[i].lineSearchCondition]) {
                  let clonelineData = _this.$commonUtil.cloneDeep(
                    _this.$controlStyleTemp["lineTemp"]
                  );
                  if (i == "daliangxiansuyhs") {
                    clonelineData.gridHeight = "190px";
                  }
                  clonelineData.xAxisData = response.data[j].xAxisData;
                  clonelineData.showYSplitLine = false;
                  clonelineData.seriesData =
                    response.data[j][lineMapTemp[i].lineSearchCondition];
                  clonelineData.userSpecialToolTip = true;
                  clonelineData.lineAreaStylegradient = true;
                  for (let a = 0; a < clonelineData.seriesData.length; a++) {
                    if (a == 0) {
                      clonelineData.seriesData[0].color = ["#f87171", "#f87171"];
                    }
                    if (a == 1) {
                      clonelineData.seriesData[1].color = [
                        "rgba(123,214,252,0)",
                        "rgba(191,235,254,0)",
                      ];
                    }
                    lineMapTemp[i].lineData = clonelineData;
                    lineMapTemp[i].lineLoading = false;
                  }
                }
              }
            }
          })
          .catch((error) => {});
      } else {
        this.lineLoading = true;
        this.lineSearchCondition = "A0035";
        let clonelineData = _this.$commonUtil.cloneDeep(
          _this.$controlStyleTemp["lineTemp"]
        );
        clonelineData.gridHeight = "190px";
        this.$api.realTimeData
          .queryData(this.lineSearchCondition, this.areaCondition, this.tabPosition, "1")
          .then((response) => {
            let data = response.data;
            clonelineData.xAxisData = data.xAxisData;
            clonelineData.lineAreaStylegradient = true;
            clonelineData.seriesData = data[_this.lineSearchCondition];
            for (let a = 0; a < clonelineData.seriesData.length; a++) {
              if (a == 0) {
                clonelineData.seriesData[0].color = [
                  "rgba(252,98,98,1)",
                  "rgba(252,98,98,0.6)",
                ];
              }
              if (a == 1) {
                clonelineData.seriesData[1].color = ["#7BD6FC", "#BFEBFE"];
              }
            }
            if (_this.mainPosition == 1) {
              clonelineData.smooth = true;
            }
            _this.lineData = clonelineData;
            _this.lineLoading = false;
          })
          .catch((error) => {
            _this.lineLoading = false;
          });
      }
    },
    //列表数据
    setTableData: function () {
      if (this.selectScene.id == 6 || this.selectScene.id == 20) {
        return;
      }
      let _this = this;
      //上下都是表格的
      if (this.selectScene.id == 22) {
        let dateType = "";
        let dataArr = [""];
        let tableDataClone = this.$commonUtil.cloneDeep(
          this.$controlStyleTemp["tableTemp"]
        );
        tableDataClone.tableHeight = "100%";
        tableDataClone.headStyle_height = "10";
        tableDataClone.isSort = true;
        if (this.selectScene.id == 22) {
          tableDataClone.canClick = false;
        }
        tableDataClone.sortName = "序号";
        this.xzfwcj.tableLoading = true;
        this.tableSearchCondition = this.xzfwcj.tableSearchCondition;
        this.$api.realTimeData
          .queryData(
            this.tableSearchCondition,
            this.areaCondition,
            this.tabPosition,
            dateType,
            "",
            "",
            dataArr
          )
          .then((response) => {
            let data = response.data;
            tableDataClone.dataList = data?.dataList ?? [];
            tableDataClone.codeAndName = data.codeAndName;
            _this.xzfwcj.tableData = tableDataClone;
            _this.xzfwcj.tableLoading = false;
          })
          .catch((error) => {
            _this.tableLoading = false;
          });
        this.xzfwcj.tableLoading = false;
      } else if (
        this.selectScene.id == 11 ||
        this.selectScene.id == 13 ||
        this.selectScene.id == 14 ||
        this.selectScene.id == 18 ||
        this.selectScene.id == 19 ||
        this.selectScene.id == 15 ||
        this.selectScene.id == 17
      ) {
        for (let i in this.talbeMap) {
          if (this.selectScene.id == 11 && i != "baoqu" && i != "shebei") {
            continue;
          }
          if (this.selectScene.id == 13 && i != "yingxiao_yx" && i != "huifang_yx") {
            continue;
          }
          if (this.selectScene.id == 14 && i != "yingxiao_wx" && i != "huifang_wx") {
            continue;
          }
          if (this.selectScene.id == 18 && i != "quyu_baobiao" && i != "quyu_qingdan") {
            continue;
          }
          if (
            this.selectScene.id == 19 &&
            i != "jinpai_baobiao" &&
            i != "jinpai_qingdan"
          ) {
            continue;
          }
          if (this.selectScene.id == 14) {
            _this.talbeMap.huifang_wx.tableSearchCondition =
              _this.targetOptions[1].tableSearchCondition[this.selectScene.id];
          }

          let dateType = "";
          if (_this.selectScene.id == 17 && i == "yingxiao_fwyx" && this.orderType) {
            dateType = this.orderType;
          }

          let dataArr = [""];
          if (this.selectScene.id == 19) {
            dataArr = _this.goldServiceType.currIdList;
          }
          let tableDataClone = this.$commonUtil.cloneDeep(
            this.$controlStyleTemp["tableTemp"]
          );
          tableDataClone.tableHeight = "100%";
          tableDataClone.headStyle_height = "10";
          tableDataClone.isSort = true;
          if (this.selectScene.id == 15) {
            tableDataClone.canClick = true;
          }
          if (i == "baoqu" || i == "shebei") {
            tableDataClone.canClick = false;
          }
          if (this.selectScene.id == 22) {
            tableDataClone.canClick = false;
          }
          tableDataClone.sortName = "序号";
          this.talbeMap[i].tableLoading = true;
          this.tableSearchCondition = this.talbeMap[i].tableSearchCondition;
          this.$api.realTimeData
            .queryData(
              this.tableSearchCondition,
              this.areaCondition,
              this.tabPosition,
              dateType,
              "",
              "",
              dataArr
            )
            .then((response) => {
              let data = response.data;
              tableDataClone.dataList = data.dataList;
              if (_this.selectScene.id == 17) {
                if (i == "yingxiao_pdgk" && tableDataClone.dataList.length > 0) {
                  _this.currentDateTime = tableDataClone.dataList[0].update_dt;
                }
                if (i == "yingxiao_fwyx_yxfj" && tableDataClone.dataList.length > 0) {
                  _this.currentDateTime2 = tableDataClone.dataList[0].date_no_;
                }
              }
              tableDataClone.codeAndName = data.codeAndName;
              _this.talbeMap[i].tableData = tableDataClone;
              _this.talbeMap[i].tableLoading = false;
            })
            .catch((error) => {
              _this.tableLoading = false;
            });
        }
      } else {
        let tableDataClone = this.$commonUtil.cloneDeep(
          this.$controlStyleTemp["tableTemp"]
        );
        tableDataClone.tableHeight = _this.mainPosition == 1 ? "105%" : "100%";
        tableDataClone.headStyle_height = "10";
        tableDataClone.isSort = true;
        tableDataClone.canClick = true;
        tableDataClone.sortName = "序号";

        _this.tableLoading = true;
        tableDataClone.td_height = _this.mainPosition == 1 ? "35px" : "0";
        this.tableSearchCondition = this.tableSearchConditionRealMap[this.selectScene.id];
        this.$api.realTimeData
          .queryData(this.tableSearchCondition, this.areaCondition, this.tabPosition)
          .then((response) => {
            let data = response.data;
            tableDataClone.dataList = data.dataList;
            tableDataClone.codeAndName = data.codeAndName;
            _this.tableData = tableDataClone;
            _this.tableLoading = false;
          })
          .catch((error) => {
            _this.tableLoading = false;
          });
      }
    },
    getCurrentDateTimeStr() {
      var myDate = new Date(); //创建Date对象
      var Y = myDate.getFullYear(); //获取当前完整年份
      var M = myDate.getMonth() + 1; //获取当前月份
      var D = myDate.getDate(); //获取当前日1-31
      var H = myDate.getHours(); //获取当前小时
      var i = myDate.getMinutes(); //获取当前分钟
      var s = myDate.getSeconds(); //获取当前秒数
      // 月份不足10补0
      if (M < 10) {
        M = "0" + M;
      }
      // 日不足10补0
      if (D < 10) {
        D = "0" + D;
      }
      // 小时不足10补0
      if (H < 10) {
        H = "0" + H;
      }
      // 分钟不足10补0
      if (i < 10) {
        i = "0" + i;
      }
      // 秒数不足10补0
      if (s < 10) {
        s = "0" + s;
      }
      // 拼接日期分隔符根据自己的需要来修改
      var nowDate = Y + "-" + M + "-" + D + " " + H + ":" + i;
      this.currentDateTime = nowDate;
    },
    getNowFormatDate: function () {
      let _this = this;
      return this.$api.realTimeData
        .queryMaxDateForJueCe()
        .then((response) => {
          let data = response.data;
          _this.date = _this.$route.query.date ? _this.$route.query.date : data.maxdate;
        })
        .catch((error) => {});
    },
    changeMapCondition: function (params) {
      this.areaCondition = params.data.code;
      this.mapNameNow = params.name;
      this.leveMapDown = 2;
      this.areaChangeEvent();
    },
    seeDetails: function (row) {
      this.conditionDataDetails.eventId = row.eventid;
      this.conditionDataDetails.eventInstId = row.event_inst_id;
      this.conditionDataDetails.flowid = row.flowid;
      this.dialogVisible = true;
    },

    /**
     * 5分钟循环查询一次实时数据
     */
    realTimeScenesDataLoop: function () {
      this.queryKeySceneData();
      let _this = this;
      let monitorScenes = _this.monitorScenesKpiData;
      if (monitorScenes.length > 0) {
        // _this.monitorScenesKpi = [[]];
        // var rowIndex = 0;
        // var flag1=false;
        // var flag2=false;
        // for(var i = 0, len = monitorScenes.length; i < len; i++){
        //   if (monitorScenes[i].id == 9) {
        //     this.youxianObj = monitorScenes.find(items => items.id == 9)
        //     flag1 = true
        //     continue
        //   }
        //   if (monitorScenes[i].id == 10) {
        //     this.wuxianObj = monitorScenes.find(items => items.id == 10)
        //     flag2 = true
        //     continue
        //   }
        //   if(flag1) i--;
        //   if(flag2) i--;
        //   if(i > 0 && i % 5 == 0){
        //     _this.monitorScenesKpi.push([]);
        //     rowIndex++;
        //   }
        //   if(flag1) i++;
        //   if(flag2) i++;
        //   _this.monitorScenesKpi[rowIndex].push(monitorScenes[i]);
        // }
        // _this.selectScene = monitorScenes[0];
        /*_this.changeScene(_this.selectScene);*/
        _this.monitorScenesKpi = [[]];
        let rowIndex = 0;
        for (let i = 0, len = monitorScenes.length; i < len; i++) {
          if (monitorScenes[i].id == 9) {
            this.youxianObj = monitorScenes.find((items) => items.id == 9);
            continue;
          }
          if (monitorScenes[i].id == 10) {
            this.wuxianObj = monitorScenes.find((items) => items.id == 10);
            continue;
          }
          if (
            _this.mainPositionScenes[_this.mainPosition].scenes &&
            _this.mainPositionScenes[_this.mainPosition].scenes.indexOf(
              monitorScenes[i].id
            ) >= 0
          ) {
            _this.monitorScenesKpi[rowIndex].push(monitorScenes[i]);
          }
          if (
            i > 0 &&
            _this.monitorScenesKpi[rowIndex].length != 0 &&
            _this.monitorScenesKpi[rowIndex].length % 5 == 0
          ) {
            _this.monitorScenesKpi.push([]);
            rowIndex++;
          }
        }
        _this.selectScene = _this.monitorScenesKpi[0][0];
        _this.changeScene(_this.selectScene);
      }
      this.setMapData();
      this.setLineData();
      this.setBarData();
      this.setDevilData();
      this.setCarryForward();
      this.setTableData();
    },
    //携转服务场景下面接口数据
    setCarryForward() {
      this.getCarryBar(); //携转服务场景预警量top10
    },
    getCarryBar() {
      let barType = "";
      if (this.serviceTop10Val == "市州") barType = "A0055_13_1";
      else if (this.serviceTop10Val == "区县") barType = "A0055_13_2";
      else if (this.serviceTop10Val == "分支局") barType = "A0055_13_3";
      else if (this.serviceTop10Val == "网格") barType = "A0055_13_4";
      this.$api.realTimeData
        .queryData(barType, this.areaCondition, this.tabPosition, "0")
        .then((res) => {
          let data = res?.data ?? null;
          let yData = data?.xAxisData ?? [];
          let seiveData = data?.seriesData[0]?.data ?? [];
          this.serviceTop10Chart = { yData, seiveData, type: "line" };
        });
    },
    //魔盘下面的图表
    setDevilData() {
      this.getwriteBarData(this.magicDiskVal); //柱状图-线上细分产品
      this.getwriteBarData("top10"); //柱状图-魔盘投诉产品TOP10（月）
      this.getLineData(this.activeIndex); //业务健康度趋势图
    },
    getwriteBarData(type) {
      //柱状图-饼图
      let barType = "";
      if (type == "top10") {
        //魔盘投诉产品TOP10（月）
        barType = "D0054_6";
      } else if (type == "online-product") {
        //线上-细分产品
        barType = "D0054";
      } else if (type == "online-complain") {
        //线上-投诉原因
        barType = "D0054_2";
      } else if (type == "online-local") {
        //线上-本地异网
        barType = "D0054_4";
      } else if (type == "outline-product") {
        //线下-细分产品
        barType = "D0054_1";
      } else if (type == "outline-complain") {
        //线下-投诉原因
        barType = "D0054_3";
      } else if (type == "outline-local") {
        //线下-本地异网
        barType = "D0054_5";
      }
      this.$api.realTimeData.queryData(barType, this.areaCondition, "0").then((res) => {
        if (barType == "D0054_4" || barType == "D0054_5") {
          let data = res?.data?.data ?? [];
          data.map((item, index) => {
            if (index == 0) item.itemStyle = { color: "#5087ED" };
            else if (index == 1) item.itemStyle = { color: "#68BBC5" };
          });
          this.pieChartData.seiveData = data;
        } else {
          let data = res?.data ?? null;
          let yData = data?.xAxisData ?? [];
          if (type == "top10") {
            let seiveData = data?.seriesData ?? [];
            seiveData.forEach((item) => (item.value = item.mouth_rote));
            this.onLineDataTop10 = { yData, seiveData, type: "top" };
          } else {
            let seiveData = data?.seriesData[0]?.data ?? [];
            this.onLineData = { yData, seiveData, type: "line" };
          }
        }
      });
    },
    //业务健康度趋势图
    getLineData(type) {
      let searchCondition = "";
      if (type == 0) {
        //线上订购
        searchCondition = "D0054_7";
      } else if (type == 1) {
        searchCondition = "D0054_8";
      }
      this.$api.realTimeData
        .queryData(searchCondition, this.areaCondition, this.tabPosition, "1")
        .then((res) => {
          let xData = res?.data?.xData ?? [];
          let seiveData = res?.data?.seiveData ?? [];
          this.healthChartData = { xData, seiveData };
        });
    },
    /**
     * 柱状图数据加载
     */
    setBarData: function (str) {
      if (this.selectScene.id != 6 && this.selectScene.id != 15) {
        return;
      }
      let _this = this;
      let barMapTemp = {};
      barMapTemp = _this.barMap;

      for (let i in barMapTemp) {
        let barDataClone = _this.$commonUtil.cloneDeep(
          _this.$controlStyleTemp["barTemp"]
        );
        if (i == "daliangxiansu") {
          barDataClone.xChangeY = false;
          barDataClone.dimTextRotate = 13;
          barDataClone.gridTop = "10%";
          barDataClone.gridLeft = "3%";
          barDataClone.gridRight = "3%";
          barDataClone.height = "255px";
        }
        if (i == "daliangxiansu_month") {
          barDataClone.xChangeY = false;
          barDataClone.dimTextRotate = 13;
          barDataClone.gridTop = "10%";
          barDataClone.gridLeft = "3%";
          barDataClone.gridRight = "3%";
          barDataClone.height = "210px";
        }
        if (i == "goodGeneBad_month") {
          barDataClone.gridTop = "18%";
          barDataClone.gridLeft = "3%";
          barDataClone.gridRight = "3%";
          barDataClone.height = "230px";
        }
        barDataClone.barWidth = "13";
        barDataClone.stack = true;
        barDataClone.countTotal = true;

        barDataClone.userSpecialToolTip = true;

        barMapTemp[i].barLoading = true;
        _this.$api.realTimeData
          .queryData(barMapTemp[i].barSearchCondition, _this.areaCondition, "0")
          .then((response) => {
            let data = response.data;
            _this.recordQueryBarRest[i] = data;
            barDataClone.legendData = data.legendData;
            //  barDataClone.selected={"同比值":false,"环比值":false,"总量":false};
            if (i == "daliangxiansu") {
              barDataClone.color = [
                "rgba(74, 120, 232, 1)",
                "rgb(253,151,61)",
                "rgba(180,178,178,0.85)",
              ];
            }
            if (i == "daliangxiansu_month") {
              barDataClone.selected = { 占比: false };
              barDataClone.color = ["rgba(2,226,173,0.93)"];
            }

            barDataClone.xAxisData = data.xAxisData;
            barDataClone.showBackground = false;
            barDataClone.showxandy = false;
            barDataClone.showYSplitLine = false;
            barDataClone.seriesData = data.seriesData;
            barDataClone.userSpecialToolTip = true;

            if (i == "goodGeneBad_month") {
              // barDataClone.legendData=['优','良','差'];
              var dataList = data.seriesData;
              var seriesDataList = [];
              var rateDataList = [];
              for (let i = 0; i < dataList.length; i++) {
                if (
                  dataList[i].name == "优" ||
                  dataList[i].name == "良" ||
                  dataList[i].name == "差"
                ) {
                  seriesDataList.push(data.seriesData[i]);
                } else {
                  rateDataList.push(data.seriesData[i]);
                }
              }

              barDataClone.seriesData = seriesDataList;
              barDataClone.height = "150px";
              barDataClone.dimTextRotate = 0;
              barDataClone.userSpecialToolTip = false;
              barDataClone.showxandy = true;
              barDataClone.barCategoryGap = 50;
              barDataClone.seriesData[0].barGap = 0;
              barDataClone.tooltip = {
                //提示框组件
                trigger: "axis",
                axisPointer: {
                  type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
                },
                formatter: function (params) {
                  let name = params[0].name;
                  let res = name + "</br>";
                  for (let i = 0; i < params.length; i++) {
                    res = res + params[i].seriesName + ": ";
                    let rate = params[i].data + "%, ";
                    res = res + rate + rateDataList[i].data[params[i].dataIndex];
                    // let num = Math.round(sumArr[params[i].seriesIndex] * params[i].data / 100);
                    res = res + "<br>";
                  }
                  return res;
                },
              };
              barDataClone.stack = false;
              barDataClone.color = ["#5087EC", "#68BBC4", "#58A55C"];
              barDataClone.yAxis = [
                {
                  min: 0, //最小百分比
                  max: 100, //最大百分比
                  type: "value",
                  // name: '单位（%）',
                  nameGap: 35,
                  nameTextStyle: { color: "#666666" },
                  axisTick: { show: false },
                  axisLabel: {
                    show: true,
                    interval: 0, // 使x轴文字显示全
                    color: "#666666",
                    formatter: "{value}%", //y轴数值，带百分号
                  },
                  axisLine: { show: true, lineStyle: { color: "#dddddd" } },
                  splitLine: { lineStyle: { type: "dashed", color: "#eeeeee" } },
                },
              ];
            }
            if (i == "producetop10" && data.legendData.length > 0) {
              _this.selectproblem = data.xAxisData[data.xAxisData.length - 1];
            }
            if (i == "areasource") {
              barDataClone.height = data.xAxisData.length * 29 + "px";
            }
            barMapTemp[i].barData = barDataClone;
            barMapTemp[i].barLoading = false;
          })
          .catch((error) => {});
      }
    },
    goBackClick: function () {
      let _this = this;
      _this.mapNameNow = "四川省";
      _this.leveMapDown = 1;
      _this.areaCondition = "1";
      _this.areaChangeEvent();
    },
    /**
     * 设置刷新数据的时间
     */
    setSearchTime: function () {
      function format(Date) {
        var Y = Date.getFullYear();
        var M = Date.getMonth() + 1;
        M = M < 10 ? "0" + M : M; // 不够两位补充0
        var D = Date.getDate();
        D = D < 10 ? "0" + D : D;
        var H = Date.getHours();
        H = H < 10 ? "0" + H : H;
        var Mi = Date.getMinutes();
        Mi = Mi < 10 ? "0" + Mi : Mi;
        var S = Date.getSeconds();
        S = S < 10 ? "0" + S : S;
        return Y + "-" + M + "-" + D + " " + H + ":" + Mi + ":" + S;
      }
      var nowDate = new Date();
      this.searchTime = format(nowDate);
    },
    gotoDownLoad: function (type, orderType) {
      let _this = this;
      orderType && (this.orderType = orderType);
      let reportname = this.downloadUrlName[this.selectScene.id];
      //上下都是报表的
      if (
        _this.tabPosition == 13 ||
        _this.tabPosition == 14 ||
        _this.tabPosition == 17 ||
        _this.tabPosition == 18 ||
        _this.tabPosition == 19 ||
        _this.tabPosition == 20
      ) {
        if (type == "upTable" && (_this.tabPosition == 13 || _this.tabPosition == 20)) {
          reportname = this.downloadUrlName[this.selectScene.id][type][_this.orderType];
        } else {
          reportname = this.downloadUrlName[this.selectScene.id][type];
        }
      }
      _this.$api.realTimeData.toshowpageFromIfram(reportname, this.gotodownloadPageItem);
    },
    showBigScreen: function () {
      /* import screenfull from 'screenfull'
          screenfull.request(document.getElementById("fwIframe"))*/
      window.open("#/bigScreen/realTimeData?single=true");
    },
    //下钻地图事件
    areaChangeEvent: function () {
      this.queryKeySceneData();
      this.setMapData(this.mapData);
      this.setLineData();
      this.setTableData();
      this.setBarData();
      this.setCarryForward();
    },
    //顶部维度切换事件
    tabPositionChangeEvent: function () {
      if (this.selectScene.eg) {
        let emptyTable = this.$commonUtil.cloneDeep(this.$controlStyleTemp["tableTemp"]);
        emptyTable.tableHeight = 320;
        this.talbeMap.shebei.tableData = emptyTable;
        this.talbeMap.baoqu.tableData = emptyTable;
        this.tableData = emptyTable;

        let emptyLine = this.$commonUtil.cloneDeep(this.$controlStyleTemp["lineTemp"]);
        this.lineMap.daliangxiansuyj.lineData = emptyLine;
        this.lineMap.daliangxiansuyhs.lineData = emptyLine;
        this.lineData = emptyLine;
        this.setMapData();
        this.$message("敬请期待!");
        return;
      }
      if (this.tabPosition == 20) {
        this.setDevilData();
      } else if (this.tabPosition == 22) {
        this.setCarryForward();
        this.setMapData();
        this.setTableData();
      } else if (this.tabPosition != 9 && this.tabPosition != 10) {
        this.setMapData();
        this.setLineData();
        this.setBarData();
        this.setTableData();
      }
    },
    positionChange: function (val) {
      let _this = this;
      let monitorScenes = _this.monitorScenesKpiData;
      if (monitorScenes.length > 0) {
        _this.monitorScenesKpi = [[]];
        let rowIndex = 0;
        for (let i = 0, len = monitorScenes.length; i < len; i++) {
          if (
            _this.mainPositionScenes[val].scenes &&
            _this.mainPositionScenes[val].scenes.indexOf(monitorScenes[i].id) >= 0
          ) {
            _this.monitorScenesKpi[rowIndex].push(monitorScenes[i]);
          }
          if (
            i > 0 &&
            _this.monitorScenesKpi[rowIndex].length != 0 &&
            _this.monitorScenesKpi[rowIndex].length % 5 == 0
          ) {
            _this.monitorScenesKpi.push([]);
            rowIndex++;
          }
        }
        _this.selectScene = _this.monitorScenesKpi[0][0];
        _this.changeScene(_this.selectScene);
      }
      console.log("this.monitorScenesKpi8888", this.monitorScenesKpi);
    },
  },
  computed: {
    classObjectForFangkuai: function () {
      return {
        active: this.isActive,
      };
    },
  },
  watch: {
    orderType: {
      handler(newvalue, oldvalue) {
        let _this = this;
        if (_this.selectScene.id == "13") {
          _this.talbeMap.huifang_yx.tableSearchCondition =
            _this.targetOptions[newvalue].tableSearchCondition[_this.selectScene.id];
        } else if (_this.selectScene.id == "14") {
          _this.talbeMap.huifang_wx.tableSearchCondition =
            _this.targetOptions[1].tableSearchCondition[_this.selectScene.id];
        }
        _this.setTableData();
        _this.setMapData();
      },
      deep: true,
    },
    "goldServiceType.otherType": {
      handler(newvalue, oldvalue) {
        let newList = [];
        newList.push(newvalue);
        this.goldServiceType.currIdList = newList;
        this.setTableData();
      },
      deep: true,
    },
  },
};
</script>

<style scoped>
.grid-content ::v-deep .header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.grid-content ::v-deep .header-content > .split-choose {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.grid-content ::v-deep .header-content > .tab-bar {
  display: flex;
  align-items: center;
  justify-content: center;
}
.grid-content ::v-deep .header-content > .tab-bar > .default-bar {
  padding: 6px 15px 5px 15px;
  border-radius: 4px;
  cursor: pointer;
  box-sizing: border-box;
  border: 1px solid #dadada;
  color: #333;
  background-color: #ebedef;
  font-size: 12px;
  margin-right: 10px;
}
.grid-content ::v-deep .header-content > .tab-bar > .active-class {
  color: #fff;
  background-color: #4498ec;
}
.grid-content ::v-deep .header-content .el-input--small {
  font-size: 10px;
}
.grid-content ::v-deep .header-content .el-input__inner {
  height: 28px !important;
  line-height: 28px !important;
}

.position-line {
  position: absolute;
  left: 5px;
  top: 5px;
  font-size: 14px;
  color: red;
}
.mainBody {
  width: 100%;
  height: 100%;
  background-color: #e1e1e1;
}
/deep/ .el-card__header {
  padding: 5px 20px;
  border-bottom: 1px solid #ebeef5;
  box-sizing: border-box;
  height: 40px;
}
.el-card__header span {
  line-height: 30px;
}
/deep/ .el-card__body {
  padding: 5px;
  height: 87%;
}
.top {
  width: 100%;
  padding: 5px;
  height: 20%;
}
.foot {
  width: 100%;
  padding: 0px 5px 5px;
  height: 800px;
}
.foot-top {
  height: 100%;
}
.foot-top-2 {
  height: 62%;
}
.foot-bottom {
  height: 55%;
  margin-top: 5px;
}
.foot-bottom-2 {
  height: 50%;
  margin-top: 5px;
}
.foot-left {
  height: 100%;
}
.foot-left-2 {
  height: 142.3%;
}
.fangkuaiForCantClick {
  width: 90%;
  background-color: rgba(0, 174, 255, 1);
  border-radius: 3px;
  margin-left: 5%;
  color: #fff;
  padding: 2px 5px;
}
.fangkuai {
  width: 90%;
  background-color: rgba(74, 120, 232, 1);
  border-radius: 3px;
  margin-left: 5%;
  color: #fff;
  padding: 2px 5px;
  cursor: pointer;
}
.businessTarget {
  width: 45%;
  text-align: center;
  /* background-color: rgba(74, 120, 232, 1); */
  border-radius: 3px;
  margin-left: 5%;
  color: #fff;
  padding: 2px 5px;
  cursor: pointer;
  float: left;
  line-height: 22px;
}
.fangkuaiSelected {
  background-color: rgba(0, 218, 168, 1);
}
.el-row {
  margin-bottom: 5px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #e1e1e100;
}
.bg-purple {
  background: #e1e1e1;
  height: 457px;
  padding: 0px 5px 0px 0px;
}
.bg-purple-light {
  background: #e1e1e1;
  height: 457px;
}
.bg-purple-2 {
  background: #e1e1e1;
  height: 412px;
  padding: 0px 5px 0px 0px;
}
.bg-purple-2-light {
  background: #e1e1e1;
  height: 412px;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 5px 0;
  background-color: #f9fafc;
}
.map-go-back {
  color: #0d74eb;
  text-decoration: underline;
  margin-left: 5px;
}
.spanstyleTitle {
  display: block;
  font-size: 14px;
}
.spanstyleValue {
  display: block;
}
.numberExplan {
  font-size: 12px;
}
.spanstyleValueNumber {
  display: block;
  font-size: 20px;
}
.iconStyle {
  float: left;
  position: relative;
  left: 8%;
  top: 10px;
}
.gobackdiv {
  display: inline-block;
  margin-left: -10px;
}
/deep/.el-carousel__button {
  background-color: #9e9e9e;
  height: 50px;
  width: 3px;
}
.downloadStyle {
  background-color: rgb(74, 120, 232);
  border-radius: 3px;
  color: white;
  float: right;
  margin-top: 3px;
  padding: 4px;
  cursor: pointer;
}
.showBigScreen {
  background-color: rgb(74, 120, 232);
  border-radius: 3px;
  color: white;
  margin-top: -5px;
  padding: 4px;
  cursor: pointer;
  font-size: 15px;
}
.el-col-1883 {
  width: 18.83333%;
}
</style>
