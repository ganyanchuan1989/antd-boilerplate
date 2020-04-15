import xhr from './xhr/';

class P100Service {
  action(param) {
    return xhr({
      method: 'post',
      url: '/action.do',
      body: param,
      showErr: false,
    });
  }
}

// 实例化后再导出
export default new P100Service();
