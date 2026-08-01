/* ======================================================
   POKÉDEX — App logic (Vanilla JS, PokéAPI)
   ====================================================== */

const API = 'https://pokeapi.co/api/v2';

const ALL_TYPES = ['normal','fire','water','electric','grass','ice','fighting','poison','ground','flying','psychic','bug','rock','ghost','dragon','dark','steel','fairy'];

const TYPE_EMOJI = {
  normal:'⭐', fire:'🔥', water:'💧', electric:'⚡', grass:'🌿', ice:'❄️',
  fighting:'🥊', poison:'☠️', ground:'🌍', flying:'🪽', psychic:'🔮', bug:'🐛',
  rock:'🪨', ghost:'👻', dragon:'🐉', dark:'🌙', steel:'⚙️', fairy:'✨'
};

const TRENDING_IDS = [25, 6, 9, 3, 150, 143, 94, 130, 448, 445, 282, 384, 133, 700, 658, 39];

const REGIONS = [
  { key:'kanto',  name:'Kanto',  gen:'I',    range:[1,151],    repId:6 },
  { key:'johto',  name:'Johto',  gen:'II',   range:[152,251],  repId:157 },
  { key:'hoenn',  name:'Hoenn',  gen:'III',  range:[252,386],  repId:257 },
  { key:'sinnoh', name:'Sinnoh', gen:'IV',   range:[387,493],  repId:392 },
  { key:'unova',  name:'Unova',  gen:'V',    range:[494,649],  repId:497 },
  { key:'kalos',  name:'Kalos',  gen:'VI',   range:[650,721],  repId:655 },
  { key:'alola',  name:'Alola',  gen:'VII',  range:[722,809],  repId:725 },
  { key:'galar',  name:'Galar',  gen:'VIII', range:[810,905],  repId:813 },
  { key:'paldea', name:'Paldea', gen:'IX',   range:[906,1025], repId:909 },
];

const STRONGEST_IDS = [150, 249, 250, 382, 383, 384, 483, 484, 487, 493, 643, 644, 646, 716, 717, 890];

const FUN_FACTS = {
  en: [
    "Pikachu's design was inspired by a mix of squirrels and rabbits.",
    "Magikarp is intentionally one of the weakest Pokémon — until it evolves into the powerful Gyarados.",
    "Ditto can transform into almost any Pokémon it sees, copying its stats and moves.",
    "Shuckle has the highest Defense and Special Defense of any Pokémon, but very low HP and Attack.",
    "Unown has 28 forms — one for every letter of the alphabet, plus ! and ?.",
    "Arceus is known in Pokémon lore as 'The Original One,' said to have shaped the Pokémon universe.",
    "The name 'Pokémon' is a shortening of the Japanese 'Pocket Monsters.'",
    "Eternatus towers over almost every other Pokémon in its base form.",
    "Wobbuffet's only real offensive moves are Counter and Mirror Coat, which reflect damage back at attackers.",
    "Vivillon has region-specific wing patterns depending on where in the real world you catch it.",
  ],
  id: [
    "Desain Pikachu terinspirasi dari campuran tupai dan kelinci.",
    "Magikarp sengaja dibuat sangat lemah — sampai berevolusi menjadi Gyarados yang kuat.",
    "Ditto bisa berubah menjadi hampir semua Pokémon yang ia lihat, meniru statistik dan gerakannya.",
    "Shuckle punya Defense dan Special Defense tertinggi di antara semua Pokémon, tapi HP dan Attack-nya sangat rendah.",
    "Unown punya 28 bentuk — satu untuk setiap huruf alfabet, plus tanda ! dan ?.",
    "Arceus dikenal dalam lore Pokémon sebagai 'The Original One', yang disebut membentuk alam semesta Pokémon.",
    "Nama 'Pokémon' adalah singkatan dari bahasa Jepang 'Pocket Monsters'.",
    "Eternatus menjulang di atas hampir semua Pokémon lain dalam bentuk dasarnya.",
    "Satu-satunya gerakan menyerang Wobbuffet adalah Counter dan Mirror Coat, yang memantulkan damage ke penyerang.",
    "Beberapa Pokémon, seperti Vivillon, punya pola sayap berbeda tergantung wilayah tempat kamu menangkapnya di dunia nyata.",
  ],
};

/* ---------------- I18N ---------------- */
const I18N = {
  en: {
    trendingSub: "See which Pokémon are popular right now.",
    funFactsSub: "Discover interesting trivia about Pokémon.",
    recentSub: "Pick up right where you left off.",
    favoritesSub: "Your personal collection of beloved Pokémon.",
    searchPlaceholder:"Search Pikachu, #025, fire...",
    searchBtn:"Search",
    navCatalog:"Catalog", navBattle:"Battle", navFav:"Favorites", navSound:"Toggle sound", navDark:"Toggle dark mode",
    heroTitle:"Meet every Pokémon,<br>up close.",
    heroSub:"Search a name or Pokédex number and explore stats, types, evolutions and more.",
    randomBtn:"🎲 Random Pokémon",
    catalogBtn:"📖 Browse Catalog",
    battleBtnHome:"⚔️ VS Battle",
    clearHistory:"🕑 Clear history",
    trending:"✨ Trending Pokémon",
    recent:"🕑 Recently Viewed",
    favorites:"❤️ Favorites",
    recentEmpty:"Pokémon you view will show up here.",
    favEmpty:"Tap the heart on any Pokémon to save it here.",
    loadingText:"Fetching data from the Pokédex…",
    errorTitle:"Wild error appeared!",
    errorMessage:(q)=>`We looked everywhere but "${q}" doesn't seem to exist. Double-check the spelling or Pokédex number!`,
    retry:"Try Again",
    prev:"← Previous", next:"Next →", random:"🎲 Random",
    abilities:"💪 Abilities", baseStats:"📊 Base Stats", typeMatchups:"🛡️ Type Matchups",
    weakAgainst:"Weak against (2×/4×)", resists:"Resists (½×/¼×)", immuneTo:"Immune to",
    evolutionChain:"🌱 Evolution Chain", notableMoves:"🥊 Notable Moves",
    unavailable:"Unavailable", none:"None",
    height:"Height", weight:"Weight", baseXp:"Base XP", habitat:"Habitat", shape:"Shape",
    color:"Color", generation:"Generation", speciesNum:"Species #", unknown:"Unknown",
    catalogTitle:"📖 Pokémon Catalog", catalogSub:"Browse every Pokémon — perfect if you can't remember a name.",
    loadMore:"Load more", allTypes:"All",
    battleTitle:"⚔️ Pokémon VS Battle", battleSub:"Pick two Pokémon and watch a stat-based battle play out.",
    player1:"Player 1", player2:"Player 2", pickPokemon:"Choose a Pokémon…",
    fight:"Fight!", battleAgain:"Battle Again",
    footer:"Built with 💛 using PokéAPI · Data belongs to Nintendo / Game Freak / The Pokémon Company",
    footerDisclaimer: "This is a non-profit educational portfolio project.<br>Pokémon and Pokémon character names are trademarks of Nintendo.<br>Data and images belong to Nintendo, Game Freak, and The Pokémon Company.",
    typeModalNote:(n,total)=> total>n? `Showing ${n} of ${total} Pokémon`:`${total} Pokémon`,
    favAdded:(n)=>`${n} added to favorites ❤️`, favRemoved:(n)=>`${n} removed from favorites`,
    soundOn:"Sound on 🔊", soundMuted:"Sound muted 🔇",
    historyCleared:"Recently viewed cleared",
    noCry:"No cry available for this Pokémon",
    pickBothPlayers:"Pick a Pokémon for both players first!",
    battleStartLog:(a,b)=>`${a} and ${b} enter the battle!`,
    attackLog:(atkName,dmg,eff)=> `${atkName} attacks — ${dmg} damage!${eff}`,
    superEffective:" It's super effective!",
    notVeryEffective:" It's not very effective...",
    noEffect:" It has no effect...",
    faintedLog:(name)=>`${name} fainted!`,
    winnerLog:(name)=>`🏆 ${name} wins the battle!`,
    drawLog:()=> `🤝 It's a draw on remaining HP!`,
    notFoundToast:(q)=>`"${q}" not found`,
    catalogLoadFail:"Could not load the catalog. Try again.",

    moreMenu:"More",
    compareTitle:"Compare Pokémon", compareBtnHome:"🔍 Compare", compareSub:"Pick two Pokémon to compare their stats side by side.",
    pokemonA:"Pokémon A", pokemonB:"Pokémon B",
    cmpWinnerText:(name)=>`🏆 ${name} has the higher total base stats!`,
    cmpTie:"🤝 It's a tie on total base stats!",

    guessTitle:"Who's That Pokémon?", guessBtnHome:"🎮 Guess Game", guessSub:"10 silhouettes. Answer them all to earn your Trainer Rank!",
    nextRound:"Next Silhouette →", seeRank:"See My Rank →",
    guessCorrect:"🎉 Correct! It's ",
    guessWrong:(name)=>`❌ Nope! It was ${name}.`,
    questionCounter:(n,total)=>`Question ${n} / ${total}`,
    quizComplete:"Quiz Complete!", scoreLabel:"Score", accuracyLabel:"Accuracy",
    playAgain:"Play Again", shareResult:"Share Result", startQuiz:"Start Quiz",
    rankOverviewTitle:"Trainer Rank",
    resultBestScore:(n)=>`🏆 Personal best: ${n} / 10`,
    rank_youngster_title:"🎒 Youngster",
    rank_youngster_desc:"A new Trainer beginning their Pokémon journey. Keep exploring and you'll become stronger.",
    rank_youngster_msg:"Every great Trainer starts somewhere. Keep exploring!",
    rank_trainer_title:"🧢 Pokémon Trainer",
    rank_trainer_desc:"You already know the basics. Continue exploring different Pokémon to improve your knowledge.",
    rank_trainer_msg:"Nice work! Learn a few more species and you'll rank up in no time.",
    rank_ace_title:"⚔️ Ace Trainer",
    rank_ace_desc:"Great work! You have solid Pokémon knowledge and are becoming a skilled Trainer.",
    rank_ace_msg:"You're getting stronger! A little more practice and you'll reach Gym Leader.",
    rank_gym_title:"🏅 Gym Leader",
    rank_gym_desc:"Excellent! Your Pokémon knowledge is impressive. Few Trainers can reach this level.",
    rank_gym_msg:"Excellent! Only a couple more correct answers stand between you and Champion.",
    rank_champion_title:"👑 Champion",
    rank_champion_desc:"Outstanding! You are among the best Trainers. Only one step remains.",
    rank_champion_msg:"Incredible! Only a perfect score separates you from becoming a Pokémon Master.",
    rank_master_title:"⭐ Pokémon Master",
    rank_master_desc:"Perfect Score! You truly are a Pokémon Master. Congratulations!",
    rank_master_msg:"Perfect! Your Pokémon knowledge is legendary.",
    shareRankText:(rank,score)=>`I ranked ${rank} (${score}/10) on the Who's That Pokémon quiz! Can you beat my score?`,

    quizTitle:"Daily Quiz", quizBtnHome:"📅 Daily Quiz",
    quizQ_pokemon:"Who's that Pokémon?",
    quizQ_type:(n)=>`What type is ${n}?`,
    quizQ_region:(n)=>`Which region is ${n} originally from?`,
    quizQ_generation:(n)=>`Which generation is ${n} from?`,
    quizQ_ability:(n)=>`Which of these is one of ${n}'s abilities?`,
    quizQ_height:(n)=>`What is ${n}'s height?`,
    quizQ_weight:(n)=>`What is ${n}'s weight?`,
    quizQ_evolutionFrom:(n)=>`Which Pokémon does ${n} evolve from?`,
    quizQ_evolutionTo:(n)=>`What does ${n} evolve into?`,
    generationLabel:(g)=>`Generation ${g}`,
    quizCorrectTitle:"✅ Correct!", quizWrongTitle:"❌ Not Quite!",
    quizCorrectExplain:(ans)=>`That's ${ans}.`,
    quizWrongExplain:(ans)=>`The correct answer was ${ans}.`,
    quizCorrectNote:"Excellent work, Trainer! Come back tomorrow for another Daily Quiz.",
    quizWrongNote:"Don't worry! A new Daily Quiz will be available tomorrow.",
    todaysScoreLabel:"Today's Score",
    currentStreakLabel:"Current Streak", daysLabel:"Days",
    keepStreakAlive:"Keep your streak alive!",
    startStreakToday:"Complete today's quiz to start your streak!",
    last7DaysTitle:"Last 7 Days", todayLabel:"Today", yesterdayLabel:"Yesterday",
    noHistoryYet:"No Daily Quiz history yet.",
    startTodaysQuizPrompt:"Complete today's Daily Quiz to begin your journey!",
    startTodaysQuiz:"Start Today's Quiz",

    achievementsTitle:"Achievements", achievementsBtnHome:"🏆 Achievements", achievementsSub:"Track your Pokédex completion and unlock badges.",
    dexProgressLabel:(n,total)=>`${n} / ${total} Pokémon viewed`,
    achievementUnlocked:(name)=>`🏆 Achievement unlocked: ${name}`,

    ach_first_steps_name:"First Steps", ach_first_steps_desc:"View your first Pokémon.",
    ach_explorer_name:"Explorer", ach_explorer_desc:"View 50 different Pokémon.",
    ach_century_name:"Century Club", ach_century_desc:"View 100 different Pokémon.",
    ach_full_dex_name:"Full Pokédex", ach_full_dex_desc:"View every single Pokémon in the Pokédex.",
    ach_type_collector_name:"Type Collector", ach_type_collector_desc:"See a Pokémon of all 18 types.",
    ach_legend_hunter_name:"Legend Hunter", ach_legend_hunter_desc:"View 5 legendary or mythical Pokémon.",
    ach_heart_collector_name:"Heart Collector", ach_heart_collector_desc:"Add 10 Pokémon to your favorites.",
    ach_battle_champion_name:"Battle Champion", ach_battle_champion_desc:"Win 5 VS battles.",
    ach_quiz_master_name:"Quiz Master", ach_quiz_master_desc:"Answer 10 daily quiz questions correctly.",
    ach_guess_pro_name:"Silhouette Sleuth", ach_guess_pro_desc:"Correctly guess 10 silhouettes.",

    exportPng:"Export PNG", shareCard:"Share",
    generatingCard:"Generating your card…", cardDownloaded:"Card downloaded! 📥",
    cardExportFail:"Couldn't generate the card — try again.",
    shareFallback:"Sharing isn't supported here — downloaded the PNG instead.",
    shareText:(name)=>`Check out ${name} on my Pokédex app!`,
    randomDiscoveryTitle:"🔀 Random Discovery", randomDiscoverySub:"A fresh Pokémon every time you shuffle.",
    shuffle:"Shuffle", viewDetails:"View Details",
    exploreRegionTitle:"🗺️ Explore by Region", exploreRegionSub:"Jump straight into a generation's Pokédex.",
    showingRegion:"Showing region", clearFilter:"Clear",
    topStrongestTitle:"💪 Top Strongest", topStrongestSub:"Ranked by total base stats.",
    funFactsTitle:"💡 Pokémon Fun Facts", shuffleFacts:"🔀 Shuffle Facts",
  },
  id: {
    trendingSub: "Lihat Pokémon yang sedang populer saat ini.",
    funFactsSub: "Temukan trivia menarik seputar dunia Pokémon.",
    recentSub: "Lanjutkan pencarian terakhirmu di sini.",
    favoritesSub: "Koleksi pribadi Pokémon kesayanganmu.",
    searchPlaceholder:"Cari Pikachu, #025, fire...",
    searchBtn:"Cari",
    navCatalog:"Katalog", navBattle:"Battle", navFav:"Favorit", navSound:"Aktif/matikan suara", navDark:"Mode gelap",
    heroTitle:"Kenali setiap Pokémon,<br>lebih dekat.",
    heroSub:"Cari nama atau nomor Pokédex dan jelajahi statistik, tipe, evolusi, dan lainnya.",
    randomBtn:"🎲 Pokémon Acak",
    catalogBtn:"📖 Lihat Katalog",
    battleBtnHome:"⚔️ Battle VS",
    clearHistory:"🕑 Hapus riwayat",
    trending:"✨ Pokémon Populer",
    recent:"🕑 Baru Dilihat",
    favorites:"❤️ Favorit",
    recentEmpty:"Pokémon yang kamu lihat akan muncul di sini.",
    favEmpty:"Ketuk ikon hati pada Pokémon mana pun untuk menyimpannya di sini.",
    loadingText:"Mengambil data dari Pokédex…",
    errorTitle:"Muncul error liar!",
    errorMessage:(q)=>`Sudah dicari ke mana-mana tapi "${q}" sepertinya tidak ada. Periksa lagi ejaan atau nomor Pokédex-nya!`,
    retry:"Coba Lagi",
    prev:"← Sebelumnya", next:"Selanjutnya →", random:"🎲 Acak",
    abilities:"💪 Kemampuan", baseStats:"📊 Statistik Dasar", typeMatchups:"🛡️ Kelemahan & Ketahanan",
    weakAgainst:"Lemah terhadap (2×/4×)", resists:"Tahan terhadap (½×/¼×)", immuneTo:"Kebal terhadap",
    evolutionChain:"🌱 Rantai Evolusi", notableMoves:"🥊 Gerakan Andalan",
    unavailable:"Tidak tersedia", none:"Tidak ada",
    height:"Tinggi", weight:"Berat", baseXp:"XP Dasar", habitat:"Habitat", shape:"Bentuk",
    color:"Warna", generation:"Generasi", speciesNum:"No. Spesies", unknown:"Tidak diketahui",
    catalogTitle:"📖 Katalog Pokémon", catalogSub:"Jelajahi semua Pokémon — cocok kalau kamu lupa namanya.",
    loadMore:"Muat lagi", allTypes:"Semua",
    battleTitle:"⚔️ Battle VS Pokémon", battleSub:"Pilih dua Pokémon lalu lihat pertarungan berbasis statistik berlangsung.",
    player1:"Pemain 1", player2:"Pemain 2", pickPokemon:"Pilih Pokémon…",
    fight:"Bertarung!", battleAgain:"Battle Lagi",
    footer:"Dibuat dengan 💛 memakai PokéAPI · Data milik Nintendo / Game Freak / The Pokémon Company",
    footerDisclaimer: "Ini adalah proyek portofolio edukasional non-profit.<br>Pokémon dan nama karakter Pokémon adalah merek dagang dari Nintendo.<br>Data dan aset adalah milik Nintendo, Game Freak, dan The Pokémon Company.",
    typeModalNote:(n,total)=> total>n? `Menampilkan ${n} dari ${total} Pokémon`:`${total} Pokémon`,
    favAdded:(n)=>`${n} ditambahkan ke favorit ❤️`, favRemoved:(n)=>`${n} dihapus dari favorit`,
    soundOn:"Suara aktif 🔊", soundMuted:"Suara dimatikan 🔇",
    historyCleared:"Riwayat pencarian dihapus",
    noCry:"Suara Pokémon ini tidak tersedia",
    pickBothPlayers:"Pilih Pokémon untuk kedua pemain dahulu!",
    battleStartLog:(a,b)=>`${a} dan ${b} memasuki pertarungan!`,
    attackLog:(atkName,dmg,eff)=> `${atkName} menyerang — ${dmg} damage!${eff}`,
    superEffective:" Sangat efektif!",
    notVeryEffective:" Kurang efektif...",
    noEffect:" Tidak berpengaruh...",
    faintedLog:(name)=>`${name} pingsan!`,
    winnerLog:(name)=>`🏆 ${name} memenangkan pertarungan!`,
    drawLog:()=> `🤝 Seri berdasarkan sisa HP!`,
    notFoundToast:(q)=>`"${q}" tidak ditemukan`,
    catalogLoadFail:"Katalog gagal dimuat. Coba lagi.",

    moreMenu:"Lainnya",
    compareTitle:"Bandingkan Pokémon", compareBtnHome:"🔍 Bandingkan", compareSub:"Pilih dua Pokémon untuk membandingkan statistiknya berdampingan.",
    pokemonA:"Pokémon A", pokemonB:"Pokémon B",
    cmpWinnerText:(name)=>`🏆 ${name} punya total statistik dasar lebih tinggi!`,
    cmpTie:"🤝 Seri dalam total statistik dasar!",

    guessTitle:"Siapakah Pokémon Ini?", guessBtnHome:"🎮 Tebak Pokémon", guessSub:"10 siluet. Jawab semuanya untuk meraih Trainer Rank-mu!",
    nextRound:"Siluet Berikutnya →", seeRank:"Lihat Peringkatku →",
    guessCorrect:"🎉 Benar! Itu adalah ",
    guessWrong:(name)=>`❌ Salah! Itu adalah ${name}.`,
    questionCounter:(n,total)=>`Soal ${n} / ${total}`,
    quizComplete:"Kuis Selesai!", scoreLabel:"Skor", accuracyLabel:"Akurasi",
    playAgain:"Main Lagi", shareResult:"Bagikan Hasil", startQuiz:"Mulai Kuis",
    rankOverviewTitle:"Trainer Rank",
    resultBestScore:(n)=>`🏆 Rekor pribadi: ${n} / 10`,
    rank_youngster_title:"🎒 Pemula",
    rank_youngster_desc:"Trainer baru yang baru memulai perjalanan Pokémon-nya. Terus jelajahi dan kamu akan makin kuat.",
    rank_youngster_msg:"Setiap Trainer hebat pasti mulai dari suatu tempat. Terus jelajahi!",
    rank_trainer_title:"🧢 Pelatih Pokémon",
    rank_trainer_desc:"Kamu sudah paham dasar-dasarnya. Terus jelajahi Pokémon lain untuk menambah wawasanmu.",
    rank_trainer_msg:"Kerja bagus! Kenali beberapa spesies lagi dan peringkatmu akan naik.",
    rank_ace_title:"⚔️ Pelatih Andalan",
    rank_ace_desc:"Kerja bagus! Pengetahuan Pokémon-mu sudah cukup solid dan kamu semakin terampil.",
    rank_ace_msg:"Kamu makin kuat! Sedikit lagi latihan dan kamu akan sampai ke Pemimpin Gym.",
    rank_gym_title:"🏅 Pemimpin Gym",
    rank_gym_desc:"Luar biasa! Pengetahuan Pokémon-mu mengesankan. Hanya sedikit Trainer yang bisa sampai level ini.",
    rank_gym_msg:"Mantap! Tinggal beberapa jawaban benar lagi menuju Juara.",
    rank_champion_title:"👑 Juara",
    rank_champion_desc:"Hebat sekali! Kamu termasuk Trainer terbaik. Tinggal satu langkah lagi.",
    rank_champion_msg:"Luar biasa! Tinggal skor sempurna yang memisahkanmu dari gelar Master Pokémon.",
    rank_master_title:"⭐ Master Pokémon",
    rank_master_desc:"Skor Sempurna! Kamu benar-benar seorang Master Pokémon. Selamat!",
    rank_master_msg:"Sempurna! Pengetahuan Pokémon-mu legendaris.",
    shareRankText:(rank,score)=>`Peringkatku ${rank} (${score}/10) di kuis Siapakah Pokémon Ini! Bisakah kamu mengalahkan skorku?`,

    quizTitle:"Kuis Harian", quizBtnHome:"📅 Kuis Harian",
    quizQ_pokemon:"Siapakah Pokémon ini?",
    quizQ_type:(n)=>`Apa tipe dari ${n}?`,
    quizQ_region:(n)=>`${n} awalnya berasal dari wilayah mana?`,
    quizQ_generation:(n)=>`${n} berasal dari generasi ke berapa?`,
    quizQ_ability:(n)=>`Manakah salah satu kemampuan (ability) milik ${n}?`,
    quizQ_height:(n)=>`Berapa tinggi ${n}?`,
    quizQ_weight:(n)=>`Berapa berat ${n}?`,
    quizQ_evolutionFrom:(n)=>`${n} berevolusi dari Pokémon apa?`,
    quizQ_evolutionTo:(n)=>`${n} berevolusi menjadi apa?`,
    generationLabel:(g)=>`Generasi ${g}`,
    quizCorrectTitle:"✅ Benar!", quizWrongTitle:"❌ Kurang Tepat!",
    quizCorrectExplain:(ans)=>`Itu adalah ${ans}.`,
    quizWrongExplain:(ans)=>`Jawaban yang benar adalah ${ans}.`,
    quizCorrectNote:"Kerja bagus, Trainer! Kembali lagi besok untuk Kuis Harian berikutnya.",
    quizWrongNote:"Jangan khawatir! Kuis Harian baru akan tersedia besok.",
    todaysScoreLabel:"Skor Hari Ini",
    currentStreakLabel:"Streak Saat Ini", daysLabel:"Hari",
    keepStreakAlive:"Pertahankan streak-mu!",
    startStreakToday:"Selesaikan kuis hari ini untuk memulai streak-mu!",
    last7DaysTitle:"7 Hari Terakhir", todayLabel:"Hari Ini", yesterdayLabel:"Kemarin",
    noHistoryYet:"Belum ada riwayat Kuis Harian.",
    startTodaysQuizPrompt:"Selesaikan Kuis Harian hari ini untuk memulai perjalananmu!",
    startTodaysQuiz:"Mulai Kuis Hari Ini",

    achievementsTitle:"Pencapaian", achievementsBtnHome:"🏆 Pencapaian", achievementsSub:"Pantau progres Pokédex-mu dan buka lencana baru.",
    dexProgressLabel:(n,total)=>`${n} / ${total} Pokémon telah dilihat`,
    achievementUnlocked:(name)=>`🏆 Pencapaian terbuka: ${name}`,

    ach_first_steps_name:"Langkah Pertama", ach_first_steps_desc:"Lihat Pokémon pertamamu.",
    ach_explorer_name:"Penjelajah", ach_explorer_desc:"Lihat 50 Pokémon berbeda.",
    ach_century_name:"Klub Seratus", ach_century_desc:"Lihat 100 Pokémon berbeda.",
    ach_full_dex_name:"Pokédex Lengkap", ach_full_dex_desc:"Lihat semua Pokémon di Pokédex.",
    ach_type_collector_name:"Kolektor Tipe", ach_type_collector_desc:"Lihat Pokémon dari ke-18 tipe.",
    ach_legend_hunter_name:"Pemburu Legenda", ach_legend_hunter_desc:"Lihat 5 Pokémon legendaris atau mitos.",
    ach_heart_collector_name:"Kolektor Hati", ach_heart_collector_desc:"Tambahkan 10 Pokémon ke favorit.",
    ach_battle_champion_name:"Juara Battle", ach_battle_champion_desc:"Menangkan 5 battle VS.",
    ach_quiz_master_name:"Master Kuis", ach_quiz_master_desc:"Jawab 10 pertanyaan kuis harian dengan benar.",
    ach_guess_pro_name:"Detektif Siluet", ach_guess_pro_desc:"Tebak 10 siluet dengan benar.",

    exportPng:"Ekspor PNG", shareCard:"Bagikan",
    generatingCard:"Membuat kartu…", cardDownloaded:"Kartu berhasil diunduh! 📥",
    cardExportFail:"Gagal membuat kartu — coba lagi.",
    shareFallback:"Berbagi tidak didukung di sini — PNG diunduh sebagai gantinya.",
    shareText:(name)=>`Lihat ${name} di aplikasi Pokédex-ku!`,
    randomDiscoveryTitle:"🔀 Penemuan Acak", randomDiscoverySub:"Pokémon baru setiap kali kamu kocok ulang.",
    shuffle:"Kocok Ulang", viewDetails:"Lihat Detail",
    exploreRegionTitle:"🗺️ Jelajahi Wilayah", exploreRegionSub:"Langsung masuk ke Pokédex satu generasi.",
    showingRegion:"Menampilkan wilayah", clearFilter:"Hapus",
    topStrongestTitle:"💪 Terkuat", topStrongestSub:"Diurutkan berdasarkan total statistik dasar.",
    funFactsTitle:"💡 Fakta Menarik Pokémon", shuffleFacts:"🔀 Kocok Fakta",
  }
};

