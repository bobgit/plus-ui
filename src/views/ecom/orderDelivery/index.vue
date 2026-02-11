<template>
  <div class="p-2">
    <transition :enter-active-class="proxy?.animate.searchAnimate.enter" :leave-active-class="proxy?.animate.searchAnimate.leave">
      <div v-show="showSearch" class="mb-[10px]">
        <el-card shadow="hover">
          <el-form ref="queryFormRef" :model="queryParams" :inline="true">
            <el-form-item label="订单ID" prop="orderId">
              <el-input v-model="queryParams.orderId" placeholder="请输入订单ID" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="订单业务类型" prop="orderType">
              <el-select v-model="queryParams.orderType" placeholder="请选择订单业务类型" clearable >
                <el-option v-for="dict in order_status" :key="dict.value" :label="dict.label" :value="dict.value"/>
              </el-select>
            </el-form-item>
            <el-form-item label="骑手名字" prop="riderName">
              <el-input v-model="queryParams.riderName" placeholder="请输入骑手名字" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="骑手Id" prop="riderId">
              <el-input v-model="queryParams.riderId" placeholder="请输入骑手Id" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="骑手电话" prop="riderPhone">
              <el-input v-model="queryParams.riderPhone" placeholder="请输入骑手电话" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="距离目的" prop="deliveryDistance">
              <el-input v-model="queryParams.deliveryDistance" placeholder="请输入距离目的" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="期望时间" prop="expectedTime">
              <el-date-picker clearable
                v-model="queryParams.expectedTime"
                type="date"
                value-format="YYYY-MM-DD"
                placeholder="请选择期望时间"
              />
            </el-form-item>
            <el-form-item label="交付时间" prop="actualTime">
              <el-date-picker clearable
                v-model="queryParams.actualTime"
                type="date"
                value-format="YYYY-MM-DD"
                placeholder="请选择交付时间"
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
            <el-button type="primary" plain icon="Plus" @click="handleAdd" v-hasPermi="['ecom:orderDelivery:add']">新增</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="success" plain icon="Edit" :disabled="single" @click="handleUpdate()" v-hasPermi="['ecom:orderDelivery:edit']">修改</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="danger" plain icon="Delete" :disabled="multiple" @click="handleDelete()" v-hasPermi="['ecom:orderDelivery:remove']">删除</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="warning" plain icon="Download" @click="handleExport" v-hasPermi="['ecom:orderDelivery:export']">导出</el-button>
          </el-col>
          <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
        </el-row>
      </template>

      <el-table v-loading="loading" border :data="orderDeliveryList" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column label="订单配送Id" align="center" prop="orderDeliveryId" v-if="true" />
        <el-table-column label="订单ID" align="center" prop="orderId" />
        <el-table-column label="订单业务类型" align="center" prop="orderType">
          <template #default="scope">
            <dict-tag :options="order_status" :value="scope.row.orderType"/>
          </template>
        </el-table-column>
        <el-table-column label="骑手名字" align="center" prop="riderName" />
        <el-table-column label="骑手Id" align="center" prop="riderId" />
        <el-table-column label="骑手电话" align="center" prop="riderPhone" />
        <el-table-column label="距离目的" align="center" prop="deliveryDistance" />
        <el-table-column label="配送状态" align="center" prop="deliveryStatus" />
        <el-table-column label="期望时间" align="center" prop="expectedTime" width="180">
          <template #default="scope">
            <span>{{ parseTime(scope.row.expectedTime, '{y}-{m}-{d}') }}</span>
          </template>
        </el-table-column>
        <el-table-column label="交付时间" align="center" prop="actualTime" width="180">
          <template #default="scope">
            <span>{{ parseTime(scope.row.actualTime, '{y}-{m}-{d}') }}</span>
          </template>
        </el-table-column>
        <el-table-column label="备注" align="center" prop="remark" />
        <el-table-column label="操作" align="center" fixed="right"  class-name="small-padding fixed-width">
          <template #default="scope">
            <el-tooltip content="修改" placement="top">
              <el-button link type="primary" icon="Edit" @click="handleUpdate(scope.row)" v-hasPermi="['ecom:orderDelivery:edit']"></el-button>
            </el-tooltip>
            <el-tooltip content="删除" placement="top">
              <el-button link type="primary" icon="Delete" @click="handleDelete(scope.row)" v-hasPermi="['ecom:orderDelivery:remove']"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <pagination v-show="total > 0" :total="total" v-model:page="queryParams.pageNum" v-model:limit="queryParams.pageSize" @pagination="getList" />
    </el-card>
    <!-- 添加或修改订单配送专用对话框 -->
    <el-dialog :title="dialog.title" v-model="dialog.visible" width="500px" append-to-body>
      <el-form ref="orderDeliveryFormRef" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="订单ID" prop="orderId">
          <el-input v-model="form.orderId" placeholder="请输入订单ID" />
        </el-form-item>
        <el-form-item label="订单业务类型" prop="orderType">
          <el-select v-model="form.orderType" placeholder="请选择订单业务类型">
            <el-option
                v-for="dict in order_status"
                :key="dict.value"
                :label="dict.label"
                :value="dict.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="骑手名字" prop="riderName">
          <el-input v-model="form.riderName" placeholder="请输入骑手名字" />
        </el-form-item>
        <el-form-item label="骑手Id" prop="riderId">
          <el-input v-model="form.riderId" placeholder="请输入骑手Id" />
        </el-form-item>
        <el-form-item label="骑手电话" prop="riderPhone">
          <el-input v-model="form.riderPhone" placeholder="请输入骑手电话" />
        </el-form-item>
        <el-form-item label="距离目的" prop="deliveryDistance">
          <el-input v-model="form.deliveryDistance" placeholder="请输入距离目的" />
        </el-form-item>
        <el-form-item label="期望时间" prop="expectedTime">
          <el-date-picker clearable
            v-model="form.expectedTime"
            type="datetime"
            value-format="YYYY-MM-DD HH:mm:ss"
            placeholder="请选择期望时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="交付时间" prop="actualTime">
          <el-date-picker clearable
            v-model="form.actualTime"
            type="datetime"
            value-format="YYYY-MM-DD HH:mm:ss"
            placeholder="请选择交付时间">
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

