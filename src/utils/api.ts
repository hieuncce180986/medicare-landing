const BASE_URL = "http://localhost:8000";

const PRODUCT = {
  GET_ALL: `${BASE_URL}`,
  GET_PRODUCT_BY_ID: `${BASE_URL}`,
};

const BLOG = {
  GET_ALL: `${BASE_URL}`,
  GET_BLOG_BY_ID: `${BASE_URL}`,
};

const SLIDER = {
  GET_ALL_SLIDER: `${BASE_URL}`,
};

const ACCOUNT = {
  GET_ALL: `${BASE_URL}`,
  GET_ACCOUNT_BY_ID: `${BASE_URL}`,
  UPDATE: `${BASE_URL}`,
  CHANGE_PASSWORD: `${BASE_URL}`,
};

const AUTH = {
  LOGIN_MANUAL: `${BASE_URL}`,
  LOGIN_MANUAL_PHONE: `${BASE_URL}`,
  LOGIN_WITH_GOOGLE: `${BASE_URL}`,
};

const ORDER = {
  GET_ALL: `${BASE_URL}`,
  GET_ALL_ORDER_BY_ID: `${BASE_URL}`,
  GET_ORDER_BY_ID: `${BASE_URL}`,
  UPDATE_ORDER: `${BASE_URL}`,
  CREATE: `${BASE_URL}`,
  CREATE_NO_LOGIN: `${BASE_URL}`,
  CREATE_ALBUM: `${BASE_URL}`,
  CREATE_ALBUM_NO_LOGIN: `${BASE_URL}`,
  DISCOUNT_CHECK: `${BASE_URL}`,
  CREATE_PAYMENT: `${BASE_URL}`,
};

const SOCKET = {
  GATEWAY: `${BASE_URL}/socket-gateway`,
};

export const API = {
  PRODUCT,
  BLOG,
  SLIDER,
  ACCOUNT,
  AUTH,
  ORDER,
  SOCKET,
};
