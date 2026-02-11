<template>
  <div class="p-2">
    <transition :enter-active-class="proxy?.animate.searchAnimate.enter" :leave-active-class="proxy?.animate.searchAnimate.leave">
      <div v-show="showSearch" class="mb-[10px]">
        <el-card shadow="hover">
          <el-form ref="queryFormRef" :model="queryParams" :inline="true">
            <el-form-item label="父分类ID" prop="parentId">
              <el-input v-model="queryParams.parentId" placeholder="请输入父分类ID" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="分类名称" prop="categoryName">
              <el-input v-model="queryParams.categoryName" placeholder="请输入分类名称" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="分类编码" prop="categoryCode">
              <el-input v-model="queryParams.categoryCode" placeholder="请输入分类编码" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="编码路径" prop="categoryCodePath">
              <el-input v-model="queryParams.categoryCodePath" placeholder="请输入编码路径" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="分类图标" prop="icon">
              <el-input v-model="queryParams.icon" placeholder="请输入分类图标" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="排序权重" prop="sortOrder">
              <el-input v-model="queryParams.sortOrder" placeholder="请输入排序权重" clearable @keyup.enter="handleQuery" />
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
            <el-button type="primary" plain icon="Plus" @click="handleAdd" v-hasPermi="['ecom:productCategory:add']">新增</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="success" plain icon="Edit" :disabled="single" @click="handleUpdate()" v-hasPermi="['ecom:productCategory:edit']">修改</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="danger" plain icon="Delete" :disabled="multiple" @click="handleDelete()" v-hasPermi="['ecom:productCategory:remove']">删除</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="warning" plain icon="Download" @click="handleExport" v-hasPermi="['ecom:productCategory:export']">导出</el-button>
          </el-col>
          <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
        </el-row>
      </template>

      <el-table v-loading="loading" border :data="productCategoryList" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column label="分类ID" align="center" prop="categoryId" v-if="true" />
        <el-table-column label="父分类ID" align="center" prop="parentId" />
        <el-table-column label="分类名称" align="center" prop="categoryName" />
        <el-table-column label="分类编码" align="center" prop="categoryCode" />
        <el-table-column label="编码路径" align="center" prop="categoryCodePath" />
        <el-table-column label="分类图标" align="center" prop="icon" />
        <el-table-column label="业务规则" align="center" prop="ruleTemplate" />
        <el-table-column label="规格模板" align="center" prop="specTemplate" />
        <el-table-column label="运费模板ID" align="center" prop="deliveryTemplate" />
        <el-table-column label="扩展属性" align="center" prop="attributeSchema" />
        <el-table-column label="特殊管控规则" align="center" prop="specialControl" />
        <el-table-column label="排序权重" align="center" prop="sortOrder" />
        <el-table-column label="状态" align="center" prop="status" />
        <el-table-column label="备注" align="center" prop="remark" />
        <el-table-column label="操作" align="center" fixed="right"  class-name="small-padding fixed-width">
          <template #default="scope">
            <el-tooltip content="修改" placement="top">
              <el-button link type="primary" icon="Edit" @click="handleUpdate(scope.row)" v-hasPermi="['ecom:productCategory:edit']"></el-button>
            </el-tooltip>
            <el-tooltip content="删除" placement="top">
              <el-button link type="primary" icon="Delete" @click="handleDelete(scope.row)" v-hasPermi="['ecom:productCategory:remove']"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <pagination v-show="total > 0" :total="total" v-model:page="queryParams.pageNum" v-model:limit="queryParams.pageSize" @pagination="getList" />
    </el-card>
    <!-- 添加或修改商品分类对话框 -->
    <el-dialog :title="dialog.title" v-model="dialog.visible" width="500px" append-to-body>
      <el-form ref="productCategoryFormRef" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="父分类ID" prop="parentId">
          <el-input v-model="form.parentId" placeholder="请输入父分类ID" />
        </el-form-item>
        <el-form-item label="分类名称" prop="categoryName">
          <el-input v-model="form.categoryName" placeholder="请输入分类名称" />
        </el-form-item>
        <el-form-item label="分类编码" prop="categoryCode">
          <el-input v-model="form.categoryCode" placeholder="请输入分类编码" />
        </el-form-item>
        <el-form-item label="编码路径" prop="categoryCodePath">
          <el-input v-model="form.categoryCodePath" placeholder="请输入编码路径" />
        </el-form-item>
        <el-form-item label="分类图标" prop="icon">
          <el-input v-model="form.icon" placeholder="请输入分类图标" />
        </el-form-item>
        <el-form-item label="业务规则">
          <editor v-model="form.ruleTemplate" :min-height="192"/>
        </el-form-item>
        <el-form-item label="规格模板">
          <editor v-model="form.specTemplate" :min-height="192"/>
        </el-form-item>
        <el-form-item label="运费模板ID">
          <editor v-model="form.deliveryTemplate" :min-height="192"/>
        </el-form-item>
        <el-form-item label="扩展属性">
          <editor v-model="form.attributeSchema" :min-height="192"/>
        </el-form-item>
        <el-form-item label="特殊管控规则">
          <editor v-model="form.specialControl" :min-height="192"/>
        </el-form-item>
        <el-form-item label="排序权重" prop="sortOrder">
          <el-input v-model="form.sortOrder" placeholder="请输入排序权重" />
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

