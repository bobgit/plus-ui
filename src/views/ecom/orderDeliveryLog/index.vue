<template>
  <div class="p-2">
    <transition :enter-active-class="proxy?.animate.searchAnimate.enter" :leave-active-class="proxy?.animate.searchAnimate.leave">
      <div v-show="showSearch" class="mb-[10px]">
        <el-card shadow="hover">
          <el-form ref="queryFormRef" :model="queryParams" :inline="true">
            <el-form-item label="外卖配送Id" prop="deliveryId">
              <el-input v-model="queryParams.deliveryId" placeholder="请输入外卖配送Id" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="订单ID" prop="orderId">
              <el-input v-model="queryParams.orderId" placeholder="请输入订单ID" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="状态变更原因" prop="changeReason">
              <el-input v-model="queryParams.changeReason" placeholder="请输入状态变更原因" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="操作类型" prop="operatorType">
              <el-select v-model="queryParams.operatorType" placeholder="请选择操作类型" clearable >
                <el-option v-for="dict in operator_type" :key="dict.value" :label="dict.label" :value="dict.value"/>
              </el-select>
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
            <el-button type="primary" plain icon="Plus" @click="handleAdd" v-hasPermi="['ecom:orderDeliveryLog:add']">新增</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="success" plain icon="Edit" :disabled="single" @click="handleUpdate()" v-hasPermi="['ecom:orderDeliveryLog:edit']">修改</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="danger" plain icon="Delete" :disabled="multiple" @click="handleDelete()" v-hasPermi="['ecom:orderDeliveryLog:remove']">删除</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="warning" plain icon="Download" @click="handleExport" v-hasPermi="['ecom:orderDeliveryLog:export']">导出</el-button>
          </el-col>
          <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
        </el-row>
      </template>

      <el-table v-loading="loading" border :data="orderDeliveryLogList" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column label="配送日志Id" align="center" prop="deliveryLogId" v-if="true" />
        <el-table-column label="外卖配送Id" align="center" prop="deliveryId" />
        <el-table-column label="订单ID" align="center" prop="orderId" />
        <el-table-column label="起初状态" align="center" prop="fromStatus" />
        <el-table-column label="目前状态" align="center" prop="toStatus" />
        <el-table-column label="状态变更原因" align="center" prop="changeReason" />
        <el-table-column label="操作类型" align="center" prop="operatorType">
          <template #default="scope">
            <dict-tag :options="operator_type" :value="scope.row.operatorType"/>
          </template>
        </el-table-column>
        <el-table-column label="备注" align="center" prop="remark" />
        <el-table-column label="操作" align="center" fixed="right"  class-name="small-padding fixed-width">
          <template #default="scope">
            <el-tooltip content="修改" placement="top">
              <el-button link type="primary" icon="Edit" @click="handleUpdate(scope.row)" v-hasPermi="['ecom:orderDeliveryLog:edit']"></el-button>
            </el-tooltip>
            <el-tooltip content="删除" placement="top">
              <el-button link type="primary" icon="Delete" @click="handleDelete(scope.row)" v-hasPermi="['ecom:orderDeliveryLog:remove']"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <pagination v-show="total > 0" :total="total" v-model:page="queryParams.pageNum" v-model:limit="queryParams.pageSize" @pagination="getList" />
    </el-card>
    <!-- 添加或修改配送状态变更日志对话框 -->
    <el-dialog :title="dialog.title" v-model="dialog.visible" width="500px" append-to-body>
      <el-form ref="orderDeliveryLogFormRef" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="外卖配送Id" prop="deliveryId">
          <el-input v-model="form.deliveryId" placeholder="请输入外卖配送Id" />
        </el-form-item>
        <el-form-item label="订单ID" prop="orderId">
          <el-input v-model="form.orderId" placeholder="请输入订单ID" />
        </el-form-item>
        <el-form-item label="状态变更原因" prop="changeReason">
          <el-input v-model="form.changeReason" placeholder="请输入状态变更原因" />
        </el-form-item>
        <el-form-item label="操作类型" prop="operatorType">
          <el-select v-model="form.operatorType" placeholder="请选择操作类型">
            <el-option
                v-for="dict in operator_type"
                :key="dict.value"
                :label="dict.label"
                :value="dict.value"
            ></el-option>
          </el-select>
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

