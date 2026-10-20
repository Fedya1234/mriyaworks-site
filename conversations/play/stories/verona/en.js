"use strict";
/* ---------- 4. Noon in Verona ---------- */
Amedi.stories.register("en","verona", {
  em:"⚔️", title:"Noon in Verona", who:"Tybalt", diff:"blind",
  desc:"You're Romeo, married in secret an hour ago. Tybalt is crossing the square for your blood, and Mercutio already has his hand on the hilt. No meters here: you read the state from faces and words.",
  storageKey:"verona_endings",
  hidden:true,
  endOrder:["peace","truce","mercutio","banish"],
  cast:[
    { key:"t", name:"Tybalt", faces:[[80,"🤬"],[58,"😡"],[42,"😠"],[26,"😐"],[0,"🙂"]] },
    { key:"m", name:"Mercutio", faces:[[78,"🤬"],[54,"😤"],[40,"😏"],[25,"🙂"],[0,"😌"]] },
  ],
  start:{ w:{t:60,m:35}, contact:5 },
  intro:`Verona, noon. The heat is such that even the dogs aren't barking. An hour ago, in Friar Lawrence's cell, you secretly married Juliet Capulet — nobody knows, not even Mercutio. Tybalt, her cousin, has been hunting you through the city since yesterday: you came uninvited to the Capulet ball, and to him that's an insult washed away only with blood. Now Tybalt is your kin. He has no idea. Beside you is Mercutio — your best friend, the Prince's kinsman, a man who has never lost a war of words and has no plans to start today. Benvolio has said three times that you should retreat into the shade. Nobody moves. The Prince has declared: whoever starts a brawl in the street will die. Tybalt is crossing the square toward you.`,
  backstory:`<p><b>If you've forgotten the plot.</b> Two Verona families — the Montagues (yours) and the Capulets — have feuded so long nobody remembers why. You, Romeo Montague, snuck into the Capulet ball in a mask and fell in love with Juliet. Her cousin Tybalt recognized you at the ball, and was barely held back.</p><p>This morning Friar Lawrence secretly married you and Juliet — he's hoping the marriage will reconcile the two families. So you're bound to keep it secret, and you can no longer fight Tybalt: he's your kin now.</p><p>In Shakespeare, this scene ends as badly as possible. That's why you're here.</p>`,
  nodes:{
    n1:{
      target:"t",
      npc:()=>`Romeo, the love I bear thee gives me no leave to say better than this: thou art a villain.`,
      options:[
        { icon:"🎭", tag:"Pseudo-empathy", cls:"bad", d:{t:+16,m:+6}, dc:0,
          text:`Tybalt, I understand you're angry. But let's not make a spectacle in the middle of the square — half of Verona's watching.`,
          beat:{ t:`slowly smiled at the corner of his mouth. That's exactly the spectacle he came for.`, m:`traded a glance with Benvolio and adjusted his sword belt.` },
          react:()=>`Spectacle? Oh, no. The spectacle was yesterday — when you crept into our house in a mask. This is just the epilogue.`,
          coach:`"I understand, but" isn't empathy, it's a polite objection. And "don't make a spectacle" shames him in front of people — hitting exactly what he came to defend.` },
        { icon:"🕊", tag:"Warmth without explanation", cls:"bad", d:{t:-6,m:+22}, dc:+3,
          text:`Tybalt, I have a reason to love thee — and it excuses all thy rage. I never wronged thee, and I love thee more than thou canst imagine.`,
          beat:{ t:`stopped, bewildered. This isn't the script he prepared.`, m:`said nothing. His face turned to stone — the worst sign of all.` },
          react:()=>`Love?.. That doesn't undo the insult, boy. It's just strange.`,
          coach:`Warmth — but incomprehensible. To Tybalt it's a riddle, to Mercutio a humiliation: his friend talks of love for the enemy and explains nothing. Empathy without transparency leaves the people beside you to invent their own explanation. And they'll invent the worst one.` },
        { icon:"🚧", tag:"Boundary with respect", cls:"good", d:{t:-16,m:+6}, dc:+12,
          text:`You came for an answer about that ball. You'll get one — from me, in words, here and now. I wasn't there against you, Tybalt. Tell me plainly: what do you want from me, besides blood?`,
          beat:{ t:`stopped three steps away. His hand stayed on the hilt, but the blade didn't come out.`, m:`smirked: "Oh, we're negotiating now."` },
          react:s=> s.w.t>=60 ? `What I want is for you to draw your sword. The rest is just talk.` : `...I want you to admit, before witnesses, that you entered my house uninvited. That's a start.`,
          coach:`You named his real goal (an answer for the insult), didn't agree to the form (steel), and asked a direct question. This is a boundary with respect — it doesn't humiliate him in front of people.` },
        { icon:"🔥", tag:"Mirror the insult", cls:"bad", d:{t:+24,m:+10}, dc:0, aggro:1,
          text:`A villain? That word suits you better, Tybalt. Try it on — should fit.`,
          beat:{ t:`the blade came a hand's width from the scabbard and stopped. Just once.`, m:`laughed out loud. Worst of all — he's delighted.` },
          react:()=>`There it is. Finally a Montague's voice, not bleating. Draw.`,
          coach:`A mirrored insult. Now it's no longer about the ball — it's about who breaks whom in front of witnesses. And the witnesses aren't going anywhere.` },
      ],
      next:"n2"
    },
    n2:{
      target:"m",
      enter:{ dwKey:"t", dw:+5, note:"Heat and a dozen witnesses. Tybalt can feel the square watching — and he won't back down now" },
      npc:s=> s.w.m>=55
        ? `(draws his blade) O calm, dishonorable, vile submission! Tybalt, you rat-catcher — care to walk with me? Since my friend's forgotten how to hold steel.`
        : `(quietly, to you) Romeo. You could at least say a word about what's going on. Because from where I stand this looks bad — and I'm not talking about Tybalt right now.`,
      options:[
        { icon:"🛑", tag:"Push him out", cls:"bad", d:{m:+26,t:+4}, dc:0,
          text:`Mercutio, put the blade away. This isn't your fight.`,
          beat:{ m:`asked very quietly: "Not my fight?" That's his worst tone of voice.`, t:`stepped back half a pace and started waiting. He doesn't even need to do anything now.` },
          react:()=>`Not my fight. Of course. I'll just stand here, watch my friend get called a villain, and go home for dinner.`,
          coach:`"Not your fight" pushes a friend out of a situation he only got into because of you. Now he'll prove it is his fight — and prove it with steel.` },
        { icon:"🎭", tag:"Pseudo-empathy", cls:"bad", d:{m:+14,t:+3}, dc:0,
          text:`Friend, I understand. It's just not the time, believe me.`,
          beat:{ m:`nodded. Didn't sheathe the blade.`, t:`smiled wider.` },
          react:()=>`Not the time. And when will it be, Romeo? Will you send me a note?`,
          coach:`"I understand, but not now" means "your feelings can wait." People answer that louder, not quieter.` },
        { icon:"💙", tag:"Name the need", cls:"good", d:{m:-24,t:+2}, dc:+18,
          text:`Mercutio. You're not holding that blade against Tybalt right now — you're holding it for me. Because it looked to you like I'd gone soft, and that shadow's falling on you too. It isn't. And I won't let anyone make a fool of you — not him, not myself.`,
          beat:{ m:`slowly lowered the tip to the cobblestones. Didn't sheathe it. But lowered it.`, t:`shifted his weight impatiently.` },
          react:s=> s.w.m>=55 ? `...Fine. But you're explaining everything to me later. Everything, Romeo.` : `...Well, at least someone here talks like a human. Good. I'm listening.`,
          coach:`You named what he's actually afraid of — looking like a laughingstock over someone else's weakness. A named need stops running the person.` },
        { icon:"💍", tag:"Reveal the secret", cls:"good", d:{m:-34,t:-10}, dc:+22, set:{secretOut:true},
          text:`Listen, both of you. An hour ago I was married. To Juliet Capulet, by Friar Lawrence. Tybalt, you're my kin now — that's why I won't raise a hand against you. That's my whole "submission."`,
          beat:{ m:`for the first time in his life, was at a loss for words.`, t:`took half a step back. His hand slid off the hilt on its own.` },
          react:()=>`...What have you done? You... with Juliet?.. Romeo, if this is one of your jokes, I'll kill you myself.`,
          coach:`The riskiest move: you gave up a secret that isn't only yours. But it was exactly what made your behavior incomprehensible — and people fill in the incomprehensible with the worst version.` },
      ],
      next:"n3"
    },
    n3:{
      target:"t",
      npc:s=> s.w.m>=55
        ? `(to Mercutio) Well come then, wit-monger. With you it's even simpler — the Prince will flay me for it, but at least your tongue will finally shut up.`
        : `Pretty words, Montague. But I didn't come for words. Will you draw your sword — or shall I tell all Verona how you stood here today?`,
      options:[
        { icon:"🤺", tag:"Step between them", cls:"bad", d:{t:+8,m:+10}, dc:0,
          forceEnd:s=> s.w.m>=55 ? "mercutio" : null,
          text:`(throws yourself between them, arms spread) Enough! Both of you — back! The Prince has forbidden brawls in Verona's streets!`,
          beat:{ t:`didn't retreat a single step. He's a swordsman — and he saw an opening.`, m:`lunged sideways to see his opponent — and sees your back instead.` },
          react:()=>`Out of the way, boy!`,
          coach:`You put your body between two blades — and blocked your friend's line of sight exactly when he needed every inch of it. In Shakespeare, this is how Mercutio dies: the blow passes under your arm. Intervening without asking is also a form of violence.` },
        { icon:"🚧", tag:"A firm 'no'", cls:"good", d:{t:-18,m:-6}, dc:+15,
          text:s=> s.f.secretOut
            ? `No. I will not fight you — not today, not ever. You heard why: you're my kin now, whether you like it or not. If you want my blood, you'll have to cut down an unarmed relative before twenty witnesses. The Prince hangs men for less.`
            : `No. I will not fight you — not today, not ever. Not because I'm afraid, but because I have a reason, and you'll learn it. If you want my blood, you'll have to cut down an unarmed man before twenty witnesses. The Prince hangs men for less.`,
          beat:{ t:`glanced back at the square. For the first time in this conversation — at the people, not at you.`, m:`quietly: "Now that's more like it."` },
          react:s=> s.w.t>=60 ? `...Twenty witnesses. Convenient arrangement, Montague.` : `...I don't need blood before witnesses. I need an answer.`,
          coach:`A firm "no" with no insult, plus a real consequence for him. That's a boundary, not submission: you're not asking, not justifying — you're stating.` },
        { icon:"🙇", tag:"Plead", cls:"bad", d:{t:+16,m:+12}, dc:0,
          text:`Tybalt, I beg you. Please. For everything holy — just not today.`,
          beat:{ t:`straightened up. He just got exactly what he came for — and it didn't even cost him a blow.`, m:`turned away. He's ashamed for you, and it shows.` },
          react:()=>`Oh, now he's begging. Hear that, Verona? A Montague, standing in the square, begging.`,
          coach:`Pleading isn't a boundary. To someone who measures the world in force, it sounds like confirmation: you're weak, and can be pushed further.` },
        { icon:"🔥", tag:"Accept the challenge", cls:"bad", d:{t:+22,m:+8}, dc:0, aggro:1,
          text:`You want blood — draw your sword. Just don't complain to the Prince later that you weren't warned.`,
          beat:{ t:`finally exhaled. Everything's simple now.`, m:`"That's my Romeo!" — the worst thing he could possibly say right now.` },
          react:()=>`Finally. En garde.`,
          coach:`You gave him exactly what he came for. Now steel decides everything — and steel doesn't know how to negotiate.` },
      ],
      next:"n4"
    },
    n4:{
      target:"t",
      npc:()=>`(after a pause, quieter) And what now, Montague? I'm just supposed to turn and walk away? With what? I came here before witnesses.`,
      options:[
        { icon:"✅", tag:"Request with a door", cls:"good", d:{t:-12,m:-5}, dc:+22, endsRun:true,
          text:s=> s.f.secretOut
            ? `Tomorrow at noon, in Friar Lawrence's cell. No weapons, no witnesses, none of yours and none of mine. He'll confirm every word I've said — and then you decide for yourself what I am to you: enemy or kin. A Montague's word. Will you come?`
            : `Tomorrow at noon, in Friar Lawrence's cell. No weapons, no witnesses, none of yours and none of mine. I'll tell you what I can't say here — and you decide for yourself whether you still want my blood after that. A Montague's word. Will you come?`,
          beat:{ t:`looked at you for a long while. Then nodded once, briefly.`, m:`finally sheathed his blade.` },
          react:s=> s.contact>=60 ? `...Noon. At Lawrence's. If you don't show, Romeo, I'll find you even in Mantua.` : `I'll come. But I promise nothing.`,
          coach:`Time, place, terms — and above all, a dignified way out: he leaves not defeated, but as someone who reached an agreement. A request that leaves someone a door is accepted far more often.` },
        { icon:"🤝", tag:"Pay him honor", cls:"good", d:{t:-14,m:-4}, dc:+20, endsRun:true,
          text:`With the fact that you're the only man in this square who didn't draw a blade against an unarmed man. Half of Verona saw it, and tomorrow that's what they'll be talking about. And if that's not enough — name the place and time, and I'll come. Without Mercutio, without your men. To talk.`,
          beat:{ t:`rolled his shoulders, as if shrugging off a weight. He was looking for a way out — and you gave him one.`, m:`"Look at him, a diplomat."` },
          react:s=> s.contact>=60 ? `...Tomorrow. I'll find you myself. And, Romeo... you surprised me today.` : `We'll see, Montague. We'll see.`,
          coach:`You didn't defeat him — you gave him a way to leave the field with honor. For a man who lives on reputation, that's exactly the currency he came for.` },
        { icon:"🌫", tag:"Part ways", cls:"meh", d:{t:0,m:0}, dc:+3, fake:1, endsRun:true,
          text:`With nothing. Let's just part ways before someone does something stupid. Let's forget all this, alright?`,
          beat:{ t:`shrugged and walked off. Too calm for a man who came for blood.`, m:`watched him go and said nothing.` },
          react:()=>`Forget it. Sure. Veronese are famous for their memory in these matters.`,
          coach:`"Let's forget it" isn't an agreement, it's a pause. The insult didn't vanish, it just got postponed to a day when twenty witnesses aren't around.` },
        { icon:"🛡", tag:"Indifference", cls:"bad", d:{t:+10,m:+6}, dc:0, endsRun:true,
          text:`Think whatever you want, Tybalt. I'm not obligated to decide what you go home with.`,
          beat:{ t:`nodded to himself, as if he'd just decided something.`, m:`"Romeo. That was unnecessary."` },
          react:()=>`Not obligated. Fine. Then I'll decide myself — and you'll find out when.`,
          coach:`Technically you're right. But you just left an enraged man exactly one available move — and he'll make it. Tomorrow, the day after, whenever the witnesses aren't around.` },
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
    mercutio:{ emoji:"💀", title:"\"A plague o' both your houses!\"", cls:"bad",
      text:`Tybalt's blade passes under the very arm you used to part them. Mercutio looks at the wound almost surprised: "A scratch. But it's enough." Then, sitting down on the cobblestones: "Ask for me tomorrow, and you shall find me a grave man." And last of all, straight to your face: "A plague o' both your houses!"<br><br>You know the rest. You'll kill Tybalt. The Prince will banish you from Verona. Juliet will drink Friar Lawrence's potion, the letter to you won't arrive, and in four days no one will be left alive in the Capulet tomb.<br><br>All of it started here. With one conversation at noon.` },
    banish:{ emoji:"⚔️", title:"Banishment", cls:"bad",
      text:`Steel, screaming, blood on scorching stone. Tybalt lies still, and you don't even remember the blow itself. "O, I am fortune's fool," you'll say later, and it will be truer than you'd like.<br><br>The Prince spares you the noose only because Tybalt struck first: banishment, before sundown, forever. Juliet learns her husband killed her cousin on the very day she was to become a wife. Then comes the potion, the tomb, and four days.<br><br>And it all began with a phrase after which nothing else could be said.` },
    truce:{ emoji:"🌫", title:"Postponed", cls:"meh",
      text:`Tybalt walks away. Mercutio sheathes his blade and stays silent the whole way — and a silent Mercutio is more frightening than an armed one. No one's wounded, and technically you won this afternoon.<br><br>But nothing's resolved. Tybalt's insult stays with him, your secret stays with you, and your friend still doesn't understand why you acted like a stranger today. Verona is small. You'll meet again tomorrow — and tomorrow there won't be twenty witnesses around.` },
    peace:{ emoji:"🕊", title:"The Afternoon That Wasn't a Tragedy", cls:"good",
      text:`Tybalt walks across the square without looking back — and his sword stays sheathed the whole way. The heat is just as unbearable, the stones just as scorching, Verona just as much at war with itself.<br><br>Mercutio catches up with you by the well and silently grips your shoulder: "Now tell me everything. From the very start, slowly." You tell him. And he'll say something foul about the Capulets, of course — but he'll come to Lawrence's cell with you tomorrow.<br><br>Mercutio will live. No plays will be written about it.` },
  },
  debrief:`Here, what looked kindest wasn't what worked. <b>Warmth without explanation</b> ("I have a reason to love thee") is Romeo's canonical move, and it's exactly what kills Mercutio: a friend is left with unexplained behavior and fills in the worst version. <b>"I understand, but"</b> is a polite objection, not empathy. <b>Stepping between blades</b> is intervening without asking — and in Shakespeare, that's exactly what turns fatal.<br><br>What worked: naming a person's real goal out loud; naming a friend's need ("you're afraid of looking foolish because of me"); a firm "no" with a real consequence instead of pleading; and a final request that leaves your opponent <b>a way out with dignity</b>.<br><br>In a conflict with two people, the hardest part is that their needs are opposite: every time you calmed Tybalt with submission, you humiliated Mercutio. That's exactly why this scene has no meters — in a real room, there aren't any either.`
});
