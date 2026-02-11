<template>
  <div class="p-2">
    <transition :enter-active-class="proxy?.animate.searchAnimate.enter" :leave-active-class="proxy?.animate.searchAnimate.leave">
      <div v-show="showSearch" class="mb-[10px]">
        <el-card shadow="hover">
          <el-form ref="queryFormRef" :model="queryParams" :inline="true">
            <el-form-item label="机构组织ID" prop="orgId">
              <el-input v-model="queryParams.orgId" placeholder="请输入机构组织ID" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="商品skuID" prop="skuId">
              <el-input v-model="queryParams.skuId" placeholder="请输入商品skuID" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="活动所属类型" prop="ownerType">
              <el-select v-model="queryParams.ownerType" placeholder="请选择活动所属类型" clearable >
                <el-option v-for="dict in owner_type" :key="dict.value" :label="dict.label" :value="dict.value"/>
              </el-select>
            </el-form-item>
            <el-form-item label="活动所属ID" prop="ownerId">
              <el-input v-model="queryParams.ownerId" placeholder="请输入活动所属ID" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="履约类型" prop="fulfillmentType">
              <el-select v-model="queryParams.fulfillmentType" placeholder="请选择履约类型" clearable >
                <el-option v-for="dict in fulfillment_type" :key="dict.value" :label="dict.label" :value="dict.value"/>
              </el-select>
            </el-form-item>
            <el-form-item label="履约ID" prop="fulfillmentId">
              <el-input v-model="queryParams.fulfillmentId" placeholder="请输入履约ID" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="过期时间" prop="expireTime">
              <el-date-picker clearable
                v-model="queryParams.expireTime"
                type="date"
                value-format="YYYY-MM-DD"
                placeholder="请选择过期时间"
              />
            </el-form-item>
            <el-form-item label="活动商品标题" prop="orgTitle">
              <el-input v-model="queryParams.orgTitle" placeholder="请输入活动商品标题" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="活动价格" prop="orgPrice">
              <el-input v-model="queryParams.orgPrice" placeholder="请输入活动价格" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="活动配额库存" prop="orgStock">
              <el-input v-model="queryParams.orgStock" placeholder="请输入活动配额库存" clearable @keyup.enter="handleQuery" />
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
            <el-button type="primary" plain icon="Plus" @click="handleAdd" v-hasPermi="['ecom:productOrg:add']">新增</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="success" plain icon="Edit" :disabled="single" @click="handleUpdate()" v-hasPermi="['ecom:productOrg:edit']">修改</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="danger" plain icon="Delete" :disabled="multiple" @click="handleDelete()" v-hasPermi="['ecom:productOrg:remove']">删除</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="warning" plain icon="Download" @click="handleExport" v-hasPermi="['ecom:productOrg:export']">导出</el-button>
          </el-col>
          <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
        </el-row>
      </template>

      <el-table v-loading="loading" border :data="productOrgList" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column label="机构组织商品Id" align="center" prop="orgProductId" v-if="true" />
        <el-table-column label="机构组织ID" align="center" prop="orgId" />
        <el-table-column label="商品skuID" align="center" prop="skuId" />
        <el-table-column label="活动所属类型" align="center" prop="ownerType">
          <template #default="scope">
            <dict-tag :options="owner_type" :value="scope.row.ownerType"/>
          </template>
        </el-table-column>
        <el-table-column label="活动所属ID" align="center" prop="ownerId" />
        <el-table-column label="履约类型" align="center" prop="fulfillmentType">
          <template #default="scope">
            <dict-tag :options="fulfillment_type" :value="scope.row.fulfillmentType"/>
          </template>
        </el-table-column>
        <el-table-column label="履约ID" align="center" prop="fulfillmentId" />
        <el-table-column label="过期时间" align="center" prop="expireTime" width="180">
          <template #default="scope">
            <span>{{ parseTime(scope.row.expireTime, '{y}-{m}-{d}') }}</span>
          </template>
        </el-table-column>
        <el-table-column label="活动商品标题" align="center" prop="orgTitle" />
        <el-table-column label="活动价格" align="center" prop="orgPrice" />
        <el-table-column label="活动配额库存" align="center" prop="orgStock" />
        <el-table-column label="操作" align="center" fixed="right"  class-name="small-padding fixed-width">
          <template #default="scope">
            <el-tooltip content="修改" placement="top">
              <el-button link type="primary" icon="Edit" @click="handleUpdate(scope.row)" v-hasPermi="['ecom:productOrg:edit']"></el-button>
            </el-tooltip>
            <el-tooltip content="删除" placement="top">
              <el-button link type="primary" icon="Delete" @click="handleDelete(scope.row)" v-hasPermi="['ecom:productOrg:remove']"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <pagination v-show="total > 0" :total="total" v-model:page="queryParams.pageNum" v-model:limit="queryParams.pageSize" @pagination="getList" />
    </el-card>
    <!-- 添加或修改机构组织商品对话框 -->
    <el-dialog :title="dialog.title" v-model="dialog.visible" width="500px" append-to-body>
      <el-form ref="productOrgFormRef" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="机构组织ID" prop="orgId">
          <el-input v-model="form.orgId" placeholder="请输入机构组织ID" />
        </el-form-item>
        <el-form-item label="商品skuID" prop="skuId">
          <el-input v-model="form.skuId" placeholder="请输入商品skuID" />
        </el-form-item>
        <el-form-item label="活动所属类型" prop="ownerType">
          <el-select v-model="form.ownerType" placeholder="请选择活动所属类型">
            <el-option
                v-for="dict in owner_type"
                :key="dict.value"
                :label="dict.label"
                :value="dict.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="活动所属ID" prop="ownerId">
          <el-input v-model="form.ownerId" placeholder="请输入活动所属ID" />
        </el-form-item>
        <el-form-item label="履约类型" prop="fulfillmentType">
          <el-select v-model="form.fulfillmentType" placeholder="请选择履约类型">
            <el-option
                v-for="dict in fulfillment_type"
                :key="dict.value"
                :label="dict.label"
                :value="dict.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="履约ID" prop="fulfillmentId">
          <el-input v-model="form.fulfillmentId" placeholder="请输入履约ID" />
        </el-form-item>
        <el-form-item label="过期时间" prop="expireTime">
          <el-date-picker clearable
            v-model="form.expireTime"
            type="datetime"
            value-format="YYYY-MM-DD HH:mm:ss"
            placeholder="请选择过期时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="活动商品标题" prop="orgTitle">
          <el-input v-model="form.orgTitle" placeholder="请输入活动商品标题" />
        </el-form-item>
        <el-form-item label="活动价格" prop="orgPrice">
          <el-input v-model="form.orgPrice" placeholder="请输入活动价格" />
        </el-form-item>
        <el-form-item label="活动配额库存" prop="orgStock">
          <el-input v-model="form.orgStock" placeholder="请输入活动配额库存" />
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

