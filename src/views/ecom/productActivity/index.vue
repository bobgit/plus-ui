<template>
  <div class="p-2">
    <transition :enter-active-class="proxy?.animate.searchAnimate.enter" :leave-active-class="proxy?.animate.searchAnimate.leave">
      <div v-show="showSearch" class="mb-[10px]">
        <el-card shadow="hover">
          <el-form ref="queryFormRef" :model="queryParams" :inline="true">
            <el-form-item label="活动ID" prop="activityId">
              <el-input v-model="queryParams.activityId" placeholder="请输入活动ID" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="SPU ID" prop="spuId">
              <el-input v-model="queryParams.spuId" placeholder="请输入SPU ID" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="SKU ID" prop="skuId">
              <el-input v-model="queryParams.skuId" placeholder="请输入SKU ID" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="活动所属ID" prop="ownerId">
              <el-input v-model="queryParams.ownerId" placeholder="请输入活动所属ID" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="履约ID" prop="fulfillmentId">
              <el-input v-model="queryParams.fulfillmentId" placeholder="请输入履约ID" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="活动商品标题" prop="activityTitle">
              <el-input v-model="queryParams.activityTitle" placeholder="请输入活动商品标题" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="活动价格" prop="activityPrice">
              <el-input v-model="queryParams.activityPrice" placeholder="请输入活动价格" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="活动配额库存" prop="activityStock">
              <el-input v-model="queryParams.activityStock" placeholder="请输入活动配额库存" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="最小成团人数" prop="minGroupSize">
              <el-input v-model="queryParams.minGroupSize" placeholder="请输入最小成团人数" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="最大成团人数" prop="maxGroupSize">
              <el-input v-model="queryParams.maxGroupSize" placeholder="请输入最大成团人数" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="每人限购数量" prop="limitPerUser">
              <el-input v-model="queryParams.limitPerUser" placeholder="请输入每人限购数量" clearable @keyup.enter="handleQuery" />
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
            <el-button type="primary" plain icon="Plus" @click="handleAdd" v-hasPermi="['ecom:productActivity:add']">新增</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="success" plain icon="Edit" :disabled="single" @click="handleUpdate()" v-hasPermi="['ecom:productActivity:edit']">修改</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="danger" plain icon="Delete" :disabled="multiple" @click="handleDelete()" v-hasPermi="['ecom:productActivity:remove']">删除</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="warning" plain icon="Download" @click="handleExport" v-hasPermi="['ecom:productActivity:export']">导出</el-button>
          </el-col>
          <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
        </el-row>
      </template>

      <el-table v-loading="loading" border :data="productActivityList" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column label="关联ID" align="center" prop="activityProductId" v-if="true" />
        <el-table-column label="活动ID" align="center" prop="activityId" />
        <el-table-column label="SPU ID" align="center" prop="spuId" />
        <el-table-column label="SKU ID" align="center" prop="skuId" />
        <el-table-column label="活动所属类型" align="center" prop="ownerType" />
        <el-table-column label="活动所属ID" align="center" prop="ownerId" />
        <el-table-column label="履约类型" align="center" prop="fulfillmentType" />
        <el-table-column label="履约ID" align="center" prop="fulfillmentId" />
        <el-table-column label="活动商品标题" align="center" prop="activityTitle" />
        <el-table-column label="活动价格" align="center" prop="activityPrice" />
        <el-table-column label="活动配额库存" align="center" prop="activityStock" />
        <el-table-column label="最小成团人数" align="center" prop="minGroupSize" />
        <el-table-column label="最大成团人数" align="center" prop="maxGroupSize" />
        <el-table-column label="每人限购数量" align="center" prop="limitPerUser" />
        <el-table-column label="状态" align="center" prop="status" />
        <el-table-column label="审核状态" align="center" prop="auditStatus" />
        <el-table-column label="备注" align="center" prop="remark" />
        <el-table-column label="操作" align="center" fixed="right"  class-name="small-padding fixed-width">
          <template #default="scope">
            <el-tooltip content="修改" placement="top">
              <el-button link type="primary" icon="Edit" @click="handleUpdate(scope.row)" v-hasPermi="['ecom:productActivity:edit']"></el-button>
            </el-tooltip>
            <el-tooltip content="删除" placement="top">
              <el-button link type="primary" icon="Delete" @click="handleDelete(scope.row)" v-hasPermi="['ecom:productActivity:remove']"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <pagination v-show="total > 0" :total="total" v-model:page="queryParams.pageNum" v-model:limit="queryParams.pageSize" @pagination="getList" />
    </el-card>
    <!-- 添加或修改活动商品关联对话框 -->
    <el-dialog :title="dialog.title" v-model="dialog.visible" width="500px" append-to-body>
      <el-form ref="productActivityFormRef" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="活动ID" prop="activityId">
          <el-input v-model="form.activityId" placeholder="请输入活动ID" />
        </el-form-item>
        <el-form-item label="SPU ID" prop="spuId">
          <el-input v-model="form.spuId" placeholder="请输入SPU ID" />
        </el-form-item>
        <el-form-item label="SKU ID" prop="skuId">
          <el-input v-model="form.skuId" placeholder="请输入SKU ID" />
        </el-form-item>
        <el-form-item label="活动所属ID" prop="ownerId">
          <el-input v-model="form.ownerId" placeholder="请输入活动所属ID" />
        </el-form-item>
        <el-form-item label="履约ID" prop="fulfillmentId">
          <el-input v-model="form.fulfillmentId" placeholder="请输入履约ID" />
        </el-form-item>
        <el-form-item label="活动商品标题" prop="activityTitle">
          <el-input v-model="form.activityTitle" placeholder="请输入活动商品标题" />
        </el-form-item>
        <el-form-item label="活动价格" prop="activityPrice">
          <el-input v-model="form.activityPrice" placeholder="请输入活动价格" />
        </el-form-item>
        <el-form-item label="活动配额库存" prop="activityStock">
          <el-input v-model="form.activityStock" placeholder="请输入活动配额库存" />
        </el-form-item>
        <el-form-item label="最小成团人数" prop="minGroupSize">
          <el-input v-model="form.minGroupSize" placeholder="请输入最小成团人数" />
        </el-form-item>
        <el-form-item label="最大成团人数" prop="maxGroupSize">
          <el-input v-model="form.maxGroupSize" placeholder="请输入最大成团人数" />
        </el-form-item>
        <el-form-item label="每人限购数量" prop="limitPerUser">
          <el-input v-model="form.limitPerUser" placeholder="请输入每人限购数量" />
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

