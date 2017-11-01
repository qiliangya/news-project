<template>
	<el-menu default-active="2" class="el-menu-vertical-demo" theme="dark" :router="true">
	    <el-submenu index="1">
	        <template slot="title"><i class="el-icon-message"></i>用户管理</template>
	        <el-menu-item index="/user"><i class="el-icon-more"></i>查看用户</el-menu-item>
	        <el-menu-item index="1-2"><i class="el-icon-view"></i>查找用户</el-menu-item>
	    </el-submenu>
	    <el-submenu index="2">
	        <template slot="title"><i class="el-icon-d-caret"></i>分类管理</template>
	        <el-menu-item index="/category"><i class="el-icon-more"></i>查看分类</el-menu-item>
	    </el-submenu>
	    <el-submenu index="3">
	        <template slot="title"><i class="el-icon-document"></i>新闻管理</template>
	        <el-menu-item index="/news"><i class="el-icon-more"></i>查看新闻</el-menu-item>
	        <el-menu-item index="/news/comments"><i class="el-icon-more"></i>查看评论</el-menu-item>
			<!--  index 作为路径 前面一定要加 / 不然路径将会以当前路径来作为跳转-->

	    </el-submenu>
	    <el-submenu index="4">
	        <template slot="title"><i class="el-icon-upload2"></i>上传管理</template>
	        <el-menu-item index="/upload"><i class="el-icon-more"></i>查看上传</el-menu-item>
	    </el-submenu>
	</el-menu>
</template>