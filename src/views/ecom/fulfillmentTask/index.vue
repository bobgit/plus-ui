<template>
  <div class="p-2">
    <transition :enter-active-class="proxy?.animate.searchAnimate.enter" :leave-active-class="proxy?.animate.searchAnimate.leave">
      <div v-show="showSearch" class="mb-[10px]">
        <el-card shadow="hover">
          <el-form ref="queryFormRef" :model="queryParams" :inline="true">
            <el-form-item label="订单ID" prop="orderId">
              <el-input v-model="queryParams.orderId" placeholder="请输入订单ID" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="订单明细ID" prop="orderItemId">
              <el-input v-model="queryParams.orderItemId" placeholder="请输入订单明细ID" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="履约方式类型" prop="fulfillmentType">
              <el-select v-model="queryParams.fulfillmentType" placeholder="请选择履约方式类型" clearable >
                <el-option v-for="dict in fulfillment_type" :key="dict.value" :label="dict.label" :value="dict.value"/>
              </el-select>
            </el-form-item>
            <el-form-item label="履约方式Id" prop="fulfillmentId">
              <el-input v-model="queryParams.fulfillmentId" placeholder="请输入履约方式Id" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="履约责任归属" prop="responsibleType">
              <el-select v-model="queryParams.responsibleType" placeholder="请选择履约责任归属" clearable >
                <el-option v-for="dict in responsible_type" :key="dict.value" :label="dict.label" :value="dict.value"/>
              </el-select>
            </el-form-item>
            <el-form-item label="履约责任归属ID" prop="responsibleId">
              <el-input v-model="queryParams.responsibleId" placeholder="请输入履约责任归属ID" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="物流公司" prop="logisticsCompany">
              <el-input v-model="queryParams.logisticsCompany" placeholder="请输入物流公司" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="物流公司ID" prop="logisticsNo">
              <el-input v-model="queryParams.logisticsNo" placeholder="请输入物流公司ID" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="骑手ID" prop="riderId">
              <el-input v-model="queryParams.riderId" placeholder="请输入骑手ID" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="自提码" prop="pickupCode">
              <el-input v-model="queryParams.pickupCode" placeholder="请输入自提码" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="验证码" prop="verifyCode">
              <el-input v-model="queryParams.verifyCode" placeholder="请输入验证码" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="优先级别" prop="priority">
              <el-input v-model="queryParams.priority" placeholder="请输入优先级别" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="分配时间" prop="assignTime">
              <el-date-picker clearable
                v-model="queryParams.assignTime"
                type="date"
                value-format="YYYY-MM-DD"
                placeholder="请选择分配时间"
              />
            </el-form-item>
            <el-form-item label="开始时间" prop="startTime">
              <el-date-picker clearable
                v-model="queryParams.startTime"
                type="date"
                value-format="YYYY-MM-DD"
                placeholder="请选择开始时间"
              />
            </el-form-item>
            <el-form-item label="完成时间" prop="completeTime">
              <el-date-picker clearable
                v-model="queryParams.completeTime"
                type="date"
                value-format="YYYY-MM-DD"
                placeholder="请选择完成时间"
              />
            </el-form-item>
            <el-form-item label="取消时间" prop="cancelTime">
              <el-date-picker clearable
                v-model="queryParams.cancelTime"
                type="date"
                value-format="YYYY-MM-DD"
                placeholder="请选择取消时间"
              />
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
            <el-button type="primary" plain icon="Plus" @click="handleAdd" v-hasPermi="['ecom:fulfillmentTask:add']">新增</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="success" plain icon="Edit" :disabled="single" @click="handleUpdate()" v-hasPermi="['ecom:fulfillmentTask:edit']">修改</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="danger" plain icon="Delete" :disabled="multiple" @click="handleDelete()" v-hasPermi="['ecom:fulfillmentTask:remove']">删除</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="warning" plain icon="Download" @click="handleExport" v-hasPermi="['ecom:fulfillmentTask:export']">导出</el-button>
          </el-col>
          <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
        </el-row>
      </template>

      <el-table v-loading="loading" border :data="fulfillmentTaskList" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column label="履约单ID" align="center" prop="fulfillmentTaskId" v-if="true" />
        <el-table-column label="订单ID" align="center" prop="orderId" />
        <el-table-column label="订单明细ID" align="center" prop="orderItemId" />
        <el-table-column label="履约方式类型" align="center" prop="fulfillmentType">
          <template #default="scope">
            <dict-tag :options="fulfillment_type" :value="scope.row.fulfillmentType"/>
          </template>
        </el-table-column>
        <el-table-column label="履约方式Id" align="center" prop="fulfillmentId" />
        <el-table-column label="履约责任归属" align="center" prop="responsibleType">
          <template #default="scope">
            <dict-tag :options="responsible_type" :value="scope.row.responsibleType"/>
          </template>
        </el-table-column>
        <el-table-column label="履约责任归属ID" align="center" prop="responsibleId" />
        <el-table-column label="物流公司" align="center" prop="logisticsCompany" />
        <el-table-column label="物流公司ID" align="center" prop="logisticsNo" />
        <el-table-column label="骑手ID" align="center" prop="riderId" />
        <el-table-column label="自提码" align="center" prop="pickupCode" />
        <el-table-column label="验证码" align="center" prop="verifyCode" />
        <el-table-column label="优先级别" align="center" prop="priority" />
        <el-table-column label="履约状态" align="center" prop="fulfillmentStatus" />
        <el-table-column label="分配时间" align="center" prop="assignTime" width="180">
          <template #default="scope">
            <span>{{ parseTime(scope.row.assignTime, '{y}-{m}-{d}') }}</span>
          </template>
        </el-table-column>
        <el-table-column label="开始时间" align="center" prop="startTime" width="180">
          <template #default="scope">
            <span>{{ parseTime(scope.row.startTime, '{y}-{m}-{d}') }}</span>
          </template>
        </el-table-column>
        <el-table-column label="完成时间" align="center" prop="completeTime" width="180">
          <template #default="scope">
            <span>{{ parseTime(scope.row.completeTime, '{y}-{m}-{d}') }}</span>
          </template>
        </el-table-column>
        <el-table-column label="取消时间" align="center" prop="cancelTime" width="180">
          <template #default="scope">
            <span>{{ parseTime(scope.row.cancelTime, '{y}-{m}-{d}') }}</span>
          </template>
        </el-table-column>
        <el-table-column label="备注" align="center" prop="remark" />
        <el-table-column label="操作" align="center" fixed="right"  class-name="small-padding fixed-width">
          <template #default="scope">
            <el-tooltip content="修改" placement="top">
              <el-button link type="primary" icon="Edit" @click="handleUpdate(scope.row)" v-hasPermi="['ecom:fulfillmentTask:edit']"></el-button>
            </el-tooltip>
            <el-tooltip content="删除" placement="top">
              <el-button link type="primary" icon="Delete" @click="handleDelete(scope.row)" v-hasPermi="['ecom:fulfillmentTask:remove']"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <pagination v-show="total > 0" :total="total" v-model:page="queryParams.pageNum" v-model:limit="queryParams.pageSize" @pagination="getList" />
    </el-card>
    <!-- 添加或修改履约单对话框 -->
    <el-dialog :title="dialog.title" v-model="dialog.visible" width="500px" append-to-body>
      <el-form ref="fulfillmentTaskFormRef" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="订单ID" prop="orderId">
          <el-input v-model="form.orderId" placeholder="请输入订单ID" />
        </el-form-item>
        <el-form-item label="订单明细ID" prop="orderItemId">
          <el-input v-model="form.orderItemId" placeholder="请输入订单明细ID" />
        </el-form-item>
        <el-form-item label="履约方式类型" prop="fulfillmentType">
          <el-select v-model="form.fulfillmentType" placeholder="请选择履约方式类型">
            <el-option
                v-for="dict in fulfillment_type"
                :key="dict.value"
                :label="dict.label"
                :value="dict.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="履约方式Id" prop="fulfillmentId">
          <el-input v-model="form.fulfillmentId" placeholder="请输入履约方式Id" />
        </el-form-item>
        <el-form-item label="履约责任归属" prop="responsibleType">
          <el-select v-model="form.responsibleType" placeholder="请选择履约责任归属">
            <el-option
                v-for="dict in responsible_type"
                :key="dict.value"
                :label="dict.label"
                :value="dict.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="履约责任归属ID" prop="responsibleId">
          <el-input v-model="form.responsibleId" placeholder="请输入履约责任归属ID" />
        </el-form-item>
        <el-form-item label="物流公司" prop="logisticsCompany">
          <el-input v-model="form.logisticsCompany" placeholder="请输入物流公司" />
        </el-form-item>
        <el-form-item label="物流公司ID" prop="logisticsNo">
          <el-input v-model="form.logisticsNo" placeholder="请输入物流公司ID" />
        </el-form-item>
        <el-form-item label="骑手ID" prop="riderId">
          <el-input v-model="form.riderId" placeholder="请输入骑手ID" />
        </el-form-item>
        <el-form-item label="自提码" prop="pickupCode">
          <el-input v-model="form.pickupCode" placeholder="请输入自提码" />
        </el-form-item>
        <el-form-item label="验证码" prop="verifyCode">
          <el-input v-model="form.verifyCode" placeholder="请输入验证码" />
        </el-form-item>
        <el-form-item label="优先级别" prop="priority">
          <el-input v-model="form.priority" placeholder="请输入优先级别" />
        </el-form-item>
        <el-form-item label="分配时间" prop="assignTime">
          <el-date-picker clearable
            v-model="form.assignTime"
            type="datetime"
            value-format="YYYY-MM-DD HH:mm:ss"
            placeholder="请选择分配时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="开始时间" prop="startTime">
          <el-date-picker clearable
            v-model="form.startTime"
            type="datetime"
            value-format="YYYY-MM-DD HH:mm:ss"
            placeholder="请选择开始时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="完成时间" prop="completeTime">
          <el-date-picker clearable
            v-model="form.completeTime"
            type="datetime"
            value-format="YYYY-MM-DD HH:mm:ss"
            placeholder="请选择完成时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="取消时间" prop="cancelTime">
          <el-date-picker clearable
            v-model="form.cancelTime"
            type="datetime"
            value-format="YYYY-MM-DD HH:mm:ss"
            placeholder="请选择取消时间">
          </el-date-picker>
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

