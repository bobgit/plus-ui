<template>
  <div class="p-2">
    <transition :enter-active-class="proxy?.animate.searchAnimate.enter" :leave-active-class="proxy?.animate.searchAnimate.leave">
      <div v-show="showSearch" class="mb-[10px]">
        <el-card shadow="hover">
          <el-form ref="queryFormRef" :model="queryParams" :inline="true">
            <el-form-item label="库存流水ID" prop="stockFlowId">
              <el-input v-model="queryParams.stockFlowId" placeholder="请输入库存流水ID" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="库存ID" prop="stockId">
              <el-input v-model="queryParams.stockId" placeholder="请输入库存ID" clearable @keyup.enter="handleQuery" />
            </el-form-item>
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
            <el-form-item label="库存业务类型" prop="stockBizType">
              <el-select v-model="queryParams.stockBizType" placeholder="请选择库存业务类型" clearable >
                <el-option v-for="dict in stock_biz_type" :key="dict.value" :label="dict.label" :value="dict.value"/>
              </el-select>
            </el-form-item>
            <el-form-item label="业务ID" prop="bizId">
              <el-input v-model="queryParams.bizId" placeholder="请输入业务ID" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="变化数量" prop="changeQty">
              <el-input v-model="queryParams.changeQty" placeholder="请输入变化数量" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="之前数量" prop="beforeQty">
              <el-input v-model="queryParams.beforeQty" placeholder="请输入之前数量" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="之后数量" prop="afterQty">
              <el-input v-model="queryParams.afterQty" placeholder="请输入之后数量" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="库存类型" prop="stockType">
              <el-select v-model="queryParams.stockType" placeholder="请选择库存类型" clearable >
                <el-option v-for="dict in stock_type" :key="dict.value" :label="dict.label" :value="dict.value"/>
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
            <el-button type="primary" plain icon="Plus" @click="handleAdd" v-hasPermi="['ecom:stockFlow:add']">新增</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="success" plain icon="Edit" :disabled="single" @click="handleUpdate()" v-hasPermi="['ecom:stockFlow:edit']">修改</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="danger" plain icon="Delete" :disabled="multiple" @click="handleDelete()" v-hasPermi="['ecom:stockFlow:remove']">删除</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="warning" plain icon="Download" @click="handleExport" v-hasPermi="['ecom:stockFlow:export']">导出</el-button>
          </el-col>
          <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
        </el-row>
      </template>

      <el-table v-loading="loading" border :data="stockFlowList" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column label="库存流水ID" align="center" prop="stockFlowId" v-if="true" />
        <el-table-column label="库存ID" align="center" prop="stockId" />
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
        <el-table-column label="库存业务类型" align="center" prop="stockBizType">
          <template #default="scope">
            <dict-tag :options="stock_biz_type" :value="scope.row.stockBizType"/>
          </template>
        </el-table-column>
        <el-table-column label="业务ID" align="center" prop="bizId" />
        <el-table-column label="变化数量" align="center" prop="changeQty" />
        <el-table-column label="之前数量" align="center" prop="beforeQty" />
        <el-table-column label="之后数量" align="center" prop="afterQty" />
        <el-table-column label="库存类型" align="center" prop="stockType">
          <template #default="scope">
            <dict-tag :options="stock_type" :value="scope.row.stockType"/>
          </template>
        </el-table-column>
        <el-table-column label="备注" align="center" prop="remark" />
        <el-table-column label="操作" align="center" fixed="right"  class-name="small-padding fixed-width">
          <template #default="scope">
            <el-tooltip content="修改" placement="top">
              <el-button link type="primary" icon="Edit" @click="handleUpdate(scope.row)" v-hasPermi="['ecom:stockFlow:edit']"></el-button>
            </el-tooltip>
            <el-tooltip content="删除" placement="top">
              <el-button link type="primary" icon="Delete" @click="handleDelete(scope.row)" v-hasPermi="['ecom:stockFlow:remove']"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <pagination v-show="total > 0" :total="total" v-model:page="queryParams.pageNum" v-model:limit="queryParams.pageSize" @pagination="getList" />
    </el-card>
    <!-- 添加或修改库存流水对话框 -->
    <el-dialog :title="dialog.title" v-model="dialog.visible" width="500px" append-to-body>
      <el-form ref="stockFlowFormRef" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="库存ID" prop="stockId">
          <el-input v-model="form.stockId" placeholder="请输入库存ID" />
        </el-form-item>
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
        <el-form-item label="库存业务类型" prop="stockBizType">
          <el-select v-model="form.stockBizType" placeholder="请选择库存业务类型">
            <el-option
                v-for="dict in stock_biz_type"
                :key="dict.value"
                :label="dict.label"
                :value="dict.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="业务ID" prop="bizId">
          <el-input v-model="form.bizId" placeholder="请输入业务ID" />
        </el-form-item>
        <el-form-item label="变化数量" prop="changeQty">
          <el-input v-model="form.changeQty" placeholder="请输入变化数量" />
        </el-form-item>
        <el-form-item label="之前数量" prop="beforeQty">
          <el-input v-model="form.beforeQty" placeholder="请输入之前数量" />
        </el-form-item>
        <el-form-item label="之后数量" prop="afterQty">
          <el-input v-model="form.afterQty" placeholder="请输入之后数量" />
        </el-form-item>
        <el-form-item label="库存类型" prop="stockType">
          <el-select v-model="form.stockType" placeholder="请选择库存类型">
            <el-option
                v-for="dict in stock_type"
                :key="dict.value"
                :label="dict.label"
                :value="dict.value"
            ></el-option>
          </el-select>
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

