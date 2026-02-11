<template>
  <div class="p-2">
    <transition :enter-active-class="proxy?.animate.searchAnimate.enter" :leave-active-class="proxy?.animate.searchAnimate.leave">
      <div v-show="showSearch" class="mb-[10px]">
        <el-card shadow="hover">
          <el-form ref="queryFormRef" :model="queryParams" :inline="true">
            <el-form-item label="商品sku ID" prop="skuId">
              <el-input v-model="queryParams.skuId" placeholder="请输入商品sku ID" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="属性键" prop="attrKey">
              <el-input v-model="queryParams.attrKey" placeholder="请输入属性键" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="属性值" prop="attrValue">
              <el-input v-model="queryParams.attrValue" placeholder="请输入属性值" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="属性类型:String,int,list" prop="attrType">
              <el-select v-model="queryParams.attrType" placeholder="请选择属性类型:String,int,list" clearable >
                <el-option v-for="dict in field_type" :key="dict.value" :label="dict.label" :value="dict.value"/>
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
            <el-button type="primary" plain icon="Plus" @click="handleAdd" v-hasPermi="['ecom:productSkuAttributes:add']">新增</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="success" plain icon="Edit" :disabled="single" @click="handleUpdate()" v-hasPermi="['ecom:productSkuAttributes:edit']">修改</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="danger" plain icon="Delete" :disabled="multiple" @click="handleDelete()" v-hasPermi="['ecom:productSkuAttributes:remove']">删除</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="warning" plain icon="Download" @click="handleExport" v-hasPermi="['ecom:productSkuAttributes:export']">导出</el-button>
          </el-col>
          <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
        </el-row>
      </template>

      <el-table v-loading="loading" border :data="productSkuAttributesList" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column label="属性ID (主键)" align="center" prop="skuAttrId" v-if="true" />
        <el-table-column label="商品sku ID" align="center" prop="skuId" />
        <el-table-column label="属性键" align="center" prop="attrKey" />
        <el-table-column label="属性值" align="center" prop="attrValue" />
        <el-table-column label="属性类型:String,int,list" align="center" prop="attrType">
          <template #default="scope">
            <dict-tag :options="field_type" :value="scope.row.attrType"/>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" fixed="right"  class-name="small-padding fixed-width">
          <template #default="scope">
            <el-tooltip content="修改" placement="top">
              <el-button link type="primary" icon="Edit" @click="handleUpdate(scope.row)" v-hasPermi="['ecom:productSkuAttributes:edit']"></el-button>
            </el-tooltip>
            <el-tooltip content="删除" placement="top">
              <el-button link type="primary" icon="Delete" @click="handleDelete(scope.row)" v-hasPermi="['ecom:productSkuAttributes:remove']"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <pagination v-show="total > 0" :total="total" v-model:page="queryParams.pageNum" v-model:limit="queryParams.pageSize" @pagination="getList" />
    </el-card>
    <!-- 添加或修改商品SKU属性对话框 -->
    <el-dialog :title="dialog.title" v-model="dialog.visible" width="500px" append-to-body>
      <el-form ref="productSkuAttributesFormRef" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="商品sku ID" prop="skuId">
          <el-input v-model="form.skuId" placeholder="请输入商品sku ID" />
        </el-form-item>
        <el-form-item label="属性键" prop="attrKey">
          <el-input v-model="form.attrKey" placeholder="请输入属性键" />
        </el-form-item>
        <el-form-item label="属性值" prop="attrValue">
          <el-input v-model="form.attrValue" placeholder="请输入属性值" />
        </el-form-item>
        <el-form-item label="属性类型:String,int,list" prop="attrType">
          <el-select v-model="form.attrType" placeholder="请选择属性类型:String,int,list">
            <el-option
                v-for="dict in field_type"
                :key="dict.value"
                :label="dict.label"
                :value="dict.value"
            ></el-option>
          </el-select>
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

<script setup name="ProductSkuAttributes" lang="ts">
import { listProductSkuAttributes, getProductSkuAttributes, delProductSkuAttributes, addProductSkuAttributes, updateProductSkuAttributes } from '@/api/ecom/productSkuAttributes';
import { ProductSkuAttributesVO, ProductSkuAttributesQuery, ProductSkuAttributesForm } from '@/api/ecom/productSkuAttributes/types';

