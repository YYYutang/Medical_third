<template>
  <div>
    <div>
      <h3 v-if="showPage == 0">选择数据</h3>
      <h3 v-if="showPage == 1">选择算法</h3>
      <h3 v-if="showPage == 2">结果展示</h3>
      <el-divider></el-divider>
    </div>
    <el-main class="stepMain">
      <div id="step" v-show="showStep">
        <el-steps :active="active" align-center>
          <el-step title="选择数据"></el-step>
          <el-step title="选择算法"></el-step>
        </el-steps>
      </div>
      <div class="stepcontain" v-show="showStep">
        <datachoose
          :value.sync="active"
          :active="active"
          v-on:getTableName1="getTableName1"
          v-if="showPage == 0"
        ></datachoose>
        <algoChoose
          :value.sync="active"
          :active="active"
          v-if="showPage == 1"
          v-on:getAlgo="getAlgo"
        >
        </algoChoose>
      </div>
      <outcome
        v-if="showPage == 2"
        :active="active"
        :chooseTable="chooseTable"
        :list="list"
      ></outcome>
    </el-main>
  </div>
</template>

<script>
import datachoose from "@/components/dataChoose/index.vue";
import algoChoose from "@/components/algoChoose/index.vue";
import outcome from "@/views/featureExtract/outcome.vue";
export default {
  components: {
    DataView,
    datachoose,
    algoChoose,
    outcome,
  },
  data() {
    return {
      active: 0,
      showPage: 0,
      showStep: true,
      chooseTable: "",
      peopleOptions: [],
      medicalOptions: [],
      behaviorOptions: [],
      chooseColumns: [],

      list: { tableName: "", aiName: "", runParams: ["Case_ID", "AGE", "SEX"] },
      forminline: [],
      outcome: [],
    };
  },
  methods: {
    getTableName1(chooseTable) {
      this.list.tableName = chooseTable;
      
    },
    getpeopleOptions(peopleOptions) {
      this.peopleOptions = peopleOptions;
    },
    getmedicalOptions(medicalOptions) {
      this.medicalOptions = medicalOptions;
    },
    getbehaviorOptions(behaviorOptions) {
      this.behaviorOptions = behaviorOptions;
    },
    getAlgo(algo1) {
      this.list.aiName = algo1+1;
    },
    getOutcome(outcome) {
      this.outcome = outcome;
    },
    getFormInline(forminline) {
      this.forminline = forminline;
    },
  },
  watch: {
    active: {
      handler(newValue, oldValue) {
        this.showPage = newValue;
        if (newValue == 2) {
          this.showStep = false;
        }
      },
    },
  },
};
</script>

<style>
.stepMain {
  display: flex;
  align-content: center;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 100%;
}
</style>