<script setup name="StockFlow" lang="ts">
import { listStockFlow, getStockFlow, delStockFlow, addStockFlow, updateStockFlow } from '@/api/ecom/stockFlow';
import { StockFlowVO, StockFlowQuery, StockFlowForm } from '@/api/ecom/stockFlow/types';

const { proxy } = getCurrentInstance() as ComponentInternalInstance;
const { stock_biz_type, owner_type, stock_location_type, stock_type } = toRefs<any>(proxy?.useDict('stock_biz_type', 'owner_type', 'stock_location_type', 'stock_type'));

const stockFlowList = ref<StockFlowVO[]>([]);
const buttonLoading = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const ids = ref<Array<string | number>>([]);
const single = ref(true);
const multiple = ref(true);
const total = ref(0);

const queryFormRef = ref<ElFormInstance>();
const stockFlowFormRef = ref<ElFormInstance>();

const dialog = reactive<DialogOption>({
  visible: false,
  title: ''
});

const initFormData: StockFlowForm = {
  stockFlowId: undefined,
  stockId: undefined,
  skuId: undefined,
  ownerType: undefined,
  ownerId: undefined,
  locationType: undefined,
  locationAddressId: undefined,
  stockBizType: undefined,
  bizId: undefined,
  changeQty: undefined,
  beforeQty: undefined,
  afterQty: undefined,
  stockType: undefined,
  remark: undefined,
}
const data = reactive<PageData<StockFlowForm, StockFlowQuery>>({
  form: {...initFormData},
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    stockFlowId: undefined,
    stockId: undefined,
    skuId: undefined,
    ownerType: undefined,
    ownerId: undefined,
    locationType: undefined,
    locationAddressId: undefined,
    stockBizType: undefined,
    bizId: undefined,
    changeQty: undefined,
    beforeQty: undefined,
    afterQty: undefined,
    stockType: undefined,
    params: {
    }
  },
  rules: {
    stockFlowId: [
      { required: true, message: "库存流水ID不能为空", trigger: "blur" }
    ],
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
    stockBizType: [
      { required: true, message: "库存业务类型不能为空", trigger: "change" }
    ],
    changeQty: [
      { required: true, message: "变化数量不能为空", trigger: "blur" }
    ],
    beforeQty: [
      { required: true, message: "之前数量不能为空", trigger: "blur" }
    ],
    afterQty: [
      { required: true, message: "之后数量不能为空", trigger: "blur" }
    ],
    stockType: [
      { required: true, message: "库存类型不能为空", trigger: "change" }
    ],
  }
});

const { queryParams, form, rules } = toRefs(data);

/** 查询库存流水列表 */
const getList = async () => {
  loading.value = true;
  const res = await listStockFlow(queryParams.value);
  stockFlowList.value = res.rows;
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
  stockFlowFormRef.value?.resetFields();
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
const handleSelectionChange = (selection: StockFlowVO[]) => {
  ids.value = selection.map(item => item.stockFlowId);
  single.value = selection.length != 1;
  multiple.value = !selection.length;
}

/** 新增按钮操作 */
const handleAdd = () => {
  reset();
  dialog.visible = true;
  dialog.title = "添加库存流水";
}

/** 修改按钮操作 */
const handleUpdate = async (row?: StockFlowVO) => {
  reset();
  const _stockFlowId = row?.stockFlowId || ids.value[0]
  const res = await getStockFlow(_stockFlowId);
  Object.assign(form.value, res.data);
  dialog.visible = true;
  dialog.title = "修改库存流水";
}

/** 提交按钮 */
const submitForm = () => {
  stockFlowFormRef.value?.validate(async (valid: boolean) => {
    if (valid) {
      buttonLoading.value = true;
      if (form.value.stockFlowId) {
        await updateStockFlow(form.value).finally(() =>  buttonLoading.value = false);
      } else {
        await addStockFlow(form.value).finally(() =>  buttonLoading.value = false);
      }
      proxy?.$modal.msgSuccess("操作成功");
      dialog.visible = false;
      await getList();
    }
  });
}

/** 删除按钮操作 */
const handleDelete = async (row?: StockFlowVO) => {
  const _stockFlowIds = row?.stockFlowId || ids.value;
  await proxy?.$modal.confirm('是否确认删除库存流水编号为"' + _stockFlowIds + '"的数据项？').finally(() => loading.value = false);
  await delStockFlow(_stockFlowIds);
  proxy?.$modal.msgSuccess("删除成功");
  await getList();
}

/** 导出按钮操作 */
const handleExport = () => {
  proxy?.download('ecom/stockFlow/export', {
    ...queryParams.value
  }, `stockFlow_${new Date().getTime()}.xlsx`)
}

onMounted(() => {
  getList();
});
</script>
