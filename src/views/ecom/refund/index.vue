<template>
  <div class="p-2">
    <transition :enter-active-class="proxy?.animate.searchAnimate.enter" :leave-active-class="proxy?.animate.searchAnimate.leave">
      <div v-show="showSearch" class="mb-[10px]">
        <el-card shadow="hover">
          <el-form ref="queryFormRef" :model="queryParams" :inline="true">
            <el-form-item label="退款ID" prop="refundId">
              <el-input v-model="queryParams.refundId" placeholder="请输入退款ID" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="订单ID" prop="orderId">
              <el-input v-model="queryParams.orderId" placeholder="请输入订单ID" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="订单明细ID" prop="orderItemId">
              <el-input v-model="queryParams.orderItemId" placeholder="请输入订单明细ID" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="退款类型" prop="refundType">
              <el-select v-model="queryParams.refundType" placeholder="请选择退款类型" clearable >
                <el-option v-for="dict in refund_type" :key="dict.value" :label="dict.label" :value="dict.value"/>
              </el-select>
            </el-form-item>
            <el-form-item label="退款金额" prop="refundAmount">
              <el-input v-model="queryParams.refundAmount" placeholder="请输入退款金额" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="退款原因" prop="refundReason">
              <el-input v-model="queryParams.refundReason" placeholder="请输入退款原因" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="退款描述" prop="refundDesc">
              <el-input v-model="queryParams.refundDesc" placeholder="请输入退款描述" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="退款状态" prop="refundStatus">
              <el-select v-model="queryParams.refundStatus" placeholder="请选择退款状态" clearable >
                <el-option v-for="dict in refund_status" :key="dict.value" :label="dict.label" :value="dict.value"/>
              </el-select>
            </el-form-item>
            <el-form-item label="逆向结算" prop="reverseSettlement">
              <el-select v-model="queryParams.reverseSettlement" placeholder="请选择逆向结算" clearable >
                <el-option v-for="dict in sys_normal_disable" :key="dict.value" :label="dict.label" :value="dict.value"/>
              </el-select>
            </el-form-item>
            <el-form-item label="逆向库存" prop="reverseStock">
              <el-select v-model="queryParams.reverseStock" placeholder="请选择逆向库存" clearable >
                <el-option v-for="dict in sys_normal_disable" :key="dict.value" :label="dict.label" :value="dict.value"/>
              </el-select>
            </el-form-item>
            <el-form-item label="审核人员" prop="auditBy">
              <el-input v-model="queryParams.auditBy" placeholder="请输入审核人员" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="审核时间" prop="auditTime">
              <el-date-picker clearable
                v-model="queryParams.auditTime"
                type="date"
                value-format="YYYY-MM-DD"
                placeholder="请选择审核时间"
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
            <el-button type="primary" plain icon="Plus" @click="handleAdd" v-hasPermi="['ecom:refund:add']">新增</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="success" plain icon="Edit" :disabled="single" @click="handleUpdate()" v-hasPermi="['ecom:refund:edit']">修改</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="danger" plain icon="Delete" :disabled="multiple" @click="handleDelete()" v-hasPermi="['ecom:refund:remove']">删除</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="warning" plain icon="Download" @click="handleExport" v-hasPermi="['ecom:refund:export']">导出</el-button>
          </el-col>
          <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
        </el-row>
      </template>

      <el-table v-loading="loading" border :data="refundList" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column label="退款ID" align="center" prop="refundId" v-if="true" />
        <el-table-column label="订单ID" align="center" prop="orderId" />
        <el-table-column label="订单明细ID" align="center" prop="orderItemId" />
        <el-table-column label="退款类型" align="center" prop="refundType">
          <template #default="scope">
            <dict-tag :options="refund_type" :value="scope.row.refundType"/>
          </template>
        </el-table-column>
        <el-table-column label="退款金额" align="center" prop="refundAmount" />
        <el-table-column label="退款原因" align="center" prop="refundReason" />
        <el-table-column label="退款描述" align="center" prop="refundDesc" />
        <el-table-column label="退款状态" align="center" prop="refundStatus">
          <template #default="scope">
            <dict-tag :options="refund_status" :value="scope.row.refundStatus"/>
          </template>
        </el-table-column>
        <el-table-column label="逆向结算" align="center" prop="reverseSettlement">
          <template #default="scope">
            <dict-tag :options="sys_normal_disable" :value="scope.row.reverseSettlement"/>
          </template>
        </el-table-column>
        <el-table-column label="逆向库存" align="center" prop="reverseStock">
          <template #default="scope">
            <dict-tag :options="sys_normal_disable" :value="scope.row.reverseStock"/>
          </template>
        </el-table-column>
        <el-table-column label="审核人员" align="center" prop="auditBy" />
        <el-table-column label="审核时间" align="center" prop="auditTime" width="180">
          <template #default="scope">
            <span>{{ parseTime(scope.row.auditTime, '{y}-{m}-{d}') }}</span>
          </template>
        </el-table-column>
        <el-table-column label="备注" align="center" prop="remark" />
        <el-table-column label="操作" align="center" fixed="right"  class-name="small-padding fixed-width">
          <template #default="scope">
            <el-tooltip content="修改" placement="top">
              <el-button link type="primary" icon="Edit" @click="handleUpdate(scope.row)" v-hasPermi="['ecom:refund:edit']"></el-button>
            </el-tooltip>
            <el-tooltip content="删除" placement="top">
              <el-button link type="primary" icon="Delete" @click="handleDelete(scope.row)" v-hasPermi="['ecom:refund:remove']"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <pagination v-show="total > 0" :total="total" v-model:page="queryParams.pageNum" v-model:limit="queryParams.pageSize" @pagination="getList" />
    </el-card>
    <!-- 添加或修改退款对话框 -->
    <el-dialog :title="dialog.title" v-model="dialog.visible" width="500px" append-to-body>
      <el-form ref="refundFormRef" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="订单ID" prop="orderId">
          <el-input v-model="form.orderId" placeholder="请输入订单ID" />
        </el-form-item>
        <el-form-item label="订单明细ID" prop="orderItemId">
          <el-input v-model="form.orderItemId" placeholder="请输入订单明细ID" />
        </el-form-item>
        <el-form-item label="退款类型" prop="refundType">
          <el-select v-model="form.refundType" placeholder="请选择退款类型">
            <el-option
                v-for="dict in refund_type"
                :key="dict.value"
                :label="dict.label"
                :value="dict.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="退款金额" prop="refundAmount">
          <el-input v-model="form.refundAmount" placeholder="请输入退款金额" />
        </el-form-item>
        <el-form-item label="退款原因" prop="refundReason">
          <el-input v-model="form.refundReason" placeholder="请输入退款原因" />
        </el-form-item>
        <el-form-item label="退款描述" prop="refundDesc">
          <el-input v-model="form.refundDesc" placeholder="请输入退款描述" />
        </el-form-item>
        <el-form-item label="退款状态" prop="refundStatus">
          <el-select v-model="form.refundStatus" placeholder="请选择退款状态">
            <el-option
                v-for="dict in refund_status"
                :key="dict.value"
                :label="dict.label"
                :value="dict.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="逆向结算" prop="reverseSettlement">
          <el-radio-group v-model="form.reverseSettlement">
            <el-radio
              v-for="dict in sys_normal_disable"
              :key="dict.value"
              :value="dict.value"
            >{{dict.label}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="逆向库存" prop="reverseStock">
          <el-radio-group v-model="form.reverseStock">
            <el-radio
              v-for="dict in sys_normal_disable"
              :key="dict.value"
              :value="dict.value"
            >{{dict.label}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="审核人员" prop="auditBy">
          <el-input v-model="form.auditBy" placeholder="请输入审核人员" />
        </el-form-item>
        <el-form-item label="审核时间" prop="auditTime">
          <el-date-picker clearable
            v-model="form.auditTime"
            type="datetime"
            value-format="YYYY-MM-DD HH:mm:ss"
            placeholder="请选择审核时间">
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

<script setup name="Refund" lang="ts">
import { listRefund, getRefund, delRefund, addRefund, updateRefund } from '@/api/ecom/refund';
import { RefundVO, RefundQuery, RefundForm } from '@/api/ecom/refund/types';

const { proxy } = getCurrentInstance() as ComponentInternalInstance;
const { refund_status, refund_type, sys_normal_disable } = toRefs<any>(proxy?.useDict('refund_status', 'refund_type', 'sys_normal_disable'));

const refundList = ref<RefundVO[]>([]);
const buttonLoading = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const ids = ref<Array<string | number>>([]);
const single = ref(true);
const multiple = ref(true);
const total = ref(0);

const queryFormRef = ref<ElFormInstance>();
const refundFormRef = ref<ElFormInstance>();

const dialog = reactive<DialogOption>({
  visible: false,
  title: ''
});

const initFormData: RefundForm = {
  refundId: undefined,
  orderId: undefined,
  orderItemId: undefined,
  refundType: undefined,
  refundAmount: undefined,
  refundReason: undefined,
  refundDesc: undefined,
  refundStatus: undefined,
  reverseSettlement: undefined,
  reverseStock: undefined,
  auditBy: undefined,
  auditTime: undefined,
  remark: undefined,
}
const data = reactive<PageData<RefundForm, RefundQuery>>({
  form: {...initFormData},
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    refundId: undefined,
    orderId: undefined,
    orderItemId: undefined,
    refundType: undefined,
    refundAmount: undefined,
    refundReason: undefined,
    refundDesc: undefined,
    refundStatus: undefined,
    reverseSettlement: undefined,
    reverseStock: undefined,
    auditBy: undefined,
    auditTime: undefined,
    params: {
    }
  },
  rules: {
    refundId: [
      { required: true, message: "退款ID不能为空", trigger: "blur" }
    ],
    orderId: [
      { required: true, message: "订单ID不能为空", trigger: "blur" }
    ],
    refundType: [
      { required: true, message: "退款类型不能为空", trigger: "change" }
    ],
    refundAmount: [
      { required: true, message: "退款金额不能为空", trigger: "blur" }
    ],
  }
});

const { queryParams, form, rules } = toRefs(data);

/** 查询退款列表 */
const getList = async () => {
  loading.value = true;
  const res = await listRefund(queryParams.value);
  refundList.value = res.rows;
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
  refundFormRef.value?.resetFields();
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
const handleSelectionChange = (selection: RefundVO[]) => {
  ids.value = selection.map(item => item.refundId);
  single.value = selection.length != 1;
  multiple.value = !selection.length;
}

/** 新增按钮操作 */
const handleAdd = () => {
  reset();
  dialog.visible = true;
  dialog.title = "添加退款";
}

/** 修改按钮操作 */
const handleUpdate = async (row?: RefundVO) => {
  reset();
  const _refundId = row?.refundId || ids.value[0]
  const res = await getRefund(_refundId);
  Object.assign(form.value, res.data);
  dialog.visible = true;
  dialog.title = "修改退款";
}

/** 提交按钮 */
const submitForm = () => {
  refundFormRef.value?.validate(async (valid: boolean) => {
    if (valid) {
      buttonLoading.value = true;
      if (form.value.refundId) {
        await updateRefund(form.value).finally(() =>  buttonLoading.value = false);
      } else {
        await addRefund(form.value).finally(() =>  buttonLoading.value = false);
      }
      proxy?.$modal.msgSuccess("操作成功");
      dialog.visible = false;
      await getList();
    }
  });
}

/** 删除按钮操作 */
const handleDelete = async (row?: RefundVO) => {
  const _refundIds = row?.refundId || ids.value;
  await proxy?.$modal.confirm('是否确认删除退款编号为"' + _refundIds + '"的数据项？').finally(() => loading.value = false);
  await delRefund(_refundIds);
  proxy?.$modal.msgSuccess("删除成功");
  await getList();
}

/** 导出按钮操作 */
const handleExport = () => {
  proxy?.download('ecom/refund/export', {
    ...queryParams.value
  }, `refund_${new Date().getTime()}.xlsx`)
}

onMounted(() => {
  getList();
});
</script>
