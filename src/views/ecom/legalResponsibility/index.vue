<template>
  <div class="p-2">
    <transition :enter-active-class="proxy?.animate.searchAnimate.enter" :leave-active-class="proxy?.animate.searchAnimate.leave">
      <div v-show="showSearch" class="mb-[10px]">
        <el-card shadow="hover">
          <el-form ref="queryFormRef" :model="queryParams" :inline="true">
            <el-form-item label="订单ID" prop="orderId">
              <el-input v-model="queryParams.orderId" placeholder="请输入订单ID" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="订单明细ID" prop="orderItemId">
              <el-input v-model="queryParams.orderItemId" placeholder="请输入订单明细ID" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="履约单ID" prop="fulfillmentTaskId">
              <el-input v-model="queryParams.fulfillmentTaskId" placeholder="请输入履约单ID" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="担责组织类型" prop="responsibilityOrgType">
              <el-select v-model="queryParams.responsibilityOrgType" placeholder="请选择担责组织类型" clearable >
                <el-option v-for="dict in responsible_type" :key="dict.value" :label="dict.label" :value="dict.value"/>
              </el-select>
            </el-form-item>
            <el-form-item label="担责组织ID" prop="responsibilityOrgId">
              <el-input v-model="queryParams.responsibilityOrgId" placeholder="请输入担责组织ID" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="担责范围" prop="responsibilityScope">
              <el-input v-model="queryParams.responsibilityScope" placeholder="请输入担责范围" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="有效时间" prop="effectiveTime">
              <el-date-picker clearable
                v-model="queryParams.effectiveTime"
                type="date"
                value-format="YYYY-MM-DD"
                placeholder="请选择有效时间"
              />
            </el-form-item>
            <el-form-item label="是否冻结" prop="frozen">
              <el-select v-model="queryParams.frozen" placeholder="请选择是否冻结" clearable >
                <el-option v-for="dict in sys_yes_no" :key="dict.value" :label="dict.label" :value="dict.value"/>
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
            <el-button type="primary" plain icon="Plus" @click="handleAdd" v-hasPermi="['ecom:legalResponsibility:add']">新增</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="success" plain icon="Edit" :disabled="single" @click="handleUpdate()" v-hasPermi="['ecom:legalResponsibility:edit']">修改</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="danger" plain icon="Delete" :disabled="multiple" @click="handleDelete()" v-hasPermi="['ecom:legalResponsibility:remove']">删除</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="warning" plain icon="Download" @click="handleExport" v-hasPermi="['ecom:legalResponsibility:export']">导出</el-button>
          </el-col>
          <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
        </el-row>
      </template>

      <el-table v-loading="loading" border :data="legalResponsibilityList" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column label="法律责任ID" align="center" prop="responsibilityId" v-if="true" />
        <el-table-column label="订单ID" align="center" prop="orderId" />
        <el-table-column label="订单明细ID" align="center" prop="orderItemId" />
        <el-table-column label="履约单ID" align="center" prop="fulfillmentTaskId" />
        <el-table-column label="担责组织类型" align="center" prop="responsibilityOrgType">
          <template #default="scope">
            <dict-tag :options="responsible_type" :value="scope.row.responsibilityOrgType"/>
          </template>
        </el-table-column>
        <el-table-column label="担责组织ID" align="center" prop="responsibilityOrgId" />
        <el-table-column label="担责范围" align="center" prop="responsibilityScope" />
        <el-table-column label="有效时间" align="center" prop="effectiveTime" width="180">
          <template #default="scope">
            <span>{{ parseTime(scope.row.effectiveTime, '{y}-{m}-{d}') }}</span>
          </template>
        </el-table-column>
        <el-table-column label="是否冻结" align="center" prop="frozen">
          <template #default="scope">
            <dict-tag :options="sys_yes_no" :value="scope.row.frozen"/>
          </template>
        </el-table-column>
        <el-table-column label="备注" align="center" prop="remark" />
        <el-table-column label="操作" align="center" fixed="right"  class-name="small-padding fixed-width">
          <template #default="scope">
            <el-tooltip content="修改" placement="top">
              <el-button link type="primary" icon="Edit" @click="handleUpdate(scope.row)" v-hasPermi="['ecom:legalResponsibility:edit']"></el-button>
            </el-tooltip>
            <el-tooltip content="删除" placement="top">
              <el-button link type="primary" icon="Delete" @click="handleDelete(scope.row)" v-hasPermi="['ecom:legalResponsibility:remove']"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <pagination v-show="total > 0" :total="total" v-model:page="queryParams.pageNum" v-model:limit="queryParams.pageSize" @pagination="getList" />
    </el-card>
    <!-- 添加或修改法律责任对话框 -->
    <el-dialog :title="dialog.title" v-model="dialog.visible" width="500px" append-to-body>
      <el-form ref="legalResponsibilityFormRef" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="订单ID" prop="orderId">
          <el-input v-model="form.orderId" placeholder="请输入订单ID" />
        </el-form-item>
        <el-form-item label="订单明细ID" prop="orderItemId">
          <el-input v-model="form.orderItemId" placeholder="请输入订单明细ID" />
        </el-form-item>
        <el-form-item label="履约单ID" prop="fulfillmentTaskId">
          <el-input v-model="form.fulfillmentTaskId" placeholder="请输入履约单ID" />
        </el-form-item>
        <el-form-item label="担责组织类型" prop="responsibilityOrgType">
          <el-select v-model="form.responsibilityOrgType" placeholder="请选择担责组织类型">
            <el-option
                v-for="dict in responsible_type"
                :key="dict.value"
                :label="dict.label"
                :value="dict.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="担责组织ID" prop="responsibilityOrgId">
          <el-input v-model="form.responsibilityOrgId" placeholder="请输入担责组织ID" />
        </el-form-item>
        <el-form-item label="担责范围" prop="responsibilityScope">
          <el-input v-model="form.responsibilityScope" placeholder="请输入担责范围" />
        </el-form-item>
        <el-form-item label="有效时间" prop="effectiveTime">
          <el-date-picker clearable
            v-model="form.effectiveTime"
            type="datetime"
            value-format="YYYY-MM-DD HH:mm:ss"
            placeholder="请选择有效时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="是否冻结" prop="frozen">
          <el-select v-model="form.frozen" placeholder="请选择是否冻结">
            <el-option
                v-for="dict in sys_yes_no"
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

