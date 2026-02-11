<template>
  <div class="p-2">
    <transition :enter-active-class="proxy?.animate.searchAnimate.enter" :leave-active-class="proxy?.animate.searchAnimate.leave">
      <div v-show="showSearch" class="mb-[10px]">
        <el-card shadow="hover">
          <el-form ref="queryFormRef" :model="queryParams" :inline="true">
            <el-form-item label="活动商品ID" prop="activityProductId">
              <el-input v-model="queryParams.activityProductId" placeholder="请输入活动商品ID" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="团长责任人ID" prop="leaderId">
              <el-input v-model="queryParams.leaderId" placeholder="请输入团长责任人ID" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="当前参团人数" prop="currentCount">
              <el-input v-model="queryParams.currentCount" placeholder="请输入当前参团人数" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="目标成团人数" prop="targetCount">
              <el-input v-model="queryParams.targetCount" placeholder="请输入目标成团人数" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="成团截止时间" prop="expireTime">
              <el-date-picker clearable
                v-model="queryParams.expireTime"
                type="date"
                value-format="YYYY-MM-DD"
                placeholder="请选择成团截止时间"
              />
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
            <el-button type="primary" plain icon="Plus" @click="handleAdd" v-hasPermi="['ecom:groupRecord:add']">新增</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="success" plain icon="Edit" :disabled="single" @click="handleUpdate()" v-hasPermi="['ecom:groupRecord:edit']">修改</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="danger" plain icon="Delete" :disabled="multiple" @click="handleDelete()" v-hasPermi="['ecom:groupRecord:remove']">删除</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="warning" plain icon="Download" @click="handleExport" v-hasPermi="['ecom:groupRecord:export']">导出</el-button>
          </el-col>
          <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
        </el-row>
      </template>

      <el-table v-loading="loading" border :data="groupRecordList" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column label="参团记录ID" align="center" prop="recordId" v-if="true" />
        <el-table-column label="活动商品ID" align="center" prop="activityProductId" />
        <el-table-column label="团长责任人ID" align="center" prop="leaderId" />
        <el-table-column label="当前参团人数" align="center" prop="currentCount" />
        <el-table-column label="目标成团人数" align="center" prop="targetCount" />
        <el-table-column label="成团状态" align="center" prop="groupStatus" />
        <el-table-column label="成团截止时间" align="center" prop="expireTime" width="180">
          <template #default="scope">
            <span>{{ parseTime(scope.row.expireTime, '{y}-{m}-{d}') }}</span>
          </template>
        </el-table-column>
        <el-table-column label="备注" align="center" prop="remark" />
        <el-table-column label="操作" align="center" fixed="right"  class-name="small-padding fixed-width">
          <template #default="scope">
            <el-tooltip content="修改" placement="top">
              <el-button link type="primary" icon="Edit" @click="handleUpdate(scope.row)" v-hasPermi="['ecom:groupRecord:edit']"></el-button>
            </el-tooltip>
            <el-tooltip content="删除" placement="top">
              <el-button link type="primary" icon="Delete" @click="handleDelete(scope.row)" v-hasPermi="['ecom:groupRecord:remove']"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <pagination v-show="total > 0" :total="total" v-model:page="queryParams.pageNum" v-model:limit="queryParams.pageSize" @pagination="getList" />
    </el-card>
    <!-- 添加或修改团购参团记录对话框 -->
    <el-dialog :title="dialog.title" v-model="dialog.visible" width="500px" append-to-body>
      <el-form ref="groupRecordFormRef" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="活动商品ID" prop="activityProductId">
          <el-input v-model="form.activityProductId" placeholder="请输入活动商品ID" />
        </el-form-item>
        <el-form-item label="团长责任人ID" prop="leaderId">
          <el-input v-model="form.leaderId" placeholder="请输入团长责任人ID" />
        </el-form-item>
        <el-form-item label="当前参团人数" prop="currentCount">
          <el-input v-model="form.currentCount" placeholder="请输入当前参团人数" />
        </el-form-item>
        <el-form-item label="目标成团人数" prop="targetCount">
          <el-input v-model="form.targetCount" placeholder="请输入目标成团人数" />
        </el-form-item>
        <el-form-item label="成团截止时间" prop="expireTime">
          <el-date-picker clearable
            v-model="form.expireTime"
            type="datetime"
            value-format="YYYY-MM-DD HH:mm:ss"
            placeholder="请选择成团截止时间">
          </el-date-picker>
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

