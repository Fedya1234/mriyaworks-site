"use strict";
/* ---------- 3. Telepon Pulang ---------- */
Amedi.stories.register("id","mama", {
  em:"📞", title:"Telepon Pulang", who:"Mama", diff:"paling dalam",
  desc:"Video call ke Ukraina. \"Tetanggaku, anaknya Tolik, tiap minggu pulang, sedangkan anakku sendiri...\" Enam tahun, tiga ribu kilometer, dan satu orang yang rindu.",
  storageKey:"mama_endings",
  start:{wall:45,contact:15},
  intro:`Sabtu siang di Bali — pagi hari di Kyiv. Kamu belum telepon Mama tiga minggu: mulai dari kursus freediving, lalu rilis proyek, lalu jadi canggung sendiri karena sudah lama nggak telepon. Enam tahun sejak kamu pergi. Dia belum pernah lihat laut tempat kamu menyelam, atau orang yang kamu tinggali. Nada sambung. Kedua kali. "Aduh, akhirnya..."`,
  nodes:{
    n1:{
      npc:()=>`Aduh, akhirnya. Kukira nomorku sudah kamu hapus. Anaknya Bu Lyuda, si Tolik, tiap minggu pulang dari Warsawa, bantuin gali kebun. Anakku sendiri — sebulan sekali telepon, itu pun kayak harus daftar dulu ke kementerian.`,
      options:[
        { icon:"🛡", tag:"Pembelaan", cls:"bad", dw:+15, dc:0,
          text:`Ma, ini mulai lagi. Dari Warsawa cuma semalam perjalanan, dari Bali tiga hari dan seribu lima ratus dolar. Beda kali, Ma.`,
          react:()=>`Terus siapa yang nyuruh kamu ke seberang lautan? Kata Lyuda, sekarang orang IT juga banyak di sini, laut sendiri juga ada di Odesa...`,
          coach:`Kamu menjawab kata-katanya, bukan rasa sakitnya. Sekarang dia membela kekesalannya dengan fakta — dan dia punya lebih banyak fakta.` },
        { icon:"🔥", tag:"Kesal", cls:"bad", dw:+22, dc:0, aggro:1,
          text:`Ma, kalau kamu mau bahas Tolik sepanjang telepon ini, aku telepon lagi aja pas dia sudah pulang.`,
          react:()=>`Oh begitu ya. Aku sampai nggak boleh ngomong apa-apa lagi. Maaf udah ganggu.`,
          coach:`Sarkasme membalas kritik. Dia tersinggung — dan sekarang percakapan menggantung di ambang.` },
        { icon:"💙", tag:"Empati", cls:"good", dw:-18, dc:+15,
          text:`Kamu kangen. Dan mungkin terasa nggak adil — anak tetangga terlihat tiap minggu, anak sendiri cuma sebulan sekali lewat HP. Aku memang lama nggak telepon, Ma.`,
          react:s=> s.wall>=60 ? `...Ah sudahlah. Cerita aja, ada apa telepon.` : `...Aku bukan mau nyalahin, Nak. Aku cuma... ya kangen aja. Duduk di sini, lihat kamu di HP.`,
          coach:`Di balik "Tolik" bukan tuntutan, tapi "aku kangen kamu". Kamu menjawab itu — dan kritiknya mencair.` },
        { icon:"💸", tag:"Tebusan uang", cls:"meh", dw:+3, dc:+3, fake:1,
          text:`Ma, hari ini kukirim uang, beli yang enak-enak ya, jangan sedih.`,
          react:()=>`Nggak perlu uangmu, semua sudah cukup di sini. Yang kubutuhkan kamu sendiri, bukan transferanmu.`,
          coach:`Uang itu bahasa kepedulianmu. Tapi dia baru saja bilang persis apa yang dia butuhkan sesungguhnya.` },
      ],
      next:"n2"
    },
    n2:{
      enter:{dw:+6, note:"Mama tidak menahan diri — kekesalan yang terkumpul tiga minggu ini keluar begitu saja"},
      npc:s=> s.wall<55
        ? `Kangen... Ah aku udah biasa sendiri. Tensiku naik-turun lagi, harga obat di apotek gila-gilaan, untung Lyuda suka mampir cek apa aku masih hidup. Kamu di sana menyelam terus... dalam nggak sih?`
        : `Ah, gimana aku, apa pentingnya. Hidup pelan-pelan aja. Tensi naik-turun, ya sudahlah — siapa yang peduli.`,
      options:[
        { icon:"😔", tag:"Rasa bersalah", cls:"meh", dw:+3, dc:+3, fake:1,
          text:`Ma, jangan bilang gitu, aku jadi merasa anak yang jahat banget. Aku tahu aku nggak ada di dekatmu, aku ngerti semuanya...`,
          react:()=>`Kamu bukan anak jahat, ngomong apa sih. Kamu yang terbaik. Ini aku aja yang tua, jadi cerewet...`,
          coach:`Rasa bersalahmu memaksa dia menenangkanmu balik. Kalian bertukar peran — dan kesepiannya lagi-lagi tak diperhatikan.` },
        { icon:"💙", tag:"Dengar ketakutannya", cls:"good", dw:-16, dc:+20,
          text:`Ma, tunggu. Kamu kesepian dan takut — tensi naik-turun, dan nggak ada keluarga di dekatmu. Dan kamu mau tahu kalau aku ada bersamamu, walau jauh. Iya kan?`,
          react:s=> s.wall>=60 ? `...Ya tentu saja. Jelas aku mau.` : `...Iya, Nak. Persis begitu. Aku bukan nggak setuju sama Balimu. Aku nggak setuju kalau seolah aku udah nggak dibutuhkan.`,
          coach:`Di balik "apotek" dan "Lyuda" tersembunyi ketakutan dan kesepian. Kamu menyebutnya — dan untuk pertama kali dalam telepon ini dia bicara, bukan mengomel.` },
        { icon:"🛡", tag:"Ganti topik", cls:"meh", dw:+5, dc:0, fake:1,
          text:`Kata dokter gimana soal tensinya? Obat yang kupesankan itu diminum kan?`,
          react:()=>`Diminum, diminum. Kata dokter — ini gara-gara saraf. Dan obat buat saraf katanya nggak ada...`,
          coach:`Peduli soal tensi memang baik. Tapi kamu memindahkan percakapan dari perasaan ke medis — tempat yang lebih aman buatmu.` },
        { icon:"🔥", tag:"Kesal capek", cls:"bad", dw:+18, dc:0, aggro:1,
          text:`Ma, kok kamu selalu gini — tensi, apotek, Lyuda. Bisa nggak sekali aja kita ngobrol yang normal?`,
          react:()=>`Ini hidupku ya seperti ini — tensi, apotek, dan Lyuda. Yang lain nggak tersedia. Maaf ya bukan Bali.`,
          coach:`Rutinitasnya itulah hidupnya. Kamu meremehkan itu — kamu juga meremehkan dirinya.` },
      ],
      next:"n3"
    },
    n3:{
      npc:s=> s.wall<55
        ? `...Aku nggak minta apa-apa kok, Nak. Aku cuma nggak ngerti gimana kamu di sana. Enam tahun — aku bahkan belum pernah lihat tempat tinggalmu. Kamu bahagia di sana? Jujur aja.`
        : `Ya sudahlah. Cerita cepat aja, kamu di sana gimana, kan pasti sibuk.`,
      options:[
        { icon:"🗣", tag:"Kejujuran", cls:"good", dw:-10, dc:+22,
          text:`Jujur? Bahagia. Ada laut yang akhirnya aku dengarkan, pekerjaan yang menarik, dan orang yang membuatku hangat. Dan aku sedih semua ini cuma kamu tahu dari kata-kataku. Aku mau kamu lihat sendiri.`,
          react:s=> s.wall>=60 ? `...Yang penting bahagia, sudah bagus.` : `...Ah. Syukurlah. Aku cuma mau itu, kamu bahagia. Tunjukin lautmu itu, dong? Lewat HP aja boleh?`,
          coach:`Bahagia yang jujur bukan pengkhianatan bagi mereka yang jauh. Kamu bicara soal kebahagiaan dan rasa sakit rindu sekaligus — itulah kejujuran seutuhnya.` },
        { icon:"🌫", tag:"Formal", cls:"meh", dw:+3, dc:+3, fake:1,
          text:`Ah semua baik, Ma. Kerja, nyelam pelan-pelan. Semua seperti biasa, nggak ada yang perlu diceritain.`,
          react:()=>`"Baik"... Ya sudah. Aku juga baik-baik saja kalau begitu.`,
          coach:`Dia tanya "apa kamu bahagia" — dan dapat laporan. "Baik"-mu dia pantulkan balik dengan "baik"-nya sendiri.` },
        { icon:"😅", tag:"Bercanda", cls:"meh", dw:+5, dc:0,
          text:`Bahagia, Ma, bahagia. Kulitku gosong, jadi awet muda, mau jadi ikan aja aku, insang udah mau tumbuh.`,
          react:()=>`Semua buatmu bercandaan. Aku serius tanya, dia malah cerita soal insang.`,
          coach:`Dia berani tanya hal yang penting — dan candamu menutup pintu itu. Ini hanya terjadi setengah tahun sekali dengan dia.` },
        { icon:"🛡", tag:"Serangan balik", cls:"bad", dw:+15, dc:0,
          text:`Kamu pernah nggak tanya tanpa nyebut "Tolik" di awal? Mungkin makanya aku nggak pernah cerita apa-apa.`,
          react:()=>`...Baiklah. Berarti aku juga yang salah. Maaf, ibu memang begini adanya.`,
          coach:`Mungkin memang benar. Tapi diucapkan sebagai serangan balik, itu jadi tuduhan, dan Mama menutup diri.` },
      ],
      next:"n4"
    },
    n4:{
      npc:()=>`...Ya sudah, Nak. Kamu pasti sibuk. Telepon kadang-kadang ya, jangan lupain ibu tua ini.`,
      options:[
        { icon:"✅", tag:"Ritual konkret", cls:"good", dw:-5, dc:+20, endsRun:true,
          text:`Ma, gini aja: tiap Minggu, jam sepuluh pagi waktu kamu — telepon kita. Aku catat di kalender sekarang, lihat — aku catat beneran. Dan besok aku telepon dari pantai, kutunjukin lautnya. Dan aku kenalkan Beruang, dia udah lama minta.`,
          react:s=> s.contact>=60 ? `...Tiap Minggu? Aduh... nah kamu sendiri yang bilang, sekarang aku bakal nunggu! Tunjukin lautnya, dan pacarmu juga! Aku bakal cerita ke Lyuda...` : `Ya, kalau sempat, Nak, kalau sempat. Aku ngerti, sibuk.`,
          coach:`Bukan "akan lebih sering telepon", tapi hari, jam, dan janji untuk besok. Bagi orang yang menunggu, jadwal adalah cinta.` },
        { icon:"✈️", tag:"Rencana besar", cls:"good", dw:-5, dc:+18, endsRun:true,
          text:`Ma, gimana kalau kita serius pikirin kamu datang ke sini sebulan, waktu tiket lagi murah. Aku yang urus semua — visa, tiket, jemput di bandara. Kamu bakal lihat lautnya, rumahnya, dan orangku. Ini bukan "kapan-kapan" — ayo Desember.`,
          react:s=> s.contact>=60 ? `...Aduh, ke mana lagi aku terbang, udah tua... Terus... visanya gimana ya? Kucingku siapa yang jagain?.. Kamu serius, Nak?` : `Ah, mana bisaku terbang, Nak. Kamu aja yang pulang... kapan-kapan.`,
          coach:`"Datang ke sini" — permintaan yang tidak berani dia ucapkan sendiri. Kamu mengucapkannya untuk dia — dengan tanggal.` },
        { icon:"🌫", tag:"Samar", cls:"meh", dw:0, dc:+3, fake:1, endsRun:true,
          text:`Aku akan lebih sering telepon, Ma, janji. Kamu jaga diri ya di sana.`,
          react:()=>`Oke, Nak. Kamu juga jaga diri. Ya sudah, hati-hati...`,
          coach:`"Lebih sering" adalah kata yang tak menjanjikan apa-apa. Setelah tiga minggu diam, itu akan jadi bukti lain lagi.` },
        { icon:"🛡", tag:"Kabur", cls:"meh", dw:+5, dc:0, fake:1, endsRun:true,
          text:`Ya, Ma, aku harus buru-buru nih. Telepon aja kalau ada yang mendesak, ya?`,
          react:()=>`Sana, sana. Kamu pasti lagi sibuk di sana... Ya sudah, cium sayang.`,
          coach:`"Telepon kalau mendesak" — dia takkan telepon. Yang mendesak baginya adalah saat semua sudah terlambat.` },
      ],
      next:null
    }
  },
  endings:{
    wall:{ emoji:"🧊", title:"\"Ya sudah, dah\"", cls:"bad",
      text:`"Ya sudah, nggak usah kutahan kamu lama-lama. Hati-hati ya." Layar padam. Kamu duduk dengan HP: panggilan berlangsung sebelas menit, sepuluh menit di antaranya kalian saling membela diri. Sekarang dia cerita ke Lyuda kalau "anaknya sibuk, tapi baik-baik saja". Telepon berikutnya akan lebih berat.` },
    fight:{ emoji:"💥", title:"Tersinggung", cls:"bad",
      text:`"Maaf udah ganggu. Nggak akan lagi." Dia menutup telepon duluan. Seminggu ke depan dia tak mau angkat telepon "karena sibuk", dan kamu membawa campuran marah dan bersalah di dada — koktail khas keluarga yang resepnya sudah tak ada yang ingat.` },
    truce:{ emoji:"🌫", title:"Telepon rutin", cls:"meh",
      text:`Bicara soal tensi, harga, dan Lyuda. Berpamitan dengan hangat. Semua "baik-baik saja". Tapi yang paling penting lagi-lagi tak terjadi: dia tak tahu apa kamu bahagia, kamu tak tahu betapa kesepiannya dia. Satu lagi telepon rutin masuk koleksi telepon rutin. Sudah enam tahun begini.` },
    contact:{ emoji:"☀️", title:"Nak", cls:"good",
      text:`Kalian bicara satu jam dua puluh menit. Dia menangis sekali — waktu kamu bilang soal Minggu. Lalu mencatat di buku catatan kertas: "Minggu, 10:00". Besok kamu akan telepon dari pantai, dan untuk pertama kalinya dalam enam tahun dia akan lihat lautmu. Dan bilang ke Lyuda. Ya, dia pasti bilang ke Lyuda.` },
  },
  debrief:`Kunci percakapan ini: <b>kritik adalah cinta yang tak tahu cara meminta</b>. Di balik "Tolik" — "aku kangen kamu", di balik "apotek" — "aku takut sendirian". Balas terjemahannya, bukan kata-katanya.<br><br>Dan soal akhirnya: bagi orang yang menunggu, ritual konkret ("tiap Minggu jam sepuluh") lebih berarti daripada janji "lebih sering" apa pun. Jadwal adalah cinta, ketika di antara kalian ada tiga ribu kilometer.`
});
