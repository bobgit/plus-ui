<template>
  <div class="p-2">
    <transition :enter-active-class="proxy?.animate.searchAnimate.enter" :leave-active-class="proxy?.animate.searchAnimate.leave">
      <div v-show="showSearch" class="mb-[10px]">
        <el-card shadow="hover">
          <el-form ref="queryFormRef" :model="queryParams" :inline="true">
            <el-form-item label="活动名称" prop="activityName">
              <el-input v-model="queryParams.activityName" placeholder="请输入活动名称" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="活动类型" prop="activityType">
              <el-select v-model="queryParams.activityType" placeholder="请选择活动类型" clearable >
                <el-option v-for="dict in product_type" :key="dict.value" :label="dict.label" :value="dict.value"/>
              </el-select>
            </el-form-item>
            <el-form-item label="分享标题" prop="shareTitle">
              <el-input v-model="queryParams.shareTitle" placeholder="请输入分享标题" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="分享描述" prop="shareDescription">
              <el-input v-model="queryParams.shareDescription" placeholder="请输入分享描述" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="开始时间" prop="startTime">
              <el-date-picker clearable
                v-model="queryParams.startTime"
                type="date"
                value-format="YYYY-MM-DD"
                placeholder="请选择开始时间"
              />
            </el-form-item>
            <el-form-item label="结束时间" prop="endTime">
              <el-date-picker clearable
                v-model="queryParams.endTime"
                type="date"
                value-format="YYYY-MM-DD"
                placeholder="请选择结束时间"
              />
            </el-form-item>
            <el-form-item label="成功团购次数" prop="successCount">
              <el-input v-model="queryParams.successCount" placeholder="请输入成功团购次数" clearable @keyup.enter="handleQuery" />
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
            <el-button type="primary" plain icon="Plus" @click="handleAdd" v-hasPermi="['ecom:activity:add']">新增</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="success" plain icon="Edit" :disabled="single" @click="handleUpdate()" v-hasPermi="['ecom:activity:edit']">修改</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="danger" plain icon="Delete" :disabled="multiple" @click="handleDelete()" v-hasPermi="['ecom:activity:remove']">删除</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="warning" plain icon="Download" @click="handleExport" v-hasPermi="['ecom:activity:export']">导出</el-button>
          </el-col>
          <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
        </el-row>
      </template>

      <el-table v-loading="loading" border :data="activityList" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column label="活动ID" align="center" prop="activityId" v-if="true" />
        <el-table-column label="活动名称" align="center" prop="activityName" />
        <el-table-column label="活动类型" align="center" prop="activityType">
          <template #default="scope">
            <dict-tag :options="product_type" :value="scope.row.activityType"/>
          </template>
        </el-table-column>
        <el-table-column label="活动封面图" align="center" prop="coverImageUrl" width="100">
          <template #default="scope">
            <image-preview :src="scope.row.coverImageUrl" :width="50" :height="50"/>
          </template>
        </el-table-column>
        <el-table-column label="活动详情图" align="center" prop="activityImage" />
        <el-table-column label="分享标题" align="center" prop="shareTitle" />
        <el-table-column label="分享描述" align="center" prop="shareDescription" />
        <el-table-column label="开始时间" align="center" prop="startTime" width="180">
          <template #default="scope">
            <span>{{ parseTime(scope.row.startTime, '{y}-{m}-{d}') }}</span>
          </template>
        </el-table-column>
        <el-table-column label="结束时间" align="center" prop="endTime" width="180">
          <template #default="scope">
            <span>{{ parseTime(scope.row.endTime, '{y}-{m}-{d}') }}</span>
          </template>
        </el-table-column>
        <el-table-column label="成功团购次数" align="center" prop="successCount" />
        <el-table-column label="活动状态" align="center" prop="status" />
        <el-table-column label="审核状态" align="center" prop="auditStatus" />
        <el-table-column label="备注" align="center" prop="remark" />
        <el-table-column label="操作" align="center" fixed="right"  class-name="small-padding fixed-width">
          <template #default="scope">
            <el-tooltip content="修改" placement="top">
              <el-button link type="primary" icon="Edit" @click="handleUpdate(scope.row)" v-hasPermi="['ecom:activity:edit']"></el-button>
            </el-tooltip>
            <el-tooltip content="删除" placement="top">
              <el-button link type="primary" icon="Delete" @click="handleDelete(scope.row)" v-hasPermi="['ecom:activity:remove']"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <pagination v-show="total > 0" :total="total" v-model:page="queryParams.pageNum" v-model:limit="queryParams.pageSize" @pagination="getList" />
    </el-card>
    <!-- 添加或修改活动对话框 -->
    <el-dialog :title="dialog.title" v-model="dialog.visible" width="500px" append-to-body>
      <el-form ref="activityFormRef" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="活动名称" prop="activityName">
          <el-input v-model="form.activityName" placeholder="请输入活动名称" />
        </el-form-item>
        <el-form-item label="活动类型" prop="activityType">
          <el-select v-model="form.activityType" placeholder="请选择活动类型">
            <el-option
                v-for="dict in product_type"
                :key="dict.value"
                :label="dict.label"
                :value="dict.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="活动封面图" prop="coverImage">
          <image-upload v-model="form.coverImage"/>
        </el-form-item>
        <el-form-item label="活动详情图">
          <editor v-model="form.activityImage" :min-height="192"/>
        </el-form-item>
        <el-form-item label="分享标题" prop="shareTitle">
          <el-input v-model="form.shareTitle" placeholder="请输入分享标题" />
        </el-form-item>
        <el-form-item label="分享描述" prop="shareDescription">
          <el-input v-model="form.shareDescription" placeholder="请输入分享描述" />
        </el-form-item>
        <el-form-item label="开始时间" prop="startTime">
          <el-date-picker clearable
            v-model="form.startTime"
            type="datetime"
            value-format="YYYY-MM-DD HH:mm:ss"
            placeholder="请选择开始时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间" prop="endTime">
          <el-date-picker clearable
            v-model="form.endTime"
            type="datetime"
            value-format="YYYY-MM-DD HH:mm:ss"
            placeholder="请选择结束时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="成功团购次数" prop="successCount">
          <el-input v-model="form.successCount" placeholder="请输入成功团购次数" />
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

