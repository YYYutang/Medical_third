<template>
  <div>
    <div>
      <h3 v-if="showPage == 0">选择数据</h3>
      <h3 v-if="showPage == 1">选择数据</h3>
      <h3 v-if="showPage == 2">选择算法</h3>
      <h3 v-if="showPage == 3">结果展示</h3>
      <el-divider></el-divider>
    </div>
    <el-main class="stepMain">
      <div id="step" v-show="showStep">
        <el-steps :active="active" align-center>
          <el-step title="选择数据一"></el-step>
          <el-step title="选择数据二"></el-step>
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
        <datachoose
          :value.sync="active"
          :active="active"
          v-on:getTableName2="getTableName2"
          v-if="showPage == 1"
        ></datachoose>
        <algoChoose
          :value.sync="active"
          :active="active"
          v-if="showPage == 2"
          v-on:getAlgo="getAlgo"
        >
        </algoChoose>
      </div>
      <outcome
        v-if="showPage == 3"
        :list="list"
      ></outcome>
    </el-main>
  </div>
</template>

<script>
import datachoose from "@/components/dataChoose/index.vue";
import algoChoose from "@/components/algoChoose/index.vue";
import outcome from "@/views/MultiefeatureExtract/outcome.vue";
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
      chooseTable1: "",
      chooseTable2: "",
      peopleOptions: [],
      medicalOptions: [],
      behaviorOptions: [],
      chooseColumns: [],
      algo1: "",
      list: {
        tableName1: "",
        tableName2: "",
        aiName: "",
        runParams: ["Case_ID", "AGE", "SEX"],
      },
      forminline: [],
      outcome: [],
    };
  },
  methods: {
    getTableName1(chooseTable) {
      this.list.tableName1 = chooseTable;
      console.log(chooseTable)
    },
    getTableName2(chooseTable) {
      this.list.tableName2 = chooseTable;
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
    getListvalue(list) {
      console.log(list);
      this.list = list;
    },

    getAlgo(algo) {
      this.list.aiName = algo;

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
        if (newValue == 3) {
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