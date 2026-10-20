"use strict";
/* ---------- 4. Siang di Verona ---------- */
Amedi.stories.register("id","verona", {
  em:"⚔️", title:"Siang di Verona", who:"Tybalt", diff:"tanpa bimbingan",
  desc:"Kamu adalah Romeo, satu jam sudah menikah diam-diam. Tybalt menyeberangi alun-alun untuk mengejar darahmu, dan Mercutio sudah memegang gagang pedangnya. Tak ada skala: kamu baca keadaan dari raut wajah dan kata-kata.",
  storageKey:"verona_endings",
  hidden:true,
  endOrder:["peace","truce","mercutio","banish"],
  cast:[
    { key:"t", name:"Tybalt", faces:[[80,"🤬"],[58,"😡"],[42,"😠"],[26,"😐"],[0,"🙂"]] },
    { key:"m", name:"Mercutio", faces:[[78,"🤬"],[54,"😤"],[40,"😏"],[25,"🙂"],[0,"😌"]] },
  ],
  start:{ w:{t:60,m:35}, contact:5 },
  intro:`Verona, siang bolong. Panasnya sampai anjing pun tak menggonggong. Satu jam lalu, di biara Friar Lawrence, kamu diam-diam menikah dengan Juliet Capulet — tak ada yang tahu, bahkan Mercutio pun tidak. Tybalt, sepupunya, sudah mencarimu ke seluruh kota sejak kemarin: kamu datang tanpa diundang ke pesta Capulet, dan bagi dia itu hinaan yang hanya bisa dibersihkan dengan darah. Sekarang Tybalt adalah keluargamu. Dia belum tahu itu. Di sampingmu ada Mercutio — sahabat terbaikmu, keponakan sang pangeran, orang yang belum pernah kalah dalam duel kata-kata dan tak berniat memulainya sekarang. Benvolio sudah tiga kali bilang lebih baik pergi ke tempat teduh. Tak ada yang pergi. Sang Pangeran telah mengumumkan: siapa pun yang memulai perkelahian di jalan akan mati. Tybalt berjalan ke arahmu melewati alun-alun.`,
  backstory:`<p><b>Kalau kamu lupa ceritanya.</b> Dua keluarga di Verona — Montague (keluargamu) dan Capulet — bermusuhan sejak lama sekali, sampai penyebabnya pun tak ada yang ingat. Kamu, Romeo Montague, menyusup pakai topeng ke pesta Capulet dan jatuh cinta pada Juliet. Sepupunya, Tybalt, mengenalimu di pesta itu dan nyaris tak tertahan.</p><p>Pagi ini Friar Lawrence diam-diam menikahkanmu dengan Juliet — dia berharap pernikahan ini akan mendamaikan kedua keluarga. Karena itu kamu wajib merahasiakannya, dan kamu sudah tak bisa lagi berkelahi dengan Tybalt: dia sekarang keluargamu.</p><p>Dalam versi Shakespeare, adegan ini berakhir seburuk mungkin. Karena itulah kamu di sini.</p>`,
  nodes:{
    n1:{
      target:"t",
      npc:()=>`Romeo, rasa sayang yang kupunya padamu tak mengizinkanku bilang apa pun yang lebih baik dari ini: kau seorang bajingan.`,
      options:[
        { icon:"🎭", tag:"Pseudo-empati", cls:"bad", d:{t:+16,m:+6}, dc:0,
          text:`Tybalt, aku mengerti kau marah. Tapi jangan bikin tontonan di tengah alun-alun begini — separuh Verona menonton kita.`,
          beat:{ t:`tersenyum tipis di sudut bibir. Justru tontonan itulah yang ia inginkan.`, m:`saling pandang dengan Benvolio dan membetulkan sarung pedangnya.` },
          react:()=>`Tontonan? Oh tidak. Tontonan itu kemarin — waktu kau menyelinap pakai topeng ke rumah kami. Ini sudah epilognya.`,
          coach:`"Aku mengerti, tapi" bukan empati — itu penolakan sopan. Dan "jangan bikin tontonan" mempermalukan dia di depan orang — tepat di titik yang justru sedang ia pertahankan.` },
        { icon:"🕊", tag:"Kehangatan tanpa penjelasan", cls:"bad", d:{t:-6,m:+22}, dc:+3,
          text:`Tybalt, aku punya alasan untuk menyayangimu — dan alasan itu memaafkan semua amarahmu. Aku tak pernah menyakitimu, dan aku menyayangimu lebih dari yang bisa kaubayangkan.`,
          beat:{ t:`berhenti dengan bingung. Skenario ini tak pernah ia siapkan.`, m:`tak berkata apa-apa. Wajahnya membeku — dan itu pertanda paling buruk dari semuanya.` },
          react:()=>`Menyayangi?.. Itu tak menghapus hinaannya, Nak. Itu cuma aneh.`,
          coach:`Kehangatan — tapi tak dimengerti. Bagi Tybalt ini teka-teki, bagi Mercutio ini penghinaan: sahabatnya bicara soal cinta kepada musuh tanpa menjelaskan sebabnya. Empati tanpa keterbukaan meninggalkan orang di sampingmu terpaksa membayangkan sendiri penjelasannya. Dan ia akan membayangkan yang paling buruk.` },
        { icon:"🚧", tag:"Batasan dengan hormat", cls:"good", d:{t:-16,m:+6}, dc:+12,
          text:`Kau datang mencari jawaban soal pesta itu. Kau akan mendapatkannya — dariku, dengan kata-kata, di sini dan sekarang. Aku ke sana bukan untuk melawanmu, Tybalt. Katakan langsung: apa yang kau mau dariku, selain darah?`,
          beat:{ t:`berhenti tiga langkah lagi. Tangannya masih di gagang pedang, tapi belum tercabut.`, m:`terkekeh: "Oh, sekarang ada perundingan".` },
          react:s=> s.w.t>=60 ? `Yang kumau? Supaya kau menghunus pedang. Sisanya cuma omongan.` : `...Aku mau kau mengakui di depan saksi, kau masuk rumahku tanpa diundang. Itu untuk permulaan.`,
          coach:`Kamu menyebut tujuan sebenarnya (jawaban atas hinaan), tidak menyetujui bentuknya (baja), dan mengajukan pertanyaan langsung. Inilah batasan dengan hormat — tak mempermalukannya di depan orang lain.` },
        { icon:"🔥", tag:"Cerminan hinaan", cls:"bad", d:{t:+24,m:+10}, dc:0, aggro:1,
          text:`Bajingan? Kata itu lebih cocok untukmu, Tybalt. Coba pakai — ukurannya pas.`,
          beat:{ t:`pedang tercabut sejengkal dan kembali ke sarung. Sekali.`, m:`tertawa keras. Yang paling buruk — dia justru senang.` },
          react:()=>`Nah begitu. Akhirnya suara Montague, bukan gumaman. Hunus pedangmu.`,
          coach:`Hinaan yang dicerminkan. Sekarang ini bukan lagi soal pesta itu — ini soal siapa yang mendesak siapa di depan saksi. Dan saksinya tak akan hilang begitu saja.` },
      ],
      next:"n2"
    },
    n2:{
      target:"m",
      enter:{ dwKey:"t", dw:+5, note:"Panas dan puluhan saksi. Tybalt merasa alun-alun sedang menonton — dan dia tak akan mundur lagi" },
      npc:s=> s.w.m>=55
        ? `(menghunus pedang) Oh, kepatuhan yang tenang, tak berkehormatan, dan hina! Tybalt, pemburu tikus — bagaimana kalau kau jalan-jalan denganku? Sepertinya temanku lupa cara memegang baja.`
        : `(pelan, ke kamu) Romeo. Setidaknya bilang apa yang terjadi. Karena dari sini kelihatannya buruk sekali — dan aku bukan bicara soal Tybalt sekarang.`,
      options:[
        { icon:"🛑", tag:"Menyingkirkan", cls:"bad", d:{m:+26,t:+4}, dc:0,
          text:`Mercutio, sarungkan pedangmu. Ini bukan urusanmu.`,
          beat:{ m:`bertanya sangat pelan: "Bukan urusanku?" Ini nada suaranya yang paling buruk.`, t:`mundur setengah langkah dan mulai menunggu. Dia bahkan tak perlu berbuat apa-apa lagi.` },
          react:()=>`Bukan urusanku. Tentu saja. Aku cuma berdiri di sini, menonton sahabatku dipanggil bajingan, lalu pulang makan malam.`,
          coach:`"Bukan urusanmu" menyingkirkan sahabat dari situasi yang justru dia masuki karena kamu. Sekarang dia akan membuktikan bahwa ini memang urusannya — dan membuktikannya dengan baja.` },
        { icon:"🎭", tag:"Pseudo-empati", cls:"bad", d:{m:+14,t:+3}, dc:0,
          text:`Kawan, aku mengerti. Cuma sekarang bukan waktunya, percayalah.`,
          beat:{ m:`mengangguk. Pedangnya tak disarungkan.`, t:`tersenyum lebih lebar.` },
          react:()=>`Bukan waktunya. Kapan waktunya, Romeo? Kau akan kirim aku pesan?`,
          coach:`"Mengerti, tapi bukan waktunya" berarti "perasaanmu bisa tunggu". Orang menjawab hal itu dengan lebih keras, bukan lebih pelan.` },
        { icon:"💙", tag:"Menyebut kebutuhan", cls:"good", d:{m:-24,t:+2}, dc:+18,
          text:`Mercutio. Kau memegang pedang itu sekarang bukan melawan Tybalt — tapi demi aku. Karena kau merasa aku takut, dan bayangan itu jatuh padamu juga. Tidak. Dan aku takkan biarkan siapa pun membuatmu jadi bahan tertawaan — bukan dia, bukan juga diriku sendiri.`,
          beat:{ m:`perlahan menurunkan ujung pedang ke jalanan berbatu. Belum disarungkan. Tapi diturunkan.`, t:`berpindah kaki dengan tak sabar.` },
          react:s=> s.w.m>=55 ? `...Baiklah. Tapi nanti kau jelaskan semuanya padaku. Semuanya, Romeo.` : `...Akhirnya ada yang bicara seperti manusia di sini. Baik. Aku dengarkan.`,
          coach:`Kamu menyebutkan hal yang sebenarnya ia takutkan — terlihat konyol karena kelemahan orang lain. Kebutuhan yang disebutkan berhenti mengendalikan orang itu.` },
        { icon:"💍", tag:"Membuka rahasia", cls:"good", d:{m:-34,t:-10}, dc:+22, set:{secretOut:true},
          text:`Dengar kalian berdua. Satu jam lalu aku menikah. Dengan Juliet Capulet, di biara Friar Lawrence. Tybalt, kau sekarang keluargaku — itulah sebabnya aku takkan mengangkat tangan padamu. Itulah seluruh "kepatuhan"-ku.`,
          beat:{ m:`untuk pertama kali seumur hidup tak menemukan kata-kata.`, t:`mundur setengah langkah. Tangannya tergelincir sendiri dari gagang pedang.` },
          react:()=>`...Apa yang kaulakukan? Kau... dengan Juliet?.. Romeo, kalau ini salah satu leluconmu, akan kubunuh kau sendiri.`,
          coach:`Langkah paling berisiko: kamu mengungkapkan rahasia yang bukan hanya milikmu. Tapi justru rahasia itulah yang membuat perilakumu tak terbaca — dan hal tak terbaca dibayangkan orang dengan skenario terburuk.` },
      ],
      next:"n3"
    },
    n3:{
      target:"t",
      npc:s=> s.w.m>=55
        ? `(kepada Mercutio) Kalau begitu, kemarilah, si jenaka. Denganmu malah lebih mudah — pangeran akan menghukumku karenamu, tapi setidaknya lidahmu akhirnya diam.`
        : `Kata-kata yang bagus, Montague. Tapi aku ke sini bukan mencari kata-kata. Kau akan hunus pedangmu — atau biar kuceritakan ke seluruh Verona bagaimana kau berdiri di sini hari ini?`,
      options:[
        { icon:"🤺", tag:"Berdiri di antara mereka", cls:"bad", d:{t:+8,m:+10}, dc:0,
          forceEnd:s=> s.w.m>=55 ? "mercutio" : null,
          text:`(melompat di antara mereka, merentangkan tangan) Cukup! Kalian berdua — mundur! Pangeran melarang perkelahian di jalan-jalan Verona!`,
          beat:{ t:`tak mundur sejengkal pun. Dia seorang pendekar pedang — dan dia melihat celah.`, m:`bergerak ke samping untuk melihat lawannya — tapi yang terlihat cuma punggungmu.` },
          react:()=>`Minggir, Nak!`,
          coach:`Kamu berdiri dengan tubuhmu di antara dua pedang — dan menutupi pandangan sahabatmu justru saat dia butuh setiap sentimeter ruang pandang. Dalam versi Shakespeare, Mercutio mati persis dengan cara ini: tusukan menembus di bawah lenganmu. Campur tangan tanpa bertanya juga adalah bentuk kekerasan.` },
        { icon:"🚧", tag:"\"Tidak\" yang tegas", cls:"good", d:{t:-18,m:-6}, dc:+15,
          text:s=> s.f.secretOut
            ? `Tidak. Aku takkan berkelahi denganmu — bukan hari ini, bukan pernah. Kau sudah dengar sebabnya: kau kini keluargaku, suka atau tidak. Kalau kau mau darahku — kau harus menebas kerabat tak bersenjata di depan dua puluh saksi. Pangeran menggantung orang karena hal yang lebih ringan dari itu.`
            : `Tidak. Aku takkan berkelahi denganmu — bukan hari ini, bukan pernah. Bukan karena aku takut, tapi karena aku punya alasan, dan kau akan mengetahuinya. Kalau kau mau darahku — kau harus menebas orang tak bersenjata di depan dua puluh saksi. Pangeran menggantung orang karena hal yang lebih ringan dari itu.`,
          beat:{ t:`menoleh ke alun-alun. Untuk pertama kalinya sejak percakapan ini — ke orang-orang, bukan ke kamu.`, m:`pelan: "Nah, ini baru masuk akal".` },
          react:s=> s.w.t>=60 ? `...Dua puluh saksi. Enak sekali posisimu, Montague.` : `...Darah di depan saksi bukan yang kubutuhkan. Aku butuh jawaban.`,
          coach:`"Tidak" yang tegas tanpa hinaan, plus konsekuensi nyata bagi dirinya sendiri. Ini batasan, bukan kepatuhan: kamu tidak memohon dan tidak membela diri — kamu memberi tahu.` },
        { icon:"🙇", tag:"Memohon", cls:"bad", d:{t:+16,m:+12}, dc:0,
          text:`Tybalt, aku mohon padamu. Kumohon. Demi segala yang suci — jangan hari ini.`,
          beat:{ t:`berdiri tegak. Dia baru saja mendapat apa yang dia cari — dan itu bahkan tak perlu satu pukulan pun.`, m:`berpaling. Dia malu terhadapmu, dan itu terlihat jelas.` },
          react:()=>`Oh, sekarang dia memohon. Dengar itu, warga Verona? Montague berdiri di alun-alun dan memohon.`,
          coach:`Memohon bukan batasan. Bagi orang yang mengukur dunia dengan kekuatan, itu terdengar sebagai konfirmasi: kau lemah, dan bisa terus ditekan.` },
        { icon:"🔥", tag:"Menerima tantangan", cls:"bad", d:{t:+22,m:+8}, dc:0, aggro:1,
          text:`Kau mau darah — hunus pedangmu. Tapi jangan mengeluh ke pangeran nanti kalau kau bilang tak diperingatkan.`,
          beat:{ t:`akhirnya menghela napas. Sekarang semuanya sederhana.`, m:`"Nah, ini baru Romeo-ku!" — dan itulah kalimat paling buruk yang bisa dia ucapkan sekarang.` },
          react:()=>`Akhirnya. Bersiaplah.`,
          coach:`Kamu memberinya persis apa yang ia cari. Selanjutnya semua diputuskan oleh baja — dan baja tak tahu cara berunding.` },
      ],
      next:"n4"
    },
    n4:{
      target:"t",
      npc:()=>`(setelah jeda, lebih pelan) Lalu apa selanjutnya, Montague? Aku harus berbalik dan pergi begitu saja? Dengan apa? Aku datang ke sini di depan saksi.`,
      options:[
        { icon:"✅", tag:"Permintaan dengan pintu keluar", cls:"good", d:{t:-12,m:-5}, dc:+22, endsRun:true,
          text:s=> s.f.secretOut
            ? `Besok tengah hari, di biara Friar Lawrence. Tanpa senjata, tanpa saksi, tanpa orang-orangmu maupun orang-orangku. Dia akan menegaskan setiap kataku — dan setelah itu kau sendiri yang memutuskan aku ini musuh atau keluarga. Kata seorang Montague. Kau mau datang?`
            : `Besok tengah hari, di biara Friar Lawrence. Tanpa senjata, tanpa saksi, tanpa orang-orangmu maupun orang-orangku. Akan kukatakan hal yang tak bisa kukatakan di sini — dan kau sendiri yang memutuskan apa kau masih butuh darahku setelah itu. Kata seorang Montague. Kau mau datang?`,
          beat:{ t:`lama menatapmu. Lalu mengangguk singkat — sekali.`, m:`akhirnya menyarungkan pedangnya.` },
          react:s=> s.contact>=60 ? `...Tengah hari. Di Lawrence. Kalau kau tak datang, Romeo, akan kucari kau sampai ke Mantua sekalipun.` : `Aku datang. Tapi aku tak janji apa-apa.`,
          coach:`Waktu, tempat, syarat — dan yang terpenting, jalan keluar dengan bermartabat: dia pergi bukan sebagai orang yang kalah, tapi sebagai orang yang sudah sepakat. Permintaan yang memberi pintu keluar jauh lebih sering diterima.` },
        { icon:"🤝", tag:"Memberi penghormatan", cls:"good", d:{t:-14,m:-4}, dc:+20, endsRun:true,
          text:`Dengan kenyataan bahwa kau satu-satunya di alun-alun ini yang tak menghunus pedang melawan orang tak bersenjata. Separuh Verona menyaksikannya, dan besok itulah yang akan diperbincangkan. Kalau itu belum cukup — sebutkan tempat dan waktu, dan aku akan datang. Tanpa Mercutio, tanpa orang-orangmu. Untuk bicara.`,
          beat:{ t:`mengangkat bahu, seolah melepas beban. Dia mencari cara untuk pergi — dan kamu memberinya jalan.`, m:`"Lihat itu, dia jadi diplomat".` },
          react:s=> s.contact>=60 ? `...Besok. Aku akan mencarimu sendiri. Dan, Romeo... hari ini kau mengejutkanku.` : `Kita lihat saja, Montague. Kita lihat saja.`,
          coach:`Kamu tidak mengalahkannya — kamu memberinya jalan keluar dengan kehormatan. Bagi orang yang hidup dari reputasi, itulah mata uang yang dia cari.` },
        { icon:"🌫", tag:"Berpisah begitu saja", cls:"meh", d:{t:0,m:0}, dc:+3, fake:1, endsRun:true,
          text:`Tak ada apa-apa. Kita bubar saja, sebelum ada yang bertindak bodoh. Lupakan semua ini, ya?`,
          beat:{ t:`mengangkat bahu dan berjalan pergi. Terlalu tenang untuk orang yang datang mencari darah.`, m:`memandanginya pergi dan diam saja.` },
          react:()=>`Melupakan. Tentu saja. Warga Verona terkenal dengan ingatan mereka soal hal-hal seperti ini.`,
          coach:`"Lupakan saja" bukan kesepakatan, hanya jeda. Hinaan itu tak hilang, cuma dipindahkan ke hari lain saat tak ada dua puluh saksi.` },
        { icon:"🛡", tag:"Sikap acuh", cls:"bad", d:{t:+10,m:+6}, dc:0, endsRun:true,
          text:`Pikir apa maumu, Tybalt. Aku tak wajib memutuskan apa yang kau bawa pulang.`,
          beat:{ t:`mengangguk pada dirinya sendiri, seolah sudah memutuskan sesuatu.`, m:`"Romeo. Itu tak perlu diucapkan".` },
          react:()=>`Tak wajib. Baiklah. Kalau begitu aku sendiri yang memutuskan — dan kau akan tahu kapan tepatnya.`,
          coach:`Secara formal kamu benar. Tapi kamu baru saja meninggalkan orang yang murka satu-satunya jalan yang tersedia — dan dia akan mengambilnya. Besok, lusa, saat kau tak lagi di dekat saksi-saksi.` },
      ],
      next:null
    }
  },
  checkFail:s=>{
    if(s.w.m>=85) return "mercutio";
    if(s.w.t>=85 || s.aggro>=2) return "banish";
    return null;
  },
  resolve:(s,opt)=> (opt.cls==="good" && s.w.t<45 && s.w.m<45 && s.fake<2) ? "peace" : "truce",
  endings:{
    mercutio:{ emoji:"💀", title:"\"Wabah bagi kedua rumah kalian!\"", cls:"bad",
      text:`Pedang Tybalt menembus di bawah lenganmu — lengan yang sama yang tadi kau pakai memisahkan mereka. Mercutio menatap lukanya nyaris heran: "Cuma goresan. Tapi cukup buatku." Lalu, sambil duduk di jalan berbatu: "Tanyakan aku besok — kau akan menemukanku orang yang serius." Dan kata terakhirnya, tepat ke wajahmu: "Wabah bagi kedua rumah kalian!"<br><br>Selanjutnya sudah diketahui semua orang. Kau akan membunuh Tybalt. Sang Pangeran akan mengusirmu dari Verona. Juliet akan meminum ramuan Friar Lawrence, suratmu takkan sampai, dan dalam empat hari di makam Capulet tak akan ada yang tersisa hidup.<br><br>Semua ini berawal di sini. Dari satu percakapan siang itu.` },
    banish:{ emoji:"⚔️", title:"Pengasingan", cls:"bad",
      text:`Baja, teriakan, darah di batu yang membara. Tybalt terbaring, dan kau bahkan tak ingat tusukan itu sendiri. "Oh, aku badut takdir," akan kau ucapkan nanti, dan itu akan lebih tepat dari yang kau inginkan.<br><br>Sang Pangeran tak menggantungmu hanya karena Tybalt menyerang lebih dulu: pengasingan, sebelum matahari terbenam, selamanya. Juliet akan tahu suaminya membunuh saudaranya, di hari yang sama seharusnya dia menjadi istri. Selanjutnya — ramuan, makam, dan empat hari.<br><br>Dan semua berawal dari kalimat yang setelahnya tak ada lagi yang bisa dikatakan.` },
    truce:{ emoji:"🌫", title:"Ditunda", cls:"meh",
      text:`Tybalt pergi. Mercutio menyarungkan pedangnya dan diam sepanjang jalan — dan Mercutio yang diam lebih menakutkan daripada yang bersenjata. Tak ada yang terluka, dan secara formal kau memenangkan siang ini.<br><br>Tapi tak ada yang terselesaikan. Hinaan Tybalt tetap ada padanya, rahasiamu tetap padamu, dan sahabatmu masih tak mengerti kenapa hari ini kau bersikap begitu asing. Verona itu kecil. Kalian akan bertemu lagi besok — dan besok takkan ada lagi dua puluh saksi di sekitar.` },
    peace:{ emoji:"🕊", title:"Siang yang tak menjadi tragedi", cls:"good",
      text:`Tybalt berjalan menyeberangi alun-alun, tanpa menoleh — dan pedangnya tetap tersarung sepanjang jalan. Panasnya sama tak tertahankan, batunya sama membaranya, Verona sama-sama membenci dirinya sendiri.<br><br>Mercutio mengejarmu di dekat sumur dan diam-diam memegang bahumu: "Sekarang ceritakan semuanya. Dari awal, pelan-pelan." Kau akan bercerita. Dan tentu, dia akan bilang sesuatu yang jorok soal keluarga Capulet — tapi dia akan datang besok ke Lawrence bersamamu.<br><br>Mercutio akan tetap hidup. Tak akan ada lakon yang ditulis tentang itu.` },
  },
  debrief:`Yang tak berhasil di sini justru yang terlihat paling baik hati. <b>Kehangatan tanpa penjelasan</b> ("aku punya alasan untuk menyayangimu") adalah langkah khas Romeo, dan justru itu yang membunuh Mercutio: sahabatnya dibiarkan dengan perilaku yang tak dimengerti dan membayangkan yang terburuk. <b>"Aku mengerti, tapi"</b> — penolakan sopan, bukan empati. <b>Berdiri di antara dua pedang</b> — campur tangan tanpa bertanya, dan dalam versi Shakespeare justru itulah yang mematikan.<br><br>Yang berhasil: menyebutkan tujuan sebenarnya seseorang dengan lantang; menyebutkan kebutuhan sahabat ("kau takut terlihat bodoh karena aku"); "tidak" yang tegas dengan konsekuensi nyata alih-alih memohon; dan permintaan akhir yang memberi lawan <b>jalan keluar dengan kehormatan</b>.<br><br>Dalam konflik dengan dua orang, yang paling sulit adalah kebutuhan mereka saling bertentangan: dengan menenangkan Tybalt lewat kepatuhan, kau selalu mempermalukan Mercutio. Karena itulah adegan ini tanpa skala sama sekali — di ruangan sungguhan pun tak ada skala.`
});
