<template>
  <div class="p-2">
    <transition :enter-active-class="proxy?.animate.searchAnimate.enter" :leave-active-class="proxy?.animate.searchAnimate.leave">
      <div v-show="showSearch" class="mb-[10px]">
        <el-card shadow="hover">
          <el-form ref="queryFormRef" :model="queryParams" :inline="true">
            <el-form-item label="SPU ID" prop="spuId">
              <el-input v-model="queryParams.spuId" placeholder="请输入SPU ID" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="SKU名称" prop="skuName">
              <el-input v-model="queryParams.skuName" placeholder="请输入SKU名称" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="成本价格" prop="costPrice">
              <el-input v-model="queryParams.costPrice" placeholder="请输入成本价格" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="市场价" prop="marketPrice">
              <el-input v-model="queryParams.marketPrice" placeholder="请输入市场价" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="销售价" prop="price">
              <el-input v-model="queryParams.price" placeholder="请输入销售价" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="库存策略类型" prop="stockPolicyType">
              <el-select v-model="queryParams.stockPolicyType" placeholder="请选择库存策略类型" clearable >
                <el-option v-for="dict in stock_policy_type" :key="dict.value" :label="dict.label" :value="dict.value"/>
              </el-select>
            </el-form-item>
            <el-form-item label="单品销量" prop="stockQuantity">
              <el-input v-model="queryParams.stockQuantity" placeholder="请输入单品销量" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="已售数量" prop="soldQuantity">
              <el-input v-model="queryParams.soldQuantity" placeholder="请输入已售数量" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="重量" prop="weight">
              <el-input v-model="queryParams.weight" placeholder="请输入重量" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="长" prop="length">
              <el-input v-model="queryParams.length" placeholder="请输入长" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="宽" prop="width">
              <el-input v-model="queryParams.width" placeholder="请输入宽" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="高" prop="height">
              <el-input v-model="queryParams.height" placeholder="请输入高" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="二维码" prop="barCode">
              <el-input v-model="queryParams.barCode" placeholder="请输入二维码" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="编码" prop="skuCode">
              <el-input v-model="queryParams.skuCode" placeholder="请输入编码" clearable @keyup.enter="handleQuery" />
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
            <el-button type="primary" plain icon="Plus" @click="handleAdd" v-hasPermi="['ecom:productSku:add']">新增</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="success" plain icon="Edit" :disabled="single" @click="handleUpdate()" v-hasPermi="['ecom:productSku:edit']">修改</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="danger" plain icon="Delete" :disabled="multiple" @click="handleDelete()" v-hasPermi="['ecom:productSku:remove']">删除</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="warning" plain icon="Download" @click="handleExport" v-hasPermi="['ecom:productSku:export']">导出</el-button>
          </el-col>
          <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
        </el-row>
      </template>

      <el-table v-loading="loading" border :data="productSkuList" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column label="SKU ID" align="center" prop="skuId" v-if="true" />
        <el-table-column label="SPU ID" align="center" prop="spuId" />
        <el-table-column label="SKU名称" align="center" prop="skuName" />
        <el-table-column label="规格JSON" align="center" prop="skuSpec" />
        <el-table-column label="成本价格" align="center" prop="costPrice" />
        <el-table-column label="市场价" align="center" prop="marketPrice" />
        <el-table-column label="销售价" align="center" prop="price" />
        <el-table-column label="库存策略类型" align="center" prop="stockPolicyType">
          <template #default="scope">
            <dict-tag :options="stock_policy_type" :value="scope.row.stockPolicyType"/>
          </template>
        </el-table-column>
        <el-table-column label="单品销量" align="center" prop="stockQuantity" />
        <el-table-column label="已售数量" align="center" prop="soldQuantity" />
        <el-table-column label="重量" align="center" prop="weight" />
        <el-table-column label="长" align="center" prop="length" />
        <el-table-column label="宽" align="center" prop="width" />
        <el-table-column label="高" align="center" prop="height" />
        <el-table-column label="二维码" align="center" prop="barCode" />
        <el-table-column label="编码" align="center" prop="skuCode" />
        <el-table-column label="状态" align="center" prop="status" />
        <el-table-column label="备注" align="center" prop="remark" />
        <el-table-column label="操作" align="center" fixed="right"  class-name="small-padding fixed-width">
          <template #default="scope">
            <el-tooltip content="修改" placement="top">
              <el-button link type="primary" icon="Edit" @click="handleUpdate(scope.row)" v-hasPermi="['ecom:productSku:edit']"></el-button>
            </el-tooltip>
            <el-tooltip content="删除" placement="top">
              <el-button link type="primary" icon="Delete" @click="handleDelete(scope.row)" v-hasPermi="['ecom:productSku:remove']"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <pagination v-show="total > 0" :total="total" v-model:page="queryParams.pageNum" v-model:limit="queryParams.pageSize" @pagination="getList" />
    </el-card>
    <!-- 添加或修改SKU库存单元对话框 -->
    <el-dialog :title="dialog.title" v-model="dialog.visible" width="500px" append-to-body>
      <el-form ref="productSkuFormRef" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="SPU ID" prop="spuId">
          <el-input v-model="form.spuId" placeholder="请输入SPU ID" />
        </el-form-item>
        <el-form-item label="SKU名称" prop="skuName">
          <el-input v-model="form.skuName" placeholder="请输入SKU名称" />
        </el-form-item>
        <el-form-item label="规格JSON">
          <editor v-model="form.skuSpec" :min-height="192"/>
        </el-form-item>
        <el-form-item label="成本价格" prop="costPrice">
          <el-input v-model="form.costPrice" placeholder="请输入成本价格" />
        </el-form-item>
        <el-form-item label="市场价" prop="marketPrice">
          <el-input v-model="form.marketPrice" placeholder="请输入市场价" />
        </el-form-item>
        <el-form-item label="销售价" prop="price">
          <el-input v-model="form.price" placeholder="请输入销售价" />
        </el-form-item>
        <el-form-item label="库存策略类型" prop="stockPolicyType">
          <el-select v-model="form.stockPolicyType" placeholder="请选择库存策略类型">
            <el-option
                v-for="dict in stock_policy_type"
                :key="dict.value"
                :label="dict.label"
                :value="dict.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="单品销量" prop="stockQuantity">
          <el-input v-model="form.stockQuantity" placeholder="请输入单品销量" />
        </el-form-item>
        <el-form-item label="已售数量" prop="soldQuantity">
          <el-input v-model="form.soldQuantity" placeholder="请输入已售数量" />
        </el-form-item>
        <el-form-item label="重量" prop="weight">
          <el-input v-model="form.weight" placeholder="请输入重量" />
        </el-form-item>
        <el-form-item label="长" prop="length">
          <el-input v-model="form.length" placeholder="请输入长" />
        </el-form-item>
        <el-form-item label="宽" prop="width">
          <el-input v-model="form.width" placeholder="请输入宽" />
        </el-form-item>
        <el-form-item label="高" prop="height">
          <el-input v-model="form.height" placeholder="请输入高" />
        </el-form-item>
        <el-form-item label="二维码" prop="barCode">
          <el-input v-model="form.barCode" placeholder="请输入二维码" />
        </el-form-item>
        <el-form-item label="编码" prop="skuCode">
          <el-input v-model="form.skuCode" placeholder="请输入编码" />
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