<script setup name="OrderDeliveryLog" lang="ts">
import { listOrderDeliveryLog, getOrderDeliveryLog, delOrderDeliveryLog, addOrderDeliveryLog, updateOrderDeliveryLog } from '@/api/ecom/orderDeliveryLog';
import { OrderDeliveryLogVO, OrderDeliveryLogQuery, OrderDeliveryLogForm } from '@/api/ecom/orderDeliveryLog/types';

const { proxy } = getCurrentInstance() as ComponentInternalInstance;
const { operator_type } = toRefs<any>(proxy?.useDict('operator_type'));

const orderDeliveryLogList = ref<OrderDeliveryLogVO[]>([]);
const buttonLoading = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const ids = ref<Array<string | number>>([]);
const single = ref(true);
const multiple = ref(true);
const total = ref(0);

const queryFormRef = ref<ElFormInstance>();
const orderDeliveryLogFormRef = ref<ElFormInstance>();

const dialog = reactive<DialogOption>({
  visible: false,
  title: ''
});

const initFormData: OrderDeliveryLogForm = {
  deliveryLogId: undefined,
  deliveryId: undefined,
  orderId: undefined,
  fromStatus: undefined,
  toStatus: undefined,
  changeReason: undefined,
  operatorType: undefined,
  remark: undefined,
}
const data = reactive<PageData<OrderDeliveryLogForm, OrderDeliveryLogQuery>>({
  form: {...initFormData},
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    deliveryId: undefined,
    orderId: undefined,
    fromStatus: undefined,
    toStatus: undefined,
    changeReason: undefined,
    operatorType: undefined,
    params: {
    }
  },
  rules: {
    deliveryLogId: [
      { required: true, message: "配送日志Id不能为空", trigger: "blur" }
    ],
    orderId: [
      { required: true, message: "订单ID不能为空", trigger: "blur" }
    ],
  }
});

const { queryParams, form, rules } = toRefs(data);

/** 查询配送状态变更日志列表 */
const getList = async () => {
  loading.value = true;
  const res = await listOrderDeliveryLog(queryParams.value);
  orderDeliveryLogList.value = res.rows;
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
  orderDeliveryLogFormRef.value?.resetFields();
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
const handleSelectionChange = (selection: OrderDeliveryLogVO[]) => {
  ids.value = selection.map(item => item.deliveryLogId);
  single.value = selection.length != 1;
  multiple.value = !selection.length;
}

/** 新增按钮操作 */
const handleAdd = () => {
  reset();
  dialog.visible = true;
  dialog.title = "添加配送状态变更日志";
}

/** 修改按钮操作 */
const handleUpdate = async (row?: OrderDeliveryLogVO) => {
  reset();
  const _deliveryLogId = row?.deliveryLogId || ids.value[0]
  const res = await getOrderDeliveryLog(_deliveryLogId);
  Object.assign(form.value, res.data);
  dialog.visible = true;
  dialog.title = "修改配送状态变更日志";
}

/** 提交按钮 */
const submitForm = () => {
  orderDeliveryLogFormRef.value?.validate(async (valid: boolean) => {
    if (valid) {
      buttonLoading.value = true;
      if (form.value.deliveryLogId) {
        await updateOrderDeliveryLog(form.value).finally(() =>  buttonLoading.value = false);
      } else {
        await addOrderDeliveryLog(form.value).finally(() =>  buttonLoading.value = false);
      }
      proxy?.$modal.msgSuccess("操作成功");
      dialog.visible = false;
      await getList();
    }
  });
}

/** 删除按钮操作 */
const handleDelete = async (row?: OrderDeliveryLogVO) => {
  const _deliveryLogIds = row?.deliveryLogId || ids.value;
  await proxy?.$modal.confirm('是否确认删除配送状态变更日志编号为"' + _deliveryLogIds + '"的数据项？').finally(() => loading.value = false);
  await delOrderDeliveryLog(_deliveryLogIds);
  proxy?.$modal.msgSuccess("删除成功");
  await getList();
}

/** 导出按钮操作 */
const handleExport = () => {
  proxy?.download('ecom/orderDeliveryLog/export', {
    ...queryParams.value
  }, `orderDeliveryLog_${new Date().getTime()}.xlsx`)
}

onMounted(() => {
  getList();
});
</script>