<script setup name="LegalResponsibility" lang="ts">
import { listLegalResponsibility, getLegalResponsibility, delLegalResponsibility, addLegalResponsibility, updateLegalResponsibility } from '@/api/ecom/legalResponsibility';
import { LegalResponsibilityVO, LegalResponsibilityQuery, LegalResponsibilityForm } from '@/api/ecom/legalResponsibility/types';

const { proxy } = getCurrentInstance() as ComponentInternalInstance;
const { sys_yes_no, responsible_type } = toRefs<any>(proxy?.useDict('sys_yes_no', 'responsible_type'));

const legalResponsibilityList = ref<LegalResponsibilityVO[]>([]);
const buttonLoading = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const ids = ref<Array<string | number>>([]);
const single = ref(true);
const multiple = ref(true);
const total = ref(0);

const queryFormRef = ref<ElFormInstance>();
const legalResponsibilityFormRef = ref<ElFormInstance>();

const dialog = reactive<DialogOption>({
  visible: false,
  title: ''
});

const initFormData: LegalResponsibilityForm = {
  responsibilityId: undefined,
  orderId: undefined,
  orderItemId: undefined,
  fulfillmentTaskId: undefined,
  responsibilityOrgType: undefined,
  responsibilityOrgId: undefined,
  responsibilityScope: undefined,
  effectiveTime: undefined,
  frozen: undefined,
  remark: undefined,
}
const data = reactive<PageData<LegalResponsibilityForm, LegalResponsibilityQuery>>({
  form: {...initFormData},
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    orderId: undefined,
    orderItemId: undefined,
    fulfillmentTaskId: undefined,
    responsibilityOrgType: undefined,
    responsibilityOrgId: undefined,
    responsibilityScope: undefined,
    effectiveTime: undefined,
    frozen: undefined,
    params: {
    }
  },
  rules: {
    responsibilityId: [
      { required: true, message: "法律责任ID不能为空", trigger: "blur" }
    ],
  }
});

const { queryParams, form, rules } = toRefs(data);

/** 查询法律责任列表 */
const getList = async () => {
  loading.value = true;
  const res = await listLegalResponsibility(queryParams.value);
  legalResponsibilityList.value = res.rows;
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
  legalResponsibilityFormRef.value?.resetFields();
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
const handleSelectionChange = (selection: LegalResponsibilityVO[]) => {
  ids.value = selection.map(item => item.responsibilityId);
  single.value = selection.length != 1;
  multiple.value = !selection.length;
}

/** 新增按钮操作 */
const handleAdd = () => {
  reset();
  dialog.visible = true;
  dialog.title = "添加法律责任";
}

/** 修改按钮操作 */
const handleUpdate = async (row?: LegalResponsibilityVO) => {
  reset();
  const _responsibilityId = row?.responsibilityId || ids.value[0]
  const res = await getLegalResponsibility(_responsibilityId);
  Object.assign(form.value, res.data);
  dialog.visible = true;
  dialog.title = "修改法律责任";
}

/** 提交按钮 */
const submitForm = () => {
  legalResponsibilityFormRef.value?.validate(async (valid: boolean) => {
    if (valid) {
      buttonLoading.value = true;
      if (form.value.responsibilityId) {
        await updateLegalResponsibility(form.value).finally(() =>  buttonLoading.value = false);
      } else {
        await addLegalResponsibility(form.value).finally(() =>  buttonLoading.value = false);
      }
      proxy?.$modal.msgSuccess("操作成功");
      dialog.visible = false;
      await getList();
    }
  });
}

/** 删除按钮操作 */
const handleDelete = async (row?: LegalResponsibilityVO) => {
  const _responsibilityIds = row?.responsibilityId || ids.value;
  await proxy?.$modal.confirm('是否确认删除法律责任编号为"' + _responsibilityIds + '"的数据项？').finally(() => loading.value = false);
  await delLegalResponsibility(_responsibilityIds);
  proxy?.$modal.msgSuccess("删除成功");
  await getList();
}

/** 导出按钮操作 */
const handleExport = () => {
  proxy?.download('ecom/legalResponsibility/export', {
    ...queryParams.value
  }, `legalResponsibility_${new Date().getTime()}.xlsx`)
}

onMounted(() => {
  getList();
});
</script>
