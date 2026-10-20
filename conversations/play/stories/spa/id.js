"use strict";
/* ---------- 7. Spa di Amed (konstruktor) ---------- */
Amedi.stories.register("id","spa", {
  em:"🌺", title:"Spa di Amed", who:"Ibu Kadek", diff:"konstruktor kalimat",
  desc:"Pijat berdua di satu ruangan — dan salah satu dari dua terapis datang dalam keadaan sakit. Pijatnya sudah selesai, di kasir kalian ditanya apa semuanya berkenan. Mengatakan kebenaran di momen yang seharusnya kau bilang \"semua bagus\".",
  storageKey:"spa_endings",
  mode:"builder",
  breatheBeat:"menunggu, dengan sabar mengetuk-ngetukkan pena ke buku catatannya.",
  hidden:true,
  endOrder:["care","swallow","blame","scene"],
  cast:[
    { key:"k", name:"Ibu Kadek", faces:[[78,"😟"],[56,"😐"],[38,"🙂"],[0,"😊"]] },
    { key:"you", name:"Kamu", self:true, faces:[[62,"😤"],[44,"😠"],[26,"😮‍💨"],[0,"🙂"]] },
  ],
  start:{ w:{k:25, you:58}, contact:5 },
  extra:{ calm:3 },
  intro:`Amed, spa kecil di pinggir jalan. Sejam untuk berdua kamu dan Teplinka pesan lewat WhatsApp — manajernya balas cepat dan penuh emoji. Sampai di sana kalian disuguhi teh sereh dan diantar ke satu ruangan yang sama: dua meja berjarak satu meter, AC, bunga kamboja. Dua terapis datang: Putu untukmu, Wayan untuk Teplinka. Putu bekerja dengan sangat baik. Sedangkan Wayan sedang sakit — sepanjang jam itu bernapas lewat hidung dengan bunyi mengi, sesekali berdehem, dan dua kali batuk tepat di atas Teplinka yang tengkurap dengan wajah di lubang bantal. Kamu berbaring selama satu jam itu berjarak satu meter darinya, mendengarkan napas itu dan menghitung batuk, alih-alih bersantai. Pijatnya sudah selesai. Teplinka berpakaian dan tak berkata sepatah kata pun.`,

  nodes:{
    /* --- prelude --- */
    n1:{
      narr:`Kamu mengikat sarung. Di dalam ada kekacauan yang tak nyaman: kekecewaan — sejam sudah rusak dan tak bisa diputar balik — kecemasan untuk Teplinka yang dibatuki di tengkuk, dan malu karena kamu bahkan merasa kesal soal ini, padahal perempuan itu bukan salah dia sendiri sakit. Teplinka sudah memakai sandal: "Ah santai aja, tangannya emas kok." Di meja kasir, Ibu Kadek sedang menghitung sesuatu di buku catatan sambil tersenyum — sebentar lagi dia akan bertanya apa semuanya berkenan.`,
      acts:[
        { text:`Berdiri diam setengah menit dan menyebut ke diri sendiri apa yang sebenarnya kamu rasakan.`,
          did:`kamu berdiri setengah menit di dekat pot bunga dan menyebut ke diri sendiri: kecewa, cemas untuk Teplinka, dan sedikit malu untuk keduanya.`,
          icon:"🫁", tag:"Sebutkan pada diri sendiri", cls:"good", d:{you:-28}, res:{calm:-1}, if:s=>s.calm>0, then:"n2",
          note:`Empati diri lebih dulu: selama perasaan belum disebutkan, ia yang mengendalikanmu. Setelah disebutkan, ia baru bisa dipakai.` },
        { text:`Bertanya pelan ke Teplinka, apa itu cuma perasaanmu saja.`,
          did:`kamu tanya pelan ke Teplinka, apa dia juga dengar. "Ah, santai aja, ayo jalan," jawabnya tanpa mengangkat pandangan.`,
          icon:"🤫", tag:"Cari konfirmasi", cls:"meh", d:{you:+6}, then:"n2",
          note:`Kamu menyerahkan penilaian perasaanmu pada orang yang sejam tengkurap dengan wajah di lubang bantal. Dia membatalkannya — tapi batuknya tetap saja ada.` },
        { text:`Bilang "semua bagus, terima kasih", bayar, dan pergi.`,
          did:`kamu tersenyum, bilang "semua bagus, terima kasih", bayar penuh untuk berdua, dan keluar.`,
          icon:"🌫", tag:"Diam saja", cls:"bad", end:"swallow" },
        { text:`Bayar, keluar, lalu tulis ke manajer lewat WhatsApp dari atas motor.`,
          did:`kamu bayar, keluar, dan sudah di atas motor membuka WhatsApp untuk menulis ke manajer semua yang belum kamu katakan di sana.`,
          icon:"📱", tag:"Tulis nanti saja", cls:"bad", end:"blame" },
        { text:`Bayar, keluar, dan kasih bintang satu di Google Maps.`,
          did:`kamu bayar, keluar, dan buka peta untuk kasih bintang satu.`,
          icon:"⭐", tag:"Satu bintang", cls:"bad", end:"blame" },
        { text:`Mendekati meja kasir dan mulai bicara sekarang juga.`,
          did:`kamu berjalan ke meja kasir sekarang juga, dengan kekacauan yang belum sempat kamu urai.`,
          icon:"🗣", tag:"Langsung", cls:"meh", if:s=>s.w.you>=45, then:"n3" },
      ]
    },

    n2:{
      narr:s=> s.w.you>=45
        ? `Agak lebih ringan, tapi kekacauannya masih ada. Kamu sadar sekarang lebih gampang bilang "semua bagus" — lalu sepanjang sore memutuskan, mau tulis ke manajer lewat WhatsApp, kasih bintang, atau nggak akan datang lagi ke sini. Teplinka sudah di dekat pintu.`
        : `Jadi lebih tenang di dalam. Dan sekarang kamu memperhatikan hal yang tadi tak terlihat: Wayan melipat handuk dengan sangat lambat, wajahnya pucat, dan dia menjaga jarak sejauh mungkin dari meja kasir supaya tak bernapas ke arah orang. Sepertinya dia memang benar-benar sakit — dan tetap saja masuk kerja hari ini.`,
      acts:[
        { text:`Bernapas setengah menit lagi sambil merumuskan apa yang mau kamu katakan.`,
          did:`kamu beri diri setengah menit lagi dan rumuskan apa yang sebenarnya kamu mau: bukan menghukum, tapi supaya hal ini tak terulang lagi.`,
          icon:"🫁", tag:"Rumuskan", cls:"good", d:{you:-26}, res:{calm:-1}, if:s=>s.calm>0, then:"n3",
          note:`Beda antara "ini bikin aku kesal" dan "aku mau lain kali diberitahu dulu" — itulah beda antara keluhan dan permintaan.` },
        { text:`Mendekati Ibu Kadek dan mulai bicara.`,
          did:`kamu mendekati meja kasir. Ibu Kadek menyisihkan buku catatannya dan menoleh ke kamu.`,
          icon:"🗣", tag:"Mulai bicara", cls:"good", then:"n3" },
        { text:`Meminta Teplinka mengatakannya untukmu.`,
          did:`kamu minta Teplinka mengatakan ini untukmu. Dia mengangkat bahu: "Ah, ngomong apa, aku santai aja kok."`,
          icon:"🙈", tag:"Lewat tangan orang lain", cls:"bad", d:{you:+8}, end:"swallow",
          note:`Permintaan yang disampaikan lewat orang yang bahkan tak merasakannya, tak akan sampai ke mana-mana. Batasan hanya bisa ditegakkan oleh pemiliknya sendiri.` },
        { text:`Bilang "semua bagus", bayar, dan pergi.`,
          did:`kamu bilang "semua bagus, terima kasih", bayar, dan keluar.`,
          icon:"🌫", tag:"Diam saja", cls:"bad", end:"swallow" },
        { text:`Bertanya dengan suara keras, supaya didengar tamu lain, apa wajar mempekerjakan terapis yang sakit.`,
          did:`kamu bicara supaya terdengar di lobi: "Apa wajar mempekerjakan terapis yang sedang sakit?" Dua orang berjubah mandi menoleh.`,
          icon:"📣", tag:"Di depan umum", cls:"bad", d:{you:+10, k:+18}, if:s=>s.w.you>=45, then:"n3",
          note:`Keterbukaan publik adalah tekanan, bukan argumen. Sekarang dia membela nama baik tempat ini di depan saksi, bukan menyelesaikan masalahmu.` },
      ]
    },

    /* --- percakapan --- */
    n3:{
      target:"k",
      npc:()=>`Gimana? Semuanya berkenan? Putu dan Wayan — tangan terbaik di Amed, dari Ubud pun orang datang ke mereka.`,
      slots:[
        { label:"Observasi", hint:"hanya yang bisa direkam alat perekam",
          frags:[
            { text:`Putu bekerja dengan sangat baik. Sementara Wayan sejam berjarak semeter bernapas mengi dan dua kali batuk di atas Teplinka.`, q:"good", dw:-10, dc:+12, heat:-5,
              note:`Fakta tanpa diagnosis dan tanpa vonis, plus pengakuan atas apa yang bagus. Tak ada yang bisa dibantah di sini.` },
            { text:`Kalian menaruh terapis yang sakit untuk kami, dan dia batuk sejam penuh di atas pacarku.`, q:"bad", dw:+18, dc:0, heat:+8,
              note:`"Kalian menaruh" sudah jadi tuduhan, bukan observasi. Selanjutnya dia membela tempat ini, bukan mendengarmu.` },
            { text:`Wayan jelas sedang sakit sepanjang waktu, tapi dia memutuskan shift lebih penting dari kesehatan pelanggan.`, q:"bad", dw:+22, dc:0, heat:+10,
              note:`Membaca pikiran plus motif yang tak kamu ketahui. Cara tercepat mengubah orang hidup jadi tokoh cerita.` },
            { text:`Di tempat kalian selalu begini: yang penting terima pembayaran untuk berdua, sisanya nggak dipedulikan.`, q:"bad", dw:+20, dc:0, heat:+8,
              note:`"Selalu" untuk kunjungan pertama sudah jadi vonis atas tempat ini. Pekerjaannya sekarang jadi berdebat.` },
          ] },
        { label:"Perasaan", hint:"apa yang terjadi padamu di meja pijat itu",
          frags:[
            { text:`Aku sejam berbaring dan menghitung batuknya, alih-alih sedikit bersantai.`, q:"good", dw:-12, dc:+15, heat:-5, needsCalm:true,
              note:`Pengalamanmu, dijelaskan dari dalam. Ini tak bisa dibantah — dan justru karena itulah ini didengar.` },
            { text:`Aku merasa kalian nggak peduli sama pelanggan, yang penting dibayar untuk sejam.`, q:"bad", dw:+20, dc:0, heat:+10,
              note:`Setelah "aku merasa..." muncul pikiran, bukan perasaan. Ini tuduhan berbaju kerentanan.` },
            { text:`Aku merasa dibohongi dan sedikit dimanfaatkan untuk empat ratus ribu itu.`, q:"meh", dw:+8, dc:0, heat:+4,
              note:`"Dibohongi", "dimanfaatkan" — bukan perasaan, tapi vonis atas tindakan orang lain: otomatis menunjuk siapa yang salah.` },
            { text:`Aku kaget dengan kurangnya kebersihan di tempat kalian — nggak menyangka begini.`, q:"bad", dw:+18, dc:0, heat:+8,
              note:`"Kurang kebersihan" adalah label yang mengubah perempuan yang sedang sakit menjadi pelanggaran standar. Sekarang percakapan soal reputasi, bukan tentangmu.` },
          ] },
        { label:"Kebutuhan", hint:"apa yang kamu kurang — bukan siapa yang salah",
          frags:[
            { text:`Buatku penting merasa aman saat berbaring dengan mata tertutup — dan supaya Teplinka nggak sampai sakit.`, q:"good", dw:-12, dc:+15, heat:-5, needsCalm:true,
              note:`Kebutuhan dirumuskan sebagai milikmu, dan bisa dipenuhi dengan banyak cara. Karena itu tak terdengar seperti perintah.` },
            { text:`Aku perlu terapis yang sakit nggak usah masuk kerja melayani pelanggan — itu saja.`, q:"meh", dw:+6, dc:+3, heat:+2,
              note:`Ini strategi, bukan kebutuhan: satu cara konkret saja, bukan tujuan sebenarnya. Dan cara ini nggak murah, terutama untuk Wayan.` },
            { text:`Aku perlu kalian akhirnya mulai memeriksa dan mengawasi orang-orang di sini.`, q:"bad", dw:+24, dc:0, heat:+10,
              note:`"Akhirnya mulai" adalah kritik atas kompetensi mereka, bukan kebutuhan. Sudah pasti akan dibela.` },
            { text:`Aku butuh kebersihan dan sedikit lebih banyak perhatian soal siapa yang ditugaskan memijat.`, q:"meh", dw:-2, dc:+5, heat:0,
              note:`Benar, tapi terlalu abstrak: "kebersihan" dan "perhatian" — kata yang setiap orang bayangkan sendiri.` },
          ] },
        { label:"Permintaan", hint:"tindakan yang bisa dilaksanakan untuk masa depan — sesi sudah selesai",
          frags:[
            { text:`Lain kali cukup kabari kami lewat WhatsApp kalau terapisnya sakit — kami bisa gampang jadwal ulang.`, q:"good", dw:-14, dc:+18, heat:-5, needsCalm:true,
              note:`Sejamnya sudah tak bisa diputar balik, jadi permintaan ini melihat ke depan: tindakan konkret lewat kanal yang sama dengan tempat kalian booking. Bisa dijawab "ya".` },
            { text:`Kalian harus kembalikan uang kami untuk sejam ini, untuk berdua — kupikir ini sudah jelas.`, q:"bad", dw:+16, dc:0, heat:+5,
              note:`"Kalian harus" adalah tuntutan. Uang di sini bahkan bukan masalah utama; masalahnya adalah tuntutan dijawab dengan pembelaan.` },
            { text:`Coba lebih perhatian lain kali waktu menyusun jadwal harian, oke?`, q:"meh", dw:+4, dc:+3, heat:0,
              note:`"Lebih perhatian" tak bisa dilaksanakan atau diverifikasi. Sopan, dan sama sekali tak mengubah apa pun.` },
            { text:`Kalian selesaikan ini sekarang, atau kutulis di ulasan Google Maps — pilih sendiri.`, q:"meh", dw:+12, dc:0, heat:+6,
              note:`Ancaman menggantikan permintaan. Mungkin memang berhasil — tapi selanjutnya kalian berurusan karena takut, bukan hormat.` },
          ] },
      ],
      react:{
        good:()=>`(meletakkan pena) ...Batuk? Di atas dia? Aduh. Aduh, maaf sekali. Katanya itu cuma alergi debu.`,
        mixed:()=>`Ah. Ya... Wayan bilang cuma alergi. Dia sudah dua puluh tahun kerja di sini, belum pernah ada yang komplain.`,
        bad:()=>`Bu, terapis kami yang terbaik di Amed. Kalau nggak berkenan — bisa saya panggil pemiliknya, tapi jangan begini dong.`,
      },
      next:"n4"
    },

    n4:{
      target:"k",
      npc:s=> s.w.k<40
        ? `(lebih pelan) Saya cerita apa adanya. Hari ini seharusnya Putu dan Komang. Komang pergi upacara, dan Wayan ambil shiftnya, karena kami nggak bayar untuk hari nggak kerja. Dia satu-satunya di keluarganya yang sekarang cari nafkah. Saya tahu dia agak sakit. Seharusnya nggak saya pasang dia.`
        : `Saya nggak tahu harus bilang apa. Wayan sudah dua puluh tahun di profesi ini, orang dari Ubud pun datang ke dia. Kalau mau, saya jadwalkan lain kali ke terapis lain, tapi komplain saya nggak terima.`,
      slots:[
        { label:"Observasi", hint:"apa yang baru saja dia katakan",
          frags:[
            { text:`Kamu bilang hari tanpa kerja nggak dibayar dan Wayan sendiri yang ambil shift ini.`, q:"good", dw:-10, dc:+12, heat:-3,
              note:`Kata-katanya sendiri, dikembalikan tanpa interpretasi. Orang paham dirinya didengar saat mendengar kalimatnya sendiri kembali.` },
            { text:`Jadi kalian tahu dia sakit, dan tetap saja memasangnya untuk Teplinka.`, q:"bad", dw:+18, dc:0, heat:+8,
              note:`Secara formal tepat — tapi disusun sebagai pukulan. Dia baru saja mengambil langkah maju, dan yang dia dapat malah protokol.` },
            { text:`Jadi masalah gaji hari sakit kalian jadi masalah kami di jam ini.`, q:"bad", dw:+20, dc:0, heat:+8,
              note:`Logis dan tanpa ampun. Kamu baru saja mengubah keterbukaannya jadi senjata untuk melawannya.` },
            { text:`Dia hari ini ada alasan datang kerja, dan kalian tahu itu waktu menyusun jadwal.`, q:"meh", dw:+6, dc:+3, heat:+2,
              note:`Setengah fakta, setengah kritik. "Dan kalian tahu itu" menyeret "berarti kalian yang salah".` },
          ] },
        { label:"Menebak keadaannya", hint:"apa yang sebenarnya terjadi padanya dan pada Wayan",
          frags:[
            { text:`Kamu pasti juga nggak mudah: menyuruhnya pulang berarti dia kehilangan penghasilan hari ini.`, q:"good", dw:-16, dc:+20, heat:-5, needsCalm:true,
              note:`Empati atas dilema nyatanya. Sekarang kalian bukan lagi berhadapan di meja kasir, tapi sama-sama melihat satu situasi yang tak nyaman.` },
            { text:`Aku kasihan sama Wayan, dan di saat yang sama aku takut Teplinka jatuh sakit. Keduanya benar.`, q:"good", dw:-10, dc:+14, heat:-4, needsCalm:true,
              note:`Dua kebenaran sekaligus, tanpa harus memilih salah satu. Belas kasih tak membatalkan kebutuhanmu — dan tak harus membatalkannya.` },
            { text:`Kesepakatan kalian dengan pegawai bukan urusanku, kami di sini cuma pelanggan.`, q:"bad", dw:+22, dc:0, heat:+10,
              note:`Kamu mengabaikan apa yang baru saja dia buka. Lain kali kau akan diberi tahu itu cuma alergi.` },
            { text:`Ini urusan internal kalian, dan kami bayar untuk sejam istirahat, bukan untuk ini.`, q:"bad", dw:+18, dc:0, heat:+8,
              note:`Secara teknis benar. Tapi empati di sini bukan konsesi: tanpanya kau takkan dapat pengertian maupun solusi yang layak.` },
          ] },
        { label:"Kebutuhan", hint:"kebutuhan siapa yang utama di sini",
          frags:[
            { text:`Kita berdua perlu supaya pelanggan pulang dengan segar, dan Wayan nggak kehilangan penghasilan hari ini.`, q:"good", dw:-12, dc:+16, heat:-4, needsCalm:true,
              note:`Kebutuhan bersama, bukan posisi yang bertentangan: sekarang menyelesaikan satu masalah bersama, bukan mencari siapa yang salah.` },
            { text:`Aku perlu tahu lebih dulu kalau ada yang nggak beres — dan kita bisa gampang jadwal ulang.`, q:"good", dw:-10, dc:+14, heat:-3,
              note:`Kebutuhanmu sendiri, konkret dan murah bagi mereka. Kebutuhan seperti ini gampang dipenuhi dengan senang hati.` },
            { text:`Aku perlu pemiliknya mengubah aturan soal gaji hari sakit untuk para terapis.`, q:"meh", dw:0, dc:+3, heat:0,
              note:`Pikiran yang benar tapi salah alamat: perempuan ini tak punya wewenang itu. Percakapan bergeser ke tempat yang tak menyelesaikan apa-apa.` },
            { text:`Aku perlu kalian mengakui: begini seharusnya nggak boleh, dan ini kesalahan kalian.`, q:"bad", dw:+20, dc:0, heat:+8,
              note:`Kebutuhan akan kekalahan lawan. Tuntutan pengakuan mengubah percakapan jadi persidangan tempat seseorang harus kalah.` },
          ] },
        { label:"Permintaan", hint:"apa konkretnya yang dilakukan sekarang",
          frags:[
            { text:`Kalau ada yang sakit — kabari kami lewat WhatsApp lebih dulu, kami akan jadwal ulang. Dan pulangkan Wayan hari ini.`, q:"good", dw:-14, dc:+18, heat:-5, needsCalm:true,
              note:`Tindakan untuk masa depan lewat kanal yang sama plus kepedulian untuk Wayan sekarang juga. Sesinya tak bisa diputar balik, tapi sesi berikutnya takkan dibiarkan rusak lagi.` },
            { text:`Jadwalkan kami lain kali ke Putu, dan biarkan Wayan istirahat hari ini karena kalian.`, q:"good", dw:-8, dc:+12, heat:-2,
              note:`Konkret dan melindungi orang ketiga: kamu menyelesaikan urusanmu untuk masa depan, tanpa menyalahkan Wayan.` },
            { text:`Coba janjikan saja hal ini nggak akan terulang lagi di masa depan, dan sudah selesai semua.`, q:"meh", dw:+6, dc:+3, heat:+2,
              note:`Janji tanpa mekanisme. Dia baru saja menjelaskan kenapa ini terjadi — dan penyebabnya tak sembuh dengan janji.` },
            { text:`Nggak usah apa-apa, lupakan saja semuanya. Aku sudah bilang semua yang mau kubilang.`, q:"bad", dw:+8, dc:-5, heat:+4,
              note:`Kamu mengakhiri percakapan tepat di titik dia mulai bekerja. Semua sudah diucapkan — dan tak ada yang berubah.` },
          ] },
      ],
      react:{
        good:()=>`(mengangguk lama) Terima kasih sudah bilang. Beneran terima kasih. Yang datang ke saya biasanya cuma bilang "semua bagus", atau marah-marah. Yang begini — hampir nggak pernah.`,
        mixed:()=>`Baik. Lain kali saya jadwalkan ke Putu. Terima kasih sudah bilang.`,
        bad:()=>`Saya panggil pemiliknya. Selanjutnya, silakan bicara dengan dia.`,
      },
      next:()=>null
    }
  },
  checkFail:s=> (s.w.k>=85 ? "scene" : null),
  resolve:(s)=>{
    if(s.contact>=55 && s.w.k<25) return "care";
    if(s.contact>=28) return "swallow";
    return "blame";
  },
  endings:{
    scene:{ emoji:"💥", title:"Adegan di meja kasir", cls:"bad",
      text:`Suara makin keras, di lobi sudah sunyi, dan dua orang berjubah mandi mempelajari daftar harga di dinding dengan sangat serius. Teplinka berdiri di dekat pintu menatap lantai. Pemiliknya keluar.<br><br>Uangmu mungkin dikembalikan. Tapi dari sesi pijat itu kamu keluar lebih tegang dari sebelum masuk, dan Wayan menangis di ruang belakang — dia tak paham satu kata pun, cuma paham nadanya.` },
    blame:{ emoji:"⭐", title:"Menulis belakangan", cls:"bad",
      text:`Di meja kasir kamu bilang semua bagus. Malamnya kamu menulis — semua yang tak kamu katakan di sana: rinci, adil, dan tepat sasaran.<br><br>Balasannya datang cepat, dengan permintaan maaf dan tiga emoji. "Kami akan bicara dengannya." Mereka akan bicara: Wayan akan kena denda atau kehilangan shift, dan lain kali dia akan tetap datang saat sakit — cuma sekarang dia takkan bilang apa-apa lagi, karena sekarang dia tahu bagaimana akhirnya.<br><br>Kamu dapat orang yang disalahkan dan tak dapat apa pun yang lain: bukan ketenangan hari ini, bukan jaminan pijat berikutnya takkan sama. Kalian takkan kembali ke spa ini, walau tangan Putu memang bagus sekali.` },
    swallow:{ emoji:"🌫", title:"\"Semua bagus, terima kasih\"", cls:"meh",
      text:`Kamu tersenyum, bilang "semua bagus", bayar penuh untuk berdua, dan keluar ke panas terik. Teplinka langsung ceria: untung nggak jadi drama.<br><br>Sepanjang jalan pulang kalian membahas apa yang harus dilakukan: tulis ke manajer lewat WhatsApp, kasih bintang di peta, atau nggak usah kembali ke sini lagi. Sampai malam kalian takkan lakukan satu pun dari ketiganya, dan kamu dua kali mengecek apa suara Teplinka belum serak.<br><br>Tak ada yang tahu apa yang terjadi di spa ini — jadi pelanggan berikutnya akan diperlakukan sama.` },
    care:{ emoji:"🌺", title:"Sekarang mereka memberi tahu lebih dulu", cls:"good",
      text:`Sejamnya sudah tak bisa diputar balik — dan kamu memang tak memintanya. Ibu Kadek berterima kasih seolah kamu mengangkat beban dari hatinya, dan dia sendiri menawarkan lain kali menjadwalkan kalian ke Putu tanpa biaya tambahan. Wayan tetap dia pulangkan hari itu — dan sebelum berpisah dia bilang hal yang tak kamu duga: "Datanglah ke dia lagi kalau sudah sembuh. Dia akan senang kalian nggak marah."<br><br>Dan mulai minggu depan, manajer di WhatsApp akan mulai menulis lebih dulu: "hari ini satu terapis sakit — mau dijadwal ulang atau ganti yang lain?" Hal kecil yang tadinya tak ada — dan justru itulah yang kamu inginkan.<br><br>Kamu mengatakan kebenaran di momen semua orang biasanya bilang "semua bagus" — dan tak ada yang jadi tersalahkan karenanya.` },
  },
  debrief:`Percakapan ini soal jebakan tersering orang-orang sopan: <b>berbohong "semua bagus", atau mencari kambing hitam</b>. Dan kambing hitam sekarang bisa dicari dari jauh — lewat WhatsApp atau peta, tanpa harus menatap mata orangnya. Pilihan ketiga — mengatakan kebenaran di sini dan sekarang tanpa menghancurkan siapa pun — kelihatannya mustahil, sampai kamu coba sendiri.<br><br>Kesulitan khusus adegan ini: <b>tak ada lagi yang bisa diperbaiki</b>. Pijatnya sudah lewat, sejamnya tak bisa diputar balik. Karena itu permintaan yang "kuat" di sini tak melihat ke belakang (kembalikan uang, ulangi), tapi ke depan: supaya lain kali diberi tahu lebih dulu. Ketika yang rusak sudah tak bisa diputar ulang, satu-satunya permintaan yang bekerja adalah tentang apa yang masih akan datang.<br><br>Kuncinya adalah <b>di balik "layanan buruk" hampir selalu ada kebutuhan seseorang</b>: Wayan mengambil shift orang lain bukan karena tak menghormati, tapi karena hari tanpa kerja tak dibayar baginya. Ini tak membatalkan kebutuhanmu — dan kebutuhanmu tak membatalkan kebutuhannya. Langkah terkuat dalam game ini justru begini: "aku kasihan sama Wayan, dan di saat yang sama aku takut Teplinka jatuh sakit — keduanya benar."<br><br>Jebakan-jebakannya sama seperti di cerita selam, tapi berbalut kesopanan: <b>penilaian menggantikan observasi</b> ("kalian menaruh terapis yang sakit untuk kami"), <b>pikiran sebagai perasaan</b> ("aku merasa kalian nggak peduli"), kata-kata vonis ("dibohongi", "dimanfaatkan"), <b>strategi menggantikan kebutuhan</b> ("yang sakit nggak boleh masuk kerja") dan <b>ancaman menggantikan permintaan</b> ("kalian selesaikan atau kutulis ulasan"). Plus tiga akhir yang kelihatan seperti tindakan tapi sebenarnya bentuk pelarian: diam saja, menulis ke manajer, dan kasih bintang.`
});
