<template>
  <div>
    <div class="algo_container">
      <span>请选择算法 </span>
      <el-form :rules="rules" ref="ruleForm" :model="ruleForm">
        <el-form-item prop="chooseAlgo">
          <el-row :gutter="60">
            <br />
            <h5 class="text">无监督类算法</h5>

            <el-radio-group v-model="ruleForm.chooseAlgo" prop="chooseAlgo">
              <el-col :span="8" v-for="item in algoOptions1" :key="item.value">
                <el-radio :label="item.value" border>{{
                  item.algoName
                }}</el-radio>
              </el-col>
            </el-radio-group>
            <br />
            <h5 class="text">有监督类算法</h5>

            <el-radio-group v-model="ruleForm.chooseAlgo" prop="chooseAlgo">
              <el-col :span="8" v-for="item in algoOptions2" :key="item.value">
                <el-radio :label="item.value" border>{{
                  item.algoName
                }}</el-radio>
              </el-col>
            </el-radio-group>
            <br />
            <h5 class="text">深度学习算法</h5>

            <el-radio-group v-model="ruleForm.chooseAlgo" prop="chooseAlgo">
              <el-col
                :span="9"
                v-for="item in algoOptions3"
                :key="item.value"
                style="marigin-right: 5px"
              >
                <el-radio :label="item.value" border>{{
                  item.algoName
                }}</el-radio>
              </el-col>
            </el-radio-group>
          </el-row>
        </el-form-item>
      </el-form>
    </div>
    <div class="button">
      <el-button @click="returnPreActive">上一步</el-button>
      <el-button type="primary" @click="returnActive('ruleForm')"
        >下一步</el-button
      >
    </div>
  </div>
</template>

<script>
import { getRequest, postRequest } from "@/utils/api";
import axios from "axios";
import storage from "@/utils/storage";
export default {
  name: "algoChoose",
  props: ["active"],
  data() {
    return {
      tableData: [],
      ruleForm: {
        chooseAlgo: "",
      },
      rules: {
        chooseAlgo: [
          {
            required: true,
            message: "请选择算法",
            trigger: "change",
          },
        ],
      },
      algoOptions1: [
        {
          id: 1,
          algoName: "随机森林",
          value: "randomForest",
        },
        {
          id: 2,
          algoName: "PCA(主成分分析)",
          value: "pca",
        },
        {
          id: 3,
          algoName: "因子分析",
          value: "factor",
        },
      ],
      algoOptions2: [
        {
          id: 4,
          algoName: "LDA(线性判别分析)",
          value: "lda",
        },
        {
          id: 5,
          algoName: "稀疏表示学习",
          value: "represent",
        },
        {
          id: 6,
          algoName: "神经网络",
          value: "ann",
        },
      ],
      algoOptions3: [
        {
          id: 7,
          algoName: "CNN(卷积神经网络)",
          value: "cnn",
        },
        {
          id: 8,
          algoName: "RNN(循环神经网络)",
          value: "rnn",
        },
      ],
    };
  },
  methods: {
    returnPreActive() {
      let tempActive = this.active;
      tempActive = Number(tempActive) - 1;
      this.$emit("update:value", tempActive);
    },
    returnActive(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let tempActive = this.active;
          this.$emit("getAlgo", this.ruleForm.chooseAlgo);
          tempActive = Number(tempActive) + 1;
          this.$emit("update:value", tempActive);
        }
      });
    },
  },
};
</script>

<style>
.algo_container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top:20px
}

.button {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.text {
  font-size: 16px;
}
</style>