function t(key, ...args){
  const dict = I18N[state.lang] || I18N.en;
  const val = (key in dict) ? dict[key] : I18N.en[key];
  return typeof val === 'function' ? val(...args) : val;
}

/* ---------------- DOM ---------------- */
const els = {
  brandHome: document.getElementById('brandHome'),
  favoritesNavBtn: document.getElementById('favoritesNavBtn'),
  favCount: document.getElementById('favCount'),
  soundToggle: document.getElementById('soundToggle'),
  soundIcon: document.getElementById('soundIcon'),
  darkToggle: document.getElementById('darkToggle'),
  darkIcon: document.getElementById('darkIcon'),
  langToggle: document.getElementById('langToggle'),
  langLabel: document.getElementById('langLabel'),
  catalogNavBtn: document.getElementById('catalogNavBtn'),
  battleNavBtn: document.getElementById('battleNavBtn'),

  topSearchForm: document.getElementById('topSearchForm'),
  topSearchInput: document.getElementById('topSearchInput'),
  topSearchBox: document.getElementById('topSearchBox'),
  topClearSearch: document.getElementById('topClearSearch'),
  topSuggestions: document.getElementById('topSuggestions'),

  heroSection: document.getElementById('heroSection'),
  searchForm: document.getElementById('searchForm'),
  searchInput: document.getElementById('searchInput'),
  heroSearchBox: document.getElementById('heroSearchBox'),
  clearSearch: document.getElementById('clearSearch'),
  suggestions: document.getElementById('suggestions'),
  randomBtn: document.getElementById('randomBtn'),
  randomBtn2: document.getElementById('randomBtn2'),
  catalogBtn: document.getElementById('catalogBtn'),
  battleBtn: document.getElementById('battleBtn'),
  clearHistoryBtn: document.getElementById('clearHistoryBtn'),

  railsSection: document.getElementById('railsSection'),
  trendingTrack: document.getElementById('trendingTrack'),
  recentTrack: document.getElementById('recentTrack'),
  favTrack: document.getElementById('favTrack'),

  loadingPanel: document.getElementById('loadingPanel'),
  errorPanel: document.getElementById('errorPanel'),
  errorMessage: document.getElementById('errorMessage'),
  retryBtn: document.getElementById('retryBtn'),

  detailView: document.getElementById('detailView'),
  detailCard: document.getElementById('detailCard'),
  prevBtn: document.getElementById('prevBtn'),
  nextBtn: document.getElementById('nextBtn'),

  catalogView: document.getElementById('catalogView'),
  catalogGrid: document.getElementById('catalogGrid'),
  catalogFilters: document.getElementById('catalogFilters'),
  loadMoreBtn: document.getElementById('loadMoreBtn'),
  catalogLoadingDots: document.getElementById('catalogLoadingDots'),

  battleView: document.getElementById('battleView'),
  p1SearchForm: document.getElementById('p1SearchForm'),
  p1SearchInput: document.getElementById('p1SearchInput'),
  p1Suggestions: document.getElementById('p1Suggestions'),
  p1Preview: document.getElementById('p1Preview'),
  p2SearchForm: document.getElementById('p2SearchForm'),
  p2SearchInput: document.getElementById('p2SearchInput'),
  p2Suggestions: document.getElementById('p2Suggestions'),
  p2Preview: document.getElementById('p2Preview'),
  fightBtn: document.getElementById('fightBtn'),
  battleResetBtn: document.getElementById('battleResetBtn'),
  arena: document.getElementById('arena'),
  fighterLeft: document.getElementById('fighterLeft'),
  fighterRight: document.getElementById('fighterRight'),
  f1Name: document.getElementById('f1Name'),
  f2Name: document.getElementById('f2Name'),
  f1Sprite: document.getElementById('f1Sprite'),
  f2Sprite: document.getElementById('f2Sprite'),
  f1HpFill: document.getElementById('f1HpFill'),
  f2HpFill: document.getElementById('f2HpFill'),
  f1HpText: document.getElementById('f1HpText'),
  f2HpText: document.getElementById('f2HpText'),
  battleLog: document.getElementById('battleLog'),

  typeModalOverlay: document.getElementById('typeModalOverlay'),
  typeModalHeader: document.getElementById('typeModalHeader'),
  typeModalBody: document.getElementById('typeModalBody'),
  typeModalClose: document.getElementById('typeModalClose'),

  moreNavBtn: document.getElementById('moreNavBtn'),
  moreDropdown: document.getElementById('moreDropdown'),
  compareNavBtn: document.getElementById('compareNavBtn'),
  guessNavBtn: document.getElementById('guessNavBtn'),
  quizNavBtn: document.getElementById('quizNavBtn'),
  achievementsNavBtn: document.getElementById('achievementsNavBtn'),
  compareBtn: document.getElementById('compareBtn'),
  guessBtn: document.getElementById('guessBtn'),
  quizBtn: document.getElementById('quizBtn'),
  achievementsBtn: document.getElementById('achievementsBtn'),

  compareView: document.getElementById('compareView'),
  cASearchForm: document.getElementById('cASearchForm'),
  cASearchInput: document.getElementById('cASearchInput'),
  cASuggestions: document.getElementById('cASuggestions'),
  cAPreview: document.getElementById('cAPreview'),
  cBSearchForm: document.getElementById('cBSearchForm'),
  cBSearchInput: document.getElementById('cBSearchInput'),
  cBSuggestions: document.getElementById('cBSuggestions'),
  cBPreview: document.getElementById('cBPreview'),
  compareResult: document.getElementById('compareResult'),

  guessView: document.getElementById('guessView'),
  guessHeading: document.getElementById('guessHeading'),
  guessIntro: document.getElementById('guessIntro'),
  guessRankGrid: document.getElementById('guessRankGrid'),
  startQuizBtn: document.getElementById('startQuizBtn'),
  introBest: document.getElementById('introBest'),
  guessPlay: document.getElementById('guessPlay'),
  guessImg: document.getElementById('guessImg'),
  guessChoices: document.getElementById('guessChoices'),
  guessScore: document.getElementById('guessScore'),
  guessQuestionLabel: document.getElementById('guessQuestionLabel'),
  guessProgressFill: document.getElementById('guessProgressFill'),
  guessNextBtn: document.getElementById('guessNextBtn'),
  guessResultPanel: document.getElementById('guessResultPanel'),
  rankFx: document.getElementById('rankFx'),
  resultCard: document.getElementById('resultCard'),
  resultScoreVal: document.getElementById('resultScoreVal'),
  rankEmoji: document.getElementById('rankEmoji'),
  rankTitle: document.getElementById('rankTitle'),
  rankProgressFill: document.getElementById('rankProgressFill'),
  rankProgressLabel: document.getElementById('rankProgressLabel'),
  resultAccuracy: document.getElementById('resultAccuracy'),
  rankMessage: document.getElementById('rankMessage'),
  playAgainBtn: document.getElementById('playAgainBtn'),
  shareResultBtn: document.getElementById('shareResultBtn'),
  resultBest: document.getElementById('resultBest'),

  quizView: document.getElementById('quizView'),
  quizDate: document.getElementById('quizDate'),
  quizBody: document.getElementById('quizBody'),
  streakFire: document.getElementById('streakFire'),
  streakCount: document.getElementById('streakCount'),
  streakSub: document.getElementById('streakSub'),
  historyList: document.getElementById('historyList'),

  achievementsView: document.getElementById('achievementsView'),
  dexProgressFill: document.getElementById('dexProgressFill'),
  dexProgressText: document.getElementById('dexProgressText'),
  badgeGrid: document.getElementById('badgeGrid'),

  exportCanvas: document.getElementById('exportCanvas'),

  bgLayer: document.getElementById('bgLayer'),
  sparkles: document.getElementById('sparkles'),
  floatingBalls: document.getElementById('floatingBalls'),
  toast: document.getElementById('toast'),
  homeExtras: document.getElementById('homeExtras'),
  discoveryCard: document.getElementById('discoveryCard'),
  regionGrid: document.getElementById('regionGrid'),
  catalogRegionBanner: document.getElementById('catalogRegionBanner'),
  catalogRegionText: document.getElementById('catalogRegionText'),
  catalogRegionClear: document.getElementById('catalogRegionClear'),
  strongestList: document.getElementById('strongestList'),
  funFactsGrid: document.getElementById('funFactsGrid'),
  shuffleFactsBtn: document.getElementById('shuffleFactsBtn'),
};

