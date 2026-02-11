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
            <el-form-item label="经营归属类型" prop="ownerType">
              <el-select v-model="queryParams.ownerType" placeholder="请选择经营归属类型" clearable >
                <el-option v-for="dict in owner_type" :key="dict.value" :label="dict.label" :value="dict.value"/>
              </el-select>
            </el-form-item>
            <el-form-item label="经营归属ID" prop="ownerId">
              <el-input v-model="queryParams.ownerId" placeholder="请输入经营归属ID" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="订单原价" prop="orderAmount">
              <el-input v-model="queryParams.orderAmount" placeholder="请输入订单原价" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="实付金额" prop="payAmount">
              <el-input v-model="queryParams.payAmount" placeholder="请输入实付金额" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="平台服务费" prop="platformFee">
              <el-input v-model="queryParams.platformFee" placeholder="请输入平台服务费" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="配送费" prop="deliveryFee">
              <el-input v-model="queryParams.deliveryFee" placeholder="请输入配送费" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="抽佣" prop="commissionFee">
              <el-input v-model="queryParams.commissionFee" placeholder="请输入抽佣" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="平台补贴" prop="subsidyAmount">
              <el-input v-model="queryParams.subsidyAmount" placeholder="请输入平台补贴" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="实际应结算" prop="settlementAmount">
              <el-input v-model="queryParams.settlementAmount" placeholder="请输入实际应结算" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="结算批次" prop="settlementBatchNo">
              <el-input v-model="queryParams.settlementBatchNo" placeholder="请输入结算批次" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="结算周期时间" prop="settlementTime">
              <el-date-picker clearable
                v-model="queryParams.settlementTime"
                type="date"
                value-format="YYYY-MM-DD"
                placeholder="请选择结算周期时间"
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
            <el-button type="primary" plain icon="Plus" @click="handleAdd" v-hasPermi="['ecom:settlement:add']">新增</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="success" plain icon="Edit" :disabled="single" @click="handleUpdate()" v-hasPermi="['ecom:settlement:edit']">修改</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="danger" plain icon="Delete" :disabled="multiple" @click="handleDelete()" v-hasPermi="['ecom:settlement:remove']">删除</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="warning" plain icon="Download" @click="handleExport" v-hasPermi="['ecom:settlement:export']">导出</el-button>
          </el-col>
          <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
        </el-row>
      </template>

      <el-table v-loading="loading" border :data="settlementList" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column label="结算ID" align="center" prop="settlementId" v-if="true" />
        <el-table-column label="订单ID" align="center" prop="orderId" />
        <el-table-column label="订单明细ID" align="center" prop="orderItemId" />
        <el-table-column label="经营归属类型" align="center" prop="ownerType">
          <template #default="scope">
            <dict-tag :options="owner_type" :value="scope.row.ownerType"/>
          </template>
        </el-table-column>
        <el-table-column label="经营归属ID" align="center" prop="ownerId" />
        <el-table-column label="订单原价" align="center" prop="orderAmount" />
        <el-table-column label="实付金额" align="center" prop="payAmount" />
        <el-table-column label="平台服务费" align="center" prop="platformFee" />
        <el-table-column label="配送费" align="center" prop="deliveryFee" />
        <el-table-column label="抽佣" align="center" prop="commissionFee" />
        <el-table-column label="平台补贴" align="center" prop="subsidyAmount" />
        <el-table-column label="实际应结算" align="center" prop="settlementAmount" />
        <el-table-column label="结算批次" align="center" prop="settlementBatchNo" />
        <el-table-column label="结算周期时间" align="center" prop="settlementTime" width="180">
          <template #default="scope">
            <span>{{ parseTime(scope.row.settlementTime, '{y}-{m}-{d}') }}</span>
          </template>
        </el-table-column>
        <el-table-column label="结算状态" align="center" prop="status" />
        <el-table-column label="备注" align="center" prop="remark" />
        <el-table-column label="操作" align="center" fixed="right"  class-name="small-padding fixed-width">
          <template #default="scope">
            <el-tooltip content="修改" placement="top">
              <el-button link type="primary" icon="Edit" @click="handleUpdate(scope.row)" v-hasPermi="['ecom:settlement:edit']"></el-button>
            </el-tooltip>
            <el-tooltip content="删除" placement="top">
              <el-button link type="primary" icon="Delete" @click="handleDelete(scope.row)" v-hasPermi="['ecom:settlement:remove']"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <pagination v-show="total > 0" :total="total" v-model:page="queryParams.pageNum" v-model:limit="queryParams.pageSize" @pagination="getList" />
    </el-card>
    <!-- 添加或修改结算对话框 -->
    <el-dialog :title="dialog.title" v-model="dialog.visible" width="500px" append-to-body>
      <el-form ref="settlementFormRef" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="订单ID" prop="orderId">
          <el-input v-model="form.orderId" placeholder="请输入订单ID" />
        </el-form-item>
        <el-form-item label="订单明细ID" prop="orderItemId">
          <el-input v-model="form.orderItemId" placeholder="请输入订单明细ID" />
        </el-form-item>
        <el-form-item label="经营归属类型" prop="ownerType">
          <el-select v-model="form.ownerType" placeholder="请选择经营归属类型">
            <el-option
                v-for="dict in owner_type"
                :key="dict.value"
                :label="dict.label"
                :value="dict.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="经营归属ID" prop="ownerId">
          <el-input v-model="form.ownerId" placeholder="请输入经营归属ID" />
        </el-form-item>
        <el-form-item label="订单原价" prop="orderAmount">
          <el-input v-model="form.orderAmount" placeholder="请输入订单原价" />
        </el-form-item>
        <el-form-item label="实付金额" prop="payAmount">
          <el-input v-model="form.payAmount" placeholder="请输入实付金额" />
        </el-form-item>
        <el-form-item label="平台服务费" prop="platformFee">
          <el-input v-model="form.platformFee" placeholder="请输入平台服务费" />
        </el-form-item>
        <el-form-item label="配送费" prop="deliveryFee">
          <el-input v-model="form.deliveryFee" placeholder="请输入配送费" />
        </el-form-item>
        <el-form-item label="抽佣" prop="commissionFee">
          <el-input v-model="form.commissionFee" placeholder="请输入抽佣" />
        </el-form-item>
        <el-form-item label="平台补贴" prop="subsidyAmount">
          <el-input v-model="form.subsidyAmount" placeholder="请输入平台补贴" />
        </el-form-item>
        <el-form-item label="实际应结算" prop="settlementAmount">
          <el-input v-model="form.settlementAmount" placeholder="请输入实际应结算" />
        </el-form-item>
        <el-form-item label="结算批次" prop="settlementBatchNo">
          <el-input v-model="form.settlementBatchNo" placeholder="请输入结算批次" />
        </el-form-item>
        <el-form-item label="结算周期时间" prop="settlementTime">
          <el-date-picker clearable
            v-model="form.settlementTime"
            type="datetime"
            value-format="YYYY-MM-DD HH:mm:ss"
            placeholder="请选择结算周期时间">
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