<script setup name="FulfillmentTask" lang="ts">
import { listFulfillmentTask, getFulfillmentTask, delFulfillmentTask, addFulfillmentTask, updateFulfillmentTask } from '@/api/ecom/fulfillmentTask';
import { FulfillmentTaskVO, FulfillmentTaskQuery, FulfillmentTaskForm } from '@/api/ecom/fulfillmentTask/types';

const { proxy } = getCurrentInstance() as ComponentInternalInstance;
const { fulfillment_type, responsible_type } = toRefs<any>(proxy?.useDict('fulfillment_type', 'responsible_type'));

const fulfillmentTaskList = ref<FulfillmentTaskVO[]>([]);
const buttonLoading = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const ids = ref<Array<string | number>>([]);
const single = ref(true);
const multiple = ref(true);
const total = ref(0);

const queryFormRef = ref<ElFormInstance>();
const fulfillmentTaskFormRef = ref<ElFormInstance>();

const dialog = reactive<DialogOption>({
  visible: false,
  title: ''
});

const initFormData: FulfillmentTaskForm = {
  fulfillmentTaskId: undefined,
  orderId: undefined,
  orderItemId: undefined,
  fulfillmentType: undefined,
  fulfillmentId: undefined,
  responsibleType: undefined,
  responsibleId: undefined,
  logisticsCompany: undefined,
  logisticsNo: undefined,
  riderId: undefined,
  pickupCode: undefined,
  verifyCode: undefined,
  priority: undefined,
  fulfillmentStatus: undefined,
  assignTime: undefined,
  startTime: undefined,
  completeTime: undefined,
  cancelTime: undefined,
  remark: undefined,
}
const data = reactive<PageData<FulfillmentTaskForm, FulfillmentTaskQuery>>({
  form: {...initFormData},
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    orderId: undefined,
    orderItemId: undefined,
    fulfillmentType: undefined,
    fulfillmentId: undefined,
    responsibleType: undefined,
    responsibleId: undefined,
    logisticsCompany: undefined,
    logisticsNo: undefined,
    riderId: undefined,
    pickupCode: undefined,
    verifyCode: undefined,
    priority: undefined,
    fulfillmentStatus: undefined,
    assignTime: undefined,
    startTime: undefined,
    completeTime: undefined,
    cancelTime: undefined,
    params: {
    }
  },
  rules: {
    fulfillmentTaskId: [
      { required: true, message: "履约单ID不能为空", trigger: "blur" }
    ],
    orderId: [
      { required: true, message: "订单ID不能为空", trigger: "blur" }
    ],
    orderItemId: [
      { required: true, message: "订单明细ID不能为空", trigger: "blur" }
    ],
    responsibleType: [
      { required: true, message: "履约责任归属不能为空", trigger: "change" }
    ],
    responsibleId: [
      { required: true, message: "履约责任归属ID不能为空", trigger: "blur" }
    ],
  }
});