/* ---------------- STATE ---------------- */
const state = {
  allNames: [],
  discoveryId: null,
  namesLoaded: false,
  favorites: JSON.parse(localStorage.getItem('pokedex_favorites') || '[]'),
  recent: JSON.parse(localStorage.getItem('pokedex_recent') || '[]'),
  darkMode: localStorage.getItem('pokedex_dark') === '1',
  soundOn: localStorage.getItem('pokedex_sound') !== '0',
  lang: localStorage.getItem('pokedex_lang') || 'en',
  currentId: null,
  lastRetry: null,
  currentView: 'home',
  catalog: { offset: 0, limit: 40, filterType: null, filterRegion: null, regionIdsCache: {}, typeListCache: {}, endReached: false },
  nameById: {},
  strongestCache: null,
  battle: { p1: null, p2: null },
  compare: { a: null, b: null },
  guess: {
    pokemonId: null, correctName: null, answered: false,
    phase: 'intro',        // 'intro' | 'playing' | 'result'
    round: 0,              // 0-based index of current question (0..9)
    sessionScore: 0,       // correct answers this session
    usedIds: [],           // pokemon ids already used this session (avoid repeats)
    finished: false,       // true once the 10-question session is over
  },
  guessBest: parseInt(localStorage.getItem('pokedex_guess_best') || '0', 10),
  progress: JSON.parse(localStorage.getItem('pokedex_progress') || 'null') || {
    viewedIds: [], typesSeen: [], legendaryViewed: [],
    favoritesAdded: 0, battlesPlayed: 0, battlesWon: 0,
    quizCorrect: 0, quizTotal: 0, guessCorrect: 0, guessTotal: 0,
  },
  unlockedAchievements: JSON.parse(localStorage.getItem('pokedex_unlocked_achievements') || '[]'),
};

/* ---------------- TRAINER RANK TABLE ---------------- */
// Score out of 10 → rank tier. Matches the game's official-style Trainer
// classes so results feel authentic and give players a clear ladder to climb.
// Declared before init() runs because a page refresh can land directly on
// #/guess, which calls renderGuessRankCards() synchronously during init().
const TRAINER_RANKS = [
  { min:0, max:2,  key:'youngster', css:'rank-youngster', emoji:'🎒' },
  { min:3, max:4,  key:'trainer',   css:'rank-trainer',   emoji:'🧢' },
  { min:5, max:6,  key:'ace',       css:'rank-ace',       emoji:'⚔️' },
  { min:7, max:8,  key:'gym',       css:'rank-gym',       emoji:'🏅' },
  { min:9, max:9,  key:'champion',  css:'rank-champion',  emoji:'👑' },
  { min:10,max:10, key:'master',    css:'rank-master',    emoji:'⭐' },
];
function determineTrainerRank(score){
  return TRAINER_RANKS.find(r => score >= r.min && score <= r.max) || TRAINER_RANKS[0];
}

/* ---------------- ACHIEVEMENTS TABLE ---------------- */
// Declared before init() for the same reason as TRAINER_RANKS above — a page
// refresh can land directly on #/achievements, which renders this synchronously.
const ACHIEVEMENTS = [
  { id:'first_steps',      icon:'👣', target:()=>1,   current:()=> state.progress.viewedIds.length },
  { id:'explorer',         icon:'🧭', target:()=>50,  current:()=> state.progress.viewedIds.length },
  { id:'century',          icon:'💯', target:()=>100, current:()=> state.progress.viewedIds.length },
  { id:'full_dex',         icon:'📚', target:()=> Math.max(state.allNames.length,1), current:()=> state.progress.viewedIds.length },
  { id:'type_collector',   icon:'🌈', target:()=>18,  current:()=> state.progress.typesSeen.length },
  { id:'legend_hunter',    icon:'✨', target:()=>5,   current:()=> state.progress.legendaryViewed.length },
  { id:'heart_collector',  icon:'❤️', target:()=>10,  current:()=> state.progress.favoritesAdded },
  { id:'battle_champion',  icon:'⚔️', target:()=>5,   current:()=> state.progress.battlesWon },
  { id:'quiz_master',      icon:'🧠', target:()=>10,  current:()=> state.progress.quizCorrect },
  { id:'guess_pro',        icon:'🎯', target:()=>10,  current:()=> state.progress.guessCorrect },
];

/* ---------------- INIT ---------------- */
init();

function init(){
  applyDarkMode(state.darkMode);
  applySoundIcon();
  applyLanguage();
  spawnFloatingBalls();
  spawnSparkles();
  renderTrending();
  renderRecent();
  renderFavorites();
  renderRandomDiscovery();
  renderRegionGrid();
  renderTopStrongest();
  renderFunFacts();
  renderCatalogFilters();
  loadNameIndex();
  bindEvents();
  attachAutocomplete(els.searchInput, els.suggestions, els.searchForm, (name)=> doSearch(name));
  attachAutocomplete(els.topSearchInput, els.topSuggestions, els.topSearchForm, (name)=> doSearch(name));
  attachAutocomplete(els.p1SearchInput, els.p1Suggestions, els.p1SearchForm, (name)=> selectBattlePokemon('p1', name));
  attachAutocomplete(els.p2SearchInput, els.p2Suggestions, els.p2SearchForm, (name)=> selectBattlePokemon('p2', name));
  attachAutocomplete(els.cASearchInput, els.cASuggestions, els.cASearchForm, (name)=> selectComparePokemon('a', name));
  attachAutocomplete(els.cBSearchInput, els.cBSuggestions, els.cBSearchForm, (name)=> selectComparePokemon('b', name));
  handleRouteFromHash();
}

function bindEvents(){
  els.darkToggle.addEventListener('click', () => {
    state.darkMode = !state.darkMode;
    localStorage.setItem('pokedex_dark', state.darkMode ? '1':'0');
    applyDarkMode(state.darkMode);
  });

  els.soundToggle.addEventListener('click', () => {
    state.soundOn = !state.soundOn;
    localStorage.setItem('pokedex_sound', state.soundOn ? '1':'0');
    applySoundIcon();
    showToast(state.soundOn ? t('soundOn') : t('soundMuted'));
  });

  els.langToggle.addEventListener('click', () => {
    state.lang = state.lang === 'en' ? 'id' : 'en';
    localStorage.setItem('pokedex_lang', state.lang);
    applyLanguage();
    renderRecent();
    renderFavorites();
    renderCatalogFilters();
    updateCatalogRegionBanner();
    renderFunFacts();
    if(state.currentId && state.currentView === 'detail'){
      loadPokemon(state.currentId, true);
    }
    if(state.currentView === 'compare' && state.compare.a && state.compare.b) renderCompare();
    if(state.currentView === 'guess'){
      if(state.guess.phase === 'result'){
        showGuessResultScreen();
      } else if(state.guess.phase === 'playing'){
        updateGuessProgressUI();
        els.guessNextBtn.textContent = state.guess.round >= 9 ? t('seeRank') : t('nextRound');
      } else {
        showGuessIntro();
      }
    }
    if(state.currentView === 'quiz') renderQuiz();
    if(state.currentView === 'achievements') renderAchievements();
    if(state.discoveryId) renderRandomDiscovery(state.discoveryId);
  });

  els.brandHome.addEventListener('click', (e)=>{ e.preventDefault(); goHome(); });
  els.catalogNavBtn.addEventListener('click', ()=>{ els.moreDropdown.hidden = true; openCatalog(); });
  els.catalogBtn.addEventListener('click', ()=> openCatalog());
  els.battleNavBtn.addEventListener('click', ()=>{ els.moreDropdown.hidden = true; openBattle(); });
  els.battleBtn.addEventListener('click', openBattle);

  els.moreNavBtn.addEventListener('click', (e)=>{
    e.stopPropagation();
    els.moreDropdown.hidden = !els.moreDropdown.hidden;
  });
  document.addEventListener('click', (e)=>{
    if(!els.moreDropdown.hidden && !e.target.closest('.more-menu-wrap')) els.moreDropdown.hidden = true;
  });
  els.compareNavBtn.addEventListener('click', ()=>{ els.moreDropdown.hidden = true; openCompare(); });
  els.guessNavBtn.addEventListener('click', ()=>{ els.moreDropdown.hidden = true; openGuess(); });
  els.quizNavBtn.addEventListener('click', ()=>{ els.moreDropdown.hidden = true; openQuiz(); });
  els.achievementsNavBtn.addEventListener('click', ()=>{ els.moreDropdown.hidden = true; openAchievements(); });
  els.compareBtn.addEventListener('click', openCompare);
  els.guessBtn.addEventListener('click', openGuess);
  els.quizBtn.addEventListener('click', openQuiz);
  els.achievementsBtn.addEventListener('click', openAchievements);
  els.startQuizBtn.addEventListener('click', startGuessSession);
  els.guessHeading.addEventListener('click', showGuessIntro);
  els.guessNextBtn.addEventListener('click', advanceGuessRound);
  els.playAgainBtn.addEventListener('click', startGuessSession);
  els.shareResultBtn.addEventListener('click', shareGuessResult);

  els.favoritesNavBtn.addEventListener('click', ()=>{
    els.moreDropdown.hidden = true; 
    goHome();
    setTimeout(()=> document.getElementById('favRail').scrollIntoView({behavior:'smooth', block:'start'}), 60);
  });

  els.searchForm.addEventListener('submit', (e)=>{ e.preventDefault(); playClick(); doSearch(els.searchInput.value); });
  els.topSearchForm.addEventListener('submit', (e)=>{ e.preventDefault(); playClick(); doSearch(els.topSearchInput.value); });

  els.searchInput.addEventListener('input', ()=> els.heroSearchBox.classList.toggle('has-text', !!els.searchInput.value));
  els.topSearchInput.addEventListener('input', ()=> els.topSearchBox.classList.toggle('has-text', !!els.topSearchInput.value));

  els.clearSearch.addEventListener('click', ()=>{ els.searchInput.value=''; els.heroSearchBox.classList.remove('has-text'); els.searchInput.focus(); });
  els.topClearSearch.addEventListener('click', ()=>{ els.topSearchInput.value=''; els.topSearchBox.classList.remove('has-text'); els.topSearchInput.focus(); });

  els.randomBtn.addEventListener('click', ()=>{ playThrow(); loadRandom(); });
  els.randomBtn2.addEventListener('click', ()=>{ playThrow(); loadRandom(); });

  els.clearHistoryBtn.addEventListener('click', ()=>{
    state.recent = [];
    localStorage.setItem('pokedex_recent', '[]');
    renderRecent();
    showToast(t('historyCleared'));
  });

  els.retryBtn.addEventListener('click', ()=>{ if(state.lastRetry) loadPokemon(state.lastRetry); });

  els.prevBtn.addEventListener('click', ()=>{ if(state.currentId > 1) loadPokemon(state.currentId - 1); });
  els.nextBtn.addEventListener('click', ()=>{ if(state.currentId) loadPokemon(state.currentId + 1); });

  els.loadMoreBtn.addEventListener('click', ()=> loadCatalogBatch(false));
  els.catalogRegionClear.addEventListener('click', ()=>{
    state.catalog.filterRegion = null;
    updateCatalogRegionBanner();
    loadCatalogBatch(true);
  });
  els.shuffleFactsBtn.addEventListener('click', renderFunFacts);

  els.fightBtn.addEventListener('click', runBattle);
  els.battleResetBtn.addEventListener('click', resetBattle);

  els.typeModalClose.addEventListener('click', closeTypeModal);
  els.typeModalOverlay.addEventListener('click', (e)=>{ if(e.target === els.typeModalOverlay) closeTypeModal(); });

  document.addEventListener('click', (e)=>{
    const badge = e.target.closest('.type-badge[data-type]');
    if(badge) openTypeModal(badge.dataset.type);
  });

  window.addEventListener('hashchange', handleRouteFromHash);
}

/* ---------------- LANGUAGE ---------------- */
function applyLanguage(){
  document.documentElement.lang = state.lang;
  els.langLabel.textContent = state.lang.toUpperCase();
  document.querySelectorAll('[data-i18n]').forEach(el=> el.textContent = t(el.dataset.i18n));
  document.querySelectorAll('[data-i18n-html]').forEach(el=> el.innerHTML = t(el.dataset.i18nHtml));
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el=> el.placeholder = t(el.dataset.i18nPlaceholder));
  document.querySelectorAll('[data-i18n-title]').forEach(el=> el.title = t(el.dataset.i18nTitle));
}

/* ---------------- DECOR ---------------- */
function spawnFloatingBalls(){
  const count = window.innerWidth < 600 ? 5 : 9;
  for(let i=0;i<count;i++){
    const b = document.createElement('div');
    b.className = 'fball';
    b.style.left = (Math.random()*100)+'vw';
    b.style.width = b.style.height = (22 + Math.random()*26)+'px';
    b.style.animationDuration = (10 + Math.random()*14)+'s';
    b.style.animationDelay = (-Math.random()*14)+'s';
    els.floatingBalls.appendChild(b);
  }
}
function spawnSparkles(){
  const count = window.innerWidth < 600 ? 12 : 22;
  for(let i=0;i<count;i++){
    const s = document.createElement('div');
    s.className = 'sparkle';
    s.style.left = (Math.random()*100)+'vw';
    s.style.top = (Math.random()*100)+'vh';
    s.style.animationDelay = (-Math.random()*2.6)+'s';
    s.style.animationDuration = (1.8 + Math.random()*2)+'s';
    els.sparkles.appendChild(s);
  }
}

/* ---------------- DARK MODE / SOUND ---------------- */
function applyDarkMode(on){ document.body.classList.toggle('dark', on); }
function applySoundIcon(){ els.soundIcon.style.opacity = state.soundOn ? '1' : '.35'; }
function playClick(){ if(state.soundOn) beep(880, 0.04, 0.03); }
function playThrow(){ if(state.soundOn) beep(300, 0.15, 0.05, 620); }
let audioCtx;
function beep(freq, dur, vol, sweepTo){
  try{
    audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
    const o = audioCtx.createOscillator();
    const g = audioCtx.createGain();
    o.type = 'sine';
    o.frequency.setValueAtTime(freq, audioCtx.currentTime);
    if(sweepTo) o.frequency.linearRampToValueAtTime(sweepTo, audioCtx.currentTime + dur);
    g.gain.setValueAtTime(vol, audioCtx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + dur);
    o.connect(g); g.connect(audioCtx.destination);
    o.start(); o.stop(audioCtx.currentTime + dur);
  }catch(e){ /* audio not available */ }
}

/* ---------------- TOAST ---------------- */
let toastTimer;
function showToast(msg){
  els.toast.textContent = msg;
  els.toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(()=> els.toast.classList.remove('show'), 2200);
}

/* ---------------- NAME INDEX ---------------- */
async function loadNameIndex(){
  try{
    const res = await fetch(`${API}/pokemon?limit=2000`);
    const data = await res.json();
    state.allNames = data.results.map(p=>{
      const id = idFromUrl(p.url);
      return { name: p.name, id };
    });
    state.nameById = {};
    state.allNames.forEach(p=>{ if(!(p.id in state.nameById)) state.nameById[p.id] = p.name; });
    state.namesLoaded = true;
  }catch(e){
    console.warn('Could not load name index for autocomplete', e);
  }
}

/* ---------------- REUSABLE AUTOCOMPLETE ---------------- */
function attachAutocomplete(inputEl, suggEl, formEl, onSelect){
  if(!inputEl || !suggEl) return;
  let timer, activeIndex = -1;

  function debounce(){ clearTimeout(timer); timer = setTimeout(render, 160); }

  function render(){
    const q = inputEl.value.trim().toLowerCase();
    activeIndex = -1;
    if(!q){ close(); return; }
    let matches = [];
    if(/^#?\d+$/.test(q)){
      const num = q.replace('#','');
      matches = state.allNames.filter(p => String(p.id) === num).slice(0,8);
    } else {
      matches = state.allNames.filter(p => p.name.includes(q))
        .sort((a,b)=> a.name.indexOf(q) - b.name.indexOf(q) || a.name.length - b.name.length)
        .slice(0,8);
    }
    if(matches.length === 0){
      suggEl.innerHTML = `<div class="sugg-item" style="opacity:.6">${q.length>0 ? '…' : ''}</div>`;
      suggEl.classList.add('open');
      return;
    }
    suggEl.innerHTML = matches.map(m=>`
      <div class="sugg-item" data-name="${m.name}">
        <span class="sugg-num">#${String(m.id).padStart(3,'0')}</span>
        <span>${capitalize(m.name)}</span>
      </div>
    `).join('');
    suggEl.classList.add('open');
    suggEl.querySelectorAll('.sugg-item[data-name]').forEach(item=>{
      item.addEventListener('click', ()=>{
        const name = item.getAttribute('data-name');
        inputEl.value = capitalize(name);
        close();
        onSelect(name);
      });
    });
  }

  function close(){ suggEl.classList.remove('open'); suggEl.innerHTML = ''; activeIndex = -1; }

  function keys(e){
    const items = Array.from(suggEl.querySelectorAll('.sugg-item[data-name]'));
    if(!items.length) return;
    if(e.key === 'ArrowDown'){ e.preventDefault(); activeIndex = Math.min(activeIndex+1, items.length-1); highlight(items); }
    else if(e.key === 'ArrowUp'){ e.preventDefault(); activeIndex = Math.max(activeIndex-1, 0); highlight(items); }
    else if(e.key === 'Enter' && activeIndex >= 0){ e.preventDefault(); items[activeIndex].click(); }
    else if(e.key === 'Escape'){ close(); }
  }
  function highlight(items){
    items.forEach(i=>i.classList.remove('active'));
    if(items[activeIndex]){ items[activeIndex].classList.add('active'); items[activeIndex].scrollIntoView({block:'nearest'}); }
  }

  inputEl.addEventListener('input', debounce);
  inputEl.addEventListener('focus', debounce);
  inputEl.addEventListener('keydown', keys);
  document.addEventListener('click', (e)=>{ if(formEl && !formEl.contains(e.target)) close(); });
}