const { proxy } = getCurrentInstance() as ComponentInternalInstance;
const { field_type, sys_normal_disable } = toRefs<any>(proxy?.useDict('field_type', 'sys_normal_disable'));

const productSkuAttributesList = ref<ProductSkuAttributesVO[]>([]);
const buttonLoading = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const ids = ref<Array<string | number>>([]);
const single = ref(true);
const multiple = ref(true);
const total = ref(0);

const queryFormRef = ref<ElFormInstance>();
const productSkuAttributesFormRef = ref<ElFormInstance>();

const dialog = reactive<DialogOption>({
  visible: false,
  title: ''
});

const initFormData: ProductSkuAttributesForm = {
  skuAttrId: undefined,
  skuId: undefined,
  attrKey: undefined,
  attrValue: undefined,
  attrType: undefined,
}
const data = reactive<PageData<ProductSkuAttributesForm, ProductSkuAttributesQuery>>({
  form: {...initFormData},
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    skuId: undefined,
    attrKey: undefined,
    attrValue: undefined,
    attrType: undefined,
    params: {
    }
  },
  rules: {
    skuAttrId: [
      { required: true, message: "属性ID (主键)不能为空", trigger: "blur" }
    ],
    skuId: [
      { required: true, message: "商品sku ID不能为空", trigger: "blur" }
    ],
    attrKey: [
      { required: true, message: "属性键不能为空", trigger: "blur" }
    ],
    attrValue: [
      { required: true, message: "属性值不能为空", trigger: "blur" }
    ],
  }
});

const { queryParams, form, rules } = toRefs(data);

/** 查询商品SKU属性列表 */
const getList = async () => {
  loading.value = true;
  const res = await listProductSkuAttributes(queryParams.value);
  productSkuAttributesList.value = res.rows;
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
  productSkuAttributesFormRef.value?.resetFields();
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
const handleSelectionChange = (selection: ProductSkuAttributesVO[]) => {
  ids.value = selection.map(item => item.skuAttrId);
  single.value = selection.length != 1;
  multiple.value = !selection.length;
}

/** 新增按钮操作 */
const handleAdd = () => {
  reset();
  dialog.visible = true;
  dialog.title = "添加商品SKU属性";
}

/** 修改按钮操作 */
const handleUpdate = async (row?: ProductSkuAttributesVO) => {
  reset();
  const _skuAttrId = row?.skuAttrId || ids.value[0]
  const res = await getProductSkuAttributes(_skuAttrId);
  Object.assign(form.value, res.data);
  dialog.visible = true;
  dialog.title = "修改商品SKU属性";
}

/** 提交按钮 */
const submitForm = () => {
  productSkuAttributesFormRef.value?.validate(async (valid: boolean) => {
    if (valid) {
      buttonLoading.value = true;
      if (form.value.skuAttrId) {
        await updateProductSkuAttributes(form.value).finally(() =>  buttonLoading.value = false);
      } else {
        await addProductSkuAttributes(form.value).finally(() =>  buttonLoading.value = false);
      }
      proxy?.$modal.msgSuccess("操作成功");
      dialog.visible = false;
      await getList();
    }
  });
}

/** 删除按钮操作 */
const handleDelete = async (row?: ProductSkuAttributesVO) => {
  const _skuAttrIds = row?.skuAttrId || ids.value;
  await proxy?.$modal.confirm('是否确认删除商品SKU属性编号为"' + _skuAttrIds + '"的数据项？').finally(() => loading.value = false);
  await delProductSkuAttributes(_skuAttrIds);
  proxy?.$modal.msgSuccess("删除成功");
  await getList();
}

/** 导出按钮操作 */
const handleExport = () => {
  proxy?.download('ecom/productSkuAttributes/export', {
    ...queryParams.value
  }, `productSkuAttributes_${new Date().getTime()}.xlsx`)
}

onMounted(() => {
  getList();
});
</script>
