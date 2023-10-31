import Vue from 'vue'
import Vuex from 'vuex'
import storage from '../utils/storage'
import taskModule from "./taskModule";
import { getRequest } from "@/utils/api.js";
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    toolBar : true,
    allTableData:[],
    allColumnData:[],
    dataList: [],
    taskList: [],
    modelList: [],
  },
  getters: {
    getAllTableData(state){
      state.allTableData=storage.get("allTableData");
      return state.allTableData;
    },
    getAllColumnData(state){
      state.allTableData=storage.get("allColumnData");
      console.log(this.allColumnData)
      return state.allColumnData;
    },
     // 获取有数据的疾病列表
     dataDisList(state) {
      let newArray = [];
      state.dataList.forEach(({ disease }) => {
        if (newArray.indexOf(disease) === -1) {
          //去重
          newArray.push(disease);
        }
      });
      return newArray;
    },

    dataCreatorList(state) {
      let newArray = [];
      state.dataList.forEach(({ creator }) => {
        if (newArray.indexOf(creator) === -1) {
          //去重
          newArray.push(creator);
        }
      });
      return newArray;
    },

    taskLeaderList(state) {
      let newArray = [];
      state.taskList.forEach(({ leader }) => {
        if (newArray.indexOf(leader) === -1) {
          //去重
          newArray.push(leader);
        }
      });
      return newArray;
    },
    taskDiseaseList(state) {
      let newArray = [];
      state.taskList.forEach(({ disease }) => {
        if (newArray.indexOf(disease) === -1) {
          //去重
          newArray.push(disease);
        }
      });
      return newArray;
    },
  },
  mutations: {
    changeToolBar(state) {
      state.toolBar = !state.toolBar
      state.toolBar = !state.toolBar
    },
    setAllTableData(state,allTableData){
      state.allTableData=allTableData
      
    },
    setAllColumnData(state,allColumnData){
      state.allColumnData=allColumnData;
      console.log(this.allColumnData)
    },
    SetDataList(state, value) {
      state.dataList = value;
    },
    SetTaskList(state, value) {
      state.taskList = value;
    },
    SetModelList(state, value) {
      state.modelList = value;
    },
  },
  actions: {
    getDataList(context) {
      getRequest("/DataTable/upall")
        .then((res) => {
          context.commit("SetDataList", res.reverse());
        })
        .catch((err) => {
          console.log("数据列表获取错误，请联系管理员。");
          console.log(err);
        });
    },
    getTaskList(context) {
      getRequest("/Task/all")
        .then((res) => {
          context.commit("SetTaskList", res.reverse());
        })
        .catch((err) => {
          console.log("任务列表获取错误，请联系管理员。");
          console.log(err);
        });
    },
    getModelList(context) {
      getRequest("/Model/all")
        .then((res) => {
          context.commit("SetModelList", res);
        })
        .catch((err) => {
          console.log("模型列表获取错误，请联系管理员。");
          console.log(err);
        });
    },
  },
  modules: {
    disFactor: taskModule,
    f_Factor: taskModule,
    factorDis: taskModule,
  }
})