<script setup name="Activity" lang="ts">
import { listActivity, getActivity, delActivity, addActivity, updateActivity } from '@/api/ecom/activity';
import { ActivityVO, ActivityQuery, ActivityForm } from '@/api/ecom/activity/types';

const { proxy } = getCurrentInstance() as ComponentInternalInstance;
const { product_type } = toRefs<any>(proxy?.useDict('product_type'));

const activityList = ref<ActivityVO[]>([]);
const buttonLoading = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const ids = ref<Array<string | number>>([]);
const single = ref(true);
const multiple = ref(true);
const total = ref(0);

const queryFormRef = ref<ElFormInstance>();
const activityFormRef = ref<ElFormInstance>();

const dialog = reactive<DialogOption>({
  visible: false,
  title: ''
});

const initFormData: ActivityForm = {
  activityId: undefined,
  activityName: undefined,
  activityType: undefined,
  coverImage: undefined,
  activityImage: undefined,
  shareTitle: undefined,
  shareDescription: undefined,
  startTime: undefined,
  endTime: undefined,
  successCount: undefined,
  status: undefined,
  auditStatus: undefined,
  remark: undefined
}
const data = reactive<PageData<ActivityForm, ActivityQuery>>({
  form: {...initFormData},
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    activityName: undefined,
    activityType: undefined,
    coverImage: undefined,
    activityImage: undefined,
    shareTitle: undefined,
    shareDescription: undefined,
    startTime: undefined,
    endTime: undefined,
    successCount: undefined,
    status: undefined,
    auditStatus: undefined,
    params: {
    }
  },
  rules: {
    activityId: [
      { required: true, message: "活动ID不能为空", trigger: "blur" }
    ],
    activityName: [
      { required: true, message: "活动名称不能为空", trigger: "blur" }
    ],
  }
});

const { queryParams, form, rules } = toRefs(data);

/** 查询活动列表 */
const getList = async () => {
  loading.value = true;
  const res = await listActivity(queryParams.value);
  activityList.value = res.rows;
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
  activityFormRef.value?.resetFields();
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
const handleSelectionChange = (selection: ActivityVO[]) => {
  ids.value = selection.map(item => item.activityId);
  single.value = selection.length != 1;
  multiple.value = !selection.length;
}

/** 新增按钮操作 */
const handleAdd = () => {
  reset();
  dialog.visible = true;
  dialog.title = "添加活动";
}

/** 修改按钮操作 */
const handleUpdate = async (row?: ActivityVO) => {
  reset();
  const _activityId = row?.activityId || ids.value[0]
  const res = await getActivity(_activityId);
  Object.assign(form.value, res.data);
  dialog.visible = true;
  dialog.title = "修改活动";
}

/** 提交按钮 */
const submitForm = () => {
  activityFormRef.value?.validate(async (valid: boolean) => {
    if (valid) {
      buttonLoading.value = true;
      if (form.value.activityId) {
        await updateActivity(form.value).finally(() =>  buttonLoading.value = false);
      } else {
        await addActivity(form.value).finally(() =>  buttonLoading.value = false);
      }
      proxy?.$modal.msgSuccess("操作成功");
      dialog.visible = false;
      await getList();
    }
  });
}

/** 删除按钮操作 */
const handleDelete = async (row?: ActivityVO) => {
  const _activityIds = row?.activityId || ids.value;
  await proxy?.$modal.confirm('是否确认删除活动编号为"' + _activityIds + '"的数据项？').finally(() => loading.value = false);
  await delActivity(_activityIds);
  proxy?.$modal.msgSuccess("删除成功");
  await getList();
}

/** 导出按钮操作 */
const handleExport = () => {
  proxy?.download('ecom/activity/export', {
    ...queryParams.value
  }, `activity_${new Date().getTime()}.xlsx`)
}

onMounted(() => {
  getList();
});
</script>
