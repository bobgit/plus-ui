<template>
  <div class="p-2">
    <transition :enter-active-class="proxy?.animate.searchAnimate.enter" :leave-active-class="proxy?.animate.searchAnimate.leave">
      <div v-show="showSearch" class="mb-[10px]">
        <el-card shadow="hover">
          <el-form ref="queryFormRef" :model="queryParams" :inline="true">
            <el-form-item label="sku Id" prop="skuId">
              <el-input v-model="queryParams.skuId" placeholder="请输入sku Id" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="经营归属类型" prop="ownerType">
              <el-select v-model="queryParams.ownerType" placeholder="请选择经营归属类型" clearable >
                <el-option v-for="dict in owner_type" :key="dict.value" :label="dict.label" :value="dict.value"/>
              </el-select>
            </el-form-item>
            <el-form-item label="经营归属ID" prop="ownerId">
              <el-input v-model="queryParams.ownerId" placeholder="请输入经营归属ID" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="库存所在类型" prop="locationType">
              <el-select v-model="queryParams.locationType" placeholder="请选择库存所在类型" clearable >
                <el-option v-for="dict in stock_location_type" :key="dict.value" :label="dict.label" :value="dict.value"/>
              </el-select>
            </el-form-item>
            <el-form-item label="库存所在地ID" prop="locationAddressId">
              <el-input v-model="queryParams.locationAddressId" placeholder="请输入库存所在地ID" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="物理存在的总数" prop="stockTotal">
              <el-input v-model="queryParams.stockTotal" placeholder="请输入物理存在的总数" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="可卖库存" prop="stockAvailable">
              <el-input v-model="queryParams.stockAvailable" placeholder="请输入可卖库存" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="未完成履约" prop="stockLocked">
              <el-input v-model="queryParams.stockLocked" placeholder="请输入未完成履约" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="安全库存" prop="safetyStock">
              <el-input v-model="queryParams.safetyStock" placeholder="请输入安全库存" clearable @keyup.enter="handleQuery" />
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
            <el-button type="primary" plain icon="Plus" @click="handleAdd" v-hasPermi="['ecom:stock:add']">新增</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="success" plain icon="Edit" :disabled="single" @click="handleUpdate()" v-hasPermi="['ecom:stock:edit']">修改</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="danger" plain icon="Delete" :disabled="multiple" @click="handleDelete()" v-hasPermi="['ecom:stock:remove']">删除</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="warning" plain icon="Download" @click="handleExport" v-hasPermi="['ecom:stock:export']">导出</el-button>
          </el-col>
          <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
        </el-row>
      </template>

      <el-table v-loading="loading" border :data="stockList" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column label="库存ID" align="center" prop="stockId" v-if="true" />
        <el-table-column label="sku Id" align="center" prop="skuId" />
        <el-table-column label="经营归属类型" align="center" prop="ownerType">
          <template #default="scope">
            <dict-tag :options="owner_type" :value="scope.row.ownerType"/>
          </template>
        </el-table-column>
        <el-table-column label="经营归属ID" align="center" prop="ownerId" />
        <el-table-column label="库存所在类型" align="center" prop="locationType">
          <template #default="scope">
            <dict-tag :options="stock_location_type" :value="scope.row.locationType"/>
          </template>
        </el-table-column>
        <el-table-column label="库存所在地ID" align="center" prop="locationAddressId" />
        <el-table-column label="物理存在的总数" align="center" prop="stockTotal" />
        <el-table-column label="可卖库存" align="center" prop="stockAvailable" />
        <el-table-column label="未完成履约" align="center" prop="stockLocked" />
        <el-table-column label="安全库存" align="center" prop="safetyStock" />
        <el-table-column label="状态" align="center" prop="status" />
        <el-table-column label="备注" align="center" prop="remark" />
        <el-table-column label="操作" align="center" fixed="right"  class-name="small-padding fixed-width">
          <template #default="scope">
            <el-tooltip content="修改" placement="top">
              <el-button link type="primary" icon="Edit" @click="handleUpdate(scope.row)" v-hasPermi="['ecom:stock:edit']"></el-button>
            </el-tooltip>
            <el-tooltip content="删除" placement="top">
              <el-button link type="primary" icon="Delete" @click="handleDelete(scope.row)" v-hasPermi="['ecom:stock:remove']"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <pagination v-show="total > 0" :total="total" v-model:page="queryParams.pageNum" v-model:limit="queryParams.pageSize" @pagination="getList" />
    </el-card>
    <!-- 添加或修改通用库存对话框 -->
    <el-dialog :title="dialog.title" v-model="dialog.visible" width="500px" append-to-body>
      <el-form ref="stockFormRef" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="sku Id" prop="skuId">
          <el-input v-model="form.skuId" placeholder="请输入sku Id" />
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
        <el-form-item label="库存所在类型" prop="locationType">
          <el-select v-model="form.locationType" placeholder="请选择库存所在类型">
            <el-option
                v-for="dict in stock_location_type"
                :key="dict.value"
                :label="dict.label"
                :value="dict.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="库存所在地ID" prop="locationAddressId">
          <el-input v-model="form.locationAddressId" placeholder="请输入库存所在地ID" />
        </el-form-item>
        <el-form-item label="物理存在的总数" prop="stockTotal">
          <el-input v-model="form.stockTotal" placeholder="请输入物理存在的总数" />
        </el-form-item>
        <el-form-item label="可卖库存" prop="stockAvailable">
          <el-input v-model="form.stockAvailable" placeholder="请输入可卖库存" />
        </el-form-item>
        <el-form-item label="未完成履约" prop="stockLocked">
          <el-input v-model="form.stockLocked" placeholder="请输入未完成履约" />
        </el-form-item>
        <el-form-item label="安全库存" prop="safetyStock">
          <el-input v-model="form.safetyStock" placeholder="请输入安全库存" />
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

