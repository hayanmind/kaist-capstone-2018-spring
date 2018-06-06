import googleSpeech from './googleSpeech';

const fs = require('fs');

const path = require('path');
const express = require('express');

const { exec } = require('child_process');

const app = express();

const port = process.env.PORT ? process.env.PORT : 8181;
const dist = path.join(__dirname, 'dist');

app.use(express.static(dist));

app.get('/', (req, res) => {
  res.sendFile(path.join(dist, 'index.html'));
});

app.get('/speech-to-text', (req, res) => {

  // The name of the audio file to transcribe
  const fileName = './test1.wav';

  // Reads a local audio file and converts it to base64
  const file = fs.readFileSync(fileName);
  const audioBytes = file.toString('base64');


  const response = JSON.parse('[{"alternatives":[{"transcript":"mbc 신임사장 mbc에서 했던 최승호 PD가 선임됐습니다 제주도가 들어서면서 파업으로 8급 있던 MBC 정상화 될 것으로 보입니다 김수현 기자입니다","confidence":0.866523027420044,"words":[{"startTime":{"nanos":200000000},"endTime":{"seconds":"1","nanos":500000000},"word":"mbc"},{"startTime":{"seconds":"1","nanos":500000000},"endTime":{"seconds":"1","nanos":900000000},"word":"신임사장"},{"startTime":{"seconds":"1","nanos":900000000},"endTime":{"seconds":"3"},"word":"mbc"},{"startTime":{"seconds":"3"},"endTime":{"seconds":"3","nanos":300000000},"word":"에서"},{"startTime":{"seconds":"3","nanos":300000000},"endTime":{"seconds":"3","nanos":800000000},"word":"했던"},{"startTime":{"seconds":"3","nanos":800000000},"endTime":{"seconds":"4","nanos":600000000},"word":"최승호"},{"startTime":{"seconds":"4","nanos":600000000},"endTime":{"seconds":"5"},"word":"pd"},{"startTime":{"seconds":"5"},"endTime":{"seconds":"5","nanos":100000000},"word":"가"},{"startTime":{"seconds":"5","nanos":100000000},"endTime":{"seconds":"5","nanos":800000000},"word":"선임됐습니다"},{"startTime":{"seconds":"5","nanos":800000000},"endTime":{"seconds":"7","nanos":100000000},"word":"제주도가"},{"startTime":{"seconds":"7","nanos":100000000},"endTime":{"seconds":"7","nanos":700000000},"word":"들어서면서"},{"startTime":{"seconds":"7","nanos":700000000},"endTime":{"seconds":"8","nanos":400000000},"word":"파업으로"},{"startTime":{"seconds":"8","nanos":400000000},"endTime":{"seconds":"8","nanos":900000000},"word":"8급"},{"startTime":{"seconds":"8","nanos":900000000},"endTime":{"seconds":"9","nanos":100000000},"word":"있던"},{"startTime":{"seconds":"9","nanos":100000000},"endTime":{"seconds":"9","nanos":500000000},"word":"mbc"},{"startTime":{"seconds":"9","nanos":500000000},"endTime":{"seconds":"10","nanos":200000000},"word":"정상화"},{"startTime":{"seconds":"10","nanos":200000000},"endTime":{"seconds":"10","nanos":600000000},"word":"될"},{"startTime":{"seconds":"10","nanos":600000000},"endTime":{"seconds":"10","nanos":900000000},"word":"것으로"},{"startTime":{"seconds":"10","nanos":900000000},"endTime":{"seconds":"11","nanos":200000000},"word":"보입니다"},{"startTime":{"seconds":"11","nanos":200000000},"endTime":{"seconds":"12","nanos":200000000},"word":"김수현"},{"startTime":{"seconds":"12","nanos":200000000},"endTime":{"seconds":"12","nanos":800000000},"word":"기자입니다"}]}]},{"alternatives":[{"transcript":" MBC 대주주인 방송문화진흥회는 이참에를 열어 최승호 PD를 신임 사장으로 설렜습니다 이사회의 여권 성기사들 만 참석했습니다 주주총회에서 시장으로 박경대 KT는 해고 5년 만에 mbc 사장 이제 돌아왔습니다 국민들께 실망시켜 드리지 않고 국민들께 희망을 주고 꿈을드림 그런 MBC가 되도록 최선을 다해서 노력하겠습니다 줄기세포 조작사건 4대강 수심 6m의 비밀 검사와 스폰서 같은 프로그램이 그의 손을 거쳤습니다 2012년 파업에 참여했다가 1시 김재철 사장이 PPT를 하고 있습니다 독립언론 뉴스타파 해서 비디오 앵커로 활동했고 보수정권의 언론장악 시도를 고발한 다큐멘터리 영화 공범자들","confidence":0.8994646072387695,"words":[{"startTime":{"seconds":"14","nanos":800000000},"endTime":{"seconds":"16","nanos":400000000},"word":"mbc"},{"startTime":{"seconds":"16","nanos":400000000},"endTime":{"seconds":"17","nanos":100000000},"word":"대주주인"},{"startTime":{"seconds":"17","nanos":100000000},"endTime":{"seconds":"17","nanos":800000000},"word":"방송문화진흥회"},{"startTime":{"seconds":"17","nanos":800000000},"endTime":{"seconds":"18","nanos":300000000},"word":"는"},{"startTime":{"seconds":"18","nanos":300000000},"endTime":{"seconds":"18","nanos":800000000},"word":"이참에"},{"startTime":{"seconds":"18","nanos":800000000},"endTime":{"seconds":"19"},"word":"를"},{"startTime":{"seconds":"19"},"endTime":{"seconds":"19","nanos":100000000},"word":"열어"},{"startTime":{"seconds":"19","nanos":100000000},"endTime":{"seconds":"19","nanos":900000000},"word":"최승호"},{"startTime":{"seconds":"19","nanos":900000000},"endTime":{"seconds":"20","nanos":300000000},"word":"pd"},{"startTime":{"seconds":"20","nanos":300000000},"endTime":{"seconds":"20","nanos":400000000},"word":"를"},{"startTime":{"seconds":"20","nanos":400000000},"endTime":{"seconds":"21"},"word":"신임"},{"startTime":{"seconds":"21"},"endTime":{"seconds":"21","nanos":400000000},"word":"사장으로"},{"startTime":{"seconds":"21","nanos":400000000},"endTime":{"seconds":"22","nanos":100000000},"word":"설렜습니다"},{"startTime":{"seconds":"22","nanos":100000000},"endTime":{"seconds":"23","nanos":700000000},"word":"이사회의"},{"startTime":{"seconds":"23","nanos":700000000},"endTime":{"seconds":"24","nanos":300000000},"word":"여권"},{"startTime":{"seconds":"24","nanos":300000000},"endTime":{"seconds":"25","nanos":100000000},"word":"성기사들"},{"startTime":{"seconds":"25","nanos":100000000},"endTime":{"seconds":"25","nanos":300000000},"word":"만"},{"startTime":{"seconds":"25","nanos":300000000},"endTime":{"seconds":"26"},"word":"참석했습니다"},{"startTime":{"seconds":"26"},"endTime":{"seconds":"27","nanos":800000000},"word":"주주총회에서"},{"startTime":{"seconds":"27","nanos":800000000},"endTime":{"seconds":"28","nanos":500000000},"word":"시장으로"},{"startTime":{"seconds":"28","nanos":500000000},"endTime":{"seconds":"28","nanos":800000000},"word":"박경"},{"startTime":{"seconds":"28","nanos":800000000},"endTime":{"seconds":"28","nanos":900000000},"word":"대"},{"startTime":{"seconds":"28","nanos":900000000},"endTime":{"seconds":"29","nanos":500000000},"word":"kt"},{"startTime":{"seconds":"29","nanos":500000000},"endTime":{"seconds":"29","nanos":800000000},"word":"는"},{"startTime":{"seconds":"29","nanos":800000000},"endTime":{"seconds":"30","nanos":100000000},"word":"해"},{"startTime":{"seconds":"30","nanos":100000000},"endTime":{"seconds":"30","nanos":200000000},"word":"고"},{"startTime":{"seconds":"30","nanos":200000000},"endTime":{"seconds":"30","nanos":600000000},"word":"5년"},{"startTime":{"seconds":"30","nanos":600000000},"endTime":{"seconds":"30","nanos":900000000},"word":"만에"},{"startTime":{"seconds":"30","nanos":900000000},"endTime":{"seconds":"31","nanos":700000000},"word":"mbc"},{"startTime":{"seconds":"31","nanos":700000000},"endTime":{"seconds":"32","nanos":100000000},"word":"사장"},{"startTime":{"seconds":"32","nanos":100000000},"endTime":{"seconds":"32","nanos":300000000},"word":"이제"},{"startTime":{"seconds":"32","nanos":300000000},"endTime":{"seconds":"33"},"word":"돌아왔습니다"},{"startTime":{"seconds":"33"},"endTime":{"seconds":"34","nanos":600000000},"word":"국민들께"},{"startTime":{"seconds":"34","nanos":600000000},"endTime":{"seconds":"35","nanos":200000000},"word":"실망시켜"},{"startTime":{"seconds":"35","nanos":200000000},"endTime":{"seconds":"35","nanos":400000000},"word":"드리지"},{"startTime":{"seconds":"35","nanos":400000000},"endTime":{"seconds":"35","nanos":600000000},"word":"않고"},{"startTime":{"seconds":"35","nanos":600000000},"endTime":{"seconds":"36","nanos":400000000},"word":"국민들께"},{"startTime":{"seconds":"36","nanos":400000000},"endTime":{"seconds":"36","nanos":800000000},"word":"희망을"},{"startTime":{"seconds":"36","nanos":800000000},"endTime":{"seconds":"36","nanos":900000000},"word":"주고"},{"startTime":{"seconds":"36","nanos":900000000},"endTime":{"seconds":"38","nanos":600000000},"word":"꿈을드림"},{"startTime":{"seconds":"38","nanos":600000000},"endTime":{"seconds":"39","nanos":200000000},"word":"그런"},{"startTime":{"seconds":"39","nanos":200000000},"endTime":{"seconds":"39","nanos":500000000},"word":"mbc"},{"startTime":{"seconds":"39","nanos":500000000},"endTime":{"seconds":"39","nanos":600000000},"word":"가"},{"startTime":{"seconds":"39","nanos":600000000},"endTime":{"seconds":"40","nanos":200000000},"word":"되도록"},{"startTime":{"seconds":"40","nanos":200000000},"endTime":{"seconds":"40","nanos":500000000},"word":"최선을"},{"startTime":{"seconds":"40","nanos":500000000},"endTime":{"seconds":"41"},"word":"다해서"},{"startTime":{"seconds":"41"},"endTime":{"seconds":"42","nanos":400000000},"word":"노력하겠습니다"},{"startTime":{"seconds":"42","nanos":400000000},"endTime":{"seconds":"51","nanos":600000000},"word":"줄기세포"},{"startTime":{"seconds":"51","nanos":600000000},"endTime":{"seconds":"52","nanos":200000000},"word":"조작사건"},{"startTime":{"seconds":"52","nanos":200000000},"endTime":{"seconds":"53","nanos":200000000},"word":"4대강"},{"startTime":{"seconds":"53","nanos":200000000},"endTime":{"seconds":"53","nanos":400000000},"word":"수심"},{"startTime":{"seconds":"53","nanos":400000000},"endTime":{"seconds":"53","nanos":900000000},"word":"6m"},{"startTime":{"seconds":"53","nanos":900000000},"endTime":{"seconds":"54","nanos":100000000},"word":"의"},{"startTime":{"seconds":"54","nanos":100000000},"endTime":{"seconds":"54","nanos":500000000},"word":"비밀"},{"startTime":{"seconds":"54","nanos":500000000},"endTime":{"seconds":"55","nanos":400000000},"word":"검사와"},{"startTime":{"seconds":"55","nanos":400000000},"endTime":{"seconds":"55","nanos":500000000},"word":"스폰서"},{"startTime":{"seconds":"55","nanos":500000000},"endTime":{"seconds":"56","nanos":200000000},"word":"같은"},{"startTime":{"seconds":"56","nanos":200000000},"endTime":{"seconds":"56","nanos":700000000},"word":"프로그램이"},{"startTime":{"seconds":"56","nanos":700000000},"endTime":{"seconds":"57","nanos":300000000},"word":"그의"},{"startTime":{"seconds":"57","nanos":300000000},"endTime":{"seconds":"57","nanos":700000000},"word":"손을"},{"startTime":{"seconds":"57","nanos":700000000},"endTime":{"seconds":"58","nanos":300000000},"word":"거쳤습니다"},{"startTime":{"seconds":"58","nanos":300000000},"endTime":{"seconds":"60","nanos":500000000},"word":"2012년"},{"startTime":{"seconds":"60","nanos":500000000},"endTime":{"seconds":"61"},"word":"파업에"},{"startTime":{"seconds":"61"},"endTime":{"seconds":"61","nanos":600000000},"word":"참여했다가"},{"startTime":{"seconds":"62","nanos":300000000},"endTime":{"seconds":"62","nanos":300000000},"word":"한시"},{"startTime":{"seconds":"62","nanos":300000000},"endTime":{"seconds":"63"},"word":"김재철"},{"startTime":{"seconds":"63"},"endTime":{"seconds":"63","nanos":100000000},"word":"사장"},{"startTime":{"seconds":"63","nanos":100000000},"endTime":{"seconds":"63","nanos":300000000},"word":"이"},{"startTime":{"seconds":"63","nanos":300000000},"endTime":{"seconds":"63","nanos":900000000},"word":"ppt"},{"startTime":{"seconds":"63","nanos":900000000},"endTime":{"seconds":"64","nanos":200000000},"word":"를"},{"startTime":{"seconds":"64","nanos":200000000},"endTime":{"seconds":"64","nanos":600000000},"word":"하고"},{"startTime":{"seconds":"64","nanos":600000000},"endTime":{"seconds":"64","nanos":800000000},"word":"있습니다"},{"startTime":{"seconds":"64","nanos":800000000},"endTime":{"seconds":"66","nanos":900000000},"word":"독립언론"},{"startTime":{"seconds":"66","nanos":900000000},"endTime":{"seconds":"67","nanos":700000000},"word":"뉴스타파"},{"startTime":{"seconds":"67","nanos":700000000},"endTime":{"seconds":"67","nanos":900000000},"word":"해서"},{"startTime":{"seconds":"67","nanos":900000000},"endTime":{"seconds":"68","nanos":500000000},"word":"비디오"},{"startTime":{"seconds":"68","nanos":500000000},"endTime":{"seconds":"69","nanos":100000000},"word":"앵커로"},{"startTime":{"seconds":"69","nanos":100000000},"endTime":{"seconds":"69","nanos":600000000},"word":"활동했고"},{"startTime":{"seconds":"69","nanos":600000000},"endTime":{"seconds":"70","nanos":900000000},"word":"보수정권의"},{"startTime":{"seconds":"70","nanos":900000000},"endTime":{"seconds":"71","nanos":600000000},"word":"언론장악"},{"startTime":{"seconds":"71","nanos":600000000},"endTime":{"seconds":"72"},"word":"시도를"},{"startTime":{"seconds":"72"},"endTime":{"seconds":"72","nanos":400000000},"word":"고발한"},{"startTime":{"seconds":"72","nanos":400000000},"endTime":{"seconds":"73","nanos":400000000},"word":"다큐멘터리"},{"startTime":{"seconds":"73","nanos":400000000},"endTime":{"seconds":"73","nanos":700000000},"word":"영화"},{"startTime":{"seconds":"73","nanos":700000000},"endTime":{"seconds":"74","nanos":400000000},"word":"공범자들"}]}]},{"alternatives":[{"transcript":" 제작한 기도했습니다 폐차장은 보도의 공정성 확립을 위해 국장책임제 복원과 주요 인사 1명도 기대를 약속했습니다 최 사장과 함께 했던 기자 PD 등 다섯 명도 복직 절차를 밟아 예정입니다 SBS 김주영입니다","confidence":0.8172143697738647,"words":[{"startTime":{"seconds":"74","nanos":700000000},"endTime":{"seconds":"75","nanos":300000000},"word":"제작한"},{"startTime":{"seconds":"75","nanos":300000000},"endTime":{"seconds":"75","nanos":800000000},"word":"기도했습니다"},{"startTime":{"seconds":"75","nanos":800000000},"endTime":{"seconds":"77","nanos":400000000},"word":"폐차장은"},{"startTime":{"seconds":"77","nanos":400000000},"endTime":{"seconds":"77","nanos":800000000},"word":"보도의"},{"startTime":{"seconds":"77","nanos":800000000},"endTime":{"seconds":"78","nanos":500000000},"word":"공정성"},{"startTime":{"seconds":"78","nanos":500000000},"endTime":{"seconds":"79"},"word":"확립을"},{"startTime":{"seconds":"79"},"endTime":{"seconds":"79","nanos":300000000},"word":"위해"},{"startTime":{"seconds":"79","nanos":300000000},"endTime":{"seconds":"80"},"word":"국장책임제"},{"startTime":{"seconds":"80"},"endTime":{"seconds":"81"},"word":"복원과"},{"startTime":{"seconds":"81"},"endTime":{"seconds":"81","nanos":700000000},"word":"주요"},{"startTime":{"seconds":"81","nanos":700000000},"endTime":{"seconds":"82"},"word":"인사"},{"startTime":{"seconds":"82"},"endTime":{"seconds":"82","nanos":800000000},"word":"1명도"},{"startTime":{"seconds":"82","nanos":800000000},"endTime":{"seconds":"83","nanos":200000000},"word":"기대를"},{"startTime":{"seconds":"83","nanos":200000000},"endTime":{"seconds":"83","nanos":900000000},"word":"약속했습니다"},{"startTime":{"seconds":"83","nanos":900000000},"endTime":{"seconds":"85","nanos":100000000},"word":"최"},{"startTime":{"seconds":"85","nanos":100000000},"endTime":{"seconds":"85","nanos":500000000},"word":"사장과"},{"startTime":{"seconds":"85","nanos":500000000},"endTime":{"seconds":"85","nanos":700000000},"word":"함께"},{"startTime":{"seconds":"85","nanos":700000000},"endTime":{"seconds":"86","nanos":500000000},"word":"했던"},{"startTime":{"seconds":"86","nanos":500000000},"endTime":{"seconds":"87","nanos":100000000},"word":"기자"},{"startTime":{"seconds":"87","nanos":100000000},"endTime":{"seconds":"87","nanos":500000000},"word":"pd"},{"startTime":{"seconds":"87","nanos":500000000},"endTime":{"seconds":"87","nanos":700000000},"word":"등"},{"startTime":{"seconds":"87","nanos":700000000},"endTime":{"seconds":"88","nanos":200000000},"word":"다섯"},{"startTime":{"seconds":"88","nanos":200000000},"endTime":{"seconds":"88","nanos":400000000},"word":"명도"},{"startTime":{"seconds":"88","nanos":400000000},"endTime":{"seconds":"89","nanos":200000000},"word":"복직"},{"startTime":{"seconds":"89","nanos":200000000},"endTime":{"seconds":"89","nanos":700000000},"word":"절차를"},{"startTime":{"seconds":"89","nanos":700000000},"endTime":{"seconds":"90","nanos":100000000},"word":"밟아"},{"startTime":{"seconds":"90","nanos":100000000},"endTime":{"seconds":"90","nanos":800000000},"word":"예정입니다"},{"startTime":{"seconds":"90","nanos":800000000},"endTime":{"seconds":"92","nanos":200000000},"word":"sbs"},{"startTime":{"seconds":"92","nanos":200000000},"endTime":{"seconds":"93"},"word":"김주영"},{"startTime":{"seconds":"93"},"endTime":{"seconds":"93","nanos":100000000},"word":"입니다"}]}]}]');
  
  const tcount = response.length; // The number of transcripts
  var result = []; //list of transcripts
  for(var i=0; i<tcount; i++) {
    const res = response[i].alternatives[0];
    const wcount = res.words.length; //The number of words in a transcript
    let transcript = {transcript: res.transcript, words:[]};
    for(var j=0; j<wcount; j++) {
      let words = res.words[j];
      let word = words.word;
      let attr = 'default';
      let word_object = {word:word, attribute:attr};
      Object.assign(word_object, get_time(words));
      if (word_object.lps > 8){
        word_object.attribute = 'fast';
      }

      word_object.word = add_symbol(word);

      transcript.words.push(word_object);
    }
    result.push(transcript);
  }

  res.status(200).send(result);
/*
  googleSpeech(audioBytes)
    .then((response) => {
      exec(`python example.py`, (err, stdout, stderr) => {
        if (err) {
          // node couldn't execute the command
          return;
        }

        const message = JSON.parse(stdout);

        // 처리
        var avg_freq = message.avg_freq;
        var std_freq = message.std_freq;

        res.status(200).json({ data: result });
      });
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });*/
});

app.listen(port, (error) => {
  if (error) {
    console.log(error); // eslint-disable-line no-console
  }
  console.info('Express is listening on port %s.', port); // eslint-disable-line no-console
});

// calculate startTime and endTime and LPS from word
function get_time(words) {
  var get_seconds = (time) => {
    return time.hasOwnProperty("seconds") ? Number(time.seconds) : 0;
  };
  var get_nanos = (time) => {
    return time.hasOwnProperty("nanos") ? Number(time.nanos)/1000000000 : 0;
  };
  const start = get_seconds(words.startTime) + get_nanos(words.startTime);
  const end = get_seconds(words.endTime) + get_nanos(words.endTime);
  const lps=(words.word.length)/(end-start) // the number of letters per second
  return {startTime: start, endTime: end, lps: lps};
}

function add_symbol(word) {
  if (word != '가' && word!='이' && word!='은' && word!='는' && word != '을' && word != '를' && word != '에게' && word != '에' && word != '입니다' && word != '만'){
    return ' ' + word;
  }
  const last = word.slice(-2);
  if (last == '니다' || last == '어요' || last == '') {
    return word + '.';
  }
  if (last == '니까') {  return word + '?'; }
}