<script setup name="Settlement" lang="ts">
import { listSettlement, getSettlement, delSettlement, addSettlement, updateSettlement } from '@/api/ecom/settlement';
import { SettlementVO, SettlementQuery, SettlementForm } from '@/api/ecom/settlement/types';

const { proxy } = getCurrentInstance() as ComponentInternalInstance;
const { owner_type } = toRefs<any>(proxy?.useDict('owner_type'));

const settlementList = ref<SettlementVO[]>([]);
const buttonLoading = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const ids = ref<Array<string | number>>([]);
const single = ref(true);
const multiple = ref(true);
const total = ref(0);

const queryFormRef = ref<ElFormInstance>();
const settlementFormRef = ref<ElFormInstance>();

const dialog = reactive<DialogOption>({
  visible: false,
  title: ''
});

const initFormData: SettlementForm = {
  settlementId: undefined,
  orderId: undefined,
  orderItemId: undefined,
  ownerType: undefined,
  ownerId: undefined,
  orderAmount: undefined,
  payAmount: undefined,
  platformFee: undefined,
  deliveryFee: undefined,
  commissionFee: undefined,
  subsidyAmount: undefined,
  settlementAmount: undefined,
  settlementBatchNo: undefined,
  settlementTime: undefined,
  status: undefined,
  remark: undefined,
}
const data = reactive<PageData<SettlementForm, SettlementQuery>>({
  form: {...initFormData},
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    orderId: undefined,
    orderItemId: undefined,
    ownerType: undefined,
    ownerId: undefined,
    orderAmount: undefined,
    payAmount: undefined,
    platformFee: undefined,
    deliveryFee: undefined,
    commissionFee: undefined,
    subsidyAmount: undefined,
    settlementAmount: undefined,
    settlementBatchNo: undefined,
    settlementTime: undefined,
    status: undefined,
    params: {
    }
  },
  rules: {
    settlementId: [
      { required: true, message: "结算ID不能为空", trigger: "blur" }
    ],
    orderId: [
      { required: true, message: "订单ID不能为空", trigger: "blur" }
    ],
    orderItemId: [
      { required: true, message: "订单明细ID不能为空", trigger: "blur" }
    ],
    ownerType: [
      { required: true, message: "经营归属类型不能为空", trigger: "change" }
    ],
    ownerId: [
      { required: true, message: "经营归属ID不能为空", trigger: "blur" }
    ],
    orderAmount: [
      { required: true, message: "订单原价不能为空", trigger: "blur" }
    ],
    payAmount: [
      { required: true, message: "实付金额不能为空", trigger: "blur" }
    ],
    settlementAmount: [
      { required: true, message: "实际应结算不能为空", trigger: "blur" }
    ],
  }
});

