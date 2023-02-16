<template>
  <div class="login-wrapper" v-loading="loading">
    <div class="login">
      <el-form
        :model="model"
        label-width="80px"
        label-position="left"
        :rules="rules"
        ref="formRef"
      >
        <el-form-item label="用户名" prop="userName">
          <el-input v-model="model.userName" placeholder="-请输入-"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            v-model="model.password"
            type="password"
            show-password
            placeholder="-请输入-"
          ></el-input>
        </el-form-item>
      </el-form>
      <div class="footer">
        <el-button type="primary" @click="login" :loading="loading"
          >登录</el-button
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ElMessage, FormRules, FormInstance } from "element-plus";
import { ref, reactive } from "vue";
import { useRouter, useRoute } from "vue-router";

const model = reactive({
  userName: "",
  password: "",
});

const formRef = ref<FormInstance>();
const loading = ref(false);
const router = useRouter();
const route = useRoute();
const rules = reactive<FormRules>({
  userName: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }],
});

console.log("route", route);

const login = () => {
  formRef.value?.validate((valid) => {
    if (valid) {
      loading.value = true;
      setTimeout(() => {
        loading.value = false;
        ElMessage.success("登录成功");
        let path = route.query.redirect
          ? (route.query.redirect! as string)
          : "/";
        router.push({
          path: path,
        });
      }, 2000);
    }
  });
};
</script>

<style lang="less" scoped>
.login-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login {
  width: 400px;
}

.footer {
  text-align: center;

  .el-button {
    width: 40%;
  }
}
</style>
