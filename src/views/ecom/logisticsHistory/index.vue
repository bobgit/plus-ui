<template>
  <div class="p-2">
    <transition :enter-active-class="proxy?.animate.searchAnimate.enter" :leave-active-class="proxy?.animate.searchAnimate.leave">
      <div v-show="showSearch" class="mb-[10px]">
        <el-card shadow="hover">
          <el-form ref="queryFormRef" :model="queryParams" :inline="true">
            <el-form-item label="跟踪ID" prop="historyId">
              <el-input v-model="queryParams.historyId" placeholder="请输入跟踪ID" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="订单ID" prop="orderId">
              <el-input v-model="queryParams.orderId" placeholder="请输入订单ID" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="节点时间" prop="nodeTime">
              <el-date-picker clearable
                v-model="queryParams.nodeTime"
                type="date"
                value-format="YYYY-MM-DD"
                placeholder="请选择节点时间"
              />
            </el-form-item>
            <el-form-item label="节点状态" prop="nodeStatus">
              <el-select v-model="queryParams.nodeStatus" placeholder="请选择节点状态" clearable >
                <el-option v-for="dict in logistics_status" :key="dict.value" :label="dict.label" :value="dict.value"/>
              </el-select>
            </el-form-item>
            <el-form-item label="操作人" prop="operator">
              <el-input v-model="queryParams.operator" placeholder="请输入操作人" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" icon="Search" @click="handleQuery">搜索</el-button>
              <el-button icon="Refresh" @click="resetQuery">重置</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </div>
    </transition>

    <el-card shadow="never">
      <template #header>
        <el-row :gutter="10" class="mb8">
          <el-col :span="1.5">
            <el-button type="primary" plain icon="Plus" @click="handleAdd" v-hasPermi="['ecom:logisticsHistory:add']">新增</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="success" plain icon="Edit" :disabled="single" @click="handleUpdate()" v-hasPermi="['ecom:logisticsHistory:edit']">修改</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="danger" plain icon="Delete" :disabled="multiple" @click="handleDelete()" v-hasPermi="['ecom:logisticsHistory:remove']">删除</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="warning" plain icon="Download" @click="handleExport" v-hasPermi="['ecom:logisticsHistory:export']">导出</el-button>
          </el-col>
          <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
        </el-row>
      </template>

      <el-table v-loading="loading" border :data="logisticsHistoryList" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column label="跟踪ID" align="center" prop="historyId" v-if="true" />
        <el-table-column label="订单ID" align="center" prop="orderId" />
        <el-table-column label="节点时间" align="center" prop="nodeTime" width="180">
          <template #default="scope">
            <span>{{ parseTime(scope.row.nodeTime, '{y}-{m}-{d}') }}</span>
          </template>
        </el-table-column>
        <el-table-column label="节点状态" align="center" prop="nodeStatus">
          <template #default="scope">
            <dict-tag :options="logistics_status" :value="scope.row.nodeStatus"/>
          </template>
        </el-table-column>
        <el-table-column label="节点位置JSON" align="center" prop="nodeLocation" />
        <el-table-column label="操作人" align="center" prop="operator" />
        <el-table-column label="备注" align="center" prop="remark" />
        <el-table-column label="操作" align="center" fixed="right"  class-name="small-padding fixed-width">
          <template #default="scope">
            <el-tooltip content="修改" placement="top">
              <el-button link type="primary" icon="Edit" @click="handleUpdate(scope.row)" v-hasPermi="['ecom:logisticsHistory:edit']"></el-button>
            </el-tooltip>
            <el-tooltip content="删除" placement="top">
              <el-button link type="primary" icon="Delete" @click="handleDelete(scope.row)" v-hasPermi="['ecom:logisticsHistory:remove']"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <pagination v-show="total > 0" :total="total" v-model:page="queryParams.pageNum" v-model:limit="queryParams.pageSize" @pagination="getList" />
    </el-card>
    <!-- 添加或修改物流跟踪记录对话框 -->
    <el-dialog :title="dialog.title" v-model="dialog.visible" width="500px" append-to-body>
      <el-form ref="logisticsHistoryFormRef" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="订单ID" prop="orderId">
          <el-input v-model="form.orderId" placeholder="请输入订单ID" />
        </el-form-item>
        <el-form-item label="节点时间" prop="nodeTime">
          <el-date-picker clearable
            v-model="form.nodeTime"
            type="datetime"
            value-format="YYYY-MM-DD HH:mm:ss"
            placeholder="请选择节点时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="节点状态" prop="nodeStatus">
          <el-select v-model="form.nodeStatus" placeholder="请选择节点状态">
            <el-option
                v-for="dict in logistics_status"
                :key="dict.value"
                :label="dict.label"
                :value="dict.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="节点位置JSON">
          <editor v-model="form.nodeLocation" :min-height="192"/>
        </el-form-item>
        <el-form-item label="操作人" prop="operator">
          <el-input v-model="form.operator" placeholder="请输入操作人" />
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="form.remark" placeholder="请输入备注" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button :loading="buttonLoading" type="primary" @click="submitForm">确 定</el-button>
          <el-button @click="cancel">取 消</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup name="LogisticsHistory" lang="ts">
