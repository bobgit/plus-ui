<template>
  <div class="p-2">
    <transition :enter-active-class="proxy?.animate.searchAnimate.enter" :leave-active-class="proxy?.animate.searchAnimate.leave">
      <div v-show="showSearch" class="mb-[10px]">
        <el-card shadow="hover">
          <el-form ref="queryFormRef" :model="queryParams" :inline="true">
            <el-form-item label="订单ID" prop="orderId">
              <el-input v-model="queryParams.orderId" placeholder="请输入订单ID" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="活动商品ID" prop="activityProductId">
              <el-input v-model="queryParams.activityProductId" placeholder="请输入活动商品ID" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="SPU ID" prop="spuId">
              <el-input v-model="queryParams.spuId" placeholder="请输入SPU ID" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="SKU ID" prop="skuId">
              <el-input v-model="queryParams.skuId" placeholder="请输入SKU ID" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="spu名称" prop="spuName">
              <el-input v-model="queryParams.spuName" placeholder="请输入spu名称" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="商品名称" prop="skuName">
              <el-input v-model="queryParams.skuName" placeholder="请输入商品名称" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="活动Id" prop="activityId">
              <el-input v-model="queryParams.activityId" placeholder="请输入活动Id" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="经营归属类型" prop="ownerType">
              <el-select v-model="queryParams.ownerType" placeholder="请选择经营归属类型" clearable >
                <el-option v-for="dict in owner_type" :key="dict.value" :label="dict.label" :value="dict.value"/>
              </el-select>
            </el-form-item>
            <el-form-item label="经营归属ID" prop="ownerId">
              <el-input v-model="queryParams.ownerId" placeholder="请输入经营归属ID" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="单价" prop="price">
              <el-input v-model="queryParams.price" placeholder="请输入单价" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="数量" prop="quantity">
              <el-input v-model="queryParams.quantity" placeholder="请输入数量" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="小计" prop="totalAmount">
              <el-input v-model="queryParams.totalAmount" placeholder="请输入小计" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="退款金额" prop="refundAmount">
              <el-input v-model="queryParams.refundAmount" placeholder="请输入退款金额" clearable @keyup.enter="handleQuery" />
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
            <el-button type="primary" plain icon="Plus" @click="handleAdd" v-hasPermi="['ecom:orderItem:add']">新增</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="success" plain icon="Edit" :disabled="single" @click="handleUpdate()" v-hasPermi="['ecom:orderItem:edit']">修改</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="danger" plain icon="Delete" :disabled="multiple" @click="handleDelete()" v-hasPermi="['ecom:orderItem:remove']">删除</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="warning" plain icon="Download" @click="handleExport" v-hasPermi="['ecom:orderItem:export']">导出</el-button>
          </el-col>
          <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
        </el-row>
      </template>

      <el-table v-loading="loading" border :data="orderItemList" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column label="明细ID" align="center" prop="itemId" v-if="true" />
        <el-table-column label="订单ID" align="center" prop="orderId" />
        <el-table-column label="活动商品ID" align="center" prop="activityProductId" />
        <el-table-column label="SPU ID" align="center" prop="spuId" />
        <el-table-column label="SKU ID" align="center" prop="skuId" />
        <el-table-column label="spu名称" align="center" prop="spuName" />
        <el-table-column label="商品名称" align="center" prop="skuName" />
        <el-table-column label="商品图片" align="center" prop="skuImageUrl" width="100">
          <template #default="scope">
            <image-preview :src="scope.row.skuImageUrl" :width="50" :height="50"/>
          </template>
        </el-table-column>
        <el-table-column label="活动Id" align="center" prop="activityId" />
        <el-table-column label="经营归属类型" align="center" prop="ownerType">
          <template #default="scope">
            <dict-tag :options="owner_type" :value="scope.row.ownerType"/>
          </template>
        </el-table-column>
        <el-table-column label="经营归属ID" align="center" prop="ownerId" />
        <el-table-column label="单价" align="center" prop="price" />
        <el-table-column label="数量" align="center" prop="quantity" />
        <el-table-column label="小计" align="center" prop="totalAmount" />
        <el-table-column label="退款状态" align="center" prop="refundStatus" />
        <el-table-column label="退款金额" align="center" prop="refundAmount" />
        <el-table-column label="备注" align="center" prop="remark" />
        <el-table-column label="操作" align="center" fixed="right"  class-name="small-padding fixed-width">
          <template #default="scope">
            <el-tooltip content="修改" placement="top">
              <el-button link type="primary" icon="Edit" @click="handleUpdate(scope.row)" v-hasPermi="['ecom:orderItem:edit']"></el-button>
            </el-tooltip>
            <el-tooltip content="删除" placement="top">
              <el-button link type="primary" icon="Delete" @click="handleDelete(scope.row)" v-hasPermi="['ecom:orderItem:remove']"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <pagination v-show="total > 0" :total="total" v-model:page="queryParams.pageNum" v-model:limit="queryParams.pageSize" @pagination="getList" />
    </el-card>
    <!-- 添加或修改订单明细对话框 -->
    <el-dialog :title="dialog.title" v-model="dialog.visible" width="500px" append-to-body>
      <el-form ref="orderItemFormRef" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="订单ID" prop="orderId">
          <el-input v-model="form.orderId" placeholder="请输入订单ID" />
        </el-form-item>
        <el-form-item label="活动商品ID" prop="activityProductId">
          <el-input v-model="form.activityProductId" placeholder="请输入活动商品ID" />
        </el-form-item>
        <el-form-item label="SPU ID" prop="spuId">
          <el-input v-model="form.spuId" placeholder="请输入SPU ID" />
        </el-form-item>
        <el-form-item label="SKU ID" prop="skuId">
          <el-input v-model="form.skuId" placeholder="请输入SKU ID" />
        </el-form-item>
        <el-form-item label="spu名称" prop="spuName">
          <el-input v-model="form.spuName" placeholder="请输入spu名称" />
        </el-form-item>
        <el-form-item label="商品名称" prop="skuName">
          <el-input v-model="form.skuName" placeholder="请输入商品名称" />
        </el-form-item>
        <el-form-item label="商品图片" prop="skuImage">
          <image-upload v-model="form.skuImage"/>
        </el-form-item>
        <el-form-item label="活动Id" prop="activityId">
          <el-input v-model="form.activityId" placeholder="请输入活动Id" />
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
        <el-form-item label="单价" prop="price">
          <el-input v-model="form.price" placeholder="请输入单价" />
        </el-form-item>
        <el-form-item label="数量" prop="quantity">
          <el-input v-model="form.quantity" placeholder="请输入数量" />
        </el-form-item>
        <el-form-item label="小计" prop="totalAmount">
          <el-input v-model="form.totalAmount" placeholder="请输入小计" />
        </el-form-item>
        <el-form-item label="退款金额" prop="refundAmount">
          <el-input v-model="form.refundAmount" placeholder="请输入退款金额" />
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

