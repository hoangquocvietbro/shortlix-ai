const fs = require("fs");
const youtubeVideoDownload = require("./youtubeVideoDownload");
const longYoutubeVideoDownload = require("./longYoutubeVideoDownload");
const removeAudioFromVideo = require("./removeAudioFromVideo");
const youtubeVideoDownloadWithFormat = require("./youtubeVideoDownloadWithFormat");
const createTimeStamps = require("./createTimeStamps");
const sendVideoToGemini = require("./sendVideoToGemini");
const cutVideoByTimeStampThenSendToGemini = require("./cutVideoByTimeStampThenSendToGemini");
const cutVideoByTimeStampThenConvertToText = require("./cutVideoByTimeStampThenConvertToText");
const cutVideoThenSpeechToTextPhoWhisper = require("./cutVideoThenSpeechToTextPhoWhisper")
const sendVideoAndSubToReSub = require("./sendAudioAndSubToReSub");
const sendVideoToGeminiChatTwo = require("./sendVideoToGeminiChatTwo");
const reSendVideoToGemini = require("./reSendVideoToGemini");
const sendFileToGeminiToTranslateText = require("./sendFileToGeminiToTranslateText");
const extractImage = require("./extractImage");
const extractImageAndMakeMp3 = require("./extractImageAndMakeMp3");
const createVideoFromImagesAndMp3Folder = require("./createVideoFromImagesAndMp3Folder");
const extractImageAndMakeMp3VN = require("./extractImageAndMakeMp3VN");
const createVideoFromImagesAndMp3FolderVN = require("./createVideoFromImagesAndMp3FolderVNZoom");
const { error } = require("console");
const youtubeVideoDownloadAudioOnly = require("./youtubeVideoDownloadAudioOnly");
const runImgTextRemoveServer = require('./runImgTextRemoveServer')
async function Run() {
  let apiKeys = process.env.API_KEY.split("|");
  fs.writeFileSync("Log.txt", "");

  if (!fs.existsSync("LogErrorIndex.txt"))
    fs.writeFileSync("./LogErrorIndex.txt", "");
  const textData = fs.readFileSync("./LogErrorIndex.txt", "utf-8");
  let rootFolder = `${Date.now()}`;
  let index = 0;
  fs.writeFileSync("LogErrorIndex.txt",'');

  const urls = fs
    .readFileSync("./youtubeLinks.txt", "utf-8")
    .split("\n")
    .filter((line) => line.trim() !== "");

  for (const url of urls) {
    const urlParams = new URLSearchParams(url);
    if (!urlParams) continue;
    let indexInLink = parseInt(urlParams.get("index"));
    let videoID = urlParams.get("https://www.youtube.com/watch?v");
    if (indexInLink) {
      index = indexInLink;
      console.log("Index:", index);  Output: Index: 5
    } else {
      index++;
      console.log("Index not found in the URL");
    }
    if (urlParams.get("list")) rootFolder = urlParams.get("list");
    if (!fs.existsSync(rootFolder)) {
      fs.mkdirSync(rootFolder);
    }
        [
      "./images",
      "./mp3",
      "./mp3Video",
      "./audioFileList",
      "./imageFileList",
      "./videoFileList",
      "./outputVideo",
      "./originSub",
      "./translatedSub",
      "./originVideo",
      "./mp3VN",
      "./noAudioVideo",
      "./audioFileListVN",
      "./outputVideoVN",
      "./videoFileListVN",
      "./VideoVNmese",
      "./VideoTranslated",
      "./timeStamps",
      "./outputVideoSliced",
      "./SubTurnOne",
    ].forEach((dir, index, dirs) => {
      if (!fs.existsSync("./" + rootFolder + "/" + dir)) {
        fs.mkdirSync("./" + rootFolder + "/" + dir);
      }
    });
    //if (index < 144) continue;

    index = 1000000 + index;
      if (fs.existsSync("./" + rootFolder + "/" + "VideoVNmese/"+`${index}_null.mp4`)) continue;
      if (fs.existsSync("./" + rootFolder + "/" + "VideoVNmese/"+`${index}_.mp4`)) continue;
      if (fs.existsSync("./" + rootFolder + "/" + "VideoVNmese/"+`${index}_${index}.mp4`)) continue;
      //if (fs.existsSync("./" +rootFolder+`/translatedSub/translate${index}.txt`)) continue;
    //if (fs.existsSync("./" +rootFolder+`/originSub/sub${index}.txt`)) continue;
    //if (!textData.includes(index.toString())) continue;
    try { 
/* 
     if (!fs.existsSync("./" + rootFolder + `/originVideo/videoplayback${index}.mp4`)) {
            console.log("Bắt đầu download video");
      try {
        try {
          await youtubeVideoDownload(
            url,
            "./" + rootFolder + `/originVideo/videoplayback${index}.mp4`);
        } catch {
           await youtubeVideoDownload(
            url,
            "./" + rootFolder + `/originVideo/videoplayback${index}.mp4`
          );
        }
      } catch {
         await youtubeVideoDownload(
          url,
          "./" + rootFolder + `/originVideo/videoplayback${index}.mp4`
        );
      }
      console.log("Hoàn thành download video");

                  console.log("Bắt đầu download video chất lượng cao");
      try {
        try {
          await youtubeVideoDownloadWithFormat(
            url,
            "./" + rootFolder + `/originVideo/videoHightQuality${index}.mp4`,'720p');
        } catch {
          await youtubeVideoDownloadWithFormat(
            url,
            "./" + rootFolder + `/originVideo/videoHightQuality${index}.mp4`,'720p');
        }
      } catch {
          await youtubeVideoDownloadWithFormat(
            url,
            "./" + rootFolder + `/originVideo/videoHightQuality${index}.mp4`,'720p');
      }
      console.log("Hoàn thành download video chất lượng cao");
}

       console.log("Bắt đầu chuyển video thành văn bản");
       try {
         try {
           await createTimeStamps(rootFolder, index, apiKeys[0]);
         } catch {
           await createTimeStamps(rootFolder, index, apiKeys[4]);
         }
       } catch {
         await createTimeStamps(rootFolder, index, apiKeys[3]);
       }
       try {
         try {
           await cutVideoThenSpeechToTextPhoWhisper(rootFolder, index,apiKeys[0]);
         } catch {
           await cutVideoThenSpeechToTextPhoWhisper(rootFolder, index,apiKeys[1]);
         }
       } catch {
         await cutVideoThenSpeechToTextPhoWhisper(rootFolder, index,apiKeys[2]);
       }

       try {
         try {
           try {
             try {
               await sendVideoAndSubToReSub(rootFolder, index, apiKeys[3]);
             } catch (error) {
               console.log(error);
               await sendVideoAndSubToReSub(rootFolder, index, apiKeys[4]);
             }
           } catch (error) {
             console.log(error);
             await sendVideoAndSubToReSub(rootFolder, index, apiKeys[5]);
           }
         } catch (error) {
           console.log(error);
           await sendVideoAndSubToReSub(rootFolder, index, apiKeys[2]);
         }
       } catch (error) {
         console.log(error);
         await sendVideoAndSubToReSub(rootFolder, index, apiKeys[4]);
       }
*/
 runImgTextRemoveServer.runServer();
    await wait(60000)
     console.log("Bắt đầu exatract image");
      try {
        try {
          await extractImage(rootFolder, index, apiKeys[0]);
        } catch {
          await extractImage(rootFolder, index, apiKeys[1]);
        }
      } catch {
        await extractImage(rootFolder, index, apiKeys[2]);
      }
      console.log("Hoàn thành exatract image");
      runImgTextRemoveServer.exitServer();
 
         console.log("Bắt đầu exatract image và download mp3 file VN");
      try {
        try {
          await extractImageAndMakeMp3VN(rootFolder, index, apiKeys[0]);
        } catch {
          await extractImageAndMakeMp3VN(rootFolder, index, apiKeys[1]);
        }
      } catch {
        await extractImageAndMakeMp3VN(rootFolder, index, apiKeys[2]);
      }

      console.log("Hoàn thành exatract image và download mp3 file VN");
   
      console.log("Bắt đầu tạo video VN");
      try {
        try {
          await createVideoFromImagesAndMp3FolderVN(rootFolder, index, videoID);
        } catch {
          await createVideoFromImagesAndMp3FolderVN(rootFolder, index, videoID);
        }
      } catch {
        await createVideoFromImagesAndMp3FolderVN(rootFolder, index, videoID);
      }

      console.log("Kết thúc tạo video VN");
 
     console.log("Bắt đầu chuyển video thành văn bản dịch");
      try {
        try {
          await sendFileToGeminiToTranslateText(rootFolder, index,apiKeys[0]);
        } catch {
          await sendFileToGeminiToTranslateText(rootFolder, index,apiKeys[1]);
        }
      } catch {
        await sendFileToGeminiToTranslateText(rootFolder, index,apiKeys[2]);
      }
   
      console.log("Hoàn thành chuyển video thành văn bản dịch");


       console.log("Bắt đầu exatract image và download mp3 file đã dịch");
      try {
        try {
          await extractImageAndMakeMp3(rootFolder, index, apiKeys[0]);
        } catch {
          await extractImageAndMakeMp3(rootFolder, index, apiKeys[1]);
        }
      } catch {
        await extractImageAndMakeMp3(rootFolder, index, apiKeys[2]);
      }
      console.log("Hoàn thành exatract image và download mp3 file đã dịch");
      console.log("Bắt đầu tạo video dịch");
      try {
        try {
          await createVideoFromImagesAndMp3Folder(rootFolder, index, videoID);
        } catch {
          await createVideoFromImagesAndMp3Folder(rootFolder, index, videoID);
        }
      } catch {
        await createVideoFromImagesAndMp3Folder(rootFolder, index, videoID);
      }
      console.log("Kết thúc tạo video dịch");
    } catch (error) {
      console.error(error);
      console.error("Lỗi khi tạo video từ link" + url);
      fs.appendFileSync("Log.txt", "Lỗi khi tạo video từ link: " + url + "\n");
      fs.appendFileSync("LogErrorIndex.txt", index + "\n");
    }
  }
  console.log("Hoàn thành toàn bộ");
}

