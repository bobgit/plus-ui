<template>
  <div class="p-2">
    <transition :enter-active-class="proxy?.animate.searchAnimate.enter" :leave-active-class="proxy?.animate.searchAnimate.leave">
      <div v-show="showSearch" class="mb-[10px]">
        <el-card shadow="hover">
          <el-form ref="queryFormRef" :model="queryParams" :inline="true">
            <el-form-item label="分类ID" prop="categoryId">
              <el-input v-model="queryParams.categoryId" placeholder="请输入分类ID" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="品牌ID" prop="brandId">
              <el-input v-model="queryParams.brandId" placeholder="请输入品牌ID" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="所属类型" prop="ownerType">
              <el-select v-model="queryParams.ownerType" placeholder="请选择所属类型" clearable >
                <el-option v-for="dict in owner_type" :key="dict.value" :label="dict.label" :value="dict.value"/>
              </el-select>
            </el-form-item>
            <el-form-item label="所属ID" prop="ownerId">
              <el-input v-model="queryParams.ownerId" placeholder="请输入所属ID" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="产品业务类型" prop="productType">
              <el-select v-model="queryParams.productType" placeholder="请选择产品业务类型" clearable >
                <el-option v-for="dict in sys_capability_type" :key="dict.value" :label="dict.label" :value="dict.value"/>
              </el-select>
            </el-form-item>
            <el-form-item label="SPU名称" prop="spuName">
              <el-input v-model="queryParams.spuName" placeholder="请输入SPU名称" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="SPU描述" prop="spuDesc">
              <el-input v-model="queryParams.spuDesc" placeholder="请输入SPU描述" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="商品打包信息" prop="packingList">
              <el-input v-model="queryParams.packingList" placeholder="请输入商品打包信息" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="售后服务" prop="afterService">
              <el-input v-model="queryParams.afterService" placeholder="请输入售后服务" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="最低价格" prop="minPrice">
              <el-input v-model="queryParams.minPrice" placeholder="请输入最低价格" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="最高价格" prop="maxPrice">
              <el-input v-model="queryParams.maxPrice" placeholder="请输入最高价格" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="总销量" prop="totalSales">
              <el-input v-model="queryParams.totalSales" placeholder="请输入总销量" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="总库存" prop="totalStock">
              <el-input v-model="queryParams.totalStock" placeholder="请输入总库存" clearable @keyup.enter="handleQuery" />
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
            <el-button type="primary" plain icon="Plus" @click="handleAdd" v-hasPermi="['ecom:productSpu:add']">新增</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="success" plain icon="Edit" :disabled="single" @click="handleUpdate()" v-hasPermi="['ecom:productSpu:edit']">修改</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="danger" plain icon="Delete" :disabled="multiple" @click="handleDelete()" v-hasPermi="['ecom:productSpu:remove']">删除</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="warning" plain icon="Download" @click="handleExport" v-hasPermi="['ecom:productSpu:export']">导出</el-button>
          </el-col>
          <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
        </el-row>
      </template>

      <el-table v-loading="loading" border :data="productSpuList" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column label="SPU ID" align="center" prop="spuId" v-if="true" />
        <el-table-column label="分类ID" align="center" prop="categoryId" />
        <el-table-column label="品牌ID" align="center" prop="brandId" />
        <el-table-column label="所属类型" align="center" prop="ownerType">
          <template #default="scope">
            <dict-tag :options="owner_type" :value="scope.row.ownerType"/>
          </template>
        </el-table-column>
        <el-table-column label="所属ID" align="center" prop="ownerId" />
        <el-table-column label="产品业务类型" align="center" prop="productType">
          <template #default="scope">
            <dict-tag :options="sys_capability_type" :value="scope.row.productType"/>
          </template>
        </el-table-column>
        <el-table-column label="SPU名称" align="center" prop="spuName" />
        <el-table-column label="SPU描述" align="center" prop="spuDesc" />
        <el-table-column label="商品打包信息" align="center" prop="packingList" />
        <el-table-column label="售后服务" align="center" prop="afterService" />
        <el-table-column label="规格说明" align="center" prop="genericSpec" />
        <el-table-column label="SPU图片JSON" align="center" prop="spuImages" />
        <el-table-column label="最低价格" align="center" prop="minPrice" />
        <el-table-column label="最高价格" align="center" prop="maxPrice" />
        <el-table-column label="总销量" align="center" prop="totalSales" />
        <el-table-column label="总库存" align="center" prop="totalStock" />
        <el-table-column label="状态" align="center" prop="status" />
        <el-table-column label="审核状态" align="center" prop="auditStatus" />
        <el-table-column label="备注" align="center" prop="remark" />
        <el-table-column label="操作" align="center" fixed="right"  class-name="small-padding fixed-width">
          <template #default="scope">
            <el-tooltip content="修改" placement="top">
              <el-button link type="primary" icon="Edit" @click="handleUpdate(scope.row)" v-hasPermi="['ecom:productSpu:edit']"></el-button>
            </el-tooltip>
            <el-tooltip content="删除" placement="top">
              <el-button link type="primary" icon="Delete" @click="handleDelete(scope.row)" v-hasPermi="['ecom:productSpu:remove']"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <pagination v-show="total > 0" :total="total" v-model:page="queryParams.pageNum" v-model:limit="queryParams.pageSize" @pagination="getList" />
    </el-card>
    <!-- 添加或修改SPU标准产品单元对话框 -->
    <el-dialog :title="dialog.title" v-model="dialog.visible" width="500px" append-to-body>
      <el-form ref="productSpuFormRef" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="分类ID" prop="categoryId">
          <el-input v-model="form.categoryId" placeholder="请输入分类ID" />
        </el-form-item>
        <el-form-item label="品牌ID" prop="brandId">
          <el-input v-model="form.brandId" placeholder="请输入品牌ID" />
        </el-form-item>
        <el-form-item label="所属类型" prop="ownerType">
          <el-select v-model="form.ownerType" placeholder="请选择所属类型">
            <el-option
                v-for="dict in owner_type"
                :key="dict.value"
                :label="dict.label"
                :value="dict.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属ID" prop="ownerId">
          <el-input v-model="form.ownerId" placeholder="请输入所属ID" />
        </el-form-item>
        <el-form-item label="产品业务类型" prop="productType">
          <el-select v-model="form.productType" placeholder="请选择产品业务类型">
            <el-option
                v-for="dict in sys_capability_type"
                :key="dict.value"
                :label="dict.label"
                :value="dict.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="SPU名称" prop="spuName">
          <el-input v-model="form.spuName" placeholder="请输入SPU名称" />
        </el-form-item>
        <el-form-item label="SPU描述" prop="spuDesc">
            <el-input v-model="form.spuDesc" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="商品打包信息" prop="packingList">
          <el-input v-model="form.packingList" placeholder="请输入商品打包信息" />
        </el-form-item>
        <el-form-item label="售后服务" prop="afterService">
          <el-input v-model="form.afterService" placeholder="请输入售后服务" />
        </el-form-item>
        <el-form-item label="规格说明">
          <editor v-model="form.genericSpec" :min-height="192"/>
        </el-form-item>
        <el-form-item label="SPU图片JSON">
          <editor v-model="form.spuImages" :min-height="192"/>
        </el-form-item>
        <el-form-item label="最低价格" prop="minPrice">
          <el-input v-model="form.minPrice" placeholder="请输入最低价格" />
        </el-form-item>
        <el-form-item label="最高价格" prop="maxPrice">
          <el-input v-model="form.maxPrice" placeholder="请输入最高价格" />
        </el-form-item>
        <el-form-item label="总销量" prop="totalSales">
          <el-input v-model="form.totalSales" placeholder="请输入总销量" />
        </el-form-item>
        <el-form-item label="总库存" prop="totalStock">
          <el-input v-model="form.totalStock" placeholder="请输入总库存" />
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

