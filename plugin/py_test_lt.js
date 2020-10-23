/*
	股票类别:
	http://finance.ifeng.com/stock/

	NBA 
	http://sports.sina.com.cn/nba/

	曼岛TT
	http://www.jiche.com/topic/ManxTT_1.html

	csgo 
	http://csgo.gamersky.com/news/

	国际新闻
	https://news.sina.com.cn/world/

*/

var axios = require("axios");
var cheerio = require("cheerio");
var newsModel = require("../model/news");

const timefilter = function (str) {
  let timeArr = str.split(" ");
  let reg = /(年|月|日)/;
  let time1 = timeArr[0].split(reg);
  let year = time1[0];
  let month = time1[2];
  let date = time1[4];
  if (timeArr.length === 1) {
    // 只有年月日
    let ret = Date.parse(new Date(`${month} ${date} ${year}`));
    return ret;
  } else {
    // 时分秒
    let ret = Date.parse(new Date(`${month} ${date} ${year} ${timeArr[1]}`));
    return ret;
  }
};
const MANX_TT = function (cb) {
  const hrefs = [];
  for (let i = 1; i <= 7; i++) {
    hrefs.push(axios.get(`http://www.jiche.com/topic/ManxTT_${i}.html`));
  }
  axios.all(hrefs).then(
    axios.spread(function () {
      const ALLHREF = [];
      [...arguments].map((data) => {
        const $ = cheerio.load(data.data, { decodeEntities: false }); // 解析列表
        let newsList = $(".mix-col1-hd a");
        let hrefs = [];
        Object.values(newsList).map((item) => {
          hrefs.push($(item).attr("href"));
        });
        hrefs.splice(10, 4);
        ALLHREF.push(hrefs.map((item) => axios.get(item)));
      });
      axios.all(ALLHREF.flat()).then(
        axios.spread(function () {
          [...arguments].map(async (data) => {
            const $ = cheerio.load(data.data, { decodeEntities: false }); // 解析列表
            let source = $(".article-info")
              .text()
              .trim()
              .split(" ")
              .reverse()[1]
              .trim()
              .split("   ")[0]
              .trim();
            await new newsModel({
              title: $("h1").text().trim(),
              context: $(".article-content").html().trim(),
              time: timefilter($(".article-info").text().trim().split(" ")[0]),
              type: "曼岛TT",
              source: source,
              url: data.config.url,
              img: $(".article-content").find("img").attr("src"),
            }).save();
          });
          cb();
        })
      );
    })
  );
};
const NBA_NEWS = function () {
  axios.get("http://sports.sina.com.cn/nba/").then((data) => {
    var $ = cheerio.load(data.data, { decodeEntities: false }); // 解析列表
    let newsList = $(".news-list-b .item a");
    let hrefs = [];
    Object.values(newsList).map((item) => {
      hrefs.push($(item).attr("href"));
    });
    hrefs.splice(33, 6);
    let reqArr = [];
    hrefs.map((href) => {
      reqArr.push(axios.get(href));
    });
    axios.all(reqArr).then(
      axios.spread(function () {
        [...arguments].map((page) => {
          const $2 = cheerio.load(page.data, { decodeEntities: false });
          var news = new newsModel({
            title: $2("h1").text().trim(),
            context: $2("#artibody").html().trim(),
            time: timefilter($2(".date").text().trim()),
            type: "NBA体育",
            source: $2(".ent-source").text(),
            url: page.config.url,
            img: $2(".img_wrapper").find("img").attr("src"),
          });
          news.save();
        });
      })
    );
  });
};
const STOCK_NEWS = function () {
  axios.get("http://finance.ifeng.com/stock/").then((data) => {
    //列表页
    var $ = cheerio.load(data.data, { decodeEntities: false }); // 解析列表
    var lias = $(".stock_news-38kZ6a7Q").find("a"); //在列表中找a

    for (let i = 0; i < lias.length; i++) {
      // 遍历a
      var href = $(lias[i]).attr("href"); //取a中的href

      axios.get("http:" + href).then((data2) => {
        // 获取一篇文章的详情
        var $2 = cheerio.load(data2.data, { decodeEntities: false });
        console.info();
        //解析需要的数据,入库
        var news = new newsModel({
          title: $2("h1").html(),
          context: $2(".main_content-r5RGqegj").html(),
          time: timefilter(
            $2(".time-1Mgp9W-1").find("span").text().trim().split("来源")[0]
          ),
          type: "股票",
          source: $2(".source-qK4Su0--").text(),
          url: "http:" + href,
          img: $2(".text-3w2e3DBc").find("img").attr("src")
            ? $2(".text-3w2e3DBc").find("img").attr("src")
            : "none",
        });

        news.save((err, newsinfo) => {});
      });
    }
  });
};
const GLOBAL_NEWS = function () {
  axios
    .get(
      "https://interface.sina.cn/news/get_news_by_channel_new_v2018.d.html?cat_1=51923&show_num=100&level=1,2&last_time=1603088351&_=1603089733345"
    )
    .then(({ data }) => {
      let reqArr = [];
      let pageInfo = [];
      data["result"]["data"].map((item) => {
        reqArr.push(axios.get(item.url));
        pageInfo.push({
          title: item.title,
          url: item.url,
          img: item.img,
          media_name: item.media_name,
        });
      });
      axios
        .all(reqArr)
        .then(
          axios.spread(function () {
            [...arguments].map((page, index) => {
              const $1 = cheerio.load(page.data, { decodeEntities: false });
              let time = $1(".date-source .date")
                ? $1(".date-source .date").text().split("作者")[0]
                : $1(".swpt-time").text();
              let article = $1(".article").html().trim();
              new newsModel({
                title: pageInfo[index].title,
                context: article,
                time: timefilter(time),
                type: "国际新闻",
                source: pageInfo[index].media_name,
                url: pageInfo[index].url,
                img: pageInfo[index].img,
              }).save();
            });
          })
        )
        .catch((e) => console.info(e));
    })
    .catch((e) => console.info(e));
};
const CSGO_NEWS = function () {
  const reqArr = [];
  for (let i = 1; i <= 10; i++) {
    reqArr.push(
      axios.get(
        `http://db2.gamersky.com/LabelJsonpAjax.aspx?jsondata={"type":"updatenodelabel","isCache":true,"cacheTime":60,"nodeId":"21002","isNodeId":"true","page":${i}}`
      )
    );
  }
  axios.all(reqArr).then(
    axios.spread(function () {
      [...arguments].map(({ data }) => {
        console.info(data);
      });
    })
  );
};

module.exports = { NBA_NEWS, STOCK_NEWS, MANX_TT, GLOBAL_NEWS, CSGO_NEWS };