async function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}


Run();


/*

const fs = require("fs");
  const youtubeVideoDownload = require("./youtubeVideoDownload");
  const longYoutubeVideoDownload = require("./longYoutubeVideoDownload");
const removeAudioFromVideo = require("./removeAudioFromVideo");
const youtubeVideoDownloadWithFormat = require("./youtubeVideoDownloadWithFormat");
const createTimeStamps = require("./createTimeStamps");
const sendVideoToGemini = require("./sendVideoToGemini");
const cutVideoByTimeStampThenSendToGemini = require("./cutVideoByTimeStampThenSendToGemini");
const cutVideoByTimeStampThenConvertToText = require("./cutVideoByTimeStampThenConvertToText");
const cutVideoThenSpeechToTextPhoWhisper = require("./cutVideoThenSpeechToTextPhoWhisper")
const sendVideoAndSubToReSub = require("./sendAudioAndSubToReSub");
const sendVideoToGeminiChatTwo = require("./sendVideoToGeminiChatTwo");
const reSendVideoToGemini = require("./reSendVideoToGemini");
const sendFileToGeminiToTranslateText = require("./sendFileToGeminiToTranslateText");
const extractImageAndMakeMp3 = require("./extractImageAndMakeMp3");
const createVideoFromImagesAndMp3Folder = require("./createVideoFromImagesAndMp3Folder");
const extractImageAndMakeMp3VN = require("./extractImageAndMakeMp3VN");
const createVideoFromImagesAndMp3FolderVN = require("./createVideoFromImagesAndMp3FolderVN");
const { error } = require("console");
const youtubeVideoDownloadAudioOnly = require("./youtubeVideoDownloadAudioOnly");
async function Run() {
  let apiKeys = process.env.API_KEY.split("|");
  fs.writeFileSync("Log.txt", "");

  if (!fs.existsSync("LogErrorIndex.txt"))
    fs.writeFileSync("./LogErrorIndex.txt", "");
  const textData = fs.readFileSync("./LogErrorIndex.txt", "utf-8");
  let rootFolder = `${Date.now()}`;
  let index = 0;
  fs.writeFileSync("LogErrorIndex.txt",'');

  const urls = fs
    .readFileSync("./youtubeLinks.txt", "utf-8")
    .split("\n")
    .filter((line) => line.trim() !== "");

  for (const url of urls) {
    const urlParams = new URLSearchParams(url);
    if (!urlParams) continue;
    let indexInLink = parseInt(urlParams.get("index"));
    let videoID = urlParams.get("https://www.youtube.com/watch?v");
    if (indexInLink) {
      index = indexInLink;
      console.log("Index:", index);  Output: Index: 5
    } else {
      index++;
      console.log("Index not found in the URL");
    }
    if (urlParams.get("list")) rootFolder = urlParams.get("list");
    if (!fs.existsSync(rootFolder)) {
      fs.mkdirSync(rootFolder);
    }
        [
      "./images",
      "./mp3",
      "./mp3Video",
      "./audioFileList",
      "./imageFileList",
      "./videoFileList",
      "./outputVideo",
      "./originSub",
      "./translatedSub",
      "./originVideo",
      "./mp3VN",
      "./noAudioVideo",
      "./audioFileListVN",
      "./outputVideoVN",
      "./videoFileListVN",
      "./VideoVNmese",
      "./VideoTranslated",
      "./timeStamps",
      "./outputVideoSliced",
      "./SubTurnOne",
    ].forEach((dir, index, dirs) => {
      if (!fs.existsSync("./" + rootFolder + "/" + dir)) {
        fs.mkdirSync("./" + rootFolder + "/" + dir);
      }
    });
    if (index < 0) continue;
    index = 1000000 + index;
      //if (fs.existsSync("./" + rootFolder + "/" + "VideoVNmese/"+`${index}_null.mp4`)) continue;
      //if (fs.existsSync("./" + rootFolder + "/" + "VideoVNmese/"+`${index}_.mp4`)) continue;
      //if (fs.existsSync("./" + rootFolder + "/" + "VideoVNmese/"+`${index}_.mp4`)) continue;
      //if (fs.existsSync("./" +rootFolder+`/translatedSub/translate${index}.txt`)) continue;
      //if (fs.existsSync("./" +rootFolder+`/originSub/originSub${index}.txt`)) continue;
    //if (!textData.includes(index.toString())) continue;
    try { 
        
     if (!fs.existsSync("./" + rootFolder + `/originVideo/videoplayback${index}.mp4`)) {
            console.log("Bắt đầu download video");
      try {
        try {
          await youtubeVideoDownload(
            url,
            "./" + rootFolder + `/originVideo/videoplayback${index}.mp4`);
        } catch {
           await youtubeVideoDownload(
            url,
            "./" + rootFolder + `/originVideo/videoplayback${index}.mp4`
          );
        }
      } catch {
         await youtubeVideoDownload(
          url,
          "./" + rootFolder + `/originVideo/videoplayback${index}.mp4`
        );
      }
      console.log("Hoàn thành download video");

                  console.log("Bắt đầu download video chất lượng cao");
      try {
        try {
          await youtubeVideoDownloadWithFormat(
            url,
            "./" + rootFolder + `/originVideo/videoHightQuality${index}.mp4`,'720p');
        } catch {
           await youtubeVideoDownloadWithFormat(
            url,
            "./" + rootFolder + `/originVideo/videoplayback${index}.mp4`
          );
        }
      } catch {
         await youtubeVideoDownloadWithFormat(
          url,
          "./" + rootFolder + `/originVideo/videoplayback${index}.mp4`
        );
      }
      console.log("Hoàn thành download video chất lượng cao");
      }
       console.log("Bắt đầu chuyển video thành văn bản");
       try {
         try {
           await createTimeStamps(rootFolder, index, apiKeys[5]);
         } catch {
           await createTimeStamps(rootFolder, index, apiKeys[4]);
         }
       } catch {
         await createTimeStamps(rootFolder, index, apiKeys[3]);
       }
       try {
         try {
           await cutVideoThenSpeechToTextPhoWhisper(rootFolder, index,apiKeys[0]);
         } catch {
           await cutVideoThenSpeechToTextPhoWhisper(rootFolder, index,apiKeys[1]);
         }
       } catch {
         await cutVideoThenSpeechToTextPhoWhisper(rootFolder, index,apiKeys[2]);
       }
  
       try {
         try {
           try {
             try {
               await sendVideoAndSubToReSub(rootFolder, index, apiKeys[3]);
             } catch (error) {
               console.log(error);
               await sendVideoAndSubToReSub(rootFolder, index, apiKeys[4]);
             }
           } catch (error) {
             console.log(error);
             await sendVideoAndSubToReSub(rootFolder, index, apiKeys[5]);
           }
         } catch (error) {
           console.log(error);
           await sendVideoAndSubToReSub(rootFolder, index, apiKeys[2]);
         }
       } catch (error) {
         console.log(error);
         await sendVideoAndSubToReSub(rootFolder, index, apiKeys[4]);
       }


         console.log("Bắt đầu exatract image và download mp3 file VN");
      try {
        try {
          await extractImageAndMakeMp3VN(rootFolder, index, apiKeys[0]);
        } catch {
          await extractImageAndMakeMp3VN(rootFolder, index, apiKeys[1]);
        }
      } catch {
        await extractImageAndMakeMp3VN(rootFolder, index, apiKeys[2]);
      }

      console.log("Hoàn thành exatract image và download mp3 file VN");
      console.log("Bắt đầu tạo video VN");
      try {
        try {
          await createVideoFromImagesAndMp3FolderVN(rootFolder, index, videoID);
        } catch {
          await createVideoFromImagesAndMp3FolderVN(rootFolder, index, videoID);
        }
      } catch {
        await createVideoFromImagesAndMp3FolderVN(rootFolder, index, videoID);
      }

      console.log("Kết thúc tạo video VN");

     console.log("Bắt đầu chuyển video thành văn bản dịch");
      try {
        try {
          await sendFileToGeminiToTranslateText(rootFolder, index,apiKeys[0]);
        } catch {
          await sendFileToGeminiToTranslateText(rootFolder, index,apiKeys[1]);
        }
      } catch {
        await sendFileToGeminiToTranslateText(rootFolder, index,apiKeys[2]);
      }

      console.log("Hoàn thành chuyển video thành văn bản dịch");
     console.log("Bắt đầu exatract image và download mp3 file đã dịch");
      try {
        try {
          await extractImageAndMakeMp3(rootFolder, index, apiKeys[0]);
        } catch {
          await extractImageAndMakeMp3(rootFolder, index, apiKeys[1]);
        }
      } catch {
        await extractImageAndMakeMp3(rootFolder, index, apiKeys[2]);
      }
      console.log("Hoàn thành exatract image và download mp3 file đã dịch");
      console.log("Bắt đầu tạo video dịch");
      try {
        try {
          await createVideoFromImagesAndMp3Folder(rootFolder, index, videoID);
        } catch {
          await createVideoFromImagesAndMp3Folder(rootFolder, index, videoID);
        }
      } catch {
        await createVideoFromImagesAndMp3Folder(rootFolder, index, videoID);
      }
      console.log("Kết thúc tạo video dịch");

    } catch (error) {
      console.error(error);
      console.error("Lỗi khi tạo video từ link" + url);
      fs.appendFileSync("Log.txt", "Lỗi khi tạo video từ link: " + url + "\n");
      fs.appendFileSync("LogErrorIndex.txt", index + "\n");
    }
  }
  console.log("Hoàn thành toàn bộ");
}

async function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}


Run();
*/