<script setup name="GroupRecord" lang="ts">
import { listGroupRecord, getGroupRecord, delGroupRecord, addGroupRecord, updateGroupRecord } from '@/api/ecom/groupRecord';
import { GroupRecordVO, GroupRecordQuery, GroupRecordForm } from '@/api/ecom/groupRecord/types';

const { proxy } = getCurrentInstance() as ComponentInternalInstance;

const groupRecordList = ref<GroupRecordVO[]>([]);
const buttonLoading = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const ids = ref<Array<string | number>>([]);
const single = ref(true);
const multiple = ref(true);
const total = ref(0);

const queryFormRef = ref<ElFormInstance>();
const groupRecordFormRef = ref<ElFormInstance>();

const dialog = reactive<DialogOption>({
  visible: false,
  title: ''
});

const initFormData: GroupRecordForm = {
  recordId: undefined,
  activityProductId: undefined,
  leaderId: undefined,
  currentCount: undefined,
  targetCount: undefined,
  groupStatus: undefined,
  expireTime: undefined,
  remark: undefined
}
const data = reactive<PageData<GroupRecordForm, GroupRecordQuery>>({
  form: {...initFormData},
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    activityProductId: undefined,
    leaderId: undefined,
    currentCount: undefined,
    targetCount: undefined,
    groupStatus: undefined,
    expireTime: undefined,
    params: {
    }
  },
  rules: {
    recordId: [
      { required: true, message: "参团记录ID不能为空", trigger: "blur" }
    ],
    activityProductId: [
      { required: true, message: "活动商品ID不能为空", trigger: "blur" }
    ],
    leaderId: [
      { required: true, message: "团长责任人ID不能为空", trigger: "blur" }
    ],
    targetCount: [
      { required: true, message: "目标成团人数不能为空", trigger: "blur" }
    ],
  }
});

const { queryParams, form, rules } = toRefs(data);

/** 查询团购参团记录列表 */
const getList = async () => {
  loading.value = true;
  const res = await listGroupRecord(queryParams.value);
  groupRecordList.value = res.rows;
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
  groupRecordFormRef.value?.resetFields();
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
const handleSelectionChange = (selection: GroupRecordVO[]) => {
  ids.value = selection.map(item => item.recordId);
  single.value = selection.length != 1;
  multiple.value = !selection.length;
}

/** 新增按钮操作 */
const handleAdd = () => {
  reset();
  dialog.visible = true;
  dialog.title = "添加团购参团记录";
}

/** 修改按钮操作 */
const handleUpdate = async (row?: GroupRecordVO) => {
  reset();
  const _recordId = row?.recordId || ids.value[0]
  const res = await getGroupRecord(_recordId);
  Object.assign(form.value, res.data);
  dialog.visible = true;
  dialog.title = "修改团购参团记录";
}

/** 提交按钮 */
const submitForm = () => {
  groupRecordFormRef.value?.validate(async (valid: boolean) => {
    if (valid) {
      buttonLoading.value = true;
      if (form.value.recordId) {
        await updateGroupRecord(form.value).finally(() =>  buttonLoading.value = false);
      } else {
        await addGroupRecord(form.value).finally(() =>  buttonLoading.value = false);
      }
      proxy?.$modal.msgSuccess("操作成功");
      dialog.visible = false;
      await getList();
    }
  });
}

/** 删除按钮操作 */
const handleDelete = async (row?: GroupRecordVO) => {
  const _recordIds = row?.recordId || ids.value;
  await proxy?.$modal.confirm('是否确认删除团购参团记录编号为"' + _recordIds + '"的数据项？').finally(() => loading.value = false);
  await delGroupRecord(_recordIds);
  proxy?.$modal.msgSuccess("删除成功");
  await getList();
}

/** 导出按钮操作 */
const handleExport = () => {
  proxy?.download('ecom/groupRecord/export', {
    ...queryParams.value
  }, `groupRecord_${new Date().getTime()}.xlsx`)
}

onMounted(() => {
  getList();
});
</script>