<script setup name="ProductSku" lang="ts">
import { listProductSku, getProductSku, delProductSku, addProductSku, updateProductSku } from '@/api/ecom/productSku';
import { ProductSkuVO, ProductSkuQuery, ProductSkuForm } from '@/api/ecom/productSku/types';

const { proxy } = getCurrentInstance() as ComponentInternalInstance;
const { stock_policy_type } = toRefs<any>(proxy?.useDict('stock_policy_type'));

const productSkuList = ref<ProductSkuVO[]>([]);
const buttonLoading = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const ids = ref<Array<string | number>>([]);
const single = ref(true);
const multiple = ref(true);
const total = ref(0);

const queryFormRef = ref<ElFormInstance>();
const productSkuFormRef = ref<ElFormInstance>();

const dialog = reactive<DialogOption>({
  visible: false,
  title: ''
});

const initFormData: ProductSkuForm = {
  skuId: undefined,
  spuId: undefined,
  skuName: undefined,
  skuSpec: undefined,
  costPrice: undefined,
  marketPrice: undefined,
  price: undefined,
  stockPolicyType: undefined,
  stockQuantity: undefined,
  soldQuantity: undefined,
  weight: undefined,
  length: undefined,
  width: undefined,
  height: undefined,
  barCode: undefined,
  skuCode: undefined,
  status: undefined,
  remark: undefined
}
const data = reactive<PageData<ProductSkuForm, ProductSkuQuery>>({
  form: {...initFormData},
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    spuId: undefined,
    skuName: undefined,
    skuSpec: undefined,
    costPrice: undefined,
    marketPrice: undefined,
    price: undefined,
    stockPolicyType: undefined,
    stockQuantity: undefined,
    soldQuantity: undefined,
    weight: undefined,
    length: undefined,
    width: undefined,
    height: undefined,
    barCode: undefined,
    skuCode: undefined,
    status: undefined,
    params: {
    }
  },
  rules: {
    skuId: [
      { required: true, message: "SKU ID不能为空", trigger: "blur" }
    ],
    spuId: [
      { required: true, message: "SPU ID不能为空", trigger: "blur" }
    ],
    skuName: [
      { required: true, message: "SKU名称不能为空", trigger: "blur" }
    ],
  }
});