const { queryParams, form, rules } = toRefs(data);

/** 查询结算列表 */
const getList = async () => {
  loading.value = true;
  const res = await listSettlement(queryParams.value);
  settlementList.value = res.rows;
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
  settlementFormRef.value?.resetFields();
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
const handleSelectionChange = (selection: SettlementVO[]) => {
  ids.value = selection.map(item => item.settlementId);
  single.value = selection.length != 1;
  multiple.value = !selection.length;
}

/** 新增按钮操作 */
const handleAdd = () => {
  reset();
  dialog.visible = true;
  dialog.title = "添加结算";
}

/** 修改按钮操作 */
const handleUpdate = async (row?: SettlementVO) => {
  reset();
  const _settlementId = row?.settlementId || ids.value[0]
  const res = await getSettlement(_settlementId);
  Object.assign(form.value, res.data);
  dialog.visible = true;
  dialog.title = "修改结算";
}

/** 提交按钮 */
const submitForm = () => {
  settlementFormRef.value?.validate(async (valid: boolean) => {
    if (valid) {
      buttonLoading.value = true;
      if (form.value.settlementId) {
        await updateSettlement(form.value).finally(() =>  buttonLoading.value = false);
      } else {
        await addSettlement(form.value).finally(() =>  buttonLoading.value = false);
      }
      proxy?.$modal.msgSuccess("操作成功");
      dialog.visible = false;
      await getList();
    }
  });
}

/** 删除按钮操作 */
const handleDelete = async (row?: SettlementVO) => {
  const _settlementIds = row?.settlementId || ids.value;
  await proxy?.$modal.confirm('是否确认删除结算编号为"' + _settlementIds + '"的数据项？').finally(() => loading.value = false);
  await delSettlement(_settlementIds);
  proxy?.$modal.msgSuccess("删除成功");
  await getList();
}

/** 导出按钮操作 */
const handleExport = () => {
  proxy?.download('ecom/settlement/export', {
    ...queryParams.value
  }, `settlement_${new Date().getTime()}.xlsx`)
}

onMounted(() => {
  getList();
});
</script>
