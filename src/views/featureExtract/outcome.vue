<template>
  <div class="container" v-loading="show">
    <div class="block">
      <span class="demonstration">请选择要查看的排名前k的特征</span>
      <el-slider
        v-model="chooseK"
        :max="countNum"
        @change="changeShow"
      ></el-slider>
    </div>
    <div class="main">
      <div class="left_right_contain">
        <div class="table" v-if="dataShow.length != 0" v-loading="isload">
          <el-table
            :data="dataShow"
            style="width: auto; max-width: 1100px; margin-top: 20px"
            :row-style="{ height: '33px', lineHeight: '10px', padding: '0px' }"
            :header-cell-style="{
              background: '#58AAFF',
              color: '#fff',
              lineHeight: '12px',
              padding: '0px',
              height: '34px',
              textAlign: 'center',
            }"
            stripe
          >
            <el-table-column
              v-for="(item, index) in dataColumn"
              :key="index"
              :label="item"
              :prop="item"
              width="150"
            >
            </el-table-column>
          </el-table>
          <div class="pagination">
            <el-pagination
              background
              class="pagination"
              layout="prev, pager, next"
              :current-page="currentPage"
              @current-change="changePage"
              :total="allPage"
            >
            </el-pagination>
          </div>
        </div>
      </div>
      <div class="left_right_contain">
        <div id="barChart" style="height: 600px; width: 800px"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { getRequest, downLoadPostRequest, postRequest } from "@/utils/api";
import * as echarts from "echarts";
export default {
  props: ["list","active"],
  data() {
    return {
      dataShow: [],
      show: true,
      dataColumn: [],
      currentPage: 1,
      allPage: 0,
      notice: [],
      isload: false,
      chooseK: 0,
      countNum: 0,
      data:[],
    };
  },
  methods: {
    changePage(val) {
      this.currentPage = val;
      this.isload = true;
      postRequest(
        "feature/peopleSplit?tableName=discretized_table&numOfSamples=" +
          this.forminline.count +
          "&sicknessRate=" +
          this.forminline.illRate +
          "&pageNum=" +
          val
      ).then((response) => {
        this.dataShow = response.data["原表结果"];
        this.isload = false;
      });
    },
    drawChart() {
      var chartDom = document.getElementById("barChart");
      var myChart = echarts.init(chartDom);
      var option;
      option = {
        title: {
          text: "特征权重",
          left: "center",
        },
        xAxis: {
          type: "value",
          position: "top",
          splitLine: {
            lineStyle: {
              type: "dashed",
            },
          },
        },
        yAxis: {
          type: "category",
          data: this.dataShow.map((item) => item.Feature),
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },

        series: [
          {
            name: " Weight",
            type: "bar",
            stack: "Total",
            label: {
              show: true,
              formatter: "{b}",
            },
            data: this.dataShow.map((item) => item.Weight),
          },
        ],
      };

      option && myChart.setOption(option);
    },
    dealNotice() {
      console.log(this.list)
      postRequest("featureExtraction/runPy",this.list).then((response) => {
        this.data=response.data;
        const temp = response.data.map((item) => {
        const keys = Object.keys(item);
        return {
          [keys[0]]: item[keys[0]],
          [keys[1]]: item[keys[1]],
        };
      });
      this.dataShow = temp;
      this.countNum = temp.length;
      this.dataColumn = Object.keys(temp[0]);
        this.drawChart();
          this.show = false;
      });
      
    },

    dealOutcome(index) {
      this.dataShow = this.outcome.data["原表结果"];
      this.allPage = this.outcome.total * 10;
    },
    changeShow(e) {
      this.dataShow = this.data.slice(0, e);
      this.drawChart();
    },
  },
  mounted() {
    this.dealNotice();
  
  },
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
}
.block {
  width: 60%;
}
.main {
  width: 100%;
  height: 100%; /* 100% 视口高度，使容器充满整个视口 */
  display: flex;
  flex-direction: row;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
}
.left_right_contain {
  float: left;
}
.table {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}
.pagination {
  margin-top: 20px;
}
#barChart {
  margin-left: 40px;
}
</style>