/* ---------------- SEARCH ---------------- */
function doSearch(raw){
  const q = (raw||'').trim().toLowerCase().replace('#','');
  if(!q) return;
  loadPokemon(q);
}

/* ---------------- ROUTING / VIEWS ---------------- */
function setView(view){
  const map = {
    home: els.heroSection,
    loading: els.loadingPanel,
    error: els.errorPanel,
    detail: els.detailView,
    catalog: els.catalogView,
    battle: els.battleView,
    compare: els.compareView,
    guess: els.guessView,
    quiz: els.quizView,
    achievements: els.achievementsView,
  };
  Object.entries(map).forEach(([key, el])=>{ if(el) el.hidden = key !== view; });
  els.railsSection.hidden = !(view === 'home' || view === 'detail');
  state.currentView = view;
  if(els.homeExtras) els.homeExtras.hidden = view !== 'home';
}

function goHome(){
  location.hash = '';
  setView('home');
  window.scrollTo({top:0, behavior:'smooth'});
}

function openCatalog(forceReset){
  location.hash = '#/catalog';
  setView('catalog');
  updateCatalogRegionBanner();
  if(forceReset || els.catalogGrid.children.length === 0) loadCatalogBatch(true);
  window.scrollTo({top:0, behavior:'smooth'});
}

function openBattle(){
  location.hash = '#/battle';
  setView('battle');
  window.scrollTo({top:0, behavior:'smooth'});
}

function openCompare(){
  location.hash = '#/compare';
  setView('compare');
  window.scrollTo({top:0, behavior:'smooth'});
}

function openGuess(){
  location.hash = '#/guess';
  setView('guess');
  showGuessIntro();
  window.scrollTo({top:0, behavior:'smooth'});
}

function openQuiz(){
  location.hash = '#/quiz';
  setView('quiz');
  renderQuiz();
  window.scrollTo({top:0, behavior:'smooth'});
}

function openAchievements(){
  location.hash = '#/achievements';
  setView('achievements');
  renderAchievements();
  window.scrollTo({top:0, behavior:'smooth'});
}

function handleRouteFromHash(){
  const hash = location.hash.replace('#/','').replace('#','');
  if(hash === 'catalog'){ openCatalog(); return; }
  if(hash === 'battle'){ openBattle(); return; }
  if(hash === 'compare'){ openCompare(); return; }
  if(hash === 'guess'){ openGuess(); return; }
  if(hash === 'quiz'){ openQuiz(); return; }
  if(hash === 'achievements'){ openAchievements(); return; }
  const pokemonMatch = hash.match(/^pokemon\/(.+)$/);
  if(pokemonMatch) loadPokemon(pokemonMatch[1], true);
}

/* ---------------- LOAD POKEMON ---------------- */
async function loadRandom(){
  const id = Math.floor(Math.random()*1010) + 1;
  loadPokemon(id);
}

async function loadPokemon(idOrName, skipHash){
  state.lastRetry = idOrName;
  showLoading();
  try{
    const res = await fetch(`${API}/pokemon/${idOrName}`);
    if(!res.ok) throw new Error('not-found');
    const pokemon = await res.json();

    const speciesRes = await fetch(pokemon.species.url);
    const species = await speciesRes.json();

    const [evoChain, typeData] = await Promise.all([
      fetchEvolutionChain(species.evolution_chain.url).catch(()=>null),
      fetchTypeRelations(pokemon.types.map(t=>t.type.name)).catch(()=>null),
    ]);

    state.currentId = pokemon.id;
    if(!skipHash) location.hash = `/pokemon/${pokemon.name}`;

    addRecent(pokemon);
    markViewed(pokemon, species);

    renderDetail(pokemon, species, evoChain, typeData);
    setView('detail');
    window.scrollTo({top:0, behavior:'smooth'});
  }catch(err){
    console.error(err);
    showError(idOrName);
  }
}

async function fetchEvolutionChain(url){
  const res = await fetch(url);
  const data = await res.json();
  const chain = [];
  let node = data.chain;
  while(node){
    chain.push({ name: node.species.name, id: idFromUrl(node.species.url) });
    node = node.evolves_to[0];
  }
  return chain;
}

async function fetchTypeRelations(typeNames){
  const results = await Promise.all(typeNames.map(t => fetch(`${API}/type/${t}`).then(r=>r.json())));
  const mult = {};
  ALL_TYPES.forEach(t => mult[t] = 1);
  results.forEach(t=>{
    t.damage_relations.double_damage_from.forEach(x => mult[x.name] = (mult[x.name]===0?0:mult[x.name]*2));
    t.damage_relations.half_damage_from.forEach(x => mult[x.name] = (mult[x.name]===0?0:mult[x.name]*0.5));
    t.damage_relations.no_damage_from.forEach(x => mult[x.name] = 0);
  });
  return mult;
}

function idFromUrl(url){
  const parts = url.split('/').filter(Boolean);
  return parseInt(parts[parts.length-1], 10);
}

/* ---------------- STATE PANELS ---------------- */
function showLoading(){ setView('loading'); }
function showError(query){
  setView('error');
  els.errorMessage.textContent = t('errorMessage', query);
}

/* ---------------- RENDER DETAIL ---------------- */
function renderDetail(pokemon, species, evoChain, typeMult){
  const primaryType = pokemon.types[0].type.name;
  const gradient = `linear-gradient(135deg, var(--t-${primaryType}), var(--t-${primaryType}-2))`;

  const artworkSets = getSpriteSet(pokemon);
  const defaultSprite = artworkSets.find(s=>s.available) || artworkSets[0];

  const genus = (species.genera.find(g=>g.language.name==='en') || {}).genus || '';
  const flavor = (species.flavor_text_entries.find(f=>f.language.name==='en') || {}).flavor_text || '';

  const isFav = state.favorites.includes(pokemon.id);

  els.detailCard.innerHTML = `
    <div class="dc-hero" style="background:${gradient}">
      <button class="dc-fav ${isFav?'active':''}" id="favBtn" title="Toggle favorite">${isFav?'❤️':'🤍'}</button>
      <div class="dc-num">#${String(pokemon.id).padStart(3,'0')}</div>
      <div class="dc-art-wrap">
        <img class="dc-art" id="dcArt" src="${defaultSprite ? defaultSprite.src : ''}" alt="${pokemon.name}" onerror="this.style.opacity=0.2" />
      </div>
      <h1 class="dc-name">${pokemon.name.replace(/-/g,' ')}</h1>
      <div class="dc-genus">${escapeHtml(genus)}</div>
      <div class="dc-types">
        ${pokemon.types.map(t=>typeBadge(t.type.name)).join('')}
      </div>
      <div class="sprite-selector" id="spriteSelector">
        ${artworkSets.map((s)=>`<button class="sprite-chip ${s===defaultSprite?'active':''}" data-src="${s.src||''}" ${s.available?'':'disabled style="opacity:.35;cursor:not-allowed"'}>${s.label}</button>`).join('')}
      </div>
      <button class="dc-cry" id="cryBtn">🔊 Play cry</button>
      <div class="dc-export-row">
        <button class="sprite-chip" id="exportPngBtn">📥 ${t('exportPng')}</button>
        <button class="sprite-chip" id="shareCardBtn">🔗 ${t('shareCard')}</button>
      </div>
    </div>

    <div class="dc-body">
      <p style="color:#5B6478; font-weight:600; max-width:600px; margin: 4px auto 0; text-align:center;">${escapeHtml(flavor.replace(/\f|\n/g,' '))}</p>

      <div class="info-grid">
        <div class="info-cell"><div class="label">${t('height')}</div><div class="value">${(pokemon.height/10).toFixed(1)} m</div></div>
        <div class="info-cell"><div class="label">${t('weight')}</div><div class="value">${(pokemon.weight/10).toFixed(1)} kg</div></div>
        <div class="info-cell"><div class="label">${t('baseXp')}</div><div class="value">${pokemon.base_experience ?? '—'}</div></div>
        <div class="info-cell"><div class="label">${t('habitat')}</div><div class="value">${species.habitat ? species.habitat.name.replace(/-/g,' ') : t('unknown')}</div></div>
        <div class="info-cell"><div class="label">${t('shape')}</div><div class="value">${species.shape ? species.shape.name.replace(/-/g,' ') : '—'}</div></div>
        <div class="info-cell"><div class="label">${t('color')}</div><div class="value">${species.color ? species.color.name : '—'}</div></div>
        <div class="info-cell"><div class="label">${t('generation')}</div><div class="value">${species.generation.name.replace('generation-','Gen ').toUpperCase()}</div></div>
        <div class="info-cell"><div class="label">${t('speciesNum')}</div><div class="value">${String(pokemon.id).padStart(4,'0')}</div></div>
      </div>

      <h2 class="section-title">${t('abilities')}</h2>
      <div class="abilities-list" id="abilitiesList">
        ${pokemon.abilities.map(a=>`
          <div class="ability-chip ${a.is_hidden?'hidden-ability':''}" data-ability="${a.ability.name}">
            ${a.ability.name.replace(/-/g,' ')}<span class="tag">${a.is_hidden?'hidden':''}</span>
            <div class="ability-tooltip">…</div>
          </div>
        `).join('')}
      </div>

      <h2 class="section-title">${t('baseStats')}</h2>
      <div class="stats-wrap" id="statsWrap">
        ${pokemon.stats.map(s=>statRow(s)).join('')}
      </div>

      <h2 class="section-title">${t('typeMatchups')}</h2>
      <div class="weak-grid">
        <div class="weak-row"><span class="weak-label">${t('weakAgainst')}</span>${weaknessBadges(typeMult, m=>m>1)}</div>
        <div class="weak-row"><span class="weak-label">${t('resists')}</span>${weaknessBadges(typeMult, m=>m>0 && m<1)}</div>
        <div class="weak-row"><span class="weak-label">${t('immuneTo')}</span>${weaknessBadges(typeMult, m=>m===0)}</div>
      </div>

      ${evoChain && evoChain.length > 1 ? `
      <h2 class="section-title">${t('evolutionChain')}</h2>
      <div class="evo-track" id="evoTrack">
        ${evoChain.map((e,i)=>`
          ${i>0?'<span class="evo-arrow">→</span>':''}
          <div class="evo-node" data-id="${e.id}">
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${e.id}.png" alt="${e.name}" loading="lazy" />
            <div class="evo-name">${e.name.replace(/-/g,' ')}</div>
          </div>
        `).join('')}
      </div>` : ''}

      <h2 class="section-title">${t('notableMoves')}</h2>
      <div class="moves-grid">
        ${pokemon.moves.slice(0,8).map(m=>`
          <div class="move-chip">
            <div class="move-name">${m.move.name.replace(/-/g,' ')}</div>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  document.getElementById('favBtn').addEventListener('click', ()=> toggleFavorite(pokemon));

  document.querySelectorAll('#spriteSelector .sprite-chip').forEach(chip=>{
    chip.addEventListener('click', ()=>{
      if(chip.disabled) return;
      document.querySelectorAll('#spriteSelector .sprite-chip').forEach(c=>c.classList.remove('active'));
      chip.classList.add('active');
      const img = document.getElementById('dcArt');
      img.style.opacity = 0;
      setTimeout(()=>{ img.src = chip.dataset.src; img.style.opacity = 1; }, 150);
    });
  });

  document.getElementById('cryBtn').addEventListener('click', ()=>{
    const cryUrl = pokemon.cries && (pokemon.cries.latest || pokemon.cries.legacy);
    if(cryUrl){
      const audio = new Audio(cryUrl);
      audio.volume = state.soundOn ? 0.7 : 0;
      audio.play().catch(()=>{});
    } else {
      showToast(t('noCry'));
    }
  });

  document.getElementById('exportPngBtn').addEventListener('click', async ()=>{
    showToast(t('generatingCard'));
    try{
      const canvas = await buildExportCanvas(pokemon, species);
      downloadCanvasPNG(canvas, `${pokemon.name}-pokedex-card.png`);
      showToast(t('cardDownloaded'));
    }catch(e){ console.error(e); showToast(t('cardExportFail')); }
  });

  document.getElementById('shareCardBtn').addEventListener('click', async ()=>{
    try{
      const canvas = await buildExportCanvas(pokemon, species);
      canvas.toBlob(async (blob)=>{
        if(!blob){ showToast(t('cardExportFail')); return; }
        const file = new File([blob], `${pokemon.name}-pokedex-card.png`, { type:'image/png' });
        if(navigator.canShare && navigator.canShare({ files:[file] })){
          try{ await navigator.share({ files:[file], title: capitalize(pokemon.name), text: t('shareText', capitalize(pokemon.name)) }); }
          catch(err){ /* user cancelled the native share sheet */ }
        } else {
          downloadCanvasPNG(canvas, `${pokemon.name}-pokedex-card.png`);
          showToast(t('shareFallback'));
        }
      }, 'image/png');
    }catch(e){ console.error(e); showToast(t('cardExportFail')); }
  });

  document.querySelectorAll('.evo-node').forEach(node=>{
    node.addEventListener('click', ()=> loadPokemon(node.dataset.id));
  });

  requestAnimationFrame(()=>{
    document.querySelectorAll('.stat-fill').forEach(bar=>{
      const target = bar.dataset.width;
      setTimeout(()=>{ bar.style.width = target + '%'; }, 80);
    });
    animateCountUp();
  });

  document.querySelectorAll('.ability-chip').forEach(chip=>{
    let loaded = false;
    chip.addEventListener('mouseenter', async ()=>{
      if(loaded) return;
      loaded = true;
      try{
        const res = await fetch(`${API}/ability/${chip.dataset.ability}`);
        const data = await res.json();
        const entry = data.effect_entries.find(e=>e.language.name==='en');
        chip.querySelector('.ability-tooltip').textContent = entry ? entry.short_effect : 'No description available.';
      }catch(e){
        chip.querySelector('.ability-tooltip').textContent = 'No description available.';
      }
    });
  });

  els.prevBtn.disabled = pokemon.id <= 1;
  els.prevBtn.style.opacity = pokemon.id <= 1 ? .5 : 1;
}

function statRow(s){
  const label = { 'hp':'HP', 'attack':'ATK', 'defense':'DEF', 'special-attack':'SP.ATK', 'special-defense':'SP.DEF', 'speed':'SPD' }[s.stat.name] || s.stat.name;
  const pct = Math.min(100, Math.round((s.base_stat/180)*100));
  return `
    <div class="stat-row">
      <div class="stat-name">${label}</div>
      <div class="stat-track"><div class="stat-fill" data-width="${pct}"></div></div>
      <div class="stat-val" data-count="${s.base_stat}">0</div>
    </div>
  `;
}
function animateCountUp(){
  document.querySelectorAll('.stat-val').forEach(el=>{
    const target = parseInt(el.dataset.count, 10);
    let cur = 0;
    const step = Math.max(1, Math.round(target/24));
    const timer = setInterval(()=>{
      cur += step;
      if(cur >= target){ cur = target; clearInterval(timer); }
      el.textContent = cur;
    }, 25);
  });
}

function weaknessBadges(typeMult, filterFn){
  if(!typeMult) return `<span style="color:#9AA3B5; font-weight:600; font-size:.85rem;">${t('unavailable')}</span>`;
  const list = Object.entries(typeMult).filter(([,m])=>filterFn(m));
  if(list.length === 0) return `<span style="color:#9AA3B5; font-weight:600; font-size:.85rem;">${t('none')}</span>`;
  return list.map(([type,m])=> typeBadge(type, m)).join('');
}

function typeBadge(type, mult){
  const suffix = mult && mult !== 1 ? ` <span style="opacity:.85">${mult}×</span>` : '';
  return `<span class="type-badge t-${type}" data-type="${type}">${TYPE_EMOJI[type]||''} ${type}${suffix}</span>`;
}

function getSpriteSet(pokemon){
  const s = pokemon.sprites;
  const official = s.other && s.other['official-artwork'] && s.other['official-artwork'].front_default;
  const home = s.other && s.other.home && s.other.home.front_default;
  const dream = s.other && s.other.dream_world && s.other.dream_world.front_default;
  const shiny = s.front_shiny;
  const female = s.front_female;
  const classic = s.front_default;
  const animated = s.versions && s.versions['generation-v'] && s.versions['generation-v']['black-white'] &&
    s.versions['generation-v']['black-white'].animated && s.versions['generation-v']['black-white'].animated.front_default;

  return [
    { label:'Artwork', src: official, available: !!official },
    { label:'Home', src: home, available: !!home },
    { label:'Classic', src: classic, available: !!classic },
    { label:'Animated', src: animated, available: !!animated },
    { label:'Shiny', src: shiny, available: !!shiny },
    { label:'Female', src: female, available: !!female },
    { label:'Dream World', src: dream, available: !!dream },
  ];
}

function pickIdleSprite(pokemon){
  const s = pokemon.sprites;
  const animated = s.versions && s.versions['generation-v'] && s.versions['generation-v']['black-white'] &&
    s.versions['generation-v']['black-white'].animated && s.versions['generation-v']['black-white'].animated.front_default;
  const official = s.other && s.other['official-artwork'] && s.other['official-artwork'].front_default;
  return animated || official || s.front_default || '';
}

/* ---------------- FAVORITES ---------------- */
function toggleFavorite(pokemon){
  const idx = state.favorites.indexOf(pokemon.id);
  if(idx >= 0){
    state.favorites.splice(idx,1);
    showToast(t('favRemoved', capitalize(pokemon.name)));
  } else {
    state.favorites.push(pokemon.id);
    showToast(t('favAdded', capitalize(pokemon.name)));
    state.progress.favoritesAdded += 1;
    saveProgress();
    checkAchievements();
  }
  localStorage.setItem('pokedex_favorites', JSON.stringify(state.favorites));
  const btn = document.getElementById('favBtn');
  if(btn){
    btn.classList.toggle('active');
    btn.textContent = btn.classList.contains('active') ? '❤️' : '🤍';
    btn.style.transform = 'scale(1.3)';
    setTimeout(()=> btn.style.transform = '', 180);
  }
  els.favCount.textContent = state.favorites.length;
  renderFavorites();
}

