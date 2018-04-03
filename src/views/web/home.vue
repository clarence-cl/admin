<template>
<div class="new-container" v-loading="loading" element-loading-text="拼命加载中">
  <el-tabs>
    <el-tab-pane label="轮播设置">
      <div class="banners">
        <div v-for="item,index in config.banner" :key="index">
          <el-upload :action="pic.upload" :http-request="uploadPic" :show-file-list="false" :on-success="uploadUploadSuccess">
            <img :src="item.path.length ? item.path : imagenotfound" @click="setindex(index)">
          </el-upload>
          <el-select style="width:100%;margin-top:10px;" v-model="item.article_id" placeholder="请选择">
            <el-option v-for="item in articles" :key="item.id" :label="item.title" :value="item.id"> </el-option>
          </el-select>
          <div class="">
            <el-button type="danger" plain style="width:100%;margin-top:10px;" @click="removeBanner(index)">删除配置</el-button>
          </div>
        </div>
      </div>
      <el-button style="margin-top:30px;" @click="addBanner()" :loading="saveLoading">添加轮播</el-button>
      <el-button type="primary" style="margin-top:30px;" :loading="saveLoading" @click="save()">保存配置</el-button>
    </el-tab-pane>
    <el-tab-pane label="楼层设置">
      <el-button type="success" style="margin-bottom:20px;" :loading="saveLoading" @click="addBlock()">添加楼层</el-button>
      <el-button type="primary" style="margin-bottom:20px;" :loading="saveLoading" @click="save()">保存配置</el-button>
      <div class="blocks">
        <div v-for="item,index in config.blocks" :key="index">
          <el-form label-position="top" label-width="100px">
            <el-form-item label="标题">
              <el-input v-model="item.title"></el-input>
            </el-form-item>
            <el-form-item label="子标题">
              <el-input v-model="item.sub_title"></el-input>
            </el-form-item>
            <el-form-item label="配置列表">
              <div class="subblock">
                <el-button type="success" plain size="small" @click="addSub(index)">添加配置</el-button>
              </div>
              <div class="subblock" v-for="sub,sindex in item.sub_blocks" :key="sindex">
                <el-select v-model="sub.type" placeholder="请选择内容类型" @change="toggleType(index,sindex)" style="width:80px;">
                  <el-option label="文章" value="0"></el-option>
                  <el-option label="视频" value="1"></el-option>
                </el-select>
                <el-select v-if="sub.type == 0" v-model="sub.item_id" filterable remote placeholder="请输入文章关键词" :remote-method="searchArticle" :loading="searchloading">
                  <el-option v-for="item in articles" :key="item.id" :label="item.title" :value="item.id"></el-option>
                </el-select>
                <el-select v-if="sub.type == 1" v-model="sub.item_id" filterable remote placeholder="请输入视频关键词" :remote-method="searchVideo" :loading="searchloading">
                  <el-option v-for="item in videos" :key="item.id" :label="item.title" :value="item.id"></el-option>
                </el-select>
                <el-button type="danger" plain @click="removeSub(index, sindex)">删除</el-button>
              </div>
            </el-form-item>
          </el-form>
          <el-button type="danger" style="width:100%;" @click="removeBlock(index)">删除楼层</el-button>
        </div>
      </div>
    </el-tab-pane>
  </el-tabs>
</div>
</template>

<script>
import config from "@/mixins/config";
import pic from "@/mixins/pic";
import imagenotfound from '@/assets/images/image-not-found.svg'
export default {
  mixins: [config, pic],
  created() {
    this.refreshArticles().then((res) => {
      this.articles = res.data.data;
      this.refreshVideo().then((re) => {
        this.videos = re.data.data;
      })
      this.get();
    })
  },
  data() {
    return {
      url: 'homepage',
      handleIndex: 0,
      articles: [],
      imagenotfound: imagenotfound,
      searchloading: false,
      videos: [],
      keyword: ''
    };
  },
  methods: {
    geted() {
      if (this.config.length <= 0) {
        this.config = {
          banner: [],
          blocks: []
        }
      }
    },
    removeBlock(index) {
      this.config.blocks.splice(index, 1);
    },
    addBlock() {
      this.config.blocks.push({
        "title": "",
        "sub_title": "",
        "sub_blocks": []
      })
    },
    addSub(index) {
      this.config.blocks[index].sub_blocks.push({
        type: '0',
        item_id: ''
      })
    },
    toggleType(index, sindex) {
      this.config.blocks[index].sub_blocks[sindex].item_id = '';
    },
    removeSub(index, sindex) {
      this.config.blocks[index].sub_blocks.splice(sindex, 1);
    },
    refreshArticles(keyword) {
      let params = '';
      if (keyword && keyword != '') {
        params += '?keyword=' + keyword;
      }
      return this.$http.get('admin/article/search' + params);
    },
    refreshVideo(keyword) {
      let params = '';
      if (keyword && keyword != '') {
        params += '?keyword=' + keyword;
      }
      return this.$http.get('admin/video/search' + params);
    },
    searchArticle(query) {
      this.searchloading = true;
      this.refreshArticles(query).then((res) => {
        this.articles = res.data.data;
        this.searchloading = false;
      }, () => {
        this.articles = [];
        this.searchloading = false;
      })
    },
    searchVideo(query) {
      this.searchloading = true;
      this.refreshVideo(query).then((res) => {
        this.videos = res.data.data;
        this.searchloading = false;
      }, () => {
        this.videos = [];
        this.searchloading = false;
      })
    },
    uploadUploadSuccess(url) {
      if (url) {
        this.$set(this.config.banner[this.handleIndex], "path", url);
      }
    },
    addBanner() {
      this.config.banner.push({
        path: '',
        article_id: this.articles[0].id
      })
    },
    setindex(index) {
      this.handleIndex = index;
    },
    removeBanner(index) {
      this.config.banner.splice(index, 1);
    },
    save() {
      let isback = false;
      for (let i = 0; i < this.config.banner.length; i++) {
        if (this.config.banner[i].path == '') {
          isback = true;
          break;
        }
      }
      if (isback) {
        this.toastr('请上传图片', 'warning')
        return;
      }
      this.saveLoading = true;
      this.$http.put("admin/sysconfig/" + this.url + '/update', this.config).then(res => {
        this.toastr('保存成功', 'success');
      }, (msg) => {
        this.toastr(msg, 'error');
      }).finally(() => {
        this.saveLoading = false;
      });
    }
  }
};
</script>

<style scoped>
.banners>div {
  display: inline-block;
  margin-right: 40px;
  margin-top: 20px;
}

.banners>div img {
  width: 200px;
  border: 1px solid #dcdfe6;
  vertical-align: top;
}

.blocks>div {
  width: 46%;
  display: inline-block;
  background: #fff;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 20px;
  margin-right: 30px;
  margin-bottom: 30px;
}

.subblock {
  margin: 20px 0;
}

.subblock:first-child {
  margin-top: 0px;
}
</style>