<script setup name="ProductActivity" lang="ts">
import { listProductActivity, getProductActivity, delProductActivity, addProductActivity, updateProductActivity } from '@/api/ecom/productActivity';
import { ProductActivityVO, ProductActivityQuery, ProductActivityForm } from '@/api/ecom/productActivity/types';

const { proxy } = getCurrentInstance() as ComponentInternalInstance;

const productActivityList = ref<ProductActivityVO[]>([]);
const buttonLoading = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const ids = ref<Array<string | number>>([]);
const single = ref(true);
const multiple = ref(true);
const total = ref(0);

const queryFormRef = ref<ElFormInstance>();
const productActivityFormRef = ref<ElFormInstance>();

const dialog = reactive<DialogOption>({
  visible: false,
  title: ''
});

const initFormData: ProductActivityForm = {
  activityProductId: undefined,
  activityId: undefined,
  spuId: undefined,
  skuId: undefined,
  ownerType: undefined,
  ownerId: undefined,
  fulfillmentType: undefined,
  fulfillmentId: undefined,
  activityTitle: undefined,
  activityPrice: undefined,
  activityStock: undefined,
  minGroupSize: undefined,
  maxGroupSize: undefined,
  limitPerUser: undefined,
  status: undefined,
  auditStatus: undefined,
  remark: undefined
}
const data = reactive<PageData<ProductActivityForm, ProductActivityQuery>>({
  form: {...initFormData},
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    activityId: undefined,
    spuId: undefined,
    skuId: undefined,
    ownerType: undefined,
    ownerId: undefined,
    fulfillmentType: undefined,
    fulfillmentId: undefined,
    activityTitle: undefined,
    activityPrice: undefined,
    activityStock: undefined,
    minGroupSize: undefined,
    maxGroupSize: undefined,
    limitPerUser: undefined,
    status: undefined,
    auditStatus: undefined,
    params: {
    }
  },
  rules: {
    activityProductId: [
      { required: true, message: "关联ID不能为空", trigger: "blur" }
    ],
    activityId: [
      { required: true, message: "活动ID不能为空", trigger: "blur" }
    ],
    spuId: [
      { required: true, message: "SPU ID不能为空", trigger: "blur" }
    ],
    skuId: [
      { required: true, message: "SKU ID不能为空", trigger: "blur" }
    ],
    activityTitle: [
      { required: true, message: "活动商品标题不能为空", trigger: "blur" }
    ],
  }
});

const { queryParams, form, rules } = toRefs(data);

/** 查询活动商品关联列表 */
const getList = async () => {
  loading.value = true;
  const res = await listProductActivity(queryParams.value);
  productActivityList.value = res.rows;
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
  productActivityFormRef.value?.resetFields();
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
const handleSelectionChange = (selection: ProductActivityVO[]) => {
  ids.value = selection.map(item => item.activityProductId);
  single.value = selection.length != 1;
  multiple.value = !selection.length;
}

/** 新增按钮操作 */
const handleAdd = () => {
  reset();
  dialog.visible = true;
  dialog.title = "添加活动商品关联";
}

/** 修改按钮操作 */
const handleUpdate = async (row?: ProductActivityVO) => {
  reset();
  const _activityProductId = row?.activityProductId || ids.value[0]
  const res = await getProductActivity(_activityProductId);
  Object.assign(form.value, res.data);
  dialog.visible = true;
  dialog.title = "修改活动商品关联";
}

/** 提交按钮 */
const submitForm = () => {
  productActivityFormRef.value?.validate(async (valid: boolean) => {
    if (valid) {
      buttonLoading.value = true;
      if (form.value.activityProductId) {
        await updateProductActivity(form.value).finally(() =>  buttonLoading.value = false);
      } else {
        await addProductActivity(form.value).finally(() =>  buttonLoading.value = false);
      }
      proxy?.$modal.msgSuccess("操作成功");
      dialog.visible = false;
      await getList();
    }
  });
}

/** 删除按钮操作 */
const handleDelete = async (row?: ProductActivityVO) => {
  const _activityProductIds = row?.activityProductId || ids.value;
  await proxy?.$modal.confirm('是否确认删除活动商品关联编号为"' + _activityProductIds + '"的数据项？').finally(() => loading.value = false);
  await delProductActivity(_activityProductIds);
  proxy?.$modal.msgSuccess("删除成功");
  await getList();
}

/** 导出按钮操作 */
const handleExport = () => {
  proxy?.download('ecom/productActivity/export', {
    ...queryParams.value
  }, `productActivity_${new Date().getTime()}.xlsx`)
}

onMounted(() => {
  getList();
});
</script>