/* ---------------- RECENT ---------------- */
function addRecent(pokemon){
  state.recent = state.recent.filter(p=>p.id !== pokemon.id);
  state.recent.unshift({
    id: pokemon.id,
    name: pokemon.name,
    sprite: (pokemon.sprites.other && pokemon.sprites.other['official-artwork'].front_default) || pokemon.sprites.front_default,
    types: pokemon.types.map(t=>t.type.name),
  });
  state.recent = state.recent.slice(0,10);
  localStorage.setItem('pokedex_recent', JSON.stringify(state.recent));
  renderRecent();
}

/* ---------------- RENDER RAILS ---------------- */
function miniCard(id, name, sprite, types, delay){
  return `
    <div class="mini-card" data-id="${id}" style="animation-delay:${delay*0.04}s">
      <img src="${sprite}" alt="${name}" loading="lazy" />
      <div class="mini-num">#${String(id).padStart(3,'0')}</div>
      <div class="mini-name">${name.replace(/-/g,' ')}</div>
      <div class="mini-types">${types.map(t=>typeBadge(t)).join('')}</div>
    </div>
  `;
}

function renderTrending(){
  els.trendingTrack.innerHTML = TRENDING_IDS.map((id,i)=>`
    <div class="mini-card" data-id="${id}" style="animation-delay:${i*0.04}s">
      <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png" alt="pokemon ${id}" loading="lazy" />
      <div class="mini-num">#${String(id).padStart(3,'0')}</div>
      <div class="mini-name" id="trend-name-${id}">…</div>
      <div class="mini-types" id="trend-types-${id}"></div>
    </div>
  `).join('');

  attachMiniCardClicks(els.trendingTrack);

  TRENDING_IDS.forEach(async id=>{
    try{
      const res = await fetch(`${API}/pokemon/${id}`);
      const data = await res.json();
      const nameEl = document.getElementById(`trend-name-${id}`);
      const typesEl = document.getElementById(`trend-types-${id}`);
      if(nameEl) nameEl.textContent = data.name.replace(/-/g,' ');
      if(typesEl) typesEl.innerHTML = data.types.map(t=>typeBadge(t.type.name)).join('');
    }catch(e){ /* ignore */ }
  });
}

function renderRecent(){
  if(state.recent.length === 0){
    els.recentTrack.innerHTML = `<p class="rail-empty">${t('recentEmpty')}</p>`;
    return;
  }
  els.recentTrack.innerHTML = state.recent.map((p,i)=>miniCard(p.id,p.name,p.sprite,p.types,i)).join('');
  attachMiniCardClicks(els.recentTrack);
}

function renderFavorites(){
  els.favCount.textContent = state.favorites.length;
  if(state.favorites.length === 0){
    els.favTrack.innerHTML = `<p class="rail-empty">${t('favEmpty')}</p>`;
    return;
  }
  els.favTrack.innerHTML = state.favorites.map((id,i)=>`
    <div class="mini-card" data-id="${id}" style="animation-delay:${i*0.04}s">
      <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png" alt="pokemon ${id}" loading="lazy" />
      <div class="mini-num">#${String(id).padStart(3,'0')}</div>
      <div class="mini-name" id="fav-name-${id}">…</div>
      <div class="mini-types" id="fav-types-${id}"></div>
    </div>
  `).join('');
  attachMiniCardClicks(els.favTrack);

  state.favorites.forEach(async id=>{
    try{
      const res = await fetch(`${API}/pokemon/${id}`);
      const data = await res.json();
      const nameEl = document.getElementById(`fav-name-${id}`);
      const typesEl = document.getElementById(`fav-types-${id}`);
      if(nameEl) nameEl.textContent = data.name.replace(/-/g,' ');
      if(typesEl) typesEl.innerHTML = data.types.map(t=>typeBadge(t.type.name)).join('');
    }catch(e){ /* ignore */ }
  });
}

function attachMiniCardClicks(container){
  container.querySelectorAll('.mini-card').forEach(card=>{
    card.addEventListener('click', (e)=>{
      if(e.target.closest('.type-badge')) return; // let the type-badge handler open the type modal instead
      loadPokemon(card.dataset.id);
    });
  });
}

/* ---------------- CATALOG ---------------- */
function renderCatalogFilters(){
  const activeType = state.catalog.filterType;
  const allBtn = `<button class="filter-chip ${!activeType?'active':''}" data-type="">${t('allTypes')}</button>`;
  const chips = ALL_TYPES.map(ty=>`<button class="filter-chip ${activeType===ty?'active':''}" data-type="${ty}">${TYPE_EMOJI[ty]||''} ${ty}</button>`).join('');
  els.catalogFilters.innerHTML = allBtn + chips;
  els.catalogFilters.querySelectorAll('.filter-chip').forEach(chip=>{
    chip.addEventListener('click', ()=>{
      els.catalogFilters.querySelectorAll('.filter-chip').forEach(c=>c.classList.remove('active'));
      chip.classList.add('active');
      state.catalog.filterType = chip.dataset.type || null;
      state.catalog.filterRegion = null;
      updateCatalogRegionBanner();
      loadCatalogBatch(true);
    });
  });
}

function updateCatalogRegionBanner(){
  if(state.catalog.filterRegion){
    els.catalogRegionBanner.hidden = false;
    const [start,end] = state.catalog.filterRegion.range;
    els.catalogRegionText.textContent = `${t('showingRegion')}: ${state.catalog.filterRegion.name} (#${start}–${end})`;
  } else {
    els.catalogRegionBanner.hidden = true;
  }
}

async function loadCatalogBatch(reset){
  if(reset){
    state.catalog.offset = 0;
    state.catalog.endReached = false;
    els.catalogGrid.innerHTML = '';
  }
  if(state.catalog.endReached){ els.loadMoreBtn.hidden = true; return; }

  els.catalogLoadingDots.hidden = false;
  els.loadMoreBtn.disabled = true;

  try{
    if(state.catalog.filterRegion){
      const region = state.catalog.filterRegion;
      let ids = state.catalog.regionIdsCache[region.key];
      if(!ids){
        ids = [];
        for(let id=region.range[0]; id<=region.range[1]; id++) ids.push(id);
        state.catalog.regionIdsCache[region.key] = ids;
      }
      const slice = ids.slice(state.catalog.offset, state.catalog.offset + state.catalog.limit);
      slice.forEach((id,i)=> appendCatalogCard(id, state.nameById[id] || ('pokemon-'+id), i));
      state.catalog.offset += state.catalog.limit;
      state.catalog.endReached = state.catalog.offset >= ids.length;
    } else if(state.catalog.filterType){
      let list = state.catalog.typeListCache[state.catalog.filterType];
      if(!list){
        const res = await fetch(`${API}/type/${state.catalog.filterType}`);
        const data = await res.json();
        list = data.pokemon.map(p=>({ name: p.pokemon.name, id: idFromUrl(p.pokemon.url) })).sort((a,b)=>a.id-b.id);
        state.catalog.typeListCache[state.catalog.filterType] = list;
      }
      const slice = list.slice(state.catalog.offset, state.catalog.offset + state.catalog.limit);
      slice.forEach((p,i)=> appendCatalogCard(p.id, p.name, i));
      state.catalog.offset += state.catalog.limit;
      state.catalog.endReached = state.catalog.offset >= list.length;
    } else {
      const res = await fetch(`${API}/pokemon?limit=${state.catalog.limit}&offset=${state.catalog.offset}`);
      const data = await res.json();
      data.results.forEach((p,i)=> appendCatalogCard(idFromUrl(p.url), p.name, i));
      state.catalog.offset += state.catalog.limit;
      state.catalog.endReached = !data.next;
    }
  }catch(e){
    console.error(e);
    showToast(t('catalogLoadFail'));
  }

  els.catalogLoadingDots.hidden = true;
  els.loadMoreBtn.disabled = false;
  els.loadMoreBtn.hidden = state.catalog.endReached;
}

function appendCatalogCard(id, name, i){
  const div = document.createElement('div');
  div.className = 'mini-card';
  div.dataset.id = id;
  div.style.animationDelay = (i*0.03)+'s';
  div.innerHTML = `
    <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png" alt="${name}" loading="lazy" onerror="this.onerror=null;this.src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png'"/>
    <div class="mini-num">#${String(id).padStart(3,'0')}</div>
    <div class="mini-name">${name.replace(/-/g,' ')}</div>
    <div class="mini-types" id="cat-types-${id}"></div>
  `;
  div.addEventListener('click', (e)=>{
    if(e.target.closest('.type-badge')) return;
    loadPokemon(id);
  });
  els.catalogGrid.appendChild(div);
  fetch(`${API}/pokemon/${id}`).then(r=>r.json()).then(data=>{
    const typesEl = document.getElementById(`cat-types-${id}`);
    if(typesEl) typesEl.innerHTML = data.types.map(t=>typeBadge(t.type.name)).join('');
  }).catch(()=>{});
}

/* ---------------- TYPE MODAL ---------------- */
async function openTypeModal(type){
  els.typeModalOverlay.hidden = false;
  els.typeModalHeader.innerHTML = `<h2>${TYPE_EMOJI[type]||''} ${type}</h2><p>${t('loadingText')}</p>`;
  els.typeModalBody.innerHTML = '';
  try{
    const res = await fetch(`${API}/type/${type}`);
    const data = await res.json();
    const list = data.pokemon.map(p=>({name:p.pokemon.name, id: idFromUrl(p.pokemon.url)})).sort((a,b)=>a.id-b.id);
    const shown = list.slice(0,60);
    els.typeModalHeader.innerHTML = `<h2>${TYPE_EMOJI[type]||''} ${type}</h2><p>${t('typeModalNote', shown.length, list.length)}</p>`;
    els.typeModalBody.innerHTML = shown.map((p,i)=>`
      <div class="mini-card" data-id="${p.id}" style="animation-delay:${i*0.02}s">
        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${p.id}.png" alt="${p.name}" loading="lazy" onerror="this.onerror=null;this.src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${p.id}.png'"/>
        <div class="mini-num">#${String(p.id).padStart(3,'0')}</div>
        <div class="mini-name">${p.name.replace(/-/g,' ')}</div>
      </div>
    `).join('');
    els.typeModalBody.querySelectorAll('.mini-card').forEach(card=>{
      card.addEventListener('click', ()=>{ closeTypeModal(); loadPokemon(card.dataset.id); });
    });
  }catch(e){
    els.typeModalBody.innerHTML = `<p>Failed to load.</p>`;
  }
}
function closeTypeModal(){ els.typeModalOverlay.hidden = true; }

/* ---------------- LANDING PAGE: RANDOM DISCOVERY ---------------- */
async function renderRandomDiscovery(forceId){
  const container = els.discoveryCard;
  container.innerHTML = `<div class="discovery-loading"><div class="pokeball-spinner small"><div class="pb-inner"></div></div></div>`;
  const id = forceId || (Math.floor(Math.random()*1010) + 1);
  state.discoveryId = id;
  try{
    const [pRes, sRes] = await Promise.all([
      fetch(`${API}/pokemon/${id}`),
      fetch(`${API}/pokemon-species/${id}`),
    ]);
    const data = await pRes.json();
    const species = await sRes.json();
    if(state.discoveryId !== id) return; // a newer shuffle superseded this one

    const flavorRaw = (species.flavor_text_entries.find(f=>f.language.name==='en') || {}).flavor_text || '';
    const flavor = flavorRaw.replace(/\f|\n/g,' ').trim();
    const flavorShort = flavor.length > 140 ? flavor.slice(0,140).trim()+'…' : flavor;
    const primaryType = data.types[0].type.name;
    const gradient = `linear-gradient(135deg, var(--t-${primaryType}), var(--t-${primaryType}-2))`;
    // Memanggil fungsi pickIdleSprite untuk mengutamakan versi animasi (GIF)
    const sprite = pickIdleSprite(data);

    container.innerHTML = `
      <div class="discovery-inner" style="background:${gradient}">
        <img src="${sprite}" alt="${data.name}" class="discovery-art" />
        <div class="discovery-info">
          <div class="discovery-num">#${String(data.id).padStart(3,'0')}</div>
          <div class="discovery-name">${data.name.replace(/-/g,' ')}</div>
          <div class="discovery-types">${data.types.map(ty=>typeBadge(ty.type.name)).join('')}</div>
          <p class="discovery-flavor">${escapeHtml(flavorShort)}</p>
          <div class="discovery-actions">
            <button class="btn btn-soft" id="discoveryShuffleBtn">🔀 ${t('shuffle')}</button>
            <button class="btn btn-primary" id="discoveryViewBtn">${t('viewDetails')} →</button>
          </div>
        </div>
      </div>
    `;
    document.getElementById('discoveryShuffleBtn').addEventListener('click', ()=>{ playThrow(); renderRandomDiscovery(); });
    document.getElementById('discoveryViewBtn').addEventListener('click', ()=> loadPokemon(data.id));
  }catch(e){
    console.error(e);
    container.innerHTML = `<p class="rail-empty">${t('catalogLoadFail')}</p>`;
  }
}

/* ---------------- LANDING PAGE: EXPLORE BY REGION ---------------- */
function renderRegionGrid(){
  els.regionGrid.innerHTML = REGIONS.map(r=>`
    <button class="region-card" data-key="${r.key}">
      <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${r.repId}.png" alt="${r.name}" loading="lazy" />
      <div class="region-name">${r.name}</div>
      <div class="region-gen">Gen ${r.gen} · #${r.range[0]}–${r.range[1]}</div>
    </button>
  `).join('');
  els.regionGrid.querySelectorAll('.region-card').forEach(card=>{
    card.addEventListener('click', ()=>{
      const region = REGIONS.find(r=>r.key === card.dataset.key);
      state.catalog.filterType = null;
      state.catalog.filterRegion = region;
      renderCatalogFilters();
      openCatalog(true);
    });
  });
}

/* ---------------- LANDING PAGE: TOP STRONGEST ---------------- */
async function renderTopStrongest(){
  if(state.strongestCache){ paintStrongest(state.strongestCache); return; }
  els.strongestList.innerHTML = `<div class="dots"><span></span><span></span><span></span></div>`;
  try{
    const results = await Promise.all(STRONGEST_IDS.map(id => fetch(`${API}/pokemon/${id}`).then(r=>r.json())));
    const withBst = results.map(p=>({ p, bst: p.stats.reduce((s,x)=> s+x.base_stat, 0) }));
    withBst.sort((a,b)=> b.bst - a.bst);
    state.strongestCache = withBst.slice(0,10);
    paintStrongest(state.strongestCache);
  }catch(e){
    console.error(e);
    els.strongestList.innerHTML = `<p class="rail-empty">${t('catalogLoadFail')}</p>`;
  }
}

function paintStrongest(list){
  els.strongestList.innerHTML = list.map((entry,i)=>{
    const p = entry.p;
    const sprite = (p.sprites.other && p.sprites.other['official-artwork'].front_default) || p.sprites.front_default;
    return `
      <div class="strongest-row" data-id="${p.id}">
        <div class="strongest-rank">#${i+1}</div>
        <img src="${sprite}" alt="${p.name}" loading="lazy" />
        <div class="strongest-info">
          <div class="strongest-name">${p.name.replace(/-/g,' ')}</div>
          <div class="strongest-types">${p.types.map(ty=>typeBadge(ty.type.name)).join('')}</div>
        </div>
        <div class="strongest-bst">${entry.bst}<span>BST</span></div>
      </div>
    `;
  }).join('');
  els.strongestList.querySelectorAll('.strongest-row').forEach(row=>{
    row.addEventListener('click', (e)=>{
      if(e.target.closest('.type-badge')) return;
      loadPokemon(row.dataset.id);
    });
  });
}

/* ---------------- LANDING PAGE: FUN FACTS ---------------- */
function renderFunFacts(){
  const facts = FUN_FACTS[state.lang] || FUN_FACTS.en;
  const picked = [...facts].sort(()=> Math.random()-0.5).slice(0,3);
  els.funFactsGrid.innerHTML = picked.map(f=>`
    <div class="fun-fact-card">💡<p>${escapeHtml(f)}</p></div>
  `).join('');
}

/* ---------------- BATTLE ---------------- */
async function selectBattlePokemon(key, nameOrId){
  try{
    const res = await fetch(`${API}/pokemon/${nameOrId}`);
    if(!res.ok) throw new Error('not-found');
    const data = await res.json();
    state.battle[key] = data;
    const previewEl = key === 'p1' ? els.p1Preview : els.p2Preview;
    const inputEl = key === 'p1' ? els.p1SearchInput : els.p2SearchInput;
    const sprite = (data.sprites.other && data.sprites.other['official-artwork'].front_default) || data.sprites.front_default;
    previewEl.innerHTML = `<img src="${sprite}" alt="${data.name}"/>`;
    inputEl.value = capitalize(data.name);
    checkBattleReady();
  }catch(e){
    showToast(t('notFoundToast', nameOrId));
  }
}
function checkBattleReady(){
  els.fightBtn.disabled = !(state.battle.p1 && state.battle.p2);
}
function resetBattle(){
  state.battle = { p1: null, p2: null };
  els.p1Preview.innerHTML = `<div class="picker-placeholder">?</div>`;
  els.p2Preview.innerHTML = `<div class="picker-placeholder">?</div>`;
  els.p1SearchInput.value = '';
  els.p2SearchInput.value = '';
  
  // 👉 TAMBAHAN BARU: Buka kembali kolom pencarian
  els.p1SearchInput.disabled = false;
  els.p2SearchInput.disabled = false;
  
  els.fightBtn.disabled = true;
  els.arena.hidden = true;
  els.battleLog.hidden = true;
  els.battleLog.innerHTML = '';
  els.battleResetBtn.hidden = true;
  els.fighterLeft.className = 'fighter fighter-left';
  els.fighterRight.className = 'fighter fighter-right';
  const ko1 = document.getElementById('f1KoText');
  const ko2 = document.getElementById('f2KoText');
  if(ko1) ko1.className = 'ko-container';
  if(ko2) ko2.className = 'ko-container';
}

