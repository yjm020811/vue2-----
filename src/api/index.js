import request from "../request/index";

//获取衣服的api
export function getClothes() {
  return request.get("home/multidata");
}