const { queryParams, form, rules } = toRefs(data);

/** 查询SKU库存单元列表 */
const getList = async () => {
  loading.value = true;
  const res = await listProductSku(queryParams.value);
  productSkuList.value = res.rows;
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
  productSkuFormRef.value?.resetFields();
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
const handleSelectionChange = (selection: ProductSkuVO[]) => {
  ids.value = selection.map(item => item.skuId);
  single.value = selection.length != 1;
  multiple.value = !selection.length;
}

/** 新增按钮操作 */
const handleAdd = () => {
  reset();
  dialog.visible = true;
  dialog.title = "添加SKU库存单元";
}

/** 修改按钮操作 */
const handleUpdate = async (row?: ProductSkuVO) => {
  reset();
  const _skuId = row?.skuId || ids.value[0]
  const res = await getProductSku(_skuId);
  Object.assign(form.value, res.data);
  dialog.visible = true;
  dialog.title = "修改SKU库存单元";
}

/** 提交按钮 */
const submitForm = () => {
  productSkuFormRef.value?.validate(async (valid: boolean) => {
    if (valid) {
      buttonLoading.value = true;
      if (form.value.skuId) {
        await updateProductSku(form.value).finally(() =>  buttonLoading.value = false);
      } else {
        await addProductSku(form.value).finally(() =>  buttonLoading.value = false);
      }
      proxy?.$modal.msgSuccess("操作成功");
      dialog.visible = false;
      await getList();
    }
  });
}

/** 删除按钮操作 */
const handleDelete = async (row?: ProductSkuVO) => {
  const _skuIds = row?.skuId || ids.value;
  await proxy?.$modal.confirm('是否确认删除SKU库存单元编号为"' + _skuIds + '"的数据项？').finally(() => loading.value = false);
  await delProductSku(_skuIds);
  proxy?.$modal.msgSuccess("删除成功");
  await getList();
}

/** 导出按钮操作 */
const handleExport = () => {
  proxy?.download('ecom/productSku/export', {
    ...queryParams.value
  }, `productSku_${new Date().getTime()}.xlsx`)
}

onMounted(() => {
  getList();
});
</script>