function statVal(pokemon, key){ return pokemon.stats.find(s=>s.stat.name===key).base_stat; }

function prepFighter(pokemon){
  const hp = statVal(pokemon,'hp');
  const atk = (statVal(pokemon,'attack') + statVal(pokemon,'special-attack')) / 2;
  const def = (statVal(pokemon,'defense') + statVal(pokemon,'special-defense')) / 2;
  const speed = statVal(pokemon,'speed');
  const maxHp = Math.round(hp*2 + 20);
  return { pokemon, maxHp, hp: maxHp, atk, def, speed, types: pokemon.types.map(t=>t.type.name) };
}

function sleep(ms){ return new Promise(r=> setTimeout(r, ms)); }

function updateHpBar(fillEl, textEl, hp, maxHp){
  const pct = Math.max(0, Math.round((hp/maxHp)*100));
  fillEl.style.width = pct + '%';
  fillEl.classList.toggle('hp-mid', pct<=50 && pct>20);
  fillEl.classList.toggle('hp-low', pct<=20);
  textEl.textContent = `${Math.max(0,Math.round(hp))} / ${maxHp} HP`;
}

function addLog(text, cls){
  const div = document.createElement('div');
  div.className = 'log-line ' + (cls||'');
  div.textContent = text;
  els.battleLog.appendChild(div);
  els.battleLog.scrollTop = els.battleLog.scrollHeight;
}

async function runBattle(){
  if(!state.battle.p1 || !state.battle.p2){ showToast(t('pickBothPlayers')); return; }
  
  // 👉 TAMBAHAN BARU: Buat ID unik & kunci input
  state.activeBattleId = (state.activeBattleId || 0) + 1;
  const myBattleId = state.activeBattleId;
  els.p1SearchInput.disabled = true;
  els.p2SearchInput.disabled = true;

  const ko1 = document.getElementById('f1KoText');
  const ko2 = document.getElementById('f2KoText');
  if(ko1) ko1.className = 'ko-container';
  if(ko2) ko2.className = 'ko-container';
  playThrow();
  els.fightBtn.disabled = true;
  els.arena.hidden = false;
  els.battleLog.hidden = false;
  els.battleLog.innerHTML = '';
  els.battleResetBtn.hidden = true;
  els.fighterLeft.className = 'fighter fighter-left';
  els.fighterRight.className = 'fighter fighter-right';

  const f1 = prepFighter(state.battle.p1);
  const f2 = prepFighter(state.battle.p2);

  els.f1Name.textContent = capitalize(f1.pokemon.name);
  els.f2Name.textContent = capitalize(f2.pokemon.name);
  els.f1Sprite.src = pickIdleSprite(f1.pokemon);
  els.f2Sprite.src = pickIdleSprite(f2.pokemon);
  updateHpBar(els.f1HpFill, els.f1HpText, f1.hp, f1.maxHp);
  updateHpBar(els.f2HpFill, els.f2HpText, f2.hp, f2.maxHp);

  addLog(t('battleStartLog', capitalize(f1.pokemon.name), capitalize(f2.pokemon.name)));
  await sleep(500);

  let mult1v2 = 1, mult2v1 = 1;
  try{
    const [m2, m1] = await Promise.all([ fetchTypeRelations(f2.types), fetchTypeRelations(f1.types) ]);
    mult1v2 = Math.max(...f1.types.map(ty => m2[ty] ?? 1));
    mult2v1 = Math.max(...f2.types.map(ty => m1[ty] ?? 1));
  }catch(e){ /* fall back to neutral multipliers */ }

  let round = 1;
  while(f1.hp > 0 && f2.hp > 0 && round <= 40){
    const firstIs1 = f1.speed === f2.speed ? Math.random() < 0.5 : f1.speed > f2.speed;
    const order = firstIs1
      ? [['left', f1, f2, mult1v2], ['right', f2, f1, mult2v1]]
      : [['right', f2, f1, mult2v1], ['left', f1, f2, mult1v2]];

    for(const [side, attacker, defender, mult] of order){
      // 👉 TAMBAHAN BARU: Hentikan loop jika ada pertarungan baru
      if(state.activeBattleId !== myBattleId) return; 
      
      if(attacker.hp <= 0 || defender.hp <= 0) continue;
      
      // Jangan lupa teruskan myBattleId ke performAttack
      await performAttack(side, attacker, defender, mult, f1, f2, myBattleId);
      
      if(state.activeBattleId !== myBattleId) return; 
      if(defender.hp <= 0) break;
    }
    round++;
  }

  // 👉 TAMBAHAN BARU: Cegah modal kemenangan muncul dari pertarungan yang sudah batal
  if(state.activeBattleId !== myBattleId) return; 

  await sleep(300);
  state.progress.battlesPlayed += 1;
  if(f1.hp <= 0 && f2.hp <= 0){
    addLog(t('drawLog'), 'winner-line');
  } else {
    const f1Wins = f1.hp > 0;
    const winner = f1Wins ? f1 : f2;
    const winnerEl = f1Wins ? els.fighterLeft : els.fighterRight;
    winnerEl.classList.add('winner');
    addLog(t('winnerLog', capitalize(winner.pokemon.name)), 'winner-line');
    state.progress.battlesWon += 1;

    const p1Name = document.getElementById('p1Label')?.innerText.trim() || 'Player 1';
    const p2Name = document.getElementById('p2Label')?.innerText.trim() || 'Player 2';
    const winnerName = f1Wins ? p1Name : p2Name;
    const victoryText = state.lang === 'id' ? `${winnerName} memenangkan pertandingan!` : `${winnerName} wins the battle!`;
    
    const vModal = document.getElementById('victoryModal');
    const vMessage = document.getElementById('victoryMessage');
    const vSprite = document.getElementById('victorySprite');
    if(vModal && vMessage && vSprite) {
      vMessage.innerText = victoryText;
      vSprite.src = pickIdleSprite(winner.pokemon);
      vModal.hidden = false;
      playVictorySound();
    }
  }
  saveProgress();
  checkAchievements();
  els.battleResetBtn.hidden = false;
}

// Tambahkan parameter myBattleId di bagian paling belakang
async function performAttack(side, attacker, defender, mult, f1, f2, myBattleId){
  if(state.activeBattleId !== myBattleId) return;

  const attackerEl = side === 'left' ? els.fighterLeft : els.fighterRight;
  const defenderEl = side === 'left' ? els.fighterRight : els.fighterLeft;

  attackerEl.classList.add(side === 'left' ? 'attacking-left' : 'attacking-right');
  playClick();
  await sleep(320);

  if(state.activeBattleId !== myBattleId) return; // Cek lagi setelah sleep

  const variance = 0.85 + Math.random()*0.3;
  let dmg = Math.round((attacker.atk / defender.def) * 16 * variance * mult);
  dmg = Math.max(3, Math.min(dmg, Math.round(defender.maxHp * 0.42)));

  defender.hp = Math.max(0, defender.hp - dmg);

  defenderEl.classList.add('hit');
  const defenderIsF1 = defender === f1;
  updateHpBar(
    defenderIsF1 ? els.f1HpFill : els.f2HpFill,
    defenderIsF1 ? els.f1HpText : els.f2HpText,
    defender.hp, defender.maxHp
  );

  let effText = '';
  if(mult > 1) effText = t('superEffective');
  else if(mult > 0 && mult < 1) effText = t('notVeryEffective');
  else if(mult === 0) effText = t('noEffect');

  addLog(
    t('attackLog', capitalize(attacker.pokemon.name), dmg, effText),
    mult > 1 ? 'super' : (mult < 1 && mult > 0 ? 'notvery' : '')
  );

  await sleep(480);
  if(state.activeBattleId !== myBattleId) return; // Cek lagi

  attackerEl.classList.remove('attacking-left','attacking-right');
  defenderEl.classList.remove('hit');

  if(defender.hp <= 0){
    defenderEl.classList.add('ko');
    addLog(t('faintedLog', capitalize(defender.pokemon.name)));
    
    const koEl = defenderIsF1 ? document.getElementById('f1KoText') : document.getElementById('f2KoText');
    if(koEl) koEl.classList.add('ko-animate-in');

    await sleep(500);
  } else {
    await sleep(220);
  }
}

/* ---------------- VICTORY SOUND & MODAL CLOSE ---------------- */
document.getElementById('victoryCloseBtn')?.addEventListener('click', () => {
  document.getElementById('victoryModal').hidden = true;
});

function playVictorySound() {
  if (!state.soundOn) return;
  try {
    const victorySound = new Audio('assets/GAMECas-Casino_grand_prize_w-Elevenlabs.mp3');
    victorySound.volume = 0.8;
    victorySound.play().catch(e => {
      console.warn("Browser memblokir pemutaran audio otomatis:", e);
    });
  } catch(e) {
    console.error("Gagal memutar audio kemenangan:", e);
  }
}

/* ---------------- ACHIEVEMENTS / PROGRESS TRACKING ---------------- */
function saveProgress(){ localStorage.setItem('pokedex_progress', JSON.stringify(state.progress)); }

function markViewed(pokemon, species){
  let changed = false;
  if(!state.progress.viewedIds.includes(pokemon.id)){ state.progress.viewedIds.push(pokemon.id); changed = true; }
  pokemon.types.forEach(ty=>{
    if(!state.progress.typesSeen.includes(ty.type.name)){ state.progress.typesSeen.push(ty.type.name); changed = true; }
  });
  if((species.is_legendary || species.is_mythical) && !state.progress.legendaryViewed.includes(pokemon.id)){
    state.progress.legendaryViewed.push(pokemon.id); changed = true;
  }
  if(changed){ saveProgress(); checkAchievements(); }
}

function checkAchievements(){
  ACHIEVEMENTS.forEach(a=>{
    const cur = a.current(), tgt = a.target();
    if(cur >= tgt && !state.unlockedAchievements.includes(a.id)){
      state.unlockedAchievements.push(a.id);
      localStorage.setItem('pokedex_unlocked_achievements', JSON.stringify(state.unlockedAchievements));
      showToast(t('achievementUnlocked', t('ach_'+a.id+'_name')));
    }
  });
  if(state.currentView === 'achievements') renderAchievements();
}

function renderAchievements(){
  const total = Math.max(state.allNames.length, state.progress.viewedIds.length, 1);
  const viewed = state.progress.viewedIds.length;
  const pct = Math.min(100, Math.round((viewed/total)*100));
  els.dexProgressFill.style.width = pct + '%';
  els.dexProgressText.textContent = t('dexProgressLabel', viewed, total);

  els.badgeGrid.innerHTML = ACHIEVEMENTS.map(a=>{
    const tgt = a.target();
    const cur = Math.min(a.current(), tgt);
    const unlocked = state.unlockedAchievements.includes(a.id);
    const pctB = Math.min(100, Math.round((cur/tgt)*100));
    return `
      <div class="badge-card ${unlocked?'unlocked':''}">
        <div class="badge-icon">${a.icon}</div>
        <div class="badge-name">${t('ach_'+a.id+'_name')}</div>
        <div class="badge-desc">${t('ach_'+a.id+'_desc')}</div>
        <div class="badge-progress-track"><div class="badge-progress-fill" style="width:${pctB}%"></div></div>
        <div style="font-size:.7rem; font-weight:800; color:#9AA3B5; margin-top:6px;">${cur} / ${tgt}</div>
      </div>
    `;
  }).join('');
}

/* ---------------- COMPARE ---------------- */
async function selectComparePokemon(key, nameOrId){
  try{
    const res = await fetch(`${API}/pokemon/${nameOrId}`);
    if(!res.ok) throw new Error('not-found');
    const data = await res.json();
    state.compare[key] = data;
    const previewEl = key === 'a' ? els.cAPreview : els.cBPreview;
    const inputEl = key === 'a' ? els.cASearchInput : els.cBSearchInput;
    const sprite = (data.sprites.other && data.sprites.other['official-artwork'].front_default) || data.sprites.front_default;
    previewEl.innerHTML = `<img src="${sprite}" alt="${data.name}"/>`;
    inputEl.value = capitalize(data.name);
    if(state.compare.a && state.compare.b) renderCompare();
  }catch(e){
    showToast(t('notFoundToast', nameOrId));
  }
}

function renderCompare(){
  const a = state.compare.a, b = state.compare.b;
  const spriteA = pickIdleSprite(a);
  const spriteB = pickIdleSprite(b);
  const statLabels = { hp:'HP', attack:'ATK', defense:'DEF', 'special-attack':'SP.ATK', 'special-defense':'SP.DEF', speed:'SPD' };

  let totalA = 0, totalB = 0;
  const rows = a.stats.map((s,i)=>{
    const valA = s.base_stat, valB = b.stats[i].base_stat;
    totalA += valA; totalB += valB;
    const pctA = Math.min(100, Math.round((valA/180)*100));
    const pctB = Math.min(100, Math.round((valB/180)*100));
    const label = statLabels[s.stat.name] || s.stat.name;
    return `
      <div class="cmp-stat-row">
        <div class="cmp-stat-label">${label}</div>
        <div class="cmp-bar-row">
          <div class="cmp-bar-wrap left"><span class="cmp-val ${valA>valB?'winner':''}">${valA}</span><div class="cmp-bar-track"><div class="cmp-bar-fill" data-width="${pctA}"></div></div></div>
          <div class="cmp-bar-wrap right"><div class="cmp-bar-track"><div class="cmp-bar-fill" data-width="${pctB}"></div></div><span class="cmp-val ${valB>valA?'winner':''}">${valB}</span></div>
        </div>
      </div>
    `;
  }).join('');

  // Menentukan pemenang dan arah hadap animasinya
  let summary = '';
  let winnerSprite = '';
  let winnerClass = ''; 
  
  if(totalA === totalB) {
    summary = t('cmpTie');
  } else {
    const winnerName = capitalize((totalA > totalB ? a.name : b.name).replace(/-/g,' '));
    summary = t('cmpWinnerText', winnerName);
    winnerSprite = totalA > totalB ? spriteA : spriteB;
    winnerClass = totalA > totalB ? 'cmp-winner-left' : 'cmp-winner-right';
  }

  els.compareResult.innerHTML = `
    <div class="compare-top">
      <div class="cmp-hero-wrap">
        <img src="${spriteA}" alt="${a.name}" class="cmp-animated-sprite cmp-left-img" />
        <div class="cmp-name">${capitalize(a.name.replace(/-/g,' '))}</div>
        <div class="cmp-types">${a.types.map(ty=>typeBadge(ty.type.name)).join('')}</div>
      </div>
      <div class="compare-vs">VS</div>
      <div class="cmp-hero-wrap">
        <img src="${spriteB}" alt="${b.name}" class="cmp-animated-sprite cmp-right-img" />
        <div class="cmp-name">${capitalize(b.name.replace(/-/g,' '))}</div>
        <div class="cmp-types">${b.types.map(ty=>typeBadge(ty.type.name)).join('')}</div>
      </div>
    </div>
    ${rows}
    <div class="cmp-summary">
      ${winnerSprite ? `<img src="${winnerSprite}" alt="Winner" class="cmp-winner-img ${winnerClass}" />` : ''}
      <span>${summary}</span>
    </div>
  `;
  els.compareResult.hidden = false;

  requestAnimationFrame(()=>{
    document.querySelectorAll('#compareResult .cmp-bar-fill[data-width]').forEach(bar=>{
      setTimeout(()=>{ bar.style.width = bar.dataset.width + '%'; }, 60);
    });
  });
}

/* ---------------- WHO'S THAT POKÉMON? (10-question ranked session) ---------------- */

function updateGuessScore(){
  els.guessScore.textContent = `${state.guess.sessionScore} / 10`;
}

function updateGuessProgressUI(){
  const n = Math.min(state.guess.round + 1, 10);
  els.guessQuestionLabel.textContent = t('questionCounter', n, 10);
  els.guessProgressFill.style.width = `${(state.guess.round/10)*100}%`;
  updateGuessScore();
}

// ---- screen switching ----
function showGuessIntro(){
  state.guess.phase = 'intro';
  els.guessPlay.hidden = true;
  els.guessResultPanel.hidden = true;
  els.guessIntro.hidden = false;
  renderGuessRankCards();
  els.introBest.textContent = state.guessBest > 0 ? t('resultBestScore', state.guessBest) : '';
}

function showGuessPlayScreen(){
  els.guessIntro.hidden = true;
  els.guessResultPanel.hidden = true;
  els.guessPlay.hidden = false;
}

function renderGuessRankCards(){
  els.guessRankGrid.innerHTML = TRAINER_RANKS.map(r=>{
    const name = t(`rank_${r.key}_title`).replace(/^\S+\s/, '');
    const range = r.min === r.max ? `${r.min}/10` : `${r.min}\u2013${r.max}/10`;
    return `
      <div class="rank-card">
        <div class="rank-card-emoji">${r.emoji}</div>
        <div class="rank-card-name">${name}</div>
        <div class="rank-card-range">${range}</div>
      </div>`;
  }).join('');
}

function startGuessSession(){
  state.guess.phase = 'playing';
  state.guess.round = 0;
  state.guess.sessionScore = 0;
  state.guess.usedIds = [];
  state.guess.finished = false;
  els.rankFx.innerHTML = '';
  els.resultCard.classList.remove('celebrate-champion');
  showGuessPlayScreen();
  loadGuessRound();
}