const { queryParams, form, rules } = toRefs(data);

/** 查询履约单列表 */
const getList = async () => {
  loading.value = true;
  const res = await listFulfillmentTask(queryParams.value);
  fulfillmentTaskList.value = res.rows;
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
  fulfillmentTaskFormRef.value?.resetFields();
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
const handleSelectionChange = (selection: FulfillmentTaskVO[]) => {
  ids.value = selection.map(item => item.fulfillmentTaskId);
  single.value = selection.length != 1;
  multiple.value = !selection.length;
}

/** 新增按钮操作 */
const handleAdd = () => {
  reset();
  dialog.visible = true;
  dialog.title = "添加履约单";
}

/** 修改按钮操作 */
const handleUpdate = async (row?: FulfillmentTaskVO) => {
  reset();
  const _fulfillmentTaskId = row?.fulfillmentTaskId || ids.value[0]
  const res = await getFulfillmentTask(_fulfillmentTaskId);
  Object.assign(form.value, res.data);
  dialog.visible = true;
  dialog.title = "修改履约单";
}

/** 提交按钮 */
const submitForm = () => {
  fulfillmentTaskFormRef.value?.validate(async (valid: boolean) => {
    if (valid) {
      buttonLoading.value = true;
      if (form.value.fulfillmentTaskId) {
        await updateFulfillmentTask(form.value).finally(() =>  buttonLoading.value = false);
      } else {
        await addFulfillmentTask(form.value).finally(() =>  buttonLoading.value = false);
      }
      proxy?.$modal.msgSuccess("操作成功");
      dialog.visible = false;
      await getList();
    }
  });
}

/** 删除按钮操作 */
const handleDelete = async (row?: FulfillmentTaskVO) => {
  const _fulfillmentTaskIds = row?.fulfillmentTaskId || ids.value;
  await proxy?.$modal.confirm('是否确认删除履约单编号为"' + _fulfillmentTaskIds + '"的数据项？').finally(() => loading.value = false);
  await delFulfillmentTask(_fulfillmentTaskIds);
  proxy?.$modal.msgSuccess("删除成功");
  await getList();
}

/** 导出按钮操作 */
const handleExport = () => {
  proxy?.download('ecom/fulfillmentTask/export', {
    ...queryParams.value
  }, `fulfillmentTask_${new Date().getTime()}.xlsx`)
}

onMounted(() => {
  getList();
});
</script>