<script setup name="Stock" lang="ts">
import { listStock, getStock, delStock, addStock, updateStock } from '@/api/ecom/stock';
import { StockVO, StockQuery, StockForm } from '@/api/ecom/stock/types';

const { proxy } = getCurrentInstance() as ComponentInternalInstance;
const { owner_type, stock_location_type } = toRefs<any>(proxy?.useDict('owner_type', 'stock_location_type'));

const stockList = ref<StockVO[]>([]);
const buttonLoading = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const ids = ref<Array<string | number>>([]);
const single = ref(true);
const multiple = ref(true);
const total = ref(0);

const queryFormRef = ref<ElFormInstance>();
const stockFormRef = ref<ElFormInstance>();

const dialog = reactive<DialogOption>({
  visible: false,
  title: ''
});

const initFormData: StockForm = {
  stockId: undefined,
  skuId: undefined,
  ownerType: undefined,
  ownerId: undefined,
  locationType: undefined,
  locationAddressId: undefined,
  stockTotal: undefined,
  stockAvailable: undefined,
  stockLocked: undefined,
  safetyStock: undefined,
  status: undefined,
  remark: undefined,
}
const data = reactive<PageData<StockForm, StockQuery>>({
  form: {...initFormData},
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    skuId: undefined,
    ownerType: undefined,
    ownerId: undefined,
    locationType: undefined,
    locationAddressId: undefined,
    stockTotal: undefined,
    stockAvailable: undefined,
    stockLocked: undefined,
    safetyStock: undefined,
    status: undefined,
    params: {
    }
  },
  rules: {
    stockId: [
      { required: true, message: "库存ID不能为空", trigger: "blur" }
    ],
    skuId: [
      { required: true, message: "sku Id不能为空", trigger: "blur" }
    ],
    ownerType: [
      { required: true, message: "经营归属类型不能为空", trigger: "change" }
    ],
    ownerId: [
      { required: true, message: "经营归属ID不能为空", trigger: "blur" }
    ],
    locationType: [
      { required: true, message: "库存所在类型不能为空", trigger: "change" }
    ],
    locationAddressId: [
      { required: true, message: "库存所在地ID不能为空", trigger: "blur" }
    ],
    stockTotal: [
      { required: true, message: "物理存在的总数不能为空", trigger: "blur" }
    ],
    stockAvailable: [
      { required: true, message: "可卖库存不能为空", trigger: "blur" }
    ],
    stockLocked: [
      { required: true, message: "未完成履约不能为空", trigger: "blur" }
    ],
  }
});

const { queryParams, form, rules } = toRefs(data);

/** 查询通用库存列表 */
const getList = async () => {
  loading.value = true;
  const res = await listStock(queryParams.value);
  stockList.value = res.rows;
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
  stockFormRef.value?.resetFields();
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
const handleSelectionChange = (selection: StockVO[]) => {
  ids.value = selection.map(item => item.stockId);
  single.value = selection.length != 1;
  multiple.value = !selection.length;
}

/** 新增按钮操作 */
const handleAdd = () => {
  reset();
  dialog.visible = true;
  dialog.title = "添加通用库存";
}

/** 修改按钮操作 */
const handleUpdate = async (row?: StockVO) => {
  reset();
  const _stockId = row?.stockId || ids.value[0]
  const res = await getStock(_stockId);
  Object.assign(form.value, res.data);
  dialog.visible = true;
  dialog.title = "修改通用库存";
}

/** 提交按钮 */
const submitForm = () => {
  stockFormRef.value?.validate(async (valid: boolean) => {
    if (valid) {
      buttonLoading.value = true;
      if (form.value.stockId) {
        await updateStock(form.value).finally(() =>  buttonLoading.value = false);
      } else {
        await addStock(form.value).finally(() =>  buttonLoading.value = false);
      }
      proxy?.$modal.msgSuccess("操作成功");
      dialog.visible = false;
      await getList();
    }
  });
}

/** 删除按钮操作 */
const handleDelete = async (row?: StockVO) => {
  const _stockIds = row?.stockId || ids.value;
  await proxy?.$modal.confirm('是否确认删除通用库存编号为"' + _stockIds + '"的数据项？').finally(() => loading.value = false);
  await delStock(_stockIds);
  proxy?.$modal.msgSuccess("删除成功");
  await getList();
}

/** 导出按钮操作 */
const handleExport = () => {
  proxy?.download('ecom/stock/export', {
    ...queryParams.value
  }, `stock_${new Date().getTime()}.xlsx`)
}

onMounted(() => {
  getList();
});
</script>