<script setup name="ProductOrg" lang="ts">
import { listProductOrg, getProductOrg, delProductOrg, addProductOrg, updateProductOrg } from '@/api/ecom/productOrg';
import { ProductOrgVO, ProductOrgQuery, ProductOrgForm } from '@/api/ecom/productOrg/types';

const { proxy } = getCurrentInstance() as ComponentInternalInstance;
const { owner_type, fulfillment_type } = toRefs<any>(proxy?.useDict('owner_type', 'fulfillment_type'));

const productOrgList = ref<ProductOrgVO[]>([]);
const buttonLoading = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const ids = ref<Array<string | number>>([]);
const single = ref(true);
const multiple = ref(true);
const total = ref(0);

const queryFormRef = ref<ElFormInstance>();
const productOrgFormRef = ref<ElFormInstance>();

const dialog = reactive<DialogOption>({
  visible: false,
  title: ''
});

const initFormData: ProductOrgForm = {
  orgProductId: undefined,
  orgId: undefined,
  skuId: undefined,
  ownerType: undefined,
  ownerId: undefined,
  fulfillmentType: undefined,
  fulfillmentId: undefined,
  expireTime: undefined,
  orgTitle: undefined,
  orgPrice: undefined,
  orgStock: undefined
}
const data = reactive<PageData<ProductOrgForm, ProductOrgQuery>>({
  form: {...initFormData},
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    orgId: undefined,
    skuId: undefined,
    ownerType: undefined,
    ownerId: undefined,
    fulfillmentType: undefined,
    fulfillmentId: undefined,
    expireTime: undefined,
    orgTitle: undefined,
    orgPrice: undefined,
    orgStock: undefined,
    params: {
    }
  },
  rules: {
    orgProductId: [
      { required: true, message: "机构组织商品Id不能为空", trigger: "blur" }
    ],
    orgId: [
      { required: true, message: "机构组织ID不能为空", trigger: "blur" }
    ],
    skuId: [
      { required: true, message: "商品skuID不能为空", trigger: "blur" }
    ],
    orgPrice: [
      { required: true, message: "活动价格不能为空", trigger: "blur" }
    ],
    orgStock: [
      { required: true, message: "活动配额库存不能为空", trigger: "blur" }
    ]
  }
});

const { queryParams, form, rules } = toRefs(data);

/** 查询机构组织商品列表 */
const getList = async () => {
  loading.value = true;
  const res = await listProductOrg(queryParams.value);
  productOrgList.value = res.rows;
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
  productOrgFormRef.value?.resetFields();
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
const handleSelectionChange = (selection: ProductOrgVO[]) => {
  ids.value = selection.map(item => item.orgProductId);
  single.value = selection.length != 1;
  multiple.value = !selection.length;
}

/** 新增按钮操作 */
const handleAdd = () => {
  reset();
  dialog.visible = true;
  dialog.title = "添加机构组织商品";
}

/** 修改按钮操作 */
const handleUpdate = async (row?: ProductOrgVO) => {
  reset();
  const _orgProductId = row?.orgProductId || ids.value[0]
  const res = await getProductOrg(_orgProductId);
  Object.assign(form.value, res.data);
  dialog.visible = true;
  dialog.title = "修改机构组织商品";
}

/** 提交按钮 */
const submitForm = () => {
  productOrgFormRef.value?.validate(async (valid: boolean) => {
    if (valid) {
      buttonLoading.value = true;
      if (form.value.orgProductId) {
        await updateProductOrg(form.value).finally(() =>  buttonLoading.value = false);
      } else {
        await addProductOrg(form.value).finally(() =>  buttonLoading.value = false);
      }
      proxy?.$modal.msgSuccess("操作成功");
      dialog.visible = false;
      await getList();
    }
  });
}

/** 删除按钮操作 */
const handleDelete = async (row?: ProductOrgVO) => {
  const _orgProductIds = row?.orgProductId || ids.value;
  await proxy?.$modal.confirm('是否确认删除机构组织商品编号为"' + _orgProductIds + '"的数据项？').finally(() => loading.value = false);
  await delProductOrg(_orgProductIds);
  proxy?.$modal.msgSuccess("删除成功");
  await getList();
}

/** 导出按钮操作 */
const handleExport = () => {
  proxy?.download('ecom/productOrg/export', {
    ...queryParams.value
  }, `productOrg_${new Date().getTime()}.xlsx`)
}

onMounted(() => {
  getList();
});
</script>