<script setup name="ProductSpu" lang="ts">
import { listProductSpu, getProductSpu, delProductSpu, addProductSpu, updateProductSpu } from '@/api/ecom/productSpu';
import { ProductSpuVO, ProductSpuQuery, ProductSpuForm } from '@/api/ecom/productSpu/types';

const { proxy } = getCurrentInstance() as ComponentInternalInstance;
const { owner_type, sys_capability_type } = toRefs<any>(proxy?.useDict('owner_type', 'sys_capability_type'));

const productSpuList = ref<ProductSpuVO[]>([]);
const buttonLoading = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const ids = ref<Array<string | number>>([]);
const single = ref(true);
const multiple = ref(true);
const total = ref(0);

const queryFormRef = ref<ElFormInstance>();
const productSpuFormRef = ref<ElFormInstance>();

const dialog = reactive<DialogOption>({
  visible: false,
  title: ''
});

const initFormData: ProductSpuForm = {
  spuId: undefined,
  categoryId: undefined,
  brandId: undefined,
  ownerType: undefined,
  ownerId: undefined,
  productType: undefined,
  spuName: undefined,
  spuDesc: undefined,
  packingList: undefined,
  afterService: undefined,
  genericSpec: undefined,
  spuImages: undefined,
  minPrice: undefined,
  maxPrice: undefined,
  totalSales: undefined,
  totalStock: undefined,
  status: undefined,
  auditStatus: undefined,
  remark: undefined
}
const data = reactive<PageData<ProductSpuForm, ProductSpuQuery>>({
  form: {...initFormData},
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    categoryId: undefined,
    brandId: undefined,
    ownerType: undefined,
    ownerId: undefined,
    productType: undefined,
    spuName: undefined,
    spuDesc: undefined,
    packingList: undefined,
    afterService: undefined,
    genericSpec: undefined,
    spuImages: undefined,
    minPrice: undefined,
    maxPrice: undefined,
    totalSales: undefined,
    totalStock: undefined,
    status: undefined,
    auditStatus: undefined,
    params: {
    }
  },
  rules: {
    spuId: [
      { required: true, message: "SPU ID不能为空", trigger: "blur" }
    ],
    categoryId: [
      { required: true, message: "分类ID不能为空", trigger: "blur" }
    ],
    spuName: [
      { required: true, message: "SPU名称不能为空", trigger: "blur" }
    ],
  }
});