async function loadGuessRound(){
  els.guessImg.classList.remove('revealed');
  els.guessChoices.innerHTML = '';
  els.guessNextBtn.classList.remove('show');
  els.guessNextBtn.textContent = state.guess.round >= 9 ? t('seeRank') : t('nextRound');
  updateGuessProgressUI();

  let id, tries = 0;
  do{
    id = Math.floor(Math.random()*1010) + 1;
    tries++;
  } while(state.guess.usedIds.includes(id) && tries < 20);

  try{
    const res = await fetch(`${API}/pokemon/${id}`);
    const data = await res.json();
    state.guess.pokemonId = id;
    state.guess.correctName = data.name;
    state.guess.answered = false;
    state.guess.usedIds.push(id);

    const sprite = (data.sprites.other && data.sprites.other['official-artwork'].front_default) || data.sprites.front_default;
    els.guessImg.src = sprite;

    const pool = state.allNames.length ? state.allNames : [];
    const shuffled = [...pool].sort(()=> Math.random()-0.5);
    const distractors = [];
    for(const p of shuffled){
      if(p.name !== data.name && !distractors.includes(p.name)) distractors.push(p.name);
      if(distractors.length >= 3) break;
    }
    while(distractors.length < 3){ distractors.push(data.name + '-x' + distractors.length); }

    const choices = [...distractors, data.name].sort(()=> Math.random()-0.5);
    els.guessChoices.innerHTML = choices.map(name=>`<button class="guess-choice" data-name="${name}">${capitalize(name.replace(/-/g,' '))}</button>`).join('');
    els.guessChoices.querySelectorAll('.guess-choice').forEach(btn=>{
      btn.addEventListener('click', ()=> checkGuessAnswer(btn));
    });
  }catch(e){
    console.error(e);
    showToast(t('catalogLoadFail'));
  }
}

function checkGuessAnswer(btn){
  if(state.guess.answered) return;
  state.guess.answered = true;
  const chosen = btn.dataset.name;
  const correct = chosen === state.guess.correctName;

  els.guessChoices.querySelectorAll('.guess-choice').forEach(b=>{
    b.disabled = true;
    if(b.dataset.name === state.guess.correctName) b.classList.add('correct');
    else if(b === btn) b.classList.add('wrong');
  });
  els.guessImg.classList.add('revealed');

  // Session score (drives the Trainer Rank) — separate from the lifetime
  // achievement counters below, which keep tracking across all sessions.
  if(correct) state.guess.sessionScore += 1;

  state.progress.guessTotal += 1;
  if(correct){
    state.progress.guessCorrect += 1;
    playClick();
    showToast(t('guessCorrect') + capitalize(state.guess.correctName.replace(/-/g,' ')));
  } else {
    playThrow();
    showToast(t('guessWrong', capitalize(state.guess.correctName.replace(/-/g,' '))));
  }
  saveProgress();
  checkAchievements();
  updateGuessScore();
  els.guessNextBtn.classList.add('show');
}

function advanceGuessRound(){
  state.guess.round += 1;
  if(state.guess.round >= 10){
    finishGuessSession();
  } else {
    loadGuessRound();
  }
}

function finishGuessSession(){
  state.guess.finished = true;
  state.guess.phase = 'result';
  const score = state.guess.sessionScore;
  if(score > state.guessBest){
    state.guessBest = score;
    localStorage.setItem('pokedex_guess_best', String(score));
  }
  showGuessResultScreen();
}

function showGuessResultScreen(){
  els.guessIntro.hidden = true;
  els.guessPlay.hidden = true;
  els.guessResultPanel.hidden = false;

  const score = state.guess.sessionScore;
  const accuracy = Math.round((score/10)*100);
  const rank = determineTrainerRank(score);

  els.rankFx.innerHTML = '';
  els.resultCard.classList.remove('celebrate-champion');
  els.rankEmoji.textContent = rank.emoji;
  els.rankTitle.textContent = t(`rank_${rank.key}_title`).replace(/^\S+\s/, '');
  els.rankTitle.className = `rank-badge-title ${rank.css}`;
  els.rankMessage.textContent = t(`rank_${rank.key}_msg`);
  els.resultAccuracy.textContent = `${accuracy}%`;
  els.rankProgressLabel.textContent = `${score} / 10`;
  els.resultBest.textContent = t('resultBestScore', state.guessBest);

  // Reset then animate: score count-up, progress bar fill, badge pop (CSS handles the pop).
  els.resultScoreVal.textContent = '0';
  els.rankProgressFill.style.width = '0%';

  requestAnimationFrame(()=>{
    animateGuessScoreCount(score);
    setTimeout(()=>{ els.rankProgressFill.style.width = `${(score/10)*100}%`; }, 60);
    if(score >= 9) spawnRankFx(rank.key);
  });
}

function animateGuessScoreCount(target){
  let cur = 0;
  const timer = setInterval(()=>{
    cur += 1;
    if(cur >= target){ cur = target; clearInterval(timer); }
    els.resultScoreVal.textContent = cur;
  }, target > 0 ? 70 : 0);
}

// Champion (9/10): gold sparkles + soft glow. Pokémon Master (10/10): confetti,
// rainbow sparkles, and a Poké Ball burst — a bigger moment for a perfect score.
function spawnRankFx(rankKey){
  els.rankFx.innerHTML = '';
  if(rankKey === 'champion'){
    els.resultCard.classList.add('celebrate-champion');
    for(let i=0;i<14;i++){
      const s = document.createElement('div');
      s.className = 'fx-sparkle';
      s.textContent = '✨';
      s.style.left = (10 + Math.random()*80) + '%';
      s.style.top = (30 + Math.random()*50) + '%';
      s.style.animationDelay = (Math.random()*0.6) + 's';
      els.rankFx.appendChild(s);
    }
  } else if(rankKey === 'master'){
    playClick();
    const colors = ['#FFD93D','#FF4D4D','#6EC6FF','#7ED957','#A78BFA','#FF9D55'];
    for(let i=0;i<32;i++){
      const c = document.createElement('div');
      c.className = 'fx-confetti';
      c.style.left = (Math.random()*100) + '%';
      c.style.background = colors[i % colors.length];
      c.style.animationDelay = (Math.random()*0.5) + 's';
      c.style.animationDuration = (1.5 + Math.random()*0.8) + 's';
      els.rankFx.appendChild(c);
    }
    for(let i=0;i<16;i++){
      const s = document.createElement('div');
      s.className = 'fx-sparkle';
      s.textContent = i % 2 === 0 ? '✨' : '🌟';
      s.style.left = (5 + Math.random()*90) + '%';
      s.style.top = (20 + Math.random()*60) + '%';
      s.style.animationDelay = (Math.random()*0.8) + 's';
      els.rankFx.appendChild(s);
    }
    const ball = document.createElement('div');
    ball.className = 'fx-pokeball';
    els.rankFx.appendChild(ball);
  }
}

async function shareGuessResult(){
  const score = state.guess.sessionScore;
  const rank = determineTrainerRank(score);
  const rankName = t(`rank_${rank.key}_title`).replace(/^\S+\s/, ''); // strip leading emoji for the text
  showToast(t('generatingCard'));
  try{
    const canvas = await buildRankExportCanvas(score, rank);
    canvas.toBlob(async (blob)=>{
      if(!blob){ showToast(t('cardExportFail')); return; }
      const file = new File([blob], `pokemon-quiz-rank.png`, { type:'image/png' });
      if(navigator.canShare && navigator.canShare({ files:[file] })){
        try{ await navigator.share({ files:[file], title:'Who\'s That Pokémon?', text: t('shareRankText', rankName, score) }); }
        catch(err){ /* user cancelled the native share sheet */ }
      } else {
        downloadCanvasPNG(canvas, `pokemon-quiz-rank.png`);
        showToast(t('shareFallback'));
      }
    }, 'image/png');
  }catch(e){ console.error(e); showToast(t('cardExportFail')); }
}

/* ---------------- DAILY QUIZ ---------------- */
const DAILY_CATEGORIES = ['pokemon','type','region','generation','ability','height','weight','evolution'];
const ABILITY_POOL = [
  'Overgrow','Blaze','Torrent','Shield Dust','Swarm','Keen Eye','Run Away','Intimidate','Static','Levitate',
  'Chlorophyll','Solar Power','Flash Fire','Water Absorb','Volt Absorb','Sand Veil','Sturdy','Rock Head','Clear Body','Natural Cure',
  'Serene Grace','Swift Swim','Battle Armor','Compound Eyes','Insomnia','Color Change','Immunity','Flame Body','Guts','Marvel Scale',
  'Own Tempo','Oblivious','Cloud Nine','Trace','Huge Power','Poison Point','Rivalry','Steadfast','Snow Cloak','Gluttony',
  'Anger Point','Unburden','Heatproof','Simple','Dry Skin','Download','Iron Fist','Pressure','Adaptability','Skill Link',
  'Multiscale','Regenerator','Sheer Force','Magic Guard','Prankster','Moxie','Technician',
];

function hashStringToInt(str){
  let hash = 0;
  for(let i=0;i<str.length;i++){ hash = (hash*31 + str.charCodeAt(i)) >>> 0; }
  return hash;
}
function todayDateStr(){
  const d = new Date();
  return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');
}
function dateStrOffset(dateStr, offsetDays){
  const [y,m,d] = dateStr.split('-').map(Number);
  const dt = new Date(y, m-1, d);
  dt.setDate(dt.getDate() + offsetDays);
  return dt.getFullYear()+'-'+String(dt.getMonth()+1).padStart(2,'0')+'-'+String(dt.getDate()).padStart(2,'0');
}
function formatDisplayDate(dateStr){
  const [y,m,d] = dateStr.split('-').map(Number);
  const dt = new Date(y, m-1, d);
  return dt.toLocaleDateString(state.lang === 'id' ? 'id-ID' : 'en-US', { day:'2-digit', month:'long', year:'numeric' });
}
function formatShortDate(dateStr){
  const [y,m,d] = dateStr.split('-').map(Number);
  const dt = new Date(y, m-1, d);
  return dt.toLocaleDateString(state.lang === 'id' ? 'id-ID' : 'en-US', { day:'2-digit', month:'short' });
}
function shuffleArr(arr){ return [...arr].sort(()=> Math.random()-0.5); }

function getDailyQuizRecord(){
  const today = todayDateStr();
  const stored = JSON.parse(localStorage.getItem('pokedex_daily_quiz') || 'null');
  if(stored && stored.date === today) return stored;
  const seed = hashStringToInt('pokedex-quiz-'+today);
  const id = (seed % 1010) + 1;
  const catSeed = hashStringToInt('pokedex-quiz-cat-'+today);
  const category = DAILY_CATEGORIES[catSeed % DAILY_CATEGORIES.length];
  const record = { date: today, pokemonId: id, category, answered: false, correct: null, correctDisplay: null, userDisplay: null, pokemonName: null };
  localStorage.setItem('pokedex_daily_quiz', JSON.stringify(record));
  return record;
}
function saveDailyQuizRecord(record){ localStorage.setItem('pokedex_daily_quiz', JSON.stringify(record)); }

// Builds today's question for the given category. Returns null when the
// category doesn't apply to this Pokémon (e.g. no evolution data) so the
// caller can fall back to a category that always works.
async function buildDailyQuestion(category, data){
  const displayName = capitalize(data.name.replace(/-/g,' '));
  const pool = state.allNames.length ? state.allNames : [];

  function pickDistractorNames(excludeName, count){
    const shuf = shuffleArr(pool);
    const out = [];
    for(const p of shuf){
      if(p.name !== excludeName && !out.includes(p.name)) out.push(p.name);
      if(out.length >= count) break;
    }
    while(out.length < count){ out.push(excludeName + '-x' + out.length); }
    return out.map(n=> capitalize(n.replace(/-/g,' ')));
  }

  if(category === 'pokemon'){
    const correct = displayName;
    const choices = shuffleArr([...pickDistractorNames(data.name, 3), correct]);
    return { questionText: t('quizQ_pokemon'), correctDisplay: correct, choices, imageMode:'silhouette' };
  }

  if(category === 'type'){
    const correctType = data.types[0].type.name;
    const otherTypes = ALL_TYPES.filter(ty=> !data.types.some(dt=> dt.type.name === ty));
    const distractors = shuffleArr(otherTypes).slice(0,3).map(capitalize);
    const correct = capitalize(correctType);
    const choices = shuffleArr([...distractors, correct]);
    return { questionText: t('quizQ_type', displayName), correctDisplay: correct, choices, imageMode:'reveal' };
  }

  if(category === 'region'){
    const region = REGIONS.find(r=> data.id >= r.range[0] && data.id <= r.range[1]) || REGIONS[0];
    const distractors = shuffleArr(REGIONS.filter(r=> r.key !== region.key)).slice(0,3).map(r=> r.name);
    const choices = shuffleArr([...distractors, region.name]);
    return { questionText: t('quizQ_region', displayName), correctDisplay: region.name, choices, imageMode:'reveal' };
  }

  if(category === 'generation'){
    const region = REGIONS.find(r=> data.id >= r.range[0] && data.id <= r.range[1]) || REGIONS[0];
    const distractors = shuffleArr(REGIONS.filter(r=> r.gen !== region.gen)).slice(0,3).map(r=> t('generationLabel', r.gen));
    const correct = t('generationLabel', region.gen);
    const choices = shuffleArr([...distractors, correct]);
    return { questionText: t('quizQ_generation', displayName), correctDisplay: correct, choices, imageMode:'reveal' };
  }

  if(category === 'ability'){
    const primaryAbility = data.abilities.find(a=> !a.is_hidden) || data.abilities[0];
    const correct = capitalize(primaryAbility.ability.name.replace(/-/g,' '));
    const ownAbilityNames = data.abilities.map(a=> capitalize(a.ability.name.replace(/-/g,' ')).toLowerCase());
    const candidatePool = ABILITY_POOL.filter(a=> a.toLowerCase() !== correct.toLowerCase() && !ownAbilityNames.includes(a.toLowerCase()));
    const distractors = shuffleArr(candidatePool).slice(0,3);
    const choices = shuffleArr([...distractors, correct]);
    return { questionText: t('quizQ_ability', displayName), correctDisplay: correct, choices, imageMode:'reveal' };
  }

  if(category === 'height'){
    const meters = data.height/10;
    const fmt = (v)=> `${v.toFixed(1)}m`;
    const correct = fmt(meters);
    const deltas = shuffleArr([0.3,-0.3,0.5,-0.5,0.8,-0.8,1.1,-1.1]);
    const distractSet = new Set();
    for(const dlt of deltas){
      const v = Math.max(0.1, Math.round((meters+dlt)*10)/10);
      const s = fmt(v);
      if(s !== correct) distractSet.add(s);
      if(distractSet.size >= 3) break;
    }
    const choices = shuffleArr([...Array.from(distractSet).slice(0,3), correct]);
    return { questionText: t('quizQ_height', displayName), correctDisplay: correct, choices, imageMode:'reveal' };
  }

  if(category === 'weight'){
    const kg = data.weight/10;
    const fmt = (v)=> `${v.toFixed(1)}kg`;
    const correct = fmt(kg);
    const factors = shuffleArr([0.5,1.5,0.7,1.3,0.6,1.8]);
    const distractSet = new Set();
    for(const f of factors){
      const v = Math.max(0.1, Math.round(kg*f*10)/10);
      const s = fmt(v);
      if(s !== correct) distractSet.add(s);
      if(distractSet.size >= 3) break;
    }
    const choices = shuffleArr([...Array.from(distractSet).slice(0,3), correct]);
    return { questionText: t('quizQ_weight', displayName), correctDisplay: correct, choices, imageMode:'reveal' };
  }

  if(category === 'evolution'){
    try{
      const speciesRes = await fetch(`${API}/pokemon-species/${data.id}`);
      const species = await speciesRes.json();

      if(species.evolves_from_species){
        const fromName = species.evolves_from_species.name;
        const correct = capitalize(fromName.replace(/-/g,' '));
        const choices = shuffleArr([...pickDistractorNames(fromName, 3), correct]);
        return { questionText: t('quizQ_evolutionFrom', displayName), correctDisplay: correct, choices, imageMode:'reveal' };
      }

      const chainRes = await fetch(species.evolution_chain.url);
      const chainData = await chainRes.json();
      const nextName = findNextEvolution(chainData.chain, data.name);
      if(nextName){
        const correct = capitalize(nextName.replace(/-/g,' '));
        const choices = shuffleArr([...pickDistractorNames(nextName, 3), correct]);
        return { questionText: t('quizQ_evolutionTo', displayName), correctDisplay: correct, choices, imageMode:'reveal' };
      }
      return null; // standalone Pokémon with no evolutions at all — fall back
    }catch(e){
      console.error(e);
      return null;
    }
  }

  return null;
}

function findNextEvolution(node, name){
  if(node.species.name === name){
    return node.evolves_to.length > 0 ? node.evolves_to[0].species.name : null;
  }
  for(const child of node.evolves_to){
    const found = findNextEvolution(child, name);
    if(found) return found;
  }
  return null;
}

async function renderQuiz(){
  const record = getDailyQuizRecord();
  els.quizDate.textContent = formatDisplayDate(record.date);
  renderStreak();
  renderDailyHistory();

  if(record.answered){
    renderQuizLocked(record);
    return;
  }

  try{
    const res = await fetch(`${API}/pokemon/${record.pokemonId}`);
    const data = await res.json();
    let built = await buildDailyQuestion(record.category, data);
    if(!built){
      // this Pokémon doesn't support today's category (e.g. no evolution data) —
      // fall back to a category that always works, and remember the swap.
      record.category = 'type';
      saveDailyQuizRecord(record);
      built = await buildDailyQuestion('type', data);
    }
    renderQuizQuestion(record, data, built);
  }catch(e){
    console.error(e);
    els.quizBody.innerHTML = `<p>${t('catalogLoadFail')}</p>`;
  }
}

