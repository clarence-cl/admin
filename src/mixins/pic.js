import CONFIG from '@/utils/config';
import common from '@/utils/common';
import md5 from 'js-md5';
import {
  UPLOADTOKEN,
  UPLOADTOKENEXPIRE
} from "@/stores/upload";

export default {
  created() {
    if (!CONFIG.MOCK.STATUS) {
      let now = common.getNow() / 1000;
      let sign = md5('xinzhibang168' + now);

      if (this.$store.getters.uploadToken.length > 0) {
        if (this.$store.getters.uploadTokenExpire > now) {
          this.pic.token = this.$store.getters.uploadToken;
          return;
        }
      }

      this.$http.get("admin/getSignature?sign=" + sign + "&time=" + now).then((res) => {
        this.$store.dispatch(UPLOADTOKEN, res.body);
        this.$store.dispatch(UPLOADTOKENEXPIRE, (Number(now) + 6600));
        this.pic.token = res.body;
      });
    }
  },
  data() {
    return {
      pic: {
        url: 'https://img.xinzhibang168.com/',
        upload: 'https://upload-z2.qiniup.com',
        loading: false,
        token: ''
      }
    }
  },
  methods: {
    uploadPic(upload) {
      let formData = new FormData();
      formData.append("file", upload.file);
      formData.append("token", this.pic.token)
      let msg = this.$message({
        type: 'info',
        duration: 0,
        message: '图片上传中...',
        customClass: 'simsir-toastr-info',
      });
      this.pic.loading = true;
      if (CONFIG.MOCK.STATUS) {
        setTimeout(() => {
          msg.close();
          this.pic.loading = false;
          this.toastr('图片上传成功', 'success');
          upload.onSuccess("https://wx.zhixbao.net/FjYrJhPuyIRpeYduHmiUWl-c73Ry.jpg");
        }, 2000)
      } else {
        if (upload.file.size > CONFIG.FILE.MAXSIZE) {
          this.toastr(CONFIG.FILE.TIP, 'warning');
          return false;
        }
        this.$http.post(this.pic.upload, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          credentials: false
        }).then((res) => {
          let data = JSON.parse(res.bodyText);
          msg.close();
          this.pic.loading = false;
          this.toastr('图片上传成功', 'success');
          upload.onSuccess(this.pic.url + data.key);
        }, () => {
          this.pic.loading = false;
          msg.close();
          this.toastr('图片上传失败', 'error');
          upload.onSuccess();
        })
      }
    },
    uploadVideo(upload) {
      let formData = new FormData();
      formData.append("file", upload.file);
      formData.append("token", this.pic.token)
      let msg = this.$message({
        type: 'info',
        duration: 0,
        message: '视频上传中...',
        customClass: 'simsir-toastr-danger',
      });
      this.pic.loading = true;
      if (CONFIG.MOCK.STATUS) {
        setTimeout(() => {
          msg.close();
          this.pic.loading = false;
          this.toastr('视频上传成功', 'success');
          upload.onSuccess("https://wx.zhixbao.net/FjYrJhPuyIRpeYduHmiUWl-c73Ry.jpg");
        }, 2000)
      } else {
        this.$http.post(this.pic.upload, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          credentials: false
        }).then((res) => {
          let data = JSON.parse(res.bodyText);
          msg.close();
          this.pic.loading = false;
          this.toastr('视频上传成功', 'success');
          upload.onSuccess(this.pic.url + data.key);
        }, () => {
          this.pic.loading = false;
          msg.close();
          this.toastr('视频上传失败', 'error');
          upload.onSuccess();
        })
      }
    },
    uploadCredential(upload) {
      let formData = new FormData();
      formData.append("file", upload.file);
      this.$http.post("admin/sysconfig/wechat/pay/upload", formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
      }).then(res => {
        let data = res.data;
        this.toastr('证书上传成功', 'success');
        upload.onSuccess(data);
      }, () => {
        this.toastr('证书上传失败', 'error');
        upload.onSuccess();
      })
    },
    uploadPicBefore(file) {
      return new Promise((resolve, reject) => {
        let reader = new FileReader();
        let that = this;
        reader.onload = function(e) {
          let src = e.target.result;
          let image = new Image();
          image.onload = function() {
            let width = image.width;
            let height = image.height;
            if (width == height) {
              resolve();
            } else {
              that.toastr('图片比例不正确，需上传比例为1:1的图片', 'warning');
              reject();
            }
          }
          image.src = src;
        };
        reader.readAsDataURL(file);
      });
    }
  }
}
