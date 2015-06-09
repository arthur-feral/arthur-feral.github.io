(function($, window){
  "use strict";
  var Log, logger, hiragana, katakana, Game, game, dicos;
  // hiragana = {"a":"あ","i":"い","u":"う","e":"え","o":"お","ka":"か","ki":"き","ku":"く","ke":"け","ko":"こ","sa":"さ","shi":"し","su":"す","se":"せ","so":"そ","ta":"た","chi":"ち","tsu":"つ","te":"て","to":"と","na":"な","ni":"に","nu":"ぬ","ne":"ね","no":"の","ha":"は","hi":"ひ","fu":"ふ","he":"へ","ho":"ほ","ma":"ま","mi":"み","mu":"む","me":"め","mo":"も","ya":"や","yu":"ゆ","yo":"よ","ra":"ら","ri":"り","ru":"る","re":"れ","ro":"ろ","wa":"わ","wo":"を"," n":"ん","ga":"が","gi":"ぎ","gu":"ぐ","ge":"げ","go":"ご","za":"ざ","ji":"じ","zu":"ず","ze":"ぜ","zo":"ぞ","da":"だ"," ji (i)":"ぢ"," zu (u)":"づ","de":"で","do":"ど","ba":"ば","bi":"び","bu":"ぶ","be":"べ","bo":"ぼ","pa":"ぱ","pi":"ぴ","pu":"ぷ","pe":"ぺ","po":"ぽ","kya":"きゃ","kyu":"きゅ","kyo":"きょ","gya":"ぎゃ","gyu":"ぎゅ","gyo":"ぎょ","sha":"しゃ","shu":"しゅ","sho":"しょ","ja":"じゃ","ju":"じゅ","jo":"じょ","cha":"ちゃ","chu":"ちゅ","cho":"ちょ","nya":"にゃ","nyu":"にゅ","nyo":"にょ","hya":"ひゃ","hyu":"ひゅ","hyo":"ひょ","bya":"びゃ","byu":"びゅ","byo":"びょ","pya":"ぴゃ","pyu":"ぴゅ","pyo":"ぴょ","mya":"みゃ","myu":"みゅ","myo":"みょ","rya":"りゃ","ryu":"りゅ","ryo":"りょ"};
  // katakana = {"a":"ア","i":"イ","u":"ウ","e":"エ","o":"オ","ka":"カ","ki":"キ","ku":"ク","ke":"ケ","ko":"コ","sa":"サ","shi":"シ","su":"ス","se":"セ","so":"ソ","ta":"タ","chi":"チ","tsu":"ツ","te":"テ","to":"ト","na":"ナ","ni":"ニ","nu":"ヌ","ne":"ネ","no":"ノ","ha":"ハ","hi":"ヒ","fu":"フ","he":"ヘ","ho":"ホ","ma":"マ","mi":"ミ","mu":"ム","me":"メ","mo":"モ","ya":"ヤ","yu":"ユ","yo":"ヨ","ra":"ラ","ri":"リ","ru":"ル","re":"レ","ro":"ロ","wa":"ワ","wi":"ウィ","we":"ウェ","wo":"ウォ","n":"ン","ga":"ガ","gi":"ギ","gu":"グ","ge":"ゲ","go":"ゴ","za":"ザ","ji":"ヂ","zu":"ヅ","ze":"ゼ","zo":"ゾ","da":"ダ","de":"デ","do":"ド","ba":"バ","bi":"ビ","bu":"ブ","be":"ベ","bo":"ボ","pa":"パ","pi":"ピ","pu":"プ","pe":"ペ","po":"ポ","kya":"キャ","kyu":"キュ","kyo":"キョ","gya":"ギャ","gyu":"ギュ","gyo":"ギョ","sha":"シャ","shu":"シュ","sho":"ショ","ja":"ジャ","ju":"ジュ","jo":"ジョ","cha":"チャ","chu":"チュ","cho":"チョ","nya":"ニャ","nyu":"ニュ","nyo":"ニョ","hya":"ヒャ","hyu":"ヒュ","hyo":"ヒョ","bya":"ビャ","byu":"ビュ","byo":"ビョ","pya":"ピャ","pyu":"ピュ","pyo":"ピョ","mya":"ミャ","myu":"ミュ","myo":"ミョ","rya":"リャ","ryu":"リュ","ryo":"リョ","va":"ヴァ","vi":"ヴィ","vu":"ヴ","ve":"ヴェ","vo":"ヴォ","she":"シェ","je":"ジェ","che":"チェ","tsa":"ツァ","tsi":"ツィ","tse":"ツェ","tso":"ツォ","dyu":"デュ","ti":"ティ","tu":"トゥ","tyu":"テュ","di":"ディ","du":"ドゥ","fa":"ファ","fi":"フィ","fe":"フェ","fo":"フォ","fyu":"フュ"};
  dicos = {
    "hiragana": [["あ","a"],["い","i"],["う","u"],["え","e"],["お","o"],["か","ka"],["き","ki"],["く","ku"],["け","ke"],["こ","ko"],["さ","sa"],["し","shi"],["す","su"],["せ","se"],["そ","so"],["た","ta"],["ち","chi"],["つ","tsu"],["て","te"],["と","to"],["な","na"],["に","ni"],["ぬ","nu"],["ね","ne"],["の","no"],["は","ha"],["ひ","hi"],["ふ","fu"],["へ","he"],["ほ","ho"],["ま","ma"],["み","mi"],["む","mu"],["め","me"],["も","mo"],["や","ya"],["ゆ","yu"],["よ","yo"],["ら","ra"],["り","ri"],["る","ru"],["れ","re"],["ろ","ro"],["わ","wa"],["を","wo"],["ん",""],["が","ga"],["ぎ","gi"],["ぐ","gu"],["げ","ge"],["ご","go"],["ざ","za"],["じ","ji"],["ず","zu"],["ぜ","ze"],["ぞ","zo"],["だ","da"],["ぢ","j (di) "],["づ","z (du) "],["で","de"],["ど","do"],["ば","ba"],["び","bi"],["ぶ","bu"],["べ","be"],["ぼ","bo"],["ぱ","pa"],["ぴ","pi"],["ぷ","pu"],["ぺ","pe"],["ぽ","po"],["きゃ","kya"],["きゅ","kyu"],["きょ","kyo"],["ぎゃ","gya"],["ぎゅ","gyu"],["ぎょ","gyo"],["しゃ","sha"],["しゅ","shu"],["しょ","sho"],["じゃ","ja"],["じゅ","ju"],["じょ","jo"],["ちゃ","cha"],["ちゅ","chu"],["ちょ","cho"],["にゃ","nya"],["にゅ","nyu"],["にょ","nyo"],["ひゃ","hya"],["ひゅ","hyu"],["ひょ","hyo"],["びゃ","bya"],["びゅ","byu"],["びょ","byo"],["ぴゃ","pya"],["ぴゅ","pyu"],["ぴょ","pyo"],["みゃ","mya"],["みゅ","myu"],["みょ","myo"],["りゃ","rya"],["りゅ","ryu"],["りょ","ryo"]],
    "katakana": [["ア","a"],["イ","i"],["ウ","u"],["エ","e"],["オ","o"],["ア","a"],["イ","i"],["ウ","u"],["エ","e"],["オ","o"],["カ","ka"],["キ","ki"],["ク","ku"],["ケ","ke"],["コ","ko"],["サ","sa"],["シ","shi"],["ス","su"],["セ","se"],["ソ","so"],["タ","ta"],["チ","chi"],["ツ","tsu"],["テ","te"],["ト","to"],["ナ","na"],["ニ","ni"],["ヌ","nu"],["ネ","ne"],["ノ","no"],["ハ","ha"],["ヒ","hi"],["フ","fu"],["ヘ","he"],["ホ","ho"],["マ","ma"],["ミ","mi"],["ム","mu"],["メ","me"],["モ","mo"],["ヤ","ya"],["ユ","yu"],["ヨ","yo"],["ラ","ra"],["リ","ri"],["ル","ru"],["レ","re"],["ロ","ro"],["ワ","wa"],["ヰ","wi"],["ヱ","we"],["ヲ","wo"],["ン","n"],["ガ","ga"],["ギ","gi"],["グ","gu"],["ゲ","ge"],["ゴ","go"],["ザ","za"],["ジ","ji"],["ズ","zu"],["ゼ","ze"],["ゾ","zo"],["ダ","da"],["ヂ","ji"],["ヅ","zu"],["デ","de"],["ド","do"],["バ","ba"],["ビ","bi"],["ブ","bu"],["ベ","be"],["ボ","bo"],["パ","pa"],["ピ","pi"],["プ","pu"],["ペ","pe"],["ポ","po"],["キャ","kya"],["キュ","kyu"],["キョ","kyo"],["ギャ","gya"],["ギュ","gyu"],["ギョ","gyo"],["シャ","sha"],["シュ","shu"],["ショ","sho"],["ジャ","ja"],["ジュ","ju"],["ジョ","jo"],["チャ","cha"],["チュ","chu"],["チョ","cho"],["ニャ","nya"],["ニュ","nyu"],["ニョ","nyo"],["ヒャ","hya"],["ヒュ","hyu"],["ヒョ","hyo"],["ビャ","bya"],["ビュ","byu"],["ビョ","byo"],["ピャ","pya"],["ピュ","pyu"],["ピョ","pyo"],["ミャ","mya"],["ミュ","myu"],["ミョ","myo"],["リャ","rya"],["リュ","ryu"],["リョ","ryo"],["ウィ","wi"],["ウェ","we"],["ウォ","wo"],["ヴァ","va"],["ヴィ","vi"],["ヴ","vu"],["ヴェ","ve"],["ヴォ","vo"],["シェ","she"],["ジェ","je"],["チェ","che"],["ツァ","tsa"],["ツィ","tsi"],["ツェ","tse"],["ツォ","tso"],["デュ","dyu"],["ティ","ti"],["トゥ","tu"],["テュ","tyu"],["ディ","di"],["ドゥ","du"],["ファ","fa"],["フィ","fi"],["フェ","fe"],["フォ","fo"],["フュ","fyu"]]
  }

  Log = function(){};
  Log.prototype = {
    initialize: function(){},
    l: function(msg){console.log(msg);},
    d: function(obj){console.debug(obj);},
    e: function(msg){console.error(msg);},
  };
  logger = new Log();

  Game = function(){
    this.setDico("hiragana");
    this.step = 0;
    this.next();
    this.display();
  };
  Game.prototype = {
    setDico: function(name){
      this.current_dico = name;
      this.dico = dicos[name];
      $('#dico').text(name);
    },
    switchDico: function(){
      if(this.current_dico == "hiragana"){
        this.setDico("katakana");
      }else{
        this.setDico("hiragana");
      }
      this.pickNew();
    },
    display: function(){
      $('#jp').text(this.current[0]);
      $('#fr').text('');
      if(this.step == 1){
        $('#fr').text(this.current[1]);
      }
    },
    nextStep: function(){
      if(this.step == 1){
        this.step = 0;
        this.next();
      }else{
        this.step = 1;
      }
      this.display();
    },
    next: function(){
      this.current = this.dico[Math.floor(Math.random()*this.dico.length)];
      this.display();
    },
    pickNew: function(){
      this.step = 0;
      this.next();
    }
  };

  $(document).ready(function(){
    game = new Game();
    $(document).on('keyup', function(ev){
      var key = ev.which;
      switch(key){
        case 32:
        game.nextStep();
        break;
        case 39:
        game.pickNew();
        break;
      }
    });
    $('#dico').click(function(e){
      game.switchDico();
    });
    $(document).focus();
  });

})(jQuery, window);

// var json = [];
// $('.char_table th').each(function(el, a){
//   var kana = $(a).find("b").text();
//   var key = $($(a).contents().get(1)).text();
//   if(key && kana){
//     json.push([kana, key]);
//     // json[key] = kana;
//   }
// });

// $('.char_table td').each(function(el, a){
//   var kana = $(a).find("b").text();
//   var key = $($(a).contents().get(1)).text();
//   if(key && kana){
//     json.push([kana, key]);
//     // json[key] = kana;
//   }
// });
// JSON.stringify(json);

// var json = [];
// $('.wikitable th').each(function(el, a){
//   var base = $($(a).contents().get(0)).text();
//   var key = base.split(" ")[1];
//   var kana = base.split(" ")[0];
//   if(key && kana){
//     json.push([kana, key]);
//   }
// });

// $('.wikitable td').each(function(el, a){
//   var base = $($(a).contents().get(0)).text();
//   var key = base.split(" ")[1];
//   var kana = base.split(" ")[0];
//   if(key && kana){
//     json.push([kana, key]);
//   }
// });
// JSON.stringify(json);