function renderQuizQuestion(record, data, built){
  const sprite = (data.sprites.other && data.sprites.other['official-artwork'].front_default) || data.sprites.front_default;
  const imgClass = built.imageMode === 'silhouette' ? 'guess-silhouette' : 'guess-silhouette revealed';
  els.quizBody.innerHTML = `
    <div class="quiz-card">
      <img src="${sprite}" alt="mystery" class="${imgClass}" id="quizImg" style="width:180px;height:180px;margin:0 auto 14px;display:block;" />
      ${built.imageMode === 'reveal' ? `<div class="quiz-pokemon-name">${capitalize(data.name.replace(/-/g,' '))}</div>` : ''}
      <div class="quiz-question">${built.questionText}</div>
      <div class="quiz-choices" id="quizChoices">
        ${built.choices.map(c=>`<button class="quiz-choice" data-value="${c.replace(/"/g,'&quot;')}">${c}</button>`).join('')}
      </div>
    </div>
  `;
  els.quizBody.querySelectorAll('.quiz-choice').forEach(btn=>{
    btn.addEventListener('click', ()=> answerQuiz(btn, built.correctDisplay, record, data));
  });
}

function answerQuiz(btn, correctDisplay, record, data){
  const chosen = btn.dataset.value;
  const correct = chosen === correctDisplay;

  els.quizBody.querySelectorAll('.quiz-choice').forEach(b=>{
    b.disabled = true;
    if(b.dataset.value === correctDisplay) b.classList.add('correct');
    else if(b === btn) b.classList.add('wrong');
  });
  const img = document.getElementById('quizImg');
  if(img) img.classList.add('revealed');

  record.answered = true;
  record.correct = correct;
  record.correctDisplay = correctDisplay;
  record.userDisplay = chosen;
  record.pokemonName = data.name;
  saveDailyQuizRecord(record);

  state.progress.quizTotal += 1;
  if(correct){ state.progress.quizCorrect += 1; playClick(); }
  else{ playThrow(); }
  saveProgress();
  checkAchievements();
  updateStreakAndHistory(record);

  setTimeout(()=> renderQuiz(), 900);
}

function updateStreakAndHistory(record){
  const today = record.date;
  const yesterday = dateStrOffset(today, -1);
  let streak = parseInt(localStorage.getItem('pokedex_daily_streak') || '0', 10);
  const lastDate = localStorage.getItem('pokedex_daily_streak_date');
  streak = (lastDate === yesterday) ? streak + 1 : 1;
  localStorage.setItem('pokedex_daily_streak', String(streak));
  localStorage.setItem('pokedex_daily_streak_date', today);

  let history = JSON.parse(localStorage.getItem('pokedex_daily_history') || '[]');
  history = history.filter(h=> h.date !== today);
  history.unshift({ date: today, pokemonName: record.pokemonName, correct: record.correct });
  history = history.slice(0,7);
  localStorage.setItem('pokedex_daily_history', JSON.stringify(history));
}

function renderStreak(){
  const streak = parseInt(localStorage.getItem('pokedex_daily_streak') || '0', 10);
  const lastDate = localStorage.getItem('pokedex_daily_streak_date');
  const today = todayDateStr();
  const yesterday = dateStrOffset(today, -1);
  // A streak only stays "alive" on screen if it was earned today or yesterday;
  // otherwise a day was missed and it reads as broken until the next play.
  const effectiveStreak = (lastDate === today || lastDate === yesterday) ? streak : 0;

  els.streakFire.classList.toggle('streak-fire-lit', effectiveStreak > 0);
  els.streakSub.textContent = effectiveStreak > 0 ? t('keepStreakAlive') : t('startStreakToday');
  animateStreakCount(effectiveStreak);
}

function animateStreakCount(target){
  let cur = 0;
  const step = Math.max(1, Math.round(target/16));
  const timer = setInterval(()=>{
    cur += step;
    if(cur >= target){ cur = target; clearInterval(timer); }
    els.streakCount.textContent = cur;
  }, 30);
}

function renderDailyHistory(){
  const history = JSON.parse(localStorage.getItem('pokedex_daily_history') || '[]');
  if(history.length === 0){
    els.historyList.innerHTML = `
      <div class="history-empty">
        <p class="history-empty-title">${t('noHistoryYet')}</p>
        <p class="history-empty-sub">${t('startTodaysQuizPrompt')}</p>
        <button class="btn btn-primary" id="historyStartBtn">${t('startTodaysQuiz')}</button>
      </div>`;
    const btn = document.getElementById('historyStartBtn');
    if(btn) btn.addEventListener('click', ()=> els.quizBody.scrollIntoView({behavior:'smooth', block:'center'}));
    return;
  }
  const today = todayDateStr();
  const yesterday = dateStrOffset(today, -1);
  els.historyList.innerHTML = history.map((h,i)=>{
    const label = h.date === today ? t('todayLabel') : h.date === yesterday ? t('yesterdayLabel') : formatShortDate(h.date);
    return `
      <div class="history-item" style="animation-delay:${i*70}ms">
        <div class="history-item-date">${label}</div>
        <div class="history-item-mid">
          <span class="history-item-icon">${h.correct ? '✅' : '❌'}</span>
          <span class="history-item-name">${capitalize((h.pokemonName||'').replace(/-/g,' '))}</span>
        </div>
        <div class="history-item-score">${h.correct ? 1 : 0} / 1</div>
      </div>`;
  }).join('');
}

function renderQuizLocked(record){
  els.quizBody.innerHTML = `
    <div class="quiz-card locked-card">
      <div class="quiz-fx" id="quizFx"></div>
      <div class="quiz-lock-icon">${record.correct ? '✅' : '❌'}</div>
      <div class="quiz-result-badge ${record.correct ? 'badge-correct' : 'badge-wrong'}">${record.correct ? t('quizCorrectTitle') : t('quizWrongTitle')}</div>
      <p class="quiz-result-sub">${record.correct ? t('quizCorrectExplain', record.correctDisplay) : t('quizWrongExplain', record.correctDisplay)}</p>
      <p class="quiz-result-note">${record.correct ? t('quizCorrectNote') : t('quizWrongNote')}</p>
      <p class="result-label" style="margin-top:18px;">${t('todaysScoreLabel')}</p>
      <div class="quiz-today-score">${record.correct ? 1 : 0} / 1</div>
    </div>
  `;
  if(record.correct){
    const fx = document.getElementById('quizFx');
    if(fx) spawnDailyQuizFx(fx);
  }
}

function spawnDailyQuizFx(container){
  const colors = ['#FFD93D','#7ED957','#6EC6FF','#A78BFA'];
  for(let i=0;i<10;i++){
    const c = document.createElement('div');
    c.className = 'fx-confetti';
    c.style.left = (Math.random()*100) + '%';
    c.style.background = colors[i % colors.length];
    c.style.animationDelay = (Math.random()*0.4) + 's';
    c.style.animationDuration = (1.3 + Math.random()*0.6) + 's';
    container.appendChild(c);
  }
  for(let i=0;i<8;i++){
    const s = document.createElement('div');
    s.className = 'fx-sparkle';
    s.textContent = '✨';
    s.style.left = (10 + Math.random()*80) + '%';
    s.style.top = (20 + Math.random()*55) + '%';
    s.style.animationDelay = (Math.random()*0.5) + 's';
    container.appendChild(s);
  }
}

/* ---------------- PNG EXPORT / SHARE ---------------- */
const TYPE_COLORS = {
  normal:['#A8A278','#c6c096'], fire:['#FF9D55','#FF4D4D'], water:['#6EC6FF','#3B82F6'],
  electric:['#FFD93D','#FFB020'], grass:['#7ED957','#3FA34D'], ice:['#86E8F5','#5FC9E8'],
  fighting:['#F0765B','#C2410C'], poison:['#C67FE0','#9333EA'], ground:['#E2C173','#B08D3E'],
  flying:['#B7C6FF','#8395E8'], psychic:['#FF7EB6','#EC4899'], bug:['#B4D93B','#849E1F'],
  rock:['#D2C08A','#A08A4C'], ghost:['#A78BFA','#6D28D9'], dragon:['#8E7CFF','#5836DB'],
  dark:['#7A7266','#41392F'], steel:['#C9D3DE','#8E9BAB'], fairy:['#FFB3DA','#F472B6'],
};

function roundRectPath(ctx,x,y,w,h,r){
  ctx.beginPath();
  ctx.moveTo(x+r,y);
  ctx.arcTo(x+w,y,x+w,y+h,r);
  ctx.arcTo(x+w,y+h,x,y+h,r);
  ctx.arcTo(x,y+h,x,y,r);
  ctx.arcTo(x,y,x+w,y,r);
  ctx.closePath();
}

function loadImageSafe(url){
  return new Promise(resolve=>{
    if(!url){ resolve(null); return; }
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = ()=> resolve(img);
    img.onerror = ()=> resolve(null);
    img.src = url;
  });
}

async function buildExportCanvas(pokemon, species){
  if(document.fonts && document.fonts.ready){ try{ await document.fonts.ready; }catch(e){} }
  const canvas = els.exportCanvas;
  const ctx = canvas.getContext('2d');
  const W = canvas.width, H = canvas.height;
  const primaryType = pokemon.types[0].type.name;
  const colors = TYPE_COLORS[primaryType] || ['#FFD93D','#FF4D4D'];

  ctx.clearRect(0,0,W,H);
  roundRectPath(ctx,0,0,W,H,36);
  const bgGrad = ctx.createLinearGradient(0,0,W,H);
  bgGrad.addColorStop(0, colors[0]);
  bgGrad.addColorStop(1, colors[1]);
  ctx.fillStyle = bgGrad;
  ctx.fill();

  ctx.save();
  ctx.globalAlpha = 0.10;
  for(let i=0;i<4;i++){
    ctx.beginPath();
    ctx.arc(W-90, 130, 50+i*46, 0, Math.PI*2);
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 7;
    ctx.stroke();
  }
  ctx.restore();

  const artUrl = (pokemon.sprites.other && pokemon.sprites.other['official-artwork'] && pokemon.sprites.other['official-artwork'].front_default) || pokemon.sprites.front_default;
  const img = await loadImageSafe(artUrl);
  if(img){
    const size = 380, ix = (W-size)/2, iy = 84;
    ctx.save();
    ctx.shadowColor = 'rgba(0,0,0,0.35)';
    ctx.shadowBlur = 30;
    ctx.shadowOffsetY = 18;
    ctx.drawImage(img, ix, iy, size, size);
    ctx.restore();
  }

  ctx.fillStyle = 'rgba(255,255,255,0.92)';
  ctx.font = '700 28px Nunito, Arial, sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText('#'+String(pokemon.id).padStart(3,'0'), 40, 58);

  ctx.fillStyle = '#fff';
  ctx.font = '700 50px Fredoka, Arial, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(capitalize(pokemon.name.replace(/-/g,' ')), W/2, 508);

  const genus = (species.genera.find(g=>g.language.name==='en')||{}).genus || '';
  ctx.font = '700 20px Nunito, Arial, sans-serif';
  ctx.globalAlpha = 0.9;
  ctx.fillText(genus, W/2, 540);
  ctx.globalAlpha = 1;

  ctx.font = '700 16px Nunito, Arial, sans-serif';
  const badgeGap = 10, badgeH = 34;
  const widths = pokemon.types.map(tp => ctx.measureText(tp.type.name.toUpperCase()).width + 36);
  const totalW = widths.reduce((s,w)=>s+w,0) + badgeGap*(widths.length-1);
  let bx = W/2 - totalW/2;
  const by = 562;
  pokemon.types.forEach((tp,i)=>{
    const label = tp.type.name.toUpperCase();
    const tw = widths[i];
    roundRectPath(ctx, bx, by, tw, badgeH, 17);
    ctx.fillStyle = 'rgba(255,255,255,0.28)';
    ctx.fill();
    ctx.fillStyle = '#fff';
    ctx.textAlign = 'center';
    ctx.fillText(label, bx+tw/2, by+23);
    bx += tw + badgeGap;
  });

  const panelX = 40, panelY = 620, panelW = W-80, panelH = 300;
  roundRectPath(ctx, panelX, panelY, panelW, panelH, 26);
  ctx.fillStyle = 'rgba(255,255,255,0.95)';
  ctx.fill();

  const statLabels = { hp:'HP', attack:'ATK', defense:'DEF', 'special-attack':'SP.ATK', 'special-defense':'SP.DEF', speed:'SPD' };
  const rowH = (panelH - 50) / 6;
  let sy = panelY + 44;
  pokemon.stats.forEach(s=>{
    const label = statLabels[s.stat.name] || s.stat.name;
    const val = s.base_stat;
    const pct = Math.min(1, val/180);

    ctx.fillStyle = '#2D3748';
    ctx.font = '700 15px Nunito, Arial, sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(label, panelX+24, sy+5);

    const trackX = panelX+118, trackW = panelW-220, trackY = sy-9, trackH = 13;
    roundRectPath(ctx, trackX, trackY, trackW, trackH, 6);
    ctx.fillStyle = 'rgba(45,55,72,0.08)';
    ctx.fill();
    roundRectPath(ctx, trackX, trackY, Math.max(trackW*pct,4), trackH, 6);
    const barGrad = ctx.createLinearGradient(trackX,0,trackX+trackW,0);
    barGrad.addColorStop(0, colors[0]);
    barGrad.addColorStop(1, colors[1]);
    ctx.fillStyle = barGrad;
    ctx.fill();

    ctx.fillStyle = '#2D3748';
    ctx.textAlign = 'right';
    ctx.fillText(String(val), panelX+panelW-24, sy+5);
    sy += rowH;
  });

  ctx.fillStyle = 'rgba(255,255,255,0.85)';
  ctx.font = '600 15px Nunito, Arial, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('Generated with Pokédex · pokeapi.co', W/2, H-28);

  return canvas;
}

const RANK_CARD_COLORS = {
  youngster: ['#8FA0C0','#5B6A8F'],
  trainer:   ['#6EC6FF','#3B82F6'],
  ace:       ['#A78BFA','#6D28D9'],
  gym:       ['#FFD93D','#FFB020'],
  champion:  ['#FF9D55','#FF4D4D'],
  master:    ['#FFD93D','#FF4D4D','#A78BFA','#6EC6FF'],
};

async function buildRankExportCanvas(score, rank){
  if(document.fonts && document.fonts.ready){ try{ await document.fonts.ready; }catch(e){} }
  const canvas = els.exportCanvas;
  const ctx = canvas.getContext('2d');
  const W = canvas.width, H = canvas.height;
  const colors = RANK_CARD_COLORS[rank.key] || ['#FFD93D','#FF4D4D'];

  ctx.clearRect(0,0,W,H);
  roundRectPath(ctx,0,0,W,H,36);
  const bgGrad = ctx.createLinearGradient(0,0,W,H);
  if(colors.length > 2){
    colors.forEach((c,i)=> bgGrad.addColorStop(i/(colors.length-1), c));
  } else {
    bgGrad.addColorStop(0, colors[0]);
    bgGrad.addColorStop(1, colors[1]);
  }
  ctx.fillStyle = bgGrad;
  ctx.fill();

  // decorative Poké Ball ring motif, echoing the main card exporter's style
  ctx.save();
  ctx.globalAlpha = 0.10;
  for(let i=0;i<4;i++){
    ctx.beginPath();
    ctx.arc(W-90, 130, 50+i*46, 0, Math.PI*2);
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 7;
    ctx.stroke();
  }
  ctx.restore();

  ctx.fillStyle = 'rgba(255,255,255,0.92)';
  ctx.font = '700 26px Nunito, Arial, sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText('🎮 Pokémon Encyclopedia', 40, 58);

  const dateStr = new Date().toLocaleDateString(state.lang === 'id' ? 'id-ID' : 'en-US', { year:'numeric', month:'long', day:'numeric' });
  ctx.font = '600 18px Nunito, Arial, sans-serif';
  ctx.textAlign = 'right';
  ctx.fillText(dateStr, W-40, 58);

  ctx.textAlign = 'center';
  ctx.fillStyle = 'rgba(255,255,255,0.85)';
  ctx.font = '700 22px Nunito, Arial, sans-serif';
  ctx.fillText('Who\'s That Pokémon? — Quiz Result', W/2, 130);

  ctx.fillStyle = '#fff';
  ctx.font = '800 130px Fredoka, Arial, sans-serif';
  ctx.fillText(`${score}/10`, W/2, 300);

  ctx.font = '700 60px Fredoka, Arial, sans-serif';
  ctx.fillText(rank.emoji, W/2, 400);

  const rankTitleClean = t(`rank_${rank.key}_title`).replace(/^\S+\s/, '');
  ctx.font = '800 44px Fredoka, Arial, sans-serif';
  ctx.fillText(rankTitleClean, W/2, 460);

  const accuracy = Math.round((score/10)*100);
  ctx.font = '700 24px Nunito, Arial, sans-serif';
  ctx.globalAlpha = 0.92;
  ctx.fillText(`${t('accuracyLabel')}: ${accuracy}%`, W/2, 505);
  ctx.globalAlpha = 1;

  // motivational message panel
  const panelX = 60, panelY = 560, panelW = W-120, panelH = 230;
  roundRectPath(ctx, panelX, panelY, panelW, panelH, 26);
  ctx.fillStyle = 'rgba(255,255,255,0.95)';
  ctx.fill();

  ctx.fillStyle = '#2D3748';
  ctx.font = '700 22px Nunito, Arial, sans-serif';
  ctx.textAlign = 'center';
  wrapCanvasText(ctx, t(`rank_${rank.key}_msg`), W/2, panelY+70, panelW-80, 32);

  ctx.fillStyle = 'rgba(255,255,255,0.85)';
  ctx.font = '600 16px Nunito, Arial, sans-serif';
  ctx.fillText('Generated with Pokédex · pokeapi.co', W/2, H-28);

  return canvas;
}

function wrapCanvasText(ctx, text, x, y, maxWidth, lineHeight){
  const words = text.split(' ');
  let line = '';
  let curY = y;
  for(let n=0; n<words.length; n++){
    const testLine = line + words[n] + ' ';
    if(ctx.measureText(testLine).width > maxWidth && n > 0){
      ctx.fillText(line.trim(), x, curY);
      line = words[n] + ' ';
      curY += lineHeight;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line.trim(), x, curY);
}

function downloadCanvasPNG(canvas, filename){
  const link = document.createElement('a');
  link.download = filename;
  link.href = canvas.toDataURL('image/png');
  document.body.appendChild(link);
  link.click();
  link.remove();
}

/* ---------------- HELPERS ---------------- */
function capitalize(s){ return s.charAt(0).toUpperCase()+s.slice(1); }
function escapeHtml(str){
  const div = document.createElement('div');
  div.textContent = str || '';
  return div.innerHTML;
}