const { queryParams, form, rules } = toRefs(data);

/** 查询SPU标准产品单元列表 */
const getList = async () => {
  loading.value = true;
  const res = await listProductSpu(queryParams.value);
  productSpuList.value = res.rows;
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
  productSpuFormRef.value?.resetFields();
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
const handleSelectionChange = (selection: ProductSpuVO[]) => {
  ids.value = selection.map(item => item.spuId);
  single.value = selection.length != 1;
  multiple.value = !selection.length;
}

/** 新增按钮操作 */
const handleAdd = () => {
  reset();
  dialog.visible = true;
  dialog.title = "添加SPU标准产品单元";
}

/** 修改按钮操作 */
const handleUpdate = async (row?: ProductSpuVO) => {
  reset();
  const _spuId = row?.spuId || ids.value[0]
  const res = await getProductSpu(_spuId);
  Object.assign(form.value, res.data);
  dialog.visible = true;
  dialog.title = "修改SPU标准产品单元";
}

/** 提交按钮 */
const submitForm = () => {
  productSpuFormRef.value?.validate(async (valid: boolean) => {
    if (valid) {
      buttonLoading.value = true;
      if (form.value.spuId) {
        await updateProductSpu(form.value).finally(() =>  buttonLoading.value = false);
      } else {
        await addProductSpu(form.value).finally(() =>  buttonLoading.value = false);
      }
      proxy?.$modal.msgSuccess("操作成功");
      dialog.visible = false;
      await getList();
    }
  });
}

/** 删除按钮操作 */
const handleDelete = async (row?: ProductSpuVO) => {
  const _spuIds = row?.spuId || ids.value;
  await proxy?.$modal.confirm('是否确认删除SPU标准产品单元编号为"' + _spuIds + '"的数据项？').finally(() => loading.value = false);
  await delProductSpu(_spuIds);
  proxy?.$modal.msgSuccess("删除成功");
  await getList();
}

/** 导出按钮操作 */
const handleExport = () => {
  proxy?.download('ecom/productSpu/export', {
    ...queryParams.value
  }, `productSpu_${new Date().getTime()}.xlsx`)
}

onMounted(() => {
  getList();
});
</script>