<script setup name="OrderItem" lang="ts">
import { listOrderItem, getOrderItem, delOrderItem, addOrderItem, updateOrderItem } from '@/api/ecom/orderItem';
import { OrderItemVO, OrderItemQuery, OrderItemForm } from '@/api/ecom/orderItem/types';

const { proxy } = getCurrentInstance() as ComponentInternalInstance;
const { owner_type } = toRefs<any>(proxy?.useDict('owner_type'));

const orderItemList = ref<OrderItemVO[]>([]);
const buttonLoading = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const ids = ref<Array<string | number>>([]);
const single = ref(true);
const multiple = ref(true);
const total = ref(0);

const queryFormRef = ref<ElFormInstance>();
const orderItemFormRef = ref<ElFormInstance>();

const dialog = reactive<DialogOption>({
  visible: false,
  title: ''
});

const initFormData: OrderItemForm = {
  itemId: undefined,
  orderId: undefined,
  activityProductId: undefined,
  spuId: undefined,
  skuId: undefined,
  spuName: undefined,
  skuName: undefined,
  skuImage: undefined,
  activityId: undefined,
  ownerType: undefined,
  ownerId: undefined,
  price: undefined,
  quantity: undefined,
  totalAmount: undefined,
  refundStatus: undefined,
  refundAmount: undefined,
  remark: undefined
}
const data = reactive<PageData<OrderItemForm, OrderItemQuery>>({
  form: {...initFormData},
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    orderId: undefined,
    activityProductId: undefined,
    spuId: undefined,
    skuId: undefined,
    spuName: undefined,
    skuName: undefined,
    skuImage: undefined,
    activityId: undefined,
    ownerType: undefined,
    ownerId: undefined,
    price: undefined,
    quantity: undefined,
    totalAmount: undefined,
    refundStatus: undefined,
    refundAmount: undefined,
    params: {
    }
  },
  rules: {
    itemId: [
      { required: true, message: "明细ID不能为空", trigger: "blur" }
    ],
    orderId: [
      { required: true, message: "订单ID不能为空", trigger: "blur" }
    ],
    activityProductId: [
      { required: true, message: "活动商品ID不能为空", trigger: "blur" }
    ],
    spuId: [
      { required: true, message: "SPU ID不能为空", trigger: "blur" }
    ],
    skuId: [
      { required: true, message: "SKU ID不能为空", trigger: "blur" }
    ],
    spuName: [
      { required: true, message: "spu名称不能为空", trigger: "blur" }
    ],
    skuName: [
      { required: true, message: "商品名称不能为空", trigger: "blur" }
    ],
    activityId: [
      { required: true, message: "活动Id不能为空", trigger: "blur" }
    ],
  }
});

