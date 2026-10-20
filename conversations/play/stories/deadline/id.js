"use strict";
/* ---------- 2. Tenggat Waktu ---------- */
Amedi.stories.register("id","deadline", {
  em:"📵", title:"Tenggat Waktu", who:"Max", diff:"lebih keras",
  desc:"Kamu gagal kirim build hari Jumat. Klien telepon di Minggu malam: besok ada investor. Max bukan penganut komunikasi tanpa kekerasan: dia berteriak, menekan, dan menyerang pribadi.",
  storageKey:"deadline_endings",
  start:{wall:55,contact:5},
  intro:`Minggu, jam sembilan malam. Kamu janji ke Max build prototipe stabil sebelum Jumat — tapi AI agent di game mulai jalan muter-muter terus, dan kamu dua hari ngejar bug itu. Kamu nggak berani bilang soal keterlambatan itu: pikirmu, masih sempat. Ternyata nggak. HP bergetar: Max. Besok dia ada meeting sama investor.`,
  nodes:{
    n1:{
      npc:()=>`Kamu bilang — Jumat. Sekarang Minggu, dan aku belum punya build. Besok jam sepuluh aku presentasi game ke investor. Kamu sadar nggak sih kamu udah bikin aku malu?`,
      options:[
        { icon:"🛡", tag:"Alasan", cls:"bad", dw:+14, dc:0,
          text:`Max, ada bug di agent, nggak jelas penyebabnya, ini bukan salahku — hal begini biasa terjadi dalam pengembangan.`,
          react:()=>`"Biasa"?! Besok ada investor, dan buatmu ini "biasa"! Aku harus tunjukkin bugmu ke dia?`,
          coach:`Faktanya benar, tapi sekarang terdengar seperti "masalahmu bukan masalah". Kepanikannya tetap tak terdengar.` },
        { icon:"🔥", tag:"Serangan balik", cls:"bad", dw:+20, dc:0, aggro:1,
          text:`Coba kita ingat, siapa yang tiga kali ganti spesifikasi bulan lalu? Aku bukan penyihir.`,
          react:()=>`Oh-oh-oh, aku lagi yang salah! Hebat! Mungkin aku juga harus nulis kodenya sendiri buatmu?`,
          coach:`Bahkan kritik yang adil sekarang jadi eskalasi. Sekarang kalian berdua bertahan, dan tak ada yang menyelamatkan meeting besok.` },
        { icon:"🎯", tag:"Akui fakta", cls:"good", dw:-15, dc:+12,
          text:`Ya. Aku janji Jumat dan nggak sanggup. Dan aku nggak kasih kabar — itu yang paling buruk. Kamu marah, dan besok kamu ada meeting. Biar aku ceritain kita sebenarnya di mana.`,
          react:s=> s.wall>=60 ? `...Ya udah. Bicara. Tapi jangan bohong.` : `...Oke. Bicara. Kita di mana sekarang?`,
          coach:`Mengakui fakta tanpa menyalahkan diri sendiri — cara tercepat menghentikan serangan: tak ada yang bisa diperdebatkan.` },
        { icon:"🙇", tag:"Merunduk", cls:"meh", dw:+3, dc:+3, fake:1,
          text:`Maaf-maaf-maaf. Malam ini aku begadang dan pagi semuanya akan selesai, janji!`,
          react:()=>`Begadang? Terus besok jam sembilan pagi kamu bawa kode kebut semalam ke meeting investor? Rencana bagus banget.`,
          coach:`Panik dibalas panik. Janji yang tak realistis — dan dia tahu itu. Ini tak menambah kepercayaan.` },
      ],
      next:"n2"
    },
    n2:{
      enter:{dw:+8, note:"Max bukan penganut komunikasi tanpa kekerasan: dia masih mendidih, dan temboknya naik sendiri"},
      npc:s=> s.wall<55
        ? `"Kita di mana"... Kita di dasar jurang — itu di mananya! Aku pinjam uang buat proyek ini, kamu tahu nggak? Mungkin aku emang bayar orang yang salah, ya?`
        : `Tahu nggak, sekarang aku nggak peduli lagi kita di mana. Aku cuma penasaran kenapa aku bayar orang yang selalu telat dan diem aja.`,
      options:[
        { icon:"🚧", tag:"Batasan", cls:"good", dw:-15, dc:+15,
          text:`Stop. Aku mau selesaikan ini hari ini, dan aku nggak akan kabur. Tapi mari fokus fakta: soal build dan meeting — oke. Soal "orang yang salah" — nggak. Begitu kita nggak bakal selesai apa-apa.`,
          react:s=> s.wall>=60 ? `...Oke. Oke! Fokus fakta. Kamu usulin apa?` : `...Baik. Maaf. Bilang aja apa yang harus kulakukan soal besok.`,
          coach:`Batasan bukan serangan, bukan pula hinaan. Kamu tidak melarangnya marah — kamu cuma bilang apa yang mau dibahas dan apa yang tidak.` },
        { icon:"🌫", tag:"Menelan", cls:"meh", dw:+5, dc:0, fake:1,
          text:`...Ya, ngerti. Bilang aja apa yang harus kulakukan, akan kulakukan.`,
          react:()=>`Apa yang harus dilakukan?! Bikinin aku mesin waktu! Aduh... Terus sekarang gimana soal besok, jenius?`,
          coach:`Kamu menelan "orang yang salah" — dan dia akan mengingatnya sebagai hal yang normal. Batasan yang tak ditegakkan akan hilang.` },
        { icon:"🔥", tag:"Balas dendam", cls:"bad", dw:+20, dc:0, aggro:1,
          text:`Orang yang salah? Ya cari yang lain deh. Lihat aja siapa yang bakal nulis agent buatmu dalam seminggu.`,
          react:()=>`Kamu ngancem aku? Aku?! Tahu nggak...`,
          coach:`Ultimatum dibalas hinaan. Sekarang ini bukan lagi soal build — ini soal siapa yang mendesak siapa duluan.` },
        { icon:"🙇", tag:"Diskon", cls:"meh", dw:0, dc:+3, fake:2,
          text:`Dengar, bulan ini aku kerjain setengah harga. Tapi udahan teriak-teriaknya, oke?`,
          react:()=>`...Setengah harga. Ya lumayan. Tapi ini nggak ngebatalin besok, kamu paham kan?`,
          coach:`Kamu beli keheningan dengan uang. Rasa terhina tetap ada — dan diskon ini jadi ekspektasi.` },
      ],
      next:"n3"
    },
    n3:{
      npc:s=> s.wall<55
        ? `...Investor ini satu-satunya orang yang masih percaya sama proyek ini. Kalau besok gagal — habis, kita tutup. Makanya aku marah begini.`
        : `Singkat aja. Besok jam sepuluh. Apa yang benar-benar bisa kamu tunjukkan? Jujur aja, jangan "hampir selesai".`,
      options:[
        { icon:"💙", tag:"Empati", cls:"good", dw:-12, dc:+20,
          text:`Jadi yang dipertaruhkan bukan cuma build, tapi seluruh proyek — dan sekarang kamu sendirian, dengan uang pinjaman, bergantung padaku. Aku dengar. Ini memang menakutkan.`,
          react:s=> s.wall>=60 ? `...Ya. Kira-kira begitu.` : `...Ya. Persis begitu. Maaf aku meledak. Tekanannya datang dari semua arah.`,
          coach:`Di balik setiap teriakan ada rasa takut. Kamu menyebut ketakutannya tanpa menghakimi — dan untuk pertama kalinya dalam percakapan ini dia menghela napas.` },
        { icon:"🛡", tag:"Menenangkan dengan logika", cls:"bad", dw:+12, dc:0,
          text:`Ah, cari aja investor lain, di Bali banyak kayak anjing. Nggak usah drama.`,
          react:()=>`"Nggak usah drama"?! Kamu pinjam setengah miliar rupiah, terus kamu ceramahin aku soal drama!`,
          coach:`"Nggak usah drama" berarti "perasaanmu salah". Setelah itu, tembok hanya akan makin tinggi.` },
        { icon:"🗣", tag:"Keadaan sejujurnya", cls:"good", dw:-5, dc:+15,
          text:`Aku merasa buruk karena mengecewakanmu — dan aku ingin membalasnya dengan tindakan. Aku jujur: build stabil — Selasa. Tapi malam ini aku bakal rekam video demo agent yang benar-benar main. Untuk meeting pertama, mungkin ini cukup.`,
          react:()=>`Video demo... Hmm. Kamu yakin ada yang bisa ditunjukkan? Tanpa muter-muter?`,
          coach:`Tenggat yang jujur plus alternatif nyata untuk besok. Inilah tanggung jawab — tanpa menyalahkan diri dan tanpa dusta.` },
        { icon:"😅", tag:"Bercanda", cls:"meh", dw:+8, dc:0,
          text:`Ya, tapi sekarang kita punya agent yang bisa simulasi prokrastinasi dengan sempurna. Hampir kayak manusia.`,
          react:()=>`Lucu banget. Besok aku ketemu investor, kamu malah stand-up comedy.`,
          coach:`Humor melepaskan ketegangan saat sudah ada keterhubungan. Kalau belum ada, ini terdengar seperti cuek.` },
      ],
      next:"n4"
    },
    n4:{
      npc:()=>`Baik. Bilang jelas: apa yang akan kupegang besok jam sepuluh, dan apa yang selanjutnya soal tenggat. Dan jangan bilang "akan berusaha", tolong.`,
      options:[
        { icon:"✅", tag:"Rencana jelas", cls:"good", dw:-5, dc:+20, endsRun:true,
          text:`Malam ini sampai tengah malam — video demo agent plus build minggu lalu, yang itu stabil. Selasa, jam 18:00 — build baru. Dan aturan baru: kalau aku lihat ada risiko telat — kukabari 48 jam sebelumnya, bukan diam. Ini kesalahanku, dan nggak akan terulang.`,
          react:s=> s.contact>=60 ? `...Deal. Kirim videonya kalau sudah jadi. Dan... makasih nggak nyerang balik setelah "orang yang salah" itu. Aku kelewatan.` : `Oke. Video sampai tengah malam. Kita lihat.`,
          coach:`Konkret: apa, kapan, dan aturan baru soal peringatan dini. Diamnya soal risiko itulah yang merusak kepercayaan — kamu memperbaiki penyebabnya, bukan cuma akibatnya.` },
        { icon:"🤝", tag:"Rencana + batasan", cls:"good", dw:-5, dc:+18, endsRun:true,
          text:`Video demo malam ini, build Selasa jam 18:00. Dan mari sepakat untuk ke depan: aku sebut tenggat dengan buffer, dan kamu telepon aku tanpa "orang yang salah" — bahkan saat kepepet. Kalau nggak, kita akan saling menghancurkan.`,
          react:s=> s.contact>=60 ? `...Jujur? Adil. Deal. Kirim videonya.` : `Kita lihat. Video dulu, baru kesepakatan.`,
          coach:`Kamu menyelesaikan hari esok sekaligus aturan main ke depan — untuk kedua belah pihak. Ini kesepakatan dewasa, bukan menyerah.` },
        { icon:"🌫", tag:"Samar", cls:"meh", dw:0, dc:+3, fake:1, endsRun:true,
          text:`Aku akan lakukan semua yang aku bisa supaya besok ada yang ditunjukkan. Percaya aku.`,
          react:()=>`"Semua yang bisa"... Aku udah dengar itu hari Senin. Baiklah. Kita lihat.`,
          coach:`"Semua yang bisa" sama saja dengan "akan berusaha" yang tadi dia minta jangan diucapkan. Kepercayaan diperbaiki dengan hal konkret, bukan jaminan kosong.` },
        { icon:"🙇", tag:"Aksi heroik semalam", cls:"meh", dw:+3, dc:0, fake:1, endsRun:true,
          text:`Aku nggak tidur malam ini. Sampai jam sembilan pagi build lengkap sudah jadi, sumpah.`,
          react:()=>`...Jangan sampai kamu kasih aku barang mentah, tolong. Lebih baik sedikit tapi berfungsi.`,
          coach:`Janji heroik dengan kemungkinan gagal tinggi. Kalau jam sembilan buildnya masih mentah — itu akhir kepercayaan, bukan penyelamatan.` },
      ],
      next:null
    }
  },
  endings:{
    wall:{ emoji:"🧊", title:"Nada sambung", cls:"bad",
      text:`"Tahu nggak, aku udah bosan." Telepon ditutup. Semenit kemudian — pesan: "Besok setelah meeting kita bicarakan soal kerja samanya." Kamu duduk dengan HP di tangan. Build mungkin bisa kamu selesaikan. Tapi bagaimana menyelesaikan percakapan ini — kamu sudah tak tahu.` },
    fight:{ emoji:"💥", title:"Putus", cls:"bad",
      text:`Kalian bilang semuanya satu sama lain: soal spesifikasi, soal uang, soal "cari yang lain". Max menutup telepon. Paginya datang pesan singkat: "Kirim source code dan tagihan untuk pekerjaan yang sudah selesai." Proyek yang kamu curahkan setengah tahun berakhir Minggu malam.` },
    truce:{ emoji:"🌫", title:"Merunduk", cls:"meh",
      text:`Kamu janjikan segalanya dan lebih — build semalam, diskon, "semua yang bisa". Max sedikit reda dan menutup telepon hampir puas. Tapi kamu duduk dengan rahang mengeras: tak ada yang menegakkan batasan, dan lain kali dia akan langsung mulai dengan "orang yang salah". Ini akan jadi normal buat kalian.` },
    contact:{ emoji:"🤝", title:"Kesepakatan", cls:"good",
      text:`Video demo terkirim jam 23:40. Paginya Max menulis: "Investornya suka. Dia tanya, boleh kenalan sama developer agent-nya?" Kamu bertahan dari teriakan, tak merunduk, tak meledak — dan menyebut tenggat yang jujur. Ternyata itulah yang terdengar sebagai profesionalisme.` },
  },
  debrief:`Tiga alat percakapan ini: <b>akui fakta</b> tanpa menyalahkan diri (tak ada yang bisa diperdebatkan) → <b>batasan</b> ("soal fakta — ya, soal aku pribadi — tidak") → <b>tenggat jujur + alternatif</b> alih-alih janji heroik.<br><br>Dan aturan soal ketidakadilan: di balik teriakan hampir selalu ada rasa takut. Tapi mendengar ketakutannya bukan berarti membiarkan diri diinjak. Empati dan batasan bekerja hanya bersama-sama.`
});
