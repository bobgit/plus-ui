<template>
  <div class="p-2">
    <transition :enter-active-class="proxy?.animate.searchAnimate.enter" :leave-active-class="proxy?.animate.searchAnimate.leave">
      <div v-show="showSearch" class="mb-[10px]">
        <el-card shadow="hover">
          <el-form ref="queryFormRef" :model="queryParams" :inline="true">
            <el-form-item label="业务表类型" prop="bizType">
              <el-input v-model="queryParams.bizType" placeholder="请输入业务表类型" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="业务id" prop="bizId">
              <el-input v-model="queryParams.bizId" placeholder="请输入业务id" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="语言类型" prop="lang">
              <el-select v-model="queryParams.lang" placeholder="请选择语言类型" clearable >
                <el-option v-for="dict in sys_ios_country" :key="dict.value" :label="dict.label" :value="dict.value"/>
              </el-select>
            </el-form-item>
            <el-form-item label="字段" prop="field">
              <el-input v-model="queryParams.field" placeholder="请输入字段" clearable @keyup.enter="handleQuery" />
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
            <el-button type="primary" plain icon="Plus" @click="handleAdd" v-hasPermi="['ecom:i18n:add']">新增</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="success" plain icon="Edit" :disabled="single" @click="handleUpdate()" v-hasPermi="['ecom:i18n:edit']">修改</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="danger" plain icon="Delete" :disabled="multiple" @click="handleDelete()" v-hasPermi="['ecom:i18n:remove']">删除</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="warning" plain icon="Download" @click="handleExport" v-hasPermi="['ecom:i18n:export']">导出</el-button>
          </el-col>
          <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
        </el-row>
      </template>

      <el-table v-loading="loading" border :data="i18nList" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column label="通用国际化ID" align="center" prop="i18nId" v-if="true" />
        <el-table-column label="业务表类型" align="center" prop="bizType" />
        <el-table-column label="业务id" align="center" prop="bizId" />
        <el-table-column label="语言类型" align="center" prop="lang">
          <template #default="scope">
            <dict-tag :options="sys_ios_country" :value="scope.row.lang"/>
          </template>
        </el-table-column>
        <el-table-column label="字段" align="center" prop="field" />
        <el-table-column label="翻译内容" align="center" prop="content" />
        <el-table-column label="备注" align="center" prop="remark" />
        <el-table-column label="操作" align="center" fixed="right"  class-name="small-padding fixed-width">
          <template #default="scope">
            <el-tooltip content="修改" placement="top">
              <el-button link type="primary" icon="Edit" @click="handleUpdate(scope.row)" v-hasPermi="['ecom:i18n:edit']"></el-button>
            </el-tooltip>
            <el-tooltip content="删除" placement="top">
              <el-button link type="primary" icon="Delete" @click="handleDelete(scope.row)" v-hasPermi="['ecom:i18n:remove']"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <pagination v-show="total > 0" :total="total" v-model:page="queryParams.pageNum" v-model:limit="queryParams.pageSize" @pagination="getList" />
    </el-card>
    <!-- 添加或修改商品分类对话框 -->
    <el-dialog :title="dialog.title" v-model="dialog.visible" width="500px" append-to-body>
      <el-form ref="i18nFormRef" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="业务表类型" prop="bizType">
            <el-input v-model="form.bizType" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="业务id" prop="bizId">
          <el-input v-model="form.bizId" placeholder="请输入业务id" />
        </el-form-item>
        <el-form-item label="语言类型" prop="lang">
          <el-select v-model="form.lang" placeholder="请选择语言类型">
            <el-option
                v-for="dict in sys_ios_country"
                :key="dict.value"
                :label="dict.label"
                :value="dict.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="字段" prop="field">
          <el-input v-model="form.field" placeholder="请输入字段" />
        </el-form-item>
        <el-form-item label="翻译内容">
          <editor v-model="form.content" :min-height="192"/>
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

<script setup name="I18n" lang="ts">
import { listI18n, getI18n, delI18n, addI18n, updateI18n } from '@/api/ecom/i18n';
import { I18nVO, I18nQuery, I18nForm } from '@/api/ecom/i18n/types';

const { proxy } = getCurrentInstance() as ComponentInternalInstance;
const { sys_ios_country, sys_normal_disable } = toRefs<any>(proxy?.useDict('sys_ios_country', 'sys_normal_disable'));

const i18nList = ref<I18nVO[]>([]);
const buttonLoading = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const ids = ref<Array<string | number>>([]);
const single = ref(true);
const multiple = ref(true);
const total = ref(0);

const queryFormRef = ref<ElFormInstance>();
const i18nFormRef = ref<ElFormInstance>();

const dialog = reactive<DialogOption>({
  visible: false,
  title: ''
});

const initFormData: I18nForm = {
  i18nId: undefined,
  bizType: undefined,
  bizId: undefined,
  lang: undefined,
  field: undefined,
  content: undefined,
  remark: undefined
}
const data = reactive<PageData<I18nForm, I18nQuery>>({
  form: {...initFormData},
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    bizType: undefined,
    bizId: undefined,
    lang: undefined,
    field: undefined,
    content: undefined,
    params: {
    }
  },
  rules: {
    i18nId: [
      { required: true, message: "通用国际化ID不能为空", trigger: "blur" }
    ],
    bizType: [
      { required: true, message: "业务表类型不能为空", trigger: "blur" }
    ],
    bizId: [
      { required: true, message: "业务id不能为空", trigger: "blur" }
    ],
    lang: [
      { required: true, message: "语言类型不能为空", trigger: "change" }
    ],
    field: [
      { required: true, message: "字段不能为空", trigger: "blur" }
    ],
    content: [
      { required: true, message: "翻译内容不能为空", trigger: "blur" }
    ],
  }
});

const { queryParams, form, rules } = toRefs(data);

/** 查询商品分类列表 */
const getList = async () => {
  loading.value = true;
  const res = await listI18n(queryParams.value);
  i18nList.value = res.rows;
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
  i18nFormRef.value?.resetFields();
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
const handleSelectionChange = (selection: I18nVO[]) => {
  ids.value = selection.map(item => item.i18nId);
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
const handleUpdate = async (row?: I18nVO) => {
  reset();
  const _i18nId = row?.i18nId || ids.value[0]
  const res = await getI18n(_i18nId);
  Object.assign(form.value, res.data);
  dialog.visible = true;
  dialog.title = "修改商品分类";
}

/** 提交按钮 */
const submitForm = () => {
  i18nFormRef.value?.validate(async (valid: boolean) => {
    if (valid) {
      buttonLoading.value = true;
      if (form.value.i18nId) {
        await updateI18n(form.value).finally(() =>  buttonLoading.value = false);
      } else {
        await addI18n(form.value).finally(() =>  buttonLoading.value = false);
      }
      proxy?.$modal.msgSuccess("操作成功");
      dialog.visible = false;
      await getList();
    }
  });
}

/** 删除按钮操作 */
const handleDelete = async (row?: I18nVO) => {
  const _i18nIds = row?.i18nId || ids.value;
  await proxy?.$modal.confirm('是否确认删除商品分类编号为"' + _i18nIds + '"的数据项？').finally(() => loading.value = false);
  await delI18n(_i18nIds);
  proxy?.$modal.msgSuccess("删除成功");
  await getList();
}

/** 导出按钮操作 */
const handleExport = () => {
  proxy?.download('ecom/i18n/export', {
    ...queryParams.value
  }, `i18n_${new Date().getTime()}.xlsx`)
}

onMounted(() => {
  getList();
});
</script>
