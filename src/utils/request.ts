/* eslint-disable @typescript-eslint/dot-notation */
import axios from 'axios';
import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
  Method,
} from 'axios';
import { message, notification } from '@/components/PopupHack';
import { LOGIN_PATH } from '@/utils/constant';

// 错误处理方案： 错误类型
enum ErrorShowType {
  SILENT = 0,
  WARN_MESSAGE = 1,
  ERROR_MESSAGE = 2,
  NOTIFICATION = 3,
  REDIRECT = 9,
}

// 与后端约定的响应数据格式
interface ResponseStructure {
  success: boolean;
  data: any;
  errorCode?: number;
  errorMessage?: string;
  showType?: ErrorShowType;
}

type BizErrorInfo = {
  errorCode: number | string;
  errorMessage: string;
  errorShowType: ErrorShowType;
};

const codeMessage: Record<number, string> = {
  400: '请求参数错误',
  401: '你的登录已失效，请重新登录',
  403: '权限验证不通过',
  404: '找不到此接口',
  405: '请求方法不被允许',
  406: '请求的资源特性不满足请求头条件',
  407: '需要在代理服务器进行身份验证',
  408: '请求超时',
  409: '请求状态冲突',
  410: '请求的资源已被永久删除',
  411: '请求被拒绝，需要定义内容长度',
  412: '服务器无法满足请求头条件',
  413: '请求提交的数据大小超出范围',
  414: '请求的 URI 长度超出范围',
  415: '请求提交的数据格式不支持',
  416: '请求的数据范围不可用',
  417: '服务器无法满足 Expect 标头期望值',
  422: '请求语义错误',
  426: '服务器拒绝使用当前协议执行请求',
  429: '请求过于频繁',
  431: '请求头字段太大',
  451: '请求了非法资源',
  500: '接口链路调用发生错误',
  501: '服务器不支持此请求方法',
  502: '网关错误',
  503: '服务不可用',
  504: '网关超时',
  505: '服务器不支持请求中所使用的 HTTP 协议版本',
  506: '服务器配置错误',
  507: '服务器配置错误',
  508: '服务器在处理请求时检测到无限循环',
  510: '客户端需要对请求扩展',
  511: '客户端需要进行身份验证',
};

const TIME_OUT = 10 * 3500;

// 覆盖 request 类型：拦截器返回 response.data.data（内层数据），类型从 T 中提取内层 data
type InnerData<T> = T extends { data?: infer D } ? D : T;
type TypedRequest = {
  <T = any>(config: AxiosRequestConfig): Promise<InnerData<T>>;
  <T = any>(url: string, config?: AxiosRequestConfig): Promise<InnerData<T>>;
  defaults: AxiosInstance['defaults'];
  interceptors: AxiosInstance['interceptors'];
  get<T = any>(url: string, config?: AxiosRequestConfig): Promise<InnerData<T>>;
  post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<InnerData<T>>;
  put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<InnerData<T>>;
  delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<InnerData<T>>;
  request<T = any>(config: AxiosRequestConfig): Promise<InnerData<T>>;
};

// Create the axios instance
const request: AxiosInstance = axios.create({
  timeout: TIME_OUT,
  validateStatus: () => true,
});

// 请求拦截器：注入 token 和缓存控制头
request.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('accessToken');

    config.headers.set('Cache-Control', 'no-cache, no-store, must-revalidate');
    config.headers.set('Pragma', 'no-cache');
    config.headers.set('Expires', '0');
    config.headers.set('Authorization', `${token}`);

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// 响应拦截器：处理业务错误
request.interceptors.response.use(
  (response: AxiosResponse) => {
    const accessToken = localStorage.getItem('accessToken');
    const { data, status, config } = response;

    const shouldThrowError =
      !(data instanceof Promise) && ![200, 'ok'].includes(data['code'] || status);

    if (shouldThrowError) {
      const error: any = new Error();
      const bizErrorInfo: BizErrorInfo = {
        errorCode: data['code'] || status || -9999,
        errorMessage: data['msg'] || codeMessage[status] || '请求错误，请重试',
        errorShowType: config['errorShowType'],
      };
      error.name = 'BizError';
      error.info = bizErrorInfo;
      throw error;
    }

    if (!accessToken && !window.location.pathname.startsWith('/login')) {
      window.location.href = LOGIN_PATH;
    }

    return data?.data ?? data;
  },
  (error) => {
    // 处理 axios 网络错误
    if (error.code === 'ECONNABORTED') {
      const timeoutError: any = new Error('客户端请求超时');
      timeoutError.name = 'BizError';
      timeoutError.info = {
        errorCode: -1,
        errorMessage: '客户端请求超时',
        errorShowType: ErrorShowType.ERROR_MESSAGE,
      };
      return Promise.reject(timeoutError);
    }

    return Promise.reject(error);
  },
);

// 统一错误处理函数 - 可在组件或拦截器中使用
const errorHandler = (error: any, opts?: any) => {
  if (opts?.skipErrorHandler) throw error;

  // 我们的 errorThrower 抛出的错误
  if (error.name === 'BizError') {
    const errorInfo: ResponseStructure | undefined = error.info;
    if (errorInfo) {
      const { errorMessage, errorCode } = errorInfo as any;
      switch ((errorInfo as any).showType) {
        case ErrorShowType.SILENT:
          // do nothing
          break;
        case ErrorShowType.WARN_MESSAGE:
          message.warning(errorMessage);
          break;
        case ErrorShowType.ERROR_MESSAGE:
          message.error(errorMessage);
          break;
        case ErrorShowType.NOTIFICATION:
          notification.open({
            description: errorMessage,
            message: errorCode as any,
          });
          break;
        case ErrorShowType.REDIRECT:
          // TODO: redirect
          break;
        default:
          message.error(errorMessage);
      }
    }
  } else {
    // 发送请求时出了点问题
    message.error(error.message || '请求错误，请重试');
  }
};

// 将 axios 实例断言为自定义类型，使 request<T> 返回 Promise<T> 而非 Promise<AxiosResponse<T>>
const typedRequest = request as unknown as TypedRequest;

export { typedRequest as request, errorHandler, ErrorShowType };
export type { ResponseStructure, BizErrorInfo };
export default typedRequest;
