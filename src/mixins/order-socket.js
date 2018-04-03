import common from '@/utils/common';
import CONFIG from '@/utils/config';
import md5 from 'js-md5';

export default {
  data() {
    return {
      orderSocket: {},
      ORDER_SOCKET_CONFIG: {
        URL: CONFIG.HTTP.SOCKET,
        EVENTS: {
          'GET_CLIENT_ID': '1042',
          'NEW_ORDERS': '1100'
        }
      }
    }
  },
  mounted() {

  },
  methods: {
    onOrderSocketMessage(res) {
      console.log(res);
      res = JSON.parse(res.data);
      if (res.status == 1) {
        this.toastr(res.detail, 'warning');
      }

      if (res.type == this.ORDER_SOCKET_CONFIG.EVENTS.GET_CLIENT_ID) {
        this.$http.get('admin/push/bind?client_id=' + res.data.client_id).then(() => {
          console.log('绑定成功');
        }, (res) => {
          console.log('绑定失败');
          console.log(res);
        })
      }

      if (res.data && res.type == this.ORDER_SOCKET_CONFIG.EVENTS.NEW_ORDERS) {
        if (res.data.indexOf("退货") >= 0) {
          this.$notify({
            title: '提示',
            message: '你有一个新的退货申请待确认',
            duration: 0,
            type: 'warning',
            onClick: () => {
              if (this.$route.name) {
                if (this.$route.name == '退货单管理') {
                  return;
                } else {
                  this.$router.push({ path: '/returns' });
                }
              }
            }
          });
        } else if (res.data.indexOf("退款") >= 0) {
          this.$notify({
            title: '提示',
            message: '你有一个新的退款申请待确认',
            duration: 0,
            type: 'warning',
            onClick: () => {
              if (this.$route.name) {
                if (this.$route.name == '退款单管理') {
                  return;
                } else {
                  this.$router.push({ path: '/refund' });
                }
              }
            }
          });
        } else {
          this.$http.get("admin/order/wait/number/get").then(res => {
            this.orderCommit = res.data.commit;
            this.orderSend = res.data.send;
            this.playOrderAudio();
            this.$notify({
              title: '提示',
              message: '你有一个新的订单待确认',
              duration: 0,
              type: 'warning',
              onClick: this.handleNewOrder
            });
          });
        }
      }
    },
    getClientId() {
      let now = common.getNowSecond();
      let params = {
        type: this.ORDER_SOCKET_CONFIG.EVENTS.GET_CLIENT_ID,
        status: '0',
        data: {
          time: now,
          secure_token: md5('xinzhibang@168' + now)
        }
      }
      console.log(params);
      this.orderSocket.send(JSON.stringify(params));
    },
    handleNewOrder() {
      if (this.$route.name) {
        if (this.$route.name == '订单列表') {
          return;
        } else {
          this.$router.push({ path: '/router?url=' + encodeURIComponent('/orders?order_status=0&pay_status=1') })
        }
      }
    },
    connectOrderSocket() {
      this.orderSocket = new WebSocket(this.ORDER_SOCKET_CONFIG.URL);
      this.orderSocket.onmessage = this.onOrderSocketMessage;
      this.orderSocket.onerror = (res) => {
        console.log(res);
      }
      this.orderSocket.onclose = (res) => {
        console.log(res);
      },
        this.orderSocket.onopen = () => {
          this.getClientId();
        };
    },
    closeOrderSocket() {
      this.orderSocket.close();
    }
  }
}
