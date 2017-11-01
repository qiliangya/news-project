<template>
	<header>
      <el-menu theme="dark" mode="horizontal">
        <el-row type="flex" justify="space-between">
          <el-col :span="5">
            <p class="logo">新闻管理系统</p>
          </el-col>
          <el-col :span="6">
            <div class="user">
              <div class="touxiang"></div>
              <el-menu-item index="1">欢迎您 {{$store.getters.userName}}</el-menu-item>
            </div>
            
            <el-submenu index="2">
              <template slot="title">我的工作台</template>
              <el-menu-item index="2-1">修改个人信息</el-menu-item>
              <el-menu-item index="2-2">看看新闻</el-menu-item>
              <el-menu-item index="2-3">看美女</el-menu-item>
            </el-submenu>
          </el-col>
        </el-row>
      </el-menu>
    </header>
</template>

<script>
	export default{
    
  }
</script>

<style>
  .user{
    position:relative;
  }
  .touxiang{
    border-radius: 50%;overflow: hidden;position:absolute;width:50px;height:50px;
    left:-40px;top:5px;
  }
</style>