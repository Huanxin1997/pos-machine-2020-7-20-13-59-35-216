const data = require('./db');
// 所有商品列表
let allBarList = [];

/**
 * 打印票据
 * @param {*} barcodes 
 */
function printReceipt(barcodes) {
    let barList = calculateItems(barcodes);
    let receiptMsg = generateReceiptMsg(barList);
    let receipt = generateReceiptText(receiptMsg)
    console.log(receipt);
}

/**
 * 计算单个商品总价
 * @param {*} obj 
 */
function calculateSubTotal(obj) {
    for (let i in allBarList) {
        if (obj[allBarList[i].barcode]) {
            obj[allBarList[i].barcode].unitPrice = allBarList[i].price;
            obj[allBarList[i].barcode].subTotal = allBarList[i].price * obj[allBarList[i].barcode].quantity;
        }
    }
    return obj;
}

/**
 * 计算总价格
 * @param {*} obj 
 */
function calculateTotalPrice(obj) {
    let totalPrice = 0;
    for (let i in obj) {
        totalPrice += obj[i].subTotal;
    }
    return totalPrice;
}

/**
 * 获取全部商品信息
 */
function getAllBars() {
    // 模拟获取数据库数据
    return data;
}

/**
 * 计算每个商品的总数
 * @param {*} list 
 */
function calculateItems(list) {
    allBarList = getAllBars();
    let barObj = {}
    for (let i = 0; i < list.length; i++) {
        if (!barObj[list[i]]) {
            barObj[list[i]] = {};
            barObj[list[i]].quantity = 1;
            barObj[list[i]].name = allBarList.filter(item => item.barcode == list[i])[0].name;
        } else {
            barObj[list[i]].quantity++;
        }
    }
    barObj = calculateSubTotal(barObj);
    return barObj;
}

/**
 * 生成票据主体信息
 * @param {*} list 
 */
function generateReceiptMsg(list) {
    let str = "";
    for (let i in list) {
        str += `Name: ${list[i].name}, Quantity: ${list[i].quantity}, Unit price: ${list[i].unitPrice} (yuan), Subtotal: ${list[i].subTotal} (yuan)\n`;
    }
    let totalPrice = calculateTotalPrice(list);
    str += `----------------------\nTotal: ${totalPrice} (yuan)\n`
    return str;
}

/**
 * 生成票据内容
 * @param {*} str 
 */
function generateReceiptText(str) {
    let content = `\n***<store earning no money>Receipt ***\n${str}**********************`;
    return content;
}


module.exports = {
    printReceipt
};