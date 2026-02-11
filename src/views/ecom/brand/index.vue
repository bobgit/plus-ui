<template>
  <div class="p-2">
    <transition :enter-active-class="proxy?.animate.searchAnimate.enter" :leave-active-class="proxy?.animate.searchAnimate.leave">
      <div v-show="showSearch" class="mb-[10px]">
        <el-card shadow="hover">
          <el-form ref="queryFormRef" :model="queryParams" :inline="true">
            <el-form-item label="品牌编码" prop="brandCode">
              <el-input v-model="queryParams.brandCode" placeholder="请输入品牌编码" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="图标" prop="brandLogo">
              <el-input v-model="queryParams.brandLogo" placeholder="请输入图标" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="官网" prop="officialSite">
              <el-input v-model="queryParams.officialSite" placeholder="请输入官网" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="品牌所属国家" prop="countryCode">
              <el-select v-model="queryParams.countryCode" placeholder="请选择品牌所属国家" clearable >
                <el-option v-for="dict in sys_ios_country" :key="dict.value" :label="dict.label" :value="dict.value"/>
              </el-select>
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
            <el-button type="primary" plain icon="Plus" @click="handleAdd" v-hasPermi="['ecom:brand:add']">新增</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="success" plain icon="Edit" :disabled="single" @click="handleUpdate()" v-hasPermi="['ecom:brand:edit']">修改</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="danger" plain icon="Delete" :disabled="multiple" @click="handleDelete()" v-hasPermi="['ecom:brand:remove']">删除</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="warning" plain icon="Download" @click="handleExport" v-hasPermi="['ecom:brand:export']">导出</el-button>
          </el-col>
          <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
        </el-row>
      </template>

      <el-table v-loading="loading" border :data="brandList" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column label="品牌ID" align="center" prop="brandId" v-if="true" />
        <el-table-column label="品牌编码" align="center" prop="brandCode" />
        <el-table-column label="图标" align="center" prop="brandLogo" />
        <el-table-column label="官网" align="center" prop="officialSite" />
        <el-table-column label="品牌所属国家" align="center" prop="countryCode">
          <template #default="scope">
            <dict-tag :options="sys_ios_country" :value="scope.row.countryCode"/>
          </template>
        </el-table-column>
        <el-table-column label="状态" align="center" prop="status" />
        <el-table-column label="排序权重" align="center" prop="sortOrder" />
        <el-table-column label="备注" align="center" prop="remark" />
        <el-table-column label="操作" align="center" fixed="right"  class-name="small-padding fixed-width">
          <template #default="scope">
            <el-tooltip content="修改" placement="top">
              <el-button link type="primary" icon="Edit" @click="handleUpdate(scope.row)" v-hasPermi="['ecom:brand:edit']"></el-button>
            </el-tooltip>
            <el-tooltip content="删除" placement="top">
              <el-button link type="primary" icon="Delete" @click="handleDelete(scope.row)" v-hasPermi="['ecom:brand:remove']"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <pagination v-show="total > 0" :total="total" v-model:page="queryParams.pageNum" v-model:limit="queryParams.pageSize" @pagination="getList" />
    </el-card>
    <!-- 添加或修改商品品牌对话框 -->
    <el-dialog :title="dialog.title" v-model="dialog.visible" width="500px" append-to-body>
      <el-form ref="brandFormRef" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="品牌编码" prop="brandCode">
          <el-input v-model="form.brandCode" placeholder="请输入品牌编码" />
        </el-form-item>
        <el-form-item label="图标" prop="brandLogo">
          <el-input v-model="form.brandLogo" placeholder="请输入图标" />
        </el-form-item>
        <el-form-item label="官网" prop="officialSite">
          <el-input v-model="form.officialSite" placeholder="请输入官网" />
        </el-form-item>
        <el-form-item label="品牌所属国家" prop="countryCode">
          <el-select v-model="form.countryCode" placeholder="请选择品牌所属国家">
            <el-option
                v-for="dict in sys_ios_country"
                :key="dict.value"
                :label="dict.label"
                :value="dict.value"
            ></el-option>
          </el-select>
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

<script setup name="Brand" lang="ts">
import { listBrand, getBrand, delBrand, addBrand, updateBrand } from '@/api/ecom/brand';
import { BrandVO, BrandQuery, BrandForm } from '@/api/ecom/brand/types';

const { proxy } = getCurrentInstance() as ComponentInternalInstance;
const { sys_ios_country } = toRefs<any>(proxy?.useDict('sys_ios_country'));

const brandList = ref<BrandVO[]>([]);
const buttonLoading = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const ids = ref<Array<string | number>>([]);
const single = ref(true);
const multiple = ref(true);
const total = ref(0);

const queryFormRef = ref<ElFormInstance>();
const brandFormRef = ref<ElFormInstance>();

const dialog = reactive<DialogOption>({
  visible: false,
  title: ''
});

const initFormData: BrandForm = {
  brandId: undefined,
  brandCode: undefined,
  brandLogo: undefined,
  officialSite: undefined,
  countryCode: undefined,
  status: undefined,
  sortOrder: undefined,
  remark: undefined
}
const data = reactive<PageData<BrandForm, BrandQuery>>({
  form: {...initFormData},
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    brandCode: undefined,
    brandLogo: undefined,
    officialSite: undefined,
    countryCode: undefined,
    status: undefined,
    sortOrder: undefined,
    params: {
    }
  },
  rules: {
    brandId: [
      { required: true, message: "品牌ID不能为空", trigger: "blur" }
    ],
  }
});

const { queryParams, form, rules } = toRefs(data);

/** 查询商品品牌列表 */
const getList = async () => {
  loading.value = true;
  const res = await listBrand(queryParams.value);
  brandList.value = res.rows;
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
  brandFormRef.value?.resetFields();
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
const handleSelectionChange = (selection: BrandVO[]) => {
  ids.value = selection.map(item => item.brandId);
  single.value = selection.length != 1;
  multiple.value = !selection.length;
}

/** 新增按钮操作 */
const handleAdd = () => {
  reset();
  dialog.visible = true;
  dialog.title = "添加商品品牌";
}

/** 修改按钮操作 */
const handleUpdate = async (row?: BrandVO) => {
  reset();
  const _brandId = row?.brandId || ids.value[0]
  const res = await getBrand(_brandId);
  Object.assign(form.value, res.data);
  dialog.visible = true;
  dialog.title = "修改商品品牌";
}

/** 提交按钮 */
const submitForm = () => {
  brandFormRef.value?.validate(async (valid: boolean) => {
    if (valid) {
      buttonLoading.value = true;
      if (form.value.brandId) {
        await updateBrand(form.value).finally(() =>  buttonLoading.value = false);
      } else {
        await addBrand(form.value).finally(() =>  buttonLoading.value = false);
      }
      proxy?.$modal.msgSuccess("操作成功");
      dialog.visible = false;
      await getList();
    }
  });
}

/** 删除按钮操作 */
const handleDelete = async (row?: BrandVO) => {
  const _brandIds = row?.brandId || ids.value;
  await proxy?.$modal.confirm('是否确认删除商品品牌编号为"' + _brandIds + '"的数据项？').finally(() => loading.value = false);
  await delBrand(_brandIds);
  proxy?.$modal.msgSuccess("删除成功");
  await getList();
}

/** 导出按钮操作 */
const handleExport = () => {
  proxy?.download('ecom/brand/export', {
    ...queryParams.value
  }, `brand_${new Date().getTime()}.xlsx`)
}

onMounted(() => {
  getList();
});
</script>