import { listLogisticsHistory, getLogisticsHistory, delLogisticsHistory, addLogisticsHistory, updateLogisticsHistory } from '@/api/ecom/logisticsHistory';
import { LogisticsHistoryVO, LogisticsHistoryQuery, LogisticsHistoryForm } from '@/api/ecom/logisticsHistory/types';

const { proxy } = getCurrentInstance() as ComponentInternalInstance;
const { logistics_status } = toRefs<any>(proxy?.useDict('logistics_status'));

const logisticsHistoryList = ref<LogisticsHistoryVO[]>([]);
const buttonLoading = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const ids = ref<Array<string | number>>([]);
const single = ref(true);
const multiple = ref(true);
const total = ref(0);

const queryFormRef = ref<ElFormInstance>();
const logisticsHistoryFormRef = ref<ElFormInstance>();

const dialog = reactive<DialogOption>({
  visible: false,
  title: ''
});

const initFormData: LogisticsHistoryForm = {
  historyId: undefined,
  orderId: undefined,
  nodeTime: undefined,
  nodeStatus: undefined,
  nodeLocation: undefined,
  operator: undefined,
  remark: undefined,
}
const data = reactive<PageData<LogisticsHistoryForm, LogisticsHistoryQuery>>({
  form: {...initFormData},
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    historyId: undefined,
    orderId: undefined,
    nodeTime: undefined,
    nodeStatus: undefined,
    nodeLocation: undefined,
    operator: undefined,
    params: {
    }
  },
  rules: {
    historyId: [
      { required: true, message: "跟踪ID不能为空", trigger: "blur" }
    ],
    orderId: [
      { required: true, message: "订单ID不能为空", trigger: "blur" }
    ],
    nodeTime: [
      { required: true, message: "节点时间不能为空", trigger: "blur" }
    ],
    nodeStatus: [
      { required: true, message: "节点状态不能为空", trigger: "change" }
    ],
  }
});

const { queryParams, form, rules } = toRefs(data);

/** 查询物流跟踪记录列表 */
const getList = async () => {
  loading.value = true;
  const res = await listLogisticsHistory(queryParams.value);
  logisticsHistoryList.value = res.rows;
  total.value = res.total;
  loading.value = false;
}

/** 取消按钮 */
const cancel = () => {
  reset();
  dialog.visible = false;
}

/** 表单重置 */
const reset = () => {
  form.value = {...initFormData};
  logisticsHistoryFormRef.value?.resetFields();
}

/** 搜索按钮操作 */
const handleQuery = () => {
  queryParams.value.pageNum = 1;
  getList();
}

/** 重置按钮操作 */
const resetQuery = () => {
  queryFormRef.value?.resetFields();
  handleQuery();
}

/** 多选框选中数据 */
const handleSelectionChange = (selection: LogisticsHistoryVO[]) => {
  ids.value = selection.map(item => item.historyId);
  single.value = selection.length != 1;
  multiple.value = !selection.length;
}

/** 新增按钮操作 */
const handleAdd = () => {
  reset();
  dialog.visible = true;
  dialog.title = "添加物流跟踪记录";
}

/** 修改按钮操作 */
const handleUpdate = async (row?: LogisticsHistoryVO) => {
  reset();
  const _historyId = row?.historyId || ids.value[0]
  const res = await getLogisticsHistory(_historyId);
  Object.assign(form.value, res.data);
  dialog.visible = true;
  dialog.title = "修改物流跟踪记录";
}

/** 提交按钮 */
const submitForm = () => {
  logisticsHistoryFormRef.value?.validate(async (valid: boolean) => {
    if (valid) {
      buttonLoading.value = true;
      if (form.value.historyId) {
        await updateLogisticsHistory(form.value).finally(() =>  buttonLoading.value = false);
      } else {
        await addLogisticsHistory(form.value).finally(() =>  buttonLoading.value = false);
      }
      proxy?.$modal.msgSuccess("操作成功");
      dialog.visible = false;
      await getList();
    }
  });
}

/** 删除按钮操作 */
const handleDelete = async (row?: LogisticsHistoryVO) => {
  const _historyIds = row?.historyId || ids.value;
  await proxy?.$modal.confirm('是否确认删除物流跟踪记录编号为"' + _historyIds + '"的数据项？').finally(() => loading.value = false);
  await delLogisticsHistory(_historyIds);
  proxy?.$modal.msgSuccess("删除成功");
  await getList();
}

/** 导出按钮操作 */
const handleExport = () => {
  proxy?.download('ecom/logisticsHistory/export', {
    ...queryParams.value
  }, `logisticsHistory_${new Date().getTime()}.xlsx`)
}

onMounted(() => {
  getList();
});
</script>
