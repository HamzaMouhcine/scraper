const puppeteer = require('puppeteer');
var Post = require('./models/post');
var mongoose = require('mongoose');

module.exports = (async () => {
  const browser = await puppeteer.launch({headless:true});
  const page = await browser.newPage();
  await page.goto('https://www.reddit.com/r/soccer/',{waitUntil:'networkidle2'});


  setInterval(async ()=>{
    let content = await page.evaluate(() => {
     return Array.from(document.querySelectorAll('._2X6EB3ZhEeXCh1eIVA64XM._2hSecp_zkPm_s5ddV2htoj span'))
    .filter(pst =>pst.innerText==='Media')
    .map(pst => pst.parentNode.parentNode.parentNode.parentNode.previousElementSibling.innerText);
    });


    console.log("number of posts : "+content.length);
    for(let i=0;i<content.length;i++){
      const nposts = await Post.find({content:content[i]});
      cnt = await nposts.length;
      if(cnt!==0) break; 
      else{
        let newPost = new Post({
          content: content[i]
        });
        newPost.save();
        console.log("DB updated!");
      }
    }
    console.log(content);
  },'60000');
  /*setInterval(()=>{
    console.log("Mouhcine");
  },'1000');*/
});