const { queryParams, form, rules } = toRefs(data);

/** 查询订单明细列表 */
const getList = async () => {
  loading.value = true;
  const res = await listOrderItem(queryParams.value);
  orderItemList.value = res.rows;
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
  orderItemFormRef.value?.resetFields();
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
const handleSelectionChange = (selection: OrderItemVO[]) => {
  ids.value = selection.map(item => item.itemId);
  single.value = selection.length != 1;
  multiple.value = !selection.length;
}

/** 新增按钮操作 */
const handleAdd = () => {
  reset();
  dialog.visible = true;
  dialog.title = "添加订单明细";
}

/** 修改按钮操作 */
const handleUpdate = async (row?: OrderItemVO) => {
  reset();
  const _itemId = row?.itemId || ids.value[0]
  const res = await getOrderItem(_itemId);
  Object.assign(form.value, res.data);
  dialog.visible = true;
  dialog.title = "修改订单明细";
}

/** 提交按钮 */
const submitForm = () => {
  orderItemFormRef.value?.validate(async (valid: boolean) => {
    if (valid) {
      buttonLoading.value = true;
      if (form.value.itemId) {
        await updateOrderItem(form.value).finally(() =>  buttonLoading.value = false);
      } else {
        await addOrderItem(form.value).finally(() =>  buttonLoading.value = false);
      }
      proxy?.$modal.msgSuccess("操作成功");
      dialog.visible = false;
      await getList();
    }
  });
}

/** 删除按钮操作 */
const handleDelete = async (row?: OrderItemVO) => {
  const _itemIds = row?.itemId || ids.value;
  await proxy?.$modal.confirm('是否确认删除订单明细编号为"' + _itemIds + '"的数据项？').finally(() => loading.value = false);
  await delOrderItem(_itemIds);
  proxy?.$modal.msgSuccess("删除成功");
  await getList();
}

/** 导出按钮操作 */
const handleExport = () => {
  proxy?.download('ecom/orderItem/export', {
    ...queryParams.value
  }, `orderItem_${new Date().getTime()}.xlsx`)
}

onMounted(() => {
  getList();
});
</script>
