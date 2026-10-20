"use strict";
/* ---------- 1. Malam di Amed ---------- */
Amedi.stories.register("id","amedi", {
  em:"🌅", title:"Malam di Amed", who:"Beruang", diff:"pemanasan",
  desc:"Kamu lupa janji nonton matahari terbenam di Jemeluk. Beruang menunggu dua jam. Klasik diplomasi rumah tangga.",
  storageKey:"amedi_endings",
  start:{wall:40,contact:10},
  intro:`Amed, Bali. Jam sembilan malam. Kamu baru pulang dari fun dive — keluar dari air terlambat, lalu lama bersihin alat, lalu instruktur ngajak ngopi. HP mati dari siang. Di tengah jalan pulang, kamu baru ingat: hari ini kamu dan Beruang janji nonton matahari terbenam di Jemeluk. Sunsetnya sudah dua jam lalu. Di teras lampu menyala. Beruang duduk dengan secangkir teh, HP menghadap ke bawah.`,
  nodes:{
    n1:{
      npc:()=>`Oh. Masih hidup ternyata. Aku sampai telepon ke dive center — kupikir setidaknya mereka tahu kamu di mana. Makan malam di dapur, kalau mau. Sudah dingin.`,
      options:[
        { icon:"🛡", tag:"Alasan", cls:"bad", dw:+12, dc:0,
          text:`Sayang, HP-ku mati, dan kami keluar dari air telat — ada arus di sana, aku benar-benar nggak bisa kasih kabar.`,
          react:()=>`Kamu selalu punya alasan. Arus, tabung, kumpul-kumpul. Aku udah hafal luar kepala daftar ini.`,
          coach:`Alasan adalah membela diri. Dua jam cemasnya dia tetap tidak terdengar, jadi tembok makin tinggi.` },
        { icon:"🔥", tag:"Serangan", cls:"bad", dw:+25, dc:0, aggro:1,
          text:`Aku seharian di laut, capek banget. Bisa nggak sih hari ini tanpa interogasi?`,
          react:()=>`Interogasi?.. Oke. Nggak ada interogasi. Nggak ada apa-apa sama sekali.`,
          coach:`Serangan balik — sekarang dia bertahan, bukan ngobrol. Satu langkah lagi seperti ini, dan meledak.` },
        { icon:"💙", tag:"Empati", cls:"good", dw:-18, dc:+15,
          text:`Dua jam kamu nggak tahu aku di mana... Kamu kesal, karena ini bukan yang pertama kali — aku menghilang, dan kamu menunggu?`,
          react:s=> s.wall>=60 ? `...Nggak usah pakai trik-trik psikologis sekarang. Makan dulu, sebelum makin kering.` : `...Aku nggak marah. Aku sendiri udah nggak tahu aku ini apa. Makan dulu, sebelum makin kering.`,
          coach:`Menebak perasaannya — walau tidak tepat — menunjukkan kamu memperhatikan dia. Tembok jadi lebih rendah.` },
        { icon:"🔧", tag:"Solusi cepat", cls:"meh", dw:+5, dc:+3, fake:1,
          text:`Ya udah, ya udah, aku di sini kok. Besok kita pasti ke Jemeluk, janji.`,
          react:()=>`Jumat lalu juga kamu janji. "Pasti". Aku masih ingat.`,
          coach:`Solusi cepat tanpa bicara soal perasaan — plester di luka yang bahkan belum kamu lihat.` },
      ],
      next:"n2"
    },
    n2:{
      npc:s=> s.wall<50
        ? `Ini bukan soal hari ini aja. Cuma... kamu menghilang terus. Laut, kursus-kursus, proyekmu, sekarang AI-mu juga. Aku sendirian seharian di surga ini. Tahu nggak rasanya — dikelilingi surga, tapi kamu di dalamnya cuma kayak perabotan?`
        : `Ah, nggak apa-apa. Semua baik-baik aja. Aku udah biasa sendirian di sini dengan semuanya.`,
      options:[
        { icon:"🛡", tag:"Logika", cls:"bad", dw:+18, dc:0,
          text:`Beruang, kamu kan tahu ke mana kita mau pindah. Kita berdua yang milih Amed — di sini cuma ada dua pilihan, laut atau bosan.`,
          react:()=>`"Kita" yang milih? Kamu yang milih. Aku milih kamu. Itu beda.`,
          coach:`Logika melawan perasaan selalu kalah: dia dengar "emosimu salah".` },
        { icon:"💙", tag:"Empati", cls:"good", dw:-20, dc:+25,
          text:`Kamu kesepian. Kamu mau merasa jadi bagian hidupku — bukan sesuatu setelah laut dan proyek, tapi di sampingku. Iya kan?`,
          react:s=> s.wall>=60 ? `...Nggak tahu. Mungkin. Udah nggak penting lagi.` : `...Iya. Persis itu. Aku nggak masalah sama lautmu. Aku masalah sama rasa seolah aku nggak ada.`,
          coach:`Kamu menyebut kebutuhannya dengan kata-kata. Ketika orang mendengar kebutuhannya diungkapkan — pertahanan runtuh.` },
        { icon:"🗣", tag:"Kejujuran", cls:"good", dw:-8, dc:+15,
          text:`Aku takut dengar ini. Kukira semuanya baik-baik saja di antara kita, dan aku sedih kamu merasa kesepian di sini.`,
          react:()=>`Jadi kenapa aku harus bikin drama dulu supaya kamu akhirnya dengar ini?`,
          coach:`Jujur tentang dirimu — bagus. Tapi dia belum merasa didengar: dulukan perasaannya, baru perasaanmu.` },
        { icon:"🔧", tag:"Solusi cepat", cls:"meh", dw:+3, dc:+5, fake:1,
          text:`Ya, ngerti. Kita bikin jadwal aja: tiga hari nyelam, empat hari buat kita.`,
          react:()=>`Aku nggak mau jadi poin di jadwalmu, ngerti nggak? Aku mau... ah, lupain aja.`,
          coach:`Solusi terburu-buru memotong kata-katanya. Kebutuhannya belum sempat terucap.` },
      ],
      next:"n3"
    },
    n3:{
      npc:()=>`Kamu sebenarnya masih mau semua ini? Kita ini? Atau kamu cuma nyaman karena ada yang nunggu di rumah dengan makan malam siap?`,
      options:[
        { icon:"🗣", tag:"Kejujuran", cls:"good", dw:-10, dc:+25,
          text:`Mau. Kalau aku di bawah air — aku bahagia, dan sepanjang waktu itu aku ingin cerita ke kamu. Aku butuh laut dan kamu. Bukan pengganti. Berdua sekaligus.`,
          react:s=> s.wall>=60 ? `Ngomongnya bagus. Kata-katamu selalu jago.` : `...Berdua. Kata yang bagus. Aku udah lupa gimana rasanya dengar itu darimu.`,
          coach:`Perasaan + kebutuhan, tanpa membela diri atau menyalahkan. Ini kejujuran yang mendekatkan.` },
        { icon:"🛡", tag:"Pembelaan", cls:"bad", dw:+15, dc:0, aggro:1,
          text:`Apa sih pertanyaannya? Kalau nggak mau, aku nggak akan di sini. Logis kan?`,
          react:()=>`Logis. Semua buatmu logis.`,
          coach:`Dia berani tanya soal perasaan — dan yang dia dapat logika. Ini juga tembok, cuma versimu.` },
        { icon:"🔧", tag:"Pengorbanan diri", cls:"meh", dw:+8, dc:0, fake:1,
          text:`Kalau kamu mau, aku berhenti nyelam total. Bilang aja.`,
          react:()=>`Jangan berani-berani. Aku nggak minta itu. Jangan jadikan aku orang yang ngerebut lautmu.`,
          coach:`Pengorbanan diri bukan kedekatan. Ini tagihan yang nanti bakal kamu tuntut balik.` },
        { icon:"😅", tag:"Bercanda", cls:"bad", dw:+8, dc:-5,
          text:`Eh... ini semacam tes ya? Jawabanku bener nggak?`,
          react:()=>`Segala hal buatmu lucu.`,
          coach:`Bercanda di momen rentan itu bentuk lari. Dia berani terbuka, dan kamu malah kabur.` },
      ],
      next:"n4"
    },
    n4:{
      npc:()=>`Terus kita mau apain ini? Jangan bilang "semua bakal baik-baik aja", tolong.`,
      options:[
        { icon:"✅", tag:"Permintaan jelas", cls:"good", dw:-5, dc:+20, endsRun:true,
          text:`Kita sepakat dua malam seminggu — cuma buat kita: tanpa laut, tanpa laptop, tanpa HP. Dan kalau aku mulai menghilang lagi — bilang aja langsung, jangan dipendam sebulan. Deal?`,
          react:s=> s.contact>=60 ? `...Deal. Dan mulai sekarang juga — tehnya masih hangat kok. Duduk sini.` : `Deal. Lihat aja berapa lama ini bertahan.`,
          coach:`Permintaan konkret dan bisa dilaksanakan — bukan janji yang samar. Ini langkah terakhir NVC.` },
        { icon:"🌅", tag:"Rencana konkret", cls:"good", dw:-5, dc:+20, endsRun:true,
          text:`Besok jam lima — matahari terbit di Jemeluk. Cuma kita berdua, tanpa HP. Dan mulai sekarang setiap Kamis jadi malam kita. Tiap minggu. Nggak boleh diganggu gugat.`,
          react:s=> s.contact>=60 ? `Jam lima?.. Kamu kan tahu aku nggak pernah bangun jam lima. ...Baiklah. Tapi kamu yang bawa kopi.` : `Lihat aja apa rencana ini bertahan sampai besok.`,
          coach:`Permintaan konkret: waktu, tempat, tindakan. Bisa dilaksanakan — dan bisa dicek.` },
        { icon:"🔧", tag:"Samar", cls:"meh", dw:0, dc:+3, fake:1, endsRun:true,
          text:`Aku bakal lebih sering ada. Janji akan berusaha.`,
          react:()=>`Oke. Berusahalah.`,
          coach:`"Akan berusaha" nggak bisa dilaksanakan atau dicek. Ini bukan permintaan atau rencana.` },
        { icon:"🛡", tag:"Kabur", cls:"bad", dw:+10, dc:0, endsRun:true,
          text:`Dengar, kita lanjutin besok aja ya? Aku udah nggak bisa mikir setelah dari laut.`,
          react:()=>`Tentu. Besok. Seperti biasa.`,
          coach:`Percakapan sudah sampai ke inti — dan kamu kabur darinya. Besok tembok akan lebih tinggi.` },
      ],
      next:null
    }
  },
  endings:{
    wall:{ emoji:"🧊", title:"Tembok", cls:"bad",
      text:`Beruang diam-diam mengambil cangkirnya dan masuk ke rumah. Klik — kunci. Kamu tinggal sendirian di teras, dengan makan malam dingin dan suara jangkrik. Tembok yang kamu bangun bata demi bata sepanjang percakapan ini, kini tertutup dari dalam. Malam ini tak ada kata-kata yang bisa menembusnya.` },
    fight:{ emoji:"💥", title:"Pertengkaran", cls:"bad",
      text:`Kata demi kata — dan kalian sudah teriak soal hal yang terjadi tiga tahun lalu. Jemeluk sudah tak ada yang ingat. Anjing-anjing tetangga ikut meramaikan perdebatan. Malam ini akan panjang, dan paginya sunyi dan canggung.` },
    truce:{ emoji:"🌫", title:"Gencatan senjata", cls:"meh",
      text:`Kalian seolah berdamai. Dia bilang "oke", kamu menghela napas. Tapi hal yang paling penting tak ada yang mengucapkan: dia masih kesepian, dan kamu masih belum tahu seberapa dalam. Ini gencatan senjata, bukan perdamaian. Lain kali akan retak lebih dekat.` },
    contact:{ emoji:"🌅", title:"Terhubung", cls:"good",
      text:`Tehnya memang masih hangat. Beruang bercerita tentang bagaimana kalian dulu, waktu baru datang ke Amed — dan untuk pertama kalinya malam ini dia tertawa. Kamu tidak "menang debat". Kamu mendengarkan seseorang — dan kamu didengarkan. Inilah yang disebut terhubung.` },
  },
  debrief:`Empat langkah yang menurunkan tembok: <b>observasi</b> tanpa penilaian → <b>perasaan</b> (dia dan kamu) → <b>kebutuhan</b> diucapkan dengan jelas → <b>permintaan konkret</b>.<br><br>Dan aturan utama mekanismenya: saat Tembok tinggi — orang secara fisik tak bisa mendengar bahkan kata-kata terbaik sekalipun. Turunkan dulu temboknya dengan empati, baru bicara soal dirimu.`
});
