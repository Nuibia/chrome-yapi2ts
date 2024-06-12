/** 后端-前端类型映射 */
const TypeObj = {
  text: "string",
  string: "string",
  long: "number",
  number: "number",
  integer: "number",
  boolean: "boolean",
  null:'null'
};

export const YApi2Ts = (data) => {
  console.log("YApi2TsData", data);
  const {
    /** 接口名称 */
    title,
    /** 接口创建人 */
    username,
    /** 接口路径 */
    path,
    /** body请求参数 */
    req_body_form,
    /** body请求参数 */
    req_body_other,
    /** 返回数据-响应报文 */
    res_body,
    /** query请求参数 */
    req_query,
  } = data;
  return {
    // 请求参数
    queryParams: ReturnParams(req_query, path),
    bodyParams: ReturnParams(
      req_body_form.length > 0 ? req_body_form : req_body_other,
      path
    ),
    // 详情参数
    resultData: ReturnResult(res_body, path),
  };
};

// 请求params
const ReturnParams = (data, path) => {
  console.log("data-return-params", data);
  if (Array.isArray(data)) {
    if (data?.length) {
      let params = `export interface I${finallyCode(path)}Params {`;
      data.forEach((item) => {
        params += `/** ${item.desc} */`;
        params += `${item.name}`;
        params += `${item.required === "0" ? "?" : ""}:`;
        params += `${TypeObj?.[item.type] ?? "any"}`;
        params += `;`;
      });
      params += `}`;
      return replaceString(params);
    }
  } else {
    if (data) {
      console.log("ReturnParamsElse", data);
      const JsonData = JSON.parse(data).properties;
      console.log(JsonData);
      if (JsonData) {
        let params = `export interface I${finallyCode(path)}Params {`;
        params += formatObject(JsonData);
        params += `}`;
        return replaceString(params);
      }
    }
  }
};
// 响应result
const ReturnResult = (data, path) => {
  if (data) {
    console.log("ReturnResult", data);
    const JsonData = JSON.parse(data).properties;
    console.log(JsonData);
    if (JsonData) {
      let params = `export interface I${finallyCode(path)}Result {`;
      params += formatObject(JsonData);
      params += `}`;
      return replaceString(params);
    }
  }
};

/** 获取路径的最后一个/后的值，并首字母大写 */
const finallyCode = (path) => {
  const array = path.split("/");
  return (
    array?.[array.length - 1][0].toUpperCase() +
    array[array.length - 1].slice(1)
  );
};

const formatObject = (data) => {
  if (data) {
    let finallyCode = "";
    for (const [key, value] of Object.entries(data)) {
      if (value.type === "object") {
        finallyCode += `${key}:{`;
        finallyCode += formatObject(value?.properties);
        finallyCode += `};`;
      } else if (value.type === "array") {
        if (value.items.type === "object") {
          finallyCode += `${key}:{`;
          finallyCode += `${formatObject(value?.items?.properties)}`;
          finallyCode += `}[]`;
        } else {
          if (value?.description) {
            finallyCode += `/** ${value?.description} */ `;
          }
          finallyCode += `${key}:${value.items.type}[]`;
        }
      } else {
        if (value?.description) {
          finallyCode += `/** ${value?.description} */ `;
        }
        finallyCode += `${key}:`;
        finallyCode += `${TypeObj?.[value?.type]};`;
      }
    }
    return finallyCode;
  }
};

/** 换行规则：
 *  {
 *  }
 *  ;
 *  \*\/
 */
const replaceString = (data) => {
  return data.replace(/([{|;|\]]|\*\/)/g, "$&\n");
};
