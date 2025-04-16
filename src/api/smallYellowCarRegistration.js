import http from "../utils/requestIntercept"
//小黄车 录单
export const addShoppingCartRegistration = (data) => {
    return http({
        url: "/businessWechat/ShoppingCartRegistration",
        method: "post",
        data
    });
};
//小黄车登记列表
export const getShoppingCartRegistration = (params) => {
    return http({
        url: "/businessWechat/ShoppingCartRegistration/listWithPage",
        method: "get",
        params
    });
};
// 根据id删除数据
export const deleteShoppingCartRegistration = (id) => {
    return http({
        url: `/businessWechat/ShoppingCartRegistration/${id}`,
        method: "delete",
    });
};
//小黄车 指派
export const ShoppingCartRegistrationAssign = (data) => {
    return http({
        url: "/businessWechat/ShoppingCartRegistration/assign",
        method: "put",
        data
    });
};
//获取归属公司
export const getBelongCompanyList = () => {
    return http({
        url: "/businessWechat/ShoppingCartRegistration/getBelongCompanyList",
        method: "get",
    });
};