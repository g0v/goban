angular.module("automap")
.factory("$langs", function(){
  return [  
            ['zh-TW','正體中文','data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADsAAAAkCAMAAAAAe7LPAAAAwFBMVEUAAJUBAZUBAZYCApYEBJYFBZcHB5gLC5oNDZoODpsREZwWFp4XF58bG6AiIqMlJaQmJqUnJ6UtLagwMKk6Oq1AQLBGRrJgYL1kZL9lZb9pacFvb8NwcMNwcMR5ecd/AEuDg8uDg8yEhMyGhsyKis+Li8+MjM+Tk9KWltOZmdWamtWcnNadndalpdmlpdq/v+TExObExOfFxefGxujHx+jMzOrOzurX1+/Y2O/f3/Lg4PL19fv29vv9/f7+AAD///9//XA3AAAAo0lEQVRIx2NgwAfk7fABBurp5WMnTy+bKAuDihADvwA59iop85pJCuvzkayXm49D1EBcTVpVj51HgJU0vVzqxhJ6Nvb2FlLaRmJMJLqZQ1bL1h4IrOREGElzM6eYkoKpPRgoakgKMtNLL9DNMppgN1uS7GZgWJlI6Frb25tL6ZAcVqA4MgTGkRoZcURJ2qAwTVKQF+ibf+3IB6N6R/WO6h2ZegGjW5SOY5ed+wAAAABJRU5ErkJggg=='],
            ['vi','tiếng Việt','data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADYAAAAkCAMAAAD1hTl/AAAAY1BMVEX4AAD4+ADwAADoAAD4qAD48AD4GAD4WAD4CAD4sAD46AD4MAD4KAD4oAD42AD4QAD4yAD4mAD4gAD4eAD4IAD4EAD4uAD4aAD4YAD4wADgAAD4kAD4SAD44AD4OAD40AD4cABjSbOmAAAAy0lEQVQ4y+3VSRKDIBAFUBqVQUaHqJlz/1NGSWlMSkpgm/wVC1/RdKOiE84SgjBKSpaC8I8yI5OYqlMYux5TmIGCJLAzwBDPmAbg8cwA+Kv0s3pkQEOZUDx3KSemX2uu5N5u1D3/GX3ZL7LNv1VFgs7WFGtU9qEtMfqt7rfwTpJuVvwQMwA1szxmbmQ53fbEPYw64ewQwaYZWCEseO7lNptqrMZesGrcsw1mPZR0uTOPYNZZMS/l0YYyUrPVe9fI/1c5iCX/FnF0EH4CzqsHD9pJcrgAAAAASUVORK5CYII='],
            ['en','English','data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAAAkCAMAAAAdBYxUAAABxVBMVEX4AAD4+PgICKgAAKAICKDwYGDwaGhYWLhISLAAAKjoYGDwWFjwAADw8PDoAAAAAJjwCAjw+PhAQLD48PCIiMjwEBDw4ODw8PhQULjY2OgQEKDw0NAQGKjwGBjwICAoKKiAgMjooKBISLjo6PDwyMj4GBD4KCCQkMigoNDomJj4QDj4+PBIWMDwwMDwcHCwsNjw8OjokJAgIKjoWFjw2NiYmNDg4Og4OLAgKLDw6OjwuLgYGKgIEKjoUFD4CAD4cGjweHgACKj4SED4MCj4YFhQULCoqNjwKCjQ0Oj4EAi4qMhYaMj4IBjwODg4SMDoeHhgcMhAUMBYWLD4ICDYsLCIkNDwiIjwMDDYsLjQ0ODwEAi4uNjAqMjwgIAwOLggMLB4gMgwQLjocHDoqKjogICgoMjo8PDIyOBISKhoeMjgoKDoiIj4eHCAiNDwsLDoODgwMKiwqNDoMDDgoKjoSEjo+Pj4WFjwoKD4UEj4WFCoqNBoaMB4eMDwmJj4ODDwgHhwgMDQKCgYKKjoQEDgKCjYkKDYUFDIoLDAqLhgYMDYmKgoMLjQqLjIqMC4sNBoaLDIuMigkMjAwNj4iIComMBwcLj4aGD5nMlPAAADdklEQVRIx92W11saQRTF7zgLsrrIijQVEAsqYkNETRB77zHYe+/dRBM1phk1iSmm/L2ZGVAWVsEHn3Ie+D7YMz9mzp29M/BuNTtZrR75nqbRcJHSLJcuuoUkKt9iabPcwGk079/6fUlJn/wgQPcBImqbLsN8XLhwFkIKYHqJUDyOeBzH8zMDn1+BXpmDEFzUtsPQQQpBVegycLgXqxBKCIASZSAexz1byCwAy7yBTgTMKz9O7WB1qMkXtacyDBUFxGNzZ8dgrtA9R+eA0DVosLlv/FcXWNeeUFSLCodWeC8I46rp81q7qChilIo8LQccgVdTOFgG2RzHTGk3qHtAGE/q/E2ipbec+o1jR16MMQGx5RbunDSCvpehli6DqLtANJr8zIKa3UwaBkrVbbMlcAxEx9Sz5MRZ9i+px2U0LDmIRTPRKCY+RSyIeG8w1FsQnXBP/moDiMXp6KaEkSASzcrFepclYBmxZYTylIAoasYz1wBCAvOpPdtYKwWZ8OTAcJO91UWrkv1axUkrzJGqhYlUwycI+2zmxhabFJT309GgZ0+MY5deHCFYzlJJpdUeLRUptvbZvqIKgQzz+3QL04CJTRU2LksFpShSRvqRgmSg29+MRtkY5IQXKKqSlQGQAsXwQYIyuloDoOcxbEry9j+Skh4HI/zPoEcL262ILmuw/DFsipgbUrKzo2/I0hiOB4Kc0BwfLpOqP6+CPkov9rkMMpB61Z34NHXaZIoY1h/ZRnBafAl9J4vc+gLXb11YGylhb/PmB7H7TDcpayOc9IjhtPnZ1Hyyq3/l98yEN7ZmXJnPmkuOT2x0vS6Mkx6ooQ7JY5xxvER95XVWe+3X6am7Wu22LpuhFGLuaUefOYS6AfE4zcQmg4oSRnNPx/u81CNv/hiX2VJZggrRvn61UnXTbhmITsbWxgKY26p549gprI52HHmPmLd8VqxpGt74EkAREE/zZWs3TFhrDvfyeuqjH5B0wDXz9+rhcM/TQ446CqoMzBXlKEfb/55vTEnOhvuObFIVEyuhYd4CBY4FsgIMJYH9sbkvdNWNS+OLfonAwRI+cVkg1/Wt0wxO+m3NCm8YmH/4tYYEy0qodrSCpe4KkskWJks9k0Tz0IsWHyxhyskQtMOwWxR8fh2JRn6xwyoneWkFIkhMdvbLHVjj/UNR6syP/wD/6IzvqhhpfwAAAABJRU5ErkJggg=='],
            ['zh-CN','简体中文','data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADYAAAAkCAMAAAD1hTl/AAACK1BMVEX//////wD//gD//QD//AD/+wD/+gD/+QD/+AD/9wD/9gD/9QD/9AD/8wD/8gD/8QD/8AD/7wD/7QD/7AD/6wD/6gD/6QD/6AD/5AD/4wD/4QD/3wD/3AD/2QD/1QD/1AD/0gD/0AD/zgD/ywD/ygD/xwD/xgD/xQD/wwD/wgD/wQD/wAD/vwD/vgD/ugD/uQD/uAD/twD/tgD/tQD/swD/sgD/sQD/sAD/rQD/qQD/owD/ogD/oQD/nwD/nQD/nAD/mgD/mAD/lgD/lAD/kwD/kgD/kQD/jwD/jgD/jQD/jAD/iwD/iQD/iAD/hwD/hgD/hQD/gwD/ggD/gQD/gAD/fwD/fgD/fAD/ewD/egD/eQD/eAD/dwD/dQD/cwD/cgD/cQD/bgD/bAD/agD/aQD/ZwD/ZgD/ZAD/YwD/YQD/YAD/XwD/XgD/WwD/WQD/WAD/VgD/VAD/UwD/UgD/UQD/UAD/TwD/TgD/TQD/TAD/SwD/SgD/SQD/SAD/RwD/RgD/RQD/RAD/QwD/QgD/QQD/QAD/PwD/PgD/PAD/OwD/OgD/OQD/OAD/NwD/NQD/NAD/MwD/MgD/MAD/LQD/LAD/JwD/JgD/JQD/IAD/HwD/HgD/HQD/HAD/GwD/GgD/GQD/GAD/FwD/FgD/FQD/FAD/EwD/EgD/EQD/EAD/DwD/DgD/DQD/DAD/CwD/CgD/CQD/CAD/BwD/BgD/BQD/BAD/AwD/AgD/AQD/AAA1hsrbAAAAa0lEQVQ4y2PYQRZgoJo2FkYStPnDhcxI0cZIniPJ0+bPyEiyNkYYING21WBNBghhRuIcaYBmFwtx2khzIkJbHmlhCdFWS2ocYE+Tc8jSRtibWLWF0DHj0FMb41RytGluHgp+G9U2qm1oagMAQjRWO5ytRPoAAAAASUVORK5CYII='],
            ['ja','日本語','data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADYAAAAkCAMAAAD1hTl/AAAAVFBMVEX4+Pj4AADo6Oj48PD46Oj4oKD4CAj4QED4gID4KCj4eHj4uLj44OD4yMjQ0ND4sLD4qKj4kJD4cHD4YGD40ND4SEj4GBj4aGj4EBD4WFj4ICD4mJjjvaWKAAAAsUlEQVQ4y+3VSQ6DMAwF0JgMhAwQZtre/55VVVSpYMnG2/bv38r2t2orQVpVKUGqX2Qm9sHb6Rqb1gVecY03bKaDg0/uhclSDV8ZWEwfFIDnsAFO6WiWzwoaTbIbwsBSLG0YqylmMQUuESygDCLBRpwVGesI5nGWCVZQtRlqAA5jMznuGWMPkkXZcqlVtMrI4QTWmRrRmR5KobH8CsrjsqMLFfQuPNv3Nuv/D2Az2RN+AroOBtRlqb7qAAAAAElFTkSuQmCC'],
            ['de','Deutsch','data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADsAAAAkCAMAAAAAe7LPAAAAQlBMVEUAAAD4AAD4sAD4uADooAAIAAD4EAD4qADQAADoAADgoADgAADoqADYAAC4AADAAADgmADomADQmADIkADoCADgCAA9I9QyAAAAR0lEQVRIx+3LORKAIBAEwJFFUVwED/7/VV5gMpFlTecNiHzNTMNRVk6p2CfWpqv7evvCetBCIp3IxnJkC6So++drjtsjx68Bos8PqhDXPpUAAAAASUVORK5CYII='],
          ]
})
.config(function($translateProvider) {
   

    // Our translations will go in here
    $translateProvider.translations('en', {
      TITLE: 'hacker\'s goban',
      OPEN_BLANK: 'Click here to open a new tab'
    })
    .translations('de', {
      TITLE: 'Hacker Schachbrett',
      OPEN_BLANK: 'Klicken Sie hier, um einen neuen Tab zu öffnen',
      CREATE: 'schaffen'
    })
    .translations('ja', {
      TITLE: 'ハッカーのチェス盤',
      OPEN_BLANK: '新しいタブを開くには、ここをクリックしてください',
      CREATE: '作る'
    })
    .translations('vi', {
      TITLE :'hackers bàn cờ',
      OPEN_BLANK : 'Nhấn vào đây để mở một tab mới',
      CREATE : 'sáng tạo'
    })

    var zhTW = {
      TITLE: '黑客棋盤',
      OPEN_BLANK: '按此可開啟新頁籤',
      CREATE: '創建'
    };

    var zhCN = {
      TITLE: '黑客棋盘',
      OPEN_BLANK: '按此可开启新页签',
      CREATE: '创建'
    }

    $translateProvider.translations('zh', zhTW)
    .translations('zh-hk', zhTW)
    .translations('zh-HK', zhTW)
    .translations('zh-cn', zhCN)
    .translations('zh-CN', zhCN)
    .translations('zh-sg', zhTW)
    .translations('zh-tw', zhTW)
    .translations('zh-TW', zhTW);
    $translateProvider.preferredLanguage('en');
})