<script setup name="ProductCategory" lang="ts">
import { listProductCategory, getProductCategory, delProductCategory, addProductCategory, updateProductCategory } from '@/api/ecom/productCategory';
import { ProductCategoryVO, ProductCategoryQuery, ProductCategoryForm } from '@/api/ecom/productCategory/types';

const { proxy } = getCurrentInstance() as ComponentInternalInstance;

const productCategoryList = ref<ProductCategoryVO[]>([]);
const buttonLoading = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const ids = ref<Array<string | number>>([]);
const single = ref(true);
const multiple = ref(true);
const total = ref(0);

const queryFormRef = ref<ElFormInstance>();
const productCategoryFormRef = ref<ElFormInstance>();

const dialog = reactive<DialogOption>({
  visible: false,
  title: ''
});

const initFormData: ProductCategoryForm = {
  categoryId: undefined,
  parentId: undefined,
  categoryName: undefined,
  categoryCode: undefined,
  categoryCodePath: undefined,
  icon: undefined,
  ruleTemplate: undefined,
  specTemplate: undefined,
  deliveryTemplate: undefined,
  attributeSchema: undefined,
  specialControl: undefined,
  sortOrder: undefined,
  status: undefined,
  remark: undefined
}
const data = reactive<PageData<ProductCategoryForm, ProductCategoryQuery>>({
  form: {...initFormData},
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    parentId: undefined,
    categoryName: undefined,
    categoryCode: undefined,
    categoryCodePath: undefined,
    icon: undefined,
    ruleTemplate: undefined,
    specTemplate: undefined,
    deliveryTemplate: undefined,
    attributeSchema: undefined,
    specialControl: undefined,
    sortOrder: undefined,
    status: undefined,
    params: {
    }
  },
  rules: {
    categoryId: [
      { required: true, message: "分类ID不能为空", trigger: "blur" }
    ],
    categoryName: [
      { required: true, message: "分类名称不能为空", trigger: "blur" }
    ],
  }
});

const { queryParams, form, rules } = toRefs(data);

/** 查询商品分类列表 */
const getList = async () => {
  loading.value = true;
  const res = await listProductCategory(queryParams.value);
  productCategoryList.value = res.rows;
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
  productCategoryFormRef.value?.resetFields();
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
const handleSelectionChange = (selection: ProductCategoryVO[]) => {
  ids.value = selection.map(item => item.categoryId);
  single.value = selection.length != 1;
  multiple.value = !selection.length;
}

/** 新增按钮操作 */
const handleAdd = () => {
  reset();
  dialog.visible = true;
  dialog.title = "添加商品分类";
}

/** 修改按钮操作 */
const handleUpdate = async (row?: ProductCategoryVO) => {
  reset();
  const _categoryId = row?.categoryId || ids.value[0]
  const res = await getProductCategory(_categoryId);
  Object.assign(form.value, res.data);
  dialog.visible = true;
  dialog.title = "修改商品分类";
}

/** 提交按钮 */
const submitForm = () => {
  productCategoryFormRef.value?.validate(async (valid: boolean) => {
    if (valid) {
      buttonLoading.value = true;
      if (form.value.categoryId) {
        await updateProductCategory(form.value).finally(() =>  buttonLoading.value = false);
      } else {
        await addProductCategory(form.value).finally(() =>  buttonLoading.value = false);
      }
      proxy?.$modal.msgSuccess("操作成功");
      dialog.visible = false;
      await getList();
    }
  });
}

/** 删除按钮操作 */
const handleDelete = async (row?: ProductCategoryVO) => {
  const _categoryIds = row?.categoryId || ids.value;
  await proxy?.$modal.confirm('是否确认删除商品分类编号为"' + _categoryIds + '"的数据项？').finally(() => loading.value = false);
  await delProductCategory(_categoryIds);
  proxy?.$modal.msgSuccess("删除成功");
  await getList();
}

/** 导出按钮操作 */
const handleExport = () => {
  proxy?.download('ecom/productCategory/export', {
    ...queryParams.value
  }, `productCategory_${new Date().getTime()}.xlsx`)
}

onMounted(() => {
  getList();
});
</script>
