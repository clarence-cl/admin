import common from '@/utils/common';

export default {
  created() {

  },
  data() {
    return {
      video: {},
      videoData: {
        loading: false,
        percentage: 0,
        taskId: '',
        cos: {}
      }
    }
  },
  methods: {
    uploadVideo(upload) {
      var that = this;
      that.videoData.percentage = 0;
      var getSignature = function(callback) {
        that.$http.get('getVideoSignature').then((res) => {
          callback(res.body.sign);
        });
      };
      that.videoData.loading = true;
      qcVideo.ugcUploader.start({
        videoFile: upload.file,
        getSignature: getSignature,
        success: function() {
          that.videoData.loading = false;
        },
        error: function(res) {
          that.videoData.loading = false;
          console.log(res);
        },
        progress: function(result) {
          that.videoData.taskId = result.taskId;
          that.videoData.cos = result.cos;
          that.videoData.percentage = Math.floor(result.shacurr * 100);
        },
        finish: function(result) {
          that.videoData.loading = false;
          that.videoData.videoId = result.fileId;
          that.handleVideoUploadSuccess(result.videoUrl);
        }
      });
    },
    cancelUploadVideo() {
      if (this.videoData.loading) {
        qcVideo.ugcUploader.cancel({
          cos: this.videoData.cos,
          taskId: this.videoData.taskId
        });
        this.videoData.loading = false;
      }
    },
  }
}