<script setup name="OrderDelivery" lang="ts">
import { listOrderDelivery, getOrderDelivery, delOrderDelivery, addOrderDelivery, updateOrderDelivery } from '@/api/ecom/orderDelivery';
import { OrderDeliveryVO, OrderDeliveryQuery, OrderDeliveryForm } from '@/api/ecom/orderDelivery/types';

const { proxy } = getCurrentInstance() as ComponentInternalInstance;
const { order_status } = toRefs<any>(proxy?.useDict('order_status'));

const orderDeliveryList = ref<OrderDeliveryVO[]>([]);
const buttonLoading = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const ids = ref<Array<string | number>>([]);
const single = ref(true);
const multiple = ref(true);
const total = ref(0);

const queryFormRef = ref<ElFormInstance>();
const orderDeliveryFormRef = ref<ElFormInstance>();

const dialog = reactive<DialogOption>({
  visible: false,
  title: ''
});

const initFormData: OrderDeliveryForm = {
  orderDeliveryId: undefined,
  orderId: undefined,
  orderType: undefined,
  riderName: undefined,
  riderId: undefined,
  riderPhone: undefined,
  deliveryDistance: undefined,
  deliveryStatus: undefined,
  expectedTime: undefined,
  actualTime: undefined,
  remark: undefined,
}
const data = reactive<PageData<OrderDeliveryForm, OrderDeliveryQuery>>({
  form: {...initFormData},
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    orderId: undefined,
    orderType: undefined,
    riderName: undefined,
    riderId: undefined,
    riderPhone: undefined,
    deliveryDistance: undefined,
    deliveryStatus: undefined,
    expectedTime: undefined,
    actualTime: undefined,
    params: {
    }
  },
  rules: {
    orderDeliveryId: [
      { required: true, message: "订单配送Id不能为空", trigger: "blur" }
    ],
    orderId: [
      { required: true, message: "订单ID不能为空", trigger: "blur" }
    ],
    orderType: [
      { required: true, message: "订单业务类型不能为空", trigger: "change" }
    ],
  }
});

const { queryParams, form, rules } = toRefs(data);

/** 查询订单配送专用列表 */
const getList = async () => {
  loading.value = true;
  const res = await listOrderDelivery(queryParams.value);
  orderDeliveryList.value = res.rows;
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
  orderDeliveryFormRef.value?.resetFields();
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
const handleSelectionChange = (selection: OrderDeliveryVO[]) => {
  ids.value = selection.map(item => item.orderDeliveryId);
  single.value = selection.length != 1;
  multiple.value = !selection.length;
}

/** 新增按钮操作 */
const handleAdd = () => {
  reset();
  dialog.visible = true;
  dialog.title = "添加订单配送专用";
}

/** 修改按钮操作 */
const handleUpdate = async (row?: OrderDeliveryVO) => {
  reset();
  const _orderDeliveryId = row?.orderDeliveryId || ids.value[0]
  const res = await getOrderDelivery(_orderDeliveryId);
  Object.assign(form.value, res.data);
  dialog.visible = true;
  dialog.title = "修改订单配送专用";
}

/** 提交按钮 */
const submitForm = () => {
  orderDeliveryFormRef.value?.validate(async (valid: boolean) => {
    if (valid) {
      buttonLoading.value = true;
      if (form.value.orderDeliveryId) {
        await updateOrderDelivery(form.value).finally(() =>  buttonLoading.value = false);
      } else {
        await addOrderDelivery(form.value).finally(() =>  buttonLoading.value = false);
      }
      proxy?.$modal.msgSuccess("操作成功");
      dialog.visible = false;
      await getList();
    }
  });
}

/** 删除按钮操作 */
const handleDelete = async (row?: OrderDeliveryVO) => {
  const _orderDeliveryIds = row?.orderDeliveryId || ids.value;
  await proxy?.$modal.confirm('是否确认删除订单配送专用编号为"' + _orderDeliveryIds + '"的数据项？').finally(() => loading.value = false);
  await delOrderDelivery(_orderDeliveryIds);
  proxy?.$modal.msgSuccess("删除成功");
  await getList();
}

/** 导出按钮操作 */
const handleExport = () => {
  proxy?.download('ecom/orderDelivery/export', {
    ...queryParams.value
  }, `orderDelivery_${new Date().getTime()}.xlsx`)
}

onMounted(() => {
  getList();
});
</script>
