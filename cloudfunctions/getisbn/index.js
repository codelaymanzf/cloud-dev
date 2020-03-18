// 云函数入口文件
const cloud = require("wx-server-sdk");
const axios = require("axios");
const doubanbook = require("doubanbook"); // 用于解密加密的图书信息

cloud.init();

async function getDoubanBookBrief(isbn) {
  const url =
    "https://search.douban.com/book/subject_search?search_text=" + isbn;
  let res = await axios.get(url);
  let reg = /window\.__DATA__ = "(.*)"/;

  if (reg.test(res.data)) {
    let searchData = doubanbook(RegExp.$1)[0];
    return searchData;
  }
}

// 云函数入口函数
exports.main = async (event, context) => {
  let { isbn } = event;
  let bookBrief = await getDoubanBookBrief(isbn);

  return bookBrief;
};
