"use strict";
/* ---------- 6. Setelah Menyelam (konstruktor) ---------- */
Amedi.stories.register("id","divemaster", {
  em:"🤿", title:"Setelah Menyelam", who:"Marek", diff:"konstruktor kalimat",
  desc:"Awalnya bukan kata-kata, tapi tindakan: dalam keadaan apa kau bahkan berani mendekat. Lalu kau susun kalimat sendiri dari empat bagian.",
  storageKey:"dive_endings",
  mode:"builder",
  breatheBeat:"menunggu, agak canggung memutar-mutar masker di tangannya.",
  hidden:true,
  endOrder:["brief","smoothed","cold","scene"],
  cast:[
    { key:"m", name:"Marek", faces:[[80,"🤬"],[58,"😤"],[42,"😒"],[24,"😐"],[0,"🙂"]] },
    { key:"you", name:"Kamu", self:true, faces:[[70,"🤬"],[50,"😠"],[30,"😮‍💨"],[0,"🙂"]] },
  ],
  start:{ w:{m:30, you:78}, contact:5 },
  extra:{ calm:3 },
  intro:`Amed, dive site dekat Jemeluk. Kamu dan Marek — dia instruktor di pusat penyelaman, kamu sudah setengah tahun fun dive bersamanya — merencanakan kedalaman 24 meter. Di kedalaman 28, kamu tunjukkan komputer selammu; dia acungkan "oke" dan terus turun sampai 31. Udaramu pas-pasan, di safety stop kau menggantung dengan sisa udara terakhir sambil menghitung detik.`,

  nodes:{
    /* --- prelude: tindakan, bukan kata-kata --- */
    n1:{
      narr:`Kapal. Kamu baru saja naik, duduk di bangku dengan masker di tangan. Jantung berdebar sampai tenggorokan, jari tak bisa membuka karabiner, telinga berdenging. Kemarahan naik bergelombang — dan bersamanya sesuatu yang mirip rasa malu, karena kamu sendiri yang mengikutinya. Marek tiga meter dari situ tertawa dengan kapten dan memperagakan ukuran penyu dengan tangannya. Dia jelas tak sadar ada yang terjadi.`,
      acts:[
        { text:`Melihat ke laut dan bernapas: empat tarikan napas, empat embusan, embusannya lebih lama.`,
          did:`kamu duduk menghadap laut dan bernapas. Empat hitungan tarik napas, enam embus. Tanganmu berhenti gemetar.`,
          icon:"🫁", tag:"Bernapas", cls:"good", d:{you:-30}, res:{calm:-1}, if:s=>s.calm>0, then:"n2",
          note:`Fisiologi datang lebih dulu: selama adrenalin masih di darah, korteks otak bekerja lebih buruk — dan kata-kata paling tepat sekalipun tak akan muncul.` },
        { text:`Melempar fin ke geladak sampai berdebum dan semua orang menoleh.`,
          did:`kamu lempar fin ke geladak. Debum keras. Kapten menoleh, Marek tidak.`,
          icon:"💢", tag:"Berdebum", cls:"bad", d:{you:+8, m:+5}, then:"n2",
          note:`Suara alih-alih kata-kata adalah usaha supaya orang lain menebak sendiri. Jarang ada yang menebak, tapi langsung membela diri.` },
        { text:`Mendorong kotak tabung sampai berdebam ke pagar kapal.`,
          did:`kamu dorong kotak tabung. Berdebam keras ke pagar kapal. Ada yang tersentak dalam kelompok.`,
          icon:"🤬", tag:"Agresi", cls:"bad", d:{you:+12, m:+8}, if:s=>s.w.you>=65, then:"n2",
          note:`Fantasi bahwa orang lain akan menebak pikiran, kebutuhan, dan solusinya dari gerak-gerikmu. Dia takkan menebak — dia cuma akan melihat orang yang berbahaya.` },
        { text:`Membereskan alat dan pulang tanpa berkata apa-apa.`,
          did:`kamu diam-diam membereskan alat, melemparnya ke pikap, dan pulang. Marek melambaikan tangan — kamu tak menoleh.`,
          icon:"🚶", tag:"Pergi", cls:"bad", end:"cold" },
        { text:`Mendekati Marek dan mulai bicara sekarang juga.`,
          did:`kamu berdiri dan menghampirinya sekarang juga, tangan masih gemetar.`,
          icon:"🗣", tag:"Langsung menyerang", cls:"meh", if:s=>s.w.you>=55, then:"n3",
          note:`Kadang ini berhasil. Tapi perhatikan apa yang bisa kau ucapkan dengan detak jantung seperti ini — dan apa yang tak akan bisa.` },
      ]
    },

    n2:{
      narr:s=> s.w.you>=55
        ? `Agak lebih ringan, tapi dalamnya masih berdenging. Kau memutar ulang "oke"-nya di kedalaman 28, dan tiap kali marah kembali datang. Marek sedang melepas wetsuit dan mengambil air.`
        : `Detak jantung mereda. Marahnya belum hilang, tapi sekarang lebih terasa berat dan dingin di dada, bukan lagi ledakan. Kau memperhatikan Marek terlihat pucat dan bergerak sangat lambat — sebelumnya kau tak pernah melihat itu.`,
      acts:[
        { text:`Bernapas lagi sambil merumuskan apa yang mau kau katakan.`,
          did:`kamu lakukan satu siklus napas lagi sambil menyusun kalimat pertama dalam kepala.`,
          icon:"🫁", tag:"Bernapas", cls:"good", d:{you:-28}, res:{calm:-1}, if:s=>s.calm>0, then:"n3",
          note:`Siklus kedua memberi apa yang tak diberikan siklus pertama: ruang untuk berpikir. Sekarang kau bukan hanya lebih tenang — kau juga tahu mau mulai dari mana.` },
        { text:`Mendekati Marek dan mulai bicara.`,
          did:`kamu mendekat dan duduk di sampingnya.`,
          icon:"🗣", tag:"Mulai bicara", cls:"good", then:"n3" },
        { text:`Menulis ke pemilik pusat penyelaman tanpa bicara dengan Marek.`,
          did:`kamu ambil HP dan mulai menulis ke Agnieszka, pemilik pusat penyelaman.`,
          icon:"📱", tag:"Lewat atasan", cls:"bad", end:"cold",
          note:`Mengadu lewat atasan menyelesaikan kecemasanmu, tapi bukan masalah kalian: orang yang menyelam bersamamu jadi tahu batasanmu dari manajemen.` },
        { text:`Meyakinkan diri tak ada yang salah dan pergi minum bir dengan grup.`,
          did:`kamu yakinkan diri semua baik-baik saja dan pergi ke grup mengambil bir dingin.`,
          icon:"🌫", tag:"Menelan", cls:"bad", end:"smoothed",
          note:`Yang ditelan tak hilang — ia mengendap. Lain kali kau mungkin tak akan menyelam dengannya lagi, atau ikut tapi sudah marah sebelum turun.` },
        { text:`Mendorong kotak tabung sampai berdebam ke pagar kapal.`,
          did:`kamu dorong kotak tabung — debum keras di seluruh kapal.`,
          icon:"🤬", tag:"Agresi", cls:"bad", d:{you:+12, m:+8}, if:s=>s.w.you>=65, then:"n3",
          note:`Tindakan ini hanya tersedia selagi kau dalam keadaan begini. Redakan dulu — dan pikiran soal itu pun akan lenyap.` },
      ]
    },

    /* --- percakapan: konstruktor --- */
    n3:{
      target:"m",
      npc:()=>`Gimana, bagus kan tadi? Kau lihat penyu di kedalaman tiga puluh? Gede banget, kayak tutup got.`,
      slots:[
        { label:"Observasi", hint:"hanya yang bisa direkam kamera",
          frags:[
            { text:`Kita rencanakan dua puluh empat meter. Di dua puluh delapan aku tunjukkan komputer selamku, kau acungkan "oke" lalu turun lebih dalam.`, q:"good", dw:-10, dc:+12, heat:-5,
              note:`Fakta murni: angka dan gerakan, tanpa penilaian. Ini tak bisa dibantah — cuma bisa diverifikasi.` },
            { text:`Kau cuek sama rencana selam dan naik ke tiga puluh satu, padahal kita sepakat dua puluh empat meter.`, q:"bad", dw:+16, dc:0, heat:+8,
              note:`"Cuek" adalah penilaian, bukan observasi. Angkanya benar, tapi kata pertama sudah jadi vonis, dan dia hanya dengar itu.` },
            { text:`Kau mau pamer di depan anak baru di kapal dan menyeretku ikut ke tiga puluh satu.`, q:"bad", dw:+22, dc:0, heat:+10,
              note:`Membaca pikiran. Kamu menuduh motif yang tak mungkin kau ketahui — dan sekarang dia membela reputasinya, bukan mendengar soal kedalaman.` },
            { text:`Kau selalu bawa grup lebih dalam dari kesepakatan, dan hari ini terulang lagi seperti biasa.`, q:"bad", dw:+18, dc:0, heat:+6,
              note:`"Selalu" adalah generalisasi. Ini meniadakan semua kali dia benar-benar mengikuti aturan, dan dia akan langsung menghitungnya balik.` },
          ] },
        { label:"Perasaan", hint:"apa yang terjadi di tubuh, bukan pikiran tentangnya",
          frags:[
            { text:`Aku takut. Di safety stop tanganku gemetar dan aku menghitung detik.`, q:"good", dw:-12, dc:+15, heat:-5, needsCalm:true,
              note:`Perasaan sungguhan plus fakta fisik. Ini tak bisa dibantah — dan justru karena itulah ia sampai.` },
            { text:`Aku merasa kau nggak peduli sama grup dan kau nggak menganggap kami sebagai manusia.`, q:"bad", dw:+20, dc:0, heat:+10,
              note:`Substitusi klasik: setelah "aku merasa..." hampir selalu ikut pikiran, bukan perasaan. Ini tuduhan berbaju kerentanan.` },
            { text:`Aku merasa ditinggalkan dan dimanfaatkan di sana, di kedalaman, dengan sisa udaraku.`, q:"meh", dw:+8, dc:0, heat:+4,
              note:`"Ditinggalkan", "dimanfaatkan" — bukan perasaan, tapi vonis atas tindakan orang lain. Otomatis menunjuk siapa yang salah.` },
            { text:`Aku murka atas kecerobohanmu dan cara kau membawakannya sekarang.`, q:"bad", dw:+18, dc:0, heat:+12,
              note:`Marahnya diakui, tapi langsung dilekatkan ke "kecerobohan"-nya. Perasaan berubah jadi tuduhan.` },
          ] },
        { label:"Kebutuhan", hint:"apa yang kamu kurang — bukan apa yang harus dia lakukan",
          frags:[
            { text:`Di bawah air aku butuh kepastian — tanpanya aku nggak bisa percaya pada partner.`, q:"good", dw:-12, dc:+15, heat:-5, needsCalm:true,
              note:`Kebutuhan dirumuskan sebagai milikmu. Bisa dipenuhi dengan banyak cara — makanya tak terdengar seperti perintah.` },
            { text:`Aku butuh kau tetap pada rencana yang sudah kita bahas sebelum turun.`, q:"meh", dw:+6, dc:+3, heat:+2,
              note:`Ini strategi, bukan kebutuhan: satu cara konkret alih-alih tujuan sesungguhnya. Strategi gampang terdengar sebagai tuntutan.` },
            { text:`Aku butuh kau akhirnya dewasa dan mulai bertanggung jawab atas orang di dalam air.`, q:"bad", dw:+24, dc:0, heat:+10,
              note:`Kebutuhan yang disamarkan jadi diagnosis. Sekarang ini bukan lagi soal selam — ini soal ada yang salah dengan dirinya sebagai orang.` },
            { text:`Aku butuh rasa aman saat berpasangan dengan seseorang di kedalaman seperti ini.`, q:"meh", dw:-2, dc:+5, heat:0,
              note:`Benar, tapi terlalu abstrak: soal "rasa aman" setiap orang membayangkan sendiri. Makin konkret kebutuhannya, makin mudah didengar.` },
          ] },
        { label:"Permintaan", hint:"tindakan yang bisa dilaksanakan, yang bisa dijawab \"ya\" atau \"tidak\"",
          frags:[
            { text:`Ayo kita sepakati maksimum kedalaman dan siapa yang mimpin — dan sinyal "naik" dijalankan tanpa perdebatan. Deal?`, q:"good", dw:-12, dc:+18, heat:-5, needsCalm:true,
              note:`Konkret, bisa dilaksanakan, dengan pertanyaan di akhir. Permintaan yang bisa dijawab "tidak" — satu-satunya jenis permintaan yang bukan tuntutan.` },
            { text:`Kau harus nggak pernah lagi begitu — nggak sama aku, nggak sama siapa pun di grup. Ini hal dasar.`, q:"bad", dw:+16, dc:0, heat:+5,
              note:`"Kau harus" adalah tuntutan. Terhadap tuntutan orang menjawab dengan tunduk atau memberontak; keduanya membunuh percakapan.` },
            { text:`Tolong lebih hati-hati lain kali di kedalaman, ya? Nggak ada lagi yang kuminta.`, q:"meh", dw:+4, dc:+3, heat:0,
              note:`"Lebih hati-hati" tak bisa dilaksanakan atau diverifikasi. Seminggu lagi kalian berdua takkan tahu apa itu sudah terjadi.` },
            { text:`Kalau kau nggak ikuti rencana selam, aku nggak akan selam lagi denganmu — pilih sendiri.`, q:"meh", dw:+10, dc:0, heat:+6,
              note:`Ini batasan sungguhan, dan kau akan membutuhkannya kalau tak ada perubahan. Tapi sebagai kalimat pertama, ini ultimatum: kau ajukan sebelum dia sempat menjawab.` },
          ] },
      ],
      react:{
        good:()=>`(senyumnya luntur) ...Tunggu. Kau tunjukin komputer selam ke aku? Di kedalaman dua puluh delapan?.. Aduh. Kukira kau nunjuk ke arah penyu.`,
        mixed:()=>`Ah santai aja, dua puluh delapan itu bukan dalam. Aku kan di sampingmu terus, aku lihat kok.`,
        bad:()=>`Waduh. Sekarang aku ini gimana? Hampir bunuh kau katanya? Kau sendiri yang ikut aku, nggak ada yang narik pakai tali.`,
      },
      next:"n4"
    },

    n4:{
      target:"m",
      npc:s=> s.w.m<45
        ? `(duduk di bangku) Dengar... aku beneran nggak sadar. Hari ini selam keempatku. Kemarin lima. Aku udah kerja otomatis semua.`
        : `Dengar, aku sudah dua puluh tahun menyelam. Dua puluh tahun. Nggak ada satu insiden pun. Dan kau baru setengah tahun ikut aku, terus ngajarin aku cara rencanakan selam?`,
      slots:[
        { label:"Observasi", hint:"apa yang baru saja dia katakan atau lakukan",
          frags:[
            { text:`Kau bilang ini selam keempatmu hari ini dan kau kerja otomatis semua.`, q:"good", dw:-10, dc:+12, heat:-3,
              note:`Kamu mengulang kata-katanya sendiri tanpa interpretasi. Orang paham dirinya didengar saat mendengar kalimatnya sendiri kembali.` },
            { text:`Kau sekarang malah membela diri dengan kelelahan, alih-alih mengakui kesalahan.`, q:"bad", dw:+18, dc:0, heat:+8,
              note:`"Membela diri" adalah label pada kata-katanya. Dia baru saja mengakui kelemahan, dan kau menyebutnya sebagai siasat.` },
            { text:`Dua puluh tahun pengalaman — dan sinyal partner di kedalaman dua puluh delapan tetap terlewat.`, q:"bad", dw:+20, dc:0, heat:+8,
              note:`Secara formal fakta, tapi disusun sebagai pukulan: kau ambil hal yang dia banggakan dan pakai untuk menyerangnya.` },
            { text:`Hari ini kau selam keempat kalinya, dan musim ini sudah bulan kedua tanpa hari libur.`, q:"good", dw:-8, dc:+10, heat:-2,
              note:`Fakta yang lebih luas, tanpa penilaian: kau melihat situasinya, bukan cuma situasimu sendiri.` },
          ] },
        { label:"Menebak keadaannya", hint:"apa yang sebenarnya terjadi padanya",
          frags:[
            { text:`Dan itu mungkin lebih menakutkanmu daripada aku: melewatkan sinyal secara otomatis, padahal kau bertanggung jawab atas orang lain.`, q:"good", dw:-16, dc:+20, heat:-5, needsCalm:true,
              note:`Tebakan empatik soal ketakutannya. Walau tak tepat, ini menunjukkan kamu di pihaknya, bukan melawannya.` },
            { text:`Aku masih merasa nggak enak, dan aku mau menyelesaikan ini, bukan bertengkar denganmu di kapal.`, q:"good", dw:-10, dc:+14, heat:-4, needsCalm:true,
              note:`Jujur tentang dirimu plus niat yang jelas. Mengucapkan niat dengan lantang adalah langkah kuat: ini menghapus kecurigaan bahwa ini serangan.` },
            { text:`Aku nggak peduli berapa kali kau selam sehari — jadwalmu sama sekali nggak ada hubungannya sama aku.`, q:"bad", dw:+22, dc:0, heat:+10,
              note:`Kamu mengabaikan apa yang baru saja dia buka. Lain kali dia tak akan membuka apa-apa lagi.` },
            { text:`Aku nggak wajib memahami keadaanmu, aku bayar buat selam dan buat keselamatan.`, q:"bad", dw:+18, dc:0, heat:+8,
              note:`Secara teknis benar. Tapi empati bukan konsesi atau kewajiban: itu satu-satunya cara agar kau juga didengar balik.` },
          ] },
        { label:"Kebutuhan", hint:"kebutuhan siapa yang utama di sini",
          frags:[
            { text:`Kita berdua butuh ada yang bisa dipercaya di dalam air — kau juga sama seperti aku.`, q:"good", dw:-12, dc:+16, heat:-4, needsCalm:true,
              note:`Kebutuhan bersama, bukan posisi yang bertentangan. Sekarang kalian bukan lagi saling berhadapan, tapi berdua melawan masalah.` },
            { text:`Aku perlu tahu kau melihatku saat aku memberi sinyal di bawah air.`, q:"good", dw:-10, dc:+14, heat:-3,
              note:`Kebutuhanmu sendiri, konkret dan bisa diverifikasi. Tanpa menuduh dia belum memenuhinya sebelumnya.` },
            { text:`Aku butuh pusat selam nggak bikin kau selam empat-lima kali sehari waktu musim ramai.`, q:"meh", dw:0, dc:+3, heat:0,
              note:`Pikiran yang benar, tapi salah alamat: kebutuhan ini soal pihak ketiga. Percakapan bergeser dari kalian berdua ke manajemen pusat selam.` },
            { text:`Aku butuh kau mengakui kau salah — kalau nggak, ini semua nggak ada artinya.`, q:"bad", dw:+20, dc:0, heat:+8,
              note:`Ini kebutuhan akan kekalahan lawan. Tuntutan pengakuan mengubah percakapan jadi persidangan tempat dia harus kalah supaya kau menang.` },
          ] },
        { label:"Permintaan", hint:"apa konkretnya yang dilakukan selanjutnya",
          frags:[
            { text:`Gimana kalau begini: tiga puluh detik sebelum turun — maksimum, sisa udara, siapa yang mimpin. Kita coba hari Kamis?`, q:"good", dw:-14, dc:+18, heat:-5, needsCalm:true,
              note:`Waktu, tindakan, dan tanggal percobaan. Permintaan seperti ini bisa dilaksanakan — dan seminggu lagi bisa diverifikasi apakah terjadi.` },
            { text:`Dan bilang ke Agnieszka jangan kasih kau selam keempat — aku juga akan bilang ke dia.`, q:"good", dw:-8, dc:+12, heat:-2,
              note:`Permintaan yang menyembuhkan penyebab, bukan gejala, dan kamu ikut mengambil bagian tanggung jawab. Lebih lemah dari yang pertama, tapi jujur.` },
            { text:`Cuma janjikan aku hal itu takkan terulang lagi di selam mana pun, dan kita tutup topik ini.`, q:"meh", dw:+6, dc:+3, heat:+2,
              note:`Janji tanpa mekanisme. Dia baru menjelaskan dia bertindak otomatis — dan otomatis tak diperbaiki dengan janji.` },
            { text:`Nggak usah apa-apa, lupain aja. Sudah, aku sudah katakan semua yang mau kukatakan, nggak akan kuulangi.`, q:"bad", dw:+8, dc:-5, heat:+4,
              note:`Kau mengakhiri percakapan di tengah jalan. Tak ada yang berubah — kecuali sekarang kau sendiri jadi tak percaya pada pasangan selam ini.` },
          ] },
      ],
      react:{
        good:()=>`(diam, lalu mengangguk) Tahu nggak, selama dua puluh tahun belum ada yang bilang begitu ke aku. Biasanya orang cuma teriak, atau diam dan nggak pernah datang lagi.`,
        mixed:()=>`Ya udahlah, ya udah. Aku ngerti, akan lebih hati-hati. Sudah, lupain.`,
        bad:()=>`Dengar, mungkin kau cari instruktur lain aja? Kalau aku emang berbahaya begitu.`,
      },
      next:()=>null
    }
  },
  checkFail:s=> (s.w.m>=85 ? "scene" : null),
  resolve:(s)=>{
    if(s.contact>=55 && s.w.m<30) return "brief";
    if(s.contact>=28) return "smoothed";
    return "cold";
  },
  endings:{
    scene:{ emoji:"💥", title:"Adegan di kapal", cls:"bad",
      text:`Kalian bicara sampai kapten mematikan mesin, dan dua anak baru sibuk sekali memeriksa fin mereka. Marek melempar kalimat soal dua puluh tahun tanpa masalah dengan siapa pun, kamu balas soal penyunya.<br><br>Kalian turun ke pantai dalam diam. Malamnya pemilik pusat selam akan menulis ke kalian berdua secara terpisah. Yang paling buruk bukan itu: rencana selam di pusat ini akan terus dilanggar seperti biasa — cuma sekarang tanpa kamu.` },
    cold:{ emoji:"🧊", title:"Dingin", cls:"bad",
      text:`Kalian tak lagi menyelam bersama. Secara formal tak terjadi apa-apa: kalian bersapa, bercanda, dia bahkan menawarkan tabung dengan diskon.<br><br>Tapi berpasangan dengannya kamu takkan mau lagi — dan di pusat itu masih belum ada yang membahas maksimum kedalaman sebelum turun. Karena satu-satunya orang yang pernah membicarakan itu melakukannya sedemikian rupa hingga tak didengar. Atau tak membicarakannya sama sekali.` },
    smoothed:{ emoji:"🌫", title:"Diselesaikan dengan halus", cls:"meh",
      text:`"Sudah, aku ngerti, akan lebih hati-hati." Kalian bersalaman, dan secara formal semua baik-baik saja.<br><br>Dua minggu kemudian di selam lain dia akan turun lebih dalam dari rencana lagi — bukan sengaja, tapi karena selam keempat hari itu dan semuanya otomatis. Ada janji, tapi tak ada mekanisme. Dan kali ini kau tak akan bilang apa-apa lagi, karena "kan sudah pernah dibicarakan".` },
    brief:{ emoji:"🤿", title:"Briefing baru", cls:"good",
      text:`Hari Kamis Marek sendiri yang mulai hal yang sebelumnya tak pernah dia lakukan: tiga puluh detik sebelum turun — maksimum, sisa udara, siapa yang mimpin, dan kalimat "sinyal naik dijalankan siapa pun, tanpa tanya-tanya". Sebulan lagi ini akan jadi briefing standar seluruh pusat, dan tak ada yang ingat asalnya dari mana.<br><br>Dan di kapal, sambil melepas fin, dia akan bilang: "Dengar, bagus juga kau nggak diam waktu itu." Kau memang tak diam — dan tak meledak juga. Ternyata di antara keduanya ada ruang.` },
  },
  debrief:`Ada dua hal yang diuji di sini. Pertama: bukan <b>mengenali</b> jawaban benar dalam daftar, tapi <b>menyusun</b>nya sendiri — dalam hidup nyata tak ada yang menyodorkan empat pilihan dengan satu yang benar.<br><br>Kedua — <b>prelude</b>. Sebelum satu kata pun, kamu harus memilih bukan kalimat, tapi tindakan: mendekat, membanting, pergi, bernapas. Dan dari keadaan saat kamu mendekat itulah tergantung apa yang <i>secara fisik</i> bisa kamu ucapkan selanjutnya: pada orang yang murka, separuh rumusan tepat sekalipun tak akan muncul di kepala. Empati diri dalam metode Rosenberg berada <i>sebelum</i> empat langkah justru karena ini.<br><br>Empat jebakan klasik, satu per slot: <b>penilaian menggantikan observasi</b> ("cuek", "selalu"); <b>pikiran berbaju perasaan</b> ("aku merasa kau nggak peduli") dan kata-kata vonis ("ditinggalkan", "dimanfaatkan"); <b>strategi menggantikan kebutuhan</b>; <b>tuntutan menggantikan permintaan</b> ("kau harus") atau permintaan yang tak bisa diverifikasi ("lebih hati-hati").<br><br>Dan aturan utama penyusunan: <b>bagian terburuk menentukan seluruh kalimat</b>. Perasaan, kebutuhan, dan permintaan yang sempurna sekalipun tak akan menolong kalau observasinya sudah dimulai dengan tuduhan — selanjutnya orang itu sudah membela diri dan tak mendengar sisanya.`
});
